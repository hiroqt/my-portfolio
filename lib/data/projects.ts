export interface ProjectSection {
  title: string;
  content: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  type: string;
  summary: string;
  tags: string[];
  link: string;
  github?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  previewName?: string;
  embedUrl?: string;
  embedTitle?: string;
  features?: string[];
  content?: ProjectSection[];
  isFeatured?: boolean;
  featuredTag?: string;
  featuredSummary?: string;
  featuredTitle?: string;
  initiative?: string;
  metrics?: string[];
}

export const projectsData: ProjectData[] = [
  {
    slug: 'pixelcrew',
    title: 'Pixel Crew (Autonomous Multi-Agent Swarm & Startup Office)',
    type: 'Autonomous AI Swarm / Developer Tooling',
    summary: 'A visual AI agent orchestration workspace for coordinating tasks and following activity in a retro pixel-art office. Built with Node.js and JavaScript, without external dependencies; generated applications can target Next.js.',
    tags: ['Node.js', 'JavaScript', 'AI Agents', 'DAG Engine', 'AST Symbol Graph', 'Pixel Art UI'],
    link: 'https://github.com/hiroqt/PixelCrew',
    github: 'https://github.com/hiroqt/PixelCrew',
    image: '/images/pixelcrew.png',
    imageWidth: 1050,
    imageHeight: 420,
    previewName: 'pixelcrew.website',
    isFeatured: true,
    featuredTag: 'AUTONOMOUS AI SWARM',
    featuredTitle: 'Pixel Crew',
    featuredSummary: 'A visual AI agent orchestration workspace built with Node.js and JavaScript, with parallel tasks and a retro pixel-art office.',
    initiative: 'Open Source AI Tooling',
    metrics: [
      '23 Specialized agent command personas',
      'DAG task engine with parallel swarm loops',
      '64-pattern Impeccable anti-AI-slop design catalog',
      '60%+ Average token efficiency via AST symbol graphs'
    ],
    features: [
      'Directed Acyclic Graph (DAG) task engine orchestrating specialized agent personas in parallel',
      'Anti-AI-slop design system enforcing fluid clamp scales, asymmetric grids, and zero generic blobs',
      '23 Specialized autonomous agent personas with strict role boundaries & toolsets',
      'Universal compatibility across Claude, Cursor, Gemini, Codex, Grok, Kiro, Hermes, and OpenCode',
      'Interactive retro pixel-art tech startup office visual dashboard streaming live activity',
      'AST symbol-graph context extraction reducing token consumption by 50%–75%',
      'Multi-tiered consensus and automated security audit checks before code generation',
      'Dynamic persona spawning for Frontend, Backend, Security Sentinel, and QA SRE',
      'Context-aware multi-turn task memory and automated verification loops'
    ],
    content: [
      {
        title: 'Background & Motivation',
        content: 'Modern AI coding assistants often suffer from context window pollution, generic code generation, and single-agent hallucinations. Pixel Crew was architected to simulate an authentic, high-velocity engineering department where specialized autonomous agents collaborate under strict domain protocols.'
      },
      {
        title: 'Architecture & Token Efficiency',
        content: 'Pixel Crew implements AST symbol-graph extraction to provide subagents with localized semantic context rather than dumping entire codebases, reducing token consumption by 50% to 75%. Agents operate within isolated sandboxes and communicate via structured JSON protocols.'
      },
      {
        title: 'Interactive Pixel-Art Tech Startup Office',
        content: 'Alongside headless CLI execution, Pixel Crew features an interactive retro pixel-art startup office dashboard that visualizes subagent tasks, status, and collaborative handoffs in real time.'
      }
    ]
  },
  {
    slug: 'sakto-ka',
    title: 'Sakto Ka (AI Career Intelligence & ATS Resume Studio)',
    type: 'AI Career Intelligence / SaaS',
    summary: 'Private career copilot with offline-first ATS resume scoring, Python FastAPI scoring engine, job matching, and real-time voice interview simulations in the browser.',
    tags: ['Next.js 15', 'Python', 'FastAPI', 'TypeScript', 'Tailwind CSS', 'AI Copilot', 'ATS Optimizer'],
    link: 'https://saktoka.click',
    github: 'https://github.com/hiroqt',
    image: '/images/saktoka.png',
    imageWidth: 1254,
    imageHeight: 1254,
    previewName: 'saktoka.click',
    isFeatured: true,
    featuredTag: 'STATELESS AI CAREER COPILOT',
    featuredTitle: 'Sakto Ka',
    featuredSummary: 'Private career copilot with offline-first ATS resume scoring powered by Python FastAPI, job matching, and real-time voice interview simulations directly in your browser.',
    initiative: 'Career Intelligence System',
    metrics: [
      '90%+ Target score on enterprise ATS parsers',
      'Zero server-side data retention architecture',
      'STAR-method structured interview question simulations',
      'Direct browser-rendered vector PDF export'
    ],
    features: [
      'High-performance Python FastAPI service for instant ATS resume parsing, keyword extraction, and scoring heuristics',
      'Automated multi-source job discovery, qualification scoring, and keyword gap analysis',
      'ATS-Standard single-column resume studio compliant with Workday, Greenhouse, Lever, and Taleo parsers',
      'AI bullet-point enhancer transforming generic duties into metric-driven XYZ achievement statements',
      '1-Click role keyword tailoring and gap optimizer for target job descriptions',
      'AI Interview Prep Coach simulating role-specific technical and behavioral questions using STAR methodology',
      'Zero data retention architecture ensuring 100% client-side privacy with ephemeral demo session support',
      'Printable and selectable vector PDF generation directly in the browser',
      'Real-time light and dark theme mode support with responsive mobile navigation'
    ],
    content: [
      {
        title: 'Background & Purpose',
        content: 'Modern tech hiring workflows subject candidate applications to aggressive Applicant Tracking System (ATS) parsers and demanding multi-stage technical and behavioral interviews. sakto ka was developed as a privacy-first, stateless AI career copilot to give job seekers an end-to-end advantage from discovery to final offer.'
      },
      {
        title: 'Python FastAPI Engine & ATS-Standard Architecture',
        content: 'The platform pairs a responsive Next.js frontend with a high-performance Python FastAPI service to handle deep document parsing, keyword matching algorithms, and semantic ATS compliance heuristics. The system enforces strict single-column formatting, semantic hierarchy, and clean typographical tokens engineered to score 90%+ on parsers like Workday, Greenhouse, and Taleo.'
      },
      {
        title: 'Zero Data Retention & Privacy Architecture',
        content: 'Unlike traditional career tools that scrape and store candidate resumes and personal history, sakto ka operates on a zero-retention model. All state, career histories, and interview simulations remain strictly in client storage with instant session reset capabilities.'
      }
    ]
  },
  {
    slug: 'finops-ai-dashboard',
    title: 'FinOps AI Dashboard (Winner - Best Business Impact)',
    type: 'Financial Operations / Enterprise AI',
    summary: 'Awarded "Best Business Impact" at the Amazon Quick Quest Workshop (AWS BGC, Taguig). An intelligent financial operations hub combining automated expense categorization, invoice-to-PO reconciliation, and real-time policy compliance powered by Amazon Quick.',
    tags: ['Amazon Quick', 'FinOps', 'QuickSight Spaces', 'AWS', 'Google Connectors', 'AI Agents'],
    link: '/projects/finops-ai-dashboard',
    github: 'https://github.com/hiroqt',
    image: '/images/finops.jpg',
    imageWidth: 960,
    imageHeight: 1280,
    previewName: '-',
    isFeatured: true,
    featuredTag: 'WINNER - BEST BUSINESS IMPACT',
    featuredTitle: 'FinOps AI Dashboard',
    featuredSummary: 'Winner of Best Business Impact at the final capstone presentation of the 9-Week Amazon Quick Quest Workshop (AWS Office BGC). AI-powered financial operations hub automating expense reviews, invoice PO matching, and compliance.',
    initiative: 'Amazon Quick Quest Workshop (BGC)',
    metrics: [
      'Winner: Best Business Impact (Final Capstone Presentation, AWS BGC)',
      '80% Faster expense review cycle time',
      '95%+ Accuracy in financial anomaly detection',
      'Zero manual logging with persistent audit trails'
    ],
    features: [
      'Batch AI Expense Categorization & anomaly flagging',
      'Automated Invoice Reconciliation with Purchase Order (PO) matching',
      'Real-time Policy Compliance Engine with color-coded verdicts & audit checks',
      'Amazon Quick Spaces integration for live expense policy synchronization',
      'Amazon Quick Flows automating finance routing & approval triggers',
      'Conversational AI Chat Agents for real-time expense queries & audit insights',
      'Google Workspace Connectors (Gmail receipt capture, Calendar audit deadlines, Sheets export)',
      'Budget Variance & departmental spending trend visualizer'
    ],
    content: [
      {
        title: 'The Challenge in Enterprise Financial Operations',
        content: 'Manual expense auditing in fast-moving enterprises is plagued by slow review cycles, error-prone spreadsheets, inconsistent invoice-to-PO matching, and delayed anomaly detection that frequently leads to financial leakage and regulatory audit penalties.'
      },
      {
        title: 'The Solution: Intelligent FinOps Platform',
        content: 'Developed during the intensive Amazon Quick Quest Workshop at AWS Philippines in Bonifacio Global City, the FinOps AI Dashboard unifies expense categorization, invoice reconciliation, and policy compliance into an automated, zero-latency financial operations platform.'
      },
      {
        title: 'Architecture with Amazon Quick & AI Agent Flows',
        content: 'The system is architected around Amazon Quick Spaces to store live company financial guidelines, Amazon Quick Flows for automated invoice matching triggers, and Quick AI Chat Agents for structured compliance verdicts. Bi-directional Google Connectors automatically capture receipts from Gmail, synchronize audit milestones with Google Calendar, and stream reconciliation reports to Google Sheets.'
      },
      {
        title: 'Business Impact & Hackathon Victory',
        content: 'Recognized with the "Best Business Impact" award at the Amazon Quick Quest Workshop in BGC. In enterprise pilot evaluations, the platform reduced expense review cycles by 80%, achieved a 95%+ precision rate in detecting billing anomalies, and completely eliminated manual audit logging.'
      }
    ]
  },
  {
    slug: 'better-trece',
    title: 'Better Trece Martires (BetterGov Initiative)',
    type: 'Civic Tech / Open Governance',
    summary: 'An open-source civic portal for Trece Martires, built with React, TypeScript, Vite, and Tailwind CSS. Brings public budgets, infrastructure records, and bilingual citizen service guides into one place.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Open Data', 'Leaflet OSM'],
    link: 'https://bettertrecemartires.org',
    github: 'https://github.com/hiroqt/bettertrece',
    image: '/images/bettertrece.png',
    imageWidth: 1050,
    imageHeight: 1050,
    previewName: 'bettertrecemartires.org',
    isFeatured: true,
    featuredTag: 'BETTERGOV INITIATIVE',
    featuredTitle: 'Better Trece',
    featuredSummary: 'Open civic data portal visualizing municipal budgets, infrastructure spending, and public city services for Trece Martires.',
    initiative: 'BetterGov Philippines',
    metrics: [
      'Multi-year DBM GAA budget records (2020–2026)',
      '60+ mapped DepEd public & private schools',
      '25+ gas stations tracked with live DOE benchmarks',
      '100% open-source under CC0 1.0 Public Domain'
    ],
    features: [
      'DBM GAA (2020–2026) National Budget allocation explorer for local infrastructure',
      'Commission on Audit (COA) Annual Audit Report (AAR) analysis and financial health visualizer',
      'Department of Public Works and Highways (DPWH) Cavite 1st DEO project tracker',
      'Citizen-first step-by-step service charters & documentary requirements in English and Filipino',
      'DepEd Basic Education Information System school directory with Senior High tracks & strands',
      'Real-time Department of Energy (DOE) retail fuel price monitoring & interactive station map',
      'Barangay VAWC desks, PNP stations, and emergency hotline directory',
      'Political dynasty registry and local governance leadership dashboard'
    ],
    content: [
      {
        title: 'Background & Mission',
        content: 'Accessing local public information in the Philippines has historically required navigating fragmented government agency websites, unsearchable multi-page PDFs, or relying on word-of-mouth. As part of the volunteer-led BetterGov Philippines initiative, Better Trece Martires was built to democratize open data and simplify citizen interactions with local government.'
      },
      {
        title: 'Open Data Engineering',
        content: 'The platform aggregates and normalizes verified public datasets from the Philippine Statistics Authority (PSA PSGC & PSOC), Department of Budget and Management (DBM GAA 2020–2026), Commission on Audit (COA), Department of Energy (DOE), and DPWH. Raw data is transformed into human-centered, responsive interfaces accessible on any device.'
      },
      {
        title: 'Architecture & Accessibility',
        content: 'Built using React, TypeScript, Vite, Tailwind CSS, @bettergov/kapwa UI tokens, and Leaflet OpenStreetMap. It features zero ads, zero tracking scripts, bilingual English/Filipino localization, and strict WCAG 2.1 accessibility compliance.'
      }
    ]
  },
  {
    slug: 'e-buddy',
    title: 'eGov AI (Top 5 eGov Hackathon 2026)',
    type: 'AI / Civic Tech',
    summary: 'A unified civic platform with biometric face verification, multi-modal voice AI, and automated public services. Recognized in the Top 5 at the eGov Hackathon 2026.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Agentic AI'],
    link: '#',
    image: '/images/egov.png',
    imageWidth: 1050,
    imageHeight: 1050,
    previewName: 'e-gov-ai.vercel.app',
    isFeatured: true,
    featuredTag: 'TOP 5 EGOV',
    featuredTitle: 'eGov AI',
    featuredSummary: 'A unified civic platform with biometric face verification, multi-modal voice AI, and automated public services. Recognized Top 5 at eGov Hackathon 2026.',
    metrics: [
      'Top 5 at the eGov Hackathon 2026',
      'Unified multi-agency public workflow automation',
      'Real-time biometric liveness detection'
    ],
    features: [
      'EGOV SSO (Unified Citizen Single Sign-On)',
      'EGOV Verify / E-Verify digital credentials',
      'Face Live Nest (biometric face liveness detection)',
      'eMessage (secure multi-agency citizen alerts)',
      'EGOV AI (voice and multi-modal guidance assistant)',
      'DBM Compass (budget transparency analyzer)',
      'eChain (immutable audit logging)',
      'eGov Pay (integrated public payment gateway)'
    ],
    content: [
      {
        title: 'Abstract',
        content: 'eGov AI (e Buddy) was developed for the eGov Hackathon 2026 and recognized as a Top 5 finalist team on September 27, 2026. The core problem addressed is the fragmented nature of public services across different government agencies, leading to citizen confusion and administrative bottlenecks.'
      },
      {
        title: 'The Solution',
        content: 'By leveraging agentic AI loops, eGov AI acts as a centralized liaison, guiding users through complex bureaucratic processes, auto-filling forms, and bridging data silos between departments securely.'
      },
      {
        title: 'Architecture & Results',
        content: 'Built using React, TypeScript, Vite, and Tailwind CSS, the platform prioritizes accessibility, speed, and responsiveness. The AI integration significantly reduces the time required for standard government transactions.'
      }
    ]
  },
  {
    slug: 'android-deck',
    title: 'Android Deck (NotchDeck macOS & Touchscreen Stream Deck)',
    type: 'macOS & Android Utility',
    summary: 'Transforms an Android phone into a touchscreen stream deck for macOS over USB or Wi-Fi, paired with a native Swift Liquid Glass notch HUD.',
    tags: ['Swift', 'Kotlin', 'macOS', 'Android', 'WebSocket'],
    link: 'https://github.com/hiroqt/android-deck',
    github: 'https://github.com/hiroqt/android-deck',
    image: '/images/android-deck.png',
    imageWidth: 1024,
    imageHeight: 500,
    previewName: 'github.com/hiroqt/android-deck',
    isFeatured: true,
    featuredTag: 'MACOS & ANDROID UTILITY',
    featuredTitle: 'Android Deck',
    featuredSummary: 'Transforms an Android phone into a touchscreen stream deck for macOS over USB or Wi-Fi, paired with a native Swift Liquid Glass notch HUD.',
    metrics: [
      '40 Passing Swift unit tests & Release DMG build',
      'Zero-latency USB ADB tunnel & LAN Wi-Fi fallback',
      'Fluid Dynamic Island spring animation HUD'
    ],
    features: [
      'Liquid Glass notch HUD configurator for MacBook camera notch',
      'Full-screen adaptive touchscreen UI (Portrait 2x3 & Landscape 3x2)',
      'Sub-16ms tactile haptic feedback on touch events',
      'Direct extraction of native macOS application icons via NSWorkspace',
      'Bidirectional WebSocket JSON protocol with secure token authentication'
    ],
    content: [
      {
        title: 'Abstract',
        content: 'Android Deck (NotchDeck) transforms an Android smartphone into a tactile, dedicated stream deck controller for macOS, eliminating the need for expensive proprietary hardware. It bridges a native Swift macOS menu bar and notch HUD with an Android touch client over USB ADB reverse tunneling and LAN Wi-Fi.'
      },
      {
        title: 'Engineering & Protocol',
        content: 'Built with Swift 5.9 for macOS 14+ and Kotlin for Android. The architecture utilizes a custom WebSocket JSON wire protocol with abstract action IDs to ensure security boundaries: the Android client triggers abstract events while the Mac host retains complete authority over executable paths and system permissions.'
      },
      {
        title: 'User Experience & Performance',
        content: 'Features fluid spring physics expanding the Mac camera notch into an interactive configuration panel. Touch interactions on the Android device trigger immediate haptic responses before network confirmation, providing a physical, zero-latency controller experience.'
      }
    ]
  },
  {
    slug: 'pacementor',
    title: 'PaceMentor',
    type: 'Mobile App / AI',
    summary: 'AI-powered running coach with adaptive training plans, real-time GPS tracking, and Strava integration — from first steps to personal best.',
    tags: ['Flutter', 'Dart', 'AI', 'Mobile', 'Strava API'],
    link: '#',
    embedUrl: 'https://appbuildersph.com/embed/apps/pacementor',
    embedTitle: 'PaceMentor votes on App Builders PH',
    image: '/images/pcaementor.jpg',
    imageWidth: 1280,
    imageHeight: 800,
    isFeatured: true,
    featuredTag: 'AI RUNNING COACH',
    featuredTitle: 'PaceMentor',
    featuredSummary: 'AI-powered running coach with adaptive training plans and Strava integration.',
    metrics: [
      'Cross-platform iOS & Android mobile architecture',
      'Real-time adaptive pacing algorithms',
      'Seamless Strava API bi-directional synchronization'
    ],
    features: [
      'AI-powered running coach with dynamic training plans tailored to user profiles',
      'Shareable run recap cards optimized for Instagram Stories and social feeds',
      'High-precision GPS tracking with auto-pause detection when walking or stopping',
      'Heart rate zone analysis and race predictor models'
    ],
    content: [
      {
        title: 'Research Background',
        content: 'PaceMentor started with the observation that amateur runners often struggle to build consistent, injury-free training habits without expensive human coaching. The objective was to democratize elite-level coaching insights.'
      },
      {
        title: 'Methodology',
        content: 'The application uses an AI engine to analyze running metrics (pace, heart rate, elevation) and dynamically adjust future workouts. Built with Flutter and Dart, it ensures a native-like experience on both iOS and Android.'
      },
      {
        title: 'Integration',
        content: 'Deep integration with Strava allows users to seamlessly import historical runs and export completed workouts, creating a friction-free ecosystem for the athlete.'
      }
    ]
  },
  {
    slug: 'present-po',
    title: 'Present Po',
    type: 'B2B SaaS / Productivity',
    summary: 'Workforce attendance and time-tracking platform with scheduling, geofenced presence monitoring, AI journaling, and automated reporting.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'AI'],
    link: '#',
    embedUrl: 'https://appbuildersph.com/embed/apps/present-po',
    embedTitle: 'Present Po votes on App Builders PH',
    image: '/images/presentpo.jpg',
    imageWidth: 1280,
    imageHeight: 800,
    isFeatured: true,
    featuredTag: 'B2B SOLUTION',
    featuredTitle: 'Present Po',
    featuredSummary: 'Workforce attendance and time-tracking platform with scheduling and presence monitoring.',
    metrics: [
      'Sub-second geofenced attendance verification',
      'Automated timesheet calculation and certificate generation',
      'Zero manual data reconciliation overhead'
    ],
    features: [
      'Automatic one-tap time-in and time-out with strict geofence vicinity validation',
      'Projected completion date calculator for internship (OJT) and contract hours',
      'AI journaling with intelligent auto-completion of daily activity logs',
      'OCR PDF document-to-text extraction for physical timesheets and forms',
      'Dynamic QR-code based group onboarding and member directory',
      'Bulk automated completion certificate generation with validated hour tallies'
    ],
    content: [
      {
        title: 'Abstract',
        content: 'Present Po is a modern B2B SaaS solution targeting the inefficiencies in traditional workforce time tracking and student internship management. It provides a real-time dashboard for managers to oversee employee presence across multiple physical sites.'
      },
      {
        title: 'Technology Stack',
        content: 'The application is powered by Next.js on the frontend and Supabase on the backend with PostgreSQL Row Level Security (RLS). This combination allows for real-time data synchronization and robust authentication mechanisms.'
      },
      {
        title: 'Key Outcomes',
        content: 'Automated reporting drastically reduces end-of-month administrative work, allowing HR teams to focus on strategic initiatives rather than manual data entry.'
      }
    ]
  },
  {
    slug: 'yhel-os',
    title: 'Building yhel.os for Freelancers',
    type: 'Productivity Platform',
    summary: 'All-in-one operating system and client CRM for independent developers featuring kanban engines, instant proposal generators, and webhook integrations.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CRM', 'Webhooks'],
    link: '#',
    features: [
      'Client management with a dedicated public secured portal for real-time monitoring',
      'Telegram, Google Calendar, and Gmail integrations for instant alerts',
      'Client inquiry pipeline syncing portfolio leads directly to the CRM dashboard',
      'Interactive drag-and-drop Kanban task engine (To Do, On-going, Review, Done)',
      'Instant split-screen letter of agreement and proposal generator',
      'Real-time sound and visual lead capture notifications'
    ],
    content: [
      {
        title: 'Abstract',
        content: 'yhel.os is conceptualized as the ultimate all-in-one operating system for freelancers and independent developers. This project documents the architectural decisions, product design, and client workflow automation.'
      },
      {
        title: 'The Challenge',
        content: 'Freelancers often suffer from administrative friction, juggling multiple tools for invoicing, project management, and client communication. The goal was to consolidate these workflows into a single, cohesive platform.'
      }
    ]
  },
  {
    slug: 'hospital-queuing-system',
    title: 'Hospital Queuing System',
    type: 'Healthcare Enterprise / AI',
    summary: 'A centralized local queuing and triage system with Groq LLM integration developed during a 486-hour internship at General Emilio Aguinaldo Memorial Hospital.',
    tags: ['Vue.js', 'PHP', 'MySQL', 'Groq LLM', 'Healthcare'],
    link: '#',
    features: [
      'Offline-capable local network architecture for zero-downtime hospital triage',
      'Multi-tier role controls (Super Admin, Section Admin, Doctor/Staff triage panel)',
      'Thermal receipt printing upon patient check-in with numbered priority slips',
      'Waiting room audio-visual display monitors with live queue updates',
      'Groq LLM integration for intelligent symptom intake and clinic routing'
    ],
    content: [
      {
        title: 'Background',
        content: 'Developed during a 486-hour internship at General Emilio Aguinaldo Memorial Hospital, this project aimed to solve critical congestion and workflow inefficiencies in a busy hospital setting.'
      },
      {
        title: 'Methodology & Impact',
        content: 'Collaborating directly with hospital medical section heads, requirements were synthesized into a Vue.js and PHP/MySQL stack with Groq LLM triage capabilities, successfully streamlining patient reception and clinic handoffs.'
      }
    ]
  },
  {
    slug: 'vcm-hris',
    title: 'VCM HRIS',
    type: 'Enterprise HR / Capstone',
    summary: 'QR-code based Human Resource Information System: employee records, leave tracking, faculty recruitment, real-time notifications, and automated payroll.',
    tags: ['Laravel', 'Livewire', 'PHP', 'MySQL', 'QR Attendance'],
    link: '#',
    image: '/images/vcm.jpg',
    imageWidth: 1280,
    imageHeight: 800,
    features: [
      'QR-Based attendance validation restricting check-ins to the campus vicinity',
      'Automated payroll engine computing gross pay, statutory deductions, and net salary',
      'Teacher recruitment portal with online application screening',
      'Leave and absence monitoring with automated payroll deduction hooks',
      'Admin user management with auto-generated QR credentials and email verification'
    ],
    content: [
      {
        title: 'Problem Statement',
        content: 'The academic institution faced significant administrative overhead with manual timekeeping, paper leave slips, and disjointed HR processes across their workforce.'
      },
      {
        title: 'System Design',
        content: 'A comprehensive architecture was built using Laravel, Livewire, and MySQL for reactive full-stack development and robust relational data management. The introduction of QR-code scanning reduced timekeeping friction to seconds.'
      }
    ]
  },
  {
    slug: 'tearsize',
    title: 'Tearsize',
    type: 'E-Commerce Storefront',
    summary: 'Client project — E-commerce platform for health and wellness products featuring end-to-end checkout and payment integration.',
    tags: ['TypeScript', 'Tailwind CSS', 'Payment Gateway'],
    link: '#',
    image: '/images/tearsize.jpg',
    imageWidth: 1280,
    imageHeight: 800,
    features: [
      'Responsive product catalog with fast filtering and category indexing',
      'Secure payment gateway integration for digital payments and cards',
      'Order fulfillment and automated customer email confirmations'
    ],
    content: [
      {
        title: 'Overview',
        content: 'Tearsize is an e-commerce platform designed for health and wellness products, offering a seamless shopping experience for customers. The primary goal was to create a performant, reliable storefront with a smooth checkout flow.'
      }
    ]
  },
  {
    slug: 'hivesync-va',
    title: 'HiveSync VA',
    type: 'Agency Platform',
    summary: 'Client project — Virtual assistant services platform streamlining business operations and lead generation for distributed teams.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Automation'],
    link: 'https://www.hivesyncva.com',
    image: '/images/hivesync.jpg',
    imageWidth: 1280,
    imageHeight: 800,
    features: [
      'Automated blog syndication syncing Facebook posts directly to website articles',
      'Integrated consultation booking and inquiry capture system'
    ],
    content: [
      {
        title: 'Objective & Delivery',
        content: 'Developed a high-performance Next.js web application for a virtual assistant provider, optimizing SEO, lead conversion flows, and automated social content pipelines.'
      }
    ]
  },
  {
    slug: 'tmrc',
    title: 'TMRC (Trece Martirez Running Club)',
    type: 'Community Hub',
    summary: 'Centralized community hub for Trece Martirez Running Club — managing race registration archives, finish times, and community announcements.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    image: '/images/tmrc.jpg',
    imageWidth: 1280,
    imageHeight: 800,
    features: [
      'Race registration directory with historical finish records',
      'Community announcement bulletin and upcoming run event calendar'
    ],
    content: [
      {
        title: 'Overview',
        content: 'A centralized community platform for a provincial running club, providing permanent race registration archives, finish time leaderboards, and news announcements.'
      }
    ]
  }
];
