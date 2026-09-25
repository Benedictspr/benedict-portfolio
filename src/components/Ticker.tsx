'use client';

export default function Ticker() {
  const items = [
    'Registered Nurse (RN) & Clinical Care Specialist',
    'Full-Stack Software Engineer',
    'Clinical Informatics & FHIR Architecture',
    'Creator of Kairos Scripture Projection Engine',
    'AI-Assisted Ward Triage & Clinic Automations',
    'n8n & Multi-Agent Workflow Engineering',
    'Author of "The XVII-th"',
    'Host of Hustle Truth Series Podcast',
    'Maternal Health & Biostatistical Research',
    'Available for High-Impact Roles Worldwide',
  ];

  return (
    <div className="relative w-full bg-[#0D1117] text-[#F6F4F1] border-b border-white/10 overflow-hidden py-2.5 text-[11px] font-mono tracking-wider select-none z-30">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        <ul className="flex items-center gap-8 list-none m-0 p-0 pr-8">
          {items.map((item, index) => (
            <li key={`tick-1-${index}`} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-zinc-300 font-medium whitespace-nowrap">{item}</span>
            </li>
          ))}
        </ul>
        <ul aria-hidden="true" className="flex items-center gap-8 list-none m-0 p-0 pr-8">
          {items.map((item, index) => (
            <li key={`tick-2-${index}`} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span className="text-zinc-300 font-medium whitespace-nowrap">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
