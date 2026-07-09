'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-end mb-10">
          <h1 className="font-name italic font-medium text-4xl md:text-5xl text-zinc-950 dark:text-zinc-50">
            404: The Lost Node
          </h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-20 flex-grow w-full max-w-xl mx-auto flex flex-col justify-center items-center text-center">
        <div className="bento w-full py-16 px-8 border-t-4 border-t-zinc-400 dark:border-t-zinc-700 animate-fadeIn flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-500/5 blur-2xl rounded-full"></div>
          
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 mb-6">
            Error: PAGE_NOT_FOUND
          </div>

          <h2 className="text-3xl md:text-4xl font-name italic font-medium text-zinc-900 dark:text-zinc-100 mb-6">
            Silence in the system.
          </h2>
          
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm leading-relaxed mb-8 font-serif italic">
            "We build logic to resolve chaos, yet some routes lead only to silence. The page you seek has either vanished, or was never fated to be written."
          </p>

          <Link
            href="/"
            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          >
            ➜ Return to About Page
          </Link>
        </div>
      </section>

      <Footer commitMessage="route-not-resolved" />
    </>
  );
}
