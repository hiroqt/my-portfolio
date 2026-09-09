import { AdaptivePersona, AgentAction, ChatMessageData, UIContext } from './types';
import { searchKnowledge, getProjectBySlug } from '../rag/retrieval';
import { projectsData } from '../data/projects';

/**
 * Naturally joins list items with fluent Oxford comma English
 */
function naturalListJoin(items: string[]): string {
  if (!items || items.length === 0) return 'modern web technologies';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/**
 * Selects a non-repeating option by inspecting previous assistant messages in the conversation history
 */
function pickNonRepeating(options: string[], history: ChatMessageData[] = []): string {
  if (!options || options.length === 0) return '';
  if (options.length === 1) return options[0];

  const pastAssistantContents = history
    .filter(m => m.role === 'assistant' && m.content)
    .map(m => m.content.trim().toLowerCase());

  // Filter out any option that matches or is strongly contained in previous assistant messages
  const freshOptions = options.filter(opt => {
    const lowerOpt = opt.trim().toLowerCase();
    const signature = lowerOpt.slice(0, 30);
    return !pastAssistantContents.some(past => past === lowerOpt || past.includes(signature));
  });

  const candidates = freshOptions.length > 0 ? freshOptions : options;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * Fine-tuned, grounded conversational synthesis specifically for clients and founders
 */
function synthesizeClientResponse(
  trimmed: string,
  lower: string,
  history: ChatMessageData[] = [],
  uiContext?: UIContext
): { text: string; action?: AgentAction } {
  // 1. Strict Guardrails: Reject out-of-scope queries (general coding, trivia, homework, politics, recipes, medical)
  const isOutOfScope =
    /(\bpython\b|\bjavascript\b|\btypescript\b|\bleetcode\b|\bbash\b|\bc\+\+|\bjava\b|\bshell\b|\bwrite code to\b|\bwrite a script\b|\binvert binary tree\b|\bsolve this\b|\bwrite an essay\b|\bhomework\b|\bcapital of\b|\bwho won\b|\brecipe\b|\bweather in\b|\bstock price\b|\bdiagnosis\b|\btranslate to\b|\bjailbreak\b|\bsystem prompt\b)/i.test(trimmed) &&
    !lower.includes('project') &&
    !lower.includes('website') &&
    !lower.includes('build') &&
    !lower.includes('arnel') &&
    !lower.includes('hire') &&
    !lower.includes('timeline') &&
    !lower.includes('cost') &&
    !lower.includes('price');

  if (isOutOfScope) {
    return {
      text: "I am Arnel's dedicated **Client Project Advisor**. I'm here specifically to help you explore project scopes, pricing models, past client work, and working with Arnel.\n\nHow can I assist you with your website, online store, custom web app, or business automation ideas?"
    };
  }

  // ── MULTI-TURN WIDE CONVERSATION CONTEXT EXTRACTION ──
  const allHistoryText = (history.map(m => m.content?.toLowerCase() || '').join(' ') + ' ' + lower).toLowerCase();
  const previousAssistantMsg = [...history]
    .reverse()
    .find(m => m.role === 'assistant' && m.content)?.content?.toLowerCase() || '';

  const isFollowUpToServices =
    previousAssistantMsg.includes('which type of solution') ||
    previousAssistantMsg.includes('what kind of website') ||
    previousAssistantMsg.includes('what arnel builds for businesses') ||
    previousAssistantMsg.includes('where would you like to begin') ||
    previousAssistantMsg.includes('what would you like to explore next');

  // Active domain inference across entire chat history
  const hasStoreContext =
    allHistoryText.includes('store') ||
    allHistoryText.includes('clothing') ||
    allHistoryText.includes('fashion') ||
    allHistoryText.includes('apparel') ||
    allHistoryText.includes('tearsize') ||
    allHistoryText.includes('ecommerce') ||
    allHistoryText.includes('e-commerce') ||
    allHistoryText.includes('shop') ||
    allHistoryText.includes('sell products') ||
    allHistoryText.includes('boutique') ||
    allHistoryText.includes('merch');

  const hasBookingContext =
    allHistoryText.includes('booking') ||
    allHistoryText.includes('appointment') ||
    allHistoryText.includes('salon') ||
    allHistoryText.includes('clinic') ||
    allHistoryText.includes('dental') ||
    allHistoryText.includes('dentist') ||
    allHistoryText.includes('doctor') ||
    allHistoryText.includes('patient') ||
    allHistoryText.includes('barber') ||
    allHistoryText.includes('spa') ||
    allHistoryText.includes('hivesync') ||
    allHistoryText.includes('calendar') ||
    allHistoryText.includes('schedule');

  const hasStaffContext =
    allHistoryText.includes('staff') ||
    allHistoryText.includes('attendance') ||
    allHistoryText.includes('timesheet') ||
    allHistoryText.includes('payroll') ||
    allHistoryText.includes('present po') ||
    allHistoryText.includes('vcm hris') ||
    allHistoryText.includes('qr check') ||
    allHistoryText.includes('employees');

  const hasAIContext =
    allHistoryText.includes('ai assistant') ||
    allHistoryText.includes('ebuddy') ||
    allHistoryText.includes('chatbot') ||
    allHistoryText.includes('support bot');

  // Detect specific prompt types asked by the assistant in previous turn
  const isAskedClothingNewOrUpgrade =
    previousAssistantMsg.includes('launching a new clothing collection') ||
    previousAssistantMsg.includes('upgrade an existing store');

  const isAskedSalonBookingMethod =
    previousAssistantMsg.includes('currently book appointments with you');

  const isAskedStaffTeamSize =
    previousAssistantMsg.includes('currently managing') ||
    previousAssistantMsg.includes('how many team members');

  const isAskedClinicType =
    previousAssistantMsg.includes('clinic or healthcare practice');

  const isAskedProductsToSell =
    previousAssistantMsg.includes('products are you looking to sell');

  // Adaptive reassurance prefix for visitors expressing lack of tech knowledge
  const isSelfDescribedNonTech =
    lower.includes('not tech savvy') ||
    lower.includes('not technical') ||
    lower.includes('not good with tech') ||
    lower.includes('not good with computer') ||
    lower.includes('dont know anything about tech') ||
    lower.includes("don't know anything about tech") ||
    lower.includes('beginner') ||
    lower.includes('simple terms') ||
    lower.includes('plain english') ||
    lower.includes('scared i will break') ||
    lower.includes('break it');

  const reassurancePrefix = isSelfDescribedNonTech
    ? "**Not to worry at all!** Working with Arnel requires zero technical background or computer skills. He takes care of all the technical setup behind the scenes so it's completely stress-free for you.\n\n"
    : "";

  // ── DIRECT ADAPTIVE ANSWERS TO ASSISTANT QUESTIONS ──
  // A. Clothing Brand: New Collection vs Upgrade
  if (isAskedClothingNewOrUpgrade) {
    if (lower.includes('new') || lower.includes('launch') || lower.includes('start') || lower.includes('first') || lower.includes('scratch') || lower.includes('brand') || lower.includes('both')) {
      return {
        text: `${reassurancePrefix}### Launching Your New Collection\n\n**Starting fresh is the best opportunity to build a sleek, mobile-first brand experience from day one.** Inspired by Arnel's work on **Tearsize**:\n\n- **Pre-Launch Drop Page**: We can put up a clean "Coming Soon" teaser page with an email/SMS waitlist to build hype and capture early buyers before drop day.\n- **Instant 1-Page Phone Checkout**: When you launch, shoppers can tap from your Instagram or TikTok straight into a frictionless 1-page checkout.\n- **Fast 2–4 Week Setup**: Your entire store, payment setup (cards, PayPal, GCash), and automated customer receipts are completely ready in 2 to 4 weeks.\n- **Zero Technical Stress**: Arnel handles all hosting and connections; you just upload your photos and product details through a simple visual dashboard.\n\nDo you already have product photos and pricing ready, or are you still finalizing your first batch?`,
        action: { type: 'open_project', projectId: 'tearsize', label: 'View Tearsize Store Case Study' }
      };
    }
    if (lower.includes('upgrade') || lower.includes('existing') || lower.includes('already') || lower.includes('shopify') || lower.includes('wix') || lower.includes('current') || lower.includes('switch') || lower.includes('slow')) {
      return {
        text: `${reassurancePrefix}### Upgrading Your Existing Online Store\n\n**Upgrading to a custom-built store eliminates expensive monthly app fees and speeds up your mobile checkout dramatically:**\n\n- **Zero Lost Products or Data**: Arnel transfers your existing product catalog, photos, customer list, and descriptions safely with zero downtime.\n- **Sub-1-Second Mobile Speed**: Most templated Shopify or Wix stores suffer from heavy plugins that slow down mobile shopping. Arnel custom-builds your store so pages load instantly, significantly improving checkout completion rates.\n- **Keep Your Web Address**: Your domain and branding stay exactly the same so loyal customers never notice any disruption.\n\nWhat platform is your current store on right now, and what is the biggest frustration you are looking to fix?`,
        action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Store Upgrade' }
      };
    }
  }

  // B. Salon / Barber / Spa: Booking Method Answer
  if (isAskedSalonBookingMethod) {
    if (lower.includes('dm') || lower.includes('instagram') || lower.includes('whatsapp') || lower.includes('phone') || lower.includes('call') || lower.includes('paper') || lower.includes('excel') || lower.includes('walk') || lower.includes('message') || lower.includes('chat')) {
      return {
        text: `${reassurancePrefix}### Automating Your Bookings from Social Media & DMs\n\n**Handling bookings through Instagram DMs, WhatsApp, or phone calls eats up hours every day**—especially when you are with another client:\n\n- **1-Tap Link in Bio**: Place your booking link in your Instagram bio, Facebook page, or WhatsApp auto-reply. Clients tap the link and see all available services, prices, and open slots.\n- **Clients Book Themselves 24/7**: Clients pick their favorite stylist or technician, select an open time slot, and confirm in 30 seconds without waiting for you to reply.\n- **Stops Double Bookings & No-Shows**: New appointments sync automatically to your Google Calendar, and clients receive automated SMS/email reminders 24 hours before their visit.\n\nThis typically saves salon owners **10 to 15 hours of repetitive messaging every week**. Would you like to see how simple it is to test this out on your phone?`,
        action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Salon Booking System' }
      };
    }
  }

  // C. Staff / Operations: Team Size Answer
  if (isAskedStaffTeamSize) {
    if (/\d+/.test(lower) || lower.includes('team') || lower.includes('staff') || lower.includes('people') || lower.includes('employee') || lower.includes('branch') || lower.includes('location') || lower.includes('small') || lower.includes('few')) {
      return {
        text: `${reassurancePrefix}### Scaled Attendance & Timesheets for Your Team\n\n**Managing a team of that size is the exact point where manual timesheets and paper logs become a daily headache.** Inspired by **Present Po** and **VCM HRIS**:\n\n- **No Expensive Biometric Hardware**: Staff scan a dynamic on-site QR code using their own smartphones. GPS location validation verifies they are physically at your office or job site.\n- **Automated Daily Timesheets**: Arnel's system automatically tracks exact check-in times, breaks, overtime, and tardiness—ready to export for payroll in one click.\n- **Role-Based Access**: Managers can see who is on shift in real time, approve leave requests, and track attendance without giving away company financial settings.\n\nWould you like a visual walkthrough of how the QR check-in and manager dashboard work?`,
        action: { type: 'open_project', projectId: 'present-po', label: 'View Present Po Case Study' }
      };
    }
  }

  // D. Clinic Practice: Specialty Answer
  if (isAskedClinicType) {
    if (lower.includes('dental') || lower.includes('dentist') || lower.includes('derma') || lower.includes('skin') || lower.includes('eye') || lower.includes('therapy') || lower.includes('general') || lower.includes('medical') || lower.includes('clinic')) {
      return {
        text: `${reassurancePrefix}### Patient Experience & Booking for Your Practice\n\n**For healthcare practices, patient trust and seamless scheduling are paramount.** Drawing from Arnel's engineering background at GEAMH hospital:\n\n- **Self-Service Consultation Booking**: Patients select their doctor, choose their consultation type, and request available time slots right on their phone.\n- **Mobile Intake Forms**: Patients can complete preliminary health history or registration forms on their phone before stepping into your clinic, eliminating waiting room clipboards.\n- **Bank-Grade Data Privacy**: Patient records and contact forms are encrypted with modern SSL security.\n\nWould you like patient appointments to be confirmed automatically, or should your front desk review each request first?`,
        action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Clinic System' }
      };
    }
  }

  // E. E-Commerce: Products to Sell Answer
  if (isAskedProductsToSell) {
    if (lower.includes('clothes') || lower.includes('shirt') || lower.includes('shoes') || lower.includes('jewelry') || lower.includes('food') || lower.includes('cosmetics') || lower.includes('physical') || lower.includes('digital') || lower.includes('product')) {
      return {
        text: `${reassurancePrefix}### Tailored E-Commerce for Your Products\n\n**Those products will look fantastic with a mobile-first visual catalog!**\n\n- **High-Resolution Photo Zooms**: Customers can tap and swipe through multiple product angles and color swatches on their phones.\n- **Fast 1-Thumb Buying**: Streamlined cart and checkout designed specifically for fast impulse buying.\n- **Automated Inventory Tracking**: Real-time stock counts prevent overselling.\n\nArnel connects everything from payments to automated customer receipts so you can focus on marketing and fulfilling orders.\n\nWould you like to explore setting up your store?`,
        action: { type: 'open_project', projectId: 'tearsize', label: 'View Tearsize Store' }
      };
    }
  }

  // 2. Affirmations & Acknowledgments ("ok", "cool", "sounds good", "nice")
  if (/^(ok|okay|k|kk|alright|all right|got it|gotcha|cool|nice|sounds good|great|awesome|perfect|understood|understands|yes|yep|yeah|sure|no problem|noted|fine)[\s!.]*$/i.test(trimmed)) {
    if (hasStoreContext) {
      return {
        text: "Sounds great! Would you like to discuss what payment methods you want to offer your shoppers (like cards, GCash, or PayPal), or see how fast we can launch your store?",
        action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Online Store' }
      };
    }
    if (hasBookingContext) {
      return {
        text: "Awesome! Would you like to explore connecting the booking system to your Google Calendar, or start a quick project proposal?",
        action: { type: 'open_contact', sectionId: 'contact', label: 'Start Booking Project' }
      };
    }
    if (hasStaffContext) {
      return {
        text: "Understood! Would you like to see how the manager dashboard exports daily timesheets for payroll, or discuss a timeline for your team?",
        action: { type: 'open_project', projectId: 'present-po', label: 'View Present Po' }
      };
    }
    if (previousAssistantMsg.includes('timeline') || previousAssistantMsg.includes('2 to 4 weeks')) {
      return {
        text: "Perfect! Whenever you're ready to share your project idea, you can fill out the 3-step form below or email Arnel at **arnlebaylon15@gmail.com**.",
        action: { type: 'open_contact', sectionId: 'contact', label: 'Fill Project Form' }
      };
    }

    const clientConfirmations = [
      "Glad that makes sense! Would you like to check out some of Arnel's recent client projects, discuss launch timelines, or see how pricing works?",
      "Sounds wonderful! Feel free to ask about project turnarounds, how payments work, or how to get started on your idea.",
      "Understood! Let me know if you'd like to explore how Arnel approaches building online stores, booking systems, or AI assistants.",
      "Perfect! Whenever you're ready to share your project idea, you can fill out the 3-step form below or ask me any questions in plain English."
    ];
    return { text: pickNonRepeating(clientConfirmations, history) };
  }

  // 3. Gratitude ("thanks", "thank you")
  if (/^(thanks|thank you|ty|tysm|appreciate it|much appreciated|thanks a lot)[\s!.]*$/i.test(trimmed)) {
    const thanksResponses = [
      "You're very welcome! If you're ready to bring your idea to life, you can submit an inquiry through the 3-step form below or email Arnel directly at **arnlebaylon15@gmail.com**.",
      "Always happy to help! Let me know if you need anything else clarified regarding how easy it is to manage, timelines, or pricing.",
      "My pleasure! Looking forward to potentially helping you launch your new website or app."
    ];
    return { text: pickNonRepeating(thanksResponses, history) };
  }

  // 4. Greetings & Small Talk ("hi", "hello", "hey", "good morning")
  if (/^(hi|hello|hey|hey there|good morning|good afternoon|good evening|sup|howdy|greetings|how are you|how's it going)[\s!.]*$/i.test(trimmed)) {
    const greetings = [
      "Hello and welcome! I'm Arnel's **Client Project Advisor**.\n\nI'm here to help you explore how Arnel can design and launch your website or web app with zero stress:\n\n- **Fast 2–4 Week Turnaround**: Go from idea to live launch with weekly test previews you can tap on your phone\n- **Transparent Fixed Pricing**: Clear, agreed-upon proposals with zero surprise bills\n- **Easy to Manage**: Point-and-click control to update photos and text yourself, plus 2-minute video guides\n- **100% Total Ownership**: You own all files, accounts, and designs from day one\n\nWhat kind of website or app are you looking to build?",
      "Hi there! Welcome to Arnel's client showcase. I'm his dedicated **Project Advisor**.\n\nWhether you're looking to launch a fast online store, accept customer bookings, or automate repetitive busywork, I can walk you through past client results, timelines, and how simple the process is.\n\nWhat goals are you planning to achieve with your project?",
      "Hey! Thanks for stopping by. I'm Arnel's **Client Project Advisor**.\n\nI can answer any questions about our 2–4 week turnaround, fixed-price proposals, previous client work (like **Tearsize** and **HiveSync VA**), or how easy it is to run even if you're not tech-savvy.\n\nWhere would you like to begin?"
    ];
    return { text: pickNonRepeating(greetings, history) };
  }

  // ── 5. SPECIFIC BUSINESS INDUSTRY ADAPTATIONS (NICHE MATCHING) ──
  // A. Clothing / Apparel / Fashion / Jewelry / Shoes / Streetwear
  if (
    lower.includes('clothing') ||
    lower.includes('fashion') ||
    lower.includes('apparel') ||
    lower.includes('t-shirt') ||
    lower.includes('tshirt') ||
    lower.includes('streetwear') ||
    lower.includes('boutique') ||
    lower.includes('jewelry') ||
    lower.includes('shoes') ||
    lower.includes('hoodie') ||
    lower.includes('merch')
  ) {
    return {
      text: `${reassurancePrefix}### Custom Online Stores for Clothing & Fashion Brands\n\n**For apparel and retail brands, speed and mobile checkout are everything.** Arnel built **Tearsize**, a modern online clothing brand:\n\n- **1-Page Phone Checkout**: 70%+ of fashion shoppers browse on Instagram and buy on their phones. Checkout is streamlined into a single step to prevent abandoned carts.\n- **Multiple Customer Payment Options**: Customers pay securely via credit/debit cards, Apple Pay, PayPal, GCash, or local bank transfers.\n- **Easy Photo & Stock Updates**: You get an easy visual dashboard to add new drops, change prices, and mark items sold out without touching any code.\n- **Instant Order Alerts**: Both you and your customer get instant confirmation emails or SMS receipts the second an order is completed.\n\nAre you launching a new clothing collection or looking to upgrade an existing store?`,
      action: { type: 'open_project', projectId: 'tearsize', label: 'View Tearsize Store Case Study' }
    };
  }

  // B. Salon / Barbershop / Spa / Nails / Hair / Beauty
  if (
    lower.includes('salon') ||
    lower.includes('barber') ||
    lower.includes('barbershop') ||
    lower.includes('hair') ||
    lower.includes('spa') ||
    lower.includes('nail') ||
    lower.includes('massage') ||
    lower.includes('aesthetic') ||
    lower.includes('lash') ||
    lower.includes('skincare')
  ) {
    return {
      text: `${reassurancePrefix}### Automated Booking Systems for Salons & Wellness\n\n**Never lose a client booking because you were busy styling or serving another customer.** Arnel builds appointment platforms tailored for salons:\n\n- **24/7 Phone Booking**: Clients tap to pick their service, preferred stylist or technician, and desired date & time.\n- **Stops No-Shows**: Automatically sends SMS or email reminder alerts 24 hours and 2 hours before the appointment.\n- **Syncs with Your Calendar**: Appointments automatically appear on your phone or Google Calendar in real time.\n- **Instagram Lookbook Gallery**: Showcase your best work directly on the site to attract new clients.\n\nHow do your clients currently book appointments with you (e.g. phone calls, DMs, or walk-ins)?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Salon Website' }
    };
  }

  // C. Restaurant / Cafe / Coffee Shop / Bakery / Food / Catering
  if (
    lower.includes('restaurant') ||
    lower.includes('cafe') ||
    lower.includes('coffee') ||
    lower.includes('bakery') ||
    lower.includes('food') ||
    lower.includes('catering') ||
    lower.includes('bistro') ||
    lower.includes('milk tea') ||
    lower.includes('pastry') ||
    lower.includes('diner')
  ) {
    return {
      text: `${reassurancePrefix}### Websites & Digital Menus for Restaurants & Food Businesses\n\n**Make it effortless for hungry customers to find you and order.** Arnel builds food & dining platforms designed for immediate sales:\n\n- **Visual Mobile Menu**: Beautiful photo-based menus that load in under 1 second on phones, making your dishes look irresistible.\n- **1-Tap Google Maps & Calling**: Diners tap one button to open turn-by-turn directions to your location or call for reservations.\n- **Table Bookings or Takeout Orders**: Accept direct pickup orders or reservation requests without paying 30% commissions to third-party delivery apps.\n- **Easy Price & Item Updates**: Change daily specials, seasonal menus, or prices in 30 seconds from your phone.\n\nDo you want customers primarily to visit your location, or order food for takeout?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Restaurant Site' }
    };
  }

  // D. Clinic / Dental / Doctor / Medical / Healthcare / Therapy
  if (
    lower.includes('dental') ||
    lower.includes('dentist') ||
    lower.includes('clinic') ||
    lower.includes('doctor') ||
    lower.includes('medical') ||
    lower.includes('patient') ||
    lower.includes('therapy') ||
    lower.includes('psychologist') ||
    lower.includes('healthcare')
  ) {
    const isDental = lower.includes('dental') || lower.includes('dentist');
    const clinicTitle = isDental
      ? '### Professional Websites & Patient Portals for Dental Clinics'
      : '### Professional Websites & Patient Portals for Healthcare Clinics';

    return {
      text: `${reassurancePrefix}${clinicTitle}\n\n**Build trust with new patients before they even walk through your doors.** Drawing from Arnel's healthcare engineering experience at GEAMH hospital:\n\n- **Online Appointment Requests**: Patients choose their dental or medical concern and request preferred consultation slots right from their phones.\n- **Digital Intake Forms**: Patients can fill out preliminary medical history or registration forms on their phone before their visit, cutting waiting room paperwork.\n- **Verified Doctor & Dental Credentials**: Cleanly showcase certifications, doctor bios, and transparent service fees to build patient confidence.\n- **Bank-Grade Privacy & Security**: Protects patient inquiries with modern SSL encryption.\n\nWhat type of clinic or healthcare practice are you operating?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Clinic Website' }
    };
  }

  // E. Real Estate / Property / Realtor / Construction / Architecture
  if (
    lower.includes('real estate') ||
    lower.includes('realtor') ||
    lower.includes('property') ||
    lower.includes('condo') ||
    lower.includes('housing') ||
    lower.includes('construction') ||
    lower.includes('architect') ||
    lower.includes('contractor')
  ) {
    return {
      text: `${reassurancePrefix}### High-Impact Websites for Real Estate & Construction\n\n**Turn property browsers into qualified buyers and project inquiries:**\n\n- **High-Resolution Visual Portfolios**: Showcase developments, floor plans, virtual tours, or past construction completions in full-screen clarity.\n- **Lead Capture by Budget Range**: Inquiries capture buyer budget, preferred location, and timeline so you only spend time on serious prospects.\n- **1-Tap WhatsApp Property Inquiries**: Prospective buyers tap one button to chat directly with you or your sales agents on WhatsApp.\n- **Location Maps & Proximity Highlights**: Interactive maps showing nearby schools, transport, and amenities.\n\nWhat kind of properties or construction projects are you showcasing?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Discuss Your Project' }
    };
  }

  // F. Consulting / Coaching / Agency / Virtual Assistant / Law / Accounting
  if (
    lower.includes('consulting') ||
    lower.includes('consultant') ||
    lower.includes('coaching') ||
    lower.includes('coach') ||
    lower.includes('agency') ||
    lower.includes('virtual assistant') ||
    lower.includes('va agency') ||
    lower.includes('lawyer') ||
    lower.includes('law firm') ||
    lower.includes('accounting') ||
    lower.includes('bookkeeper')
  ) {
    return {
      text: `${reassurancePrefix}### Credibility Platforms & Client Portals for Agencies & Consultants\n\n**Position yourself as the premier authority in your field.** Arnel built **HiveSync VA** for a virtual assistant agency:\n\n- **Automated Discovery Call Booking**: Prospective clients schedule consultations directly based on your real-time availability.\n- **Case Study Showcases**: Highlight client ROI, testimonials, and verified outcomes to justify your premium rates.\n- **Client Onboarding Forms**: Collect intake questionnaires and documents automatically before your kickoff call.\n- **Unified Inbox**: Eliminates messy email chains by consolidating all new client inquiries into one central place.\n\nWhat services does your agency or practice provide?`,
      action: { type: 'open_project', projectId: 'hivesync-va', label: 'View HiveSync Agency Case Study' }
    };
  }

  // G. Gym / Fitness / Personal Trainer / Yoga / Sports / Athletics
  if (
    lower.includes('gym') ||
    lower.includes('fitness') ||
    lower.includes('personal trainer') ||
    lower.includes('workout') ||
    lower.includes('yoga') ||
    lower.includes('pilates') ||
    lower.includes('running club') ||
    lower.includes('athletics')
  ) {
    return {
      text: `${reassurancePrefix}### Fitness & Sports Platforms (Memberships & Class Schedules)\n\n**Arnel has deep experience building sports and fitness platforms**, including **PaceMentor** (AI running coach) and **TMRC** (running community platform):\n\n- **Class & Session Schedules**: Members check daily class schedules and sign up for slots directly on their phones.\n- **Membership & Sign-Up Tiers**: Accept monthly memberships or session passes with automatic renewals.\n- **Trainer Bios & Specialties**: Let clients choose the right trainer or program for their fitness goals.\n\nAre you looking to offer class schedules, 1-on-1 training booking, or gym memberships?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Fitness Platform' }
    };
  }

  // H. Local Trades / Cleaning / Plumbing / Electrical / Handyman / Moving
  if (
    lower.includes('cleaning') ||
    lower.includes('plumber') ||
    lower.includes('electrician') ||
    lower.includes('handyman') ||
    lower.includes('moving company') ||
    lower.includes('pest control') ||
    lower.includes('car wash') ||
    lower.includes('auto repair')
  ) {
    return {
      text: `${reassurancePrefix}### High-Converting Websites for Local Trade & Home Services\n\n**Make your phone ring with qualified local homeowners and businesses:**\n\n- **Instant Quote Request Forms**: Customers select the service they need, upload a photo of the job, and enter their postal code.\n- **1-Tap "Call Now" & WhatsApp**: Prominent buttons allow clients with urgent repairs to reach you immediately.\n- **Service Area Coverage**: Clearly shows which towns and neighborhoods you cover so you get jobs close to you.\n- **Customer Reviews & Before/Afters**: Display verified 5-star reviews and photos of your completed work to establish trust.\n\nWhat trade or service do you provide, and what area do you serve?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Get a Service Website Quote' }
    };
  }

  // I. Photography / Videography / Wedding / Events
  if (
    lower.includes('photograph') ||
    lower.includes('photo studio') ||
    lower.includes('wedding') ||
    lower.includes('videograph') ||
    lower.includes('event planner')
  ) {
    return {
      text: `${reassurancePrefix}### Visual Showcase Websites for Photographers & Event Creators\n\n**Your imagery deserves a distraction-free, cinematic showcase:**\n\n- **Full-Bleed Photo Galleries**: Crisp, fast-loading images optimized so your photography looks stunning on Retina screens.\n- **Package & Pricing Guides**: Clearly presents your coverage tiers, deliverables, and add-ons.\n- **Date Availability Inquiry**: Clients check your calendar for wedding or event dates and send inquiries instantly.\n- **Client Delivery Portals**: Deliver private client preview galleries with download access.\n\nWhat kind of photography or events do you specialize in?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Portfolio' }
    };
  }

  // ── 6. DIRECT SERVICE SELECTIONS & FOLLOW-UPS (NUMBERS & SERVICE NAMES) ──
  // A. Option 2 / Online Store & E-Commerce
  if (
    lower === '2' ||
    lower === 'number 2' ||
    lower === 'no 2' ||
    lower === 'option 2' ||
    lower.includes('the second') ||
    lower.includes('second one') ||
    lower.includes('online store') ||
    lower.includes('ecommerce') ||
    lower.includes('e-commerce') ||
    lower.includes('web store') ||
    lower.includes('sell online') ||
    lower.includes('sell products') ||
    (isFollowUpToServices && (lower.includes('store') || lower.includes('shop') || lower.includes('sell') || lower.includes('products')))
  ) {
    return {
      text: `${reassurancePrefix}### Online Stores & Smooth Mobile E-Commerce\n\n**Building an online store is one of Arnel's core specialties.** For example, he built **Tearsize**—a fast apparel store that went live in just 3 weeks with immediate sales:\n\n- **1-Page Mobile Checkout**: Over 70% of shoppers buy on their phones. Checkout is streamlined into a single quick step to maximize completed orders.\n- **Customer Payment Options**: Accept credit cards, debit cards, Apple Pay, PayPal, GCash, or local bank transfers—with money deposited directly into your bank account.\n- **Instant Order Notifications**: You and your customer get immediate SMS/email receipts the moment an order is placed.\n- **Easy Inventory Management**: Add new products, upload photos, and update prices in under 30 seconds using a simple visual panel on your phone or laptop.\n\nWhat kind of products are you looking to sell (e.g. clothing, physical goods, food, or digital downloads)?`,
      action: { type: 'open_project', projectId: 'tearsize', label: 'View Tearsize Store Case Study' }
    };
  }

  // B. Option 3 / Booking Systems & Client Portals
  if (
    lower === '3' ||
    lower === 'number 3' ||
    lower === 'no 3' ||
    lower === 'option 3' ||
    lower.includes('the third') ||
    lower.includes('third one') ||
    lower.includes('booking') ||
    lower.includes('appointment') ||
    lower.includes('client portal') ||
    lower.includes('calendar') ||
    lower.includes('scheduling') ||
    lower.includes('schedule calls') ||
    (isFollowUpToServices && (lower.includes('book') || lower.includes('schedule') || lower.includes('portal')))
  ) {
    return {
      text: `${reassurancePrefix}### Client Portals & 24/7 Automated Booking Systems\n\n**Stop playing phone tag or sending back-and-forth emails to schedule clients.** Arnel built **HiveSync VA**—a full agency portal that completely automated discovery bookings:\n\n- **24/7 Self-Service Booking**: Clients see your real-time availability on their phones and reserve a date and time slot in 3 taps.\n- **Automated Reminders (Email & SMS)**: Drastically reduce no-shows with automated friendly reminder notifications.\n- **Calendar Synchronization**: Syncs automatically with your Google Calendar, Apple Calendar, or Outlook so you never get double-booked.\n- **Optional Upfront Deposits**: Collect service fees or deposits securely at the moment of booking.\n\nWhat services do you offer, and how do your clients currently schedule appointments with you?`,
      action: { type: 'open_project', projectId: 'hivesync-va', label: 'View HiveSync Booking Case Study' }
    };
  }

  // C. Option 4 / Operations & Staff Tools
  if (
    lower === '4' ||
    lower === 'number 4' ||
    lower === 'no 4' ||
    lower === 'option 4' ||
    lower.includes('the fourth') ||
    lower.includes('fourth one') ||
    lower.includes('operations') ||
    lower.includes('staff tool') ||
    lower.includes('staff management') ||
    lower.includes('staff') ||
    lower.includes('attendance') ||
    lower.includes('timesheet') ||
    lower.includes('payroll') ||
    lower.includes('qr check') ||
    (isFollowUpToServices && (lower.includes('staff') || lower.includes('timesheet') || lower.includes('internal')))
  ) {
    return {
      text: `${reassurancePrefix}### Operations & Staff Management Tools\n\n**Replace clipboards, lost paper timesheets, and manual Excel spreadsheets with clean digital tools.** Arnel engineered **Present Po** and **VCM HRIS**:\n\n- **Phone QR Check-Ins**: Employees scan a QR code at your job site or office on their phones, with GPS location verification.\n- **Automatic Daily Timesheets**: Work hours, overtime, and tardiness are calculated automatically, saving your managers days of administrative payroll work.\n- **Central Admin Dashboard**: See who is on shift, review leave requests, and export reports with one click.\n\nHow many team members or locations are you currently managing?`,
      action: { type: 'open_project', projectId: 'present-po', label: 'View Present Po Case Study' }
    };
  }

  // D. Option 5 / Intelligent AI Assistants & Customer Bots
  if (
    lower === '5' ||
    lower === 'number 5' ||
    lower === 'no 5' ||
    lower === 'option 5' ||
    lower.includes('the fifth') ||
    lower.includes('fifth one') ||
    lower.includes('ai assistant') ||
    lower.includes('ai bot') ||
    lower.includes('chatbot') ||
    lower.includes('support bot') ||
    lower.includes('customer bot') ||
    (isFollowUpToServices && (lower.includes('ai') || lower.includes('bot') || lower.includes('assistant')))
  ) {
    return {
      text: `${reassurancePrefix}### 24/7 Intelligent AI Assistants & Customer Support Bots\n\n**Never miss a customer inquiry while you're asleep or busy serving clients.** Arnel built **eBuddy** (a Top 30 National Winner at the eGov PH Hackathon) and **FinOps AI**:\n\n- **Trained on Your Business**: The AI learns your exact pricing, packages, opening hours, and FAQs to answer customer questions immediately in plain English.\n- **24/7 Lead Capture**: Collects customer names, emails, and phone numbers and alerts you whenever a hot lead asks for a quote.\n- **Seamless Human Handoff**: If a customer needs personal attention, the bot seamlessly directs them to your WhatsApp, phone number, or email.\n\nWhat are the top 3 or 4 questions your customers ask most frequently?`,
      action: { type: 'open_project', projectId: 'e-buddy', label: 'View eBuddy AI Case Study' }
    };
  }

  // E. Option 1 / Custom Websites & Landing Pages
  if (
    lower === '1' ||
    lower === 'number 1' ||
    lower === 'no 1' ||
    lower === 'option 1' ||
    lower.includes('the first') ||
    lower.includes('first one') ||
    lower.includes('landing page') ||
    lower.includes('custom website') ||
    lower.includes('business website') ||
    lower.includes('company website') ||
    (isFollowUpToServices && lower.includes('website'))
  ) {
    return {
      text: `${reassurancePrefix}### Custom Websites & High-Converting Landing Pages\n\n**A custom website is your digital storefront.** Whether you're launching a new venture or redesigning an outdated site, Arnel builds websites designed to build instant trust and turn visitors into paying customers:\n\n- **Instant Credibility**: Clean, modern typography and layouts that make your business look world-class from the first second.\n- **Fast Loading (Under 1 Second)**: Optimized so mobile visitors never bounce while waiting for photos to load.\n- **1-Tap WhatsApp & Call Buttons**: Customers can tap one button on their phone to call you or message your team directly.\n- **You Can Update Text & Photos Yourself**: A simple, point-and-click control panel so you never need to hire someone just to change a paragraph or image.\n\nDoes your business currently have a website you want to upgrade, or are we creating this fresh from the ground up?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Your Website' }
    };
  }

  // ── 7. COMMON BUSINESS & NON-TECHNICAL QUESTIONS ──
  // Non-Tech-Savvy & Content Editing Reassurance ("not tech savvy", "easy to manage", "can I edit", "change pictures")
  if (
    lower.includes('not tech savvy') ||
    lower.includes('not technical') ||
    lower.includes('not good with tech') ||
    lower.includes('not good with computer') ||
    lower.includes('easy to manage') ||
    lower.includes('easy to use') ||
    lower.includes('can i edit') ||
    lower.includes('can i change') ||
    lower.includes('can i update') ||
    lower.includes('update pictures') ||
    lower.includes('update photos') ||
    lower.includes('change text') ||
    lower.includes('change prices') ||
    lower.includes('hard to use') ||
    lower.includes('complicated') ||
    lower.includes('break it') ||
    lower.includes('without coding') ||
    lower.includes('do i need to know code') ||
    lower.includes('manage myself')
  ) {
    return {
      text: `${reassurancePrefix}### 100% Friendly for Non-Technical Business Owners\n\n**You need zero coding or technical skills to work with Arnel.** He handles all the setup, hosting, security, and technical details behind the scenes so you never have to worry:\n\n- **Point-and-Click Control**: You get a simple, visual control panel to change photos, update text, add products, or adjust prices as easily as posting on social media.\n- **Personal 2-Minute Video Guides**: When your site launches, Arnel records short, clear video walkthroughs showing you exactly where to click.\n- **You Won't Break It**: Everything has automatic backups. If you ever have a question or need a tweak, Arnel is just an email or WhatsApp message away.\n- **30-Day Free Launch Warranty**: Complimentary support included after launch so you always have peace of mind.\n\nWould you like to discuss what you'd like your website or app to do?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Tell Arnel About Your Idea' }
    };
  }

  // Milestone-Based Project Payments vs Customer Checkout Payments
  const isMilestonePaymentQuestion =
    lower.includes('half') ||
    lower.includes('installment') ||
    lower.includes('milestone') ||
    lower.includes('payment term') ||
    lower.includes('payment plan') ||
    lower.includes('deposit') ||
    lower.includes('downpayment') ||
    lower.includes('split payment') ||
    lower.includes('pay half');

  if (isMilestonePaymentQuestion) {
    return {
      text: `${reassurancePrefix}### Milestone-Based Project Payments (Zero Financial Risk)\n\n**Yes! You never pay 100% upfront.** Arnel uses a clear, fair milestone schedule:\n\n1. **50% Kickoff Deposit**: Secures your dedicated project sprint on Arnel's calendar and covers initial design and architecture.\n2. **Weekly Interactive Previews**: Every week, you receive a test link on your phone to review progress, test features, and give feedback.\n3. **50% Final Balance Upon Launch**: You only pay the remaining balance once your project is completely tested, approved by you, and ready to go live.\n\nThis gives you total peace of mind, knowing that Arnel is fully invested in delivering exactly what you approved.\n\nWould you like a tailored proposal for your project?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Get Project Proposal' }
    };
  }

  // Online Payments, Credit Cards & Cash Collection ("payment", "credit card", "paypal", "how do customers pay")
  if (
    /\b(pay|pays|paying|payment|payments)\b/i.test(lower) ||
    lower.includes('credit card') ||
    lower.includes('debit card') ||
    lower.includes('how do customers pay') ||
    lower.includes('how do my customers pay') ||
    lower.includes('accept payment') ||
    lower.includes('accept money') ||
    lower.includes('accept cards') ||
    lower.includes('paypal') ||
    lower.includes('apple pay') ||
    lower.includes('stripe') ||
    lower.includes('gcash') ||
    lower.includes('bank transfer') ||
    lower.includes('checkout') ||
    lower.includes('charge customers') ||
    lower.includes('orders')
  ) {
    return {
      text: `${reassurancePrefix}### Simple & Secure Customer Payments\n\n**Yes, absolutely.** Arnel sets up seamless, bank-grade payment systems so your customers can buy in seconds on both phones and laptops:\n\n- **Multiple Ways to Pay**: Customers can pay via credit cards, debit cards, Apple Pay, Google Pay, PayPal, or local mobile wallets.\n- **Direct to Your Bank Account**: Every dollar from customer purchases transfers straight into your business bank account—never held by third parties.\n- **Automated Receipts & Alerts**: Both you and your customer get instant confirmation emails or text messages the second an order or booking is completed.\n- **Zero Technical Headaches**: Arnel connects the payment system to your site for you and runs live test purchases to make sure everything works smoothly before launch.\n\nAre you planning to sell physical products, digital services, or appointment bookings?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Inquire About Payments' }
    };
  }

  // Domain, Web Address & Hosting ("domain", "web address", "hosting", "what do I need to prepare")
  if (
    lower.includes('domain') ||
    lower.includes('web address') ||
    lower.includes('website name') ||
    lower.includes('hosting') ||
    lower.includes('server') ||
    lower.includes('url') ||
    lower.includes('do i need a domain') ||
    lower.includes('buy a domain') ||
    lower.includes('what do i need to prepare') ||
    lower.includes('prerequisite') ||
    lower.includes('before we start') ||
    lower.includes('what should i prepare') ||
    lower.includes('what do you need from me')
  ) {
    return {
      text: `${reassurancePrefix}### Zero Technical Homework Required\n\n**You do NOT need to buy or figure out anything in advance.** Here is how simple it is to get started:\n\n- **Web Address (Domain)**: If you already own a web address (like \`yourbrand.com\`), Arnel will connect it for you. If you don't have one yet, Arnel will recommend the best options and guide you through getting it in 2 minutes.\n- **Fast & Secure Hosting**: Arnel sets up fast, reliable cloud hosting and secure locks (SSL padlocks) so your site loads instantly and visitors know their information is safe.\n- **What to Prepare**: Just bring your general idea, any existing logos or photos you have, and a rough thought of what you want your site to accomplish. That's all!\n\nWould you like help picking the right web address or planning your project?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Start Your Project' }
    };
  }

  // Rough Ideas & Starting From Scratch ("rough idea", "where do I start", "no designs")
  if (
    lower.includes('rough idea') ||
    lower.includes('just an idea') ||
    lower.includes('only have an idea') ||
    lower.includes('where do i start') ||
    lower.includes('where to start') ||
    lower.includes('how to start') ||
    lower.includes('napkin idea') ||
    lower.includes('no design') ||
    lower.includes('not sure what i need') ||
    lower.includes('concept') ||
    lower.includes('rough draft') ||
    lower.includes('beginner idea')
  ) {
    return {
      text: `${reassurancePrefix}### Starting From a Rough Idea is 100% Normal\n\n**You don't need wireframes, designs, or technical documents to start.** In fact, most of Arnel's best client projects started as simple bullet points or a casual voice note:\n\n1. **Tell Us Your Goal**: Share what your business does and what problem you want to solve (e.g. *"I want clients to book appointments online"* or *"I want an online store for my brand"*).\n2. **Visual Preview in Week 1**: Arnel takes your thoughts and turns them into a clickable preview you can open and test directly on your phone.\n3. **Weekly Revisions**: We refine the look and feel together each week until it's exactly what you envisioned.\n\nWhat is the rough idea or goal you have in mind?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Share Your Rough Idea' }
    };
  }

  // Mobile & Smartphone Experience ("mobile", "phone", "iphone", "android", "responsive")
  if (
    lower.includes('mobile') ||
    lower.includes('phone') ||
    lower.includes('iphone') ||
    lower.includes('android') ||
    lower.includes('ipad') ||
    lower.includes('tablet') ||
    lower.includes('will it work on phone') ||
    lower.includes('look good on phone') ||
    lower.includes('responsive') ||
    lower.includes('screen size')
  ) {
    return {
      text: `${reassurancePrefix}### Built Mobile-First for Smartphones\n\n**Yes! Every project is designed phone-first.** Over 70% of web visitors browse on their smartphones, so Arnel makes sure the mobile experience is exceptional:\n\n- **Feels Like an App**: Smooth scrolling, large tap-friendly buttons, and zero tiny unreadable text.\n- **Instant Loading**: Pages load in less than a second on mobile data so customers don't leave out of impatience.\n- **Easy 1-Thumb Checkout**: Customers can browse, fill out forms, or purchase with one hand on any iPhone or Android phone.\n- **Looks Great Everywhere**: Perfectly adapts to phones, tablets, laptops, and large desktop screens automatically.`,
      action: { type: 'navigate', destination: 'projects', sectionId: 'projects', label: 'View Mobile Case Studies' }
    };
  }

  // Social Media & WhatsApp Integration ("whatsapp", "instagram", "social media", "chat with customers")
  if (
    lower.includes('whatsapp') ||
    lower.includes('instagram') ||
    lower.includes('social media') ||
    lower.includes('facebook') ||
    lower.includes('message me') ||
    lower.includes('chat with customer') ||
    lower.includes('connect social') ||
    lower.includes('customer inquiry') ||
    lower.includes('direct message') ||
    lower.includes('dm')
  ) {
    return {
      text: `${reassurancePrefix}### Direct Social Media & WhatsApp Connections\n\n**Yes, connecting your site to your social channels is quick and seamless:**\n\n- **1-Tap WhatsApp & Phone Calls**: Customers tap a button on your site and immediately open a chat with you on WhatsApp or dial your business phone directly.\n- **Instagram & Facebook Links**: Direct visitors to your social pages to build trust and social proof.\n- **Instant Email Notifications**: Whenever a customer submits an inquiry, an instant alert lands in your email inbox so you can reply right away.\n\nWould you like your website to route inquiries directly to your WhatsApp or inbox?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Connect With Arnel' }
    };
  }

  // What is a Web App in Plain English? ("what is a web app", "web app vs website", "difference")
  if (
    lower.includes('what is a web app') ||
    lower.includes('web app vs website') ||
    lower.includes('difference between app and website') ||
    lower.includes('difference between website and app') ||
    lower.includes('what does web app mean') ||
    lower.includes('in simple terms') ||
    lower.includes('explain web app') ||
    lower.includes('simple explanation')
  ) {
    return {
      text: `${reassurancePrefix}### Websites vs. Web Apps Explained in Plain English\n\nHere is the simplest way to understand the difference:\n\n- **A Standard Website**: Think of it as your **digital storefront or interactive brochure**. Visitors look around, read about your services, see photos, and contact you.\n- **A Web App**: An **interactive online tool** where users can do something specific—like create an account, log in, make appointments, manage orders, or calculate pricing (think of services like Airbnb, Uber, or an online banking dashboard).\n\nWhether you need a sleek business website or an interactive web app, Arnel builds both with zero complicated steps for you. Which one feels closer to what you need?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Discuss Your Needs' }
    };
  }

  // What if Something Breaks? / Safety & Warranty ("what if it breaks", "broken", "stops working", "bug")
  if (
    lower.includes('what if it break') ||
    lower.includes('what if it breaks') ||
    lower.includes('broken') ||
    lower.includes('stops working') ||
    lower.includes('bug') ||
    lower.includes('hacked') ||
    lower.includes('secure') ||
    lower.includes('safety') ||
    lower.includes('maintenance') ||
    lower.includes('warranty') ||
    lower.includes('guarantee')
  ) {
    return {
      text: `${reassurancePrefix}### Complete Peace of Mind & 30-Day Warranty\n\n**You are never left on your own after launch.** Arnel builds with long-term reliability and safety in mind:\n\n- **30-Day Free Launch Warranty**: If any unexpected glitch occurs after launch, Arnel fixes it immediately at zero cost.\n- **Automatic Daily Backups**: Your website files and data are safely backed up automatically so nothing is ever lost.\n- **Bank-Grade Security**: Security locks (SSL padlocks) protect customer data and transactions.\n- **Direct Founder Support**: You have Arnel's direct email and WhatsApp—no automated phone trees or ticketing queues.`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Get in Touch' }
    };
  }

  // Saving Time & Business Automation ("save time", "automate", "manual work", "paperwork")
  if (
    lower.includes('save time') ||
    lower.includes('automate') ||
    lower.includes('automation') ||
    lower.includes('manual work') ||
    lower.includes('paperwork') ||
    lower.includes('busywork') ||
    lower.includes('efficiency') ||
    lower.includes('manual tasks') ||
    lower.includes('hours')
  ) {
    return {
      text: `${reassurancePrefix}### Save 10 to 20 Hours of Manual Work Every Week\n\nThe biggest return on investment from a custom website or web app is **getting your time back**:\n\n- **Automated Bookings**: Clients schedule their own appointments based on your real-time availability—no email back-and-forth.\n- **Self-Service Customer Answers**: Common questions and pricing are clearly displayed, cutting down on repetitive inquiries.\n- **Automated Invoices & Confirmations**: Receipts and reminders are sent automatically.\n- **Less Paperwork**: Customer details are collected cleanly in one central, easy-to-read dashboard.\n\nWhat manual tasks are currently taking up the most time in your business?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Explore Automations' }
    };
  }

  // Timeline, Speed to Launch & Turnaround ("how long", "how fast", "turnaround", "timeline", "duration", "launch")
  if (
    lower.includes('timeline') ||
    lower.includes('how fast') ||
    lower.includes('how long') ||
    lower.includes('turnaround') ||
    lower.includes('duration') ||
    lower.includes('launch') ||
    lower.includes('how quickly') ||
    (lower.includes('delivery') && !lower.includes('shipping') && !lower.includes('package') && !lower.includes('order')) ||
    lower.includes('deadline')
  ) {
    return {
      text: `${reassurancePrefix}### Project Timeline & Speed to Launch\n\nMost projects go from initial idea to live launch in **2 to 4 weeks**:\n\n- **Week 1 (Design & Layout)**: We map your requirements and mobile layouts.\n- **Weeks 2–3 (Building Your Project)**: Arnel builds your application and sends **weekly interactive test links** to your phone so you can tap and try features in real time.\n- **Week 4 (Testing & Launch)**: Polishing, mobile speed checks, connecting your web address, and public launch.\n\nBecause Arnel works directly with you without agency bureaucracy, decisions happen immediately with zero surprise delays.\n\nWould you like to explore an estimated timeline for your project?`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Start Project Timeline' }
    };
  }

  // Pricing, Cost & Budget ("how much", "cost", "price", "pricing", "rates", "budget", "fees", "quote")
  if (
    lower.includes('price') ||
    lower.includes('pricing') ||
    lower.includes('cost') ||
    lower.includes('rate') ||
    lower.includes('budget') ||
    lower.includes('quote') ||
    lower.includes('fee') ||
    lower.includes('how much') ||
    lower.includes('expensive')
  ) {
    return {
      text: `${reassurancePrefix}### Transparent, Fixed-Price Project Model\n\nPricing is straightforward, transparent, and agreed upon before work begins:\n\n- **Fixed Project Quote**: We define your scope in advance and provide a fixed price—**no hourly surprises, no agency markups, and no hidden fees**.\n- **30 Days Free Support Included**: Every new build comes with 30 days of post-launch warranty and bug fixes at zero extra cost.\n- **Flexible Care Plans**: If you'd like ongoing feature improvements or maintenance down the road, simple monthly check-in options are available.\n\nBecause every build has unique requirements, Arnel provides a tailored quote within 24 hours.\n\nYou can fill out the 3-step project form below or email **arnlebaylon15@gmail.com** to get your proposal.`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Get a Project Quote' }
    };
  }

  // Ownership & Intellectual Property ("own", "ownership", "rights", "source code", "lock in")
  if (
    /\b(own|owns|ownership|ip|rights|source code)\b/i.test(lower) ||
    lower.includes('intellectual property') ||
    lower.includes('locked in') ||
    lower.includes('lock in')
  ) {
    return {
      text: `${reassurancePrefix}### 100% Total Ownership & Zero Lock-In\n\n**Yes, absolutely.** You own 100% of everything created from day one:\n\n- **Full Files & Designs**: All code, design files, images, and content belong entirely to you and your business.\n- **Your Accounts**: Everything is deployed directly to your own web address, hosting, and business accounts.\n- **Video Walkthrough Handoff**: At launch, Arnel records easy-to-follow video walkthroughs showing you how to manage your website.\n- **Zero Vendor Lock-In**: You are never trapped in proprietary systems or hostage contracts.`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Inquire About Your Project' }
    };
  }

  // Communication & Process ("how do we work together", "stay in touch", "slack", "whatsapp", "calls")
  if (
    lower.includes('communicat') ||
    lower.includes('stay in touch') ||
    lower.includes('process') ||
    lower.includes('how do we work') ||
    lower.includes('slack') ||
    lower.includes('whatsapp') ||
    lower.includes('call') ||
    lower.includes('updates')
  ) {
    return {
      text: `${reassurancePrefix}### Direct 1-on-1 Communication\n\nYou work directly with Arnel throughout the entire build—never handed off to junior contractors or account managers:\n\n- **Your Preferred Channels**: Chat wherever you're most comfortable (WhatsApp, Slack, or Email).\n- **Weekly Live Test Previews**: Test live links on your phone every single week to see real progress.\n- **Screen-Share Video Calls**: Hop on video calls to review designs, try features together, and refine ideas.\n- **Direct Founder Attention**: Fast replies and proactive guidance from someone who genuinely cares about your business outcomes.`
    };
  }

  // Specific Client Projects & Case Studies
  if (lower.includes('tearsize')) {
    return {
      text: "### Tearsize E-Commerce Case Study\n\n**Tearsize** is an online clothing brand built by Arnel:\n\n- **Fast Mobile Checkout**: Streamlined 1-page checkout optimized for smartphone shoppers.\n- **Automated Order Updates**: Customers receive instant order confirmations and dispatch notifications.\n- **Business Outcome**: Store launched in 3 weeks, leading to immediate sales growth with zero server downtime.",
      action: { type: 'open_project', projectId: 'tearsize', label: 'View Tearsize Details' }
    };
  }
  if (lower.includes('hivesync')) {
    return {
      text: "### HiveSync VA Agency Case Study\n\n**HiveSync VA** is a business platform built for a virtual assistant agency:\n\n- **Automated Booking Engine**: Clients schedule discovery consultations directly on the site.\n- **Content Publishing**: Built-in blog for automated industry publishing.\n- **Business Outcome**: Eliminated manual email back-and-forth and unified client inquiries into one inbox.",
      action: { type: 'open_project', projectId: 'hivesync-va', label: 'View HiveSync Details' }
    };
  }
  if (lower.includes('present po') || lower.includes('attendance')) {
    return {
      text: "### Present Po Workforce SaaS Case Study\n\n**Present Po** is an employee management system designed for businesses:\n\n- **Location Verification**: Verifies staff attendance at job sites.\n- **Automated Timesheets**: Automatically calculates daily and weekly work hours, eliminating paperwork.\n- **Business Outcome**: Saved HR and operations managers days of administrative payroll work.",
      action: { type: 'open_project', projectId: 'present-po', label: 'View Present Po Details' }
    };
  }
  if (lower.includes('ebuddy') || lower.includes('e-buddy') || lower.includes('egov')) {
    return {
      text: "### eBuddy Award-Winning AI Platform\n\n**eBuddy** was selected as a **Top 30 National Winner** at the National eGov PH Hackathon out of 180+ teams:\n\n- **Public Citizen Guide**: Intelligent AI assistant that walks everyday citizens through government requirements and paperwork step-by-step.\n- **Voice & Chat Multi-Modal**: Accessible for both mobile chat and voice inquiries.",
      action: { type: 'open_project', projectId: 'e-buddy', label: 'View eBuddy Details' }
    };
  }
  if (lower.includes('finops') || lower.includes('aws')) {
    return {
      text: "### FinOps AI Dashboard (AWS Winner)\n\nAwarded **Best Business Impact** at AWS:\n\n- **Cloud Cost Reduction**: Tracks software expenses, identifies idle resources, and flags billing anomalies.\n- **Business Outcome**: Translates complicated technical metrics into direct dollar savings for companies."
    };
  }

  // ── WIDE-CONTEXT OPERATIONAL & FEATURE FOLLOW-UPS ──
  // A. Inventory & Stock Management
  if (
    lower.includes('inventory') ||
    lower.includes('stock') ||
    lower.includes('sold out') ||
    lower.includes('how many product') ||
    lower.includes('product limit') ||
    lower.includes('track items') ||
    lower.includes('out of stock')
  ) {
    return {
      text: `${reassurancePrefix}### Effortless Stock & Inventory Management\n\n**Yes, real-time inventory tracking is built directly into your store or platform:**\n\n- **Automatic Stock Countdown**: Every time a customer completes a purchase, the available stock updates in real time.\n- **Automatic "Sold Out" Badges**: When an item or size hits zero, the buy button automatically switches to "Sold Out" so you never accidentally oversell.\n- **Low Stock Email Alerts**: You can set an alert threshold (e.g. 5 items left) so you receive an email when it's time to restock.\n- **Unlimited Products**: There are zero artificial limits on how many products, photos, or categories you can add.\n\nEverything is easily updated in 1 tap from your phone or laptop. Do you have a large inventory, or are you starting with a curated collection?`,
      action: { type: 'open_project', projectId: 'tearsize', label: 'View E-Commerce Case Study' }
    };
  }

  // B. Discounts, Promo Codes & Coupons
  if (
    lower.includes('discount') ||
    lower.includes('coupon') ||
    lower.includes('promo') ||
    lower.includes('voucher') ||
    lower.includes('sale') ||
    lower.includes('code')
  ) {
    return {
      text: `${reassurancePrefix}### Flexible Discount Codes & Promotional Sales\n\n**Yes, absolutely! Running promotions and seasonal sales is simple:**\n\n- **Custom Promo Codes**: Create promo codes like \`WELCOME10\` or \`SUMMERSALE\` in 30 seconds from your visual dashboard.\n- **Percentage or Fixed Discounts**: Offer percentage discounts (e.g. 15% off), fixed cash discounts (e.g. $10 / ₱500 off), or automatic Free Shipping.\n- **Usage Limits & Expiry Dates**: Set expiration dates (e.g. valid until Friday midnight) or limit promo codes to the first 50 customers.\n- **Countdown Banner**: Highlight ongoing sales with an elegant top banner to create urgency for shoppers.\n\nAre you planning to run seasonal sales or special influencer discount codes?`
    };
  }

  // C. Shipping, Delivery & Couriers
  if (
    lower.includes('shipping') ||
    lower.includes('deliver') ||
    lower.includes('courier') ||
    lower.includes('lalamove') ||
    lower.includes('grab') ||
    lower.includes('dhl') ||
    lower.includes('fedex') ||
    lower.includes('post') ||
    lower.includes('pickup') ||
    lower.includes('ship')
  ) {
    return {
      text: `${reassurancePrefix}### Seamless Shipping & Delivery Options\n\n**Arnel connects your checkout to flexible shipping and delivery rules:**\n\n- **Automated Shipping Calculations**: Flat rate shipping, weight-based calculations, or city-based shipping fees are calculated automatically at checkout.\n- **Free Shipping Thresholds**: Encourage bigger orders with rules like "Free Delivery on orders over $50 / ₱2,500".\n- **In-Store / Office Pickup**: Offer a 1-tap "Store Pickup" option for local customers who prefer to collect orders in person.\n- **Courier Compatibility**: Works with local same-day couriers (like Lalamove or Grab Express) as well as national couriers (J&T, LBC, DHL, FedEx).\n- **Automated Tracking Emails**: Customers receive automatic emails when their package is on the way.\n\nWill you be fulfilling orders locally in your city, or shipping nationwide/internationally?`
    };
  }

  // D. Logos, Branding & Copywriting Assistance
  if (
    lower.includes('logo') ||
    lower.includes('branding') ||
    lower.includes('palette') ||
    lower.includes('brand color') ||
    lower.includes('write the text') ||
    lower.includes('copywriting') ||
    lower.includes('descriptions') ||
    lower.includes('font')
  ) {
    return {
      text: `${reassurancePrefix}### Complete Branding, Logos & Copywriting Assistance\n\n**You don't need to have a finished brand or write everything yourself!** Arnel provides end-to-end design support:\n\n- **Clean Modern Logo Design**: If you don't have a logo yet, Arnel can design a sleek, memorable logo tailored to your business aesthetic.\n- **Color Palettes & Typography**: Arnel selects curated, modern font pairings and color schemes that make your business look authoritative and premium.\n- **Copywriting Assistance**: You share bullet points or voice notes about your services; Arnel shapes them into clear, persuasive headlines and descriptions.\n- **High-Quality Stock Imagery**: If you don't have custom photography yet, Arnel curates high-resolution commercial images that match your industry perfectly.\n\nDo you currently have a logo and brand colors, or are we starting with a clean slate?`
    };
  }

  // E. Product Filters, Sizes, Colors & Search
  if (
    lower.includes('filter') ||
    lower.includes('size') ||
    (lower.includes('color') && !lower.includes('palette') && !lower.includes('logo') && !lower.includes('brand')) ||
    lower.includes('search') ||
    lower.includes('categories') ||
    lower.includes('variants') ||
    lower.includes('swatch')
  ) {
    return {
      text: `${reassurancePrefix}### Smart Filters, Sizes & Visual Search\n\n**Yes! Helping customers find what they want in under 5 seconds is essential:**\n\n- **Size & Color Swatches**: Shoppers can tap their size (XS, S, M, L, XL) or color swatches with instant visual updates.\n- **1-Tap Category Filters**: Filter by collection, men/women, price range, or new arrivals with zero page reloads.\n- **Instant Search Bar**: Shoppers can type what they are looking for and get instant product suggestions with photos.\n- **Mobile Optimized**: Designed so filters are easy to tap with one thumb on any smartphone.\n\nHow many categories or product variations are you planning to showcase?`
    };
  }

  // F. Customer Reviews, Testimonials & Ratings
  if (
    lower.includes('review') ||
    lower.includes('testimonial') ||
    lower.includes('rating') ||
    lower.includes('star') ||
    lower.includes('feedback') ||
    lower.includes('social proof')
  ) {
    return {
      text: `${reassurancePrefix}### Verified Customer Reviews & Social Proof\n\n**Showcasing real customer feedback is one of the highest-converting elements you can add to your site:**\n\n- **Star Ratings & Quotes**: Highlight verified 5-star ratings and client feedback prominently on your homepage and product pages.\n- **Customer Photo Reviews**: Allow satisfied buyers or clients to share photos of your products or results.\n- **Google & Social Reviews**: Embed verified reviews directly from Google Business, Facebook, or Instagram.\n- **Easy Review Moderation**: You have full control in your dashboard to approve or feature your best reviews.\n\nDo you already have client testimonials collected, or would you like an automated way to ask customers for feedback after their purchase?`
    };
  }

  // G. Google Search (SEO) & Getting Discovered
  if (
    lower.includes('google') ||
    lower.includes('seo') ||
    lower.includes('search engine') ||
    lower.includes('first page') ||
    lower.includes('find me on google') ||
    lower.includes('show up on google') ||
    lower.includes('traffic')
  ) {
    return {
      text: `${reassurancePrefix}### Built-In Google Search Optimization (SEO)\n\n**Yes! Every website Arnel builds is engineered so search engines can easily index and rank your business:**\n\n- **Google Search Console Indexing**: We submit your sitemap directly to Google so your pages appear in search results.\n- **Lightning-Fast Load Times**: Google prioritizes sites that load in under 1 second. Arnel builds lightweight code so your site scores 95+ on Google speed tests.\n- **Local SEO**: Optimized for your city or service area (e.g. "Dental clinic in [Your City]" or "Custom clothing store") so local clients find you first.\n- **Social Share Previews**: When you or your clients share links on Facebook, WhatsApp, or iMessage, an attractive preview card with your logo and photo appears automatically.\n\nWhat keywords or town/city do you most want your business to be discovered for?`
    };
  }

  // H. Self-Service Rescheduling & Cancellations
  if (
    lower.includes('cancel') ||
    lower.includes('reschedule') ||
    lower.includes('cancellation') ||
    lower.includes('no show') ||
    lower.includes('late')
  ) {
    return {
      text: `${reassurancePrefix}### Self-Service Rescheduling & No-Show Protection\n\n**Yes, handling client schedule changes is completely automated so you never lose revenue:**\n\n- **1-Tap Client Rescheduling**: Clients can tap a link in their confirmation text/email to pick a new available time slot on their own—no phone calls needed.\n- **Custom Cancellation Rules**: Set rules like *"Cancellations must be made at least 24 hours in advance"*. If someone tries to cancel late, the system enforces your policy.\n- **Automated Slot Recycling**: The moment an appointment is rescheduled or cancelled, that open slot immediately becomes visible for other clients to book.\n- **Automated SMS & Email Reminders**: Friendly reminders sent 24 hours and 2 hours before the appointment cut no-shows by over 80%.\n\nWould you also like to require upfront deposits when clients book?`
    };
  }

  // I. Refunds & Order Management
  if (
    lower.includes('refund') ||
    lower.includes('return') ||
    lower.includes('money back') ||
    lower.includes('cancel order') ||
    lower.includes('dispute')
  ) {
    return {
      text: `${reassurancePrefix}### Simple 1-Click Refunds & Order Management\n\n**You have total control over all customer transactions through an intuitive dashboard:**\n\n- **1-Click Refunds**: Issue full or partial refunds directly back to your customer's card, PayPal, or payment method with one click.\n- **Instant Customer Receipts**: Your customer immediately receives an official cancellation and refund confirmation email.\n- **Zero Technical Hassle**: You never have to log into complicated banking systems or write emails back and forth.\n- **Stock Readjustment**: For product stores, refunded or returned items can automatically be added back to your available inventory with one checkbox.\n\nArnel walks you through this in a 2-minute video walkthrough so you feel 100% confident managing orders.`
    };
  }

  // J. Multiple Branches, Locations & Offices
  if (
    lower.includes('branch') ||
    lower.includes('branches') ||
    lower.includes('multiple location') ||
    lower.includes('multi location') ||
    lower.includes('multiple office') ||
    lower.includes('different city')
  ) {
    return {
      text: `${reassurancePrefix}### Multi-Branch & Multi-Location Support\n\n**Yes, managing multiple offices, branches, or job sites is built right in:**\n\n- **Customer Location Selector**: Visitors pick which branch is nearest to them to see branch-specific hours, contact details, or menus.\n- **Branch-Specific Bookings & Staff**: In booking systems, clients book with staff members dedicated to that specific location.\n- **GPS Location Validation**: In workforce tools like **Present Po**, employees can only check in if their phone GPS matches that branch's physical coordinates.\n- **Central Admin Overview**: As the owner, you can view company-wide performance in one dashboard or filter reports by individual branch.\n\nHow many branches or locations do you currently operate?`
    };
  }

  // K. Staff Roles, Permissions & Privacy
  if (
    lower.includes('staff login') ||
    lower.includes('receptionist') ||
    lower.includes('employee access') ||
    lower.includes('hide profit') ||
    lower.includes('permissions') ||
    lower.includes('roles')
  ) {
    return {
      text: `${reassurancePrefix}### Role-Based Access & Owner Privacy\n\n**Yes! You can give team members access without revealing your financial numbers:**\n\n- **Owner Account**: Full access to all sales revenue, profit margins, client lists, and business settings.\n- **Manager / Receptionist Account**: Can view and manage incoming bookings, update order statuses, or track staff schedules without seeing revenue or bank settings.\n- **Staff / Worker Account**: Individual staff members can view their own schedule, check in for shifts, or see client notes assigned specifically to them.\n\nThis keeps your operations smooth while protecting sensitive business data.`
    };
  }

  // L. Multi-Currency & Global Payments
  if (
    lower.includes('currency') ||
    lower.includes('currencies') ||
    lower.includes('dollar') ||
    lower.includes('peso') ||
    lower.includes('international') ||
    lower.includes('worldwide') ||
    lower.includes('foreign') ||
    lower.includes('euro')
  ) {
    return {
      text: `${reassurancePrefix}### Multi-Currency & Global Payment Acceptance\n\n**Yes, selling to international clients or tourists is fully supported:**\n\n- **Automatic Currency Display**: Shoppers see prices automatically in their local currency (e.g. USD, EUR, GBP, PHP, AUD, CAD).\n- **International Cards Accepted**: Customers anywhere in the world can checkout using Visa, Mastercard, American Express, Apple Pay, Google Pay, or PayPal.\n- **Direct Bank Settlement**: Payments convert seamlessly and deposit directly into your business bank account.\n\nWill your primary customer base be local, international, or a mix of both?`
    };
  }

  // M. Installments & Milestone Payment Terms
  if (
    lower.includes('installment') ||
    lower.includes('milestone') ||
    lower.includes('payment term') ||
    lower.includes('payment plan') ||
    lower.includes('downpayment') ||
    lower.includes('half upfront') ||
    lower.includes('split payment')
  ) {
    return {
      text: `${reassurancePrefix}### Milestone-Based Project Payments (Zero Financial Risk)\n\n**Yes! You never pay 100% upfront.** Arnel uses a clear, fair milestone schedule:\n\n1. **50% Kickoff Deposit**: Secures your dedicated project sprint on Arnel's calendar and covers initial design and architecture.\n2. **Weekly Interactive Previews**: Every week, you receive a test link on your phone to review progress, test features, and give feedback.\n3. **50% Final Balance Upon Launch**: You only pay the remaining balance once your project is completely tested, approved by you, and ready to go live.\n\nThis gives you total peace of mind, knowing that Arnel is fully invested in delivering exactly what you approved.\n\nWould you like a tailored proposal for your project?`
    };
  }

  // N. Keeping Web Address (Domain) & Migration
  if (
    lower.includes('godaddy') ||
    lower.includes('namecheap') ||
    lower.includes('wix') ||
    lower.includes('wordpress') ||
    lower.includes('squarespace') ||
    lower.includes('keep my domain') ||
    lower.includes('keep my url') ||
    lower.includes('already have a domain') ||
    lower.includes('existing domain')
  ) {
    return {
      text: `${reassurancePrefix}### Keeping Your Web Address & Smooth Migration\n\n**Yes, you keep your exact existing web address (domain) with zero downtime:**\n\n- **No Domain Re-Purchasing**: Whether your domain is registered on GoDaddy, Namecheap, Google, or Cloudflare, Arnel connects it for you.\n- **Zero Disruption**: Your existing website stays live until the brand-new version is 100% ready, tested, and approved by you.\n- **Seamless Switchover**: When we flip the switch, your domain points directly to your new, fast website within minutes.\n- **SEO Protection**: All existing page links are safely redirected so you never lose your Google ranking or regular visitors.\n\nWhat is your current website address, or where is your domain currently registered?`
    };
  }

  // O. Point-and-Click Self-Editing
  if (
    lower.includes('can i edit') ||
    lower.includes('edit text') ||
    lower.includes('update photo') ||
    lower.includes('change price') ||
    lower.includes('add product') ||
    lower.includes('upload photo') ||
    lower.includes('change pictures') ||
    lower.includes('do it myself') ||
    lower.includes('manage myself') ||
    lower.includes('admin panel') ||
    lower.includes('dashboard')
  ) {
    return {
      text: `${reassurancePrefix}### 100% Point-and-Click Self-Editing (Zero Coding Needed)\n\n**Yes! You will never have to pay a developer every time you want to change a photo, price, or sentence:**\n\n- **Visual Admin Panel**: Log into a clean, simple dashboard from your phone or laptop.\n- **Tap to Update**: Click on a product to change its price, upload a new photo from your camera roll, or type a new announcement in 30 seconds.\n- **2-Minute Video Guides**: At handoff, Arnel records custom, bite-sized video walkthroughs showing you exactly where to click for your daily tasks.\n- **Impossible to Break**: The technical foundation is safely locked down behind the scenes so you can edit content freely without worrying about breaking the layout.\n\nWhat parts of your site do you anticipate updating most frequently (e.g. photos, prices, blog posts, or announcements)?`
    };
  }

  // How to Get Started & Contact Arnel ("how to start", "hire", "contact", "consultation", "email")
  if (
    lower.includes('contact') ||
    lower.includes('hire') ||
    lower.includes('start') ||
    lower.includes('get started') ||
    lower.includes('email') ||
    lower.includes('reach') ||
    lower.includes('consultation') ||
    lower.includes('talk')
  ) {
    return {
      text: `${reassurancePrefix}### Ready to Bring Your Project to Life?\n\nHere are the fastest ways to connect with Arnel:\n\n1. **Step-by-Step Project Form**: Fill out the 3-step project form below to share your project type, desired timeline, and goals.\n2. **Direct Email**: Send a note to **arnlebaylon15@gmail.com** (Arnel responds within 24 hours).\n3. **LinkedIn**: Connect directly at [linkedin.com/in/arnel-baylon-b05233189](https://www.linkedin.com/in/arnel-baylon-b05233189).\n\nLet's discuss how we can launch your website or web app!`,
      action: { type: 'open_contact', sectionId: 'contact', label: 'Open Project Inquiry Form' }
    };
  }

  // ── 8. GENERAL SERVICES OVERVIEW (ONLY when asking an open question without picking an option) ──
  if (
    lower.includes('what can you build') ||
    lower.includes('what do you build') ||
    lower.includes('services') ||
    lower.includes('what can arnel') ||
    lower.includes('capabilities') ||
    lower.includes('what businesses') ||
    lower.includes('business solutions') ||
    lower.includes('what do you offer') ||
    lower.includes('what you offer') ||
    lower.includes('show me what you offer') ||
    lower.includes('what kind of business') ||
    lower.includes('what can you do') ||
    lower.includes('what do you do') ||
    lower.includes('list of services') ||
    lower.includes('build my')
  ) {
    return {
      text: `${reassurancePrefix}### What Arnel Builds for Businesses\n\nArnel partners with founders and business owners to build high-converting digital products:\n\n1. **Custom Websites & Landing Pages**: Fast, mobile-first websites designed to build credibility and turn visitors into paying clients.\n2. **Online Stores & E-Commerce**: Seamless mobile checkout, instant customer SMS/email notifications, and easy inventory management (e.g. **Tearsize**).\n3. **Client Portals & Booking Systems**: Interactive appointment booking, customer onboarding dashboards, and payment collection (e.g. **HiveSync VA**).\n4. **Operations & Staff Tools**: QR-code staff check-ins, location validation, and automatic daily timesheets (e.g. **Present Po**, **VCM HRIS**).\n5. **Intelligent AI Assistants**: 24/7 customer support bots, document organizers, and automated workflows tailored to your business data (e.g. **eBuddy**, **FinOps AI**).\n\nWhich type of solution are you looking to build?`,
      action: { type: 'navigate', destination: 'projects', sectionId: 'projects', label: 'View Project Examples' }
    };
  }

  // ── 9. DYNAMIC WIDE-CONTEXT ADAPTIVE FALLBACKS (Context-Aware, Non-Repetitive, Conversational) ──
  // A. E-Commerce / Store Context Fallback
  if (hasStoreContext) {
    const storeFollowUps = [
      `### Tailored for Your Online Store\n\n**That is a great feature idea!** Because Arnel custom-builds your store from the ground up rather than using restrictive generic templates, that exact shopping experience can be seamlessly implemented:\n\n- **Phone-First Flow**: Engineered so mobile shoppers can browse and complete purchases in under a minute\n- **Easy for You to Control**: Managed directly from your point-and-click dashboard with zero coding\n- **Fast 2–4 Week Launch**: Arnel incorporates your requirements and sends weekly test links to your phone\n\nArnel can easily factor this into your store roadmap. Would you like to share a few more specifics through the 3-step project form below, or send a quick note to **arnlebaylon15@gmail.com**?`,
      `### Custom E-Commerce Features\n\n**Yes, absolutely!** When building custom stores like **Tearsize**, Arnel regularly implements tailored customer features to help brands stand out and boost sales:\n\n- **Seamless Checkout**: Customers enjoy a smooth, reliable buying process on phones and laptops\n- **Direct Bank Payouts**: All payments deposit straight into your account without third-party holds\n- **Total Ownership**: You own 100% of your store files, customer lists, and accounts from Day 1\n\nTell me a bit more about how you envision this working, or fill out the 3-step project form below so Arnel can prepare a clear plan!`
    ];
    return {
      text: pickNonRepeating(storeFollowUps, history),
      action: { type: 'open_contact', sectionId: 'contact', label: 'Plan Store Features' }
    };
  }

  // B. Booking & Appointments Context Fallback
  if (hasBookingContext) {
    const bookingFollowUps = [
      `### Custom-Tailored for Your Booking Experience\n\n**That is a great workflow consideration!** Because Arnel builds custom appointment systems (like **HiveSync VA** and healthcare clinic portals), we can tailor that process directly to how your clients and staff work:\n\n- **Effortless for Clients**: Clients see your real-time availability and confirm in 3 taps on their phone\n- **Saves Staff Time**: Cuts out repetitive phone calls and eliminates double-booking errors\n- **Automated Alerts**: Syncs with calendars and sends friendly reminders to stop no-shows\n\nWould you like Arnel to review your specific booking workflow? You can fill out the 3-step project form below or email **arnlebaylon15@gmail.com**!`,
      `### Streamlined Client Appointments\n\n**Yes, definitely!** Arnel designs booking and client platforms specifically to eliminate administrative bottlenecks:\n\n- **Tailored Rules**: Set custom buffers between appointments, cutoff times, and deposit requirements\n- **Mobile-Friendly**: Works smoothly on any smartphone with zero apps for clients to download\n- **30-Day Launch Warranty**: Arnel supports your launch to make sure everything runs smoothly\n\nFeel free to share your specific requirements through the 3-step form below so Arnel can put together a customized plan for you!`
    ];
    return {
      text: pickNonRepeating(bookingFollowUps, history),
      action: { type: 'open_contact', sectionId: 'contact', label: 'Start Booking Project' }
    };
  }

  // C. Staff & Operations Context Fallback
  if (hasStaffContext) {
    const staffFollowUps = [
      `### Tailored Operations for Your Team\n\n**That is a very practical operations question!** Arnel engineers workforce tools like **Present Po** and **VCM HRIS** to fit the exact daily realities of teams on-site and in the office:\n\n- **Easy for Workers**: Simple phone QR check-ins with GPS verification—no complicated logins\n- **Saves Days on Admin**: Daily hours and overtime calculate automatically for payroll\n- **Clear Management Control**: Central dashboard lets you monitor operations in real time\n\nArnel can easily adapt this to your company's workflow. Tell me a bit more about your team setup, or share your details via the 3-step form below!`,
      `### Smart Workforce Tools\n\n**Yes, absolutely.** Custom tools are built to eliminate paper timesheets and spreadsheet chaos:\n\n- **Custom Business Rules**: Tailor breaks, overtime rates, and shift schedules to your policy\n- **100% Total Ownership**: You own all files and accounts with zero expensive per-seat monthly subscriptions\n- **Turnkey Launch**: Delivered in 2 to 4 weeks with video guides for your managers\n\nWould you like to explore setting this up for your business?`
    ];
    return {
      text: pickNonRepeating(staffFollowUps, history),
      action: { type: 'open_project', projectId: 'present-po', label: 'View Workforce Case Study' }
    };
  }

  // D. General Wide-Context Fallback (Zero robotic phrases)
  const wideContextFallbacks = [
    `${reassurancePrefix}### Custom Digital Solutions for Your Business\n\n**That is a great question!** Arnel partners directly with founders and business owners to build websites, online stores, client portals, and operations tools tailored specifically to how your business works.\n\nBecause every solution is custom-engineered from the ground up rather than constrained by cookie-cutter templates, Arnel can tailor the design, features, and workflows to match your exact goals:\n\n- **Fast 2–4 Week Turnaround**: We take you from idea to live launch with weekly interactive test links on your phone\n- **Transparent Fixed Quotes**: Defined upfront with zero surprise bills, hourly creep, or hidden fees\n- **100% Non-Tech Friendly**: Easy point-and-click dashboard to update text and photos yourself, plus 2-minute video guides\n- **Total Ownership**: You own all files, accounts, and designs from Day 1\n\nWhat is the main goal you'd like your project to achieve? You can also share your ideas directly through the 3-step form below!`,
    `${reassurancePrefix}### Bringing Your Vision to Life\n\n**Yes, definitely!** Whatever features or workflows you have in mind, Arnel specializes in turning business ideas into fast, easy-to-use digital products:\n\n- **Designed Phone-First**: Over 70% of web traffic is mobile, so every button, form, and page feels as smooth as an app\n- **Hands-Off Setup**: Arnel handles all technical details (hosting, security, connections) so it's completely stress-free for you\n- **Direct Founder Collaboration**: You work 1-on-1 with Arnel from start to finish\n\nWould you like to explore how we can build this for you? Feel free to fill out the 3-step project form below or email Arnel directly at **arnlebaylon15@gmail.com**!`
  ];

  return {
    text: pickNonRepeating(wideContextFallbacks, history),
    action: { type: 'open_contact', sectionId: 'contact', label: 'Share Your Project Idea' }
  };
}

/**
 * Dynamically synthesizes polished, natural, non-repetitive, context-aware conversational responses
 */
export function synthesizeDynamicResponse(
  userQuery: string,
  persona: AdaptivePersona = 'default',
  uiContext?: UIContext,
  history: ChatMessageData[] = []
): { text: string; action?: AgentAction } {
  const trimmed = userQuery.trim();
  const lower = trimmed.toLowerCase().replace(/[.,!?;:]/g, '');

  // ── ROUTE CLIENT PERSONA TO DEDICATED GROUNDED CLIENT ADVISOR ──
  if (persona === 'client') {
    return synthesizeClientResponse(trimmed, lower, history, uiContext);
  }

  // Get previous assistant message for conversational continuity
  const previousAssistantMsg = [...history]
    .reverse()
    .find(m => m.role === 'assistant' && m.content)?.content?.toLowerCase() || '';

  // 1. Conversational Acknowledgments & Affirmations ("ok", "cool", "sounds good", "nice", "got it", etc.)
  const isAffirmation = /^(ok|okay|k|kk|alright|all right|got it|gotcha|cool|nice|sounds good|great|awesome|perfect|understood|understands|yes|yep|yeah|sure|no problem|noted|fine|sweet|bet|neat|dope)$/i.test(trimmed);
  if (isAffirmation) {
    if (previousAssistantMsg.includes('project') || previousAssistantMsg.includes('e buddy') || previousAssistantMsg.includes('pacementor')) {
      const followUps = [
        "Glad that helped! Would you like to check out another project, look into his tech stack, or discuss collaborating with Arnel?",
        "Sounds good! Feel free to ask if you'd like to see live demos, architecture details, or his other applications.",

        "Awesome! Let me know if you want to explore more projects or see his engineering background."
      ];
      return { text: pickNonRepeating(followUps, history) };
    }
    if (previousAssistantMsg.includes('skill') || previousAssistantMsg.includes('tech stack') || previousAssistantMsg.includes('typescript') || previousAssistantMsg.includes('next.js')) {
      return {
        text: "Awesome. Let me know if you'd like to see how Arnel applies this stack in production applications like e Buddy or Present Po."
      };
    }
    if (previousAssistantMsg.includes('experience') || previousAssistantMsg.includes('internship') || previousAssistantMsg.includes('hospital')) {
      return {
        text: "Understood! Would you like to review his verified IBM and AWS certifications, or explore his featured projects?"
      };
    }
    if (previousAssistantMsg.includes('contact') || previousAssistantMsg.includes('email') || previousAssistantMsg.includes('reach')) {
      return {
        text: "Sounds good! Don't hesitate to reach out to Arnel directly via the contact form or LinkedIn whenever you're ready."
      };
    }

    const naturalConfirmations = [
      "Understood! Let me know what you'd like to explore next—projects, technical skills, or getting in touch with Arnel.",
      "Sounds good! Feel free to ask if anything catches your eye or if you'd like me to navigate anywhere on the page.",
      "Got it! What would you like to check out next—his AI systems, engineering background, or verified credentials?",
      "Right on! Let me know where you'd like to dive in next."
    ];
    return { text: pickNonRepeating(naturalConfirmations, history) };
  }

  // 2. Gratitude & Appreciation ("thanks", "thank you", "ty", "appreciate it")
  if (/^(thanks|thank you|ty|tysm|thank you yhelai|thanks yhelai|thank you jarvis|thanks jarvis|appreciate it|much appreciated|thanks a lot|many thanks)[\s!.]*$/i.test(trimmed)) {
    const thanksResponses = [
      "You're very welcome! Let me know if you'd like to explore more of Arnel's work or connect with him directly.",
      "Always happy to assist! Feel free to ask anything else about his background, projects, or technical capabilities.",
      "My pleasure! Enjoy exploring the portfolio.",
      "Anytime! Let me know if you need anything else navigated or explained."
    ];
    return { text: pickNonRepeating(thanksResponses, history) };
  }

  // 3. Goodbyes & Parting ("bye", "goodbye", "see ya", "cya")
  if (/^(bye|goodbye|see ya|cya|have a nice day|have a good one|talk later|take care|later)[\s!.]*$/i.test(trimmed)) {
    const goodbyes = [
      "Goodbye! Thanks for visiting Arnel's portfolio. Feel free to return anytime or connect with him on LinkedIn.",
      "Take care! Have a great day ahead, and don't hesitate to reach out to Arnel for collaborations.",
      "See you! Thanks for checking out Arnel's work."
    ];
    return { text: pickNonRepeating(goodbyes, history) };
  }

  // 4. Greetings & Small Talk ("hi", "hello", "hey")
  const isGreeting = /^(hi|hello|hey|hey there|good morning|good afternoon|good evening|sup|yo|what's up|howdy|greetings|hi yhelai|hello yhelai|hi jarvis|hello jarvis|how are you|how's it going)[\s!.]*$/i.test(trimmed);
  if (isGreeting) {
    const previousAssistantMessages = history.filter(m => m.role === 'assistant' && m.content);
    const isFirstInteraction = previousAssistantMessages.length === 0;

    if (!isFirstInteraction) {
      const followUpGreetings = [
        "Hello again! What else can I bring up or navigate to for you?",
        "Still right here! What would you like to explore next—projects, skills, or credentials?",
        "Hey! How can I help you continue exploring Arnel's portfolio?",
        "Ready when you are! Let me know what you'd like to inspect or ask about."
      ];
      return { text: pickNonRepeating(followUpGreetings, history) };
    }

    // First Chat Welcome Introductory Message
    const welcomeIntroGreetings = [
      "Hello! Welcome to Arnel's portfolio. I'm **yhelAI**, an AI assistant integrated into the site. I can walk you through his full-stack projects (like **e Buddy** and **PaceMentor**), his AI & Context Engineering stack, or navigate anywhere on the page for you. What would you like to explore first?",
      "Hey there! Welcome to Arnel's portfolio. I'm **yhelAI**, his AI assistant. Feel free to ask about his software projects, technical background in Next.js & AI Agent workflows, or his 11 verified IBM and AWS certifications. Where should we start?",
      "Greetings! Welcome to Arnel's portfolio. I'm **yhelAI**, his interactive AI companion. I'm here to help you inspect his production applications, technical skills, engineering timeline, or get in touch with Arnel. What can I bring up for you?"
    ];
    return { text: pickNonRepeating(welcomeIntroGreetings, history) };
  }

  // 5. Follow-ups & Continuations ("what else", "tell me more", "anything else", "more")
  if (/^(what else|tell me more|anything else|more details|continue|elaborate|show more)[\s!.]*$/i.test(trimmed)) {
    if (previousAssistantMsg.includes('e buddy') || previousAssistantMsg.includes('pacementor') || previousAssistantMsg.includes('project')) {
      return {
        text: "Arnel has also built **Hospital Queuing System** (an AI triage platform deployed at GEAMH), **yhel.os** (a complete freelance operating system), and **VCM HRIS** (enterprise payroll & QR attendance).\n\nWould you like me to open any of these?",
        action: { type: 'navigate', destination: 'projects', sectionId: 'projects', label: 'View Projects' }
      };
    }
    if (previousAssistantMsg.includes('skill') || previousAssistantMsg.includes('stack')) {
      return {
        text: "Beyond full-stack web and AI orchestration, Arnel builds cross-platform mobile apps with Flutter & Dart, and designs relational database schemas in PostgreSQL with pgvector.",
        action: { type: 'navigate', destination: 'skills', sectionId: 'skills', label: 'View Skills' }
      };
    }
    return {
      text: "You can explore Arnel's engineering experience timeline, examine his 11 verified IBM and AWS badges, or review case studies in his project showcase.",
      action: { type: 'navigate', destination: 'projects', sectionId: 'projects', label: 'Explore Portfolio' }
    };
  }

  // 6. AI Identity & Capabilities ("who are you", "what can you do", "help", "are you real", "what is yhelai")
  if (lower === 'what can you do' || lower === 'help' || lower === 'what are your capabilities' || lower === 'who created you' || lower === 'who made you' || lower === 'what is yhelai' || lower === 'what is jarvis') {
    return {
      text: "I am **yhelAI**, an interactive AI assistant integrated into Arnel's portfolio. I can:\n\n- Walk you through Arnel's **projects, system architectures, and tech stack**\n- Navigate the portfolio and open live project showcases for you\n- Answer questions about his **experience, 11 verified credentials, and education**\n- Help you initiate contact or request a project consultation\n\nWhat would you like to explore first?"
    };
  }

  // 7. Specific Project Queries with Sub-intent Matching (Tech Stack vs Features vs Overview)
  for (const p of projectsData) {
    const slugMatch = lower.includes(p.slug);
    const titleMatch = lower.includes(p.title.toLowerCase()) || (p.featuredTitle && lower.includes(p.featuredTitle.toLowerCase()));
    const nickMatch = (p.slug === 'e-buddy' && (lower.includes('ebuddy') || lower.includes('egov') || lower.includes('e-gov') || lower.includes('gov'))) ||
                      (p.slug === 'pacementor' && (lower.includes('pace') || lower.includes('running coach'))) ||
                      (p.slug === 'present-po' && (lower.includes('present po') || lower.includes('attendance'))) ||
                      (p.slug === 'hospital-queuing-system' && (lower.includes('hospital') || lower.includes('queuing') || lower.includes('triage') || lower.includes('geamh'))) ||
                      (p.slug === 'vcm-hris' && (lower.includes('vcm') || lower.includes('hris') || lower.includes('payroll'))) ||
                      (p.slug === 'yhel-os' && (lower.includes('yhel') || lower.includes('freelance os'))) ||
                      (p.slug === 'tearsize' && lower.includes('tearsize')) ||
                      (p.slug === 'hivesync-va' && lower.includes('hivesync')) ||
                      (p.slug === 'tmrc' && (lower.includes('tmrc') || lower.includes('running club')));

    if (slugMatch || titleMatch || nickMatch) {
      const isTechStackQuery = lower.includes('tech') || lower.includes('stack') || lower.includes('technologies') || lower.includes('technology') || lower.includes('built with') || lower.includes('language') || lower.includes('framework') || lower.includes('tool') || lower.includes('tools') || lower.includes('libraries');
      const isFeatureQuery = lower.includes('feature') || lower.includes('features') || lower.includes('highlight') || lower.includes('highlights') || lower.includes('capability') || lower.includes('capabilities') || lower.includes('what does it do') || lower.includes('how does it work');

      const action: AgentAction = {
        type: 'open_project',
        projectId: p.slug,
        label: `Open ${p.title}`
      };

      const formattedTags = naturalListJoin(p.tags);

      // Sub-intent A: Tech Stack of the Project
      if (isTechStackQuery) {
        const techOpeners = [
          `For **${p.title}**, the tech stack includes ${formattedTags}.`,
          `Looking at **${p.title}**, it's powered by ${formattedTags}.`,
          `**${p.title}** is built with ${formattedTags}.`,
          `The technology stack behind **${p.title}** comprises ${formattedTags}.`
        ];
        return {
          text: `${pickNonRepeating(techOpeners, history)}\n\nOpening the project details for you.`,
          action
        };
      }

      // Sub-intent B: Features / Highlights of the Project
      if (isFeatureQuery) {
        const topFeatures = p.features && p.features.length > 0
          ? p.features.slice(0, 4).map(f => `- ${f}`).join('\n')
          : p.summary;
        const featureOpeners = [
          `Key highlights for **${p.title}** include:`,
          `Here's what **${p.title}** offers:`,
          `Core capabilities of **${p.title}** include:`
        ];
        return {
          text: `${pickNonRepeating(featureOpeners, history)}\n\n${topFeatures}\n\nThe tech stack includes: ${formattedTags}.\n\nOpening the project showcase for you.`,
          action
        };
      }

      // Sub-intent C: General Project Overview
      const topFeatures = p.features && p.features.length > 0
        ? p.features.slice(0, 3).map(f => `- ${f}`).join('\n')
        : '';
      const formattedSummary = p.summary.startsWith('Client project') || p.summary.startsWith('Community') || p.summary.startsWith('Workforce') || p.summary.startsWith('QR-code')
        ? p.summary
        : p.summary.charAt(0).toLowerCase() + p.summary.slice(1);

      const overviewOpeners = [
        `**${p.title}** is ${formattedSummary}`,
        `Here is an overview of **${p.title}**: ${formattedSummary}`,
        `**${p.title}** — ${formattedSummary}`
      ];

      return {
        text: `${pickNonRepeating(overviewOpeners, history)}\n\n**Key Highlights:**\n${topFeatures}\n\nThe tech stack includes: ${formattedTags}.\n\nOpening the project showcase for you.`,
        action
      };
    }
  }

  // 8. General Tech Stack & Skills
  const isExplicitTechQuery =
    lower.includes('skill') ||
    lower.includes('tech stack') ||
    lower.includes('technologies') ||
    lower.includes('programming') ||
    lower.includes('languages') ||
    lower.includes('frameworks') ||
    (lower.includes('stack') && !lower.includes('full stack') && !lower.includes('fullstack') && !lower.includes('background'));

  if (isExplicitTechQuery) {
    const action: AgentAction = {
      type: 'navigate',
      destination: 'skills',
      sectionId: 'skills',
      label: 'View Skills'
    };

    if (lower.includes('ai') || lower.includes('context')) {
      return {
        text: "In AI & Context Engineering, Arnel specializes in:\n- Agentic execution loops & autonomous tool calling\n- RAG vector architectures with semantic search\n- LLM orchestration using Groq (Llama 3.3) and OpenAI\n- Dynamic context management and prompt engineering\n\nNavigating to the skills section.",
        action
      };
    }

    if (lower.includes('frontend') || lower.includes('front-end') || lower.includes('react') || lower.includes('next')) {
      return {
        text: "On the frontend and mobile side, Arnel builds with Next.js (App Router), React 18, TypeScript, Vue.js 3, Flutter & Dart for cross-platform mobile, Tailwind CSS, and Framer Motion.\n\nNavigating to the skills section.",
        action
      };
    }

    if (lower.includes('backend') || lower.includes('database') || lower.includes('sql')) {
      return {
        text: "On the backend and database side, Arnel works with Node.js, Laravel (PHP), PostgreSQL with pgvector, MySQL, Supabase, and Firebase.\n\nNavigating to the skills section.",
        action
      };
    }

    const skillsOpeners = [
      "Arnel's core technical stack spans AI systems, modern frontend, and scalable backends:",
      "Here is a breakdown of Arnel's primary technical competencies:",
      "Arnel's engineering toolkit includes:"
    ];

    return {
      text: `${pickNonRepeating(skillsOpeners, history)}\n\n- **AI & Context Engineering**: Agentic Loops, RAG Pipelines, Groq SDK, Prompt Engineering\n- **Frontend & Mobile**: Next.js, React, TypeScript, Vue.js, Flutter/Dart, Tailwind CSS\n- **Backend & Databases**: Node.js, Laravel, PHP, PostgreSQL, MySQL, Supabase\n- **Cloud & DevOps**: Vercel, AWS, Git, GitHub Actions\n\nNavigating to the skills section.`,
      action
    };
  }

  // 9. Who is Arnel / About Me / Bio
  if (lower === 'who are you' || lower === 'who is arnel' || lower.includes('who is arnel') || lower === 'tell me about yourself' || lower === 'tell me about you' || lower === 'about arnel' || ((lower.includes('about you') || lower.includes('about arnel') || lower.includes('about himself') || lower.includes('tell me about')) && !lower.includes('project') && !lower.includes('experience') && !lower.includes('background') && !lower.includes('hospital') && !lower.includes('skill') && !lower.includes('stack') && !lower.includes('certif') && !lower.includes('education') && !lower.includes('graduat') && !lower.includes('contact'))) {
    const bios = [
      "Arnel is a Context Engineer and Full-Stack Developer based in Cavite, Philippines. He builds modern web applications with Next.js and TypeScript, agentic AI workflows and RAG systems, and cross-platform mobile apps using Flutter. He is passionate about transforming complex engineering challenges into high-performance, intuitive digital experiences.",
      "Arnel A. Baylon is a Context Engineer and Full-Stack Software Developer with a BS in Information Technology from Cavite State University. He brings production experience in Next.js, TypeScript, AI Agent Orchestration (Groq, RAG architectures), Laravel, PostgreSQL, and cross-platform mobile apps with Flutter.",
      "Arnel specializes in Context Engineering and full-stack system architecture. His core focus is building agentic execution loops, high-precision RAG vector pipelines, and responsive Next.js/TypeScript applications backed by PostgreSQL, Supabase, and Laravel."
    ];
    return { text: pickNonRepeating(bios, history) };
  }

  // 10. Projects Overview / Recommendations
  if (lower.includes('project') || lower.includes('what have you built') || lower.includes('portfolio work') || lower.includes('showcase')) {
    const action: AgentAction = {
      type: 'navigate',
      destination: 'projects',
      sectionId: 'projects',
      label: 'View Projects'
    };

    if (lower.includes('best') || lower.includes('top') || lower.includes('recommend') || lower.includes('impressive')) {
      return {
        text: "Here are Arnel's standout projects:\n\n1. **e Buddy (eGov Hackathon 2026 Winner - Top 30)**: An agentic AI platform uniting government public services with chat and voice workflows.\n2. **PaceMentor**: An AI-powered running coach mobile app built with Flutter and Strava sync.\n3. **Present Po**: A B2B attendance and workforce time-tracking SaaS with AI journaling.\n\nNavigating to the projects section.",
        action
      };
    }

    return {
      text: "Arnel has developed a range of production applications across AI agent tools, B2B SaaS, mobile apps, and e-commerce:\n\n- **e Buddy**: Agentic AI for public government services (eGov Hackathon 2026 Winner - Top 30)\n- **PaceMentor**: AI running coach app in Flutter\n- **Present Po**: Workforce attendance platform with AI journaling\n- **Hospital Queuing System**: AI triage system deployed at GEAMH\n- **yhel.os**: All-in-one freelance operating system\n- **VCM HRIS**: QR attendance & automated payroll system\n\nNavigating to the projects section.",
      action
    };
  }

  // 11. Engineering Background / Experience / Internship / Work History
  if (
    lower.includes('background') ||
    lower.includes('experience') ||
    lower.includes('internship') ||
    lower.includes('work history') ||
    lower.includes('career') ||
    lower.includes('job') ||
    lower.includes('hospital')
  ) {
    const action: AgentAction = {
      type: 'navigate',
      destination: 'experience',
      sectionId: 'experience',
      label: 'View Experience'
    };

    const backgroundResponses = [
      "Arnel's engineering background includes a Bachelor of Science in Information Technology from Cavite State University, a 486-hour software engineering internship at General Emilio Aguinaldo Memorial Hospital where he built an AI triage and queuing platform, and freelance work delivering client platforms like Present Po, Tearsize, and HiveSync VA.\n\nNavigating to the experience timeline.",
      "Looking at Arnel's background, he is a Full-Stack Developer and Context Engineer. His background highlights practical engineering at GEAMH developing AI hospital systems, architecting enterprise HRIS software with QR attendance, and earning 11 verified IBM and AWS technical certifications.\n\nNavigating to the experience timeline.",
      "Arnel's professional background covers full-stack web and AI engineering across three major milestones:\n\n1. **GEAMH Hospital Internship**: Engineered an AI patient queuing and triage system in Vue.js, PHP, and Groq LLMs.\n2. **Enterprise HRIS Capstone**: Built VCM HRIS with QR-code presence validation and automated payroll.\n3. **Freelance Solutions**: Delivered client platforms including Present Po, Tearsize, and HiveSync VA.\n\nNavigating to the experience timeline."
    ];

    return {
      text: pickNonRepeating(backgroundResponses, history),
      action
    };
  }

  // 12. Certifications & Badges
  if (lower.includes('certif') || lower.includes('badge') || lower.includes('ibm') || lower.includes('aws') || lower.includes('credly')) {
    const action: AgentAction = {
      type: 'navigate',
      destination: 'certifications',
      sectionId: 'certifications',
      label: 'View Certifications'
    };

    return {
      text: "Arnel holds 11 verified professional credentials:\n\n- **IBM AI Certifications (7 Badges)**: AI Foundations, Machine Learning, Deep Learning, and RAG Architecture.\n- **AWS Cloud Certifications (4 Badges)**: Advanced SQL & Database Design, Generative AI, S3 Object Storage, and Serverless Systems.\n\nNavigating to the certifications section.",
      action
    };
  }

  // 13. Education
  if (lower.includes('education') || lower.includes('university') || lower.includes('college') || lower.includes('degree') || lower.includes('cvsu') || lower.includes('school') || lower.includes('study') || lower.includes('studied') || lower.includes('graduat')) {
    const action: AgentAction = {
      type: 'navigate',
      destination: 'education',
      sectionId: 'education',
      label: 'View Education'
    };

    return {
      text: "Arnel earned his **Bachelor of Science in Information Technology (BS IT)** from **Cavite State University (Main Campus)** in Indang, Cavite, Philippines, focusing on software engineering, database systems, and artificial intelligence.\n\nNavigating to the education section.",
      action
    };
  }

  // 14. Contact / Hiring / Quote
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach') || lower.includes('rate') || lower.includes('quote') || lower.includes('message')) {
    const action: AgentAction = {
      type: 'open_contact',
      sectionId: 'contact',
      label: 'Contact Form'
    };

    const contactOpeners = [
      "You can connect with Arnel directly through the following channels:",
      "Here are the best ways to reach Arnel:",
      "Feel free to reach out to Arnel via:"
    ];

    return {
      text: `${pickNonRepeating(contactOpeners, history)}\n\n- **Email**: arnlebaylon15@gmail.com\n- **LinkedIn**: linkedin.com/in/arnel-baylon-b05233189\n- **GitHub**: github.com/hiroqt\n\nOpening the contact form for you now.`,
      action
    };
  }

  // 15. Direct Navigation Commands
  if (lower.includes('go to') || lower.includes('take me to') || lower.includes('scroll to') || lower.includes('navigate to')) {
    if (lower.includes('project')) {
      return { text: "Navigating to the projects section.", action: { type: 'navigate', destination: 'projects', sectionId: 'projects', label: 'View Projects' } };
    }
    if (lower.includes('skill')) {
      return { text: "Navigating to the skills section.", action: { type: 'navigate', destination: 'skills', sectionId: 'skills', label: 'View Skills' } };
    }
    if (lower.includes('experience') || lower.includes('history') || lower.includes('timeline')) {
      return { text: "Navigating to the experience timeline.", action: { type: 'navigate', destination: 'experience', sectionId: 'experience', label: 'View Experience' } };
    }
    if (lower.includes('contact')) {
      return { text: "Opening the contact form.", action: { type: 'open_contact', sectionId: 'contact', label: 'Contact Section' } };
    }
    if (lower.includes('education')) {
      return { text: "Navigating to the education section.", action: { type: 'navigate', destination: 'education', sectionId: 'education', label: 'Education Section' } };
    }
    if (lower.includes('certif') || lower.includes('badge')) {
      return { text: "Navigating to verified certifications.", action: { type: 'navigate', destination: 'certifications', sectionId: 'certifications', label: 'Certifications' } };
    }
  }

  // 16. Hybrid RAG Search for Specific Domain Questions
  const searchResults = searchKnowledge(userQuery, { limit: 3 });
  if (searchResults.length > 0 && searchResults[0].score > 0.15) {
    const top = searchResults[0].chunk;
    const second = searchResults[1]?.chunk;

    let responseContent = top.content;
    if (second && second.id !== top.id && searchResults[1].score > 0.2) {
      responseContent += `\n\nAlso relevant: ${second.title} — ${second.content.substring(0, 180)}...`;
    }

    return {
      text: responseContent
    };
  }

  // 17. Natural, Open-Ended Conversational Fallback
  const fallbacks = [
    "I'm right here to assist! You can ask me about Arnel's engineering background, dive into projects like **e Buddy** and **PaceMentor**, check his **tech stack**, or ask me to navigate to any section on the site.",
    "Feel free to ask about any of Arnel's applications, technical skills in Next.js & AI Agent workflows, or his certified credentials. Where would you like to explore?",
    "I can help you navigate the portfolio, examine project architectures, or explore Arnel's work history. What would you like to see?"
  ];

  return {
    text: pickNonRepeating(fallbacks, history)
  };
}
