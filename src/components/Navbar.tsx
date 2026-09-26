'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [stuck, setStuck] = useState(!isHome);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setStuck(true);
      return;
    }

    const handleScroll = () => {
      const heroWrap = document.getElementById('herowrap');
      if (heroWrap) {
        setStuck(window.scrollY > heroWrap.offsetHeight - 90);
      } else {
        setStuck(window.scrollY > 40);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Work & Tech', path: '/tech' },
    { name: 'Clinical', path: '/nursing' },
    { name: 'Research', path: '/research' },
    { name: 'Writing', path: '/writing' },
    { name: 'Podcasts', path: '/podcasts' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      id="nav"
      className={`nav ${isHome ? (stuck ? 'stuck' : '') : 'solid'}`}
      aria-label="Main navigation"
    >
      <div className="shell">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group select-none shrink-0 whitespace-nowrap"
          aria-label="Benedict Adurosakin — home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-current/25 bg-current/5 transition-transform duration-300 group-hover:scale-105 shrink-0">
            <img
              src="/benedict.png"
              alt="Benedict Adurosakin"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col shrink-0">
            <span className="font-extrabold text-[0.98rem] tracking-tight leading-tight group-hover:text-[#FF4A2B] transition-colors duration-200 whitespace-nowrap">
              Benedict Adurosakin
            </span>
            <span className="micro text-[0.62rem] tracking-[0.25em] opacity-75 whitespace-nowrap">
              RN &bull; Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="menu shrink-0" id="menu" role="menubar">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path} role="none" className="shrink-0">
                <Link
                  href={link.path}
                  role="menuitem"
                  className="whitespace-nowrap"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions & Burger */}
        <div className="navr shrink-0 whitespace-nowrap">
          <a
            href="/new-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-current/30 hover:border-current transition-colors duration-200 whitespace-nowrap shrink-0"
            title="Download Curriculum Vitae"
          >
            <span>CV</span>
            <span className="opacity-60 text-[10px]">&darr;</span>
          </a>

          <Link
            href="/contact"
            className="btn btn-solid text-xs py-2 px-4.5 sm:px-5 whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Start a project</span>
            <span className="ar shrink-0">&rarr;</span>
          </Link>

          <button
            className="burger"
            id="burger"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] px-6 py-6 space-y-4 shadow-xl animate-fadeIn"
        >
          <div className="flex flex-col space-y-3">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-bold py-2 border-b border-[var(--line)]/50 transition-colors ${
                    isActive ? 'text-[var(--red)]' : 'text-[var(--ink)] hover:text-[var(--red)]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <a
              href="/new-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold py-2 px-4 rounded-full border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition"
            >
              Download CV &darr;
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-red text-xs py-2 px-4"
            >
              <span>Get in touch</span>
              <span className="ar">&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
