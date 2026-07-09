'use client';

import Navbar from '../../components/Navbar';
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
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-name italic font-medium text-4xl md:text-5xl text-zinc-950 dark:text-zinc-50">Tech</h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-24 flex-grow w-full space-y-20">
        
        {/* TECH PROFILE */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Technical Profile</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          <div className="bento leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-6">
            <p>
              I am a Software Engineer and Clinical Informaticist specializing in health data analytics, digital workflow automation, and clinical systems design. I combine a deep understanding of bedside clinical processes with practical engineering skills in Python, TypeScript, and no-code automation platforms like n8n.
            </p>
            <p>
              My tech background is centered on building resilient pipelines that optimize clinic intake, secure patient data transmission, and analyze epidemiological trends. I design systems with reliability and data integrity at the forefront.
            </p>
          </div>
        </div>

        {/* CLINICAL INFORMATICS & HEALTH-TECH PROJECTS */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Selected Tech & Informatics Projects</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          <div className="space-y-6">
            {informaticsProjects.map((proj, idx) => (
              <div key={idx} className="bento border-l-4 border-l-purple-500 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-300">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{proj.title}</h3>
                    <span className="text-[9px] font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-2 py-0.5 rounded whitespace-nowrap">{proj.tag}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-3 leading-relaxed">{proj.description}</p>
                </div>
                <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800/80 pt-3 flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">{proj.stack}</span>
                  {proj.link && (
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="border-b text-zinc-850 dark:text-zinc-200 hover:text-purple-500 hover:border-purple-500 transition-colors"
                    >
                      LIVE APP ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECHNICAL SKILLS MATRIX */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Technical Skills & Expertise</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {technicalSkills.map((skill, idx) => (
              <div key={idx} className="bento">
                <h4 className="font-bold font-mono text-[11px] uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">{skill.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIdx) => (
                    <span 
                      key={itemIdx} 
                      className="text-xs font-mono bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-250 dark:border-zinc-800 text-zinc-650 dark:text-zinc-350 px-2.5 py-1 rounded"
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
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Tech & Security Credentials</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {techCredentials.map((cred, idx) => (
              <div key={idx} className="bento flex flex-col justify-between hover:border-zinc-450 dark:hover:border-zinc-750 transition duration-200">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mb-1">{cred.title}</h4>
                  <p className="text-xs text-zinc-500">{cred.institution}</p>
                </div>
                <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800/80 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>{cred.timeline}</span>
                  <a 
                    href="https://www.linkedin.com/in/benedict-adurosakin-736774398/details/certifications/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-purple-500 uppercase hover:underline"
                  >
                    {cred.status} ↗
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
