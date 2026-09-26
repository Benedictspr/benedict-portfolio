'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
      {/* ── Page Header Block ── */}
      <section className="pagehead border-b border-[var(--line)] bg-[var(--paper-2)]/50">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="text-[var(--ink)]">Contact</span>
          </nav>

          <p className="micro red">Direct Channel &bull; Collaboration</p>
          <h1 className="mt-3">
            Start a Conversation &amp; <em>Work Together.</em>
          </h1>
          <p className="lede">
            Have a project in mind, a clinical informatics consultation, or a health-tech platform
            to build? Fill out the brief below or reach out directly.
          </p>
        </div>
      </section>

      {/* ── Main Content Body ── */}
      <div className="shell py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info & Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-block space-y-4">
              <p className="micro red">Direct Response</p>
              <h2 className="text-2xl font-extrabold text-[var(--ink)] tracking-tight">
                Let&apos;s Build Systems That Matter.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed font-normal">
                Whether you need a specialized clinical informatics assessment, local-first web
                application architecture, or hospital telemetry engineering, I respond promptly with
                technical feasibility notes and next steps.
              </p>

              <div className="pt-4 border-t border-[var(--line)] space-y-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)] font-extrabold block mb-1">
                    Direct Email
                  </span>
                  <a
                    href="mailto:benedictadurosakin@gmail.com"
                    className="text-sm font-bold text-[var(--ink)] hover:text-[var(--red)] transition-colors"
                  >
                    benedictadurosakin@gmail.com
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)] font-extrabold block mb-1">
                    Instant Messaging
                  </span>
                  <a
                    href="https://wa.me/2349061790548?text=Hi%20Benedict%2C%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[var(--red)] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Message via WhatsApp Direct</span>
                    <span>&rarr;</span>
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)] font-extrabold block mb-1">
                    Base Location
                  </span>
                  <p className="text-xs text-[var(--ink)] font-medium m-0">
                    Lagos, Nigeria &bull; Available for remote engagements worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Availability Badge */}
            <div className="p-4 rounded-xl bg-white border border-[var(--line)] flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <div>
                <p className="text-xs font-bold text-[var(--ink)] m-0">Status: Available</p>
                <p className="text-[11px] text-[var(--faint)] m-0">
                  Accepting new consulting &amp; engineering contracts
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="card-block space-y-6">
              <div>
                <p className="micro red" style={{ marginBottom: '0.4rem' }}>
                  Project Intake
                </p>
                <h3 className="text-xl font-extrabold text-[var(--ink)] tracking-tight">
                  Send a Detailed Brief
                </h3>
              </div>

              {error && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--ink)]">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Sarah Jenkins"
                    className="w-full text-sm"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--ink)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@institution.org"
                    className="w-full text-sm"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--ink)]">
                    Project Scope / Inquiry
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your health-tech project, clinical triage requirements, or engineering timeline..."
                    className="w-full text-sm"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-solid w-full sm:w-auto"
                  >
                    <span>{loading ? 'Transmitting Brief...' : 'Send Message'}</span>
                    <span className="ar">&rarr;</span>
                  </button>

                  <span className="text-[11px] font-mono text-[var(--faint)] hidden sm:inline-block">
                    Confidential &bull; Zero Spam
                  </span>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      <Footer commitMessage="contact-aiby-adapted" />
    </>
  );
}
