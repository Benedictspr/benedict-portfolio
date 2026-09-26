'use client';

import React from 'react';
import { useTour, TOUR_STEPS } from '../context/TourContext';
import Link from 'next/link';

export default function GuidedTour() {
  const {
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
  } = useTour();

  return (
    <>
      {/* =========================================================================
          1. WELCOME MODAL (FIRST VISIT EXPERIENCE)
         ========================================================================= */}
      {showWelcomeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-tour-title"
        >
          <div className="relative w-full max-w-lg bg-[#0D1117] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
            {/* Ambient Red Glow in background */}
            <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[#FF4A2B]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-[#FF4A2B]/10 blur-3xl pointer-events-none" />

            {/* Avatar Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#FF4A2B] shrink-0 bg-white/5 shadow-md">
                <img
                  src="/benedict.png"
                  alt="Benedict Olorunwa Adurosakin"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0D1117]"></span>
              </div>
              <div>
                <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF4A2B]">
                  Interactive Guided Tour
                </p>
                <h3 id="welcome-tour-title" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight mt-0.5">
                  Benedict O. Adurosakin
                </h3>
                <p className="text-xs text-white/60 font-mono mt-0.5">
                  SWE &bull; Critical Care RN &bull; Researcher
                </p>
              </div>
            </div>

            {/* Greeting Headline & Intro */}
            <div className="space-y-3 mb-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#FF4A2B]/10 border border-[#FF4A2B]/30 text-xs font-semibold text-[#FF4A2B]">
                Welcome to my portfolio
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                &ldquo;Hi, my name is Benedict Olorunwa Adurosakin, let me take you around.&rdquo;
              </h4>
              <p className="text-sm text-white/70 leading-relaxed">
                My work spans several distinct worlds: <strong>offline-first software engineering</strong>,{' '}
                <strong>critical care ICU nursing</strong>, and <strong>clinical research</strong>. 
                I&apos;d love to show you the key highlights of each page without you needing to hunt around.
              </p>
            </div>

            {/* Quick Tour Stops Preview */}
            <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-white/5 border border-white/10 mb-6 text-[11px] font-mono text-white/75">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A2B]"></span>
                <span>Work &amp; Tech</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A2B]"></span>
                <span>Clinical ICU</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A2B]"></span>
                <span>Research</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A2B]"></span>
                <span>Writing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A2B]"></span>
                <span>Podcasts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A2B]"></span>
                <span>Contact</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => startTour(0)}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#FF4A2B] hover:bg-[#D8330F] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Take Me Around</span>
                <span className="text-base">&rarr;</span>
              </button>
              <button
                onClick={dismissWelcome}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 hover:text-white font-semibold text-sm transition-colors cursor-pointer text-center"
              >
                Explore on My Own
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. DOCKED TOUR CONCIERGE PANEL (DURING THE TOUR)
         ========================================================================= */}
      {isOpen && !isMinimized && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] w-[calc(100%-2rem)] sm:w-[460px] max-w-full bg-[#0D1117]/95 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-6 text-white shadow-2xl transition-all duration-300 animate-slideUp"
          role="region"
          aria-label="Interactive Tour Guide"
        >
          {/* Top Bar: Progress, Tag & Controls */}
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF4A2B]/20 text-[#FF4A2B] border border-[#FF4A2B]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                {currentTourStep.badge}
              </span>
              <span className="text-xs font-mono text-white/50">
                {currentTourStep.stepNumber} of {currentTourStep.totalSteps}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMinimize}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center text-xs transition cursor-pointer"
                title="Minimize guide"
                aria-label="Minimize guide"
              >
                &minus;
              </button>
              <button
                onClick={closeTour}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center text-xs transition cursor-pointer"
                title="Exit tour"
                aria-label="Exit tour"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Guide Avatar & Step Identity */}
          <div className="flex items-start gap-3.5 mb-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#FF4A2B]/50 shrink-0 bg-white/5">
              <img
                src="/benedict.png"
                alt="Benedict Adurosakin"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
                {currentTourStep.title}
              </h4>
              <p className="text-xs text-[#FF4A2B] font-medium italic truncate">
                {currentTourStep.tagline}
              </p>
            </div>
          </div>

          {/* Step Narrative */}
          <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed mb-4">
            {currentTourStep.description}
          </p>

          {/* Key Highlights to Check on This Page */}
          <div className="space-y-2 mb-4 bg-white/5 border border-white/10 p-3 rounded-2xl">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
              Important Highlights on This Page:
            </p>
            <div className="space-y-1.5">
              {currentTourStep.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-[#FF4A2B] font-bold mt-0.5">&bull;</span>
                  <div className="flex-1">
                    <strong className="text-white font-semibold">{h.label}:</strong>{' '}
                    <span className="text-white/70">{h.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Selector Dots (Direct Navigation) */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {TOUR_STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => goToStep(idx)}
                className={`transition-all duration-200 cursor-pointer ${
                  currentStep === idx
                    ? 'w-6 h-2 rounded-full bg-[#FF4A2B]'
                    : 'w-2 h-2 rounded-full bg-white/20 hover:bg-white/40'
                }`}
                title={`Jump to ${step.title}`}
                aria-label={`Jump to step ${idx + 1}: ${step.title}`}
              />
            ))}
          </div>

          {/* Footer Controls: Back & Next */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                currentStep === 0
                  ? 'opacity-30 cursor-not-allowed text-white/40 bg-white/5'
                  : 'text-white/80 hover:text-white bg-white/10 hover:bg-white/15 cursor-pointer'
              }`}
            >
              <span>&larr;</span>
              <span>Back</span>
            </button>

            <button
              onClick={nextStep}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#FF4A2B] hover:bg-[#D8330F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <span>
                {currentStep === TOUR_STEPS.length - 1
                  ? 'Complete Tour ✓'
                  : `Next: ${currentTourStep.nextLabel || 'Continue'} →`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. MINIMIZED FLOATING CAPSULE
         ========================================================================= */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-5 right-5 z-[90] animate-fadeIn">
          <button
            onClick={toggleMinimize}
            className="flex items-center gap-3 p-2 pr-4 rounded-full bg-[#0D1117] border border-[#FF4A2B]/60 text-white shadow-2xl hover:border-[#FF4A2B] transition-all cursor-pointer group"
            aria-label="Expand Guided Tour"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FF4A2B]">
              <img
                src="/benedict.png"
                alt="Benedict"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-[#FF4A2B] uppercase font-bold tracking-wider">
                Tour Active · {currentTourStep.stepNumber}/{currentTourStep.totalSteps}
              </span>
              <span className="text-xs font-bold text-white group-hover:text-[#FF4A2B] transition-colors truncate max-w-[150px]">
                {currentTourStep.title}
              </span>
            </div>
            <span className="text-xs text-white/60 ml-1">↗</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          4. FLOATING QUICK-LAUNCHER PILL (WHEN CLOSED)
         ========================================================================= */}
      {!isOpen && !showWelcomeModal && (
        <div className="fixed bottom-5 right-5 z-[80] animate-fadeIn flex items-center gap-2.5">
          {/* Floating WhatsApp Quick Action */}
          <a
            href="https://wa.me/2349061790548?text=Hi%20Benedict%2C%20I%20am%20exploring%20your%20portfolio%20and%20wanted%20to%20reach%20out%20directly"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 no-underline shrink-0"
            title="Chat directly on WhatsApp (+234 906 179 0548)"
            aria-label="Chat on WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
          </a>

          {/* Floating Take a Tour Launcher */}
          <button
            onClick={() => startTour(0)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0D1117]/90 hover:bg-[#0D1117] backdrop-blur-md border border-white/20 hover:border-[#FF4A2B] text-white shadow-xl hover:shadow-[#FF4A2B]/20 transition-all duration-300 cursor-pointer group"
            title="Start Interactive Guided Tour"
            aria-label="Start Guided Tour"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/30 shrink-0">
              <img
                src="/benedict.png"
                alt="Benedict"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="text-xs font-bold tracking-tight group-hover:text-[#FF4A2B] transition-colors">
              Take a Tour
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF4A2B] animate-pulse"></span>
          </button>
        </div>
      )}
    </>
  );
}
