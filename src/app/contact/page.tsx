'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        localStorage.setItem('last_submission_name', name);
        localStorage.setItem('last_submission_email', email);
        router.push('/contact/success');
      } else {
        setError(data.message || 'An error occurred while sending the message.');
      }
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      setError('An error occurred. Please check your connection and try again.');
    }
  };

  return (
    <>
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-end mb-10">
          <h1 className="font-script text-4xl md:text-5xl leading-none">Collaboration</h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-20 flex-grow w-full max-w-xl mx-auto">
        <div className="animate-fadeIn">
          <h2 className="text-2xl md:text-3xl font-light mb-8 leading-tight">
            Have a project in mind? <br />
            <span className="font-bold border-b-2 border-zinc-900 dark:border-white">Let’s talk.</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Benedict Adurosakin"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all text-sm text-black dark:text-zinc-100"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="benedict@example.com"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all text-sm text-black dark:text-zinc-100"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Project Details</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Describe the problem we are solving..."
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all text-sm text-black dark:text-zinc-100"
                required
                disabled={loading}
              />
            </div>

            {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'SENDING PROPOSAL...' : 'Submit Project Proposal'}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Or Reach out directly</p>
            <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-300">benedictadurosakin@gmail.com</p>
          </div>
        </div>
      </section>

      <Footer commitMessage="project-inbound" />
    </>
  );
}
