'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface TourStepHighlight {
  label: string;
  detail: string;
  icon?: string;
}

export interface TourStep {
  id: string;
  stepNumber: number;
  totalSteps: number;
  title: string;
  badge: string;
  path: string;
  tagline: string;
  description: string;
  highlights: TourStepHighlight[];
  nextLabel?: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    stepNumber: 1,
    totalSteps: 7,
    title: 'Introduction & Overview',
    badge: 'Stop 01 · Home Overview',
    path: '/',
    tagline: 'Hi, my name is Benedict Olorunwa Adurosakin, let me take you around.',
    description:
      'I operate at the intersection of high-acuity healthcare and resilient software engineering. Each craft stands firmly on its own merits with architectural precision and zero tolerance for lag.',
    highlights: [
      {
        label: 'Full-Stack Software',
        detail: 'Offline-first PWAs, client-side IndexedDB architectures, and zero-latency presentation software.',
      },
      {
        label: 'Acute ICU Bedside Care',
        detail: 'Licensed Registered Nurse managing ICU mechanical ventilators, invasive lines, and resuscitations.',
      },
      {
        label: 'Clinical Informatics & Research',
        detail: 'Author of 7 published health audits on maternal care, infection control, and EHR usability.',
      },
    ],
    nextLabel: 'Explore Work & Tech',
  },
  {
    id: 'tech',
    stepNumber: 2,
    totalSteps: 7,
    title: 'Work & Tech Systems',
    badge: 'Stop 02 · Engineering',
    path: '/tech',
    tagline: 'Where algorithms meet zero-latency offline performance.',
    description:
      'On this page, explore my production software architectures, multi-agent automations, and clinical intake algorithms built for high-stakes environments.',
    highlights: [
      {
        label: 'Kairogram & APK Portal',
        detail: 'Official biblical study companion & sermon listener with Android APK download portal at kairogram.vercel.app and offline PWA.',
      },
      {
        label: 'Workflow Telemetry & Automations',
        detail: 'Event-driven n8n multi-agent pipelines, WhatsApp automated telemetry, and Python webhook integrations.',
      },
      {
        label: 'AI Emergency Triage Protocol',
        detail: 'Manchester & ESI-validated structured symptom extraction protocol routing emergency room admissions.',
      },
    ],
    nextLabel: 'Explore Clinical Practice',
  },
  {
    id: 'nursing',
    stepNumber: 3,
    totalSteps: 7,
    title: 'Clinical Practice (RN)',
    badge: 'Stop 03 · Bedside ICU',
    path: '/nursing',
    tagline: 'Direct clinical practice in high-acuity hospital wards.',
    description:
      'This page documents my active clinical practice as a licensed Registered Nurse (RN), specializing in Intensive Care Unit (ICU) telemetry, mechanical ventilation, and emergency resuscitation.',
    highlights: [
      {
        label: 'ICU & Ventilator Care',
        detail: 'Bedside management of invasive arterial lines, central venous lines, and critical inotrope titrations at R-Jolad Hospital.',
      },
      {
        label: 'Obstetrics & Surgical Delivery',
        detail: 'Comprehensive antenatal, intrapartum, and neonatal resuscitation care at Prince of Peace Specialist Hospital.',
      },
      {
        label: 'Clinical Competencies',
        detail: 'Acute patient deterioration recognition, emergency triage execution, and hospital biosecurity adherence.',
      },
    ],
    nextLabel: 'Explore Research & Audits',
  },
  {
    id: 'research',
    stepNumber: 4,
    totalSteps: 7,
    title: 'Research & Health Audits',
    badge: 'Stop 04 · Biostatistics',
    path: '/research',
    tagline: 'Transforming clinical observation into reproducible data models.',
    description:
      'Review my empirical health systems research, biostatistical audits across Nigerian tertiary/secondary facilities, and submit research collaboration requests.',
    highlights: [
      {
        label: '7 Published Studies',
        detail: 'Retrospective audits on maternal triage accuracy, emergency caesarean decision-to-delivery intervals, and neonate survival.',
      },
      {
        label: 'EHR Usability Audits',
        detail: 'Empirical research identifying user-interface friction points in electronic medical records that compromise clinician response times.',
      },
      {
        label: 'Data Request Protocol',
        detail: 'Direct intake pipeline to request research data collaborations and biostatistical methodology support.',
      },
    ],
    nextLabel: 'Explore Writing & Literature',
  },
  {
    id: 'writing',
    stepNumber: 5,
    totalSteps: 7,
    title: 'Writing & The XVII-th',
    badge: 'Stop 05 · Literature',
    path: '/writing',
    tagline: 'Human endurance, sovereignty, and the art of recovery.',
    description:
      'Enter my literary world centered around "The XVII-th: Letters to the One Who Will Come", an atmospheric philosophical novel exploring human mortality and resilience.',
    highlights: [
      {
        label: 'The XVII-th Novel',
        detail: '166-page philosophical epistolary novel exploring sovereignty, existential endurance, and healing.',
      },
      {
        label: 'Original Soundtrack Score',
        detail: 'Accompanying ambient musical soundscape designed to immerse readers in the philosophical tone.',
      },
      {
        label: 'Reader Critiques & Reviews',
        detail: 'Interactive reader discussion and commentary exploring the themes of memory and inner strength.',
      },
    ],
    nextLabel: 'Explore Podcasts',
  },
  {
    id: 'podcasts',
    stepNumber: 6,
    totalSteps: 7,
    title: 'Hustle Truth Series',
    badge: 'Stop 06 · Podcasts',
    path: '/podcasts',
    tagline: 'Discipline, resilience, and unvarnished career focus.',
    description:
      'Listen to the "Hustle Truth Series" podcast — daily audio reflections breaking down psychological resilience, work ethic, and navigating demanding career intersections.',
    highlights: [
      {
        label: 'Streamable Episodes',
        detail: 'Embedded in-browser audio player with timestamps, key takeaways, and comprehensive episode notes.',
      },
      {
        label: 'Mindset & Execution',
        detail: 'Unvarnished reflections on avoiding burnout, developing high-agency thinking, and continuous craftsmanship.',
      },
      {
        label: 'Listener Engagement',
        detail: 'Comment sections enabling direct discourse and questions with the listener community.',
      },
    ],
    nextLabel: 'Connect & Inquiries',
  },
  {
    id: 'contact',
    stepNumber: 7,
    totalSteps: 7,
    title: 'Connect & Collaborate',
    badge: 'Stop 07 · Contact',
    path: '/contact',
    tagline: "Let's build something resilient together.",
    description:
      'Ready to discuss an offline-first web project, automated clinic pipeline, clinical informatics research, or advisory role? Reach out directly.',
    highlights: [
      {
        label: 'Direct WhatsApp Line',
        detail: 'Instant direct messaging channel for high-priority inquiries and rapid technical consultations.',
      },
      {
        label: 'Project Scoping Form',
        detail: 'Structured intake form to specify requirements, timelines, and architectural constraints.',
      },
      {
        label: 'Global Remote Availability',
        detail: 'Open for international engineering roles, health-tech advisory, and independent consulting.',
      },
    ],
    nextLabel: 'Complete Tour',
  },
];

interface TourContextType {
  isOpen: boolean;
  isMinimized: boolean;
  showWelcomeModal: boolean;
  currentStep: number;
  currentTourStep: TourStep;
  startTour: (stepIndex?: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  closeTour: () => void;
  toggleMinimize: () => void;
  dismissWelcome: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Check localStorage on initial visit
  useEffect(() => {
    try {
      const hasSeenTour = localStorage.getItem('benedict_tour_shown_v1');
      if (!hasSeenTour) {
        // Wait 1.2 seconds after initial load so the visitor sees the page first
        const timer = setTimeout(() => {
          setShowWelcomeModal(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  }, []);

  const startTour = (stepIndex?: number) => {
    const targetIdx = typeof stepIndex === 'number' ? stepIndex : 0;
    setCurrentStep(targetIdx);
    setIsOpen(true);
    setIsMinimized(false);
    setShowWelcomeModal(false);

    try {
      localStorage.setItem('benedict_tour_shown_v1', 'true');
    } catch (e) {
      console.warn(e);
    }

    const targetStep = TOUR_STEPS[targetIdx];
    if (targetStep && pathname !== targetStep.path) {
      router.push(targetStep.path);
    }
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const nextIdx = currentStep + 1;
      setCurrentStep(nextIdx);
      const targetStep = TOUR_STEPS[nextIdx];
      if (targetStep && pathname !== targetStep.path) {
        router.push(targetStep.path);
      }
    } else {
      // Tour completed
      setIsOpen(false);
      try {
        localStorage.setItem('benedict_tour_shown_v1', 'true');
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevIdx = currentStep - 1;
      setCurrentStep(prevIdx);
      const targetStep = TOUR_STEPS[prevIdx];
      if (targetStep && pathname !== targetStep.path) {
        router.push(targetStep.path);
      }
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < TOUR_STEPS.length) {
      setCurrentStep(index);
      setIsOpen(true);
      setIsMinimized(false);
      const targetStep = TOUR_STEPS[index];
      if (targetStep && pathname !== targetStep.path) {
        router.push(targetStep.path);
      }
    }
  };

  const closeTour = () => {
    setIsOpen(false);
    try {
      localStorage.setItem('benedict_tour_shown_v1', 'true');
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const dismissWelcome = () => {
    setShowWelcomeModal(false);
    try {
      localStorage.setItem('benedict_tour_shown_v1', 'true');
    } catch (e) {
      console.warn(e);
    }
  };

  const currentTourStep = TOUR_STEPS[currentStep] || TOUR_STEPS[0];

  return (
    <TourContext.Provider
      value={{
        isOpen,
        isMinimized,
        showWelcomeModal,
        currentStep,
        currentTourStep,
        startTour,
        nextStep,
        prevStep,
        goToStep,
        closeTour,
        toggleMinimize,
        dismissWelcome,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
