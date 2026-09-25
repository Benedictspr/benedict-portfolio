'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';
import ScrollReveal from '../../components/ScrollReveal';

export default function PodcastsPage() {
  const [activePlayer, setActivePlayer] = useState<'youtube' | 'apple' | 'spotify'>('youtube');

  return (
    <>
      {/* Header Banner */}
      <section className="pt-16 pb-12 px-6 lg:px-8 border-b border-white/[0.08] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span className="text-rose-400 font-mono text-xs font-semibold uppercase tracking-wider">
              04 / Media &amp; Podcasts
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-300 text-xs font-mono">Unfiltered Self-Improvement &amp; Discipline</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            Hustle Truth <span className="text-gradient">Series</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Raw, unfiltered daily conversations on discipline, resilience, and navigating demanding high-pressure careers from the ground up.
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
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-400 font-bold block mb-2">
                  Featured Show
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Hustle Truth Series
                </h2>
                <div className="h-[2px] w-20 bg-violet-500 mt-3 rounded-full"></div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl font-light">
                The <strong>Hustle Truth Series</strong> is a daily self-improvement and motivational podcast hosted by Benedict Adurosakin. 
                It provides raw, unfiltered conversations about discipline, consistency, and the realities of building goals from scratch.
              </p>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
                Drawing from experiences across high-pressure clinical ICU corridors, nursing shifts, software engineering sprints, 
                and the daily grind of building from the ground up, this series serves as a critical mirror. Moving beyond surface-level motivation, 
                we discuss the honest mindset shifts, habits, and discipline required to protect your humanity while striving for lasting legacy.
              </p>

              {/* Platform Badges */}
              <div className="pt-4">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
                  Subscribe &amp; Stream On
                </h4>
                <div className="flex flex-wrap gap-4">
                  {/* YouTube */}
                  <a
                    href="https://youtube.com/playlist?list=PLfjcuWEuElwUhYY01bbyIt88lB3OClLKc&si=gAWX56-VxL5hpPwF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-[#12121a] hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 transition-all duration-300 group"
                  >
                    <i className="fa-brands fa-youtube text-2xl text-[#FF0000] group-hover:scale-110 transition-transform"></i>
                    <div className="text-left">
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-tight leading-none">Watch on</p>
                      <p className="text-xs font-bold text-white">YouTube Playlist</p>
                    </div>
                    <span className="text-xs text-zinc-400 ml-2 group-hover:translate-x-1 transition-transform">➜</span>
                  </a>

                  {/* Apple Podcasts */}
                  <a
                    href="https://podcasts.apple.com/za/podcast/hustle-truth-series/id1840736646"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-[#12121a] hover:border-[#FC3C44]/50 hover:bg-[#FC3C44]/10 transition-all duration-300 group"
                  >
                    <i className="fa-solid fa-podcast text-2xl text-[#FC3C44] group-hover:scale-110 transition-transform"></i>
                    <div className="text-left">
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-tight leading-none">Listen on</p>
                      <p className="text-xs font-bold text-white">Apple Podcasts</p>
                    </div>
                    <span className="text-xs text-zinc-400 ml-2 group-hover:translate-x-1 transition-transform">➜</span>
                  </a>

                  {/* Spotify */}
                  <a
                    href="https://open.spotify.com/show/34NgEjL5Q7kmSXbEc0iVct"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-[#12121a] hover:border-[#1DB954]/50 hover:bg-[#1DB954]/10 transition-all duration-300 group"
                  >
                    <i className="fa-brands fa-spotify text-2xl text-[#1DB954] group-hover:scale-110 transition-transform"></i>
                    <div className="text-left">
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-tight leading-none">Listen on</p>
                      <p className="text-xs font-bold text-white">Spotify</p>
                    </div>
                    <span className="text-xs text-zinc-400 ml-2 group-hover:translate-x-1 transition-transform">➜</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

        {/* EMBEDDED PLAYBACK SECTION */}
        <ScrollReveal className="w-full" delay={150}>
          <div className="border-t border-white/10 pt-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Play or Watch Episodes
                </h3>
                <p className="text-xs text-zinc-400">
                  Stream latest video episodes or podcast audio directly.
                </p>
              </div>
              
              {/* Player Switcher */}
              <div className="flex bg-[#12121a] p-1 rounded-full border border-white/10 self-start items-center gap-1">
                <button
                  onClick={() => setActivePlayer('youtube')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activePlayer === 'youtube'
                      ? 'bg-white/10 text-[#FF0000] border border-white/15'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <i className="fa-brands fa-youtube text-xs"></i>
                  YouTube
                </button>
                <button
                  onClick={() => setActivePlayer('apple')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activePlayer === 'apple'
                      ? 'bg-white/10 text-[#FC3C44] border border-white/15'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-podcast text-xs"></i>
                  Apple
                </button>
                <button
                  onClick={() => setActivePlayer('spotify')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activePlayer === 'spotify'
                      ? 'bg-white/10 text-[#1DB954] border border-white/15'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <i className="fa-brands fa-spotify text-xs"></i>
                  Spotify
                </button>
              </div>
            </div>

            {/* Player Container */}
            <div className="bento p-2 border-white/10 bg-[#0a0a0f] overflow-hidden shadow-2xl max-w-4xl animate-fadeIn">
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
