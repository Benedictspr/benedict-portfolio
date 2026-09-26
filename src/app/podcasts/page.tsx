'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';
import ScrollReveal from '../../components/ScrollReveal';

export default function PodcastsPage() {
  const [activePlayer, setActivePlayer] = useState<'youtube' | 'apple' | 'spotify'>('youtube');

  return (
    <>
      {/* ── Page Header Block ── */}
      <section className="pagehead border-b border-[var(--line)] bg-[var(--paper-2)]/50">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span className="text-[var(--ink)]">Podcasts</span>
          </nav>

          <p className="micro red">Media &bull; Hustle Truth Series</p>
          <h1 className="mt-3">
            Hustle Truth <em>Series.</em>
          </h1>
          <p className="lede">
            Raw, unfiltered daily conversations on discipline, resilience, and navigating demanding
            high-pressure careers from the ground up.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex-grow w-full space-y-16">
        
        {/* PODCAST HERO & DESCRIPTION */}
        <ScrollReveal className="w-full">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* Podcast Cover Art Column */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] aspect-square rounded-3xl overflow-hidden border border-white/15 shadow-2xl group hover:border-violet-500/50 transition-all duration-300">
                <img
                  src="/hustle_truth_cover.jpg"
                  alt="Hustle Truth Series Podcast Cover Art"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-[10px] font-mono text-violet-300 tracking-wider font-bold">
                    HUSTLE TRUTH SERIES
                  </span>
                </div>
              </div>
              <p className="mt-4 text-[10px] font-mono text-zinc-400 text-center tracking-wider uppercase">
                Created &amp; Hosted by Benedict
              </p>
            </div>

            {/* Podcast Info Column */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-700 font-bold block mb-2">
                  Featured Show
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] leading-tight">
                  Hustle Truth Series
                </h2>
                <div className="h-[2px] w-20 bg-violet-600 mt-3 rounded-full"></div>
              </div>

              <p className="text-[var(--ink)] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                The <strong>Hustle Truth Series</strong> is a daily self-improvement and motivational podcast hosted by Benedict Adurosakin. 
                It provides raw, unfiltered conversations about discipline, consistency, and the realities of building goals from scratch.
              </p>

              <p className="text-[var(--mute)] text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
                Drawing from experiences across high-pressure clinical ICU corridors, nursing shifts, software engineering sprints, 
                and the daily grind of building from the ground up, this series serves as a critical mirror. Moving beyond surface-level motivation, 
                we discuss the honest mindset shifts, habits, and discipline required to protect your humanity while striving for lasting legacy.
              </p>

              {/* Platform Badges */}
              <div className="pt-4 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)] font-bold block">
                  Subscribe &amp; Stream On
                </span>
                <div className="flex flex-wrap gap-3">
                  {/* YouTube */}
                  <a
                    href="https://youtube.com/playlist?list=PLfjcuWEuElwUhYY01bbyIt88lB3OClLKc&si=gAWX56-VxL5hpPwF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--line)] bg-white hover:border-[var(--ink)] hover:shadow-md transition-all duration-200 group no-underline"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <i className="fa-brands fa-youtube text-base text-[#FF0000]"></i>
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] font-mono text-[var(--mute)] uppercase tracking-wider font-bold leading-none mb-1">
                        Watch on
                      </span>
                      <span className="block text-xs font-bold text-[var(--ink)] leading-none whitespace-nowrap">
                        YouTube Playlist
                      </span>
                    </div>
                    <span className="text-xs text-[var(--mute)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-transform font-bold ml-1">&rarr;</span>
                  </a>

                  {/* Apple Podcasts */}
                  <a
                    href="https://podcasts.apple.com/za/podcast/hustle-truth-series/id1840736646"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--line)] bg-white hover:border-[var(--ink)] hover:shadow-md transition-all duration-200 group no-underline"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-podcast text-base text-[#FC3C44]"></i>
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] font-mono text-[var(--mute)] uppercase tracking-wider font-bold leading-none mb-1">
                        Listen on
                      </span>
                      <span className="block text-xs font-bold text-[var(--ink)] leading-none whitespace-nowrap">
                        Apple Podcasts
                      </span>
                    </div>
                    <span className="text-xs text-[var(--mute)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-transform font-bold ml-1">&rarr;</span>
                  </a>

                  {/* Spotify */}
                  <a
                    href="https://open.spotify.com/show/34NgEjL5Q7kmSXbEc0iVct"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--line)] bg-white hover:border-[var(--ink)] hover:shadow-md transition-all duration-200 group no-underline"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <i className="fa-brands fa-spotify text-base text-[#1DB954]"></i>
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] font-mono text-[var(--mute)] uppercase tracking-wider font-bold leading-none mb-1">
                        Listen on
                      </span>
                      <span className="block text-xs font-bold text-[var(--ink)] leading-none whitespace-nowrap">
                        Spotify
                      </span>
                    </div>
                    <span className="text-xs text-[var(--mute)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-transform font-bold ml-1">&rarr;</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

        {/* EMBEDDED PLAYBACK SECTION */}
        <ScrollReveal className="w-full" delay={150}>
          <div className="border-t border-[var(--line)] pt-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-[var(--ink)]">
                  Play or Watch Episodes
                </h3>
                <p className="text-xs text-[var(--mute)] font-medium">
                  Stream latest video episodes or podcast audio directly.
                </p>
              </div>
              
              {/* Player Switcher */}
              <div className="flex bg-white p-1 rounded-full border border-[var(--line)] self-start items-center gap-1 shadow-xs">
                <button
                  onClick={() => setActivePlayer('youtube')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activePlayer === 'youtube'
                      ? 'bg-[var(--paper-2)] text-[#FF0000] border border-[var(--line)]'
                      : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  <i className="fa-brands fa-youtube text-xs"></i>
                  YouTube
                </button>
                <button
                  onClick={() => setActivePlayer('apple')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activePlayer === 'apple'
                      ? 'bg-[var(--paper-2)] text-[#FC3C44] border border-[var(--line)]'
                      : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  <i className="fa-solid fa-podcast text-xs"></i>
                  Apple
                </button>
                <button
                  onClick={() => setActivePlayer('spotify')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activePlayer === 'spotify'
                      ? 'bg-[var(--paper-2)] text-[#1DB954] border border-[var(--line)]'
                      : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  <i className="fa-brands fa-spotify text-xs"></i>
                  Spotify
                </button>
              </div>
            </div>

            {/* Player Container */}
            <div className="p-3 border border-[var(--line)] bg-white rounded-2xl overflow-hidden shadow-lg max-w-4xl animate-fadeIn">
              {activePlayer === 'youtube' ? (
                <div className="animate-fadeIn aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/videoseries?list=PLfjcuWEuElwUhYY01bbyIt88lB3OClLKc"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '16px', minHeight: '380px' }}
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                  ></iframe>
                </div>
              ) : activePlayer === 'apple' ? (
                <div className="animate-fadeIn">
                  <iframe
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write *"
                    frameBorder="0"
                    height="450"
                    style={{ width: '100%', overflow: 'hidden', borderRadius: '16px' }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src="https://embed.podcasts.apple.com/za/podcast/hustle-truth-series/id1840736646?theme=dark"
                    loading="lazy"
                    className="w-full"
                  ></iframe>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <iframe
                    style={{ borderRadius: '16px' }}
                    src="https://open.spotify.com/embed/show/34NgEjL5Q7kmSXbEc0iVct?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                  ></iframe>
                </div>
              )}
            </div>

            <p className="text-[10px] font-mono text-zinc-500 italic">
              Note: Interactive embeds are streamed from official video and audio platforms. YouTube playlist renders the complete &ldquo;Hustle Truth Series&rdquo; catalogue.
            </p>
          </div>
        </ScrollReveal>

      </section>

      <Footer commitMessage="podcasts-updated" />
    </>
  );
}
