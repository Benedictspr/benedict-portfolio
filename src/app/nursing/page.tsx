'use client';

import { useState, useEffect, useRef } from 'react';
import Footer from '../../components/Footer';
import { useAdmin } from '../../context/AdminContext';
import Link from 'next/link';

export default function NursingPage() {
  const { isAdmin, adminPass } = useAdmin();
  const [profileText, setProfileText] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/content/nurse')
      .then((res) => res.json())
      .then((data) => {
        setProfileText(data.content || getDefaultProfile());
        setLoadingProfile(false);
      })
      .catch((err) => {
        console.error('Profile fetch error:', err);
        setProfileText(getDefaultProfile());
        setLoadingProfile(false);
      });
  }, []);

  const handleSaveProfile = async () => {
    if (!profileRef.current) return;
    const newText = profileRef.current.innerHTML;

    try {
      const res = await fetch('/api/content/nurse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': adminPass || '',
        },
        body: JSON.stringify({ content: newText }),
      });
      const data = await res.json();
      if (data.success) {
        setProfileText(newText);
        setIsEditingProfile(false);
        alert('Profile updated successfully.');
      } else {
        alert('Failed to save changes: ' + (data.message || 'Unauthorized'));
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while saving.');
    }
  };

  const getDefaultProfile = () => {
    return `
      <p>Registered Nurse with strong specialization in Clinical Informatics, Health Data Analysis, and over three years of hands-on clinical experience providing comprehensive patient care in obstetric, medical-surgical, pediatric, and emergency settings.</p>
      <p>Skilled in patient assessment, clinical monitoring, documentation, and assisting with medical procedures while maintaining strict adherence to hospital protocols and professional nursing standards. Compassionate, detail-oriented, and effective in fast-paced clinical environments.</p>
    `;
  };

  const clinicalCompetencies = [
    "Direct Patient Care & Bedside Nursing",
    "Obstetric & Midwifery Care (Antenatal, Intrapartum, Postnatal)",
    "Patient Assessment, Monitoring & Documentation",
    "Assistance with Clinical Procedures & Treatments",
    "Medication Administration & IV Therapy",
    "Infection Prevention & Control",
    "Emergency Response & Triage",
    "Patient & Family Health Education",
    "Accurate Medical Records Management",
    "Multidisciplinary Team Collaboration"
  ];

  const clinicalExperience = [
    {
      hospital: "R-Jolad Hospital, Lagos",
      role: "Registered Nurse (ICU & Private Ward Rotations)",
      dates: "April 2026 – Present",
      bullets: [
        "Rotated through the Intensive Care Unit (ICU) and Private Ward, providing specialized nursing care across critical and general patient populations.",
        "Conduct comprehensive patient assessments, monitor vital signs, and promptly identify changes in patients' clinical conditions.",
        "Provide continuous nursing care for critically ill patients, including close monitoring, medication administration, fluid management, and documentation.",
        "Assist physicians and multidisciplinary teams during emergency interventions, clinical procedures, and patient management.",
        "Administer prescribed medications, intravenous therapies, blood products, and other treatments while adhering to safety protocols.",
        "Maintain accurate and confidential electronic and paper-based patient records in accordance with hospital policies and professional standards.",
        "Educate patients and relatives on treatment plans, medications, discharge instructions, and preventive healthcare measures.",
        "Ensure strict compliance with infection prevention and control guidelines while maintaining a safe clinical environment."
      ]
    },
    {
      hospital: "Prince of Peace Specialist Hospital, Ikorodu, Lagos",
      role: "Registered Nurse (Obstetrics & Gynecology; Rotations)",
      dates: "April 2023 – April 2026",
      bullets: [
        "Provided high-quality antenatal, intrapartum, and postnatal nursing care to women and newborns.",
        "Assisted doctors during deliveries, clinical procedures, examinations, and emergency interventions.",
        "Monitored patient vital signs, clinical progress, and treatment responses, ensuring timely reporting of abnormalities.",
        "Administered medications, IV fluids, and treatments in line with physicians’ orders.",
        "Maintained accurate, complete, and confidential patient records in compliance with hospital protocols.",
        "Educated patients and family members on maternal health, newborn care, medication adherence, and disease prevention.",
        "Ensured strict adherence to infection prevention and control guidelines."
      ]
    },
    {
      hospital: "Beautiful Gate Medical Centre, Ikorodu, Lagos",
      role: "Staff Nurse",
      dates: "January 2022 – February 2023",
      bullets: [
        "Delivered direct nursing care including patient assessment, wound care, and post-operative monitoring.",
        "Assisted doctors with minor procedures, emergency care, and patient stabilization.",
        "Administered medications and documented care accurately.",
        "Provided health education to patients and caregivers.",
        "Collaborated with the healthcare team to ensure continuity and quality of care."
      ]
    },
    {
      hospital: "Amaslaw Homecare Services Ltd, Isheri-Olofin",
      role: "Home Health Nurse",
      dates: "January 2021 – December 2021",
      bullets: [
        "Provided personalized nursing care including medication management, wound care, and monitoring of chronic conditions.",
        "Educated patients and families on home-based care and health management.",
        "Maintained detailed nursing records and communicated patient progress to supervising clinicians."
      ]
    }
  ];

  const educationList = [
    {
      degree: "Bachelor of Nursing Science (BNSc)",
      school: "Ahmadu Bello University (DLC), Zaria",
      status: "In View (500 Level)",
      timeline: "May 2024 – January 2027"
    },
    {
      degree: "Health and Social Care (Dementia Care)",
      school: "University of Derby Online Learning",
      status: "Certificate Completed",
      timeline: "April 2026"
    },
    {
      degree: "Diploma in Registered Nursing",
      school: "School of Nursing, University of Ilorin Teaching Hospital",
      status: "Registered Nurse License",
      timeline: "November 2020"
    }
  ];

  return (
    <>
      {/* Header Banner */}
      <section className="pt-16 pb-12 px-6 lg:px-8 border-b border-white/[0.08] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            <span className="text-violet-400 font-mono text-xs font-semibold uppercase tracking-wider">
              01 / Bedside Care &amp; Clinical Practice
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-300 text-xs font-mono">ICU, Obstetric &amp; Surgical Care</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            Nursing &amp; <span className="text-gradient">Clinical Care</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Delivering evidence-based clinical nursing care with technical precision, empathetic communication, and deep commitment to patient advocacy across ward and ICU environments.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex-grow w-full space-y-16">
        
        {/* PROFILE BLOCK */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              Overview
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Professional Profile</span>
          </div>
          
          {loadingProfile ? (
            <div className="bento text-zinc-500 italic text-center font-mono text-xs">
              Loading clinical profile telemetry...
            </div>
          ) : (
            <div>
              <div
                ref={profileRef}
                contentEditable={isEditingProfile}
                suppressContentEditableWarning
                className={`bento leading-relaxed text-zinc-300 space-y-6 outline-none border-l-4 border-l-violet-500 ${
                  isEditingProfile ? 'ring-2 ring-violet-400' : ''
                }`}
                dangerouslySetInnerHTML={{ __html: profileText }}
              />
              {isAdmin && (
                <div className="mt-4 flex gap-3">
                  {isEditingProfile ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold rounded-lg transition cursor-pointer"
                      >
                        SAVE PROFILE
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingProfile(false);
                          if (profileRef.current) profileRef.current.innerHTML = profileText;
                        }}
                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-mono font-bold rounded-lg transition cursor-pointer"
                      >
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold rounded-lg transition cursor-pointer"
                    >
                      EDIT PROFILE
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CLINICAL COMPETENCIES */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              Competencies
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Clinical Skills Matrix</span>
          </div>
          <div className="bento grid sm:grid-cols-2 gap-4">
            {clinicalCompetencies.map((comp, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="text-violet-400 font-bold font-mono mt-0.5">&bull;</span>
                <span className="leading-snug">{comp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION & CREDENTIALS */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-semibold">
              Academics
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Nursing Education</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {educationList.map((edu, idx) => (
              <div key={idx} className="bento flex flex-col justify-between card-hover space-y-4">
                <div>
                  <h4 className="font-display font-bold text-white text-base mb-1">{edu.degree}</h4>
                  <p className="text-xs text-zinc-400">{edu.school}</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono text-zinc-500">
                  <span>{edu.timeline}</span>
                  <span className="text-violet-400 uppercase font-semibold">{edu.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLINICAL EXPERIENCE */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              History
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Professional Clinical Experience</span>
          </div>
          <div className="space-y-6">
            {clinicalExperience.map((exp, idx) => (
              <div key={idx} className="bento border-l-4 border-l-violet-500 space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {exp.hospital}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-violet-400 mt-1 font-semibold">
                      {exp.role}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {exp.dates}
                  </span>
                </div>
                <ul className="space-y-2 pt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed list-disc list-inside">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="pl-2 -indent-4 align-top">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CLINICAL RESEARCH VAULT */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Evidence
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="font-mono text-[11px] text-zinc-500 uppercase">Clinical Research &amp; Publications</span>
          </div>
          <div className="bento flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group card-hover">
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white font-display">
                Nursing Evidence Vault
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light max-w-xl">
                Explore clinical audits, maternal health studies, vaccine uptake research, and nursing workload audits where Benedict Adurosakin serves as co-author.
              </p>
            </div>
            <Link
              href="/research"
              className="btn-primary !text-xs !py-3 !px-6 whitespace-nowrap"
            >
              <span>Enter Research Library</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

      </section>

      <Footer commitMessage="clinical-record-synced" />
    </>
  );
}
