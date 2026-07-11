'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaRocket, FaInstagram } from 'react-icons/fa'
import { MdOutlineBrowserUpdated, MdStorage, MdCloud } from 'react-icons/md'
import { GallerySlider } from '@/components/GallerySlider'
import { GithubActivity } from '@/components/GithubActivity'
import {
  SiFlutter, SiNextdotjs, SiLaravel, SiPhp, SiMysql, SiTypescript, SiSupabase,
  SiReact, SiVuedotjs, SiTailwindcss, SiNodedotjs, SiFirebase, SiVercel, SiGit, SiFigma,
  SiTrello
} from 'react-icons/si'

const techIcons: Record<string, React.ReactNode> = {
  "Flutter": <SiFlutter />,
  "Next.js": <SiNextdotjs />,
  "AI": <FaRocket />,
  "Laravel": <SiLaravel />,
  "PHP": <SiPhp />,
  "MySQL": <SiMysql />,
  "TypeScript": <SiTypescript />,
  "Supabase": <SiSupabase />,
  "React": <SiReact />,
  "Vue.js": <SiVuedotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  "Node.js": <SiNodedotjs />,
  "Firebase": <SiFirebase />,
  "Vercel": <SiVercel />,
  "AWS": <MdCloud />,
  "Git": <SiGit />,
  "Figma": <SiFigma />,
  "Trello": <SiTrello />
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef(null)

  // Parallax for Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityHero = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    // Load Credly badge script
    const credlyScript = document.createElement('script');
    credlyScript.src = '//cdn.credly.com/assets/utilities/embed.js';
    credlyScript.async = true;
    document.body.appendChild(credlyScript);

    return () => {
      if (credlyScript.parentNode) {
        credlyScript.parentNode.removeChild(credlyScript);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="max-w-screen-wide mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight relative z-50">Nel.</span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex items-center gap-2 font-medium text-sm hover:text-muted-foreground transition-colors tracking-widest"
          >
            {isMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </nav>
      </header>

      {/* Sidemenu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full md:w-[450px] bg-foreground text-background p-8 md:p-16 flex flex-col justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="md:hidden absolute top-5 right-6 text-sm font-medium tracking-widest hover:text-background/70 transition-colors p-2"
              >
                CLOSE
              </button>

              <div className="flex flex-col h-full pt-12 md:pt-16">

                {/* Menu Links */}
                <div className="flex-1 flex flex-col justify-center gap-6">
                  <span className="text-xs font-mono text-background/50 uppercase tracking-widest mb-4 block">Menu</span>
                  {[
                    { name: 'Home', href: '#' },
                    { name: 'Work', href: '#work' },
                    { name: 'Skills', href: '#skills' },
                    { name: 'About', href: '#about' },
                    { name: 'Contact', href: '#contact' }
                  ].map((item, i) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.5, delay: 0.1 + (i * 0.1), ease: [0.76, 0, 0.24, 1] }}
                      className="text-5xl md:text-6xl font-bold tracking-tighter hover:text-background/70 transition-colors"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>

                {/* Footer Info inside Sidebar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-auto grid grid-cols-2 gap-8 pt-12 border-t border-background/20"
                >
                  <div>
                    <span className="text-xs font-mono text-background/50 uppercase tracking-widest mb-4 block">Social</span>
                    <div className="flex flex-col gap-3 text-sm font-medium">
                      <a href="https://github.com/hiroqt" target="_blank" rel="noreferrer" className="hover:text-background/70 transition-colors">Github</a>
                      <a href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noreferrer" className="hover:text-background/70 transition-colors">LinkedIn</a>
                      <a href="https://www.facebook.com/arnel.baylon.165" target="_blank" rel="noreferrer" className="hover:text-background/70 transition-colors">Facebook</a>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-background/50 uppercase tracking-widest mb-4 block">Get in touch</span>
                    <a href="mailto:arnelbaylon15@gmail.com" className="text-sm font-medium hover:text-background/70 transition-colors block">arnelbaylon15@gmail.com</a>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="max-w-screen-wide w-full flex flex-col items-start gap-8 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none">
              Generative AI<br />Developer.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light"
          >
            Making daily operations easier through high-performance architectures, scalable cloud solutions, and robust systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <a href="#work" className="px-8 py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors rounded-none">
              View Work
            </a>
            <a href="/pdf/Arnel_Baylon_Resume.pdf" target="_blank" className="px-8 py-4 border border-border font-medium hover:bg-muted transition-colors rounded-none">
              Resume
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6 border-t border-border">
        <div className="max-w-screen-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Work</h2>
            <p className="text-muted-foreground">Systems and solutions built for scale.</p>
          </motion.div>

          <div className="flex flex-col border-t border-border mt-12">
            {[
              {
                id: "01",
                title: "PaceMentor",
                description: "Comprehensive mobile application that transforms how runners train, track, and achieve their goals. Featuring AI-powered coaching, adaptive training plans, real-time GPS tracking, and seamless Strava integration, it's your intelligent companion from your first steps to your personal best.",
                tags: ["Flutter", "Next.js", "AI"],
                image: "https://pacementor.vercel.app/_next/image?url=%2Flight_mockup_dashboard.png&w=1920&q=75",
                link: "#"
              },
              {
                id: "02",
                title: "VCM HRIS",
                description: "Comprehensive QR-Code based Human Resource Information System with employee management, leave tracking, job applications, realtime notifiactions and payroll integration.",
                tags: ["Laravel", "PHP", "MySQL"],
                image: "/images/vcm_desktop.png",
                link: "#"
              },
              {
                id: "03",
                title: "TMRC",
                description: "Running Club Website built for Trece Martirez Running Club, Showcasing their upcoming and past races, races results, and community updates.",
                tags: ["Next.js", "TypeScript"],
                image: "/images/tmrc.png",
                link: "#"
              },
              {
                id: "04",
                title: "Present Po",
                description: "Comprehensive attendance and time tracking application that transforms how organizations monitor workforce presence, manage schedules, and generate reports.",
                tags: ["Next.js", "Supabase"],
                image: "/images/dtr_landing.png",
                link: "#"
              }
            ].map((project, index) => (
              <motion.a
                href={project.link}
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border py-8 md:py-12 hover:bg-muted/20 hover:px-4 md:hover:px-8 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                {/* Background Hover Image Parallax effect */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[250px] opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-12 group-hover:translate-x-0 pointer-events-none hidden md:block z-0 mask-image-gradient">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-lg shadow-2xl" />
                </div>

                <div className="flex items-start gap-6 md:gap-12 z-10">
                  <span className="text-lg md:text-xl text-muted-foreground font-mono mt-2 md:mt-4">_{project.id}.</span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter transition-colors duration-300">{project.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base max-w-sm">{project.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6 md:mt-0 z-10 md:mr-[420px] lg:mr-[500px]">
                  {project.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-2 text-sm font-medium px-4 py-2 border border-border group-hover:border-foreground bg-background transition-colors duration-300">
                      {techIcons[tag]}
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & About Section */}
      <section id="skills" className="py-24 px-6 border-t border-border bg-muted/30">
        <div className="max-w-screen-wide mx-auto">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-8">Technical Stack</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <MdOutlineBrowserUpdated /> Frontend
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript", "Flutter"].map(tech => (
                      <span key={tech} className="flex items-center gap-2 px-4 py-2 border border-border bg-background">
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <MdStorage /> Backend
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {["Laravel", "Node.js", "Firebase", "MySQL", "Supabase"].map(tech => (
                      <span key={tech} className="flex items-center gap-2 px-4 py-2 border border-border bg-background">
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <MdCloud /> DevOps & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {["Vercel", "AWS", "Git", "Figma", "Trello"].map(tech => (
                      <span key={tech} className="flex items-center gap-2 px-4 py-2 border border-border bg-background">
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-border">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
                    <MdOutlineBrowserUpdated /> Certifications
                  </h3>

                  <div className="flex flex-col gap-6">
                    <div className="group relative p-6 border border-border bg-background hover:border-foreground transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                      <h4 className="font-bold text-lg mb-1">Internship - 486hrs</h4>
                      <p className="text-sm text-muted-foreground">Full Stack & IT Support at General Emilio Aguinaldo Memorial Hospital</p>
                    </div>

                    <div className="group relative p-6 border border-border bg-background hover:border-foreground transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                      <h4 className="font-bold text-lg mb-1">Lean Six Sigma White Belt</h4>
                      <p className="text-sm text-muted-foreground">Process Improvement & Quality Management</p>
                    </div>

                    <div className="group p-6 border border-border bg-background hover:border-foreground transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                      <h4 className="font-bold text-lg mb-6 flex items-center justify-between">
                        IBM AI Certifications
                        <span className="text-xs font-mono bg-muted text-muted-foreground px-2 py-1">7 Topics</span>
                      </h4>
                      <div className="flex flex-col xl:flex-row gap-6">
                        <div className="flex flex-wrap gap-4 items-center justify-center bg-muted/30 p-4 border border-border/50">
                          <div data-iframe-width="140" data-iframe-height="250" data-share-badge-id="82e8f4a4-6ae5-4bea-8b5e-212cf6ec6563" data-share-badge-host="https://www.credly.com"></div>
                          <div data-iframe-width="140" data-iframe-height="250" data-share-badge-id="06cc685a-5d6c-49fe-bc49-f86e53e5417e" data-share-badge-host="https://www.credly.com"></div>
                        </div>
                        <div className="flex-1">
                          <ul className="text-sm text-muted-foreground space-y-3 list-none">
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> AI Fundamentals: Foundations for Understanding AI</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> AI Forms and Functions</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> Introduction to Artificial Intelligence</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> Machine Learning</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> Neural Networks and Deep Learning</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> Retrieval-Augmented Generation for Enhanced AI Outputs</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> The Intelligence Behind AI</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="group p-6 border border-border bg-background hover:border-foreground transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                      <h4 className="font-bold text-lg mb-6 flex items-center justify-between">
                        AWS Certifications
                        <span className="text-xs font-mono bg-muted text-muted-foreground px-2 py-1">4 Topics</span>
                      </h4>
                      <div className="flex flex-col xl:flex-row gap-6">
                        <div className="flex items-center justify-center bg-muted/30 p-4 border border-border/50">
                          <div data-iframe-width="140" data-iframe-height="250" data-share-badge-id="7d53aa8f-5672-4064-b296-f6fccf400108" data-share-badge-host="https://www.credly.com"></div>
                        </div>
                        <div className="flex-1">
                          <ul className="text-sm text-muted-foreground space-y-3 list-none">
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> Advanced SQL and Database Design</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> AWS Knowledge: Object Storage</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> Generative AI</li>
                            <li className="flex items-start gap-3"><span className="text-foreground/50 mt-[2px]">▹</span> Serverless Mindset</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              id="about"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-8">Journey</h2>

              <div className="space-y-8">
                <div className="border-l-2 border-border pl-6 relative">
                  <div className="absolute w-3 h-3 bg-foreground rounded-full -left-[7px] top-1"></div>
                  <span className="text-sm font-semibold text-muted-foreground block mb-1">2026</span>
                  <h4 className="text-xl font-bold mb-2">Intern Full Stack Developer</h4>
                  <p className="text-muted-foreground">Building Medical Related projects for General Emilio Aguinaldo Memorial Hospital.</p>
                </div>

                <div className="border-l-2 border-border pl-6 relative">
                  <div className="absolute w-3 h-3 bg-border rounded-full -left-[7px] top-1"></div>
                  <span className="text-sm font-semibold text-muted-foreground block mb-1">2025 - 2026</span>
                  <h4 className="text-xl font-bold mb-2">Full Stack Developer</h4>
                  <p className="text-muted-foreground">Building VCM HRIS Capstone project architecture.</p>
                </div>

                <div className="border-l-2 border-border pl-6 relative">
                  <div className="absolute w-3 h-3 bg-border rounded-full -left-[7px] top-1"></div>
                  <span className="text-sm font-semibold text-muted-foreground block mb-1">2025 - Present</span>
                  <h4 className="text-xl font-bold mb-2">Freelance Developer</h4>
                  <p className="text-muted-foreground">Custom software systems for SMEs and institutions.</p>
                </div>
              </div>

              {/* Profile Gallery */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold tracking-tight mb-6 flex items-center justify-between">
                  Life & Work
                  <span className="text-xs font-mono bg-muted px-2 py-1 text-muted-foreground">Gallery</span>
                </h3>
                <div className="p-3 border border-border bg-background w-full hover:border-foreground transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                  <GallerySlider />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section id="activity" className="py-24 px-6 border-t border-border">
        <div className="max-w-screen-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Open Source Activity</h2>
            <p className="text-muted-foreground">My contributions and projects on GitHub.</p>
          </motion.div>

          <GithubActivity />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Let's talk.</h2>
          <p className="text-xl text-muted-foreground mb-10">Interested in collaborating or have a system in mind?</p>

          <a href="mailto:arnelbaylon15@gmail.com" className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors rounded-full text-lg">
            Say Hello <span className="ml-2">→</span>
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-muted/50">
        <div className="max-w-screen-wide mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-bold text-xl">Nel.</span>
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Arnel A. Baylon.</p>

          <div className="flex gap-6 text-xl text-muted-foreground">
            <a href="https://github.com/hiroqt" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors"><FaLinkedin /></a>
            <a href="mailto:arnelbaylon15@gmail.com" className="hover:text-foreground transition-colors"><FaEnvelope /></a>
            <a href="https://www.facebook.com/arnel.baylon.165" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors"><FaFacebook /></a>
            <a href="https://www.instagram.com/yheellll?igsh=MWYxMDZlMzYzNXA2dw" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors"><FaInstagram /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
