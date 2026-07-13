'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAdmin } from '../../context/AdminContext';
import Link from 'next/link';

interface ResearchProject {
  id: number;
  title: string;
  tag?: string;
  category?: string;
  institution?: string;
  location?: string;
  findings?: string;
  abstract?: string;
  author?: string;
  coauthors?: string;
  linkText?: string;
  link?: string;
}

export default function NursingPage() {
  const { isAdmin, adminPass } = useAdmin();
  const [profileText, setProfileText] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const profileRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    // Fetch profile content
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
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-name italic font-medium text-4xl md:text-5xl text-zinc-950 dark:text-zinc-50">Nursing</h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-24 flex-grow w-full space-y-20">
        
        {/* PROFILE BLOCK */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Professional Profile</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          
          {loadingProfile ? (
            <div className="bento text-zinc-500 italic text-center">Loading profile...</div>
          ) : (
            <div>
              <div
                ref={profileRef}
                contentEditable={isEditingProfile}
                suppressContentEditableWarning
                className={`bento leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-6 outline-none ${
                  isEditingProfile ? 'ring-2 ring-cyan-500 dark:ring-purple-500' : ''
                }`}
                dangerouslySetInnerHTML={{ __html: profileText }}
              />
              {isAdmin && (
                <div className="mt-4 flex gap-4">
                  {isEditingProfile ? (
                    <>
                      <button onClick={handleSaveProfile} className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-md hover:bg-green-700 transition cursor-pointer">
                        SAVE PROFILE
                      </button>
                      <button onClick={() => { setIsEditingProfile(false); if (profileRef.current) profileRef.current.innerHTML = profileText; }} className="px-4 py-2 bg-zinc-500 text-white text-xs font-bold rounded-md hover:bg-zinc-600 transition cursor-pointer">
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditingProfile(true)} className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-md hover:opacity-90 transition cursor-pointer">
                      EDIT PROFILE
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CLINICAL COMPETENCIES */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Clinical Competencies</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          <div className="bento grid sm:grid-cols-2 gap-4">
            {clinicalCompetencies.map((comp, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-zinc-650 dark:text-zinc-350">
                <span className="text-cyan-500 font-bold font-mono mt-0.5">•</span>
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION & CREDENTIALS */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Nursing Education</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {educationList.map((edu, idx) => (
              <div key={idx} className="bento flex flex-col justify-between hover:border-zinc-450 dark:hover:border-zinc-750 transition duration-200">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{edu.degree}</h4>
                  </div>
                  <p className="text-xs text-zinc-500">{edu.school}</p>
                </div>
                <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800/80 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>{edu.timeline}</span>
                  <span className="text-cyan-500 uppercase">{edu.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLINICAL EXPERIENCE */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Professional Clinical Experience</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          <div className="space-y-6">
            {clinicalExperience.map((exp, idx) => (
              <div key={idx} className="bento border-l-4 border-l-cyan-500">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{exp.hospital}</h3>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">{exp.role}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 mt-1">{exp.dates}</span>
                </div>
                <ul className="space-y-2 mt-4 text-xs md:text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed list-disc list-inside">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="pl-2 -indent-4 align-top">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CLINICAL RESEARCH VAULT */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Clinical Research & Publications</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>
          <div className="bento flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-cyan-500/30 transition-all duration-300">
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-name italic">Nursing Evidence Vault</h4>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed font-light max-w-xl">
                Explore clinical audits, maternal health studies, vaccine uptake research, and nursing workload audits where Benedict Adurosakin serves as co-author.
              </p>
            </div>
            <Link href="/research" className="bg-zinc-900 dark:bg-white text-white dark:text-black font-mono text-[9px] uppercase tracking-wider px-5 py-3 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors font-bold whitespace-nowrap cursor-pointer">
              Enter Research Library ➜
            </Link>
          </div>
        </div>

      </section>

      <Footer commitMessage="clinical-record-synced" />
    </>
  );
}
