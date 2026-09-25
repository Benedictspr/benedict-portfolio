'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { num: '01', name: 'About', path: '/' },
    { num: '02', name: 'Work & Tech', path: '/tech' },
    { num: '03', name: 'Clinical', path: '/nursing' },
    { num: '04', name: 'Research', path: '/research' },
    { num: '05', name: 'Writing', path: '/writing' },
    { num: '06', name: 'Podcasts', path: '/podcasts' },
    { num: '07', name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="relative flex items-center gap-3 group" aria-label="Benedict Adurosakin — Home">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-zinc-900 group-hover:border-primary transition duration-300">
              <img
                src="/benedict.png"
                alt="Benedict Adurosakin"
                className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-primary transition duration-200">
                Benedict Adurosakin
              </span>
              <span className="text-[10px] font-mono text-zinc-400 hidden sm:block">
                RN &bull; Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Jack Mkimbo Hover Index Numbers */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  role="menuitem"
                  className={`group relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold border border-white/15'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className={`font-mono text-[10px] text-violet-400 -translate-y-0.5 transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="/new-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono text-zinc-300 border border-white/15 hover:border-violet-500/40 hover:text-white transition"
              title="Curriculum Vitae"
            >
              <span>CV</span>
              <span className="text-[10px] text-zinc-400">&darr;</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-xs font-semibold hover:shadow-lg hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Hire Me</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </Link>

            {/* Mobile Burger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition lg:hidden"
              aria-label="Open menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 px-2 space-y-1 bg-[#0a0a0f]/95 backdrop-blur-2xl animate-fadeIn">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-white/10 text-white font-bold border border-white/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-mono text-xs text-violet-400">{link.num}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex items-center gap-3 px-2">
              <a
                href="/new-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/2 text-center text-xs font-mono text-zinc-300 py-2.5 rounded-full border border-white/20 hover:bg-white/5 transition"
              >
                Curriculum Vitae &darr;
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-1/2 text-center text-xs font-semibold text-white py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 transition"
              >
                Get In Touch &rarr;
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
