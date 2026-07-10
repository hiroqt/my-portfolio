'use client'

import { useEffect, useRef, useState } from 'react'
import { DotGrid } from '@/components/DotGrid'
import { TypingText } from '@/components/TypingText'
import { RotatingTypingText } from '@/components/RotatingTypingText'
import { GallerySlider } from '@/components/GallerySlider'
import { GitHubStats } from '@/components/GitHubStats'
import { FaReact, FaVuejs, FaSass, FaNodeJs, FaLaravel, FaGitAlt, FaGithub, FaLinkedin, FaBootstrap, FaCss3Alt, FaPhp, FaAws, FaFigma, FaAndroid, FaHtml5, FaJs, FaRocket, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiGithubactions, SiTypescript, SiDart, SiSupabase, SiFirebase, SiExpress, SiVercel, SiGooglecloud, SiNotion, SiClaude, SiOpenai } from 'react-icons/si';
import { MdOutlineBrowserUpdated, MdStorage, MdSettingsSuggest, MdArrowDownward, MdDownload, MdOutlineMedicalServices, MdCloud, MdSmartToy } from 'react-icons/md';
import { TbBrandVscode } from 'react-icons/tb';

export default function Home() {
  const blobRef = useRef<HTMLDivElement>(null);
  const [showLine2, setShowLine2] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showAllFrontend, setShowAllFrontend] = useState(false);
  const [showAllBackend, setShowAllBackend] = useState(false);
  const [showAllDevOps, setShowAllDevOps] = useState(false);

  const handleLine1Complete = () => {
    setShowLine2(true);
  };

  const handleLine2Complete = () => {
    setTimeout(() => {
      setShowSubtitle(true);
    }, 300);
  };

  useEffect(() => {
    // Trigger buttons after typing completes
    if (showSubtitle) {
      setTimeout(() => {
        document.querySelectorAll('.hero-section .reveal').forEach(el => {
          el.classList.add('active');
        });
      }, 500);
    }

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

    // Load Credly badge script
    const credlyScript = document.createElement('script');
    credlyScript.src = '//cdn.credly.com/assets/utilities/embed.js';
    credlyScript.async = true;
    document.body.appendChild(credlyScript);

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
        // Clean up Credly script
        if (credlyScript.parentNode) {
            credlyScript.parentNode.removeChild(credlyScript);
        }
    };
  }, [showSubtitle]);

  return (
    <>
      {/* Main Content */}
      <div>
      {/* NAVIGATION SHELL */}
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 bg-terminal-bg border border-terminal-border px-4 sm:px-8 py-2 sm:py-3 w-[95%] sm:w-auto max-w-[500px] sm:max-w-none">
        <nav className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 w-full sm:w-auto">
            <a className="text-sm sm:text-label-md font-label-md text-terminal-gray hover:text-terminal-fg transition-all duration-300" href="#work">[Work]</a>
            <a className="text-sm sm:text-label-md font-label-md text-terminal-gray hover:text-terminal-fg transition-all duration-300" href="#skills">[Skills]</a>
            <a className="text-sm sm:text-label-md font-label-md text-terminal-gray hover:text-terminal-fg transition-all duration-300" href="#github">[GitHub]</a>
            <a className="text-sm sm:text-label-md font-label-md text-terminal-gray hover:text-terminal-fg transition-all duration-300" href="#about">[About]</a>
            <a className="px-4 sm:px-6 py-2 bg-terminal-fg text-terminal-bg font-label-md text-sm sm:text-label-md hover:bg-terminal-gray transition-all duration-200 whitespace-nowrap" href="#contact">&gt; Contact</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-8 md:pb-12 border-b border-terminal-border bg-terminal-bg">
        <DotGrid />

        <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-gutter flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-[48px] leading-tight md:text-[72px] md:leading-tight font-bold text-terminal-fg mb-4 md:mb-6 tracking-tight terminal-text-container w-full min-h-[80px] md:min-h-[140px]">
            <div className="mb-2">
              <span className="text-terminal-fg">&gt; </span>
              <TypingText 
                text="Making daily operations easier"
                delay={200}
                speed={60}
                onComplete={handleLine1Complete}
              />
            </div>
            {showLine2 && (
              <div>
                <span className="text-terminal-fg">$ </span>
                <RotatingTypingText 
                  words={[
                    'through full-stack architectures',
                    'with modern web applications',
                    'via scalable cloud solutions',
                    'using robust backend systems'
                  ]}
                  delay={0}
                  typingSpeed={60}
                  onFirstComplete={handleLine2Complete}
                />
              </div>
            )}
          </h1>
          {showSubtitle && (
            <p className="text-lg md:text-xl font-normal text-terminal-gray max-w-3xl mb-6 md:mb-8 leading-relaxed animate-fade-in">
              // Building high-performance systems for staff and administrators.
            </p>
          )}
          {showSubtitle && (
            <div className="flex flex-col items-center gap-6 reveal opacity-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <a className="px-6 py-3 bg-terminal-fg text-terminal-bg font-bold border border-terminal-fg hover:bg-terminal-bg hover:text-terminal-fg transition-all duration-300 flex items-center justify-center gap-2" href="#work">
                  [View Work] <MdArrowDownward className="text-lg" />
                </a>
                <a className="px-6 py-3 border border-terminal-fg text-terminal-fg font-bold hover:bg-terminal-fg hover:text-terminal-bg transition-all duration-300 flex items-center justify-center gap-2" href="/pdf/Arnel_Baylon_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  [Download Resume] <MdDownload className="text-lg" />
                </a>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4 items-center">
                <a href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-terminal-border hover:border-[#0A66C2] hover:bg-[#0A66C2] flex items-center justify-center transition-all duration-300 group">
                  <FaLinkedin className="text-xl text-terminal-gray group-hover:text-white transition-colors" />
                </a>
                <a href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-terminal-border hover:border-[#333] hover:bg-[#333] flex items-center justify-center transition-all duration-300 group">
                  <FaGithub className="text-xl text-terminal-gray group-hover:text-white transition-colors" />
                </a>
                <a href="mailto:arnelbaylon15@gmail.com" className="w-12 h-12 rounded-full border-2 border-terminal-border hover:border-[#EA4335] hover:bg-[#EA4335] flex items-center justify-center transition-all duration-300 group">
                  <FaEnvelope className="text-xl text-terminal-gray group-hover:text-white transition-colors" />
                </a>
                <a href="https://www.facebook.com/arnel.baylon.165" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-terminal-border hover:border-[#1877F2] hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 group">
                  <FaFacebook className="text-xl text-terminal-gray group-hover:text-white transition-colors" />
                </a>
                <a href="https://www.appbuildersph.com/makers/hiroqt_" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-terminal-border hover:border-[#10B981] hover:bg-[#10B981] flex items-center justify-center transition-all duration-300 group">
                  <FaRocket className="text-xl text-terminal-gray group-hover:text-white transition-colors" />
                </a>
                <a href="https://www.instagram.com/yheellll?igsh=MWYxMDZlMzYzNXA2dw" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-terminal-border hover:border-[#E4405F] hover:bg-[#E4405F] flex items-center justify-center transition-all duration-300 group">
                  <FaInstagram className="text-xl text-terminal-gray group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WORK SECTION */}
      <section className="py-8 md:py-12 bg-terminal-bg relative z-10 border-b border-terminal-border" id="work">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col gap-2 mb-6 md:mb-8 reveal-fade">
            <span className="text-terminal-gray font-label-md text-label-md tracking-widest uppercase">// PORTFOLIO</span>
            <h2 className="text-headline-md md:text-headline-md font-headline-md text-terminal-fg">&gt; Systems &amp; Solutions</h2>
          </div>
          
          {/* Bento Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* PaceMentor */}
            <div className="project-card reveal-scale md:col-span-12 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video md:aspect-[24/9] w-full relative parallax-container bg-terminal-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700" alt="PaceMentor - Outrun your potential hero" src="https://pacementor.vercel.app/_next/image?url=%2Flight_mockup_dashboard.png&w=1920&q=75"/>
              </div>
              <div className="p-4 md:p-6 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg md:bg-terminal-bg/90 border-t border-terminal-border">
                <h3 className="text-lg md:text-xl font-bold text-terminal-fg mb-1">$ PaceMentor - Your AI Running Coach</h3>
                <p className="text-terminal-gray text-xs md:text-sm max-w-3xl mb-2">// Comprehensive mobile app with AI-powered coaching, adaptive training plans, real-time GPS tracking, and Strava integration. Features intelligent workout adjustments, detailed performance analytics, and beautiful shareable workout graphics.</p>
                <div className="flex gap-2 flex-wrap items-center">
                  <a href="https://pacementor.vercel.app/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-2 py-1 hover:bg-terminal-fg hover:text-terminal-bg transition-all">[Live App]</a>
                  <a href="https://www.appbuildersph.com/apps/pacementor" target="_blank" rel="noopener noreferrer" className="pointer-events-auto text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-2 py-1 hover:bg-terminal-fg hover:text-terminal-bg transition-all">[App Builders PH - 10 ⬆]</a>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Flutter</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Next.js</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">AI</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Sports</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Health</span>
                </div>
              </div>
            </div>

            {/* HRIS Project */}
            <div className="project-card reveal-left delay-100 md:col-span-6 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video w-full relative parallax-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700" alt="HRIS Dashboard interface" src="/images/vcm_desktop.png"/>
              </div>
              <div className="p-4 md:p-5 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg/90 border-t border-terminal-border">
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-terminal-bg border border-terminal-fg text-terminal-fg text-xs font-bold">[Capstone]</span>
                  <span className="px-2 py-1 bg-terminal-bg border border-terminal-border text-terminal-gray text-xs font-bold">[PRODUCTION]</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-terminal-fg mb-1">$ VCM HRIS</h3>
                <p className="text-terminal-gray text-xs mb-2">// Streamlining employee records, attendance, and payroll.</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Blade</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">PHP</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Laravel</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">MySQL</span>
                </div>
              </div>
            </div>
            
            {/* TMRC Project */}
            <div className="project-card reveal-left delay-300 md:col-span-3 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video md:aspect-square w-full relative parallax-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700" alt="TMRC Run Club Community" src="https://tmrc.vercel.app/bg.jpg"/>
              </div>
              <div className="p-4 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg/90 border-t border-terminal-border">
                <h3 className="text-sm md:text-base font-bold text-terminal-fg mb-1">$ TMRC</h3>
                <p className="text-terminal-gray text-xs mb-2">// Running club platform.</p>
                <div className="flex flex-wrap gap-1">
                  <a href="https://tmrc.vercel.app/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-2 py-1 hover:bg-terminal-fg hover:text-terminal-bg transition-all">[Live]</a>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">TypeScript</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Next.js</span>
                </div>
              </div>
            </div>
            
            {/* HiveSyncVA */}
            <div className="project-card reveal-right delay-400 md:col-span-3 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video md:aspect-square w-full relative parallax-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700" alt="HiveSyncVA interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzI0YDY0ETpBDTy-9ai3FKoCz4q9ATBkjhSln5uX9FmtQ1bMwXUM53kRU3ZLo2KKn5cjyTf6FXPosytyA_aIHkLQ3J4hmZ-n9qs_BK4-OUiKOF1YUV5Iy3-fMkBZVDTEcOkL4zG-n1340pud3eJChE9vvcE2hNBEWKJd4b4PsqlvuyU0yFl80jirC9p-NDhjGDMZfXak3NhUpN3OUCpvetBmPObBtDq2Nei3WTTVTBUWmMgnPBx7sY32A3B_1WxXRmHmCgFvDTD3YP"/>
              </div>
              <div className="p-4 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg/90 border-t border-terminal-border">
                <h3 className="text-sm md:text-base font-bold text-terminal-fg mb-1">$ HiveSyncVA</h3>
                <p className="text-terminal-gray text-xs mb-2">// VA dashboard.</p>
                <div className="flex gap-1 flex-wrap">
                  <span className="text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-2 py-1">[Active]</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">TypeScript</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Next.js</span>
                </div>
              </div>
            </div>

            {/* Present Po */}
            <div className="project-card reveal-left delay-200 md:col-span-6 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video w-full relative parallax-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700" alt="Present Po DTR Landing Page" src="/images/dtr_landing.png"/>
              </div>
              <div className="p-4 md:p-5 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg/90 border-t border-terminal-border">
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-terminal-bg border border-terminal-fg text-terminal-fg text-xs font-bold">[Internship]</span>
                  <span className="px-2 py-1 bg-terminal-bg border border-terminal-border text-terminal-gray text-xs font-bold">[PRODUCTION]</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-terminal-fg mb-1">$ Present Po</h3>
                <p className="text-terminal-gray text-xs mb-2">// Modern, animated time tracking system with admin dashboard, QR code-based attendance, and group management. Built for General Emilio Aguinaldo Memorial Hospital.</p>
                <div className="flex flex-wrap gap-1">
                  <a href="https://presentpo.vercel.app/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-2 py-1 hover:bg-terminal-fg hover:text-terminal-bg transition-all">[Live App]</a>
                  <a href="https://appbuildersph.com/apps/present-po" target="_blank" rel="noopener noreferrer" className="pointer-events-auto text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-2 py-1 hover:bg-terminal-fg hover:text-terminal-bg transition-all">[App Builders PH]</a>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Next.js</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">TypeScript</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Supabase</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Framer Motion</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* TECH STACK & ABOUT COMBINED */}
      <section className="py-8 md:py-12 bg-terminal-bg border-b border-terminal-border" id="skills">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Left Side - Skills */}
            <div>
              <div className="mb-6 reveal-fade">
                <span className="text-terminal-gray font-label-md text-label-md tracking-widest uppercase">// SKILLS</span>
                <h2 className="text-headline-md font-headline-md text-terminal-fg">&gt; Technical Stack</h2>
              </div>
              <div className="space-y-4">
                
                {/* Frontend */}
                <div className="reveal-scale delay-100 border border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
                  <div className="p-4">
                    <h3 className="text-base font-bold text-terminal-fg mb-3 flex items-center gap-2">
                      <MdOutlineBrowserUpdated className="text-lg" /> [Frontend]
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 border border-terminal-border">React</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">Vue.js</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">Tailwind</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">TypeScript</span>
                      {showAllFrontend && (
                        <>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Flutter</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Bootstrap</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">CSS</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Sass</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">JavaScript</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">HTML</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAllFrontend(!showAllFrontend)}
                    className="w-full py-2 border-t border-terminal-border text-terminal-gray hover:bg-terminal-fg hover:text-terminal-bg transition-all duration-300 text-xs"
                  >
                    {showAllFrontend ? '[-] View Less' : '[+] View More'}
                  </button>
                </div>

                {/* Backend */}
                <div className="reveal-scale delay-200 border border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
                  <div className="p-4">
                    <h3 className="text-base font-bold text-terminal-fg mb-3 flex items-center gap-2">
                      <MdStorage className="text-lg" /> [Backend]
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 border border-terminal-border">Laravel</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">Node.js</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">Firebase</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">MySQL</span>
                      {showAllBackend && (
                        <>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Supabase</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">PHP</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Express.js</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAllBackend(!showAllBackend)}
                    className="w-full py-2 border-t border-terminal-border text-terminal-gray hover:bg-terminal-fg hover:text-terminal-bg transition-all duration-300 text-xs"
                  >
                    {showAllBackend ? '[-] View Less' : '[+] View More'}
                  </button>
                </div>

                {/* DevOps & AI */}
                <div className="reveal-scale delay-300 border border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
                  <div className="p-4">
                    <h3 className="text-base font-bold text-terminal-fg mb-3 flex items-center gap-2">
                      <MdCloud className="text-lg" /> [DevOps & AI]
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 border border-terminal-border">Vercel</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">AWS</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">Git</span>
                      <span className="text-xs px-2 py-1 border border-terminal-border">Claude</span>
                      {showAllDevOps && (
                        <>
                          <span className="text-xs px-2 py-1 border border-terminal-border">GitHub Copilot</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Google Cloud</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">CI/CD</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Hostinger</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Groq</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Codex</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Cline</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Kiro</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Android Studio</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Figma</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Notion</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">XAMPP</span>
                          <span className="text-xs px-2 py-1 border border-terminal-border">Adobe XD</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAllDevOps(!showAllDevOps)}
                    className="w-full py-2 border-t border-terminal-border text-terminal-gray hover:bg-terminal-fg hover:text-terminal-bg transition-all duration-300 text-xs"
                  >
                    {showAllDevOps ? '[-] View Less' : '[+] View More'}
                  </button>
                </div>

              </div>

              {/* Certifications */}
              <div className="mt-6 reveal-fade delay-400">
                <h3 className="text-base font-bold text-terminal-fg mb-3 flex items-center gap-2">
                  <MdOutlineBrowserUpdated className="text-lg" /> [Certifications]
                </h3>
                <div className="space-y-2">
                  <div className="p-3 border border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
                    <h4 className="text-sm font-bold text-terminal-fg mb-1">$ Internship - 486hrs</h4>
                    <p className="text-xs text-terminal-gray">Full Stack & IT Support at General Emilio Aguinaldo Memorial Hospital</p>
                  </div>
                  
                  {/* IBM Badges */}
                  <div className="p-3 border border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
                    <h4 className="text-sm font-bold text-terminal-fg mb-3">$ IBM AI Certifications</h4>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {/* Credly Verification Badge */}
                      <div className="flex-shrink-0">
                        <div 
                          data-iframe-width="150" 
                          data-iframe-height="270" 
                          data-share-badge-id="82e8f4a4-6ae5-4bea-8b5e-212cf6ec6563" 
                          data-share-badge-host="https://www.credly.com"
                        ></div>
                      </div>
                      
                      {/* Certifications List */}
                      <div className="flex-1">
                        <ul className="text-xs text-terminal-gray space-y-1 ml-4">
                          <li>&gt; AI Fundamentals: Foundations for Understanding AI</li>
                          <li>&gt; AI Forms and Functions</li>
                          <li>&gt; Introduction to Artificial Intelligence</li>
                          <li>&gt; Machine Learning</li>
                          <li>&gt; Neural Networks and Deep Learning</li>
                          <li>&gt; The Intelligence Behind AI</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
                    <h4 className="text-sm font-bold text-terminal-fg mb-1">$ AWS Certifications</h4>
                    <ul className="text-xs text-terminal-gray space-y-1 ml-4">
                      <li>&gt; Advanced SQL and Database Design</li>
                      <li>&gt; Generative AI</li>
                      <li>&gt; Serverless Mindset</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - About & Timeline */}
            <div className="reveal-right" id="about">
              <div className="mb-6">
                <span className="text-terminal-gray font-label-md text-label-md tracking-widest uppercase">// BACKGROUND</span>
                <h2 className="text-headline-md font-headline-md text-terminal-fg">&gt; Journey</h2>
              </div>
              <div className="space-y-6 mb-8">
                <div className="relative pl-6 border-l border-terminal-border">
                  <div className="absolute -left-1 top-0 w-2 h-2 bg-terminal-fg"></div>
                  <span className="text-xs text-terminal-fg mb-1 block">[2026]</span>
                  <h4 className="text-base font-bold text-terminal-fg mb-1">$ Intern Full Stack Developer</h4>
                  <p className="text-terminal-gray text-sm">// Building Medical Related projects for General Emilio Aguinaldo
                    Memorial Hospital.</p>
                </div>
                <div className="relative pl-6 border-l border-terminal-border">
                  <div className="absolute -left-1 top-0 w-2 h-2 bg-terminal-fg"></div>
                  <span className="text-xs text-terminal-fg mb-1 block">[2025 - 2026]</span>
                  <h4 className="text-base font-bold text-terminal-fg mb-1">$ Full Stack Developer</h4>
                  <p className="text-terminal-gray text-sm">// Building VCM HRIS Capstone project.</p>
                </div>
                <div className="relative pl-6 border-l border-terminal-border">
                  <div className="absolute -left-1 top-0 w-2 h-2 bg-terminal-fg"></div>
                  <span className="text-xs text-terminal-fg mb-1 block">[2025 - Present]</span>
                  <h4 className="text-base font-bold text-terminal-fg mb-1">$ Freelance Developer</h4>
                  <p className="text-terminal-gray text-sm">// Custom systems for SMEs and institutions.</p>
                </div>
                <div className="relative pl-6 border-l border-terminal-border">
                  <div className="absolute -left-1 top-0 w-2 h-2 bg-terminal-fg"></div>
                  <span className="text-xs text-terminal-gray mb-1 block">[Education]</span>
                  <h4 className="text-base font-bold text-terminal-fg mb-1">$ BS Information Technology Graduate</h4>
                  <p className="text-terminal-gray text-sm">// Web architectures & database systems.</p>
                </div>
              </div>
              
              {/* Profile Image - Compact */}
              <div className="relative border border-terminal-border overflow-hidden bg-terminal-bg p-2">
                <GallerySlider />
                <div className="mt-3 px-2">
                  <div className="mt-3 flex gap-3 justify-center">
                    <a className="text-terminal-gray hover:text-terminal-fg transition-colors" href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer" title="GitHub">
                      <FaGithub className="text-lg" />
                    </a>
                    <a className="text-terminal-gray hover:text-terminal-fg transition-colors" href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <FaLinkedin className="text-lg" />
                    </a>
                    <a className="text-terminal-gray hover:text-terminal-fg transition-colors" href="https://appbuildersph.com/apps/pacementor" target="_blank" rel="noopener noreferrer" title="App Builders PH">
                      <FaRocket className="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GITHUB ACTIVITY SECTION - Compact */}
      <section className="py-8 md:py-12 bg-terminal-bg border-b border-terminal-border" id="github">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col gap-2 mb-6 reveal-fade">
            <span className="text-terminal-gray font-label-md text-label-md tracking-widest uppercase">// OPEN SOURCE</span>
            <h2 className="text-headline-md md:text-headline-md font-headline-md text-terminal-fg">&gt; GitHub Activity</h2>
          </div>
          
          <GitHubStats username="hiroqt" />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-8 md:py-12 bg-terminal-bg relative border-b border-terminal-border" id="contact">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="reveal-scale max-w-3xl mx-auto border border-terminal-border bg-terminal-bg p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-headline-md font-headline-md text-terminal-fg mb-4">&gt; Start a Project</h2>
              <p className="text-terminal-gray">// Interested in collaborating or have a system in mind? Let&apos;s talk.</p>
            </div>
            <form action="#" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-label-md text-terminal-gray ml-1">[Name]</label>
                  <input className="w-full bg-terminal-bg border border-terminal-border px-3 py-2 focus:border-terminal-fg outline-none text-terminal-fg transition-all text-sm" type="text"/>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-label-md text-terminal-gray ml-1">[Email]</label>
                  <input className="w-full bg-terminal-bg border border-terminal-border px-3 py-2 focus:border-terminal-fg outline-none text-terminal-fg transition-all text-sm" type="email"/>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-label-md text-terminal-gray ml-1">[Message]</label>
                <textarea className="w-full bg-terminal-bg border border-terminal-border px-3 py-2 focus:border-terminal-fg outline-none text-terminal-fg transition-all text-sm" placeholder="$ How can I help your operations?" rows={4}></textarea>
              </div>
              <button className="w-full py-3 bg-terminal-fg text-terminal-bg font-bold hover:bg-terminal-gray transition-all duration-300 text-sm" type="submit">
                [Send Message]
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-8 md:py-12 bg-terminal-bg border-t border-terminal-border">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-terminal-fg">$ Nel</span>
            <p className="text-xs text-terminal-gray text-center md:text-left">// © 2025 Arnel A. Baylon. Built with precision.</p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            <a className="flex items-center gap-2 text-xs text-terminal-gray hover:text-[#0A66C2] transition-colors" href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> [LinkedIn]
            </a>
            <a className="flex items-center gap-2 text-xs text-terminal-gray hover:text-[#333] transition-colors" href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer">
              <FaGithub /> [GitHub]
            </a>
            <a className="flex items-center gap-2 text-xs text-terminal-gray hover:text-[#EA4335] transition-colors" href="mailto:arnelbaylon15@gmail.com">
              <FaEnvelope /> [Email]
            </a>
            <a className="flex items-center gap-2 text-xs text-terminal-gray hover:text-[#1877F2] transition-colors" href="https://www.facebook.com/arnel.baylon.165" target="_blank" rel="noopener noreferrer">
              <FaFacebook /> [Facebook]
            </a>
            <a className="flex items-center gap-2 text-xs text-terminal-gray hover:text-[#10B981] transition-colors" href="https://www.appbuildersph.com/makers/hiroqt_" target="_blank" rel="noopener noreferrer">
              <FaRocket /> [App Builders PH]
            </a>
            <a className="flex items-center gap-2 text-xs text-terminal-gray hover:text-[#E4405F] transition-colors" href="https://www.instagram.com/yheellll?igsh=MWYxMDZlMzYzNXA2dw" target="_blank" rel="noopener noreferrer">
              <FaInstagram /> [Instagram]
            </a>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
