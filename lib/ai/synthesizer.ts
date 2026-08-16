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
        text: "Here are Arnel's standout projects:\n\n1. **e Buddy (eGov Hackathon 2026)**: An agentic AI platform uniting government public services with chat and voice workflows.\n2. **PaceMentor**: An AI-powered running coach mobile app built with Flutter and Strava sync.\n3. **Present Po**: A B2B attendance and workforce time-tracking SaaS with AI journaling.\n\nNavigating to the projects section.",
        action
      };
    }

    return {
      text: "Arnel has developed a range of production applications across AI agent tools, B2B SaaS, mobile apps, and e-commerce:\n\n- **e Buddy**: Agentic AI for public government services\n- **PaceMentor**: AI running coach app in Flutter\n- **Present Po**: Workforce attendance platform with AI journaling\n- **Hospital Queuing System**: AI triage system deployed at GEAMH\n- **yhel.os**: All-in-one freelance operating system\n- **VCM HRIS**: QR attendance & automated payroll system\n\nNavigating to the projects section.",
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
      "Arnel's engineering background includes a Bachelor of Science in Information Technology from Cavite State University, a 486-hour software engineering internship at General Emilio Aguinaldo Memorial Hospital where he built an AI triage and queuing platform, and freelance work delivering production platforms like Present Po, e Buddy, and VCM HRIS.\n\nNavigating to the experience timeline.",
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
      text: `${pickNonRepeating(contactOpeners, history)}\n\n- **Email**: arnelbaylon15@gmail.com\n- **LinkedIn**: linkedin.com/in/arnel-baylon-b05233189\n- **GitHub**: github.com/hiroqt\n\nOpening the contact form for you now.`,
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
