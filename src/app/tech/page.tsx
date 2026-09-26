'use client';

import Link from 'next/link';
import Footer from '../../components/Footer';

export default function TechPage() {
  const softwareHighlights = [
    {
      num: '01',
      title: 'Zero-Latency Offline Data Stores (Kairos)',
      desc: 'Complete canonical scriptures, Spurgeon morning/evening devotionals, and reading plans stored 100% locally on device via IndexedDB. Operates completely without internet in low-connectivity settings.',
      tag: 'Offline Engine · PWA',
      link: 'https://kariogram-web.onrender.com/',
    },
    {
      num: '02',
      title: 'Dynamic Canvas Typographic Scaling',
      desc: 'Custom dynamic rendering canvas engine that calculates and scales scripture typography programmatically across 1080p, 4K projector displays, and LED walls with zero distortion.',
      tag: 'Canvas Rendering Engine',
      link: 'https://kariogram-web.onrender.com/',
    },
    {
      num: '03',
      title: 'Natural Cadence Audio Narration',
      desc: 'Fluid Web Speech audio reader reciting text with natural cadence, chapter looping, and background playback for continuous contemplation.',
      tag: 'Web Audio API',
      link: 'https://kariogram-web.onrender.com/',
    },
    {
      num: '04',
      title: 'Event-Driven Workflow Automations & Pipelines',
      desc: 'Multi-agent orchestration pipelines for notification triggers, client scheduling follow-ups, and automated telemetry dispatch built with n8n and Python.',
      tag: 'Workflow Automation',
      link: '/contact',
    },
    {
      num: '05',
      title: 'Clinical Informatics & EHR Usability Research',
      desc: 'Targeted research analyzing electronic health record (EHR) interface bottlenecks and designing structured triage intake protocols to reduce documentation error.',
      tag: 'Health Systems Research',
      link: '/research',
    },
  ];

  const softwareProjects = [
    {
      title: 'Kairogram & Kairos Scripture Engine',
      category: 'Software Engineering · Android APK & PWA',
      url: 'kairogram.vercel.app',
      link: 'https://kairogram.vercel.app',
      linkText: 'APK Download Portal',
      secondaryLink: 'https://kariogram-web.onrender.com/',
      secondaryLinkText: 'Web Engine',
      desc: 'The official biblical study companion and offline scripture presentation engine. Features real-time voice-to-verse recognition for live preaching, dual-page paperback tablet reader, interlinear Greek & Hebrew concordances, and zero-latency client-side IndexedDB text search. Available as a direct Android APK download and live web PWA.',
      stack: 'Android APK · React 18 · TypeScript · Vite · IndexedDB · Web Speech API',
      external: true,
    },
    {
      title: 'Operations & Messaging Automation Pipeline',
      category: 'Workflow Automation & Telemetry',
      url: 'telemetry.pipeline.internal',
      link: '/contact',
      desc: 'Developed automated event-driven pipelines for scheduling appointment reminders, client follow-ups, billing triggers, and automated notification dispatches, eliminating manual sorting and increasing follow-up compliance.',
      stack: 'n8n Orchestration · WhatsApp Cloud API · Google Sheets · Python Webhooks',
      external: false,
    },
    {
      title: 'AI-Assisted Emergency Ward Intake Protocol',
      category: 'Clinical Informatics & AI',
      url: 'triage-intake.clinical-protocol.internal',
      link: '/contact',
      desc: 'Designed an automated patient intake and triage protocol using LLM extraction and webhook triggers. Features red-flag detection and automated clinician routing based on Manchester and ESI criteria, reducing manual sorting times by 70%.',
      stack: 'Python · n8n · OpenAI API · Webhooks · Structured JSON',
      external: false,
    },
    {
      title: 'Usability of EHR Systems in Low-Resource Care',
      category: 'Informatics Research & Ergonomics',
      url: 'research.ehr-usability.org',
      link: '/research',
      desc: 'Conducted field usability analysis on electronic health records (EHR) systems in acute clinical environments. Identified 4 key user interface friction points causing data entry errors among bedside clinicians and drafted optimization recommendations.',
      stack: 'Informatics Audit · UI Optimization · Empirical Fieldwork',
      external: false,
    },
  ];

  const techCredentials = [
    {
      title: 'AI & Automation Specialization',
      institution: 'TS Academy, Lagos',
      timeline: 'April 2026',
      status: 'Verified',
    },
    {
      title: 'Basic & Advanced Impact Analysis',
      institution: 'Global Health Learning Centre, USA',
      timeline: 'November 2025',
      status: 'Verified',
    },
    {
      title: 'Introduction to Cybersecurity',
      institution: 'Cisco Networking Academy',
      timeline: 'November 2023',
      status: 'Verified',
    },
  ];

  const technicalSkills = [
    {
      category: 'Programming & Web',
      items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'SQL', 'HTML5 / CSS3'],
    },
    {
      category: 'Frameworks & Frontend',
      items: ['Next.js', 'React', 'Tailwind CSS', 'Vite', 'Service Workers'],
    },
    {
      category: 'Automation & Backend',
      items: ['n8n Orchestration', 'FastAPI', 'Node.js', 'Webhooks', 'IndexedDB'],
    },
    {
      category: 'Data & Informatics',
      items: ['SPSS Statistics', 'FHIR Structures', 'EHR Audit', 'Linux / Docker', 'Git / GitHub'],
    },
  ];

  return (
    <>
      {/* ── Page Header Block ── */}
      <section className="pagehead border-b border-[var(--line)] bg-[var(--paper-2)]/50">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="text-[var(--ink)]">Work &amp; Tech</span>
          </nav>

          <p className="micro red">Engineering &bull; Systems Architecture</p>
          <h1 className="mt-3">
            Software Engineering &amp; <em>Technical Systems.</em>
          </h1>
          <p className="lede">
            Engineering zero-latency local-first web applications, intelligent automation pipelines,
            and specialized clinical data systems — each built with structural discipline.
          </p>
        </div>
      </section>

      {/* ── Main Content Body ── */}
      <div className="shell py-16 space-y-20">
        
        {/* Core Overview Card */}
        <div className="p-8 rounded-2xl bg-white border border-[var(--line)] space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="micro red">Technical Profile</p>
            <span className="text-xs font-mono text-[var(--faint)]">Lagos, NG &bull; Available Worldwide</span>
          </div>
          <p className="text-base text-[var(--ink)] leading-relaxed font-medium">
            I architect production software across distinct domains. On the web side, I build
            offline-first Progressive Web Applications like the Kairos Scripture Engine, where
            client-side databases (IndexedDB) and programmatic canvas scaling eliminate network lag.
            In automation, I orchestrate event-driven n8n and Python workflows. In healthcare, I
            apply clinical informatics to optimize EHR usability and emergency triage protocols.
          </p>
        </div>

        {/* ── Interactive Inverting Rows: Technical Capabilities ── */}
        <div>
          <div className="sechead mb-6">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Key Technical Capabilities
              </p>
              <h2>Systems Engineered for Zero Latency.</h2>
            </div>
            <div className="side">
              <p>
                Hover over each system to examine its architecture, design decisions, and real-world
                execution outcomes.
              </p>
            </div>
          </div>

          <div className="rows">
            {softwareHighlights.map((f) => (
              <a
                key={f.num}
                href={f.link}
                target={f.link.startsWith('http') ? '_blank' : undefined}
                rel={f.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="row"
              >
                <span className="rnum">{f.num}</span>
                <span className="rbody">
                  <span className="rtitle">{f.title}</span>
                  <span className="rdesc">{f.desc}</span>
                  <span className="inline-block mt-2 text-xs font-mono text-[var(--red)] font-semibold">
                    &bull; {f.tag}
                  </span>
                </span>
                <span className="rgo">&rarr;</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Featured Projects with Browser Mockup Frames ── */}
        <div className="space-y-8">
          <div className="sechead mb-8">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Deployed Systems
              </p>
              <h2>Production Case Studies.</h2>
            </div>
            <div className="side">
              <p>
                Verified software deployments spanning offline scripture projection engines,
                event-driven automations, and clinical systems research.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {softwareProjects.map((p, idx) => (
              <div key={idx} className="wcard flex flex-col justify-between space-y-6">
                <div>
                  <figure className="browser mb-6">
                    <div className="bchrome">
                      <span className="bdots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="burl">{p.url}</span>
                    </div>
                    <div className="bview p-6 bg-gradient-to-br from-[#0D1117] to-[#1B2028] text-white flex flex-col justify-between min-h-[160px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[var(--red)] uppercase tracking-wider font-bold">
                          {p.category}
                        </span>
                        <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                          Active
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">{p.title}</h4>
                      <p className="text-[11px] font-mono text-white/60">{p.stack}</p>
                    </div>
                  </figure>

                  <h3 className="text-xl font-extrabold text-[var(--ink)] tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--faint)]">{p.stack.split('·')[0]}</span>
                  <div className="flex items-center gap-2">
                    {p.external ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-red text-xs py-1.5 px-3.5"
                      >
                        <span>{p.linkText || 'Live App'}</span>
                        <span className="ar">&rarr;</span>
                      </a>
                    ) : (
                      <Link href={p.link} className="btn btn-solid text-xs py-1.5 px-3.5">
                        <span>View Details</span>
                        <span className="ar">&rarr;</span>
                      </Link>
                    )}
                    {p.secondaryLink && (
                      <a
                        href={p.secondaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-line text-xs py-1.5 px-3"
                      >
                        <span>{p.secondaryLinkText || 'Web'}</span>
                        <span className="ar">&rarr;</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Technical Skills Matrix ── */}
        <div className="space-y-8">
          <div className="sechead mb-8">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Competencies &bull; Stack
              </p>
              <h2>Technical Skills &amp; Tooling.</h2>
            </div>
            <div className="side">
              <p>
                Core technologies utilized across full-stack web applications, workflow
                orchestration, and clinical systems research.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSkills.map((cat, i) => (
              <div key={i} className="card-block space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)] border-b border-[var(--line)] pb-2">
                  {cat.category}
                </h4>
                <ul className="space-y-2 list-none p-0 m-0">
                  {cat.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs font-medium text-[var(--mute)] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Accreditations & Certifications ── */}
        <div className="space-y-6">
          <div className="sechead mb-6">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Verification
              </p>
              <h2>Certifications &amp; Accreditations.</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {techCredentials.map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-[var(--line)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {c.status}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--faint)]">{c.timeline}</span>
                </div>
                <h4 className="text-base font-extrabold text-[var(--ink)]">{c.title}</h4>
                <p className="text-xs text-[var(--mute)]">{c.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── High-Intent CTA Quote Block ── */}
        <div className="quote">
          <p className="micro text-[var(--red)]" style={{ marginBottom: '1rem' }}>
            Collaboration &amp; Engineering
          </p>
          <blockquote className="text-white">
            Looking to architect a zero-latency offline web application, build custom workflow
            automations, or evaluate clinical systems informatics?
          </blockquote>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-red">
              <span>Start a conversation</span>
              <span className="ar">&rarr;</span>
            </Link>
            <a
              href="mailto:benedictadurosakin@gmail.com"
              className="btn btn-line text-white border-white/40"
            >
              <span>Email Directly</span>
              <span className="ar">&rarr;</span>
            </a>
          </div>
        </div>

      </div>

      <Footer commitMessage="tech-unmixed-adapted" />
    </>
  );
}
