'use client';

import { useState } from 'react';
import Link from 'next/link';
import ConstellationMesh from '../components/ConstellationMesh';
import Footer from '../components/Footer';
import { useTour } from '../context/TourContext';

export default function Home() {
  const { startTour } = useTour();
  const [activePhoto, setActivePhoto] = useState<'kairogram' | 'clinical'>('kairogram');
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<number>(0);

  const showcaseItems = [
    {
      id: 'kairos',
      tabLabel: 'Kairogram & APK Portal',
      title: 'Kairogram Biblical Companion & Official APK Portal',
      url: 'kairogram.vercel.app',
      badge: 'Android APK · Real-Time Voice Recognition · Offline PWA',
      desc: 'The official biblical study companion and sermon assistant featuring real-time speech recognition for live scriptures, dual-page paperback tablet reader, interlinear Greek & Hebrew concordances, and bundled offline devotionals. Available as a direct Android APK download and live PWA web engine.',
      link: 'https://kairogram.vercel.app',
      linkText: 'Download APK (Official Portal)',
      secondaryLink: 'https://kariogram-web.onrender.com/',
      secondaryLinkText: 'Live Web Engine',
      external: true,
      stats: [
        { label: 'Distribution', val: 'Android APK' },
        { label: 'Voice AI', val: 'Real-Time Verse' },
        { label: 'Lexicon', val: 'Greek & Hebrew' },
      ],
      previewImg: '/benedict.png',
      visualType: 'browser',
    },
    {
      id: 'triage',
      tabLabel: 'AI Emergency Triage',
      title: 'LLM-Guided Emergency Ward Intake Protocol',
      url: 'benedictadurosakin.com/triage-intake',
      badge: 'Clinical Informatics & AI',
      desc: 'Structured symptom extraction protocol mapping emergency ward presentations into validated Manchester & ESI triage categories. Automates clinician routing and flags critical decompensation markers.',
      link: '/tech',
      linkText: 'View Architecture',
      external: false,
      stats: [
        { label: 'Standards', val: 'Manchester / ESI' },
        { label: 'Processing', val: 'Structured JSON' },
        { label: 'Routing', val: 'Auto-Provider' },
      ],
      previewImg: '/image2.jpeg',
      visualType: 'browser',
    },
    {
      id: 'telemetry',
      tabLabel: 'Workflow Automations',
      title: 'Clinic Operations & WhatsApp Telemetry Pipeline',
      url: 'telemetry.clinic-pipeline.internal',
      badge: 'n8n & Multi-Agent Python',
      desc: 'Automated telemetry pipelines dispatching medication reminders, vitals monitoring prompts, appointment follow-ups, and lab report releases directly over WhatsApp with end-to-end audit logging.',
      link: '/tech',
      linkText: 'Explore Pipeline',
      external: false,
      stats: [
        { label: 'Channel', val: 'WhatsApp Business' },
        { label: 'Orchestration', val: 'n8n Workflows' },
        { label: 'Compliance', val: 'Audit Logging' },
      ],
      previewImg: '/benedict.png',
      visualType: 'browser',
    },
    {
      id: 'icu',
      tabLabel: 'Critical Care ICU',
      title: 'Acute Bedside ICU Care & Resuscitation',
      url: 'rjolad-hospital.icu-care',
      badge: 'Licensed Registered Nurse',
      desc: 'Direct bedside nursing in the Intensive Care Unit and Private Ward at R-Jolad Hospital. Managing mechanical ventilators, invasive hemodynamic monitoring lines, critical inotrope titrations, and emergency resuscitations.',
      link: '/nursing',
      linkText: 'Clinical Practice',
      external: false,
      stats: [
        { label: 'Environment', val: 'ICU & High-Acuity' },
        { label: 'Acuity', val: 'Ventilators & Lines' },
        { label: 'Licensure', val: 'Licensed RN' },
      ],
      previewImg: '/image2.jpeg',
      visualType: 'browser',
    },
    {
      id: 'writing',
      tabLabel: 'The XVII-th & Media',
      title: 'The XVII-th: Letters to the One Who Will Come',
      url: 'writing.benedictadurosakin.com/the-xvii-th',
      badge: 'Author & Philosophical Novel',
      desc: 'A 166-page philosophical novel and letter-series exploring human mortality, sovereignty, power, and resilience. Complemented by the Hustle Truth Series podcast exploring discipline and career building.',
      link: '/writing',
      linkText: 'Explore Literature',
      external: false,
      stats: [
        { label: 'Format', val: '166-Page Novel' },
        { label: 'Podcast', val: 'Hustle Truth Series' },
        { label: 'Soundtrack', val: 'Original Score' },
      ],
      previewImg: '/benedict.png',
      visualType: 'browser',
    },
  ];

  return (
    <>
      {/* =========================================================================
          1. HERO WRAPPER (DARK ENVELOPE WITH CONSTELLATION MESH)
         ========================================================================= */}
      <div className="herowrap" id="herowrap">
        {/* Live Drifting Canvas Mesh */}
        <ConstellationMesh />

        <header className="hero" id="top">
          <div className="shell">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Headlines & High-Intent Messaging */}
              <div className="lg:col-span-8">
                <p className="micro red rv" style={{ marginBottom: '1.4rem' }}>
                  Software Engineer &bull; Registered Nurse &bull; Clinical Informaticist
                </p>

                <h1 className="rv text-white">
                  <span className="mask">
                    <span style={{ transitionDelay: '.05s' }}>Software. Healthcare.</span>
                  </span>
                  <span className="mask ln2">
                    <span style={{ transitionDelay: '.18s' }}>
                      <em>Original Systems.</em>
                    </span>
                  </span>
                </h1>

                <div className="herofoot rv">
                  <p>
                    Benedict Adurosakin builds high-performance offline-first web engines,
                    intelligent automations, and clinical data systems. Each craft stands on its
                    own merits — built with architectural rigor, precision, and zero tolerance for
                    unnecessary friction.
                  </p>

                  <div className="acts">
                    <button
                      onClick={() => startTour(0)}
                      className="btn btn-red flex items-center gap-2 cursor-pointer"
                    >
                      <span>Take a Tour</span>
                      <span className="ar">&rarr;</span>
                    </button>
                    <Link href="/contact" className="btn btn-line">
                      <span>Start a project</span>
                      <span className="ar">&rarr;</span>
                    </Link>
                    <Link href="/tech" className="btn btn-line hidden sm:inline-flex">
                      <span>Explore Systems</span>
                      <span className="ar">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Animated Scroll Sweep Rail */}
                <div className="scroll rv">
                  <p className="micro">Scroll</p>
                  <span className="rail">
                    <i />
                  </span>
                </div>
              </div>

              {/* Right Column: Signature Framed Dual Portrait */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-6 lg:pt-0">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl p-2 bg-[#1B2028] border border-white/10 shadow-2xl">
                  {/* Portrait Image */}
                  <div className="w-full h-full rounded-xl overflow-hidden relative bg-black/40">
                    <img
                      src={activePhoto === 'kairogram' ? '/benedict.png' : '/image2.jpeg'}
                      alt="Benedict Adurosakin"
                      className="w-full h-full object-cover object-top transition-all duration-500 hover:scale-105"
                    />
                    
                    {/* Live Status Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#1F9D55] animate-pulse"></span>
                      <span className="text-[10px] font-semibold text-white tracking-wider uppercase">
                        Available
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-white/90">
                        {activePhoto === 'kairogram' ? 'Software & Creative' : 'Clinical ICU Ward'}
                      </span>
                      <span className="text-[10px] text-[var(--red)] font-bold uppercase tracking-wider">
                        SWE · RN
                      </span>
                    </div>
                  </div>

                  {/* Toggle Pills below frame */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 rounded-full bg-[#0D1117] border border-white/20 shadow-lg whitespace-nowrap">
                    <button
                      onClick={() => setActivePhoto('kairogram')}
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold transition cursor-pointer ${
                        activePhoto === 'kairogram'
                          ? 'bg-[var(--red)] text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Engineering
                    </button>
                    <button
                      onClick={() => setActivePhoto('clinical')}
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold transition cursor-pointer ${
                        activePhoto === 'clinical'
                          ? 'bg-[var(--red)] text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Clinical ICU
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </header>
      </div>

      {/* =========================================================================
          2. STAT STRIP (BIG TABULAR NUMBERS WITH HAIRLINE DIVIDERS)
         ========================================================================= */}
      <section className="strip">
        <div className="shell">
          <div className="stat rv">
            <b data-count="5">5+</b>
            <span>Years Clinical ICU, Ward &amp; Health Systems Practice</span>
          </div>
          <div className="stat rv">
            <b data-count="10">10+</b>
            <span>Deployed Systems, Engines &amp; Pipelines</span>
          </div>
          <div className="stat rv">
            <b data-count="7">7</b>
            <span>Published Audits &amp; Health Studies</span>
          </div>
          <div className="stat rv">
            <b data-count="100">100%</b>
            <span>Offline-First Reliability on Kairos Engine</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DISTINCT ECOSYSTEMS & INSTITUTIONS
         ========================================================================= */}
      <section className="py-8 border-b border-[var(--line)] bg-[var(--paper-2)]/60">
        <div className="shell flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="micro text-[var(--mute)] whitespace-nowrap">
            Practice &bull; Engineering Ecosystems
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-bold text-[var(--ink)]/80 tracking-tight">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]"></span>
              Kairos Scripture Engine
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]"></span>
              R-Jolad Hospital (ICU)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]"></span>
              Prince of Peace Hospital (OB/GYN)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]"></span>
              Ahmadu Bello University (BNSc)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]"></span>
              The XVII-th Literature
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CORE DISCIPLINES (CLEARLY DEMARCATED INVERTING HOVER ROWS)
         ========================================================================= */}
      <section className="sec" id="disciplines">
        <div className="shell">
          <div className="sechead rv">
            <div>
              <p className="micro red" style={{ marginBottom: '1.2rem' }}>
                Core Disciplines
              </p>
              <h2>Distinct Crafts. Unified Rigor.</h2>
            </div>
            <div className="side">
              <p>
                Each discipline is approached as its own specialized domain — from offline-first
                web architecture to acute hospital bedside care and creative literature.
              </p>
            </div>
          </div>

          <div className="rows rv">
            {/* Row 01: Full-Stack & Offline Software */}
            <Link className="row" href="/tech">
              <span className="rnum">01</span>
              <span className="rbody">
                <span className="rtitle">Full-Stack Software Engineering &amp; Offline-First PWAs</span>
                <span className="rdesc">
                  Building zero-latency offline web applications, custom dynamic canvas scaling
                  engines (Kairos Scripture Engine), and client-side database architectures that never
                  depend on intermittent network connectivity.
                </span>
              </span>
              <span className="rgo">&rarr;</span>
            </Link>

            {/* Row 02: Workflow Automation */}
            <Link className="row" href="/tech">
              <span className="rnum">02</span>
              <span className="rbody">
                <span className="rtitle">Workflow Automation &amp; Multi-Agent Systems</span>
                <span className="rdesc">
                  Architecting end-to-end automation pipelines, n8n orchestration, WhatsApp notification
                  telemetry channels, and event-driven backend workflows.
                </span>
              </span>
              <span className="rgo">&rarr;</span>
            </Link>

            {/* Row 03: Clinical Informatics & EHR */}
            <Link className="row" href="/tech">
              <span className="rnum">03</span>
              <span className="rbody">
                <span className="rtitle">Clinical Informatics &amp; EHR Systems Research</span>
                <span className="rdesc">
                  Independent health systems research evaluating Electronic Health Record (EHR) usability
                  friction points, structured clinical triage categorization, and healthcare data models.
                </span>
              </span>
              <span className="rgo">&rarr;</span>
            </Link>

            {/* Row 04: Bedside ICU Nursing */}
            <Link className="row" href="/nursing">
              <span className="rnum">04</span>
              <span className="rbody">
                <span className="rtitle">Critical Care &amp; Acute Bedside Nursing (RN)</span>
                <span className="rdesc">
                  Licensed Registered Nurse practice managing ICU mechanical ventilators, invasive
                  telemetry lines, medication titration, and acute patient interventions at the bedside.
                </span>
              </span>
              <span className="rgo">&rarr;</span>
            </Link>

            {/* Row 05: Creative Writing & Author */}
            <Link className="row" href="/writing">
              <span className="rnum">05</span>
              <span className="rbody">
                <span className="rtitle">Author, Literature &amp; Podcast Series</span>
                <span className="rdesc">
                  Author of philosophical letter-series novel &ldquo;The XVII-th&rdquo; and creator of the
                  &ldquo;Hustle Truth Series&rdquo; daily podcast exploring discipline, resilience, and human purpose.
                </span>
              </span>
              <span className="rgo">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PROOF & SHOWCASE (INTERACTIVE TABS & BROWSER MOCKUP)
         ========================================================================= */}
      <section className="sec showcase bg-[var(--paper-2)]/40 border-y border-[var(--line)]" id="showcase">
        <div className="shell">
          <div className="sechead rv">
            <div>
              <p className="micro red" style={{ marginBottom: '1.2rem' }}>
                Proof &amp; Systems
              </p>
              <h2>Work That Performs Under Pressure.</h2>
            </div>
            <div className="side">
              <p>
                Explore deployed projects across offline multimedia presentation, automated
                telemetry, clinical practice, and published literature.
              </p>
            </div>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="tabs" role="tablist" aria-label="Showcase Systems">
            {showcaseItems.map((item, idx) => (
              <button
                key={item.id}
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={activeShowcaseTab === idx}
                aria-controls={`panel-${item.id}`}
                onClick={() => setActiveShowcaseTab(idx)}
              >
                {item.tabLabel}
              </button>
            ))}
          </div>

          {/* Tab Panel */}
          {(() => {
            const currentItem = showcaseItems[activeShowcaseTab];
            return (
              <div
                className="panel"
                id={`panel-${currentItem.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${currentItem.id}`}
              >
                {/* Left Text & Metrics */}
                <div className="ptext">
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--paper-2)] border border-[var(--line)] text-xs font-mono font-semibold text-[var(--ink)] mb-4">
                    {currentItem.badge}
                  </div>
                  <h3>{currentItem.title}</h3>
                  <p>{currentItem.desc}</p>

                  {/* Micro Metric Pill Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {currentItem.stats.map((st, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white border border-[var(--line)]"
                      >
                        <div className="text-[11px] font-mono text-[var(--faint)]">
                          {st.label}
                        </div>
                        <div className="text-sm font-bold text-[var(--ink)] mt-0.5">
                          {st.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {currentItem.external ? (
                      <a
                        href={currentItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-red"
                      >
                        <span>{currentItem.linkText}</span>
                        <span className="ar">&rarr;</span>
                      </a>
                    ) : (
                      <Link href={currentItem.link} className="btn btn-solid">
                        <span>{currentItem.linkText}</span>
                        <span className="ar">&rarr;</span>
                      </Link>
                    )}

                    {currentItem.secondaryLink && (
                      <a
                        href={currentItem.secondaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-line"
                      >
                        <span>{currentItem.secondaryLinkText}</span>
                        <span className="ar">&rarr;</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Visual: Signature Clean Browser Mockup Frame */}
                <div className="pvisual">
                  <figure className="browser">
                    <div className="bchrome">
                      <span className="bdots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="burl">{currentItem.url}</span>
                    </div>
                    <div className="bview p-6 bg-gradient-to-br from-[#0D1117] to-[#1B2028] text-white flex flex-col justify-between min-h-[320px]">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[var(--red)] uppercase tracking-widest font-bold">
                            // {currentItem.badge.split('·')[0]}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Verified Project
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
                          {currentItem.title}
                        </h4>
                        <p className="text-xs text-white/70 font-mono leading-relaxed line-clamp-3">
                          {currentItem.desc}
                        </p>
                      </div>

                      {/* Mock Terminal / Meta Display */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                        <span>Project: {currentItem.tabLabel}</span>
                        <span className="text-[var(--red)]">&bull; Active</span>
                      </div>
                    </div>
                    <figcaption>
                      {currentItem.title} &mdash; created &amp; architected by Benedict Adurosakin
                    </figcaption>
                  </figure>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          6. AUTHORITY QUOTE CARD (DEEP DARK #0D1117 CONTAINER)
         ========================================================================= */}
      <section className="sec py-12">
        <div className="shell">
          <div className="quote rv shadow-2xl">
            <blockquote className="text-white">
              &ldquo;Whether architecting an offline scripture presentation engine, designing
              clinical intake workflows, or caring for an acute patient in the ICU, every system
              demands the exact same standard: structural integrity, zero lag, and deep respect for
              human focus.&rdquo;
            </blockquote>
            <cite>
              Benedict Adurosakin &mdash; Software Engineer, Registered Nurse &amp; Author
            </cite>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FEATURED PUBLICATIONS & ARTICLES (JOURNAL GRID)
         ========================================================================= */}
      <section className="sec pt-4">
        <div className="shell">
          <div className="sechead rv">
            <div>
              <p className="micro red" style={{ marginBottom: '1.2rem' }}>
                Discourse &amp; Literature
              </p>
              <h2>Things Worth Knowing.</h2>
            </div>
            <div className="side">
              <p>
                From offline-first engineering principles to hospital audits and literary inquiries.{' '}
                <Link href="/research" className="text-[var(--red)] hover:underline">
                  Explore archives &rarr;
                </Link>
              </p>
            </div>
          </div>

          <ul className="posts">
            {/* Post 01: Engineering */}
            <li className="post rv">
              <Link href="/tech">
                <div className="cover hasimg flex items-center justify-center p-6 text-white text-center">
                  <span className="font-extrabold text-lg tracking-tight">
                    Offline-First Architecture &bull; PWA
                  </span>
                </div>
                <div className="in">
                  <p className="micro">Software Engineering &middot; 8 min</p>
                  <h3>Zero-Latency Offline Data Stores: How Kairos Eliminates Network Bottlenecks</h3>
                  <p>
                    Why relying exclusively on continuous cloud connectivity limits user reach, and
                    how client-side IndexedDB architectures unlock instant presentation capability.
                  </p>
                </div>
              </Link>
            </li>

            {/* Post 02: Research */}
            <li className="post rv">
              <Link href="/research">
                <div className="cover hasimg flex items-center justify-center p-6 text-white text-center">
                  <span className="font-extrabold text-lg tracking-tight">
                    Maternal Audits &bull; Biostatistics
                  </span>
                </div>
                <div className="in">
                  <p className="micro">Clinical Audit &middot; 12 min</p>
                  <h3>Retrospective Analysis of Maternal Outcomes in Secondary Care</h3>
                  <p>
                    Biostatistical evaluation of maternal triage accuracy, emergency caesarean
                    decision-to-delivery intervals, and neonatal outcomes in urban Lagos.
                  </p>
                </div>
              </Link>
            </li>

            {/* Post 03: Literature */}
            <li className="post rv">
              <Link href="/writing">
                <div className="cover hasimg flex items-center justify-center p-6 text-white text-center">
                  <span className="font-extrabold text-lg tracking-tight">
                    Literary Fiction &bull; The XVII-th
                  </span>
                </div>
                <div className="in">
                  <p className="micro">Literature &middot; 5 min</p>
                  <h3>The XVII-th: Exploring Human Mortality &amp; Healing Through Literature</h3>
                  <p>
                    Philosophical letter-series exploring human endurance, sovereignty, and the
                    psychological tension between fate, silence, and recovery.
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* =========================================================================
          8. BIG HIGH-INTENT CTA
         ========================================================================= */}
      <section className="big-cta bg-[var(--paper-2)]/60 border-t border-[var(--line)]">
        <div className="shell rv">
          <p className="micro red" style={{ marginBottom: '1.5rem' }}>
            Collaboration &amp; Inquiries
          </p>
          <h2>Looking to Build Resilient Software, Automations, or Health Systems?</h2>
          <p style={{ margin: '0 auto 2.5rem' }}>
            Whether you need a full-stack engineer for offline-first web applications, an automation
            architect for complex workflows, or a clinical informaticist who understands the bedside,
            let&apos;s build something exceptional.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/contact" className="btn btn-solid">
              <span>Start a conversation</span>
              <span className="ar">&rarr;</span>
            </Link>
            <a
              href="https://wa.me/2349061790548?text=Hi%20Benedict%2C%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line"
            >
              <span>WhatsApp Direct</span>
              <span className="ar">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. DARK CURVED FOOTER
         ========================================================================= */}
      <Footer />
    </>
  );
}
