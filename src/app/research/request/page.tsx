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
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce shadow-lg shadow-emerald-500/5">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">Request Dispatched</h2>
          <p className="text-xs text-[var(--red)] uppercase tracking-widest font-mono font-bold">Mail Sent to Benedict Adurosakin</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-[var(--line)] leading-relaxed text-sm text-[var(--mute)] shadow-xs">
          A prepared request for <strong className="text-[var(--ink)] font-bold">&ldquo;{selectedPaper.title}&rdquo;</strong> has been automatically emailed to Benedict. 
          He will receive your contact details and message, allowing him to reply directly to you at <span className="text-[var(--red)] font-mono underline font-bold">{email}</span>.
        </div>
        <button
          onClick={() => router.push('/research')}
          className="btn btn-red py-3 px-6 rounded-xl font-bold cursor-pointer"
        >
          <span>Return to Research Vault</span>
          <span className="ar">&rarr;</span>
        </button>
      </ScrollReveal>
    );
  }

  return (
    <div className="grid md:grid-cols-12 gap-8 items-start">
      
      {/* LEFT COLUMN: PAPER SUMMARY CARD */}
      <div className="md:col-span-4 space-y-4">
        <ScrollReveal className="w-full">
          <div className="p-6 rounded-2xl bg-white border border-[var(--line)] space-y-4 shadow-xs">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--red)] font-bold">Selected Manuscript</span>
            
            {papers.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-[var(--faint)] block font-semibold">Choose Another Paper</label>
                  <select
                    value={selectedPaper?.id || ''}
                    onChange={(e) => handlePaperSelect(e.target.value)}
                    className="w-full bg-[var(--paper)] border border-[var(--line)] rounded-lg p-2.5 outline-none text-xs text-[var(--ink)] font-semibold cursor-pointer"
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
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-mono bg-[var(--paper-2)] text-[var(--red)] border border-[var(--line)] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold inline-block">
                      {selectedPaper.theme}
                    </span>
                    <h3 className="font-extrabold text-base text-[var(--ink)] leading-snug">
                      {selectedPaper.title}
                    </h3>
                    <div className="space-y-1.5 text-xs font-mono text-[var(--mute)] leading-normal border-t border-[var(--line)] pt-3">
                      <p>Main Author: <span className="font-bold text-[var(--ink)]">{selectedPaper.authors.main}</span></p>
                      <p>Co-Author: <span className="underline text-[var(--ink)] font-bold">{selectedPaper.authors.coAuthor}</span></p>
                      <p className="truncate">School: <span className="text-[var(--ink)]">{selectedPaper.institution}</span></p>
                      <p>Published: <span className="text-[var(--ink)] font-semibold">{selectedPaper.date}</span></p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-[var(--mute)] italic font-mono">No papers loaded.</p>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* RIGHT COLUMN: REQUEST MOCK EMAIL CLIENT */}
      <div className="md:col-span-8">
        <ScrollReveal className="w-full" delay={100}>
          <form onSubmit={handleSubmit} className="p-0 overflow-hidden border border-[var(--line)] rounded-2xl bg-white shadow-sm">
            
            {/* Mock Email Title Bar */}
            <div className="bg-[var(--paper-2)] px-4 py-3 border-b border-[var(--line)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <span className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-widest ml-2 font-bold">New Message — Request Paper</span>
              </div>
              <span className="text-[9px] font-mono bg-red-500/10 text-[var(--red)] border border-red-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                AUTO-SEND ENVELOPE
              </span>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Recipient Field (Pre-set to Benedict) */}
              <div className="flex items-center gap-3 border-b border-[var(--line)] pb-3">
                <span className="font-mono text-[10px] text-[var(--mute)] w-12 shrink-0 font-bold uppercase">To:</span>
                <span className="text-xs font-mono text-[var(--ink)] bg-[var(--paper-2)] px-3 py-1 rounded-md border border-[var(--line)] font-medium">
                  Benedict Adurosakin &lt;benedictadurosakin@gmail.com&gt;
                </span>
              </div>

              {/* Subject Field (Auto generated) */}
              {selectedPaper && (
                <div className="flex items-center gap-3 border-b border-[var(--line)] pb-3">
                  <span className="font-mono text-[10px] text-[var(--mute)] w-12 shrink-0 font-bold uppercase">Subject:</span>
                  <span className="text-xs font-bold text-[var(--ink)]">
                    [Paper Request] &ldquo;{selectedPaper.title}&rdquo;
                  </span>
                </div>
              )}

              {/* Sender Details Input Fields */}
              <div className="space-y-4 bg-[var(--paper-2)] p-4 border border-[var(--line)] rounded-xl">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--mute)] block mb-2 font-bold">Requester Info (Required)</span>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)] font-bold">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Jane Smith"
                      className="w-full bg-white border border-[var(--line)] rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[var(--red)] transition-all text-xs text-[var(--ink)] font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)] font-bold">Email Address (To Reply To)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@institution.edu"
                      className="w-full bg-white border border-[var(--line)] rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[var(--red)] transition-all text-xs text-[var(--ink)] font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)] font-bold">Phone Number (Required for confirmation/follow-up)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234..."
                    className="w-full bg-white border border-[var(--line)] rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[var(--red)] transition-all text-xs text-[var(--ink)] font-medium"
                    required
                  />
                </div>
              </div>

              {/* Dynamic Email Body Editor */}
              {selectedPaper && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[var(--mute)] font-bold">Prepared Mail Body Preview</label>
                    {isMessageEdited && (
                      <button
                        type="button"
                        onClick={() => setIsMessageEdited(false)}
                        className="text-[9px] font-mono text-[var(--red)] hover:underline cursor-pointer border-none bg-transparent font-bold"
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
                    className="w-full bg-white border border-[var(--line)] rounded-lg p-4 outline-none focus:ring-1 focus:ring-[var(--red)] transition-all text-xs font-mono text-[var(--ink)] leading-relaxed shadow-inner"
                    required
                  />
                </div>
              )}

              {error && <p className="text-xs text-red-500 font-mono font-bold">{error}</p>}
              
              {showMailtoFallback && selectedPaper && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-xl space-y-3">
                  <p className="text-[11px] leading-relaxed">
                    <strong>SMTP Dispatch Notice:</strong> You can send this request directly using your device's default mail app:
                  </p>
                  <a
                    href={`mailto:benedictadurosakin@gmail.com?subject=${encodeURIComponent(
                      `[Paper Request] "${selectedPaper.title}"`
                    )}&body=${encodeURIComponent(message)}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-mono text-[9px] uppercase tracking-wider rounded-lg font-bold transition-all no-underline shadow-sm"
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
                className="w-full py-3 bg-[var(--ink)] hover:bg-[var(--red)] text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg transition-colors disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center gap-2 border-none"
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
      <header className="pt-12 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--paper-2)] border border-[var(--line)] rounded-full text-[10px] font-mono uppercase tracking-wider text-[var(--red)] font-bold mb-3">
            <i className="fa-solid fa-file-signature text-[9px]"></i>
            Direct Manuscript Access
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--ink)] tracking-tight">
            Request Research Manuscript
          </h1>
          <p className="text-xs md:text-sm text-[var(--mute)] font-mono mt-2">
            Secure request envelope connecting academic peers and clinical institutions directly to Benedict Adurosakin.
          </p>
        </div>
      </header>

      <section className="px-6 md:px-12 pb-20 flex-grow w-full max-w-7xl mx-auto">
        <Suspense fallback={
          <div className="text-center py-24">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-[var(--mute)] mb-4 block"></i>
            <p className="text-xs text-[var(--mute)] italic font-mono">Initializing library loader...</p>
          </div>
        }>
          <RequestFormContent />
        </Suspense>
      </section>

      <Footer commitMessage="paper-inbound-request" />
    </>
  );
}
