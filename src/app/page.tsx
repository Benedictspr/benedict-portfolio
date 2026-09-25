'use client';

import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import ConstellationMesh from '../components/ConstellationMesh';

export default function Home() {
  const roles = ["Registered Nurse", "Software Engineer", "Clinical Informaticist", "Author"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setFade(true);
      }, 400);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <>
      {/* =========================================================================
          1. HERO WRAPPER WITH DRIFTING CONSTELLATION MESH (KAIROGRAM AESTHETIC)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/10 bg-gradient-to-b from-[#0D1117] via-[#161B22]/60 to-[#0D1117]">
        {/* Interactive Canvas Mesh Backdrop */}
        <ConstellationMesh />

        {/* Ambient Radial Gradient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Status Pill Tag */}
          <div className="inline-flex mb-8">
            <div className="hero-pill-tag">
              <span className="hero-pill-dot"></span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                Available for Informatics &amp; SWE
              </span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-zinc-300 text-[11px]">Bedside Care &bull; Systems Architecture</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Masked Headline with Italic Serif Flair */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                <span className="block font-sans">Clinical Care.</span>
                <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-amber-200">
                  Intelligent Systems.
                </span>
              </h1>

              {/* Dynamic Role Line */}
              <div className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 leading-relaxed max-w-3xl">
                I am a{' '}
                <span className="highlight-svg font-semibold text-white">
                  <span
                    className={`inline-block transition-opacity duration-300 text-cyan-300 ${
                      fade ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {roles[currentRoleIndex]}
                  </span>
                  <svg className="svg-underline" viewBox="0 0 200 9" preserveAspectRatio="none">
                    <path d="M2 7C30 3 170 1 198 3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                building resilient systems at the intersection of clinical practice, informatics, and human storytelling.
              </div>

              {/* Mission Statement */}
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                I bridge the gap between bedside ward reality and technical software engineering. As a licensed nurse and developer, 
                I design and engineer <strong>resilient health-tech solutions</strong>, <strong>automated clinic workflows</strong>, 
                and <strong>clinical research pipelines</strong> built to withstand real-world operational pressure.
              </p>

              {/* High-End Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link href="/tech" className="btn-action btn-coral">
                  <span>Explore Projects</span>
                  <span>&rarr;</span>
                </Link>
                <Link href="/nursing" className="btn-action btn-ghost-border">
                  <span>Clinical History</span>
                  <span>➜</span>
                </Link>
                <a
                  href="/new-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action btn-ghost-border !text-zinc-300"
                >
                  <span>Curriculum Vitae</span>
                  <span className="text-xs">&darr;</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Tech Avatar Card & Verified Credentials */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <div className="relative w-64 sm:w-72 aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 bg-zinc-900 shadow-2xl shadow-cyan-950/20 group">
                <img
                  src="/image2.jpeg"
                  alt="Benedict Adurosakin"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-80"></div>
                
                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#161B22]/90 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif italic text-white font-bold">Benedict Adurosakin</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                      VERIFIED RN
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-400">
                    Lagos, Nigeria &bull; Available Worldwide
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              2. REAL-TIME TELEMETRY / STATUS HUD (SIGNATURE KAIROGRAM COMPONENT)
             ========================================================================= */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
            <div className="p-3 border-r border-white/5 last:border-none space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Active Practice</span>
              <p className="text-xs font-mono text-zinc-200 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Bedside ICU &amp; Obstetric Care
              </p>
            </div>

            <div className="p-3 border-r border-white/5 last:border-none space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Featured System</span>
              <p className="text-xs font-mono text-cyan-300 font-semibold">
                Kairos Projection Engine
              </p>
            </div>

            <div className="p-3 border-r border-white/5 last:border-none space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Key Engineering</span>
              <p className="text-xs font-mono text-zinc-200 font-semibold">
                React &bull; Python &bull; n8n &bull; FHIR
              </p>
            </div>

            <div className="p-3 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Publications &amp; Media</span>
              <p className="text-xs font-mono text-purple-300 font-semibold">
                The XVII-th &bull; Hustle Truth
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. CORE PILLARS OF ACTION (EXPANSIVE BENTO GRID)
         ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            01 / Disciplines
          </span>
          <div className="h-[1px] flex-grow bg-white/10"></div>
          <span className="font-mono text-[11px] text-zinc-500 uppercase">Core Pillars</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* NURSING */}
          <Link
            href="/nursing"
            className="bento flex flex-col justify-between group hover:border-cyan-500/50 transition duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  01 / Clinical
                </span>
                <i className="fa-solid fa-stethoscope text-zinc-500 group-hover:text-cyan-400 transition-colors"></i>
              </div>
              <h3 className="font-serif italic text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                Nursing
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Licensed Registered Nurse with years of critical ICU, obstetric, and surgical ward experience. Applying rigorous clinical knowledge to bedside care and patient outcomes.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors">
              <span>View History</span>
              <span className="group-hover:translate-x-1 transition-transform">➜</span>
            </div>
          </Link>

          {/* TECH */}
          <Link
            href="/tech"
            className="bento flex flex-col justify-between group hover:border-purple-500/50 transition duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 font-bold bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                  02 / Software
                </span>
                <i className="fa-solid fa-code text-zinc-500 group-hover:text-purple-400 transition-colors"></i>
              </div>
              <h3 className="font-serif italic text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                Tech &amp; AI
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full-Stack Software Engineer developing the Kairos Bible engine, AI hospital triage automations, and intelligent clinic workflow pipelines with Next.js, n8n, and Python.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-purple-400 transition-colors">
              <span>Explore Projects</span>
              <span className="group-hover:translate-x-1 transition-transform">➜</span>
            </div>
          </Link>

          {/* WRITING */}
          <Link
            href="/writing"
            className="bento flex flex-col justify-between group hover:border-amber-500/50 transition duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  03 / Literature
                </span>
                <i className="fa-solid fa-feather-pointed text-zinc-500 group-hover:text-amber-400 transition-colors"></i>
              </div>
              <h3 className="font-serif italic text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                Writing
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Author of philosophical literature including &quot;The XVII-th&quot;, exploring human resilience and power. Dynamic publisher of clinical health essays on MedSageHQ and Medium.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-amber-400 transition-colors">
              <span>Read Excerpts</span>
              <span className="group-hover:translate-x-1 transition-transform">➜</span>
            </div>
          </Link>

          {/* PODCASTS */}
          <Link
            href="/podcasts"
            className="bento flex flex-col justify-between group hover:border-rose-500/50 transition duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                  04 / Media
                </span>
                <i className="fa-solid fa-microphone text-zinc-500 group-hover:text-rose-400 transition-colors"></i>
              </div>
              <h3 className="font-serif italic text-2xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">
                Podcasts
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Host of the Hustle Truth Series. Unfiltered daily self-improvement discussions on discipline, grit, and navigating high-pressure careers from the ground up.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-rose-400 transition-colors">
              <span>Listen Episodes</span>
              <span className="group-hover:translate-x-1 transition-transform">➜</span>
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================================
          4. TECHNICAL SKILLS & EXPERTISE
         ========================================================================= */}
      <ScrollReveal className="w-full mb-20" delay={200}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-semibold">
              02 / Stack
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Technical Expertise</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* LANGUAGES */}
            <div className="bento flex flex-col justify-between hover:border-cyan-500/40 transition">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 block mb-2 font-bold">
                  01 / Code &amp; Query
                </span>
                <h3 className="font-serif italic text-xl font-bold text-white mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-cyan-400/50 hover:text-cyan-300 transition">
                    <i className="devicon-python-plain text-cyan-400"></i> Python
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-yellow-400/50 hover:text-yellow-300 transition">
                    <i className="devicon-javascript-plain text-yellow-400"></i> JavaScript
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-blue-400/50 hover:text-blue-300 transition">
                    <i className="devicon-typescript-plain text-blue-400"></i> TypeScript
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-orange-400/50 hover:text-orange-300 transition">
                    <i className="devicon-html5-plain text-orange-400"></i> HTML5 / CSS3
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-blue-500/50 hover:text-blue-300 transition">
                    <i className="fa-solid fa-database text-[10px] text-blue-400"></i> SQL
                  </div>
                </div>
              </div>
            </div>

            {/* FRAMEWORKS & LIBRARIES */}
            <div className="bento flex flex-col justify-between hover:border-purple-500/40 transition">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-purple-400 block mb-2 font-bold">
                  02 / Architecture
                </span>
                <h3 className="font-serif italic text-xl font-bold text-white mb-4">Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-white/50 hover:text-white transition">
                    <i className="devicon-nextjs-plain text-white"></i> Next.js
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-cyan-400/50 hover:text-cyan-300 transition">
                    <i className="devicon-react-original text-cyan-400"></i> React
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-teal-400/50 hover:text-teal-300 transition">
                    <i className="devicon-tailwindcss-original text-teal-400"></i> Tailwind CSS
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-300 transition">
                    <i className="devicon-django-plain text-emerald-400"></i> Django
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-teal-500/50 hover:text-teal-300 transition">
                    <i className="devicon-fastapi-plain text-teal-400"></i> FastAPI
                  </div>
                </div>
              </div>
            </div>

            {/* INFORMATICS & AUTOMATION */}
            <div className="bento flex flex-col justify-between hover:border-amber-500/40 transition">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 block mb-2 font-bold">
                  03 / Care &amp; Data Systems
                </span>
                <h3 className="font-serif italic text-xl font-bold text-white mb-4">Informatics</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-orange-500/50 hover:text-orange-300 transition">
                    <i className="fa-solid fa-diagram-project text-[10px] text-orange-400"></i> n8n Workflows
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-blue-400/50 hover:text-blue-300 transition">
                    <i className="fa-solid fa-chart-line text-[10px] text-blue-400"></i> SPSS Statistics
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-green-500/50 hover:text-green-300 transition">
                    <i className="fa-regular fa-file-excel text-[11px] text-green-400"></i> Excel Data
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-red-500/50 hover:text-red-300 transition">
                    <i className="fa-solid fa-fire-flame-curved text-[10px] text-red-400"></i> FHIR Formats
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-amber-400/50 hover:text-amber-300 transition">
                    <i className="fa-solid fa-link text-[10px] text-amber-400"></i> API Integrations
                  </div>
                </div>
              </div>
            </div>

            {/* INFRASTRUCTURE & TOOLS */}
            <div className="bento flex flex-col justify-between hover:border-rose-500/40 transition">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-rose-400 block mb-2 font-bold">
                  04 / DevOps &amp; Cloud
                </span>
                <h3 className="font-serif italic text-xl font-bold text-white mb-4">Infrastructure</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-blue-400/50 hover:text-blue-300 transition">
                    <i className="devicon-docker-plain text-blue-400"></i> Docker
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-white/50 hover:text-white transition">
                    <i className="fa-brands fa-github text-[11px]"></i> Git / GitHub
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-yellow-400/50 hover:text-yellow-300 transition">
                    <i className="devicon-linux-plain text-yellow-400"></i> Linux Systems
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-green-500/50 hover:text-green-300 transition">
                    <i className="devicon-nodejs-plain text-green-400"></i> Node.js
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-blue-600/50 hover:text-blue-300 transition">
                    <i className="devicon-postgresql-plain text-blue-500"></i> PostgreSQL
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* =========================================================================
          5. CALL TO ACTION BANNER (KAIROGRAM EDITORIAL FINALE)
         ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-purple-950/40 border border-white/15 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
              Collaboration &amp; Hiring
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-white">
              Ready to engineer high-impact healthcare and digital solutions?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Open to clinical informatics consulting, health-tech development, full-stack software roles, and multidisciplinary research collaborations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <Link href="/contact" className="btn-action btn-coral">
              <span>Initiate Conversation</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/research" className="btn-action btn-ghost-border">
              <span>Explore Research</span>
              <span>➜</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer commitMessage="portfolio-v2-active" />
    </>
  );
}
