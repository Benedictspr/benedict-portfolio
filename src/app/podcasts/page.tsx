'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollReveal from '../../components/ScrollReveal';

export default function PodcastsPage() {
  const [activePlayer, setActivePlayer] = useState<'youtube' | 'apple' | 'spotify'>('youtube');

  return (
    <>
      <header className="pt-12 px-6 md:px-12 w-full">
        <div className="flex justify-between items-end mb-10">
          <h1 className="font-name italic font-medium text-4xl md:text-5xl text-zinc-950 dark:text-zinc-50">
            Podcasts
          </h1>
        </div>
        <Navbar />
      </header>

      <section className="px-6 md:px-12 pb-24 flex-grow w-full space-y-16">
        
        {/* PODCAST HERO & DESCRIPTION */}
        <ScrollReveal className="w-full">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* Podcast Cover Art Column */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-xl group hover:border-cyan-500/50 dark:hover:border-cyan-400/40 transition-all duration-300">
                <img
                  src="/hustle_truth_cover.jpg"
                  alt="Hustle Truth Series Podcast Cover Art"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider font-bold">HUSTLE TRUTH SERIES</span>
                </div>
              </div>
              <p className="mt-4 text-[10px] font-mono text-zinc-400 text-center tracking-wider uppercase">
                Created & Hosted by Benedict
              </p>
            </div>

            {/* Podcast Info Column */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 block mb-2">Featured Show</span>
                <h2 className="font-author text-3xl md:text-4xl italic text-black dark:text-zinc-100 leading-tight">
                  Hustle Truth Series
                </h2>
                <div className="h-[2px] w-20 bg-cyan-500 dark:bg-cyan-400 mt-3 rounded-full"></div>
              </div>

              <p className="text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed max-w-2xl font-light">
                The <strong>Hustle Truth Series</strong> is a daily self-improvement and motivational podcast hosted by Benedict Adurosakin. 
                It provides raw, unfiltered conversations about discipline, consistency, and the realities of building goals from scratch.
              </p>

              <p className="text-zinc-500 text-xs leading-relaxed max-w-2xl">
                Drawing from experiences across high-pressure clinical ICU corridors, nursing shifts, software engineering sprints, 
                and the daily grind of building from the ground up, this series serves as a critical mirror. Moving beyond surface-level motivation, 
                we discuss the honest mindset shifts, habits, and discipline required to protect your humanity while striving for lasting legacy.
              </p>

              {/* Platform Badges */}
              <div className="pt-4">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-450 dark:text-zinc-400 mb-3">
                  Subscribe & Watch/Listen on
                </h4>
                <div className="flex flex-wrap gap-4">
                  {/* YouTube Subscription Badge */}
                  <a
                    href="https://www.youtube.com/@benedictadurosakin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:border-[#FF0000]/50 dark:hover:border-[#FF0000]/30 hover:bg-[#FF0000]/5 dark:hover:bg-[#FF0000]/5 transition-all duration-300 group cursor-pointer animate-fadeIn"
                  >
                    <i className="fa-brands fa-youtube text-2xl text-[#FF0000] group-hover:scale-110 transition-transform"></i>
                    <div className="text-left">
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-tight leading-none">Watch on</p>
                      <p className="text-xs font-bold text-black dark:text-zinc-100">YouTube Channel</p>
                    </div>
                    <span className="text-xs text-zinc-400 ml-2 group-hover:translate-x-1 transition-transform">➜</span>
                  </a>

                  {/* Apple Podcasts Subscription Badge */}
                  <a
                    href="https://podcasts.apple.com/za/podcast/hustle-truth-series/id1840736646"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:border-[#FC3C44]/50 dark:hover:border-[#FC3C44]/30 hover:bg-[#FC3C44]/5 dark:hover:bg-[#FC3C44]/5 transition-all duration-300 group cursor-pointer animate-fadeIn"
                  >
                    <i className="fa-solid fa-podcast text-2xl text-[#FC3C44] group-hover:scale-110 transition-transform"></i>
                    <div className="text-left">
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-tight leading-none">Listen on</p>
                      <p className="text-xs font-bold text-black dark:text-zinc-100">Apple Podcasts</p>
                    </div>
                    <span className="text-xs text-zinc-400 ml-2 group-hover:translate-x-1 transition-transform">➜</span>
                  </a>

                  {/* Spotify Subscription Badge */}
                  <a
                    href="https://open.spotify.com/show/34NgEjL5Q7kmSXbEc0iVct"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:border-[#1DB954]/50 dark:hover:border-[#1DB954]/30 hover:bg-[#1DB954]/5 dark:hover:bg-[#1DB954]/5 transition-all duration-300 group cursor-pointer animate-fadeIn"
                  >
                    <i className="fa-brands fa-spotify text-2xl text-[#1DB954] group-hover:scale-110 transition-transform"></i>
                    <div className="text-left">
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-tight leading-none">Listen on</p>
                      <p className="text-xs font-bold text-black dark:text-zinc-100">Spotify</p>
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
          <div className="border-t border-zinc-100 dark:border-zinc-900/60 pt-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-author text-2xl italic text-black dark:text-zinc-100">
                  Play or Watch Episodes
                </h3>
                <p className="text-xs text-zinc-500">
                  Stream latest video episodes or podcast audio directly.
                </p>
              </div>
              
              {/* Player Switcher */}
              <div className="flex bg-zinc-100 dark:bg-zinc-900/60 p-1 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 self-start">
                <button
                  onClick={() => setActivePlayer('youtube')}
                  className={`px-4 py-2 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activePlayer === 'youtube'
                      ? 'bg-white dark:bg-zinc-800 text-[#FF0000] shadow-sm'
                      : 'text-zinc-450 hover:text-black dark:hover:text-white'
                  }`}
                >
                  YouTube Player
                </button>
                <button
                  onClick={() => setActivePlayer('apple')}
                  className={`px-4 py-2 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activePlayer === 'apple'
                      ? 'bg-white dark:bg-zinc-800 text-[#FC3C44] shadow-sm'
                      : 'text-zinc-450 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Apple Podcasts
                </button>
                <button
                  onClick={() => setActivePlayer('spotify')}
                  className={`px-4 py-2 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activePlayer === 'spotify'
                      ? 'bg-white dark:bg-zinc-800 text-[#1DB954] shadow-sm'
                      : 'text-zinc-450 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Spotify Player
                </button>
              </div>
            </div>

            {/* Player Container */}
            <div className="bento p-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 overflow-hidden shadow-inner max-w-3xl animate-fadeIn">
              {activePlayer === 'youtube' ? (
                <div className="animate-fadeIn aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed?listType=search&list=Hustle+Truth+Series+Benedict+Adurosakin"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '8px', minHeight: '352px' }}
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
                    style={{ width: '100%', overflow: 'hidden', borderRadius: '8px' }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src="https://embed.podcasts.apple.com/za/podcast/hustle-truth-series/id1840736646?theme=dark"
                    loading="lazy"
                    className="w-full"
                  ></iframe>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <iframe
                    style={{ borderRadius: '8px' }}
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

            <p className="text-[10px] font-mono text-zinc-400 italic">
              Note: Interactive embeds are loaded from external video and audio platforms. YouTube searches and streams the latest episodes of "Hustle Truth Series".
            </p>
          </div>
        </ScrollReveal>

      </section>

      <Footer commitMessage="podcasts-updated" />
    </>
  );
}
