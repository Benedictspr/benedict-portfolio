'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

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

      {/* THREE PILLARS SECTIONS */}
      <section className="px-6 md:px-12 mb-24 w-full">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Core Pillars of Action</span>
          <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <div className="border-y border-zinc-100 dark:border-zinc-900 py-10 mask overflow-hidden relative w-full mb-12">
        <div className="flex animate-marquee gap-16 text-3xl text-zinc-400 whitespace-nowrap">
          <i className="devicon-react-original" title="React"></i>
          <i className="devicon-nextjs-original-wordmark" title="Next.js"></i>
          <i className="devicon-tailwindcss-original" title="Tailwind CSS"></i>
          <i className="devicon-typescript-plain" title="TypeScript"></i>
          <i className="devicon-python-plain" title="Python"></i>
          <i className="devicon-django-plain" title="Django"></i>
          <i className="devicon-postgresql-plain" title="PostgreSQL"></i>
          <i className="devicon-docker-plain" title="Docker"></i>
          <i className="devicon-linux-plain" title="Linux"></i>
          
          <i className="devicon-react-original" title="React"></i>
          <i className="devicon-nextjs-original-wordmark" title="Next.js"></i>
          <i className="devicon-tailwindcss-original" title="Tailwind CSS"></i>
          <i className="devicon-typescript-plain" title="TypeScript"></i>
          <i className="devicon-python-plain" title="Python"></i>
          <i className="devicon-django-plain" title="Django"></i>
          <i className="devicon-postgresql-plain" title="PostgreSQL"></i>
          <i className="devicon-docker-plain" title="Docker"></i>
          <i className="devicon-linux-plain" title="Linux"></i>
        </div>
      </div>

      <Footer commitMessage="index-loaded" />
    </>
  );
}
