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
  image?: string;
  embedUrl?: string;
  embedTitle?: string;
  features?: string[];
  content?: ProjectSection[];
  isFeatured?: boolean;
  featuredTag?: string;
  featuredSummary?: string;
  featuredTitle?: string;
}

export const projectsData: ProjectData[] = [
  {
    slug: 'yhel-os',
    title: 'Building yhel.os for Freelancers',
    type: 'Project',
    summary: 'A deep dive into developing an all-in-one freelance operating system and how to market it effectively on LinkedIn.',
    tags: ['Product', 'Marketing', 'Development'],
    link: '#',
    features: [
      'Client management with a client public secured portal to monitor the project',
      'Telegram, Google Calendar, and Gmail integrations',
      'Real-time notifications',
      'Client inquiry through portfolio received by backend to the yhel.os website',
      'Kanban board-dragable task (to do, on-going, on-progress, done, canceled)',
      'Lead capture and sound alerts',
      'Instant split screen letter of agreement generator',
      'Client and project CRM',
      'Kanban task engine and time tracking'
    ],
    content: [
      {
        title: 'Abstract',
        content: 'yhel.os is conceptualized as the ultimate all-in-one operating system for freelancers and independent developers. This project documents the architectural decisions, product design, and marketing strategy.'
      },
      {
        title: 'The Challenge',
        content: 'Freelancers often suffer from administrative friction, juggling multiple tools for invoicing, project management, and client communication. The goal was to consolidate these workflows into a single, cohesive platform.'
      },
      {
        title: 'Marketing Strategy',
        content: 'The launch strategy focused on LinkedIn, leveraging the platform to highlight the specific pain points of administrative overhead and positioning yhel.os as a professional, efficiency-multiplying solution.'
      }
    ]
  },
  {
    slug: 'tearsize',
    title: 'Tearsize',
    type: 'Project',
    summary: 'Client project — E-commerce platform for health products featuring full payment integration.',
    tags: ['TypeScript', 'Tailwind CSS'],
    link: '#',
    image: '/images/tearsize.png',
    features: [
      'Ordering system',
      'Payment integration'
    ],
    content: [
      {
        title: 'Overview',
        content: 'Tearsize is an e-commerce platform designed for health and wellness products, offering a seamless shopping experience for customers. The primary goal was to create a performant, reliable storefront with a smooth checkout flow.'
      },
      {
        title: 'Technical Implementation',
        content: 'The platform is built on modern web technologies utilizing TypeScript for type safety and Tailwind CSS for rapid UI development. Full payment integration ensures secure and efficient transactions.'
      }
    ]
  },
  {
    slug: 'e-buddy',
    title: 'e Buddy (eGov Hackathon 2026)',
    type: 'Project',
    summary: 'Designed to unify government agencies and make public services seamless using an agentic AI named e Buddy.',
    tags: ['TypeScript', 'AI', 'Tailwind CSS'],
    link: '#',
    image: '/images/egov.png',
    isFeatured: true,
    featuredTag: 'HACKATHON ENTRY',
    featuredTitle: 'e Buddy',
    featuredSummary: 'Unified government services platform using an agentic AI named e Buddy.',
    features: [
      'EGOV SSO',
      'EGOV Verify or E-Verify',
      'Face Live Nest',
      'eMessage',
      'EGOV AI',
      'DBM Compass',
      'eChain',
      'eGov Pay',
      'Agentic AI through AI chat, widgets, and voice command'
    ],
    content: [
      {
        title: 'Abstract',
        content: 'e Buddy was developed as a submission for the eGov Hackathon 2026. The core problem addressed is the fragmented nature of public services across different government agencies, leading to citizen frustration.'
      },
      {
        title: 'The Solution',
        content: 'By leveraging agentic AI, e Buddy acts as a centralized liaison, guiding users through complex bureaucratic processes, auto-filling forms, and bridging data silos between departments securely.'
      },
      {
        title: 'Architecture & Results',
        content: 'Built using TypeScript and Tailwind CSS, the platform prioritizes accessibility and responsiveness. The AI integration significantly reduces the time required for standard government transactions.'
      }
    ]
  },
  {
    slug: 'pacementor',
    title: 'PaceMentor',
    type: 'Project',
    summary: 'AI-powered running coach with adaptive training plans, real-time GPS tracking, and Strava integration — from first steps to personal best.',
    tags: ['Flutter', 'Dart', 'AI'],
    link: '#',
    embedUrl: 'https://appbuildersph.com/embed/apps/pacementor',
    embedTitle: 'PaceMentor votes on App Builders PH',
    image: '/images/pcaementor.png',
    isFeatured: true,
    featuredTag: 'AI RUNNING COACH',
    featuredTitle: 'PaceMentor',
    featuredSummary: 'AI-powered running coach with adaptive training plans and Strava integration.',
    features: [
      'AI-powered running coach with an AI-generated training plan based on the user profile',
      'Shareable runs through Instagram',
      'GPS tracking with automatic pause if the user walks'
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
    slug: 'hivesync-va',
    title: 'HiveSync VA',
    type: 'Project',
    summary: 'Client project — virtual assistant services platform streamlining business operations for distributed teams.',
    tags: ['Next.js', 'TypeScript'],
    link: 'https://www.hivesyncva.com',
    image: '/images/hivesync.png',
    features: [
      'Automation of blog posting from FB to website',
      'Booking system'
    ],
    content: [
      {
        title: 'Objective',
        content: 'HiveSync VA required a digital presence that communicated professionalism and efficiency to prospective B2B clients looking for virtual assistant services.'
      },
      {
        title: 'Implementation',
        content: 'A high-performance Next.js application was developed, optimizing for SEO and fast load times to ensure maximum conversion rates for incoming leads.'
      }
    ]
  },
  {
    slug: 'vcm-hris',
    title: 'VCM HRIS',
    type: 'Project',
    summary: 'QR-code based Human Resource Information System: employee management, leave tracking, job applications, real-time notifications, and payroll.',
    tags: ['Laravel', 'PHP', 'MySQL'],
    link: '#',
    image: '/images/vcm.png',
    features: [
      'QR-Based Login System with validation (user must log in to specific vicinity of the school)',
      'Payroll with automatic computation of payroll, government contribution deduction, and payslip computation',
      'Application for teachers',
      'Announcement public and internal across public pages and teacher accounts',
      'Leave and absence monitoring with automatic salary deduction',
      'Admin user management with auto-generated QR code and email verification link'
    ],
    content: [
      {
        title: 'Problem Statement',
        content: 'The client faced significant administrative overhead with manual timekeeping and disjointed HR processes across their workforce.'
      },
      {
        title: 'System Design',
        content: 'A comprehensive monolithic architecture was chosen using Laravel and MySQL for rapid development and robust relational data management. The introduction of QR-code scanning reduced time-in/out friction to seconds.'
      },
      {
        title: 'Impact',
        content: 'The unified system eliminated payroll calculation errors and provided management with real-time visibility into workforce attendance and application pipelines.'
      }
    ]
  },
  {
    slug: 'tmrc',
    title: 'TMRC',
    type: 'Project',
    summary: 'Community website for Trece Martirez Running Club — upcoming and past races, race results, and community updates.',
    tags: ['Next.js', 'TypeScript'],
    link: '#',
    image: '/images/tmrc.png',
    content: [
      {
        title: 'Overview',
        content: 'A centralized community hub for a local running club, designed to replace fragmented social media communication with a permanent, searchable archive of club activities.'
      },
      {
        title: 'Features',
        content: 'The platform manages race registrations, historical result archives, and community announcements, built on a modern Next.js stack.'
      }
    ]
  },
  {
    slug: 'present-po',
    title: 'Present Po',
    type: 'Project',
    summary: 'Workforce attendance and time-tracking platform with scheduling, presence monitoring, and automated reporting.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    link: '#',
    embedUrl: 'https://appbuildersph.com/embed/apps/present-po',
    embedTitle: 'Present Po votes on App Builders PH',
    image: '/images/presentpo.png',
    isFeatured: true,
    featuredTag: 'B2B SOLUTION',
    featuredTitle: 'Present Po',
    featuredSummary: 'Workforce attendance and time-tracking platform with scheduling and presence monitoring.',
    features: [
      'Automatic time in and time out through tap',
      'Manual computation of projected end time of your OJT or time tracking',
      'AI journaling with auto-complete of journal',
      'OCR PDF word to text',
      'Folder organization and notes',
      'Joining group through QR',
      'Admin: managing different groups through QR',
      'Admin: bulk generation of certification with automatic calculation of the user in that certain group',
      'Admin: validation of time-in/time-out by setting the vicinity of time-in/time-out to prevent the user from logging in at a different place'
    ],
    content: [
      {
        title: 'Abstract',
        content: 'Present Po is a modern B2B SaaS solution targeting the inefficiencies in traditional workforce time tracking. It provides a real-time dashboard for managers to oversee employee presence across multiple locations.'
      },
      {
        title: 'Technology Stack',
        content: 'The application is powered by Next.js on the frontend and Supabase on the backend. This combination allows for real-time data synchronization and robust authentication mechanisms.'
      },
      {
        title: 'Key Outcomes',
        content: 'Automated reporting drastically reduces end-of-month administrative work, allowing HR teams to focus on strategic initiatives rather than manual data entry.'
      }
    ]
  },
  {
    slug: 'hospital-queuing-system',
    title: 'Hospital Queuing System',
    type: 'Project',
    summary: 'A centralized local queuing system with AI integration developed for a hospital to streamline patient workflows.',
    tags: ['Vue.js', 'PHP', 'MySQL', 'AI'],
    link: '#',
    image: '/images/gallery/internship_presenting_queuing_to_sectionheads.jpg',
    features: [
      'Local host integration (no need for internet)',
      'Admin panel and super admin panel with customizable design for displaying ticket numbers',
      'Printed ticket numbers upon registration',
      'Staff control panel'
    ],
    content: [
      {
        title: 'Background',
        content: 'Developed during a 486-hour internship, this project aimed to solve critical congestion and workflow inefficiencies in a busy hospital setting.'
      },
      {
        title: 'Methodology',
        content: 'Collaborating directly with hospital staff, I gathered requirements and designed a system utilizing Vue.js for real-time frontend updates and a PHP/MySQL backend. Groq LLM was integrated to provide intelligent triage assistance.'
      },
      {
        title: 'Conclusion',
        content: 'The system successfully streamlined patient intake, reduced waiting room confusion, and provided staff with actionable workflow analytics.'
      }
    ]
  }
];
