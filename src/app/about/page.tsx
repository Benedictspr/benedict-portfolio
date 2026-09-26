'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';
import { useTour } from '../../context/TourContext';

export default function AboutPage() {
  const { startTour } = useTour();
  const [activePhoto, setActivePhoto] = useState<'swe' | 'rn'>('swe');

  const pageTours = [
    {
      num: '01',
      page: 'Work & Tech',
      path: '/tech',
      tourStep: 1,
      badge: 'Software & Automation',
      headline: 'Offline-First Web Engines & Intelligent Automations',
      desc: 'Architecting zero-latency PWAs, client-side database synchronization, and event-driven automation pipelines.',
      highlights: [
        'Kairogram Scripture Companion & Android APK Portal (kairogram.vercel.app)',
        'Event-driven n8n workflow telemetry over WhatsApp',
        'AI emergency triage symptom extraction models',
      ],
      linkText: 'Explore Tech Systems',
    },
    {
      num: '02',
      page: 'Clinical Practice',
      path: '/nursing',
      tourStep: 2,
      badge: 'Registered Nurse (RN)',
      headline: 'Acute ICU Bedside Care & Resuscitation',
      desc: 'Licensed Registered Nurse managing critical patients, mechanical ventilation, invasive monitoring lines, and emergency delivery rooms.',
      highlights: [
        'Intensive Care Unit (ICU) mechanical ventilator management',
        'Arterial lines, CVP monitoring & critical inotrope titrations',
        'Obstetrics, surgical delivery stabilization & neonatal resuscitation',
      ],
      linkText: 'Explore Clinical Practice',
    },
    {
      num: '03',
      page: 'Research & Informatics',
      path: '/research',
      tourStep: 3,
      badge: 'Empirical Health Audits',
      headline: 'Clinical Data Models & EHR Usability Audits',
      desc: 'Author of 7 published health audits transforming chaotic ward observations into reproducible epidemiological data models.',
      highlights: [
        '7 published hospital audits across maternal care & infection control',
        'EHR usability investigations addressing clinician interface friction',
        'Collaborative biostatistics & clinical research request pipeline',
      ],
      linkText: 'Explore Research',
    },
    {
      num: '04',
      page: 'Writing & Literature',
      path: '/writing',
      tourStep: 4,
      badge: 'Philosophical Author',
      headline: 'The XVII-th: Letters to the One Who Will Come',
      desc: 'A 166-page epistolary philosophical novel exploring human mortality, sovereign purpose, endurance, and quiet recovery.',
      highlights: [
        'Complete 166-page novel exploration & thematic breakdown',
        'Original atmospheric musical soundtrack score',
        'Reader reflections and philosophical critical discourse',
      ],
      linkText: 'Explore Literature',
    },
    {
      num: '05',
      page: 'Podcasts & Media',
      path: '/podcasts',
      tourStep: 5,
      badge: 'Daily Audio Series',
      headline: 'Hustle Truth Series Podcast',
      desc: 'Daily motivational audio reflections tackling mental endurance, deep work habits, and navigating demanding career disciplines.',
      highlights: [
        'In-browser streamable audio episodes with episode timestamps',
        'Practical frameworks for overcoming burnout and maintaining focus',
        'Active community comment threads and discussions',
      ],
      linkText: 'Listen to Episodes',
    },
    {
      num: '06',
      page: 'Contact & Collaboration',
      path: '/contact',
      tourStep: 6,
      badge: 'Direct Connect',
      headline: 'Consultations, Inquiries & Global Projects',
      desc: 'Open for international full-stack engineering contracts, health-tech systems architecture, and clinical informatics advisory.',
      highlights: [
        'Direct WhatsApp messaging line for fast responses',
        'Detailed project intake & consultation scheduling',
        'Available for worldwide remote consulting & architecture',
      ],
      linkText: 'Start a Project',
    },
  ];

  const milestones = [
    {
      year: '2026 — Present',
      role: 'Critical Care ICU Nurse & Software Architect',
      place: 'R-Jolad Hospital & Open Source',
      desc: 'Managing high-acuity ICU patients while architecting offline-first web engines (Kairos) and automated workflow pipelines.',
    },
    {
      year: '2024 — 2027',
      role: 'Bachelor of Nursing Science (BNSc)',
      place: 'Ahmadu Bello University (DLC), Zaria',
      desc: '500-level candidate focusing on epidemiology, health informatics, and clinical research methodologies.',
    },
    {
      year: '2023 — 2026',
      role: 'Obstetrics & Surgical Delivery Rotations',
      place: 'Prince of Peace Specialist Hospital, Lagos',
      desc: 'Delivered antenatal, intrapartum, and neonatal resuscitation care. Assisted in emergency surgical deliveries.',
    },
    {
      year: '2022 — 2023',
      role: 'Staff Nurse (Acute & Emergency)',
      place: 'Beautiful Gate Medical Centre, Lagos',
      desc: 'Direct acute nursing, emergency patient stabilization, medication administration, and patient education.',
    },
  ];

  return (
    <>
      {/* ── Page Header Block ── */}
      <section className="pagehead border-b border-[var(--line)] bg-[var(--paper-2)]/60 py-12 md:py-16">
        <div className="shell">
          <nav className="crumbs mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--red)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--ink)] font-bold">About &amp; Tour</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--red)]/10 border border-[var(--red)]/20 text-xs font-mono font-semibold text-[var(--red)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse"></span>
            <span>Guided Portfolio Overview</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--ink)] tracking-tight leading-[1.08] max-w-4xl">
            Hi, my name is Benedict Olorunwa Adurosakin. <br />
            <span className="text-[var(--red)] italic">Let me take you around.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[var(--mute)] max-w-3xl leading-relaxed">
            I work across software engineering, critical care ICU nursing, and clinical research.
            Rather than crowding you with dense text, here is an interactive guide showing exactly
            what I do on each page of this site — without altering the depth of each individual section.
          </p>

          {/* Interactive Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => startTour(0)}
              className="btn btn-red py-3.5 px-6 rounded-xl shadow-lg cursor-pointer"
            >
              <span>Start Interactive Tour</span>
              <span className="ar">&rarr;</span>
            </button>
            <Link href="/contact" className="btn btn-line py-3.5 px-6 rounded-xl">
              <span>Start a conversation</span>
              <span className="ar">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Body ── */}
      <div className="shell py-16 space-y-24">
        
        {/* ── Section: What I Do on Each Page (The Guided Map) ── */}
        <section className="space-y-10">
          <div className="sechead">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Guided Walkthrough
              </p>
              <h2>What I Do Across Each Page.</h2>
            </div>
            <div className="side">
              <p>
                Each section of this website represents a distinct craft. Click &ldquo;Take Tour Here&rdquo; 
                to have the live interactive guide walk you through that page directly.
              </p>
            </div>
          </div>

          {/* 6 Uncrowded, Breathable Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageTours.map((item) => (
              <div
                key={item.num}
                className="group p-6 sm:p-7 rounded-2xl border border-[var(--line)] bg-white hover:border-[var(--ink)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Number & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold text-[var(--red)] bg-[var(--paper-2)] px-2.5 py-1 rounded-full border border-[var(--line)]">
                      {item.num}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--faint)] uppercase tracking-wider font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--ink)] tracking-tight mb-2 group-hover:text-[var(--red)] transition-colors">
                    {item.page}
                  </h3>

                  <p className="text-xs font-semibold text-[var(--ink)]/80 mb-3">
                    {item.headline}
                  </p>

                  <p className="text-xs text-[var(--mute)] leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-[var(--line)]/60">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--faint)] font-bold">
                      Key Highlights:
                    </p>
                    <ul className="space-y-1.5">
                      {item.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-[var(--mute)] leading-snug">
                          <span className="text-[var(--red)] font-bold mt-0.5">&bull;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-[var(--line)]">
                  <Link
                    href={item.path}
                    className="flex-1 py-2 px-3 text-center text-xs font-bold rounded-lg bg-[var(--paper-2)] hover:bg-[var(--ink)] hover:text-white transition-colors"
                  >
                    <span>{item.linkText} &rarr;</span>
                  </Link>

                  <button
                    onClick={() => startTour(item.tourStep)}
                    className="py-2 px-3 text-xs font-semibold rounded-lg bg-[var(--red)]/10 text-[var(--red)] hover:bg-[var(--red)] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    title={`Start guided tour on ${item.page}`}
                  >
                    <span>Tour</span>
                    <span>🧭</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: Dual Discipline & Philosophy (Uncrowded, Crisp) ── */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[var(--paper-2)]/60 border border-[var(--line)]">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual Portrait Frame with Toggle */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden border border-[var(--line)] bg-white shadow-md">
                <img
                  src={activePhoto === 'swe' ? '/benedict.png' : '/image2.jpeg'}
                  alt="Benedict Adurosakin"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center justify-between text-white">
                  <span className="text-xs font-mono">
                    {activePhoto === 'swe' ? 'Software & Systems' : 'Clinical ICU Ward'}
                  </span>
                  <span className="text-[10px] text-[var(--red)] font-bold uppercase">
                    {activePhoto === 'swe' ? 'SWE' : 'RN'}
                  </span>
                </div>
              </div>

              {/* Photo toggle buttons */}
              <div className="mt-4 flex items-center gap-2 p-1 rounded-full bg-white border border-[var(--line)] shadow-sm">
                <button
                  onClick={() => setActivePhoto('swe')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                    activePhoto === 'swe'
                      ? 'bg-[var(--red)] text-white shadow-sm'
                      : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  Software &bull; SWE
                </button>
                <button
                  onClick={() => setActivePhoto('rn')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                    activePhoto === 'rn'
                      ? 'bg-[var(--red)] text-white shadow-sm'
                      : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  Critical Care &bull; RN
                </button>
              </div>
            </div>

            {/* Concise Core Statement */}
            <div className="lg:col-span-7 space-y-5">
              <p className="micro red">The Operating Philosophy</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight leading-snug">
                Where High-Acuity ICU Care Shapes Production Code.
              </h2>
              
              <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
                In intensive care units, seconds dictate outcomes. When an interface takes five
                extra clicks or freezes during vital sign logging, clinical attention is compromised.
                That acute hospital reality forms the standard for everything I write: zero lag,
                offline-first capability, and clean simplicity.
              </p>

              <blockquote className="p-4 rounded-xl border-l-4 border-[var(--red)] bg-white text-xs sm:text-sm text-[var(--ink)] font-medium italic leading-relaxed">
                &ldquo;Every system I construct — whether an offline scripture engine, automated telemetry
                pipeline, or clinical triage intake model — is designed to perform reliably under pressure.&rdquo;
              </blockquote>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => startTour(0)}
                  className="btn btn-red text-xs py-2.5 px-5 cursor-pointer"
                >
                  <span>Launch Live Tour</span>
                  <span className="ar">&rarr;</span>
                </button>
                <Link href="/tech" className="btn btn-line text-xs py-2.5 px-5">
                  <span>View Tech Projects</span>
                  <span className="ar">&rarr;</span>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── Section: Clean Career Milestones Timeline ── */}
        <section className="space-y-8">
          <div className="sechead">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Progression
              </p>
              <h2>Key Career Milestones.</h2>
            </div>
            <div className="side">
              <p>
                A progressive trajectory across tertiary hospital intensive care, emergency surgery,
                and distributed software architectures.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[var(--line)] bg-white hover:border-[var(--ink)] transition-colors duration-300 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold text-[var(--red)] bg-[var(--paper-2)] px-3 py-1 rounded-full border border-[var(--line)] whitespace-nowrap shrink-0">
                    {m.year}
                  </span>
                  <span className="text-xs font-mono text-[var(--faint)] truncate min-w-0">{m.place}</span>
                </div>
                <h4 className="text-base font-bold text-[var(--ink)] tracking-tight">
                  {m.role}
                </h4>
                <p className="text-xs text-[var(--mute)] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: Collaboration & Direct Conversation ── */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#0D1117] !text-white text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4A2B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <p className="micro text-[var(--red)]">Start A Collaboration</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold !text-white tracking-tight leading-tight">
              Ready to Discuss a System or Medical Project?
            </h2>
            <p className="text-sm !text-white/80 leading-relaxed font-normal">
              Available for full-stack engineering contracts, clinical informatics advisory,
              and healthcare data research worldwide.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn btn-red py-3 px-6 rounded-xl">
                <span>Start a conversation</span>
                <span className="ar">&rarr;</span>
              </Link>
              <button
                onClick={() => startTour(0)}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition cursor-pointer flex items-center gap-2"
              >
                <span>Replay Guided Tour</span>
                <span>🧭</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      <Footer commitMessage="about-streamlined-tour-ready" />
    </>
  );
}
