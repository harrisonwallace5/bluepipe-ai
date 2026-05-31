function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy/90">
      <div className="section-shell flex flex-col gap-3 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 BluePipe AI. Plumbing plan analysis for modern contractor teams.</p>
        <div className="flex items-center gap-5">
          <a href="#home" className="hover:text-white">
            Home
          </a>
          <a href="#upload" className="hover:text-white">
            Upload
          </a>
          <a href="#results" className="hover:text-white">
            Results
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
