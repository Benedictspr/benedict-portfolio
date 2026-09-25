'use client';

import Footer from '../../components/Footer';

export default function TechPage() {
  const informaticsProjects = [
    {
      title: "Kairos",
      tag: "BIBLE PROJECTION ENGINE",
      link: "https://kariogram-web.onrender.com/",
      description: "A high-performance, offline-capable Progressive Web Application (PWA) built specifically for churches and ministries to project scripture slides with zero latency. It features an intelligent client-side database indexing books, chapters, and verses for instantaneous searches, a custom dynamic canvas engine (the 'verse-renderer' module) to scale typographic layouts programmatically for 1080p/4K displays or LED walls, and complete offline capability via Service Workers. Designed with a dual-view presenter architecture, it enables a controller console for operator search/queue operations while sending a clean, distraction-free live view to the secondary projector stream, eliminating lag and system friction.",
      stack: "React 18 · TypeScript · Vite · Tailwind CSS · Service Workers · IndexedDB · Render"
    },
    {
      title: "AI-Assisted Hospital Intake & Triage System",
      tag: "CLINICAL AUTOMATION",
      description: "Designed an automated patient intake and triage workflow using GPT and n8n. Features automated triage categorization and red-flag symptom detection, streamlining patient routing to appropriate clinical units. Reduced manual intake sorting times by approximately 70%.",
      stack: "n8n · OpenAI API · Webhooks"
    },
    {
      title: "Clinic Operations Workflow Automation",
      tag: "OPERATIONS INTELLIGENCE",
      description: "Developed automated pipelines for scheduling appointment reminders, client follow-ups, billing triggers, and automated lab-result notifications, increasing patient follow-up compliance and reducing administrator overhead.",
      stack: "n8n · WhatsApp Cloud API · Google Sheets"
    },
    {
      title: "Usability of EHR Systems in Low-Resource Tertiary Care Centers",
      tag: "INFORMATICS RESEARCH",
      description: "Conducted field usability analysis on electronic health records (EHR) systems in low-resource environments. Identified 4 key user interface friction points causing data entry errors among bedside nurses and drafted optimization recommendations.",
      stack: "Informatics Audit · UI Optimization"
    }
  ];

  const techCredentials = [
    {
      title: "AI & Automation Specialization",
      institution: "TS Academy, Lagos",
      timeline: "April 2026",
      status: "Certified"
    },
    {
      title: "Basic & Advanced Impact Analysis",
      institution: "Global Health Learning Centre, USA",
      timeline: "November 2025",
      status: "Certified"
    },
    {
      title: "Introduction to Cybersecurity",
      institution: "Cisco Networking Academy",
      timeline: "November 2023",
      status: "Certified"
    }
  ];

  const technicalSkills = [
    { category: "Languages", items: ["Python", "JavaScript (ES6+)", "TypeScript", "HTML5 / CSS3", "SQL"] },
    { category: "Frameworks & Libraries", items: ["Next.js", "React", "Tailwind CSS", "Django", "FastAPI"] },
    { category: "Informatics & Automation", items: ["n8n Workflow Automation", "SPSS Statistics", "Excel Data Analysis", "FHIR Data Structures", "API & Webhook Integrations"] },
    { category: "Infrastructure & Tools", items: ["Docker", "Git / GitHub", "Linux Systems", "PostgreSQL", "Node.js"] }
  ];

  return (
    <>
      {/* Header Banner */}
      <section className="pt-16 pb-12 px-6 lg:px-8 border-b border-white/[0.08] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            <span className="text-violet-400 font-mono text-xs font-semibold uppercase tracking-wider">
              02 / Architecture &amp; Code
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-300 text-xs font-mono">Software Engineering &amp; Clinical Informatics</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            Tech &amp; <span className="text-gradient">Clinical Informatics</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Engineering high-reliability software, hospital triage automation, and resilient data pipelines engineered to survive the friction of high-pressure healthcare environments.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex-grow w-full space-y-16">
        
        {/* TECH PROFILE */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              Overview
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Technical Profile</span>
          </div>
          <div className="bento leading-relaxed text-zinc-300 space-y-4 text-sm sm:text-base border-l-4 border-l-violet-500">
            <p>
              I am a Software Engineer and Clinical Informaticist specializing in health data analytics, digital workflow automation, and clinical systems design. I combine a deep understanding of bedside clinical processes with practical engineering skills in Python, TypeScript, and no-code automation platforms like n8n.
            </p>
            <p>
              My tech background is centered on building resilient pipelines that optimize clinic intake, secure patient data transmission, and analyze epidemiological trends. I design systems with reliability and data integrity at the forefront.
            </p>
          </div>
        </div>

        {/* CLINICAL INFORMATICS & HEALTH-TECH PROJECTS */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              Showcase
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Selected Tech &amp; Informatics Projects</span>
          </div>
          <div className="grid gap-6">
            {informaticsProjects.map((proj, idx) => (
              <div
                key={idx}
                className="bento border-l-4 border-l-violet-500 flex flex-col justify-between card-hover space-y-5"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {proj.title}
                    </h3>
                    <span className="text-[10px] font-mono bg-violet-500/15 text-violet-300 border border-violet-500/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                      {proj.tag}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">
                    {proj.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
                  <span className="text-zinc-500">{proj.stack}</span>
                  {proj.link && (
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary !py-2 !px-5 !text-xs font-semibold"
                    >
                      <span>Live App</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECHNICAL SKILLS MATRIX */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              Capabilities
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Technical Skills Matrix</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {technicalSkills.map((skill, idx) => (
              <div key={idx} className="bento space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-violet-400 font-bold">
                  {skill.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIdx) => (
                    <span 
                      key={itemIdx} 
                      className="tech-chip"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECH TRAINING & CERTIFICATIONS */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              Verified
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Tech &amp; Security Credentials</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {techCredentials.map((cred, idx) => (
              <div key={idx} className="bento flex flex-col justify-between card-hover space-y-4">
                <div>
                  <h4 className="font-display font-bold text-white text-base mb-1">{cred.title}</h4>
                  <p className="text-xs text-zinc-400">{cred.institution}</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono text-zinc-500">
                  <span>{cred.timeline}</span>
                  <a 
                    href="https://www.linkedin.com/in/benedict-adurosakin-736774398/details/certifications/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-violet-400 uppercase hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>{cred.status}</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer commitMessage="tech-pipeline-loaded" />
    </>
  );
}
