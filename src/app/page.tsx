'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Home() {
  const roles = [
    "Registered Nurse",
    "Software Engineer",
    "Clinical Informaticist",
    "Author & Creator"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [activePhoto, setActivePhoto] = useState<'kairogram' | 'portfolio'>('kairogram');
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'clinical' | 'writing'>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 350);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <>
      {/* =========================================================================
          1. HERO SECTION (JACK MKIMBO ARCHITECTURE WITH DUAL PHOTO SHOWCASE)
         ========================================================================= */}
      <section id="home" className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden" aria-label="Hero section">
        
        {/* Subtle Grid & Radial Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-violet-600/[0.08] blur-[140px]"></div>
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/[0.06] blur-[120px]"></div>
          <div className="absolute inset-0 bg-grid-texture opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-16 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[75vh]">
            
            {/* Left Content Column */}
            <div className="flex flex-col order-2 lg:order-1 space-y-6">
              
              {/* Availability Status Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs sm:text-sm text-zinc-300 font-medium">Available for Clinical Informatics &amp; SWE</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                </svg>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08]">
                Bridging <span className="text-gradient">Clinical Care</span><br />
                &amp; Scalable Systems.
              </h1>

              {/* Dynamic Typewriter Role */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-violet-500"></div>
                <p className="text-lg md:text-xl text-zinc-300 font-mono flex items-center">
                  <span className={`inline-block transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    {roles[currentRoleIndex]}
                  </span>
                  <span className="inline-block w-0.5 h-5 bg-violet-400 ml-1.5 align-middle animate-[blink_1s_step-end_infinite]"></span>
                </p>
              </div>

              {/* Core Intro Description */}
              <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl">
                I&apos;m <strong className="text-white font-semibold">Benedict Adurosakin</strong>, a <strong className="text-white font-semibold">Registered Nurse</strong>, <strong className="text-white font-semibold">Software Engineer</strong>, and <strong className="text-white font-semibold">Clinical Informaticist</strong>. I build resilient health-tech solutions, automated clinical workflows, and biostatistical pipelines designed to withstand the high-friction realities of the ward.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#portfolio" className="btn-primary">
                  <span>View My Work</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14"></path>
                    <path d="m19 12-7 7-7-7"></path>
                  </svg>
                </a>
                <Link href="/nursing" className="btn-outline">
                  <span>Clinical Experience</span>
                  <span className="text-violet-400">&rarr;</span>
                </Link>
              </div>

              {/* Social Links & Location Badge */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08]">
                <a
                  href="https://github.com/Benedictspr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition duration-200"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github text-lg"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/benedict-adurosakin-736774398"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition duration-200"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin text-lg"></i>
                </a>
                <a
                  href="mailto:benedictadurosakin@gmail.com"
                  className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition duration-200"
                  aria-label="Email"
                >
                  <i className="fa-regular fa-envelope text-lg"></i>
                </a>
                <div className="w-px h-5 bg-white/15"></div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <i className="fa-solid fa-location-dot text-violet-400"></i>
                  <span>Lagos, Nigeria &bull; Worldwide</span>
                </div>
              </div>
            </div>

            {/* Right Column: Jack Mkimbo Floating Circular Avatar Orbit */}
            <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px]">
                
                {/* Pulsing Violet Ambient Backlight */}
                <div className="absolute inset-0 rounded-full bg-violet-600/25 blur-3xl animate-[glowPulse_3s_ease-in-out_infinite]"></div>
                
                {/* Rotating Dashed Outer Orbit Ring */}
                <div className="absolute -inset-6 rounded-full border border-dashed border-violet-500/25 animate-[spinSlow_20s_linear_infinite]" aria-hidden="true"></div>
                
                {/* Concentric Inner Ring */}
                <div className="absolute -inset-3 rounded-full border border-violet-500/15" aria-hidden="true"></div>

                {/* Main Avatar Container with Glow & Float Animation */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-violet-500/30 shadow-2xl animate-[float_6s_ease-in-out_infinite] glow-violet bg-[#0a0a0f]">
                  <img
                    src={activePhoto === 'kairogram' ? '/benedict.png' : '/image2.jpeg'}
                    alt="Benedict Adurosakin"
                    className="w-full h-full object-cover object-top transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Floating Glass Stat Badge: Bottom-Left */}
                <div className="absolute -bottom-4 -left-4 md:-left-8 glass rounded-2xl px-4 py-3 shadow-2xl border border-white/10 flex flex-col">
                  <div className="text-2xl font-display font-bold text-white leading-none">3+</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">Years Clinical ICU &amp; Ward</div>
                </div>

                {/* Floating Glass Stat Badge: Top-Right */}
                <div className="absolute -top-4 -right-4 md:-right-8 glass rounded-2xl px-4 py-3 shadow-2xl border border-white/10 flex flex-col">
                  <div className="text-2xl font-display font-bold text-violet-400 leading-none">10+</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">Systems &amp; Papers</div>
                </div>

                {/* Dual-Photo Toggle Controller */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 rounded-full bg-[#111118] border border-white/15 shadow-xl">
                  <button
                    onClick={() => setActivePhoto('kairogram')}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono transition cursor-pointer ${
                      activePhoto === 'kairogram'
                        ? 'bg-violet-600 text-white font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Kairogram Portrait
                  </button>
                  <button
                    onClick={() => setActivePhoto('portfolio')}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono transition cursor-pointer ${
                      activePhoto === 'portfolio'
                        ? 'bg-violet-600 text-white font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Portfolio Portrait
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            2. JACK MKIMBO HORIZONTAL DIVIDER STATS STRIP
           ========================================================================= */}
        <div className="w-full border-t border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.08]">
              <div className="flex flex-col items-center justify-center py-6 px-4 gap-1">
                <span className="text-2xl md:text-3xl font-display font-bold text-white">3+</span>
                <span className="text-xs text-zinc-400 font-mono text-center">Years Clinical Practice</span>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 gap-1">
                <span className="text-2xl md:text-3xl font-display font-bold text-white">10+</span>
                <span className="text-xs text-zinc-400 font-mono text-center">Projects &amp; Systems</span>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 gap-1">
                <span className="text-2xl md:text-3xl font-display font-bold text-violet-400">7</span>
                <span className="text-xs text-zinc-400 font-mono text-center">Research Papers Co-Authored</span>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 gap-1">
                <span className="text-2xl md:text-3xl font-display font-bold text-white">&infin;</span>
                <span className="text-xs text-zinc-400 font-mono text-center">Bedside &amp; Code Precision</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ABOUT SECTION (FEATURING SECOND PHOTO & JACK MKIMBO CARD ARCHITECTURE)
         ========================================================================= */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Photo Column: Aspect [4/5] Portrait Frame */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl group">
                  <img
                    src="/image2.jpeg"
                    alt="Benedict Adurosakin Portrait"
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent"></div>
                </div>

                {/* Offset Decorative Orbit Frame */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-violet-500/25 -z-10" aria-hidden="true"></div>

                {/* Location Glass Badge */}
                <div className="absolute top-6 -right-4 md:-right-8 glass rounded-2xl px-4 py-3 shadow-xl border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <i className="fa-solid fa-location-dot text-violet-400 text-xs"></i>
                  <span className="text-xs font-mono font-medium text-white whitespace-nowrap">Lagos, Nigeria</span>
                </div>

                {/* Status Glass Badge */}
                <div className="absolute -bottom-4 -left-4 md:-left-8 glass rounded-2xl px-5 py-3.5 shadow-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono text-zinc-400">Open to</div>
                  <div className="text-xs font-semibold text-white">Clinical Informatics &amp; SWE</div>
                  <div className="flex gap-1 pt-1">
                    <div className="w-5 h-1 rounded-full bg-violet-500"></div>
                    <div className="w-5 h-1 rounded-full bg-violet-500"></div>
                    <div className="w-5 h-1 rounded-full bg-violet-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story Column */}
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              
              {/* Section Header */}
              <div className="flex items-center gap-3">
                <span className="text-violet-400 font-mono text-sm font-semibold">01</span>
                <div className="w-8 h-px bg-violet-500/50"></div>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">About Me</span>
              </div>

              <h2 id="about-heading" className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                Crafting healthcare solutions <em className="not-italic text-gradient">that endure</em>.
              </h2>

              <div className="space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base font-light">
                <p>
                  I am a licensed <strong className="text-white font-medium">Registered Nurse</strong>, <strong className="text-white font-medium">Software Engineer</strong>, and <strong className="text-white font-medium">Clinical Informaticist</strong> based in Lagos, Nigeria. I bridge the gap between high-stress clinical bedside reality and technical software engineering.
                </p>
                <p>
                  Beyond patient care in intensive care units and surgical wards, I engineer software systems such as <strong className="text-white font-medium">Kairos</strong> (an offline-first biblical presentation engine with dynamic canvas rendering) and automated intake triage pipelines with n8n and Python.
                </p>
              </div>

              {/* Jack Mkimbo Signature Blockquote */}
              <blockquote className="relative pl-6 border-l-2 border-violet-500/60 my-2">
                <p className="text-white text-base md:text-lg font-medium leading-relaxed italic">
                  &ldquo;I don&apos;t just build features &mdash; I understand patient vitals, clinical documentation friction, and emergency ward pressures. I architect systems that survive the real-world friction of healthcare.&rdquo;
                </p>
              </blockquote>

              {/* 3 Capability Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-violet-500/40 transition-all duration-300">
                  <div className="p-2 w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-code text-sm"></i>
                  </div>
                  <div className="text-sm font-semibold text-white mb-0.5">Software Engineer</div>
                  <div className="text-xs text-zinc-400 font-mono">Next.js, React, Python, TypeScript</div>
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-violet-500/40 transition-all duration-300">
                  <div className="p-2 w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-user-nurse text-sm"></i>
                  </div>
                  <div className="text-sm font-semibold text-white mb-0.5">Clinical Informaticist</div>
                  <div className="text-xs text-zinc-400 font-mono">ICU Care, FHIR, Triage AI, EHR</div>
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-violet-500/40 transition-all duration-300">
                  <div className="p-2 w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-book-open text-sm"></i>
                  </div>
                  <div className="text-sm font-semibold text-white mb-0.5">Author &amp; Creator</div>
                  <div className="text-xs text-zinc-400 font-mono">The XVII-th &bull; Hustle Truth</div>
                </div>
              </div>

              {/* Education Subtag */}
              <div className="flex items-center gap-3 pt-2 text-xs font-mono text-zinc-400">
                <span>BNSc (in view) &bull; Ahmadu Bello University</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                <span>RN License UITH</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SERVICES SECTION (JACK MKIMBO 3-CARD NUMBERED SERVICES)
         ========================================================================= */}
      <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-white/[0.01] border-t border-b border-white/[0.08]" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-violet-400 font-mono text-sm font-semibold">02</span>
                <div className="w-8 h-px bg-violet-500/50"></div>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">What I Do</span>
              </div>
              <h2 id="services-heading" className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Services &amp; <span className="text-gradient">Expertise</span>
              </h2>
            </div>
            <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
              From clinical bedside workflows to high-scale cloud software, I bring systems to life with precision engineering and domain empathy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" role="list">
            
            {/* SERVICE 01 */}
            <div role="listitem" className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-[#12121a]/70 p-8 transition-all duration-400 card-hover overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-5xl font-bold leading-none text-white/10 group-hover:text-violet-500/30 transition-colors">01</span>
                <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400">
                  <i className="fa-solid fa-laptop-code text-xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Full-Stack Engineering</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1 font-light">
                End-to-end web and software engineering &mdash; from database schema to responsive, reactive client interfaces. Architecting production systems built for long-term scalability.
              </p>
              <ul className="space-y-2 mb-8 text-xs font-mono text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">&rsaquo;</span>
                  <span>Next.js &amp; React Applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">&rsaquo;</span>
                  <span>TypeScript &amp; Python Backend Services</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">&rsaquo;</span>
                  <span>PostgreSQL, SQLite &amp; MongoDB</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">&rsaquo;</span>
                  <span>Progressive Web Apps &amp; Offline Systems</span>
                </li>
              </ul>
              <Link href="/tech" className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white pt-4 border-t border-white/10 transition">
                <span>Explore Tech Projects</span>
                <span className="text-violet-400">&rarr;</span>
              </Link>
            </div>

            {/* SERVICE 02 */}
            <div role="listitem" className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-[#12121a]/70 p-8 transition-all duration-400 card-hover overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-5xl font-bold leading-none text-white/10 group-hover:text-amber-500/30 transition-colors">02</span>
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                  <i className="fa-solid fa-hospital-user text-xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Clinical Informatics &amp; AI</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1 font-light">
                Clinical automation and healthcare data pipelines. Integrating GPT and n8n with WhatsApp APIs and hospital intake forms to eliminate administrative friction and triage delays.
              </p>
              <ul className="space-y-2 mb-8 text-xs font-mono text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">&rsaquo;</span>
                  <span>AI Hospital Intake &amp; Triage Workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">&rsaquo;</span>
                  <span>n8n Multi-Agent Workflow Automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">&rsaquo;</span>
                  <span>FHIR &amp; EHR Usability Optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">&rsaquo;</span>
                  <span>Clinic Scheduling &amp; Lab Notifications</span>
                </li>
              </ul>
              <Link href="/tech" className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white pt-4 border-t border-white/10 transition">
                <span>View Automation Systems</span>
                <span className="text-amber-400">&rarr;</span>
              </Link>
            </div>

            {/* SERVICE 03 */}
            <div role="listitem" className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-[#12121a]/70 p-8 transition-all duration-400 card-hover overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-5xl font-bold leading-none text-white/10 group-hover:text-emerald-500/30 transition-colors">03</span>
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <i className="fa-solid fa-microscope text-xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Research &amp; Storytelling</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1 font-light">
                Bridging biostatistics, maternal health audits, and philosophical literature. Author of &quot;The XVII-th&quot; and creator of educational clinical essays on MedSageHQ and Medium.
              </p>
              <ul className="space-y-2 mb-8 text-xs font-mono text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">&rsaquo;</span>
                  <span>Maternal &amp; Infectious Health Studies</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">&rsaquo;</span>
                  <span>SPSS Statistical Data Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">&rsaquo;</span>
                  <span>Philosophical Fiction (&quot;The XVII-th&quot;)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">&rsaquo;</span>
                  <span>Hustle Truth Series Podcast Host</span>
                </li>
              </ul>
              <Link href="/research" className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white pt-4 border-t border-white/10 transition">
                <span>Enter Research Vault</span>
                <span className="text-emerald-400">&rarr;</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SELECTED WORK / PORTFOLIO SECTION (JACK MKIMBO SHOWCASE)
         ========================================================================= */}
      <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="portfolio-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-violet-400 font-mono text-sm font-semibold">03</span>
                <div className="w-8 h-px bg-violet-500/50"></div>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Selected Work</span>
              </div>
              <h2 id="portfolio-heading" className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Projects &amp; <span className="text-gradient">Case Studies</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2" role="tablist">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                    : 'bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                All Work
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                    : 'bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                Tech &amp; AI
              </button>
              <button
                onClick={() => setActiveTab('clinical')}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeTab === 'clinical'
                    ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                    : 'bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                Clinical Research
              </button>
              <button
                onClick={() => setActiveTab('writing')}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeTab === 'writing'
                    ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                    : 'bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                Writing &amp; Media
              </button>
            </div>
          </div>

          {/* FEATURED HERO PROJECT: KAIROS SCRIPTURE ENGINE */}
          {(activeTab === 'all' || activeTab === 'ai') && (
            <div className="mb-10 rounded-3xl overflow-hidden border border-white/15 bg-[#12121a]/80 transition-all duration-500 card-hover shadow-2xl">
              <div className="grid md:grid-cols-2 min-h-[420px]">
                
                {/* Visual Half */}
                <div className="relative overflow-hidden bg-zinc-950 p-8 flex flex-col justify-between order-1 md:order-2 border-b md:border-b-0 md:border-l border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1.5 rounded-full bg-violet-600 text-white text-xs font-mono font-semibold">
                      Featured Project
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Live Production
                    </span>
                  </div>

                  <div className="py-8 space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2">
                      <div className="text-xs font-mono text-violet-300">Dual-View Presenter Architecture</div>
                      <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                        Operator search console on screen 1 &bull; Zero-lag 1080p/4K dynamic canvas output on secondary projector stream.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>Render Deployment</span>
                    <span>100% Offline Service Worker</span>
                  </div>
                </div>

                {/* Info Half */}
                <div className="p-8 md:p-10 flex flex-col justify-between order-2 md:order-1 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold">
                        bible projection engine
                      </span>
                      <span className="text-zinc-600">&bull;</span>
                      <span className="text-xs font-mono text-zinc-400">PWA</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                      Kairos
                    </h3>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                      A high-performance, offline-capable Progressive Web Application built specifically for churches and ministries to project scripture slides with zero latency. It features an intelligent client-side database indexing books, chapters, and verses for instantaneous searches, and a custom canvas engine to scale typographic layouts programmatically for 1080p/4K displays.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="tech-chip">React 18</span>
                      <span className="tech-chip">TypeScript</span>
                      <span className="tech-chip">Vite</span>
                      <span className="tech-chip">Service Workers</span>
                      <span className="tech-chip">IndexedDB</span>
                      <span className="tech-chip">Canvas Engine</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <a
                      href="https://kariogram-web.onrender.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-2.5 !px-5 !text-xs font-semibold"
                    >
                      <span>Launch Live App</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    </a>
                    <Link
                      href="/tech"
                      className="text-xs font-mono text-zinc-400 hover:text-white transition flex items-center gap-1"
                    >
                      <span>Technical Details</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SECONDARY PROJECTS GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* PROJECT: AI TRIAGE */}
            {(activeTab === 'all' || activeTab === 'ai') && (
              <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 flex flex-col justify-between card-hover space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full uppercase">
                      Clinical Automation
                    </span>
                    <span className="text-xs font-mono text-zinc-500">n8n &bull; GPT</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">
                    AI-Assisted Hospital Intake &amp; Triage
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                    Automated patient intake and symptom severity triage pipeline using GPT and n8n webhooks. Streamlines patient routing to appropriate emergency or outpatient units, cutting intake sorting times by ~70%.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tech-chip">n8n Workflows</span>
                    <span className="tech-chip">OpenAI API</span>
                    <span className="tech-chip">Webhooks</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Status: Operational</span>
                  <Link href="/tech" className="text-violet-400 hover:text-violet-300 font-semibold">Details &rarr;</Link>
                </div>
              </div>
            )}

            {/* PROJECT: CLINIC WORKFLOWS */}
            {(activeTab === 'all' || activeTab === 'ai') && (
              <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 flex flex-col justify-between card-hover space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase">
                      Operations Intelligence
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Cloud API</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">
                    Clinic Operations Workflow Automation
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                    Automated pipelines for appointment reminders, patient compliance follow-ups, billing triggers, and automated lab-result dispatches using the WhatsApp Cloud API and Google Sheets.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tech-chip">n8n</span>
                    <span className="tech-chip">WhatsApp Cloud</span>
                    <span className="tech-chip">Automation</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Compliance: High</span>
                  <Link href="/tech" className="text-amber-400 hover:text-amber-300 font-semibold">Details &rarr;</Link>
                </div>
              </div>
            )}

            {/* PROJECT: EHR RESEARCH */}
            {(activeTab === 'all' || activeTab === 'clinical') && (
              <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 flex flex-col justify-between card-hover space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase">
                      Informatics Audit
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Field Study</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">
                    EHR Usability in Low-Resource Tertiary Care
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                    Conducted usability analysis on electronic health records (EHR) systems in Nigerian teaching hospitals. Identified 4 key user interface friction points causing data entry errors among bedside nurses.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tech-chip">Informatics Audit</span>
                    <span className="tech-chip">UI Optimization</span>
                    <span className="tech-chip">Hospital Field Data</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Co-Author: Adurosakin B.</span>
                  <Link href="/research" className="text-cyan-400 hover:text-cyan-300 font-semibold">Read Audit &rarr;</Link>
                </div>
              </div>
            )}

            {/* PROJECT: THE XVII-TH */}
            {(activeTab === 'all' || activeTab === 'writing') && (
              <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 flex flex-col justify-between card-hover space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase">
                      Philosophical Novel
                    </span>
                    <span className="text-xs font-mono text-zinc-500">166 Pages</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">
                    The XVII-th: Letters to the One Who Will Come
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                    A philosophical letter-series exploring silence, truth, moral tension, and human resilience. Featuring an interactive digital book reader, reader reflection system, and soundtrack.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tech-chip">Literature</span>
                    <span className="tech-chip">Selar</span>
                    <span className="tech-chip">Interactive Reader</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Author: Adurosakin B.</span>
                  <Link href="/writing" className="text-amber-400 hover:text-amber-300 font-semibold">Excerpts &rarr;</Link>
                </div>
              </div>
            )}

            {/* PROJECT: HUSTLE TRUTH SERIES */}
            {(activeTab === 'all' || activeTab === 'writing') && (
              <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 flex flex-col justify-between card-hover space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full uppercase">
                      Podcast &amp; Media
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Daily Show</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">
                    Hustle Truth Series
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                    Daily motivational and self-improvement podcast hosted by Benedict Adurosakin. Unfiltered discussions on consistency, clinical pressure, mindset, and building goals from scratch.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tech-chip">YouTube</span>
                    <span className="tech-chip">Apple Podcasts</span>
                    <span className="tech-chip">Spotify</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Stream Online</span>
                  <Link href="/podcasts" className="text-rose-400 hover:text-rose-300 font-semibold">Listen &rarr;</Link>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. CLINICAL CARE & CAREER TIMELINE (JACK MKIMBO EXPERIENCE TIMELINE)
         ========================================================================= */}
      <section id="experience" className="py-24 md:py-32 relative overflow-hidden bg-white/[0.01] border-t border-white/[0.08]" aria-labelledby="experience-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-violet-400 font-mono text-sm font-semibold">04</span>
              <div className="w-8 h-px bg-violet-500/50"></div>
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Career History</span>
            </div>
            <h2 id="experience-heading" className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Clinical &amp; <span className="text-gradient">Professional Experience</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Vertical Connector */}
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-white/15 to-transparent hidden sm:block" aria-hidden="true"></div>

            <div className="space-y-10">
              
              {/* EXP 01 */}
              <div className="group relative grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8">
                <div className="relative sm:pt-1 hidden sm:flex flex-col items-center">
                  <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 border-violet-500 bg-violet-600 text-white font-mono text-xs font-bold shadow-lg shadow-violet-600/30">
                    <span className="absolute inset-0 rounded-full bg-violet-400/30 animate-ping"></span>
                    01
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#12121a]/80 p-6 md:p-8 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg md:text-xl font-display font-bold text-white">
                          Registered Nurse (ICU &amp; Private Ward Rotations)
                        </h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-violet-500/15 text-violet-300 border border-violet-500/30 font-medium">
                          Active Practice
                        </span>
                      </div>
                      <div className="text-sm font-mono text-zinc-400">
                        R-Jolad Hospital &bull; Lagos, Nigeria
                      </div>
                    </div>
                    <div className="text-xs font-mono text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full whitespace-nowrap">
                      April 2026 &mdash; Present
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                    Specialized critical care rotations in the Intensive Care Unit and private medical wards. Providing comprehensive nursing care for critically ill patients, administering IV therapies and blood products, and managing electronic clinical documentation.
                  </p>
                  <Link href="/nursing" className="text-xs font-mono text-violet-400 hover:underline">
                    View Complete Clinical Responsibilities &rarr;
                  </Link>
                </div>
              </div>

              {/* EXP 02 */}
              <div className="group relative grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8">
                <div className="relative sm:pt-1 hidden sm:flex flex-col items-center">
                  <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20 bg-zinc-900 text-zinc-300 font-mono text-xs font-bold">
                    02
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#12121a]/80 p-6 md:p-8 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg md:text-xl font-display font-bold text-white">
                          Registered Nurse (Obstetrics &amp; Gynecology)
                        </h3>
                      </div>
                      <div className="text-sm font-mono text-zinc-400">
                        Prince of Peace Specialist Hospital &bull; Ikorodu, Lagos
                      </div>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                      April 2023 &mdash; April 2026
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                    Provided high-quality antenatal, intrapartum, and postnatal nursing care to mothers and newborns. Assisted physicians with emergency obstetrics and surgical deliveries while upholding strict infection control.
                  </p>
                  <Link href="/nursing" className="text-xs font-mono text-zinc-400 hover:text-white">
                    View Obstetric Duties &rarr;
                  </Link>
                </div>
              </div>

              {/* EXP 03 */}
              <div className="group relative grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8">
                <div className="relative sm:pt-1 hidden sm:flex flex-col items-center">
                  <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20 bg-zinc-900 text-zinc-300 font-mono text-xs font-bold">
                    03
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#12121a]/80 p-6 md:p-8 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg md:text-xl font-display font-bold text-white">
                          Staff Nurse
                        </h3>
                      </div>
                      <div className="text-sm font-mono text-zinc-400">
                        Beautiful Gate Medical Centre &bull; Ikorodu, Lagos
                      </div>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                      January 2022 &mdash; February 2023
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                    Direct bedside nursing care including post-operative monitoring, wound dressing, patient stabilization, and outpatient health education.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. TECHNICAL SKILLS & STACK MATRIX
         ========================================================================= */}
      <section id="skills" className="py-24 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-violet-400 font-mono text-sm font-semibold">05</span>
            <div className="w-8 h-px bg-violet-500/50"></div>
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Stack Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Tools &amp; <span className="text-gradient">Technologies</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 space-y-4 card-hover">
            <h4 className="font-display font-bold text-white text-base">Languages</h4>
            <div className="flex flex-wrap gap-2">
              <span className="tech-chip"><i className="devicon-python-plain text-violet-400"></i> Python</span>
              <span className="tech-chip"><i className="devicon-javascript-plain text-yellow-400"></i> JavaScript</span>
              <span className="tech-chip"><i className="devicon-typescript-plain text-blue-400"></i> TypeScript</span>
              <span className="tech-chip"><i className="devicon-html5-plain text-orange-400"></i> HTML5/CSS3</span>
              <span className="tech-chip"><i className="fa-solid fa-database text-blue-400"></i> SQL</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 space-y-4 card-hover">
            <h4 className="font-display font-bold text-white text-base">Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              <span className="tech-chip"><i className="devicon-nextjs-plain text-white"></i> Next.js</span>
              <span className="tech-chip"><i className="devicon-react-original text-cyan-400"></i> React</span>
              <span className="tech-chip"><i className="devicon-tailwindcss-original text-teal-400"></i> Tailwind</span>
              <span className="tech-chip"><i className="devicon-django-plain text-emerald-400"></i> Django</span>
              <span className="tech-chip"><i className="devicon-fastapi-plain text-teal-400"></i> FastAPI</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 space-y-4 card-hover">
            <h4 className="font-display font-bold text-white text-base">Informatics &amp; AI</h4>
            <div className="flex flex-wrap gap-2">
              <span className="tech-chip"><i className="fa-solid fa-diagram-project text-orange-400"></i> n8n Workflows</span>
              <span className="tech-chip"><i className="fa-solid fa-chart-line text-blue-400"></i> SPSS Statistics</span>
              <span className="tech-chip"><i className="fa-solid fa-fire text-red-400"></i> FHIR Protocols</span>
              <span className="tech-chip"><i className="fa-regular fa-file-excel text-green-400"></i> Excel Data</span>
              <span className="tech-chip"><i className="fa-solid fa-link text-amber-400"></i> Webhook APIs</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#12121a]/70 p-6 space-y-4 card-hover">
            <h4 className="font-display font-bold text-white text-base">DevOps &amp; Infra</h4>
            <div className="flex flex-wrap gap-2">
              <span className="tech-chip"><i className="devicon-docker-plain text-blue-400"></i> Docker</span>
              <span className="tech-chip"><i className="fa-brands fa-github text-white"></i> Git/GitHub</span>
              <span className="tech-chip"><i className="devicon-linux-plain text-yellow-400"></i> Linux</span>
              <span className="tech-chip"><i className="devicon-nodejs-plain text-green-400"></i> Node.js</span>
              <span className="tech-chip"><i className="devicon-postgresql-plain text-blue-400"></i> PostgreSQL</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. CALL TO ACTION / HIRE ME BANNER
         ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#12121a] via-[#161622] to-violet-950/40 border border-white/15 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available for Consultation &amp; Engineering
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
              Ready to engineer resilient healthcare &amp; software systems?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Open to clinical informatics consulting, health-tech development, full-stack software roles, and research partnerships.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <Link href="/contact" className="btn-primary">
              <span>Initiate Conversation</span>
              <span>&rarr;</span>
            </Link>
            <a
              href="/new-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <span>Download CV</span>
              <span>&darr;</span>
            </a>
          </div>
        </div>
      </section>

      <Footer commitMessage="jackmkimbo-architecture-synced" />
    </>
  );
}
