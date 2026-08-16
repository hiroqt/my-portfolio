import { KnowledgeChunk } from './types';
import { projectsData } from '../data/projects';

export const portfolioChunks: KnowledgeChunk[] = [
  // --- ABOUT & BIOGRAPHY ---
  {
    id: 'about-summary',
    documentId: 'about',
    title: 'Arnel Baylon - Context Engineer & Full-Stack Developer',
    category: 'about',
    content: `Arnel A. Baylon (known as "Nel" or "Yhel") is a Context Engineer and Full-Stack Software Developer based in Cavite, Philippines. He holds a Bachelor of Science in Information Technology (BS IT) from Cavite State University (Don Severino de las Alas Main Campus). He specializes in AI agent loops, RAG architectures, prompt engineering, and modern full-stack web and mobile development with Next.js, TypeScript, Vue.js, Laravel, PostgreSQL, and Flutter. He is open to remote worldwide, hybrid, and on-site opportunities.`,
    keywords: ['arnel', 'baylon', 'nel', 'yhel', 'context engineer', 'full-stack', 'developer', 'about', 'bio', 'who is', 'location', 'philippines', 'cavite'],
    metadata: { section: 'summary' }
  },
  {
    id: 'about-philosophy',
    documentId: 'about',
    title: 'Engineering Philosophy & Context Engineering',
    category: 'about',
    content: `Arnel's core philosophy centers on "Agentic AI First" and "Context is King". Rather than treating LLMs as mere chatbots, he builds systems where AI can call tools, navigate interfaces, trigger workflows, and interact securely with databases. His focus as a Context Engineer is precision context retrieval, zero-hallucination guardrails, and optimal token efficiency using Groq, OpenAI, and custom RAG pipelines.`,
    keywords: ['philosophy', 'context engineering', 'agentic ai', 'agentic loops', 'llm orchestration', 'rag', 'principles'],
    metadata: { section: 'philosophy' }
  },
  {
    id: 'about-contact-links',
    documentId: 'about',
    title: 'Contact Information & Social Channels',
    category: 'about',
    content: `Contact Arnel Baylon:
- Email: arnelbaylon15@gmail.com
- GitHub: https://github.com/hiroqt (@hiroqt)
- LinkedIn: https://www.linkedin.com/in/arnel-baylon-b05233189
- Portfolio Contact Form: #contact section on the website
- Instagram: @yheellll
- Facebook: https://www.facebook.com/arnel.baylon.1650
Arnel welcomes inquiries for full-time software engineering roles, contract work, freelance projects, and AI consulting.`,
    keywords: ['contact', 'email', 'github', 'linkedin', 'hire', 'reach', 'message', 'social', 'socials', 'links'],
    metadata: { section: 'contact' }
  },

  // --- SKILLS & STACK ---
  {
    id: 'skills-ai-context',
    documentId: 'skills',
    title: 'AI & Context Engineering Skills',
    category: 'skills',
    content: `Arnel's AI & Context Engineering competencies include:
- Context Engineering: dynamic context window management, few-shot prompting, structured schema enforcement (Zod/JSON Schema), and token budget optimization.
- Agentic Loops: autonomous decision loops, multi-step tool/function calling, plan-and-execute workflows, and self-correcting error handling.
- RAG Architectures: semantic chunking, hybrid search (dense cosine embeddings + BM25/TF-IDF keyword weighting), Reciprocal Rank Fusion (RRF), pgvector indexing, and grounding guardrails.
- LLM Orchestration: Groq SDK (Llama 3.3 70B, Llama 3.1 8B, Mixtral), OpenAI API, Anthropic Claude, LangChain concepts.`,
    keywords: ['ai', 'context engineering', 'agentic loops', 'rag', 'llm', 'groq', 'llama', 'prompt engineering', 'embeddings', 'pgvector', 'tools'],
    metadata: { section: 'ai', techStack: ['Groq', 'Llama 3.3', 'RAG', 'Agentic Loops', 'pgvector', 'TypeScript'] }
  },
  {
    id: 'skills-frontend',
    documentId: 'skills',
    title: 'Frontend & Mobile Development Skills',
    category: 'skills',
    content: `Frontend & Mobile Technologies:
- Next.js (App Router, Server Components, Server Actions, API Routes)
- React 18 & TypeScript / JavaScript (ES6+)
- Vue.js 3 (Composition API, Pinia)
- Flutter & Dart (Cross-platform iOS and Android mobile development)
- Tailwind CSS, Framer Motion (micro-animations, HUD and glassmorphism styling)
- Responsive layout design, SEO optimization, and web accessibility (WCAG).`,
    keywords: ['frontend', 'nextjs', 'next.js', 'react', 'vue', 'vue.js', 'flutter', 'dart', 'typescript', 'tailwind', 'framer motion', 'javascript', 'ui', 'css'],
    metadata: { section: 'frontend', techStack: ['Next.js', 'React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Flutter', 'Dart', 'Framer Motion'] }
  },
  {
    id: 'skills-backend-db',
    documentId: 'skills',
    title: 'Backend, Databases & DevOps Skills',
    category: 'skills',
    content: `Backend, Databases & DevOps:
- Backend: Node.js, Next.js Serverless Routes, PHP, Laravel (MVC, Eloquent ORM, REST APIs, queues).
- Databases: PostgreSQL (with pgvector), MySQL, Supabase (Postgres, RLS, Auth, Realtime), Firebase (Firestore NoSQL, Cloud Functions).
- DevOps & Cloud: Vercel (Edge and Serverless deployment), AWS (S3, Generative AI, Serverless), Git, GitHub Actions CI/CD.
- Tools & Design: Figma (UI/UX design & wireframes), Trello (Kanban), Cloudflare Turnstile bot verification.`,
    keywords: ['backend', 'database', 'databases', 'postgresql', 'postgres', 'mysql', 'supabase', 'firebase', 'laravel', 'php', 'node', 'nodejs', 'aws', 'vercel', 'git', 'figma', 'devops'],
    metadata: { section: 'backend', techStack: ['Node.js', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL', 'Supabase', 'Firebase', 'AWS', 'Vercel'] }
  },

  // --- EXPERIENCE ---
  {
    id: 'exp-hospital',
    documentId: 'experience',
    title: 'General Emilio Aguinaldo Memorial Hospital - Intern Full-Stack Developer',
    category: 'experience',
    content: `Hospital Internship (486 Hours, 2026):
- Organization: General Emilio Aguinaldo Memorial Hospital (GEAMH), Cavite, Philippines.
- Role: Intern Full-Stack Developer & IT Support.
- Built an offline-capable AI hospital queuing and triage system using Vue.js, PHP, MySQL, and Groq LLMs to streamline patient intake and departmental routing.
- Engineered multi-role control panels (super-admin, admin, doctor/staff panels), thermal ticket printing upon check-in, and waiting room audio-visual monitors.
- Collaborated directly with medical section heads to optimize clinic intake workflows.`,
    keywords: ['geamh', 'hospital', 'queuing', 'triage', 'internship', 'ojt', 'experience', 'vue', 'php', 'mysql', 'groq', 'healthcare', 'work'],
    metadata: { section: 'geamh', period: '2026', techStack: ['Vue.js', 'PHP', 'MySQL', 'Groq LLM'] }
  },
  {
    id: 'exp-capstone',
    documentId: 'experience',
    title: 'VCM HRIS Capstone Project - Lead Architect & Developer',
    category: 'experience',
    content: `VCM HRIS Capstone Project (2025 - 2026):
- Role: Lead Full-Stack Developer & Architect.
- Architected an enterprise HRIS for academic institutions with QR-code vicinity attendance verification to prevent proxy clock-ins.
- Engineered an automated payroll calculation engine covering Philippine statutory deductions (SSS, PhilHealth, Pag-IBIG), tax withholdings, and digital payslips.
- Implemented applicant tracking for faculty recruitment, leave request management, and campus announcement boards using Laravel and MySQL.`,
    keywords: ['vcm', 'hris', 'capstone', 'qr', 'payroll', 'attendance', 'laravel', 'mysql', 'experience', 'leadership'],
    metadata: { section: 'vcm-hris', period: '2025 - 2026', techStack: ['Laravel', 'PHP', 'MySQL', 'QR Code'] }
  },
  {
    id: 'exp-freelance',
    documentId: 'experience',
    title: 'Freelance Software Developer & Independent Consultant',
    category: 'experience',
    content: `Freelance Software Consultant (2025 - Present):
- Delivered custom software systems, SaaS web platforms, and mobile apps for SMEs and independent clients.
- Present Po: Developed a workforce attendance SaaS platform with AI journaling, QR group onboarding, and PDF OCR timesheet parsing (Next.js + Supabase).
- Tearsize: Built an e-commerce platform with full payment integration for health and wellness products.
- HiveSync VA: Developed an agency website for virtual assistant services with automated FB-to-blog syndication and booking.
- TMRC: Created a community platform for Trece Martirez Running Club with race registration archives and result leaderboards.`,
    keywords: ['freelance', 'consultant', 'present po', 'tearsize', 'hivesync', 'tmrc', 'client projects', 'experience', 'full-stack'],
    metadata: { section: 'freelance', period: '2025 - Present', techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'] }
  },

  // --- ACHIEVEMENTS & CERTIFICATIONS ---
  {
    id: 'achieve-hackathon',
    documentId: 'achievements',
    title: 'eGov Hackathon 2026 Entry - e Buddy Agentic AI',
    category: 'achievements',
    content: `eGov Hackathon 2026:
Arnel competed in the national eGov Hackathon 2026 with "e Buddy", an agentic AI designed to unify fragmented government agencies. The system features multi-modal AI chat, voice command execution, EGOV Single Sign-On (SSO), biometric face liveness detection (Face Live Nest), eGov Pay, and Department of Budget and Management (DBM) Compass analytics.`,
    keywords: ['egov', 'hackathon', '2026', 'e-buddy', 'e buddy', 'agentic ai', 'government', 'achievement', 'award', 'competition'],
    metadata: { section: 'hackathons', featured: true }
  },
  {
    id: 'achieve-ibm-certs',
    documentId: 'achievements',
    title: 'IBM Professional AI Certifications (7 Topics)',
    category: 'achievements',
    content: `IBM AI Certifications (Verified Credly Badges 82e8f4a4-6ae5-4bea-8b5e-212cf6ec6563 & 06cc685a-5d6c-49fe-bc49-f86e53e5417e):
1. AI Fundamentals: Foundations for Understanding AI
2. AI Forms and Functions
3. Introduction to Artificial Intelligence
4. Machine Learning
5. Neural Networks and Deep Learning
6. Retrieval-Augmented Generation (RAG) for Enhanced AI Outputs
7. The Intelligence Behind AI`,
    keywords: ['ibm', 'certifications', 'badges', 'rag', 'neural networks', 'machine learning', 'ai fundamentals', 'credentials'],
    metadata: { section: 'ibm-certifications' }
  },
  {
    id: 'achieve-aws-certs',
    documentId: 'achievements',
    title: 'AWS Certifications (4 Topics)',
    category: 'achievements',
    content: `AWS Certifications (Verified Credly Badge 7d53aa8f-5672-4064-b296-f6fccf400108):
1. Advanced SQL and Database Design
2. AWS Knowledge: Object Storage (S3)
3. Generative AI
4. Serverless Mindset (AWS Lambda, API Gateway)`,
    keywords: ['aws', 'certifications', 'sql', 'database design', 's3', 'generative ai', 'serverless', 'amazon web services'],
    metadata: { section: 'aws-certifications' }
  },

  // --- EDUCATION ---
  {
    id: 'edu-cvsu',
    documentId: 'education',
    title: 'Cavite State University - BS Information Technology',
    category: 'education',
    content: `Education:
- Degree: Bachelor of Science in Information Technology (BS IT)
- Institution: Cavite State University - Main Campus (Don Severino de las Alas Campus, Indang, Cavite, Philippines)
- Coursework: Data Structures & Algorithms, Database Systems, Web Systems & Technologies, Systems Analysis and Design, Software Architecture, Artificial Intelligence, Mobile App Development, Information Security.
- Capstone: VCM HRIS (Lead Architect & Developer).
- Internship: 486 Hours at General Emilio Aguinaldo Memorial Hospital.`,
    keywords: ['education', 'university', 'cavite state university', 'cvsu', 'degree', 'bsit', 'bs it', 'information technology', 'college', 'academic', 'study', 'studied', 'graduated', 'school', 'alma mater'],
    metadata: { section: 'university' }
  },

  // --- SERVICES ---
  {
    id: 'services-overview',
    documentId: 'services',
    title: 'Services Offered by Arnel Baylon',
    category: 'services',
    content: `Services available for hire:
1. Full-Stack Web Development: Modern Next.js, React, TypeScript, Vue.js, or Laravel applications with responsive Tailwind CSS design.
2. AI Agent Integration & RAG Systems: Custom autonomous assistants (like yhelAI), knowledge base retrieval pipelines with pgvector/embeddings, and tool-calling automation.
3. B2B SaaS & HRIS Platforms: Custom workforce timekeeping, geofenced attendance tracking, automated payroll, and multi-tenant architectures.
4. Mobile App Development: High-performance cross-platform iOS & Android mobile applications built with Flutter and Dart.
5. Technical Consulting & Architecture: System audits, database schema optimization, and Figma-to-code sprint execution.`,
    keywords: ['services', 'hire', 'freelance', 'web development', 'ai agents', 'rag integration', 'mobile apps', 'consulting', 'pricing', 'rates'],
    metadata: { section: 'services' }
  },

  // --- FAQ ---
  {
    id: 'faq-recruiter',
    documentId: 'faq',
    title: 'Recruiter FAQ: Skills, Availability & Work Arrangements',
    category: 'faq',
    content: `Recruiter FAQ:
- What are Arnel's strongest skills? Context Engineering / AI Agents, Full-Stack TypeScript (Next.js, React, Node.js), Backend & Databases (PostgreSQL, Supabase, Laravel, MySQL), and Flutter mobile development.
- Is Arnel open to full-time opportunities? Yes, Arnel is actively open to full-time software engineering roles and contract positions.
- Remote Work: Arnel has extensive experience in distributed remote environments and asynchronous communication.
- Work Location: Cavite, Philippines, capable of working in global timezone shifts (US, Europe, APAC).`,
    keywords: ['faq', 'recruiter', 'hiring', 'availability', 'full-time', 'remote', 'timezone', 'roles', 'salary', 'experience'],
    metadata: { section: 'recruiter' }
  },
  {
    id: 'faq-client',
    documentId: 'faq',
    title: 'Client FAQ: How to Start a Project & Timelines',
    category: 'faq',
    content: `Client FAQ:
- How do I hire Arnel? You can submit an inquiry via the portfolio contact form or email arnelbaylon15@gmail.com with your project brief.
- What projects does Arnel build? Custom web platforms, SaaS products, AI chatbots, mobile apps, and e-commerce stores.
- Development Process: Discovery & requirements -> Architecture & wireframes -> Development sprints with live previews -> Testing & deployment -> Ongoing support.`,
    keywords: ['faq', 'client', 'hire', 'how to hire', 'project brief', 'quote', 'timeline', 'process'],
    metadata: { section: 'client' }
  }
];

// Dynamically generate knowledge chunks for each project from `projectsData`
projectsData.forEach((p) => {
  const featuresText = p.features && p.features.length > 0
    ? `\nKey Features:\n` + p.features.map(f => `- ${f}`).join('\n')
    : '';

  const sectionsText = p.content && p.content.length > 0
    ? `\nProject Details:\n` + p.content.map(c => `### ${c.title}\n${c.content}`).join('\n\n')
    : '';

  portfolioChunks.push({
    id: `project-${p.slug}`,
    documentId: 'projects',
    title: `${p.title} (${p.type})`,
    category: 'projects',
    content: `Project Name: ${p.title}
Slug: ${p.slug}
Type: ${p.type}
Summary: ${p.summary}
Tags / Tech Stack: ${p.tags.join(', ')}
${p.isFeatured ? 'Featured: Yes (' + (p.featuredTag || 'Featured Project') + ')' : ''}
${featuresText}
${sectionsText}
Link: ${p.link !== '#' ? p.link : 'Available on portfolio / demo'}`,
    keywords: [
      p.slug,
      p.title.toLowerCase(),
      ...p.title.toLowerCase().split(/\s+/),
      ...p.tags.map(t => t.toLowerCase()),
      'project',
      'portfolio project',
      'case study',
      ...(p.isFeatured ? ['featured', 'best project', 'top project'] : [])
    ],
    metadata: {
      projectId: p.slug,
      techStack: p.tags,
      featured: p.isFeatured,
      section: 'project-detail'
    }
  });
});
