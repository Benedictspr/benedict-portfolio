'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAdmin } from '../../context/AdminContext';
import Link from 'next/link';

interface ResearchProject {
  id: number;
  title: string;
  tag: string;
  institution: string;
  findings: string;
  author?: string;
  coauthors?: string;
  abstract?: string;
}

export default function NursingPage() {
  const { isAdmin, adminPass } = useAdmin();
  const [profileText, setProfileText] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const profileRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Form states for adding research
  const [newTitle, setNewTitle] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newInstitution, setNewInstitution] = useState('');
  const [newFindings, setNewFindings] = useState('');

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

    // Fetch research projects
    fetch('/api/research')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoadingProjects(false);
      })
      .catch((err) => {
        console.error('Research fetch error:', err);
        setLoadingProjects(false);
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

  const handleAddResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newFindings) return;

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': adminPass || '',
        },
        body: JSON.stringify({
          title: newTitle,
          tag: newTag || 'GENERAL',
          institution: newInstitution || 'INDEPENDENT',
          findings: newFindings,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => [data.project, ...prev]);
        setNewTitle('');
        setNewTag('');
        setNewInstitution('');
        setNewFindings('');
        alert('Research project registered.');
      } else {
        alert('Failed to save research: ' + (data.message || 'Unauthorized'));
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while publishing.');
    }
  };

  const handleDeleteResearch = async (id: number) => {
    try {
      const res = await fetch('/api/research', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': adminPass || '',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete: ' + (data.message || 'Unauthorized'));
      }
    } catch (err) {
      console.error(err);
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

        {/* NURSING EVIDENCE VAULT */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Nursing Evidence Vault & Studies</span>
            <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
          </div>

          {isAdmin && (
            <div className="bento border-purple-500/30 mb-8 animate-fadeIn">
              <h3 className="font-mono text-xs uppercase text-purple-500 font-bold mb-4">Register New Research Entry</h3>
              <form onSubmit={handleAddResearch} className="grid gap-4">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Research Title"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                  required
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Focus Area (e.g. MATERNAL HEALTH)"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                  />
                  <input
                    type="text"
                    value={newInstitution}
                    onChange={(e) => setNewInstitution(e.target.value)}
                    placeholder="Collaborating Institution"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                  />
                </div>
                <textarea
                  value={newFindings}
                  onChange={(e) => setNewFindings(e.target.value)}
                  placeholder="Key Abstract Findings & Results..."
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-purple-500 transition-all text-sm h-24"
                  required
                />
                <button type="submit" className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-purple-700 transition w-max">
                  PUBLISH TO REPOSITORY
                </button>
              </form>
            </div>
          )}

          {loadingProjects ? (
            <div className="text-zinc-500 italic text-xs">Loading studies...</div>
          ) : (
            <div className="space-y-6">
              {/* Default static studies */}
              <div className="bento border-l-4 border-l-purple-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded">MATERNAL HEALTH</span>
                  <span className="text-[10px] font-mono text-zinc-400">UNILAG / LUTH</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Impact of Digital Health Reminders on Antenatal Attendance in Lagos Mainland</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                  <strong>Results:</strong> Implementation of SMS-based scheduling saw a <span className="text-green-500 font-bold">24% increase</span> in clinic attendance among expectant mothers aged 18-35. Study conducted in collaboration with Dr. Olumide Adeleke.
                </p>
                <div className="flex gap-4">
                  <Link href="/contact" className="text-[10px] font-bold border-b border-black dark:border-white pb-0.5 hover:text-cyan-500 hover:border-cyan-500 transition-colors">
                    REQUEST FULL PAPER
                  </Link>
                </div>
              </div>

              <div className="bento border-l-4 border-l-purple-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 px-2 py-1 rounded">INFECTIOUS DISEASE</span>
                  <span className="text-[10px] font-mono text-zinc-400">LASUCOM</span>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Correlation Between Nurse-to-Patient Ratios and Post-Operative Infection Rates</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                  <strong>Key Finding:</strong> Wards with a ratio higher than 1:8 showed a <span className="text-red-500 font-bold">15% spike</span> in surgical site infections. Lead Researcher: Adurosakin B., Co-author: Nurse Chiamaka Okoro.
                </p>
                <div className="flex gap-4">
                  <Link href="/contact" className="text-[10px] font-bold border-b border-black dark:border-white pb-0.5 hover:text-cyan-500 hover:border-cyan-500 transition-colors">
                    METHODOLOGY DATA
                  </Link>
                </div>
              </div>

              {/* Dynamic studies */}
              {projects.map((proj) => (
                <div key={proj.id} className="bento border-l-4 border-l-purple-500 animate-fadeIn">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-2 py-1 rounded uppercase">{proj.tag}</span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{proj.institution}</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">{proj.title}</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 leading-relaxed">{proj.findings}</p>
                  <div className="flex justify-between items-center">
                    <Link href="/contact" className="text-[10px] font-bold border-b border-black dark:border-white pb-0.5 hover:text-cyan-500 hover:border-cyan-500 transition-colors">
                      REQUEST FULL PAPER
                    </Link>
                    {isAdmin && (
                      <button onClick={() => handleDeleteResearch(proj.id)} className="text-[10px] text-red-500 font-mono hover:underline cursor-pointer">
                        DELETE ENTRY
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

      <Footer commitMessage="clinical-record-synced" />
    </>
  );
}
