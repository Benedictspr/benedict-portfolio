'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminModal from './AdminModal';

interface FooterProps {
  commitMessage?: string;
}

export default function Footer({ commitMessage = 'active-production' }: FooterProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <>
      <footer>
        <div className="shell">
          <div className="fgrid">
            {/* Column 1: Brand & Tagline */}
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-white/20 bg-white/5 shrink-0">
                  <img
                    src="/benedict.png"
                    alt="Benedict Adurosakin"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-white text-base font-extrabold tracking-tight leading-snug">
                    Benedict Adurosakin
                  </h3>
                  <p className="micro text-[0.62rem] text-[var(--faint)]">
                    RN &bull; Software Engineer
                  </p>
                </div>
              </div>

              <p className="text-sm text-white/80 font-medium leading-relaxed mb-3">
                Clinical precision. Scalable systems. Empathetic software.
              </p>
              <p style={{ color: 'var(--faint)', fontSize: '.82rem' }}>
                Lagos, Nigeria<br />
                Serving clinical teams &amp; engineering orgs worldwide
              </p>

              <ul className="socials">
                <li>
                  <a
                    href="https://github.com/Benedictspr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <i className="fa-brands fa-github text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/benedict-adurosakin-736774398"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/icreate_idesign"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X / Twitter"
                    title="X / Twitter"
                  >
                    <i className="fa-brands fa-x-twitter text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/icreate.idesign"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <i className="fa-brands fa-instagram text-sm"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://web.facebook.com/profile.php?id=61578122076472"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <i className="fa-brands fa-facebook text-sm"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Disciplines */}
            <div>
              <h4>Disciplines</h4>
              <ul>
                <li><Link href="/tech">Clinical Informatics</Link></li>
                <li><Link href="/nursing">Critical Care Nursing</Link></li>
                <li><Link href="/tech">Offline-First Software</Link></li>
                <li><Link href="/tech">AI Emergency Triage</Link></li>
                <li><Link href="/research">Biostatistical Audits</Link></li>
              </ul>
            </div>

            {/* Column 3: Directory */}
            <div>
              <h4>Directory</h4>
              <ul>
                <li><Link href="/about">About &bull; Background</Link></li>
                <li><Link href="/tech">Work &bull; Systems</Link></li>
                <li><Link href="/nursing">Clinical ICU Practice</Link></li>
                <li><Link href="/research">Research Vault</Link></li>
                <li><Link href="/writing">Literary Writing</Link></li>
                <li><Link href="/podcasts">Podcast Series</Link></li>
              </ul>
            </div>

            {/* Column 4: Start Here */}
            <div>
              <h4>Start here</h4>
              <ul>
                <li><Link href="/contact">Book a consultation</Link></li>
                <li>
                  <a href="mailto:benedictadurosakin@gmail.com">
                    benedictadurosakin@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/2349061790548?text=Hi%20Benedict%2C%20I%20found%20you%20on%20your%20portfolio%20and%20wanted%20to%20discuss%20"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Direct
                  </a>
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="text-xs text-[var(--faint)] hover:text-[var(--red)] transition bg-transparent border-none p-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Staff Admin</span>
                    <span className="text-[10px] font-mono opacity-70">({commitMessage})</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="fbase">
            <p>&copy; {new Date().getFullYear()} Benedict Adurosakin. All rights reserved.</p>
            <p>Built with Next.js &amp; TypeScript</p>
          </div>
        </div>
      </footer>

      {isAdminOpen && <AdminModal onClose={() => setIsAdminOpen(false)} />}
    </>
  );
}
