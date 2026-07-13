'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScrollReveal from '../../../components/ScrollReveal';

interface ResearchPaper {
  id: string;
  title: string;
  theme: string;
  institution: string;
  authors: { main: string; coAuthor: string };
  date: string;
  snippet: string;
  actionType: string;
  introduction: string;
}

function RequestFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paperId = searchParams.get('paperId');

  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isMessageEdited, setIsMessageEdited] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showMailtoFallback, setShowMailtoFallback] = useState(false);

  useEffect(() => {
    // Populate form states from local storage if available (UX polish)
    const savedName = localStorage.getItem('last_submission_name') || '';
    const savedEmail = localStorage.getItem('last_submission_email') || '';
    const savedPhone = localStorage.getItem('last_submission_phone') || '';
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);

    fetch('/api/research')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.research) {
          setPapers(data.research);
          const found = data.research.find((p: ResearchPaper) => p.id === paperId);
          if (found) {
            setSelectedPaper(found);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching papers:', err);
        setLoading(false);
      });
  }, [paperId]);

  // Update selected paper if dropdown changes
  const handlePaperSelect = (id: string) => {
    const found = papers.find((p) => p.id === id);
    if (found) {
      setSelectedPaper(found);
      setIsMessageEdited(false);
    }
  };

  // Generate the prepared email message
  const getPreparedMessage = (title: string, main: string, co: string, inst: string, uName: string, uEmail: string, uPhone: string) => {
    return `Dear Benedict Adurosakin,

I am writing to request the full text/preprint of your research paper:

Title: "${title}"
Authors: ${main} & ${co}
Institution: ${inst}

Please send a copy of the manuscript and any supporting methodology datasets to my email address at your earliest convenience.

My contact details:
- Name: ${uName || '[Your Name]'}
- Email: ${uEmail || '[Your Email]'}
- Phone Number: ${uPhone || '[Your Phone Number]'}

Thank you.

Best regards,
${uName || '[Your Name]'}`;
  };

  // Auto-generate message when inputs change (only if the user hasn't edited the textarea manually)
  useEffect(() => {
    if (!selectedPaper || isMessageEdited) return;
    const generated = getPreparedMessage(
      selectedPaper.title,
      selectedPaper.authors.main,
      selectedPaper.authors.coAuthor,
      selectedPaper.institution,
      name,
      email,
      phone
    );
    setMessage(generated);
  }, [name, email, phone, selectedPaper, isMessageEdited]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaper || !name || !email || !phone || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');
    setShowMailtoFallback(false);

    try {
      const res = await fetch('/api/research/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          paperId: selectedPaper.id,
          paperTitle: selectedPaper.title,
          message
        })
      });
      
      const data = await res.json();
      setSubmitting(false);

      if (data.success) {
        setSuccess(true);
        // Persist details for future requests
        localStorage.setItem('last_submission_name', name);
        localStorage.setItem('last_submission_email', email);
        localStorage.setItem('last_submission_phone', phone);
      } else {
        setError(data.message || 'Failed to dispatch request email. Please try again.');
        setShowMailtoFallback(true);
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setError('A network error occurred. Please check your connection.');
      setShowMailtoFallback(true);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24">
        <i className="fa-solid fa-spinner fa-spin text-2xl text-zinc-400 mb-4 block"></i>
        <p className="text-xs text-zinc-500 italic">Accessing research repository...</p>
      </div>
    );
  }

  if (success && selectedPaper) {
    return (
      <ScrollReveal className="max-w-xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce shadow-lg shadow-emerald-500/5">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-name italic text-zinc-900 dark:text-zinc-50">Request Dispatched</h2>
          <p className="text-xs text-zinc-450 uppercase tracking-widest font-mono">Mail Sent to Benedict Adurosakin</p>
        </div>
        <div className="bento leading-relaxed text-sm text-zinc-500 dark:text-zinc-400 font-light">
          A prepared request for <strong className="text-black dark:text-white font-medium">"{selectedPaper.title}"</strong> has been automatically emailed to Benedict. 
          He will receive your contact details and message, allowing him to reply directly to you at <span className="text-cyan-500 font-mono underline">{email}</span>.
        </div>
        <button
          onClick={() => router.push('/research')}
          className="bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] uppercase tracking-wider px-6 py-3.5 rounded-lg hover:opacity-90 transition font-bold cursor-pointer"
        >
          Return to Library
        </button>
      </ScrollReveal>
    );
  }

  return (
    <div className="grid md:grid-cols-12 gap-8 items-start">
      
      {/* LEFT COLUMN: PAPER SUMMARY CARD */}
      <div className="md:col-span-4 space-y-4">
        <ScrollReveal className="w-full">
          <div className="bento space-y-4 relative border-l-4 border-l-cyan-500">
            <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Selected Manuscript</span>
            
            {papers.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-zinc-450 block">Choose Another Paper</label>
                  <select
                    value={selectedPaper?.id || ''}
                    onChange={(e) => handlePaperSelect(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-2 outline-none text-xs text-black dark:text-white cursor-pointer"
                  >
                    <option value="" disabled>Select paper</option>
                    {papers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title.length > 40 ? p.title.substring(0, 40) + '...' : p.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedPaper && (
                  <div className="space-y-4 pt-2">
                    <span className="text-[8px] font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                      {selectedPaper.theme}
                    </span>
                    <h3 className="font-name italic font-bold text-base text-zinc-900 dark:text-zinc-150 leading-snug">
                      {selectedPaper.title}
                    </h3>
                    <div className="space-y-1 text-[10px] font-mono text-zinc-550 dark:text-zinc-400 leading-normal border-t border-zinc-100 dark:border-zinc-900/60 pt-3">
                      <p>Main Author: <span className="font-bold text-zinc-700 dark:text-zinc-200">{selectedPaper.authors.main}</span></p>
                      <p>Co-Author: <span className="underline">{selectedPaper.authors.coAuthor}</span></p>
                      <p className="truncate">School: {selectedPaper.institution}</p>
                      <p>Published: {selectedPaper.date}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No papers loaded.</p>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* RIGHT COLUMN: REQUEST MOCK EMAIL CLIENT */}
      <div className="md:col-span-8">
        <ScrollReveal className="w-full" delay={100}>
          <form onSubmit={handleSubmit} className="bento p-0 overflow-hidden border-zinc-250 dark:border-zinc-800/80 shadow-md">
            
            {/* Mock Email Title Bar */}
            <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                </div>
                <span className="font-mono text-[10px] text-zinc-450 uppercase tracking-widest ml-2">New Message — Request Paper</span>
              </div>
              <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                AUTO-SEND ENVELOPE
              </span>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Recipient Field (Pre-set to Benedict) */}
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-900/60 pb-3">
                <span className="font-mono text-[10px] text-zinc-400 w-12 shrink-0">To:</span>
                <span className="text-xs font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900/80 px-3 py-1 rounded-md border border-zinc-200/50 dark:border-zinc-800/50">
                  Benedict Adurosakin &lt;benedictadurosakin@gmail.com&gt;
                </span>
              </div>

              {/* Subject Field (Auto generated) */}
              {selectedPaper && (
                <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-900/60 pb-3">
                  <span className="font-mono text-[10px] text-zinc-400 w-12 shrink-0">Subject:</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    [Paper Request] "{selectedPaper.title}"
                  </span>
                </div>
              )}

              {/* Sender Details Input Fields */}
              <div className="space-y-4 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 border border-zinc-200/60 dark:border-zinc-800 rounded-xl">
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 block mb-2">Requester Info (Required)</span>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-450">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Jane Smith"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-xs text-black dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-450">Email Address (To Reply To)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@institution.edu"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-xs text-black dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-450">Phone Number (Required for confirmation/follow-up)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234..."
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-xs text-black dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Dynamic Email Body Editor */}
              {selectedPaper && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-455">Prepared Mail Body Preview</label>
                    {isMessageEdited && (
                      <button
                        type="button"
                        onClick={() => setIsMessageEdited(false)}
                        className="text-[9px] font-mono text-cyan-555 hover:underline cursor-pointer border-none bg-transparent"
                      >
                        Reset Message
                      </button>
                    )}
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setIsMessageEdited(true);
                    }}
                    rows={11}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-lg p-4 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-xs font-mono text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-inner"
                    required
                  />
                </div>
              )}

              {error && <p className="text-xs text-red-500 font-mono">{error}</p>}
              
              {showMailtoFallback && selectedPaper && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl space-y-3">
                  <p className="text-[11px] leading-relaxed">
                    <strong>SMTP Dispatch Failed:</strong> Google rejected the mail server authentication. You can send this request directly using your device's default mail app:
                  </p>
                  <a
                    href={`mailto:benedictadurosakin@gmail.com?subject=${encodeURIComponent(
                      `[Paper Request] "${selectedPaper.title}"`
                    )}&body=${encodeURIComponent(message)}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-black dark:text-white font-mono text-[9px] uppercase tracking-wider rounded-lg font-bold transition-all no-underline shadow-sm"
                  >
                    <i className="fa-solid fa-envelope"></i>
                    <span>Send via Your Email App</span>
                  </a>
                </div>
              )}

              {/* Submit / Send Action */}
              <button
                type="submit"
                disabled={submitting || !selectedPaper}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg transition-colors disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center gap-2 border-none"
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>SENDING MANUSCRIPT REQUEST...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Send Email Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </ScrollReveal>
      </div>

    </div>
  );
}

export default function RequestPage() {
  return (
    <>
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-end mb-10">
          <h1 className="font-name italic font-medium text-4xl md:text-5xl text-zinc-950 dark:text-zinc-50">
            Request Paper
          </h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-20 flex-grow w-full">
        <Suspense fallback={
          <div className="text-center py-24">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-zinc-400 mb-4 block"></i>
            <p className="text-xs text-zinc-500 italic">Initializing library loader...</p>
          </div>
        }>
          <RequestFormContent />
        </Suspense>
      </section>

      <Footer commitMessage="paper-inbound-request" />
    </>
  );
}
