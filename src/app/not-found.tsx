'use client';

import Link from 'next/link';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto flex-grow flex flex-col justify-center items-center text-center">
        <div className="bento w-full py-16 px-8 border-t-4 border-t-cyan-500 animate-fadeIn flex flex-col items-center justify-center relative overflow-hidden shadow-2xl space-y-6">
          <div className="hero-pill-tag">
            <span className="hero-pill-dot !bg-rose-500 !shadow-rose-500"></span>
            <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px]">
              Error 404: Node Disconnected
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-white">
            Silence in the system.
          </h2>
          
          <p className="text-zinc-400 text-sm max-w-sm leading-relaxed font-serif italic">
            &ldquo;We build logic to resolve chaos, yet some routes lead only to silence. The page you seek has either vanished, or was never fated to be written.&rdquo;
          </p>

          <Link
            href="/"
            className="btn-action btn-coral !py-3 !px-8 text-xs font-mono tracking-wider"
          >
            <span>&larr; Return to Base Orbit</span>
          </Link>
        </div>
      </section>

      <Footer commitMessage="route-not-resolved" />
    </>
  );
}
