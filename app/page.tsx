'use client'

import { useEffect, useRef, useState } from 'react'
import { DotGrid } from '@/components/DotGrid'
import { TerminalIntro } from '@/components/TerminalIntro'
import { TypingText } from '@/components/TypingText'
import { GitHubStats } from '@/components/GitHubStats'
import { FaReact, FaVuejs, FaSass, FaNodeJs, FaLaravel, FaGitAlt, FaGithub, FaLinkedin, FaBootstrap, FaCss3Alt, FaPhp, FaAws, FaFigma, FaAndroid, FaHtml5, FaJs } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiGithubactions, SiTypescript, SiDart, SiSupabase, SiFirebase, SiExpress, SiVercel, SiGooglecloud, SiNotion, SiClaude, SiOpenai } from 'react-icons/si';
import { MdOutlineBrowserUpdated, MdStorage, MdSettingsSuggest, MdArrowDownward, MdDownload, MdOutlineMedicalServices, MdCloud, MdSmartToy } from 'react-icons/md';
import { TbBrandVscode } from 'react-icons/tb';

export default function Home() {
  const blobRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  const handleLine1Complete = () => {
    setShowLine2(true);
  };

  const handleLine2Complete = () => {
    setTimeout(() => {
      setShowSubtitle(true);
    }, 300);
  };

  useEffect(() => {
    // Only run animations if content is shown
    if (!showContent) return;

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
  }, [showContent, showSubtitle]);

  return (
    <>
      {/* Terminal Intro Animation */}
      {showIntro && <TerminalIntro onComplete={handleIntroComplete} />}

      {/* Main Content - Hidden until intro completes */}
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-20 border-b border-terminal-border bg-terminal-bg">
        <DotGrid />

        <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-gutter flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-[56px] leading-tight md:text-[96px] md:leading-tight font-bold text-terminal-fg mb-8 tracking-tight terminal-text-container w-full min-h-[120px] md:min-h-[200px]">
            <div className="mb-4">
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
                <TypingText 
                  text="through full-stack architectures"
                  delay={0}
                  speed={60}
                  onComplete={handleLine2Complete}
                />
              </div>
            )}
          </h1>
          {showSubtitle && (
            <p className="text-xl md:text-2xl font-normal text-terminal-gray max-w-3xl mb-12 leading-relaxed animate-fade-in">
              // Building high-performance systems for staff and administrators.
            </p>
          )}
          {showSubtitle && (
            <div className="flex flex-col sm:flex-row gap-4 reveal opacity-0">
            <a className="px-8 py-4 bg-terminal-fg text-terminal-bg font-bold border border-terminal-fg hover:bg-terminal-bg hover:text-terminal-fg transition-all duration-300 flex items-center justify-center gap-2" href="#work">
              [View Work] <MdArrowDownward className="text-xl" />
            </a>
            <a className="px-8 py-4 border border-terminal-fg text-terminal-fg font-bold hover:bg-terminal-fg hover:text-terminal-bg transition-all duration-300 flex items-center justify-center gap-2" href="/pdf/Arnel_Baylon_Resume.pdf" target="_blank" rel="noopener noreferrer">
              [Download Resume] <MdDownload className="text-xl" />
            </a>
          </div>
          )}
        </div>
      </section>

      {/* WORK SECTION */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-terminal-bg relative z-10 border-b border-terminal-border" id="work">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col gap-4 mb-16 reveal-fade">
            <span className="text-terminal-gray font-label-md text-label-md tracking-widest uppercase">// PORTFOLIO</span>
            <h2 className="text-headline-md md:text-headline-md font-headline-md text-terminal-fg">&gt; Systems &amp; Solutions</h2>
          </div>
          
          {/* Bento Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* PaceMentor */}
            <div className="project-card reveal-scale md:col-span-12 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video md:aspect-[21/9] w-full relative parallax-container bg-terminal-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700 grayscale" alt="PaceMentor - Outrun your potential hero" src="https://pacementor.vercel.app/_next/image?url=%2Flight_mockup_dashboard.png&w=1920&q=75"/>
              </div>
              <div className="p-6 md:p-8 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg md:bg-terminal-bg/90 border-t border-terminal-border">
                <h3 className="text-headline-sm md:text-headline-md font-headline-sm md:font-headline-md text-terminal-fg mb-2">$ PaceMentor - AI Running Coach</h3>
                <p className="text-terminal-gray text-sm md:text-base max-w-xl mb-4">// A premium run club aesthetic training app featuring AI Coaching and dynamic, socially shareable workout graphics.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-3 py-1">[Live]</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Flutter</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Next.js</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">AI</span>
                </div>
              </div>
            </div>

            {/* HRIS Project */}
            <div className="project-card reveal-left delay-100 md:col-span-8 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video w-full relative parallax-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700 grayscale" alt="HRIS Dashboard interface" src="/images/vcm_desktop.png"/>
              </div>
              <div className="p-6 md:p-8 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg/90 border-t border-terminal-border">
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-terminal-bg border border-terminal-fg text-terminal-fg text-xs font-bold">[Capstone]</span>
                  <span className="px-3 py-1 bg-terminal-bg border border-terminal-border text-terminal-gray text-xs font-bold">[PRODUCTION]</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-2">$ Victorious Christian Montessori HRIS</h3>
                <p className="text-terminal-gray text-sm md:text-base max-w-xl mb-4">// Streamlining employee records, attendance, and payroll processing.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Laravel</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">MySQL</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Bootstrap</span>
                </div>
              </div>
            </div>
            
            {/* EMR System */}
            <div className="reveal-right delay-200 md:col-span-4 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 border-2 border-terminal-fg flex items-center justify-center mb-6 text-terminal-fg">
                    <MdOutlineMedicalServices className="text-2xl" />
                  </div>
                  <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-2">$ Electronic Medical Records</h3>
                  <p className="text-terminal-gray text-sm mb-6">// Patient data management with encrypted history and medical tracking.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">React</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Node.js</span>
                </div>
              </div>
            </div>

            {/* TMRC Project */}
            <div className="project-card reveal-left delay-300 md:col-span-4 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video md:aspect-square w-full relative parallax-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700 grayscale" alt="TMRC Run Club Community" src="https://tmrc.vercel.app/bg.jpg"/>
              </div>
              <div className="p-6 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg/90 border-t border-terminal-border">
                <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-2">$ Trece Martires Run Club</h3>
                <p className="text-terminal-gray text-sm mb-4">// Community-driven running club platform with social feeds and event management.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-3 py-1">[Live]</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Next.js</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">React</span>
                </div>
              </div>
            </div>
            
            {/* HiveSyncVA */}
            <div className="project-card reveal-right delay-400 md:col-span-8 group relative overflow-hidden border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-500">
              <div className="aspect-video w-full relative parallax-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="parallax-img object-cover w-full h-full opacity-30 scale-110 transition-opacity duration-700 grayscale" alt="HiveSyncVA interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzI0YDY0ETpBDTy-9ai3FKoCz4q9ATBkjhSln5uX9FmtQ1bMwXUM53kRU3ZLo2KKn5cjyTf6FXPosytyA_aIHkLQ3J4hmZ-n9qs_BK4-OUiKOF1YUV5Iy3-fMkBZVDTEcOkL4zG-n1340pud3eJChE9vvcE2hNBEWKJd4b4PsqlvuyU0yFl80jirC9p-NDhjGDMZfXak3NhUpN3OUCpvetBmPObBtDq2Nei3WTTVTBUWmMgnPBx7sY32A3B_1WxXRmHmCgFvDTD3YP"/>
              </div>
              <div className="p-6 md:p-8 md:absolute md:bottom-0 md:left-0 md:right-0 pointer-events-none bg-terminal-bg/90 border-t border-terminal-border">
                <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-2">$ HiveSyncVA</h3>
                <p className="text-terminal-gray text-sm md:text-base max-w-xl mb-4">// A unified dashboard for virtual assistants to manage cross-platform workflows.</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-code-inline text-terminal-fg bg-terminal-bg border border-terminal-fg px-3 py-1">[Active]</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Next.js</span>
                  <span className="text-xs font-code-inline text-terminal-gray bg-terminal-bg border border-terminal-border px-2 py-1">Firebase</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-terminal-bg border-b border-terminal-border" id="skills">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16 reveal-fade">
            <h2 className="text-headline-md font-headline-md text-terminal-fg mb-4">&gt; Technical Proficiency</h2>
            <p className="text-terminal-gray font-body-md">// Engineered with modern tools and performance-driven frameworks.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Frontend */}
            <div className="reveal-scale delay-100 p-8 border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
              <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-6 flex items-center gap-2">
                <MdOutlineBrowserUpdated className="text-2xl" /> [Frontend]
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaReact className="text-lg" /> React
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaVuejs className="text-lg" /> Vue.js
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiTailwindcss className="text-lg" /> Tailwind
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaBootstrap className="text-lg" /> Bootstrap
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaCss3Alt className="text-lg" /> CSS
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaSass className="text-lg" /> Sass
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiTypescript className="text-lg" /> TypeScript
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaJs className="text-lg" /> JavaScript
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiDart className="text-lg" /> Dart
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaHtml5 className="text-lg" /> HTML
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaLaravel className="text-lg" /> Blade
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="reveal-scale delay-200 p-8 border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
              <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-6 flex items-center gap-2">
                <MdStorage className="text-2xl" /> [Backend]
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaPhp className="text-lg" /> PHP
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaNodeJs className="text-lg" /> Node.js
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaLaravel className="text-lg" /> Laravel
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiExpress className="text-lg" /> Express.js
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiSupabase className="text-lg" /> Supabase
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiFirebase className="text-lg" /> Firebase
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiMysql className="text-lg" /> MySQL
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="reveal-scale delay-300 p-8 border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
              <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-6 flex items-center gap-2">
                <MdSettingsSuggest className="text-2xl" /> [Infrastructure]
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaAndroid className="text-lg" /> Android Studio
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaFigma className="text-lg" /> Figma
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiNotion className="text-lg" /> Notion
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <MdStorage className="text-lg" /> XAMPP
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaAws className="text-lg" /> AWS
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <MdSettingsSuggest className="text-lg" /> Adobe XD
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaGitAlt className="text-lg" /> RESTful API
                </div>
              </div>
            </div>

            {/* DevOps */}
            <div className="reveal-scale delay-400 p-8 border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300">
              <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-6 flex items-center gap-2">
                <MdCloud className="text-2xl" /> [DevOps]
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiVercel className="text-lg" /> Vercel
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <MdCloud className="text-lg" /> Hostinger
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiGooglecloud className="text-lg" /> Google Cloud
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiGithubactions className="text-lg" /> CI/CD
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaGitAlt className="text-lg" /> Git
                </div>
              </div>
            </div>

            {/* AI & Developer Tools */}
            <div className="reveal-scale delay-500 p-8 border-2 border-terminal-border bg-terminal-bg hover:border-terminal-fg transition-all duration-300 md:col-span-2 lg:col-span-1">
              <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-6 flex items-center gap-2">
                <MdSmartToy className="text-2xl" /> [AI & Dev Tools]
              </h3>
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <MdSmartToy className="text-lg" /> Groq
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiOpenai className="text-lg" /> Codex
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <SiClaude className="text-lg" /> Claude
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <FaGithub className="text-lg" /> GitHub Copilot
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <TbBrandVscode className="text-lg" /> Cline
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <MdSmartToy className="text-lg" /> AntiGravity
                </div>
                <div className="group flex items-center gap-2 bg-terminal-bg border border-terminal-border px-4 py-2 hover:bg-terminal-fg hover:text-terminal-bg transition-colors cursor-default">
                  <MdSmartToy className="text-lg" /> Kiro
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GITHUB ACTIVITY SECTION */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-terminal-bg border-b border-terminal-border" id="github">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col gap-4 mb-16 reveal-fade">
            <span className="text-terminal-gray font-label-md text-label-md tracking-widest uppercase">// OPEN SOURCE</span>
            <h2 className="text-headline-md md:text-headline-md font-headline-md text-terminal-fg">&gt; GitHub Activity</h2>
            <p className="text-terminal-gray font-body-md">// Real-time contribution data and repository insights.</p>
          </div>
          
          <GitHubStats username="hiroqt" />
        </div>
      </section>

      {/* ABOUT / TIMELINE */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop border-b border-terminal-border" id="about">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid md:grid-cols-2 gap-16 items-start">
          <div className="reveal-left">
            <h2 className="text-headline-md font-headline-md text-terminal-fg mb-8">&gt; Professional Journey</h2>
            <div className="space-y-12">
              <div className="relative pl-8 border-l border-terminal-border reveal-left delay-100">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-terminal-fg"></div>
                <span className="text-label-md font-label-md text-terminal-fg mb-2 block">[2025 - 2026]</span>
                <h4 className="text-headline-sm font-headline-sm text-terminal-fg mb-2">$ Full Stack Developer</h4>
                <p className="text-terminal-gray font-body-md">// Architecting and building the Victorious Christian Montessori HRIS Capstone project.</p>
              </div>
              <div className="relative pl-8 border-l border-terminal-border reveal-left delay-200">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-terminal-fg"></div>
                <span className="text-label-md font-label-md text-terminal-fg mb-2 block">[2021 - Present]</span>
                <h4 className="text-headline-sm font-headline-sm text-terminal-fg mb-2">$ Freelance Full-Stack Developer</h4>
                <p className="text-terminal-gray font-body-md">// Designing and deploying bespoke systems for SMEs, including medical centers and educational institutions.</p>
              </div>
              <div className="relative pl-8 border-l border-terminal-border reveal-left delay-300">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-terminal-fg"></div>
                <span className="text-label-md font-label-md text-terminal-gray mb-2 block">[Education]</span>
                <h4 className="text-headline-sm font-headline-sm text-terminal-fg mb-2">$ Bachelor of Science in Information Technology</h4>
                <p className="text-terminal-gray font-body-md">// Focused on advanced web architectures and database management systems.</p>
              </div>
            </div>
          </div>
          <div className="reveal-right relative group">
            <div className="relative border-2 border-terminal-border overflow-hidden bg-terminal-bg p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-auto grayscale" alt="Developer profile portrait" src="/images/me.jpg"/>
              <div className="mt-8 px-4 pb-4">
                <p className="text-body-lg font-body-lg text-terminal-fg leading-relaxed">
                  &gt; &quot;Precision in code, clarity in design. My goal is to transform complex operational challenges into seamless digital experiences.&quot;
                </p>
                <div className="mt-6 flex gap-4">
                  <a className="text-terminal-gray hover:text-terminal-fg transition-colors" href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-2xl" />
                  </a>
                  <a className="text-terminal-gray hover:text-terminal-fg transition-colors" href="https://www.linkedin.com/in/arnel-baylon-b0523318" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop bg-terminal-bg relative border-b border-terminal-border" id="contact">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="reveal-scale max-w-3xl mx-auto border-2 border-terminal-border bg-terminal-bg p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-headline-md font-headline-md text-terminal-fg mb-4">&gt; Start a Project</h2>
              <p className="text-terminal-gray">// Interested in collaborating or have a system in mind? Let&apos;s talk.</p>
            </div>
            <form action="#" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-label-md font-label-md text-terminal-gray ml-1">[Name]</label>
                  <input className="w-full bg-terminal-bg border border-terminal-border px-4 py-3 focus:border-terminal-fg outline-none text-terminal-fg transition-all" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-label-md font-label-md text-terminal-gray ml-1">[Email]</label>
                  <input className="w-full bg-terminal-bg border border-terminal-border px-4 py-3 focus:border-terminal-fg outline-none text-terminal-fg transition-all" type="email"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-label-md font-label-md text-terminal-gray ml-1">[Message]</label>
                <textarea className="w-full bg-terminal-bg border border-terminal-border px-4 py-3 focus:border-terminal-fg outline-none text-terminal-fg transition-all" placeholder="$ How can I help your operations?" rows={5}></textarea>
              </div>
              <button className="w-full py-4 bg-terminal-fg text-terminal-bg font-bold hover:bg-terminal-gray transition-all duration-300" type="submit">
                [Send Message]
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-section-gap-mobile md:py-16 bg-terminal-bg border-t border-terminal-border">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-headline-sm font-headline-sm font-bold text-terminal-fg">$ Nel</span>
            <p className="text-label-md font-label-md text-terminal-gray text-center md:text-left">// © 2025 Arnel A. Baylon. Built with precision.</p>
          </div>
          <div className="flex gap-8">
            <a className="flex items-center gap-2 text-label-md font-label-md text-terminal-gray hover:text-terminal-fg transition-colors" href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer">
              <FaGithub /> [GitHub]
            </a>
            <a className="flex items-center gap-2 text-label-md font-label-md text-terminal-gray hover:text-terminal-fg transition-colors" href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> [LinkedIn]
            </a>
            <a className="flex items-center gap-2 text-label-md font-label-md text-terminal-gray hover:text-terminal-fg transition-colors" href="mailto:arnelbaylon15@gmail.com">
              [Email]
            </a>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
