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
      {/* ── Page Header Block ── */}
      <section className="pagehead border-b border-[var(--line)] bg-[var(--paper-2)]/50">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span className="text-[var(--ink)]">Writing</span>
          </nav>

          <p className="micro red">Literature &bull; Storytelling</p>
          <h1 className="mt-3">
            Writing &amp; <em>Literature.</em>
          </h1>
          <p className="lede">
            Exploring the emotional landscapes of truth, power, silence, and human endurance through
            narrative fiction, philosophy, and reflective prose.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex-grow w-full space-y-16">
        
        {/* PHILOSOPHY */}
        <ScrollReveal className="w-full">
          <div className="bento border-l-4 border-l-amber-500 space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-600 block font-bold">
              Creative Philosophy
            </span>
            <div className="font-display text-2xl sm:text-3xl leading-relaxed italic text-[var(--ink)] font-semibold">
              &ldquo;My writing explores the depth of the human condition... I aim to capture emotion, introspection, and layered meaning in every piece, anchoring the{' '}
              <span className="text-amber-600 not-italic font-extrabold underline decoration-amber-500 underline-offset-4">
                voice of the voiceless
              </span>.&rdquo;
            </div>
            <p className="text-[var(--mute)] font-sans max-w-xl text-sm sm:text-base leading-relaxed font-medium">
              Influenced by Rainer Maria Rilke, Kahlil Gibran, and James Baldwin, my work blends mystery, moral tension, and symbolism.
            </p>
          </div>
        </ScrollReveal>

        {/* SELECTED BIBLIOGRAPHY */}
        <ScrollReveal className="w-full" delay={150}>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold">
                Catalogue
              </span>
              <div className="h-[1px] flex-grow bg-[var(--line)]"></div>
              <span className="font-mono text-[11px] text-[var(--mute)] uppercase font-bold">Selected Bibliography</span>
            </div>
            
            <div className="grid gap-6">
              {/* THE XVII-TH */}
              <div className="bento group border-l-4 border-l-amber-500 card-hover space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)]">
                    The XVII-th: Letters to the One Who Will Come
                  </h3>
                  <span className="text-[10px] font-mono border border-amber-300 bg-amber-50 text-amber-800 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                    PHILOSOPHICAL NOVEL
                  </span>
                </div>
                <p className="text-[var(--mute)] text-sm sm:text-base leading-relaxed font-normal">
                  The XVII-th is a 166-page philosophical letter-series, written by a vanished voice to the one fated to rise. It is not a guide. It is a mirror. It is a journey through silence, power, betrayal, and the burden of knowing too much, wrapped in metaphor and mystery. Each page seeks to awaken the still, sovereign self buried beneath life’s noise and injustice.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn btn-red !py-2.5 !px-5 !text-xs font-semibold cursor-pointer"
                  >
                    <span>{showPreview ? 'Hide Interactive Reader' : 'Read Excerpts'}</span>
                    <span>{showPreview ? '↑' : '↓'}</span>
                  </button>
                  <a
                    href="https://selar.com/f8e09466jy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline !py-2.5 !px-5 !text-xs font-semibold"
                  >
                    <span>Purchase Novel</span>
                    <span>↗</span>
                  </a>
                  <a
                    href="https://youtube.com/playlist?list=PLfjcuWEuElwWW02WdOkezzBR9kErb8ZO-&si=RKIB10oQ71AZOrzF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline !py-2.5 !px-5 !text-xs"
                  >
                    <span>Original Soundtrack</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* FIVE PIECES OF SAM */}
              <div className="bento group card-hover space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <h3 className="font-display font-bold text-2xl text-[var(--ink)]">
                    Five Pieces of Sam
                  </h3>
                  <span className="text-[10px] font-mono border border-[var(--line)] bg-[var(--paper-2)] text-[var(--ink)] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                    CRIME THRILLER
                  </span>
                </div>
                <p className="text-[var(--mute)] text-sm leading-relaxed font-normal">
                  A murder in Lagos. Five suspects. One chilling truth. Five Pieces of Sam by Adurosakin Benedict is the psychological thriller you won’t put down. Dive into a web of betrayal and secrets. Can you solve it before the last page?
                </p>
                <div className="pt-2">
                  <a
                    href="https://benedicta71.gumroad.com/l/gyeanz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline !py-2 !px-4 !text-xs text-violet-700 hover:border-violet-600"
                  >
                    <span>Read on Gumroad</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* THE IVORY VULTURES */}
              <div className="bento opacity-95 border-dashed border-[var(--line)] space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <h3 className="font-display font-bold text-2xl text-[var(--ink)]">
                    The Ivory Vultures
                  </h3>
                  <span className="text-[10px] font-mono bg-[var(--paper-2)] border border-[var(--line)] text-[var(--mute)] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                    IN PROGRESS
                  </span>
                </div>
                <p className="text-[var(--mute)] text-sm leading-relaxed font-normal">
                  The Ivory Vultures is a political allegory exploring the decay of a fictional nation plagued by corruption, collapsing values, and the manipulation of foreign influence. Told through betrayal, alliances, and raw emotion, it draws readers into the heart of a country teetering on the edge. This upcoming novel builds on the legacy of The XVII-th and aims to spark critical reflection about our collective future.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* BOOK PREVIEW IF TOGGLED */}
        {showPreview && (
          <div className="border-t border-[var(--line)] pt-16 animate-fadeIn space-y-12">
            <div className="text-center space-y-2">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
                The XVII-th: Interactive Reader
              </h2>
              <p className="text-xs font-mono text-[var(--mute)]">
                Interactive Preview Mode (Select chapters, search passages, or change typography themes)
              </p>
            </div>

            <div className="p-4 sm:p-8 rounded-2xl bg-white border border-[var(--line)] shadow-xl">
              <BookReader />
            </div>

            {/* Reader Reflections */}
            <div className="max-w-2xl mx-auto border-t border-[var(--line)] pt-12 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-2xl text-[var(--ink)]">Reader Reflections</h3>
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--mute)] font-bold">
                  <span>{comments.length} REVIEWS</span>
                  <span>&bull;</span>
                  <span>AVG: <span className="text-amber-600 font-bold">{averageRating}</span> / 5.0</span>
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
                    className="w-full bg-white border border-[var(--line)] rounded-xl p-3 outline-none focus:ring-1 focus:ring-[var(--red)] text-xs font-mono text-[var(--ink)]"
                  />
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-white border border-[var(--line)] rounded-xl p-3 outline-none focus:ring-1 focus:ring-[var(--red)] text-xs font-mono text-[var(--ink)] cursor-pointer"
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
                  className="w-full bg-white border border-[var(--line)] rounded-xl p-3 outline-none focus:ring-1 focus:ring-[var(--red)] text-xs font-mono text-[var(--ink)]"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-red w-full !py-3.5 font-mono text-xs uppercase tracking-widest cursor-pointer"
                >
                  Submit Reflection
                </button>
              </form>

              {/* Comments List */}
              {loadingComments ? (
                <div className="text-[var(--mute)] italic text-center py-4 font-mono text-xs">
                  Loading reflections...
                </div>
              ) : (
                <div className="space-y-4">
                  {currentComments.map((comment) => (
                    <div key={comment.id} className="bento space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-[var(--ink)] uppercase tracking-wider">
                          {comment.name}
                        </span>
                        <div className="text-amber-600 text-xs font-mono font-bold">
                          Rating: {comment.rating} / 5
                        </div>
                      </div>
                      <p className="text-sm text-[var(--mute)] italic">
                        &ldquo;{comment.text}&rdquo;
                      </p>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="mt-2 text-[10px] text-red-600 font-mono hover:underline cursor-pointer font-bold"
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
                          ? 'bg-[var(--ink)] text-white font-bold'
                          : 'bg-white border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper-2)]'
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
              <span className="font-mono text-xs uppercase tracking-widest text-violet-700 font-bold">
                Publications
              </span>
              <div className="h-[1px] flex-grow bg-[var(--line)]"></div>
              <span className="font-mono text-[11px] text-[var(--mute)] uppercase font-bold">Medium Articles Feed</span>
            </div>
            
            {loadingMedium ? (
              <div className="text-[var(--mute)] italic text-center py-10 font-mono text-xs">
                Connecting to MedSageHQ &amp; Medium RSS feed...
              </div>
            ) : mediumPosts.length === 0 ? (
              <div className="bento text-[var(--mute)] text-sm italic text-center">
                No recent articles found. Check back later or read directly on{' '}
                <a
                  href="https://medium.com/@benedictadurosakin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-[var(--ink)] hover:text-violet-700"
                >
                  Medium
                </a>.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
                {mediumPosts.map((post, idx) => (
                  <div key={idx} className="bento flex flex-col justify-between card-hover space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-[var(--mute)] font-bold">{post.pubDate}</span>
                        <span className="text-[10px] font-mono bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full text-amber-800 font-bold">
                          Medium
                        </span>
                      </div>
                      <h4 className="text-lg font-display font-bold text-[var(--ink)] mb-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-[var(--mute)] leading-relaxed font-normal">
                        {post.snippet}
                      </p>
                    </div>
                    <div className="pt-2">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-violet-700 hover:text-violet-800 font-bold flex items-center gap-1.5"
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
