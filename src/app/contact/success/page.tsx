'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function ContactSuccessPage() {
  const router = useRouter();
  const [timestamp, setTimestamp] = useState('');
  const [details, setDetails] = useState({ name: '', email: '' });

  useEffect(() => {
    const savedName = localStorage.getItem('last_submission_name') || 'Friend';
    const savedEmail = localStorage.getItem('last_submission_email') || 'your-email@example.com';
    setDetails({ name: savedName, email: savedEmail });
    setTimestamp(new Date().toLocaleString());
  }, []);

  return (
    <>
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-end mb-10">
          <h1 className="font-name italic font-medium text-4xl md:text-5xl text-zinc-950 dark:text-zinc-50">
            Delivery Complete
          </h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-20 flex-grow w-full max-w-xl mx-auto flex flex-col justify-center items-center">
        <div className="bento w-full text-center p-8 border-t-4 border-t-cyan-500 animate-fadeIn flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full"></div>
          
          <div className="relative mb-6">
            <div className="absolute -inset-1 bg-cyan-500/30 rounded-full blur animate-pulse"></div>
            <img 
              src="/sent.gif" 
              alt="Message Sent" 
              className="relative w-28 h-28 rounded-full border border-cyan-500/40 object-cover shadow-lg" 
            />
          </div>

          <h2 className="text-2xl font-bold font-name italic text-zinc-950 dark:text-zinc-50 mb-3 tracking-wide">
            Transmission Received
          </h2>
          
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm leading-relaxed mb-6">
            Thank you, {details.name}. Your query has bypassed security buffers and has been dispatched to Benedict's inbox.
          </p>

          {/* Receipt Box */}
          <div className="w-full bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 rounded-lg p-4 mb-8 text-left font-mono text-[11px] text-zinc-400 space-y-2">
            <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-2 mb-2">
              <span className="uppercase font-bold text-zinc-500">Transaction Logs</span>
              <span className="text-cyan-500 uppercase">Success (200)</span>
            </div>
            <div className="flex justify-between">
              <span>Sender:</span>
              <span className="text-zinc-700 dark:text-zinc-300">{details.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Destination:</span>
              <span className="text-zinc-700 dark:text-zinc-300">benedictadurosakin@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="text-zinc-700 dark:text-zinc-300">{timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-emerald-500 font-bold">DISPATCHED_SMTP_SECURE</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          >
            Return to Node Home
          </button>
        </div>
      </section>

      <Footer commitMessage="mail-delivered" />
    </>
  );
}
