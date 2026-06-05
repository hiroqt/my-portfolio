'use client'

import { useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

const systems = [
  {
    name: 'HRIS',
    organization: 'Victorious Christian Montessori',
    type: 'Human Resource Information System',
    summary:
      'Built a complete HR platform for employee records, QR attendance, leave management, payroll preparation, and role-based access.',
    impact: 'Reduced manual HR processing and centralized staff data into one reliable workflow.',
    stack: ['Laravel', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Vite'],
    details: ['QR attendance', 'Payroll support', 'Employee lifecycle', 'Role permissions', 'Leave management', 'Data organization', 'Secure access', 'Audit logs', 'Responsive UI', '20+ Modules and 100+ Sub-features'],
    status: 'Production'
  },
  {
    name: 'Queuing System',
    organization: 'GEAMH',
    type: 'Patient Flow Management',
    summary:
      'Developed a queue workflow for hospital transactions, counter assignment, patient calling, and service status monitoring.',
    impact: 'Improved queue visibility for staff and helped patients move through service points with less confusion.',
    stack: ['Vue.js', 'MySQL', 'JavaScript', 'Responsive UI', 'Grok AI Integration', 'Role-based Access'],
    details: ['Ticket flow', 'Printed tickets', 'Counter dashboard', 'Status tracking', 'Staff controls', 'Patient display', 'Service records'],
    status: 'Implemented'
  },
  {
    name: 'Clearance System',
    organization: 'GEAMH',
    type: 'Digital Clearance Workflow',
    summary:
      'Created a clearance process for tracking requirements, approvals, department routing, and final release status.',
    impact: 'Made clearance requests easier to audit by replacing scattered manual follow-ups with a structured system.',
    stack: ['Vue.js', 'MySQL', 'Role-based Access', 'Audit Trail' , 'Responsive UI', 'Grok AI Integration' , 'Protected Access'],
    details: ['Approval routing', 'Requirement tracking', 'Department views', 'Release records' , 'Protected access', 'Audit logs'],
    status: 'Implemented'
  },
  {
    name: 'EMR System',
    organization: 'GEAMH',
    type: 'Electronic Medical Records',
    summary:
      'Developed core EMR features for patient records, clinical notes, visit history, and organized medical data access.',
    impact: 'Supported faster record lookup and cleaner documentation for hospital workflows.',
    stack: ['Vue.js', 'MySQL', 'Secure Records', 'Responsive UI' , 'Role-based Access', 'Grok AI Integration'],
    details: ['Patient profiles', 'Integrated System', 'Visit history', 'Clinical notes', 'Protected access' , 'Audit logs', 'Data organization', 'Medical records'],
    status: 'Implemented'
  }
]

const techStack = [
  {
    group: 'Frontend',
    tools: [
      'React',
      'Next.js',
      'Vue.js',
      'Tailwind CSS',
      'Alpine.js',
      'JavaScript',
      'TypeScript',
    ]
  },
  {
    group: 'Backend',
    tools: [
      'PHP',
      'Laravel',
      'MySQL',
      'REST APIs',
      'Node.js'
    ]
  },
  {
    group: 'DevOps',
    tools: [
      'Git',
      'GitHub',
      'Composer',
      'NPM'
    ]
  }
]

const highlights = [
  'Full-stack developer building practical software that solves real-world operational challenges.',
  'Builds database-driven applications with clean workflows and reliable access control.',
  'Comfortable translating manual office processes into maintainable web applications.'
]

const certifications = [
  'Cisco Networking Academy - Ethical Hacker Certification',
  'Digital Literacy Webinar - AI Tools & Applications',
  'Blockchain Campus Conference - Web3 & Blockchain Technology',
  'On the job training (486hrs OJT)'
]

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get('theme')
    if (requestedTheme === 'light' || requestedTheme === 'dark') {
      setTheme(requestedTheme)
    }
  }, [])

  const themeLabel = useMemo(() => (theme === 'dark' ? 'Dark' : 'Light'), [theme])

  return (
    <main className="resume-page" data-theme={theme}>
      <div className="resume-shell">
        <header className="resume-hero">
          <nav className="resume-nav" aria-label="Portfolio navigation">
            <a href="#systems">Systems</a>
            <a href="#tech-stack">Tech Stack</a>
            <a href="#contact">Contact</a>
            <div className="theme-switch" aria-label="Theme selector">
              {(['light', 'dark'] as Theme[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={theme === option}
                  onClick={() => setTheme(option)}
                  className={theme === option ? 'is-active' : ''}
                >
                  {option}
                </button>
              ))}
            </div>
          </nav>

          <section className="hero-grid" aria-label="Profile summary">
            <div className="identity-block">
              <p className="eyebrow">Full-Stack Developer</p>
              <h1>Arnel A. Baylon</h1>
              <p className="headline">
                Making daily operations easier for staff and administrators
              </p>
              <div className="contact-row" id="contact">
                <a href="mailto:arnelbaylon15@gmail.com">arnelbaylon15@gmail.com</a>
                <span>Cavite, Philippines</span>
                <a href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer">
                  github.com/hiroqt
                </a>
              </div>
            </div>

            <aside className="theme-preview" aria-label={`${themeLabel} mode preview`}>
              <div className="preview-top">
                <span>{themeLabel} Mode</span>
                <span>Resume Preview</span>
              </div>
              <div className="preview-panels">
                <MiniPreview mode="light" active={theme === 'light'} onSelect={setTheme} />
                <MiniPreview mode="dark" active={theme === 'dark'} onSelect={setTheme} />
              </div>
            </aside>
          </section>
        </header>

        <section className="summary-band">
          {highlights.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </section>

        <section className="resume-layout">
          <aside className="resume-sidebar" aria-label="Resume details">
            <ResumeSection title="Profile">
              <p>
                I design and develop simple, useful web systems that organize records, automate
                repetitive work, and make daily operations easier for staff and administrators.
              </p>
            </ResumeSection>

            <ResumeSection title="Tech Stack" id="tech-stack">
              {techStack.map((stack) => (
                <div key={stack.group} className="tech-category">
                  <h3 className="tech-category-title">{stack.group}</h3>
                  <div className="skill-list">
                    {stack.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title="Education">
              <div className="timeline-item">
                <strong>Bachelor of Science in Information Technology</strong>
                <span>Current Student</span>
              </div>
              <div className="timeline-item">
                <strong>Senior Highschool - ICT</strong>
                <span>2021 - 2022</span>
              </div>
            </ResumeSection>

            <ResumeSection title="Training">
              <ul className="plain-list">
                {certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </ResumeSection>
          </aside>

          <div className="resume-main">
            <ResumeSection title="Selected Systems" id="systems">
              <div className="system-stack">
                {systems.map((system) => (
                  <article className="system-card" key={`${system.organization}-${system.name}`}>
                    <div className="system-card-header">
                      <div>
                        <p className="system-org">{system.organization}</p>
                        <h2>{system.name}</h2>
                        <span>{system.type}</span>
                      </div>
                      <strong>{system.status}</strong>
                    </div>

                    <p>{system.summary}</p>
                    <p className="impact">{system.impact}</p>

                    <div className="detail-grid">
                      {system.details.map((detail) => (
                        <span key={detail}>{detail}</span>
                      ))}
                    </div>

                    <div className="stack-row">
                      {system.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </ResumeSection>
          </div>
        </section>
      </div>
    </main>
  )
}

function ResumeSection({
  children,
  id,
  title
}: {
  children: React.ReactNode
  id?: string
  title: string
}) {
  return (
    <section className="resume-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function MiniPreview({
  active,
  mode,
  onSelect
}: {
  active: boolean
  mode: Theme
  onSelect: (theme: Theme) => void
}) {
  return (
    <button
      type="button"
      className="mini-preview"
      data-preview={mode}
      data-active={active}
      onClick={() => onSelect(mode)}
      aria-label={`${mode} preview`}
    >
      <span className="mini-header">
        <span />
        <span>{mode}</span>
      </span>
      <span className="mini-title" />
      <span className="mini-line long" />
      <span className="mini-line" />
      <span className="mini-grid">
        <span />
        <span />
        <span />
      </span>
    </button>
  )
}
