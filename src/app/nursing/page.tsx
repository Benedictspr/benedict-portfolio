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
      <p>Registered Nurse with strong specialization in Clinical Informatics, Health Data Analysis, and over three years of hands-on clinical experience providing comprehensive patient care in intensive care, obstetric, medical-surgical, and emergency environments.</p>
      <p>Skilled in patient hemodynamic assessment, mechanical ventilation monitoring, medication administration, and multidisciplinary emergency response while maintaining strict adherence to clinical safety protocols and professional nursing standards.</p>
    `;
  };

  const clinicalCompetencies = [
    'Direct Patient Care & Critical Bedside Nursing',
    'Intensive Care Unit (ICU) Telemetry & Ventilator Monitoring',
    'Obstetric & Midwifery Care (Antenatal, Intrapartum, Postnatal)',
    'Hemodynamic Assessment & Patient Deterioration Recognition',
    'Emergency Resuscitation & Triage Protocol Execution',
    'Medication Administration, Blood Transfusions & IV Infusions',
    'Infection Prevention & Strict Hospital Biosecurity',
    'Electronic & Paper Health Records Management (EHR/EMR)',
    'Patient & Family Health Literacy Education',
    'Multidisciplinary Team Collaboration & Clinical Handovers',
  ];

  const clinicalExperience = [
    {
      hospital: 'R-Jolad Hospital, Lagos',
      role: 'Registered Nurse (ICU & Private Ward Rotations)',
      dates: 'April 2026 – Present',
      bullets: [
        'Rotated through the Intensive Care Unit (ICU) and Private Medical Ward, providing specialized nursing care across critical patient populations.',
        'Conduct comprehensive patient assessments, continuous arterial and cardiac telemetry monitoring, and prompt recognition of decompensation markers.',
        'Titrate critical inotrope and sedative infusions, manage invasive lines, and assist medical teams during emergency resuscitations and intubations.',
        'Maintain accurate, real-time clinical documentation in electronic and bedside flowsheet records adhering to hospital policy.',
        'Ensure rigorous infection prevention and biosecurity protocols across high-acuity suites.',
      ],
    },
    {
      hospital: 'Prince of Peace Specialist Hospital, Lagos',
      role: 'Registered Nurse (Obstetrics & Gynecology Rotations)',
      dates: 'April 2023 – April 2026',
      bullets: [
        'Delivered high-quality antenatal, intrapartum, and neonatal resuscitation care across maternity and surgical units.',
        'Assisted obstetricians during emergency caesarean sections, instrument deliveries, and post-partum hemorrhage stabilization.',
        'Administered intravenous fluid therapy, oxytocic regimens, and post-operative pain protocols with zero dosage deviations.',
        'Educated mothers on neonatal lactation, danger signs, and postpartum infection prevention.',
      ],
    },
    {
      hospital: 'Beautiful Gate Medical Centre, Lagos',
      role: 'Staff Nurse (Acute & Emergency)',
      dates: 'January 2022 – February 2023',
      bullets: [
        'Delivered direct acute bedside care including emergency wound debridement, suturing assistance, and acute trauma stabilization.',
        'Assisted physicians with minor surgeries, emergency fluid resuscitation, and triage intake sorting.',
        'Managed ward drug inventory, monitored sterile stock, and verified patient care continuity.',
      ],
    },
    {
      hospital: 'Amaslaw Homecare Services Ltd, Lagos',
      role: 'Home Health Nurse',
      dates: 'January 2021 – December 2021',
      bullets: [
        'Provided personalized nursing care for geriatric and chronic illness patients, focusing on medication adherence and mobility rehabilitation.',
        'Trained family caregivers in safe patient transfers, decubitus ulcer prevention, and emergency contact protocols.',
      ],
    },
  ];

  const educationList = [
    {
      degree: 'Bachelor of Nursing Science (BNSc)',
      school: 'Ahmadu Bello University (DLC), Zaria',
      status: 'In View (500 Level)',
      timeline: 'May 2024 – January 2027',
    },
    {
      degree: 'Health and Social Care (Dementia Care)',
      school: 'University of Derby Online Learning, UK',
      status: 'Certificate Completed',
      timeline: 'April 2026',
    },
    {
      degree: 'Diploma in Registered Nursing (RN)',
      school: 'School of Nursing, University of Ilorin Teaching Hospital',
      status: 'Licensed Registered Nurse',
      timeline: 'November 2020',
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
            <span className="text-[var(--ink)]">Clinical Practice</span>
          </nav>

          <p className="micro red">Bedside Rigor &bull; Critical Care Practice</p>
          <h1 className="mt-3">
            Critical Care Nursing &amp; <em>Clinical Accuracy.</em>
          </h1>
          <p className="lede">
            Delivering evidence-based clinical nursing care with technical precision, empathetic
            advocacy, and acute triage discipline across hospital wards and Intensive Care Units.
          </p>
        </div>
      </section>

      {/* ── Main Content Body ── */}
      <div className="shell py-16 space-y-20">

        {/* ── Stat Strip for Clinical Track Record ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white border border-[var(--line)]">
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">5+</span>
            <p className="text-xs text-[var(--mute)]">Years Acute Ward &amp; ICU Care</p>
          </div>
          <div className="space-y-1 border-l border-[var(--line)] pl-6">
            <span className="text-3xl font-extrabold text-[var(--red)] tracking-tight">100%</span>
            <p className="text-xs text-[var(--mute)]">Clinical Protocol Adherence</p>
          </div>
          <div className="space-y-1 border-l border-[var(--line)] pl-6">
            <span className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">4</span>
            <p className="text-xs text-[var(--mute)]">Hospital Rotations Managed</p>
          </div>
          <div className="space-y-1 border-l border-[var(--line)] pl-6">
            <span className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">BNSc</span>
            <p className="text-xs text-[var(--mute)]">Nursing Science Candidate</p>
          </div>
        </div>

        {/* ── Clinical Overview Narrative (Admin Editable) ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="micro red">Clinical Profile &bull; Statement</p>
            {isAdmin && (
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs font-mono text-[var(--red)] underline cursor-pointer"
              >
                {isEditingProfile ? 'Done Editing' : 'Edit Statement'}
              </button>
            )}
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[var(--line)] shadow-xs">
            {loadingProfile ? (
              <p className="text-xs font-mono text-[var(--faint)]">Loading clinical profile telemetry...</p>
            ) : (
              <div>
                <div
                  ref={profileRef}
                  contentEditable={isEditingProfile}
                  suppressContentEditableWarning
                  className={`prose max-w-none text-base text-[var(--ink)] leading-relaxed space-y-4 outline-none ${
                    isEditingProfile ? 'ring-2 ring-[var(--red)] p-2 rounded' : ''
                  }`}
                  dangerouslySetInnerHTML={{ __html: profileText }}
                />
                {isEditingProfile && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={handleSaveProfile}
                      className="btn btn-red text-xs py-1.5 px-4"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="btn btn-line text-xs py-1.5 px-4"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Clinical Experience History ── */}
        <div className="space-y-8">
          <div className="sechead mb-8">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Hospital Appointments
              </p>
              <h2>Clinical Rotations &amp; Appointments.</h2>
            </div>
            <div className="side">
              <p>
                Hands-on practice across Intensive Care Units, high-risk obstetrics, and emergency
                surgical centers.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {clinicalExperience.map((exp, idx) => (
              <div key={idx} className="wcard space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-[var(--ink)] tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-mono text-[var(--red)] font-semibold mt-0.5">
                      {exp.hospital}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--ink)] font-bold bg-[var(--paper-2)] px-3 py-1 rounded-full border border-[var(--line)] whitespace-nowrap shrink-0">
                    {exp.dates}
                  </span>
                </div>

                <ul className="space-y-2 list-none p-0 m-0">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[var(--mute)] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] shrink-0 mt-2"></span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Clinical Competencies Grid ── */}
        <div className="space-y-8">
          <div className="sechead mb-8">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Skills Matrix
              </p>
              <h2>Clinical Competencies.</h2>
            </div>
            <div className="side">
              <p>
                Core nursing proficiencies maintained under strict regulatory compliance and
                evidence-based standards.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {clinicalCompetencies.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[var(--line)] flex items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--ink)]"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--red)]"></span>
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Education & Nursing Qualifications ── */}
        <div className="space-y-6">
          <div className="sechead mb-6">
            <div>
              <p className="micro red" style={{ marginBottom: '0.8rem' }}>
                Credentials
              </p>
              <h2>Academic Degrees &amp; Licensures.</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {educationList.map((edu, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-[var(--line)] space-y-2">
                <span className="text-[10px] font-mono text-[var(--red)] font-bold bg-[var(--paper-2)] px-2.5 py-1 rounded border border-[var(--line)]">
                  {edu.status}
                </span>
                <h4 className="text-base font-extrabold text-[var(--ink)] pt-2">{edu.degree}</h4>
                <p className="text-xs text-[var(--mute)]">{edu.school}</p>
                <p className="text-[11px] font-mono text-[var(--faint)] pt-1">{edu.timeline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quote Block ── */}
        <div className="quote">
          <p className="micro text-[var(--red)]" style={{ marginBottom: '1rem' }}>
            Clinical Philosophy
          </p>
          <blockquote className="text-white">
            &ldquo;Healthcare technology is never neutral. It either empowers a nurse to catch an
            early warning sign, or it creates cognitive fatigue that compromises care. I engineer for
            the bedside.&rdquo;
          </blockquote>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-red">
              <span>Contact Benedict</span>
              <span className="ar">&rarr;</span>
            </Link>
            <Link href="/tech" className="btn btn-line">
              <span>View Tech Systems</span>
              <span className="ar">&rarr;</span>
            </Link>
          </div>
        </div>

      </div>

      <Footer commitMessage="nursing-aiby-adapted" />
    </>
  );
}
