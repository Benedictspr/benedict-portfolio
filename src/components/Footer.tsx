'use client';

import { useState } from 'react';
import AdminModal from './AdminModal';

interface FooterProps {
  commitMessage?: string;
}

export default function Footer({ commitMessage = 'onward' }: FooterProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <>
      <footer className="px-6 md:px-12 mt-32 pt-12 pb-10 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center w-full gap-4">
        <div className="flex gap-6 text-xl text-zinc-500">
          <a href="https://github.com/Benedictspr" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/benedict-adurosakin-736774398" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://x.com/icreate_idesign" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://www.instagram.com/icreate.idesign" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://web.facebook.com/profile.php?id=61578122076472" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>

        <div className="text-[11px] font-mono text-zinc-550 dark:text-zinc-400">
          © 2026{' '}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="hover:text-black dark:hover:text-white transition bg-transparent border-none p-0 cursor-pointer"
          >
            Benedict Adurosakin
          </button>
          . All rights reserved.
        </div>
      </footer>

      {isAdminOpen && <AdminModal onClose={() => setIsAdminOpen(false)} />}
    </>
  );
}
