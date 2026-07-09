'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'About', path: '/' },
    { name: 'Nursing', path: '/nursing' },
    { name: 'Tech', path: '/tech' },
    { name: 'Writing', path: '/writing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="flex gap-6 font-mono text-[10px] tracking-widest uppercase mb-16 overflow-x-auto whitespace-nowrap pb-2 w-full border-b border-zinc-100 dark:border-zinc-900/50">
      {links.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            key={link.path}
            href={link.path}
            className={`${
              isActive
                ? 'border-b-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white pb-1 font-bold'
                : 'text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 transition'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
