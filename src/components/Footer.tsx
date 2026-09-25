'use client';

import { useState } from 'react';
import AdminModal from './AdminModal';
import Link from 'next/link';

interface FooterProps {
  commitMessage?: string;
}

export default function Footer({ commitMessage = 'system-active' }: FooterProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <>
      <footer className="w-full mt-32 border-t border-white/10 bg-[#0D1117]/80 backdrop-blur-md pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-zinc-900">
                <img src="/image2.jpeg" alt="Benedict" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif italic font-bold text-xl text-white">Benedict Adurosakin</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Registered Nurse, Software Engineer &amp; Clinical Informaticist. Bridging critical bedside care, healthcare data architectures, and empathetic digital tools.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Clinical Informatics, Health-Tech &amp; Engineering</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-semibold">Pillars</span>
              <Link href="/nursing" className="block text-zinc-400 hover:text-white transition">01 / Nursing</Link>
              <Link href="/tech" className="block text-zinc-400 hover:text-white transition">02 / Tech &amp; AI</Link>
              <Link href="/writing" className="block text-zinc-400 hover:text-white transition">03 / Writing</Link>
            </div>
            <div className="space-y-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-semibold">Discourse</span>
              <Link href="/research" className="block text-zinc-400 hover:text-white transition">04 / Research</Link>
              <Link href="/podcasts" className="block text-zinc-400 hover:text-white transition">05 / Podcasts</Link>
              <Link href="/contact" className="block text-zinc-400 hover:text-white transition">06 / Contact</Link>
            </div>
          </div>

          {/* Social Presence */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-mono font-semibold">Connect</span>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://github.com/Benedictspr"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition"
              >
                <i className="fa-brands fa-github text-base"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/benedict-adurosakin-736774398"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition"
              >
                <i className="fa-brands fa-linkedin text-base"></i>
              </a>
              <a
                href="https://x.com/icreate_idesign"
                target="_blank"
                rel="noopener noreferrer"
                title="X / Twitter"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition"
              >
                <i className="fa-brands fa-x-twitter text-base"></i>
              </a>
              <a
                href="https://www.instagram.com/icreate.idesign"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition"
              >
                <i className="fa-brands fa-instagram text-base"></i>
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61578122076472"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition"
              >
                <i className="fa-brands fa-facebook text-base"></i>
              </a>
            </div>
            <p className="text-[11px] font-mono text-zinc-500">
              Build: <span className="text-zinc-400">{commitMessage}</span> &bull; v2.0-kairogram
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            &copy; 2026{' '}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-white transition bg-transparent border-none p-0 cursor-pointer underline underline-offset-4 decoration-zinc-700"
              title="Admin Access"
            >
              Benedict Adurosakin
            </button>
            . All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-zinc-500">Engineered with Next.js &bull; Inspired by Kairogram Architecture</span>
          </div>
        </div>
      </footer>

      {isAdminOpen && <AdminModal onClose={() => setIsAdminOpen(false)} />}
    </>
  );
}
