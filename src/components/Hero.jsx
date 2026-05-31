function Hero() {
  return (
    <section id="home" className="section-shell relative py-16 sm:py-20 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-3xl">
          <span className="eyebrow">AI review for plumbing teams</span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI-Powered Plumbing Plan Analysis
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Turn dense plumbing drawings into structured takeoff intelligence. BluePipe AI identifies fixture
            counts, recommends pipe sizing, and surfaces layout conflicts before they slow estimating or field
            coordination.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#upload"
              className="inline-flex items-center justify-center rounded-full bg-electric px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500"
            >
              Analyze My Plans
            </a>
            <a
              href="#results"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition duration-200 hover:border-electric/50 hover:bg-white/10"
            >
              View Demo Results
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="panel p-4">
              <p className="font-display text-2xl font-semibold text-white">94%</p>
              <p className="mt-2 text-sm text-slate-300">Typical first-pass sheet coverage before human QA.</p>
            </div>
            <div className="panel p-4">
              <p className="font-display text-2xl font-semibold text-white">3x</p>
              <p className="mt-2 text-sm text-slate-300">Faster plan review for fixture schedules and riser checks.</p>
            </div>
            <div className="panel p-4">
              <p className="font-display text-2xl font-semibold text-white">24/7</p>
              <p className="mt-2 text-sm text-slate-300">Consistent analysis across bid-day revisions and change sets.</p>
            </div>
          </div>
        </div>

        <div className="panel relative overflow-hidden shadow-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-transparent to-transparent" />
          <div className="relative p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Live workflow preview</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">Bid package intelligence</h2>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Ready for review
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-navy/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Detected package</p>
                <p className="mt-2 font-display text-xl text-white">Level 2 Core Restroom Group</p>
                <p className="mt-2 text-sm text-slate-300">12 sheets parsed, 3 riser paths identified, 7 exceptions flagged.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Fixture count</p>
                  <p className="mt-3 font-display text-3xl text-white">48</p>
                  <p className="mt-2 text-sm text-slate-300">Carrier-supported fixtures mapped to the schedule.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Sizing alerts</p>
                  <p className="mt-3 font-display text-3xl text-white">3</p>
                  <p className="mt-2 text-sm text-slate-300">Branches needing sizing verification before release.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-electric/20 bg-electric/10 p-4">
                <p className="text-sm font-semibold text-white">Top AI finding</p>
                <p className="mt-2 text-sm leading-7 text-blue-100">
                  Domestic cold-water branch serving janitor sink and hose bib is undersized relative to the
                  combined fixture unit load shown on sheet P4.2.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
