'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookReader from '../../components/BookReader';
import { useAdmin } from '../../context/AdminContext';
import Link from 'next/link';
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

interface CuratedPost {
  id: number;
  title: string;
  content: string;
  image?: string;
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

  // MedSageHQ states
  const [medsagePosts, setMedsagePosts] = useState<CuratedPost[]>([]);
  const [medsageTitle, setMedsageTitle] = useState('');
  const [medsageContent, setMedsageContent] = useState('');
  const [medsageImage, setMedsageImage] = useState('');

  // DriveVirtual states
  const [drivePosts, setDrivePosts] = useState<CuratedPost[]>([]);
  const [driveTitle, setDriveTitle] = useState('');
  const [driveContent, setDriveContent] = useState('');
  const [driveImage, setDriveImage] = useState('');

  const [loadingCurated, setLoadingCurated] = useState(true);

  useEffect(() => {
    // Medium RSS feed
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
    fetchCuratedPosts();
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

  const fetchCuratedPosts = async () => {
    setLoadingCurated(true);
    try {
      const [resMedsage, resDrive] = await Promise.all([
        fetch('/api/posts/medsage'),
        fetch('/api/posts/drive'),
      ]);
      const dataMedsage = await resMedsage.json();
      const dataDrive = await resDrive.json();
      setMedsagePosts(dataMedsage.posts || []);
      setDrivePosts(dataDrive.posts || []);
      setLoadingCurated(false);
    } catch (err) {
      console.error(err);
      setLoadingCurated(false);
    }
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

  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handlePublish = async (type: 'medsage' | 'drive') => {
    let title = '';
    let content = '';
    let image = '';

    if (type === 'medsage') {
      title = medsageTitle;
      content = medsageContent;
      image = medsageImage;
    } else if (type === 'drive') {
      title = driveTitle;
      content = driveContent;
      image = driveImage;
    }

    if (!title || !content) return;

    try {
      const res = await fetch(`/api/posts/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': adminPass || '',
        },
        body: JSON.stringify({ title, content, image }),
      });
      const data = await res.json();
      if (data.success) {
        if (type === 'medsage') {
          setMedsageTitle('');
          setMedsageContent('');
          setMedsageImage('');
        } else if (type === 'drive') {
          setDriveTitle('');
          setDriveContent('');
          setDriveImage('');
        }
        fetchCuratedPosts();
        alert('Update published successfully.');
      } else {
        alert('Publish failed: ' + (data.message || 'Unauthorized'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCurated = async (type: 'medsage' | 'drive', id: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    try {
      const res = await fetch(`/api/posts/${type}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': adminPass || '',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCuratedPosts();
      } else {
        alert('Delete failed: ' + (data.message || 'Unauthorized'));
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
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-end mb-10">
          <h1 className="font-name italic font-medium text-4xl md:text-5xl text-zinc-950 dark:text-zinc-50">Writing</h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-24 flex-grow w-full space-y-20">
        
        {/* PHILOSOPHY */}
        <ScrollReveal className="w-full">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 block mb-6">Philosophy</span>
            <div className="font-author text-2xl md:text-3xl leading-relaxed italic text-zinc-700 dark:text-zinc-300">
              "My writing explores the depth of the human condition... I aim to capture emotion, introspection, and layered meaning in every piece, anchoring the{' '}
              <span className="circle-sketch not-italic font-bold text-black dark:text-white writing-circle">
                voice of the voiceless
                <svg className="circle-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M5,50 C5,20 95,20 95,50 C95,80 5,80 5,50" stroke="currentColor" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>."
            </div>
            <p className="mt-8 text-zinc-500 font-sans max-w-xl text-sm leading-relaxed">
              Influenced by Rainer Maria Rilke, Kahlil Gibran, and James Baldwin, my work blends mystery, moral tension, and symbolism.
            </p>
          </div>
        </ScrollReveal>

        {/* SELECTED BIBLIOGRAPHY */}
        <ScrollReveal className="w-full" delay={150}>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Selected Bibliography</span>
              <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
            </div>
            
            <div className="grid gap-6">
              <div className="bento group border-amber-200/50 dark:border-amber-900/25">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <h3 className="font-author text-2xl italic text-black dark:text-zinc-100">The XVII-th: Letters to the One Who Will Come</h3>
                  <span className="text-[10px] font-mono border border-amber-300 text-amber-600 px-2 py-1 rounded">PHILOSOPHICAL NOVEL</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                  The XVII-th is a 166-page philosophical letter-series, written by a vanished voice to the one fated to rise. It is not a guide. It is a mirror. It is a journey through silence, power, betrayal, and the burden of knowing too much, wrapped in metaphor and mystery. Each page seeks to awaken the still, sovereign self buried beneath life’s noise and injustice.
                </p>
                <div className="flex flex-wrap gap-6">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-[10px] font-bold border-b border-black dark:border-white pb-1 hover:text-amber-650 hover:border-amber-650 transition cursor-pointer"
                  >
                    {showPreview ? 'HIDE EXCERPTS' : 'READ EXCERPTS'}
                  </button>
                  <a href="https://selar.com/f8e09466jy" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold border-b border-black dark:border-white pb-1 hover:text-amber-655 hover:border-amber-655 transition">
                    BUY NOVEL ↗
                  </a>
                </div>
              </div>

              <div className="bento group">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <h3 className="font-author text-2xl italic text-black dark:text-zinc-100">Five Pieces of Sam</h3>
                  <span className="text-[10px] font-mono border border-zinc-300 text-zinc-500 px-2 py-1 rounded">CRIME THRILLER</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                  A murder in Lagos. Five suspects. One chilling truth. Five Pieces of Sam by Adurosakin Benedict is the psychological thriller you won’t put down. Dive into a web of betrayal and secrets. Can you solve it before the last page?
                </p>
                <div className="flex gap-6">
                  <a href="https://benedicta71.gumroad.com/l/gyeanz" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold border-b border-black dark:border-white pb-1 transition hover:text-cyan-500 hover:border-cyan-500">
                    READ NOW ↗
                  </a>
                </div>
              </div>

              <div className="bento opacity-80 border-dashed">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <h3 className="font-author text-2xl italic text-zinc-400 dark:text-zinc-500">The Ivory Vultures</h3>
                  <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">IN PROGRESS</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  The Ivory Vultures is a political allegory exploring the decay of a fictional nation plagued by corruption, collapsing values, and the manipulation of foreign influence. Told through betrayal, alliances, and raw emotion, it draws readers into the heart of a country teetering on the edge. This upcoming novel builds on the legacy of The XVII-th and aims to spark critical reflection about our collective future.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* BOOK PREVIEW IF TOGGLED */}
        {showPreview && (
          <div className="mb-20 border-t border-zinc-100 dark:border-zinc-900/50 pt-16 animate-fadeIn space-y-12">
            <h2 className="font-author text-3xl italic text-black dark:text-zinc-100">The XVII-th: Interactive Reader</h2>
            <BookReader />
            <p className="text-center text-[10px] font-mono text-zinc-400 italic">
              Interactive Preview Mode (Select pages, search text, or change layout themes)
            </p>

            <div className="max-w-xl mx-auto border-t border-zinc-100 dark:border-zinc-900/50 pt-12">
              <h3 className="font-name italic text-2xl mb-8">Reader Reflections</h3>
              
              <div className="flex gap-4 items-center mb-10 text-[10px] font-mono text-zinc-400">
                <span>{comments.length} REVIEWS</span>
                <span className="h-4 w-[1px] bg-zinc-700"></span>
                <span>AVERAGE RATING: <span className="text-amber-500">{averageRating}</span> / 5.0</span>
              </div>

              <form onSubmit={handleCommentSubmit} className="space-y-4 mb-16">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Reader Name"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-amber-500 transition-all text-sm text-black dark:text-zinc-100"
                  />
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-amber-500 transition-all text-sm text-zinc-700 dark:text-zinc-350 cursor-pointer"
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
                  placeholder="Your reflections..."
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-amber-500 transition-all text-sm text-black dark:text-zinc-100"
                  required
                />
                <button type="submit" className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg cursor-pointer">
                  Submit Reflection
                </button>
              </form>

              {loadingComments ? (
                <div className="text-zinc-500 italic text-center py-4">Loading reflections...</div>
              ) : (
                <div className="space-y-6">
                  {currentComments.map((comment) => (
                    <div key={comment.id} className="p-6 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-800 relative animate-fadeIn">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-xs uppercase tracking-widest">{comment.name}</span>
                        <div className="text-amber-500 text-[10px] font-mono font-bold">
                          Rating: {comment.rating} / 5
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">"{comment.text}"</p>
                      
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="mt-4 text-[10px] text-red-500 font-mono hover:underline cursor-pointer"
                        >
                          DELETE REFLECTION
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-8 h-8 rounded text-[10px] font-mono cursor-pointer ${
                        currentPage === idx + 1
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
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
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Medium Articles Feed</span>
              <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
            </div>
            
            {loadingMedium ? (
              <div className="text-zinc-500 italic text-center py-10">Loading writing feed...</div>
            ) : mediumPosts.length === 0 ? (
              <div className="bento text-zinc-500 text-sm italic text-center">
                No recent articles found. Check back later or read directly on{' '}
                <a href="https://medium.com/@benedictadurosakin" target="_blank" rel="noopener noreferrer" className="underline font-bold text-black dark:text-white">Medium</a>.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 animate-fadeIn">
                {mediumPosts.map((post, idx) => (
                  <div key={idx} className="bento flex flex-col justify-between h-full hover:border-zinc-400 dark:hover:border-zinc-700 transition">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-mono text-zinc-400">{post.pubDate}</span>
                        <span className="text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500">Medium</span>
                      </div>
                      <h4 className="text-lg font-semibold text-black dark:text-zinc-100 mb-3">{post.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                        {post.snippet}
                      </p>
                    </div>
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold border-b border-black dark:border-white pb-1 inline-block self-start hover:text-amber-500 hover:border-amber-500 transition-colors">
                      READ ARTICLE ↗
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* MEDSAGEHQ CONTENT ARCHIVE */}
        <ScrollReveal className="w-full">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-500 dark:text-cyan-400 font-bold">MedSageHQ Repository</span>
              <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
            </div>

            {isAdmin && (
              <div className="bento border-cyan-500/30 mb-8 animate-fadeIn">
                <h3 className="font-mono text-xs uppercase text-cyan-500 font-bold mb-4">Publish MedSageHQ Update</h3>
                <input
                  type="text"
                  value={medsageTitle}
                  onChange={(e) => setMedsageTitle(e.target.value)}
                  placeholder="Update Title"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm mb-4 text-black dark:text-zinc-105"
                />
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={medsageImage}
                    onChange={(e) => setMedsageImage(e.target.value)}
                    placeholder="Image URL"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm text-black dark:text-zinc-105"
                  />
                  <input
                    type="file"
                    onChange={async (e) => {
                      if (e.target.files?.[0]) {
                        const base64 = await handleImageUpload(e.target.files[0]);
                        setMedsageImage(base64);
                      }
                    }}
                    className="w-full bg-zinc-55 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs"
                  />
                </div>
                <textarea
                  value={medsageContent}
                  onChange={(e) => setMedsageContent(e.target.value)}
                  placeholder="Update body text (HTML supported)..."
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm h-32 mb-4 text-black dark:text-zinc-105"
                />
                <button onClick={() => handlePublish('medsage')} className="bg-cyan-600 text-white px-6 py-2 rounded-full text-xs font-bold cursor-pointer hover:bg-cyan-700 transition">
                  PUBLISH UPDATE
                </button>
              </div>
            )}

            {loadingCurated ? (
              <div className="text-zinc-500 italic text-xs">Loading repository...</div>
            ) : medsagePosts.length === 0 ? (
              <p className="text-zinc-500 text-xs italic">No updates published yet.</p>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                {medsagePosts.map((post) => (
                  <div key={post.id} className="bento border-l-4 border-l-cyan-500">
                    <h3 className="font-bold text-lg mb-2 text-black dark:text-zinc-100">{post.title}</h3>
                    <span className="text-[9px] font-mono text-zinc-400 block mb-4">{new Date(post.timestamp).toLocaleDateString()}</span>
                    {post.image && <img src={post.image} alt={post.title} className="rounded-lg mb-4 w-full h-48 object-cover border dark:border-zinc-800" />}
                    <div className="text-sm text-zinc-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
                    {isAdmin && (
                      <button onClick={() => handleDeleteCurated('medsage', post.id)} className="mt-4 text-[10px] text-red-500 font-mono hover:underline cursor-pointer">
                        DELETE ENTRY
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* DRIVEVIRTUAL FEED */}
        <ScrollReveal className="w-full">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-red-500 dark:text-red-400 font-bold">DriveVirtual Feed</span>
              <div className="h-[1px] w-full bg-zinc-200 dark:bg-zinc-900"></div>
            </div>

            {isAdmin && (
              <div className="bento border-red-500/30 mb-8 animate-fadeIn">
                <h3 className="font-mono text-xs uppercase text-red-500 font-bold mb-4">Publish DriveVirtual Update</h3>
                <input
                  type="text"
                  value={driveTitle}
                  onChange={(e) => setDriveTitle(e.target.value)}
                  placeholder="Update Title"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-red-500 transition-all text-sm mb-4 text-black dark:text-zinc-105"
                />
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={driveImage}
                    onChange={(e) => setDriveImage(e.target.value)}
                    placeholder="Image URL"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-red-500 transition-all text-sm text-black dark:text-zinc-105"
                  />
                  <input
                    type="file"
                    onChange={async (e) => {
                      if (e.target.files?.[0]) {
                        const base64 = await handleImageUpload(e.target.files[0]);
                        setDriveImage(base64);
                      }
                    }}
                    className="w-full bg-zinc-55 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs"
                  />
                </div>
                <textarea
                  value={driveContent}
                  onChange={(e) => setDriveContent(e.target.value)}
                  placeholder="Update body text (HTML supported)..."
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 outline-none focus:ring-1 focus:ring-red-500 transition-all text-sm h-32 mb-4 text-black dark:text-zinc-105"
                />
                <button onClick={() => handlePublish('drive')} className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-bold cursor-pointer hover:bg-red-700 transition">
                  PUBLISH UPDATE
                </button>
              </div>
            )}

            {loadingCurated ? (
              <div className="text-zinc-500 italic text-xs">Loading feed...</div>
            ) : drivePosts.length === 0 ? (
              <p className="text-zinc-555 text-xs italic">No updates published yet.</p>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                {drivePosts.map((post) => (
                  <div key={post.id} className="bento border-l-4 border-l-red-500">
                    <h3 className="font-bold text-lg mb-2 text-black dark:text-zinc-100">{post.title}</h3>
                    <span className="text-[9px] font-mono text-zinc-400 block mb-4">{new Date(post.timestamp).toLocaleDateString()}</span>
                    {post.image && <img src={post.image} alt={post.title} className="rounded-lg mb-4 w-full h-48 object-cover border dark:border-zinc-800" />}
                    <div className="text-sm text-zinc-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
                    {isAdmin && (
                      <button onClick={() => handleDeleteCurated('drive', post.id)} className="mt-4 text-[10px] text-red-500 font-mono hover:underline cursor-pointer">
                        DELETE ENTRY
                      </button>
                    )}
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
