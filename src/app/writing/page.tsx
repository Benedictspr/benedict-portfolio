'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import BookReader from '../../components/BookReader';
import { useAdmin } from '../../context/AdminContext';
import ScrollReveal from '../../components/ScrollReveal';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  snippet: string;
  creator: string;
}

interface Comment {
  id: number;
  name: string;
  text: string;
  rating: number;
  timestamp: string;
}

export default function WritingPage() {
  const { isAdmin, adminPass } = useAdmin();
  
  const [showPreview, setShowPreview] = useState(false);
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);
  const [loadingMedium, setLoadingMedium] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  
  const [reviewerName, setReviewerName] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [rating, setRating] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  useEffect(() => {
    fetch('/api/medium')
      .then((res) => res.json())
      .then((data) => {
        setMediumPosts(data.posts || []);
        setLoadingMedium(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingMedium(false);
      });

    fetchComments();
  }, []);

  const fetchComments = () => {
    setLoadingComments(true);
    fetch('/api/comments/the-xvii-th')
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoadingComments(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingComments(false);
      });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText) return;

    try {
      const res = await fetch('/api/comments/the-xvii-th', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewerName || 'Anonymous Reader',
          text: reflectionText,
          rating
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReviewerName('');
        setReflectionText('');
        setRating(5);
        fetchComments();
        alert('Reflection submitted successfully.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!confirm('Are you sure you want to delete this reflection?')) return;
    try {
      const res = await fetch(`/api/comments/the-xvii-th/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': adminPass || '',
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchComments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const averageRating = comments.length
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
    : '0.0';

  return (
    <>
      {/* Header Banner */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#161B22]/80 to-transparent">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="hero-pill-tag">
            <span className="hero-pill-dot"></span>
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
              03 / Literature &amp; Storytelling
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-300 text-[11px]">Novels, Essays &amp; Philosophical Inquiries</span>
          </div>

          <h1 className="font-serif italic font-bold text-4xl sm:text-6xl text-white tracking-tight">
            Writing &amp; Philosophical Literature
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Exploring the emotional landscapes of truth, power, silence, and human endurance through narrative fiction and clinical education.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full space-y-16">
        
        {/* PHILOSOPHY */}
        <ScrollReveal className="w-full">
          <div className="bento border-l-4 border-l-amber-500 space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400 block font-bold">
              Creative Philosophy
            </span>
            <div className="font-serif text-2xl sm:text-3xl leading-relaxed italic text-zinc-200">
              &ldquo;My writing explores the depth of the human condition... I aim to capture emotion, introspection, and layered meaning in every piece, anchoring the{' '}
              <span className="text-amber-300 not-italic font-bold font-serif underline decoration-amber-500 underline-offset-4">
                voice of the voiceless
              </span>.&rdquo;
            </div>
            <p className="text-zinc-400 font-sans max-w-xl text-sm leading-relaxed">
              Influenced by Rainer Maria Rilke, Kahlil Gibran, and James Baldwin, my work blends mystery, moral tension, and symbolism.
            </p>
          </div>
        </ScrollReveal>

        {/* SELECTED BIBLIOGRAPHY */}
        <ScrollReveal className="w-full" delay={150}>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Catalogue
              </span>
              <div className="h-[1px] flex-grow bg-white/10"></div>
              <span className="font-mono text-[11px] text-zinc-500 uppercase">Selected Bibliography</span>
            </div>
            
            <div className="grid gap-6">
              {/* THE XVII-TH */}
              <div className="bento group border-l-4 border-l-amber-500 hover:border-amber-400/40 transition duration-300 space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-white">
                    The XVII-th: Letters to the One Who Will Come
                  </h3>
                  <span className="text-[10px] font-mono border border-amber-400/40 bg-amber-400/10 text-amber-300 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    PHILOSOPHICAL NOVEL
                  </span>
                </div>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
                  The XVII-th is a 166-page philosophical letter-series, written by a vanished voice to the one fated to rise. It is not a guide. It is a mirror. It is a journey through silence, power, betrayal, and the burden of knowing too much, wrapped in metaphor and mystery. Each page seeks to awaken the still, sovereign self buried beneath life’s noise and injustice.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn-action btn-solid-dark !py-2 !px-4 !text-xs font-semibold"
                  >
                    <span>{showPreview ? 'Hide Interactive Reader' : 'Read Excerpts'}</span>
                    <span>{showPreview ? '↑' : '↓'}</span>
                  </button>
                  <a
                    href="https://selar.com/f8e09466jy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-action btn-coral !py-2 !px-4 !text-xs font-semibold"
                  >
                    <span>Purchase Novel</span>
                    <span>↗</span>
                  </a>
                  <a
                    href="https://youtube.com/playlist?list=PLfjcuWEuElwWW02WdOkezzBR9kErb8ZO-&si=RKIB10oQ71AZOrzF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-action btn-ghost-border !py-2 !px-4 !text-xs"
                  >
                    <span>Original Soundtrack</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* FIVE PIECES OF SAM */}
              <div className="bento group hover:border-white/20 transition space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <h3 className="font-serif italic font-bold text-2xl text-white">
                    Five Pieces of Sam
                  </h3>
                  <span className="text-[10px] font-mono border border-zinc-700 bg-white/5 text-zinc-400 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    CRIME THRILLER
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  A murder in Lagos. Five suspects. One chilling truth. Five Pieces of Sam by Adurosakin Benedict is the psychological thriller you won’t put down. Dive into a web of betrayal and secrets. Can you solve it before the last page?
                </p>
                <div className="pt-2">
                  <a
                    href="https://benedicta71.gumroad.com/l/gyeanz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-action btn-ghost-border !py-1.5 !px-4 !text-xs text-cyan-300 hover:border-cyan-400"
                  >
                    <span>Read on Gumroad</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* THE IVORY VULTURES */}
              <div className="bento opacity-85 border-dashed border-white/20 space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <h3 className="font-serif italic text-2xl text-zinc-400">
                    The Ivory Vultures
                  </h3>
                  <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    IN PROGRESS
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  The Ivory Vultures is a political allegory exploring the decay of a fictional nation plagued by corruption, collapsing values, and the manipulation of foreign influence. Told through betrayal, alliances, and raw emotion, it draws readers into the heart of a country teetering on the edge. This upcoming novel builds on the legacy of The XVII-th and aims to spark critical reflection about our collective future.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* BOOK PREVIEW IF TOGGLED */}
        {showPreview && (
          <div className="border-t border-white/10 pt-16 animate-fadeIn space-y-12">
            <div className="text-center space-y-2">
              <h2 className="font-serif italic text-3xl sm:text-4xl text-white">
                The XVII-th: Interactive Reader
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Interactive Preview Mode (Select chapters, search passages, or change typography themes)
              </p>
            </div>

            <div className="p-4 sm:p-8 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-2xl">
              <BookReader />
            </div>

            {/* Reader Reflections */}
            <div className="max-w-2xl mx-auto border-t border-white/10 pt-12 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-serif italic text-2xl text-white">Reader Reflections</h3>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span>{comments.length} REVIEWS</span>
                  <span>&bull;</span>
                  <span>AVG: <span className="text-amber-400 font-bold">{averageRating}</span> / 5.0</span>
                </div>
              </div>

              {/* Reflection Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 bento">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Reader Name"
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 outline-none focus:ring-1 focus:ring-amber-400 text-xs font-mono text-white"
                  />
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 outline-none focus:ring-1 focus:ring-amber-400 text-xs font-mono text-zinc-300 cursor-pointer"
                    required
                  >
                    <option value="5">Score: 5 / 5 (Transcendental)</option>
                    <option value="4">Score: 4 / 5 (Insightful)</option>
                    <option value="3">Score: 3 / 5 (Reflective)</option>
                    <option value="2">Score: 2 / 5 (Developing)</option>
                    <option value="1">Score: 1 / 5 (Silent)</option>
                  </select>
                </div>
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  rows={4}
                  placeholder="Your reflections on the text..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 outline-none focus:ring-1 focus:ring-amber-400 text-xs font-mono text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black hover:bg-zinc-200 font-mono font-bold text-xs uppercase tracking-widest rounded-lg cursor-pointer transition"
                >
                  Submit Reflection
                </button>
              </form>

              {/* Comments List */}
              {loadingComments ? (
                <div className="text-zinc-500 italic text-center py-4 font-mono text-xs">
                  Loading reflections...
                </div>
              ) : (
                <div className="space-y-4">
                  {currentComments.map((comment) => (
                    <div key={comment.id} className="bento space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {comment.name}
                        </span>
                        <div className="text-amber-400 text-xs font-mono font-bold">
                          Rating: {comment.rating} / 5
                        </div>
                      </div>
                      <p className="text-sm text-zinc-300 italic font-serif">
                        &ldquo;{comment.text}&rdquo;
                      </p>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="mt-2 text-[10px] text-red-400 font-mono hover:underline cursor-pointer"
                        >
                          DELETE REFLECTION
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 pt-6">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-8 h-8 rounded text-xs font-mono transition cursor-pointer ${
                        currentPage === idx + 1
                          ? 'bg-white text-black font-bold'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MEDIUM ARTICLES FEED */}
        <ScrollReveal className="w-full">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                Publications
              </span>
              <div className="h-[1px] flex-grow bg-white/10"></div>
              <span className="font-mono text-[11px] text-zinc-500 uppercase">Medium Articles Feed</span>
            </div>
            
            {loadingMedium ? (
              <div className="text-zinc-500 italic text-center py-10 font-mono text-xs">
                Connecting to MedSageHQ &amp; Medium RSS feed...
              </div>
            ) : mediumPosts.length === 0 ? (
              <div className="bento text-zinc-400 text-sm italic text-center">
                No recent articles found. Check back later or read directly on{' '}
                <a
                  href="https://medium.com/@benedictadurosakin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-white hover:text-cyan-400"
                >
                  Medium
                </a>.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
                {mediumPosts.map((post, idx) => (
                  <div key={idx} className="bento flex flex-col justify-between hover:border-amber-400/40 transition duration-300 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-zinc-500">{post.pubDate}</span>
                        <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-amber-400">
                          Medium
                        </span>
                      </div>
                      <h4 className="text-lg font-serif italic font-bold text-white mb-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {post.snippet}
                      </p>
                    </div>
                    <div className="pt-2">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5"
                      >
                        <span>Read Full Article</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

      </section>

      <Footer commitMessage="writing-archive-loaded" />
    </>
  );
}
