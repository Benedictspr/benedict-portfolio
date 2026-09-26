'use client';

export default function Ticker() {
  const items = [
    'Clinical Informatics',
    'Critical Care Nursing (RN)',
    'Full-Stack Engineering',
    'Kairos Scripture Engine',
    'Emergency Triage AI',
    'Clinic Automation & Telemetry',
    'Biostatistical Research',
    'Available Worldwide',
  ];

  return (
    <div className="ticker" aria-label="Expertise ticker">
      <div>
        <ul>
          {items.map((item, idx) => (
            <li key={`ticker-1-${idx}`}>{item}</li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {items.map((item, idx) => (
            <li key={`ticker-2-${idx}`}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
