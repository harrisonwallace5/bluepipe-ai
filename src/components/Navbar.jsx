import { useState } from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Upload', href: '#upload' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/85 backdrop-blur-xl">
      <div className="section-shell">
        <nav className="flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-electric shadow-glow">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none">
                <path
                  d="M5 8.5h7.5a3.5 3.5 0 1 0 0-7H9.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 15.5h10a3.5 3.5 0 1 1 0 7h-2.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M5 4.5v15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M9.5 4.5v15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
              </svg>
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-white">BluePipe AI</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Plumbing Plan Analyzer</p>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white">
                {link.label}
              </a>
            ))}
            <a
              href="#upload"
              className="rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Analyze My Plans
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-2 bg-white transition ${
                  menuOpen ? 'translate-y-0 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-white transition ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 translate-y-1 bg-white transition ${
                  menuOpen ? 'translate-y-0 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </nav>

        {menuOpen ? (
          <div className="grid gap-2 border-t border-white/10 pb-4 pt-3 md:hidden">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#upload"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-electric px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Analyze My Plans
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;
