'use client';

import React, { useState, useEffect, useRef } from 'react';
import pagesData from '../data/xviith_excerpts.json';

interface Page {
  pageNumber: number;
  content: string;
}

const pages = pagesData as Page[];

// Helper to escape regex
const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export default function BookReader() {
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('sepia');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState<number[]>([]); // list of pages with matches
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const [isDoublePage, setIsDoublePage] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor window size to switch layouts automatically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsDoublePage(false);
      } else {
        setIsDoublePage(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in search input
      if (document.activeElement?.tagName === 'INPUT') return;
      
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isDoublePage]);

  // Execute text search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setMatches([]);
      setCurrentMatchIndex(-1);
      return;
    }
    const found: number[] = [];
    pages.forEach((p) => {
      if (p.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        found.push(p.pageNumber);
      }
    });
    setMatches(found);
    if (found.length > 0) {
      setCurrentMatchIndex(0);
      setCurrentPage(found[0]);
    } else {
      setCurrentMatchIndex(-1);
    }
  }, [searchQuery]);

  const goToPrev = () => {
    if (isDoublePage) {
      if (currentPage <= 1) return;
      if (currentPage === 12) {
        setCurrentPage(10); // Go back to last double page spread (10 & 11)
      } else if (currentPage === 2) {
        setCurrentPage(1); // Go back to Cover (page 1)
      } else {
        setCurrentPage((prev) => Math.max(1, prev - 2));
      }
    } else {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const goToNext = () => {
    const totalPages = pages.length;
    if (isDoublePage) {
      if (currentPage === 1) {
        setCurrentPage(2); // Go to first spread (2 & 3)
      } else if (currentPage === 10) {
        setCurrentPage(12); // Go to back cover / CTA (page 12)
      } else if (currentPage >= totalPages) {
        return;
      } else {
        setCurrentPage((prev) => Math.min(totalPages, prev + 2));
      }
    } else {
      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }
  };

  const jumpToPage = (pageNum: number) => {
    if (isDoublePage) {
      if (pageNum === 1 || pageNum === pages.length) {
        setCurrentPage(pageNum);
      } else {
        // Align to the start of the spread (even page number)
        if (pageNum % 2 === 1) {
          setCurrentPage(pageNum - 1);
        } else {
          setCurrentPage(pageNum);
        }
      }
    } else {
      setCurrentPage(pageNum);
    }
  };

  const navigateSearchMatch = (direction: 'next' | 'prev') => {
    if (matches.length === 0) return;
    let nextIndex = currentMatchIndex;
    if (direction === 'next') {
      nextIndex = (currentMatchIndex + 1) % matches.length;
    } else {
      nextIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
    }
    setCurrentMatchIndex(nextIndex);
    
    // Jump to the exact page of the match
    const targetPage = matches[nextIndex];
    jumpToPage(targetPage);
  };

  const highlightText = (text: string, query: string) => {
    if (!query || !query.trim()) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={index}
              className="bg-yellow-200 dark:bg-amber-500 text-black px-0.5 rounded font-medium border-b border-amber-600/50"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Font size mapper
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-xs md:text-sm leading-relaxed';
      case 'lg':
        return 'text-base md:text-lg leading-relaxed';
      case 'xl':
        return 'text-lg md:text-xl leading-relaxed';
      case 'md':
      default:
        return 'text-sm md:text-base leading-relaxed';
    }
  };

  // Theme styling mapper
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          wrapper: 'bg-[#F9F9F6] border-zinc-200 text-zinc-800 shadow-lg',
          pageBg: 'bg-[#FCFBF9]',
          pageBorder: 'border-zinc-200/60',
          toolbar: 'bg-zinc-100/90 border-zinc-200 text-zinc-650',
          input: 'bg-white border-zinc-200 text-zinc-950 focus:border-zinc-400',
          crease: 'bg-gradient-to-r from-transparent via-black/[0.04] to-transparent',
          activeBtn: 'bg-zinc-850 text-white',
          inactiveBtn: 'hover:bg-zinc-200 text-zinc-650',
          bottomBar: 'border-zinc-200 text-zinc-500 bg-zinc-100/60',
          coverBorder: 'border-zinc-300',
        };
      case 'dark':
        return {
          wrapper: 'bg-[#151515] border-zinc-800 text-[#DFDFDF] shadow-xl',
          pageBg: 'bg-[#1C1C1C]',
          pageBorder: 'border-zinc-800/80',
          toolbar: 'bg-zinc-900/95 border-zinc-850 text-zinc-400',
          input: 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-zinc-700',
          crease: 'bg-gradient-to-r from-transparent via-black/[0.3] to-transparent',
          activeBtn: 'bg-zinc-100 text-zinc-900',
          inactiveBtn: 'hover:bg-zinc-800 text-zinc-400',
          bottomBar: 'border-zinc-800 text-zinc-500 bg-zinc-900/40',
          coverBorder: 'border-zinc-800',
        };
      case 'sepia':
      default:
        return {
          wrapper: 'bg-[#F4ECD8] border-[#DFD6BD] text-[#3E2D1D] shadow-lg',
          pageBg: 'bg-[#FAF2DF]',
          pageBorder: 'border-[#EBE2CA]',
          toolbar: 'bg-[#EAE0C5] border-[#DFD5BA] text-[#5A4533]',
          input: 'bg-[#FCF7ED] border-[#DDD3B7] text-[#3E2D1D] focus:border-[#C4B79A]',
          crease: 'bg-gradient-to-r from-transparent via-[#2D1F13]/[0.07] to-transparent',
          activeBtn: 'bg-[#5A4533] text-[#FAF2DF]',
          inactiveBtn: 'hover:bg-[#E2D8BC] text-[#5A4533]',
          bottomBar: 'border-[#DFD5BA] text-[#7A6451] bg-[#EAE0C5]/50',
          coverBorder: 'border-[#DED5BC]',
        };
    }
  };

  const s = getThemeClasses();
  const fontStyle = getFontSizeClass();

  // Page resolution logic
  const isCover = currentPage === 1;
  const isCTA = currentPage === pages.length;
  const showSingleCentered = !isDoublePage || isCover || isCTA;

  // Spreads setup
  const leftPageNum = isDoublePage ? currentPage : currentPage;
  const rightPageNum = isDoublePage ? currentPage + 1 : null;

  const leftPage = pages.find((p) => p.pageNumber === leftPageNum);
  const rightPage = rightPageNum ? pages.find((p) => p.pageNumber === rightPageNum) : null;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col border rounded-2xl w-full h-[520px] md:h-[620px] max-h-[85vh] transition-all duration-300 font-sans ${s.wrapper}`}
    >
      {/* TOP TOOLBAR */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 p-3 border-b text-xs backdrop-blur-md rounded-t-2xl select-none ${s.toolbar}`}
      >
        {/* Table of Contents & Navigation */}
        <div className="flex items-center gap-2">
          <select
            value={currentPage}
            onChange={(e) => jumpToPage(Number(e.target.value))}
            className={`px-2 py-1.5 rounded-lg border outline-none text-[10px] sm:text-xs cursor-pointer font-mono font-bold uppercase transition max-w-[150px] sm:max-w-none ${s.input}`}
          >
            <option value="1">I. Cover Page</option>
            <option value="2">II. Copyright</option>
            <option value="3">III. Prelude Quote</option>
            <option value="4">IV. Letter 1: Introduction</option>
            <option value="5">V. On Power & Gravity</option>
            <option value="6">VI. Are You Ready to Vanish?</option>
            <option value="8">VII. The Mirror of Silence</option>
            <option value="9">VIII. Private vs Public Bleeding</option>
            <option value="12">IX. The First Door Quote</option>
          </select>
        </div>

        {/* Text Search inside book */}
        <div className="flex items-center gap-1.5 relative max-w-[150px] sm:max-w-[200px] w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search excerpt..."
            className={`w-full px-2 py-1.5 pr-6 rounded-lg border text-[11px] sm:text-xs outline-none transition ${s.input}`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-zinc-400 hover:text-zinc-650 cursor-pointer text-[10px]"
            >
              ✕
            </button>
          )}

          {matches.length > 0 && (
            <div className="absolute -bottom-8 right-0 flex items-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-1 px-2 rounded-md shadow-md text-[9px] font-mono z-50">
              <span>
                {currentMatchIndex + 1}/{matches.length}
              </span>
              <button
                onClick={() => navigateSearchMatch('prev')}
                className="hover:text-amber-500 cursor-pointer font-bold"
              >
                ◀
              </button>
              <button
                onClick={() => navigateSearchMatch('next')}
                className="hover:text-amber-500 cursor-pointer font-bold"
              >
                ▶
              </button>
            </div>
          )}
        </div>

        {/* Font Controls & Theme Toggles */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
          {/* Font sizes */}
          <div className="flex items-center border border-zinc-200/50 dark:border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setFontSize('sm')}
              className={`w-5 sm:w-6 h-5 sm:h-6 rounded flex items-center justify-center font-bold text-[9px] sm:text-[10px] cursor-pointer transition ${
                fontSize === 'sm' ? s.activeBtn : s.inactiveBtn
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`w-5 sm:w-6 h-5 sm:h-6 rounded flex items-center justify-center font-bold text-[10px] sm:text-[11px] cursor-pointer transition ${
                fontSize === 'md' ? s.activeBtn : s.inactiveBtn
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`w-5 sm:w-6 h-5 sm:h-6 rounded flex items-center justify-center font-bold text-[11px] sm:text-[13px] cursor-pointer transition ${
                fontSize === 'lg' ? s.activeBtn : s.inactiveBtn
              }`}
            >
              A+
            </button>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center border border-zinc-200/50 dark:border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setTheme('light')}
              className={`w-5 sm:w-6 h-5 sm:h-6 rounded-md flex items-center justify-center cursor-pointer transition ${
                theme === 'light' ? s.activeBtn : s.inactiveBtn
              }`}
              title="Light theme"
            >
              ☼
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`w-5 sm:w-6 h-5 sm:h-6 rounded-md flex items-center justify-center cursor-pointer transition ${
                theme === 'sepia' ? s.activeBtn : s.inactiveBtn
              }`}
              title="Sepia theme"
            >
              📖
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`w-5 sm:w-6 h-5 sm:h-6 rounded-md flex items-center justify-center cursor-pointer transition ${
                theme === 'dark' ? s.activeBtn : s.inactiveBtn
              }`}
              title="Dark theme"
            >
              ☾
            </button>
          </div>
        </div>
      </div>

      {/* READING AREA */}
      <div className="flex-grow flex relative items-stretch overflow-hidden select-text">
        {/* Previous page arrow */}
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className={`absolute left-0 top-0 bottom-0 w-10 sm:w-12 z-30 flex items-center justify-center opacity-0 sm:opacity-0 hover:opacity-100 disabled:opacity-0 transition duration-300 bg-gradient-to-r from-black/5 to-transparent dark:from-white/5 cursor-pointer text-base sm:text-xl`}
        >
          ◀
        </button>

        {showSingleCentered ? (
          /* SINGLE CENTERED PAGE LAYOUT (Cover, CTA, or mobile view) */
          <div
            className={`flex-1 p-5 md:p-10 overflow-y-auto font-author flex flex-col justify-between items-center ${s.pageBg}`}
          >
            <div className="w-full max-w-xl flex-grow flex flex-col">
              {isCover ? (
                /* Cover Page Design */
                <div className="flex-grow flex flex-col items-center justify-center text-center py-6">
                  <div className={`w-full max-w-sm py-12 px-6 rounded-lg border-2 border-dashed flex flex-col items-center space-y-6 ${s.coverBorder}`}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-400">
                      Virelli Publishers
                    </span>
                    <h3 className="font-name italic text-4xl font-bold tracking-wide text-black dark:text-white">
                      The XVII-th
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                      Letters to the One Who Will Come
                    </p>
                    <div className="w-12 h-[1px] bg-zinc-400 my-2"></div>
                    <p className="text-sm font-medium italic text-zinc-650 dark:text-zinc-350">
                      "Before you become anything, you must leave yourself behind."
                    </p>
                    <p className="text-[10px] font-mono text-zinc-400 pt-6">
                      ADUROSAKIN BENEDICT
                    </p>
                  </div>
                </div>
              ) : isCTA ? (
                /* Back Cover / CTA Page */
                <div className="space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block border-b pb-1 dark:border-zinc-800">
                      The First Door Summary
                    </span>
                    <div className={`${fontStyle} whitespace-pre-wrap italic`}>
                      {highlightText(leftPage?.content || '', searchQuery)}
                    </div>
                  </div>
                  
                  {/* Purchase CTA Box */}
                  <div className="p-5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-amber-500/5 space-y-4 my-4">
                    <h4 className="font-name italic text-lg font-bold text-center text-black dark:text-zinc-100">
                      Read the Complete Letter-Series
                    </h4>
                    <p className="text-xs text-center text-zinc-500 max-w-sm mx-auto leading-relaxed">
                      Unlock all 166 pages of philosophical reflection, power, silence, and sovereign truth. Available on gumroad and selar.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href="https://selar.com/f8e09466jy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black text-center font-bold text-[10px] uppercase tracking-widest rounded-lg hover:opacity-90 transition cursor-pointer"
                      >
                        Buy on Selar ↗
                      </a>
                      <a
                        href="https://benedicta71.gumroad.com/l/gyeanz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-transparent border border-zinc-400 dark:border-zinc-800 text-center font-bold text-[9px] uppercase tracking-widest rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
                      >
                        Find on Gumroad ↗
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Text Page (Mobile View) */
                <div className="space-y-4 flex-grow">
                  <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block border-b pb-1 dark:border-zinc-800">
                    {leftPage?.pageNumber === 2 ? 'Copyright & License' : 'Letters to the One Who Will Come'}
                  </span>
                  <div className={`${fontStyle} whitespace-pre-wrap`}>
                    {highlightText(leftPage?.content || '', searchQuery)}
                  </div>
                </div>
              )}
            </div>

            {leftPage && (
              <span className="text-[10px] font-mono text-zinc-400 text-center block mt-4 select-none">
                Page {leftPage.pageNumber}
              </span>
            )}
          </div>
        ) : (
          /* DOUBLE PAGE LAYOUT (Desktop View, pages 2-11) */
          <>
            {/* Left Page */}
            <div
              className={`flex-1 p-8 md:p-10 overflow-y-auto font-author flex flex-col justify-between border-r pr-8 ${s.pageBg} ${s.pageBorder}`}
            >
              {leftPage ? (
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block border-b pb-1 dark:border-zinc-800">
                    {leftPage.pageNumber === 2 ? 'Copyright Details' : 'Letters to the One Who Will Come'}
                  </span>
                  <div className={`${fontStyle} whitespace-pre-wrap`}>
                    {highlightText(leftPage.content, searchQuery)}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-400 italic">
                  End of Preview
                </div>
              )}
              {leftPage && (
                <span className="text-[10px] font-mono text-zinc-400 text-center block mt-6 select-none">
                  Page {leftPage.pageNumber}
                </span>
              )}
            </div>

            {/* CENTER CREASE */}
            <div className={`absolute top-0 bottom-0 left-[50%] -translate-x-[50%] w-6 z-25 pointer-events-none ${s.crease}`}></div>

            {/* Right Page */}
            <div
              className={`flex-1 p-8 md:p-10 overflow-y-auto font-author flex flex-col justify-between pl-8 ${s.pageBg}`}
            >
              {rightPage ? (
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block border-b pb-1 dark:border-zinc-800 text-right">
                    {rightPage.pageNumber === 3 ? 'Prelude Quote' : 'The XVII-th Preview'}
                  </span>
                  <div className={`${fontStyle} whitespace-pre-wrap`}>
                    {highlightText(rightPage.content, searchQuery)}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full space-y-4 py-8">
                  <span className="text-4xl">📚</span>
                  <p className="text-xs font-mono text-zinc-400 max-w-xs">
                    You have reached the end of this digital preview.
                  </p>
                  <a
                    href="https://selar.com/f8e09466jy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold border-b border-black dark:border-white pb-1 hover:text-amber-500 hover:border-amber-500 transition"
                  >
                    BUY COMPLETE NOVEL ↗
                  </a>
                </div>
              )}
              {rightPage && (
                <span className="text-[10px] font-mono text-zinc-400 text-center block mt-6 select-none">
                  Page {rightPage.pageNumber}
                </span>
              )}
            </div>
          </>
        )}

        {/* Next page arrow */}
        <button
          onClick={goToNext}
          disabled={currentPage === pages.length}
          className={`absolute right-0 top-0 bottom-0 w-10 sm:w-12 z-30 flex items-center justify-center opacity-0 sm:opacity-0 hover:opacity-100 disabled:opacity-0 transition duration-300 bg-gradient-to-l from-black/5 to-transparent dark:from-white/5 cursor-pointer text-base sm:text-xl`}
        >
          ▶
        </button>
      </div>

      {/* BOTTOM PROGRESS BAR */}
      <div
        className={`flex items-center justify-between p-3 border-t text-[10px] font-mono rounded-b-2xl select-none ${s.bottomBar}`}
      >
        <span className="w-16">
          PAGE {currentPage} OF {pages.length}
        </span>

        {/* Drag/Click Progress Bar */}
        <div className="flex-grow mx-3 relative flex items-center">
          <input
            type="range"
            min="1"
            max={pages.length}
            value={currentPage}
            onChange={(e) => jumpToPage(Number(e.target.value))}
            className="w-full h-1 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-650 dark:accent-zinc-400"
          />
        </div>

        <span className="w-16 text-right uppercase text-[9px] tracking-wider text-zinc-400">
          {Math.round((currentPage / pages.length) * 100)}% read
        </span>
      </div>
    </div>
  );
}
