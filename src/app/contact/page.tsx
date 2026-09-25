'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      {/* Header Banner */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#161B22]/80 to-transparent">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="hero-pill-tag">
            <span className="hero-pill-dot"></span>
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">
              06 / Direct Channel
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-300 text-[11px]">Consulting, Engineering &amp; Collaborations</span>
          </div>

          <h1 className="font-serif italic font-bold text-4xl sm:text-6xl text-white tracking-tight">
            Collaboration &amp; Inquiries
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Have a project in mind, a clinical informatics consultation, or a health-tech platform to build? Let&apos;s start the conversation.
          </p>
        </div>
      </section>

      {/* Main Content Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="bento border-white/15 p-6 sm:p-10 space-y-8 animate-fadeIn shadow-2xl">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Project Brief
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">
              Have a project in mind? Let&apos;s talk.
            </h2>
            <p className="text-xs text-zinc-400">
              Fill in your details below and I will respond promptly with feasibility and technical notes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Benedict Adurosakin"
                className="w-full bg-zinc-900/90 border border-white/10 rounded-xl p-4 outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans transition"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="benedict@example.com"
                className="w-full bg-zinc-900/90 border border-white/10 rounded-xl p-4 outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans transition"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">
                Project Scope &amp; Requirements
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Describe your goals, requirements, timeline, and how we can collaborate..."
                className="w-full bg-zinc-900/90 border border-white/10 rounded-xl p-4 outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans transition"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 font-mono bg-red-950/40 p-3 rounded-lg border border-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-action btn-coral w-full !py-4 font-mono font-bold text-xs uppercase tracking-widest cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'SENDING INQUIRY...' : 'Submit Project Proposal'}</span>
              <span>&rarr;</span>
            </button>
          </form>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div>
              Direct Email: <a href="mailto:benedictadurosakin@gmail.com" className="text-white hover:text-cyan-400 transition font-bold">benedictadurosakin@gmail.com</a>
            </div>
            <div>
              Response time: <span className="text-emerald-400 font-semibold">&lt; 24 Hours</span>
            </div>
          </div>
        </div>
      </section>

      <Footer commitMessage="project-inbound" />
    </>
  );
}
