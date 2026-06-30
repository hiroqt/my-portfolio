'use client'

import { useEffect, useRef } from 'react'
import { DotGrid } from '@/components/DotGrid'
import { FaReact, FaVuejs, FaSass, FaNodeJs, FaLaravel, FaGitAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiGithubactions } from 'react-icons/si';
import { MdOutlineBrowserUpdated, MdStorage, MdSettingsSuggest, MdArrowDownward, MdDownload, MdOutlineMedicalServices } from 'react-icons/md';

export default function Home() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger subtitle and buttons after typewriter animation
    setTimeout(() => {
      document.querySelectorAll('.hero-section .reveal-fade, .hero-section .reveal').forEach(el => {
        el.classList.add('active');
      });
    }, 3500); // After both typewriter lines complete

    // Enhanced reveal logic for multiple animation types
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal animation types
    const revealSelectors = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale', '.reveal-fade'];
    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => revealObserver.observe(el));
    });

    // Smooth scroll for nav links
    const handleSmoothScroll = (e: Event) => {
        const anchor = e.currentTarget as HTMLAnchorElement;
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#' && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // Antigravity Mouse Blob tracking
    const handleGlobalMouseMove = (e: MouseEvent) => {
        if (blobRef.current) {
            blobRef.current.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 3000, fill: "forwards" });
        }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);

    // Header scroll behavior
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header?.classList.add('-translate-y-24', 'opacity-0');
        } else {
            header?.classList.remove('-translate-y-24', 'opacity-0');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Parallax Effect for Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    
    const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const card = mouseEvent.currentTarget as HTMLElement;
        const image = card.querySelector('.parallax-img') as HTMLElement;
        if (!image) return;

        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 15;
        const moveY = (y - centerY) / 15;
        
        image.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = (e: Event) => {
        const card = e.currentTarget as HTMLElement;
        const image = card.querySelector('.parallax-img') as HTMLElement;
        if (image) {
            image.style.transform = `scale(1.1) translate(0, 0)`;
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
        revealObserver.disconnect();
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.removeEventListener('click', handleSmoothScroll);
        });
        projectCards.forEach(card => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        });
    };
  }, []);

  return (
    <>
      {/* NAVIGATION SHELL */}
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full bg-surface/80 backdrop-blur-xl border border-border-subtle shadow-[0_8px_32px_0_rgba(115,46,228,0.15)] px-4 sm:px-8 py-2 sm:py-3 w-[95%] sm:w-auto max-w-[400px] sm:max-w-none">
        <nav className="flex items-center justify-between sm:justify-center gap-2 sm:gap-8 w-full sm:w-auto">
            <a className="text-sm sm:text-label-md font-label-md text-on-surface-variant hover:text-primary transition-all duration-300" href="#work">Work</a>
            <a className="text-sm sm:text-label-md font-label-md text-on-surface-variant hover:text-primary transition-all duration-300" href="#skills">Skills</a>
            <a className="text-sm sm:text-label-md font-label-md text-on-surface-variant hover:text-primary transition-all duration-300" href="#about">About</a>
            <a className="px-4 sm:px-6 py-2 bg-primary-container text-on-primary-container font-label-md text-sm sm:text-label-md rounded-full hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap" href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <DotGrid />
        
        {/* Antigravity Background */}
        <div 
          ref={blobRef} 
          className="pointer-events-none fixed top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-container/40 to-inverse-primary/40 blur-[120px] rounded-full z-0 opacity-60"
        />

        <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-gutter flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-[56px] leading-tight md:text-[96px] md:leading-tight font-bold text-white mb-8 tracking-tight typewriter-container w-full">
            <div className="typewriter-line">
              Making daily operations easier
            </div>
            <div className="typewriter-line">
              <span className="text-primary">through full-stack architectures</span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl font-normal text-text-secondary max-w-3xl mb-12 leading-relaxed reveal-fade delay-600 opacity-0">
            Building high-performance systems for staff and administrators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 reveal delay-600 opacity-0">
            <a className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300 flex items-center justify-center gap-2" href="#work">
              View Work <MdArrowDownward className="text-xl" />
            </a>
            <a className="px-8 py-4 border border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2" href="/pdf/Arnel_Baylon_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume <MdDownload className="text-xl" />
            </a>
          </div>
        </div>
      </section>

      {/* WORK SECTION */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-background relative z-10" id="work">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col gap-4 mb-16 reveal-fade">
            <span className="text-primary font-label-md text-label-md tracking-widest uppercase">Portfolio</span>
            <h2 className="text-headline-md md:text-headline-md font-headline-md text-on-surface">Systems & Solutions</h2>
          </div>
          
          {/* Bento Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* PaceMentor */}
            <div className="project-card reveal-scale md:col-span-12 group relative overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated hover:border-primary/50 transition-all duration-500">
              <div className="aspect-video md:aspect-[21/9] w-full relative parallax-container bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-70 scale-110 transition-opacity duration-700" alt="PaceMentor - Outrun your potential hero" src="https://pacementor.vercel.app/_next/image?url=%2Flight_mockup_dashboard.png&w=1920&q=75"/>
              </div>
              <div className="p-6 md:p-8 md:absolute md:bottom-0 md:left-0 md:right-0 md:glass-card pointer-events-none bg-surface-elevated md:bg-transparent">
                <h3 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-white mb-2">PaceMentor - AI Running Coach</h3>
                <p className="text-text-secondary text-sm md:text-base max-w-xl mb-4">A premium run club aesthetic training app featuring AI Coaching and dynamic, socially shareable workout graphics. Built with Flutter for cross-platform mobile experience.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-code-inline text-secondary-fixed-dim bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">Live</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Flutter</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Next.js</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">AI</span>
                </div>
              </div>
            </div>

            {/* HRIS Project */}
            <div className="project-card reveal-left delay-100 md:col-span-8 group relative overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated hover:border-primary/50 transition-all duration-500">
              <div className="aspect-video w-full relative parallax-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-60 scale-110 transition-opacity duration-700" alt="HRIS Dashboard interface" src="/images/vcm_desktop.png"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6 md:p-8 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-surface-elevated md:bg-transparent">
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-surface-container text-secondary text-xs font-bold rounded-full">Capstone</span>
                  <span className="px-3 py-1 bg-surface-container text-text-secondary text-xs font-bold rounded-full">PRODUCTION</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-white mb-2">Victorious Christian Montessori HRIS</h3>
                <p className="text-text-secondary text-sm md:text-base max-w-xl mb-4">Streamlining employee records, attendance, and payroll processing for large-scale administrative teams.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Laravel</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">MySQL</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Bootstrap</span>
                </div>
              </div>
            </div>
            
            {/* EMR System */}
            <div className="reveal-right delay-200 md:col-span-4 group relative overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated hover:border-primary/50 transition-all duration-500">
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 text-primary">
                    <MdOutlineMedicalServices className="text-2xl" />
                  </div>
                  <h3 className="text-headline-sm font-headline-sm text-white mb-2">Electronic Medical Records</h3>
                  <p className="text-text-secondary text-sm mb-6">Patient data management with encrypted history and medical tracking.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">React</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Node.js</span>
                </div>
              </div>
            </div>

            {/* TMRC Project */}
            <div className="project-card reveal-left delay-300 md:col-span-4 group relative overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated hover:border-primary/50 transition-all duration-500">
              <div className="aspect-video md:aspect-square w-full relative parallax-container">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-red-900/50 mix-blend-overlay z-10 pointer-events-none"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-70 scale-110 transition-opacity duration-700" alt="TMRC Run Club Community" src="https://tmrc.vercel.app/bg.jpg"/>
              </div>
              <div className="p-6 md:absolute md:bottom-0 md:left-0 md:right-0 md:glass-card pointer-events-none bg-surface-elevated md:bg-transparent">
                <h3 className="text-headline-sm font-headline-sm text-white mb-2">Trece Martires Run Club</h3>
                <p className="text-text-secondary text-sm mb-4">Community-driven running club platform with social feeds, hall of fame, and event management.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-code-inline text-secondary-fixed-dim bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">Live</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Next.js</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">React</span>
                </div>
              </div>
            </div>
            
            {/* HiveSyncVA */}
            <div className="project-card reveal-right delay-400 md:col-span-8 group relative overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated hover:border-primary/50 transition-all duration-500">
              <div className="aspect-video w-full relative parallax-container">
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 pointer-events-none"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-60 scale-110 transition-opacity duration-700" alt="HiveSyncVA interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzI0YDY0ETpBDTy-9ai3FKoCz4q9ATBkjhSln5uX9FmtQ1bMwXUM53kRU3ZLo2KKn5cjyTf6FXPosytyA_aIHkLQ3J4hmZ-n9qs_BK4-OUiKOF1YUV5Iy3-fMkBZVDTEcOkL4zG-n1340pud3eJChE9vvcE2hNBEWKJd4b4PsqlvuyU0yFl80jirC9p-NDhjGDMZfXak3NhUpN3OUCpvetBmPObBtDq2Nei3WTTVTBUWmMgnPBx7sY32A3B_1WxXRmHmCgFvDTD3YP"/>
              </div>
              <div className="p-6 md:p-8 md:absolute md:bottom-0 md:left-0 md:right-0 md:glass-card pointer-events-none bg-surface-elevated md:bg-transparent">
                <h3 className="text-headline-sm font-headline-sm text-white mb-2">HiveSyncVA</h3>
                <p className="text-text-secondary text-sm md:text-base max-w-xl mb-4">A unified dashboard for virtual assistants to manage cross-platform workflows and sync data effortlessly.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-code-inline text-secondary-fixed-dim bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">Active</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Next.js</span>
                  <span className="text-xs font-code-inline text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Firebase</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-lowest" id="skills">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16 reveal-fade">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Technical Proficiency</h2>
            <p className="text-text-secondary font-body-md">Engineered with modern tools and performance-driven frameworks.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="reveal-scale delay-100 p-8 glass-card rounded-2xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-headline-sm font-headline-sm text-primary mb-6 flex items-center gap-2">
                <MdOutlineBrowserUpdated className="text-2xl" /> Frontend
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-colors cursor-default">
                  <FaReact className="text-lg" /> React
                </div>
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-colors cursor-default">
                  <FaVuejs className="text-lg" /> Vue.js
                </div>
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-colors cursor-default">
                  <SiTailwindcss className="text-lg" /> TailwindCSS
                </div>
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-colors cursor-default">
                  <FaSass className="text-lg" /> Sass
                </div>
              </div>
            </div>
            {/* Backend */}
            <div className="reveal-scale delay-200 p-8 glass-card rounded-2xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-headline-sm font-headline-sm text-secondary mb-6 flex items-center gap-2">
                <MdStorage className="text-2xl" /> Backend
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors cursor-default">
                  <FaNodeJs className="text-lg" /> Node.js
                </div>
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors cursor-default">
                  <FaLaravel className="text-lg" /> Laravel
                </div>
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors cursor-default">
                  <SiMysql className="text-lg" /> MySQL
                </div>
              </div>
            </div>
            {/* DevOps */}
            <div className="reveal-scale delay-300 p-8 glass-card rounded-2xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-headline-sm font-headline-sm text-tertiary mb-6 flex items-center gap-2">
                <MdSettingsSuggest className="text-2xl" /> Infrastructure
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-tertiary hover:text-on-tertiary transition-colors cursor-default">
                  <SiGithubactions className="text-lg" /> CI/CD
                </div>
                <div className="group flex items-center gap-2 bg-surface-variant px-4 py-2 rounded-lg hover:bg-tertiary hover:text-on-tertiary transition-colors cursor-default">
                  <FaGitAlt className="text-lg" /> Git
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / TIMELINE */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop" id="about">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid md:grid-cols-2 gap-16 items-start">
          <div className="reveal-left">
            <h2 className="text-headline-md font-headline-md text-white mb-8">Professional Journey</h2>
            <div className="space-y-12">
              <div className="relative pl-8 border-l border-primary/30 reveal-left delay-100">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)]"></div>
                <span className="text-label-md font-label-md text-primary mb-2 block">2025 - 2026</span>
                <h4 className="text-headline-sm font-headline-sm text-on-surface mb-2">Full Stack Developer</h4>
                <p className="text-text-secondary font-body-md">Architecting and building the Victorious Christian Montessori HRIS Capstone project.</p>
              </div>
              <div className="relative pl-8 border-l border-primary/30 reveal-left delay-200">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)]"></div>
                <span className="text-label-md font-label-md text-primary mb-2 block">2021 - Present</span>
                <h4 className="text-headline-sm font-headline-sm text-on-surface mb-2">Freelance Full-Stack Developer</h4>
                <p className="text-text-secondary font-body-md">Designing and deploying bespoke systems for SMEs, including medical centers and educational institutions.</p>
              </div>
              <div className="relative pl-8 border-l border-primary/30 reveal-left delay-300">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-label-md font-label-md text-text-secondary mb-2 block">Education</span>
                <h4 className="text-headline-sm font-headline-sm text-on-surface mb-2">Bachelor of Science in Information Technology</h4>
                <p className="text-text-secondary font-body-md">Focused on advanced web architectures and database management systems.</p>
              </div>
            </div>
          </div>
          <div className="reveal-right relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden border border-border-subtle bg-surface-elevated p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-500" alt="Developer profile portrait" src="/images/me.jpg"/>
              <div className="mt-8 px-4 pb-4">
                <p className="text-body-lg font-body-lg text-on-surface italic leading-relaxed">
                  &quot;Precision in code, clarity in design. My goal is to transform complex operational challenges into seamless digital experiences.&quot;
                </p>
                <div className="mt-6 flex gap-4">
                  <a className="text-text-secondary hover:text-primary transition-colors" href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-2xl" />
                  </a>
                  <a className="text-text-secondary hover:text-primary transition-colors" href="https://www.linkedin.com/in/arnel-baylon-b0523318" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-low relative" id="contact">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="reveal-scale max-w-3xl mx-auto glass-card p-8 md:p-16 rounded-3xl border border-border-subtle">
            <div className="text-center mb-12">
              <h2 className="text-headline-md font-headline-md text-white mb-4">Start a Project</h2>
              <p className="text-text-secondary">Interested in collaborating or have a system in mind? Let&apos;s talk.</p>
            </div>
            <form action="#" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-label-md font-label-md text-text-secondary ml-1">Name</label>
                  <input className="w-full bg-void-black border border-border-subtle rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white transition-all" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-label-md font-label-md text-text-secondary ml-1">Email</label>
                  <input className="w-full bg-void-black border border-border-subtle rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white transition-all" type="email"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-label-md font-label-md text-text-secondary ml-1">Message</label>
                <textarea className="w-full bg-void-black border border-border-subtle rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white transition-all" placeholder="How can I help your operations?" rows={5}></textarea>
              </div>
              <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-section-gap-mobile md:py-16 bg-surface border-t border-border-subtle">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-headline-sm font-headline-sm font-bold text-on-surface">Nel</span>
            <p className="text-label-md font-label-md text-text-secondary text-center md:text-left">© 2025 Arnel A. Baylon. Built with precision.</p>
          </div>
          <div className="flex gap-8">
            <a className="flex items-center gap-2 text-label-md font-label-md text-text-secondary hover:text-secondary transition-colors" href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a className="flex items-center gap-2 text-label-md font-label-md text-text-secondary hover:text-secondary transition-colors" href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
            <a className="flex items-center gap-2 text-label-md font-label-md text-text-secondary hover:text-secondary transition-colors" href="mailto:arnelbaylon15@gmail.com">
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
