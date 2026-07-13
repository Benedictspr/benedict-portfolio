'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO */}
      <div className="relative h-[300px] md:h-[420px] overflow-hidden w-full">
        <img
          src="/image5.jpeg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"></div>
      </div>

      {/* NAME */}
      <div className="relative z-10 flex justify-between items-end px-6 md:px-12 -mt-24 md:-mt-40 mb-10 w-full">
        <h1 className="font-name italic font-medium text-4xl md:text-6xl leading-none tracking-wide text-zinc-950 dark:text-zinc-50">
          Benedict Adurosakin
        </h1>
        <div className="w-24 h-24 md:w-44 md:h-44 border-2 border-black dark:border-white overflow-hidden bg-zinc-100">
          <img
            src="/image2.jpeg"
            alt="Benedict Adurosakin"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="px-6 md:px-12 w-full">
        <Navbar />
      </div>

      {/* INTRO */}
      <section className="px-6 md:px-12 mb-20 max-w-3xl w-full">
        <p className="text-2xl md:text-4xl font-light leading-relaxed text-zinc-800 dark:text-zinc-200">
          I am a{' '}
          <span className="highlight-svg">
            <span
              className={`font-dev inline-block transition-opacity duration-300 text-zinc-950 dark:text-white ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {roles[currentRoleIndex]}
            </span>
            <svg className="svg-underline" viewBox="0 0 200 9" preserveAspectRatio="none">
              <path d="M2 7C30 3 170 1 198 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>{' '}
          building systems at the intersection of clinical care, informatics, and human storytelling.
        </p>

        <p className="mt-8 text-zinc-500 leading-relaxed text-sm md:text-base">
          I bridge the gap between clinical bedside expertise and technical engineering. As a licensed nurse and software developer, 
          I engineer <strong>resilient health-tech solutions</strong>, <strong>automated workflows</strong>, and <strong>clinical research pipelines</strong> designed to withstand real-world operational pressure.
        </p>
      </section>

      {/* CORE PILLARS SECTIONS */}
      <section className="px-6 md:px-12 mb-24 w-full">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Core Pillars of Action</span>
          <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* NURSING */}
          <Link href="/nursing" className="bento flex flex-col justify-between group hover:border-cyan-500/50 dark:hover:border-cyan-400/40 transition duration-300">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-500 dark:text-cyan-400 block mb-3">01 / Clinical Care</span>
              <h3 className="font-name italic text-xl font-bold text-zinc-900 dark:text-zinc-150 mb-3 group-hover:text-cyan-500 transition-colors">Nursing</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Licensed Registered Nurse with years of critical ICU, ward, and obstetric experience. Applying data systems to improve bedside nursing and care.
              </p>
            </div>
            <span className="mt-6 text-[10px] font-mono text-zinc-400 group-hover:text-cyan-500 transition-colors">Explore History ➜</span>
          </Link>

          {/* TECH */}
          <Link href="/tech" className="bento flex flex-col justify-between group hover:border-purple-500/50 dark:hover:border-purple-400/40 transition duration-300">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-purple-500 dark:text-purple-400 block mb-3">02 / Informatics</span>
              <h3 className="font-name italic text-xl font-bold text-zinc-900 dark:text-zinc-150 mb-3 group-hover:text-purple-500 transition-colors">Tech</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Software Engineer developing scripture projection systems, clinic intake automations, and automated workflow scheduling with React, n8n, and Python.
              </p>
            </div>
            <span className="mt-6 text-[10px] font-mono text-zinc-400 group-hover:text-purple-500 transition-colors">Explore Projects ➜</span>
          </Link>

          {/* WRITING */}
          <Link href="/writing" className="bento flex flex-col justify-between group hover:border-amber-500/50 dark:hover:border-amber-400/40 transition duration-300">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-amber-500 dark:text-amber-400 block mb-3">03 / Storytelling</span>
              <h3 className="font-name italic text-xl font-bold text-zinc-900 dark:text-zinc-150 mb-3 group-hover:text-amber-500 transition-colors">Writing</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Author of philosophical literature exploring power, silence, and truth. Dynamic publisher of clinical education on MedSageHQ and Medium.
              </p>
            </div>
            <span className="mt-6 text-[10px] font-mono text-zinc-400 group-hover:text-amber-500 transition-colors">Explore Content ➜</span>
          </Link>

          {/* PODCASTS */}
          <Link href="/podcasts" className="bento flex flex-col justify-between group hover:border-rose-500/50 dark:hover:border-rose-400/40 transition duration-300">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-rose-500 dark:text-rose-400 block mb-3">04 / Media</span>
              <h3 className="font-name italic text-xl font-bold text-zinc-900 dark:text-zinc-150 mb-3 group-hover:text-rose-500 transition-colors">Podcast</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Host of the Hustle Truth Series. Daily self-improvement conversations exploring discipline, consistency, and the realities of building goals from scratch.
              </p>
            </div>
            <span className="mt-6 text-[10px] font-mono text-rose-555 dark:text-rose-500 group-hover:text-rose-500 transition-colors">Listen & Watch ➜</span>
          </Link>
        </div>
      </section>

      {/* TECHNICAL SKILLS & EXPERTISE */}
      <ScrollReveal className="w-full mb-16" delay={300}>
        <section className="px-6 md:px-12 w-full">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Technical Skills & Expertise</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            
            {/* LANGUAGES */}
            <div className="bento flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-300">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-500 dark:text-cyan-400 block mb-3">01 / Code & Query</span>
                <h3 className="font-name italic text-lg font-bold text-zinc-900 dark:text-zinc-150 mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#3776AB]/50 hover:text-[#3776AB] cursor-default">
                    <i className="devicon-python-plain"></i> Python
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#F7DF1E]/50 hover:text-[#F7DF1E] cursor-default">
                    <i className="devicon-javascript-plain"></i> JavaScript
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#3178C6]/50 hover:text-[#3178C6] cursor-default">
                    <i className="devicon-typescript-plain"></i> TypeScript
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#E34F26]/50 hover:text-[#E34F26] cursor-default">
                    <i className="devicon-html5-plain"></i> HTML5 / CSS3
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#0064a5]/50 hover:text-[#0064a5] cursor-default">
                    <i className="fa-solid fa-database text-[10px]"></i> SQL
                  </div>
                </div>
              </div>
            </div>

            {/* FRAMEWORKS & LIBRARIES */}
            <div className="bento flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-300">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-purple-500 dark:text-purple-400 block mb-3">02 / App Architecture</span>
                <h3 className="font-name italic text-lg font-bold text-zinc-900 dark:text-zinc-150 mb-4">Frameworks & Libraries</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-black/50 dark:hover:border-[#ffffff]/50 hover:text-black dark:hover:text-white cursor-default">
                    <i className="devicon-nextjs-plain"></i> Next.js
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#61DAFB]/50 hover:text-[#61DAFB] cursor-default">
                    <i className="devicon-react-original"></i> React
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#06B6D4]/50 hover:text-[#06B6D4] cursor-default">
                    <i className="devicon-tailwindcss-original"></i> Tailwind CSS
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#092E20]/50 hover:text-[#092E20] cursor-default">
                    <i className="devicon-django-plain"></i> Django
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#009688]/50 hover:text-[#009688] cursor-default">
                    <i className="devicon-fastapi-plain"></i> FastAPI
                  </div>
                </div>
              </div>
            </div>

            {/* INFORMATICS & AUTOMATION */}
            <div className="bento flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-300">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-500 dark:text-amber-400 block mb-3">03 / Care & Data Systems</span>
                <h3 className="font-name italic text-lg font-bold text-zinc-900 dark:text-zinc-150 mb-4">Informatics & Automation</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#FF6C37]/50 hover:text-[#FF6C37] cursor-default">
                    <i className="fa-solid fa-diagram-project text-[10px]"></i> n8n Workflows
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#002F6C]/50 hover:text-[#002F6C] cursor-default">
                    <i className="fa-solid fa-chart-line text-[10px]"></i> SPSS Statistics
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#107C41]/50 hover:text-[#107C41] cursor-default">
                    <i className="fa-regular fa-file-excel text-[11px]"></i> Excel Data
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#E1251B]/50 hover:text-[#E1251B] cursor-default">
                    <i className="fa-solid fa-fire-flame-curved text-[10px]"></i> FHIR Formats
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#FF9800]/50 hover:text-[#FF9800] cursor-default">
                    <i className="fa-solid fa-link text-[10px]"></i> API Integrations
                  </div>
                </div>
              </div>
            </div>

            {/* INFRASTRUCTURE & TOOLS */}
            <div className="bento flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-300">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-rose-500 dark:text-rose-400 block mb-3">04 / DevOps & Databases</span>
                <h3 className="font-name italic text-lg font-bold text-zinc-900 dark:text-zinc-150 mb-4">Infrastructure & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#2496ED]/50 hover:text-[#2496ED] cursor-default">
                    <i className="devicon-docker-plain"></i> Docker
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#F05032]/50 hover:text-[#F05032] cursor-default">
                    <i className="fa-brands fa-github text-[11px]"></i> Git / GitHub
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#FCC624]/50 hover:text-[#FCC624] cursor-default">
                    <i className="devicon-linux-plain"></i> Linux Systems
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#339933]/50 hover:text-[#339933] cursor-default">
                    <i className="devicon-nodejs-plain"></i> Node.js
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-[11px] font-mono transition-all duration-300 hover:scale-105 hover:border-[#4169E1]/50 hover:text-[#4169E1] cursor-default">
                    <i className="devicon-postgresql-plain"></i> PostgreSQL
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </ScrollReveal>

      <Footer commitMessage="index-loaded" />
    </>
  );
}
