'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: 'About', path: '/' },
    { name: 'Nursing', path: '/nursing' },
    { name: 'Tech', path: '/tech' },
    { name: 'Writing', path: '/writing' },
    { name: 'Research', path: '/research' },
    { name: 'Podcasts', path: '/podcasts' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0D1117]/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo / Monogram */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20 bg-zinc-900 flex items-center justify-center group-hover:border-cyan-400/60 transition">
              <img
                src="/image2.jpeg"
                alt="Benedict Adurosakin"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition leading-tight">
                Benedict Adurosakin
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                RN &bull; Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/new-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-zinc-300 hover:text-white px-3 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition flex items-center gap-1.5"
            >
              <span>CV</span>
              <span className="text-zinc-400 text-[10px]">&darr;</span>
            </a>
            <Link
              href="/contact"
              className="btn-action btn-coral !text-xs !py-1.5 !px-4"
            >
              <span>Let&apos;s Connect</span>
              <span className="text-xs">&rarr;</span>
            </Link>
          </div>

          {/* Mobile Burger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 focus:outline-none"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0D1117]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-mono tracking-wider transition ${
                  isActive
                    ? 'bg-white/10 text-white font-bold border border-white/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex items-center gap-3">
            <a
              href="/new-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 text-center text-xs font-mono text-zinc-300 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition"
            >
              Resume (PDF) &darr;
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-1/2 text-center text-xs font-mono text-white py-2.5 rounded-lg bg-[#FF4A2B] hover:bg-[#E03B1E] font-bold transition"
            >
              Contact &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
