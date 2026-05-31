// Static demo data — used when no live analysisData is provided
const demoFixtureSchedule = [
  { fixture: 'Water Closet', quantity: 14, supply: '1 in CW', waste: '4 in Sanitary' },
  { fixture: 'Lavatory', quantity: 18, supply: '1 in CW/HW', waste: '2 in Sanitary' },
  { fixture: 'Floor Drain', quantity: 6, supply: 'Trap primer required', waste: '3 in Sanitary' },
  { fixture: 'Janitor Sink', quantity: 2, supply: '3/4 in CW/HW', waste: '2 in Sanitary' },
];

const demoPipeSizingRecommendations = [
  { segment: 'Domestic CW main, Grid B-4 to B-8', recommendation: 'Increase from 1 1/2 in to 2 in', basis: 'Calculated fixture unit load exceeds assumed branch capacity.' },
  { segment: 'Vent stack above Level 3', recommendation: 'Verify 3 in vent sizing', basis: 'Roof penetration serves expanded restroom group after addendum revision.' },
  { segment: 'Storm leader at northeast corner', recommendation: 'Confirm roof area assignment', basis: 'Drainage area annotation missing on architectural overlay.' },
];

const demoFlaggedIssues = [
  'Cleanout not shown at the base of the main waste stack serving the east restroom bank.',
  'Water heater recirculation return is unlabeled between sheets P5.1 and P5.2.',
  'Trap primer coverage appears incomplete for the two floor drains in the janitor closet.',
];

const demoSummaryCards = [
  { label: 'Fixtures mapped', value: '48', detail: 'Across four restroom and service zones' },
  { label: 'Pipe sizing checks', value: '3', detail: 'Branches needing engineer review' },
  { label: 'Coordination issues', value: '7', detail: 'Conflicts or missing annotations detected' },
];

const severityColor = {
  high: 'text-rose-400 bg-rose-500/15 border-rose-400/30',
  medium: 'text-amber-400 bg-amber-500/15 border-amber-400/30',
  low: 'text-slate-300 bg-white/5 border-white/15',
};

function ResultsPanel({ selectedFile, analysisData }) {
  const isLive = analysisData !== null && analysisData !== undefined;

  if (!isLive) {
    // ── DEMO MODE ────────────────────────────────────────────────
    return (
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-6 sm:p-8">
          <span className="eyebrow">Analysis output</span>
          <h2 className="section-title mt-4">Demo results ready for live API replacement</h2>
          <p className="muted-copy mt-4">
            Until the backend is connected, the interface renders representative plumbing analysis output so the
            frontend is production-ready and easy to wire into real responses.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {demoSummaryCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-navy/70 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{card.label}</p>
                <p className="mt-3 font-display text-3xl text-white">{card.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-navy/70 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current source</p>
              <p className="mt-3 font-display text-xl text-white">{selectedFile ? 'Uploaded plan preview' : 'Demo data mode'}</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {selectedFile
                  ? `${selectedFile.name} has been staged in the UI. Analysis values below are still placeholder data.`
                  : 'Connect your API to replace these tables and lists with structured analysis results.'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy/70 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Suggested response shape</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Return <code className="text-electric">fixtureSchedule</code>, <code className="text-electric">pipeSizingRecommendations</code>, <code className="text-electric">flaggedIssues</code>, and a concise summary object
                for top-line KPIs.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-electric/20 bg-electric/10 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Top flagged issue</p>
                <p className="mt-2 text-sm leading-7 text-blue-100">
                  Domestic cold-water branch sizing on the janitor sink / hose bib run appears short of the fixture
                  unit demand shown in the current plan set.
                </p>
              </div>
              <a
                href="#upload"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
              >
                Upload a plan
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel overflow-hidden">
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <h3 className="font-display text-2xl font-semibold text-white">Fixture Schedule</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.22em] text-slate-400">
                  <tr>
                    <th className="px-6 py-4 sm:px-8">Fixture</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Supply</th>
                    <th className="px-6 py-4 sm:px-8">Waste</th>
                  </tr>
                </thead>
                <tbody>
                  {demoFixtureSchedule.map((row) => (
                    <tr key={row.fixture} className="border-t border-white/10">
                      <td className="px-6 py-4 font-medium text-white sm:px-8">{row.fixture}</td>
                      <td className="px-6 py-4">{row.quantity}</td>
                      <td className="px-6 py-4">{row.supply}</td>
                      <td className="px-6 py-4 sm:px-8">{row.waste}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="panel p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-white">Pipe Sizing Recommendations</h3>
              <div className="mt-6 space-y-4">
                {demoPipeSizingRecommendations.map((item) => (
                  <div key={item.segment} className="rounded-2xl border border-white/10 bg-navy/70 p-4">
                    <p className="font-medium text-white">{item.segment}</p>
                    <p className="mt-2 text-sm font-semibold text-electric">{item.recommendation}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.basis}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-white">Flagged Issues</h3>
              <ul className="mt-6 space-y-4">
                {demoFlaggedIssues.map((issue) => (
                  <li key={issue} className="rounded-2xl border border-white/10 bg-navy/70 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-electric/15 text-xs font-semibold text-electric">
                        !
                      </span>
                      <p className="text-sm leading-7 text-slate-200">{issue}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── LIVE MODE ────────────────────────────────────────────────
  const { fixtures, kpis, flagged_issues, summary } = analysisData;
  const topIssue = flagged_issues?.[0];

  const liveCards = [
    { label: 'Fixtures mapped', value: String(kpis.total_fixtures), detail: `Across ${fixtures.length} fixture types` },
    { label: 'Issues flagged', value: String(kpis.flagged_count), detail: 'For engineer review' },
    { label: 'Pipe runs est.', value: String(kpis.pipe_runs_estimated), detail: `${kpis.estimated_labor_hrs} labor hours` },
  ];

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="panel p-6 sm:p-8">
        <span className="eyebrow">Analysis output</span>
        <h2 className="section-title mt-4">
          AI analysis complete — {fixtures.length} fixture types identified
        </h2>
        <p className="muted-copy mt-4">{summary}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {liveCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-white/10 bg-navy/70 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{card.label}</p>
              <p className="mt-3 font-display text-3xl text-white">{card.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-navy/70 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current source</p>
            <p className="mt-3 font-display text-xl text-white">{selectedFile?.name ?? 'Uploaded plan'}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">Live API response — results below reflect the uploaded plan file.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-navy/70 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Labor estimate</p>
            <p className="mt-3 font-display text-3xl text-white">{kpis.estimated_labor_hrs}</p>
            <p className="mt-1 text-sm text-slate-300">Estimated labor hours · {kpis.pipe_runs_estimated} pipe run segments</p>
          </div>
        </div>

        {topIssue && (
          <div className="mt-8 rounded-3xl border border-electric/20 bg-electric/10 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">Top flagged issue</p>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${severityColor[topIssue.severity] ?? severityColor.low}`}>
                    {topIssue.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-7 text-blue-100">{topIssue.description}</p>
                <p className="mt-1 text-xs text-slate-400">Page {topIssue.page}</p>
              </div>
              <a
                href="#upload"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
              >
                Upload another
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Live fixture schedule table */}
        <div className="panel overflow-hidden">
          <div className="border-b border-white/10 px-6 py-5 sm:px-8">
            <h3 className="font-display text-2xl font-semibold text-white">Fixture Schedule</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.22em] text-slate-400">
                <tr>
                  <th className="px-6 py-4 sm:px-8">Fixture</th>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Count</th>
                  <th className="px-6 py-4 sm:px-8">Location</th>
                </tr>
              </thead>
              <tbody>
                {fixtures.map((row) => (
                  <tr key={row.id} className="border-t border-white/10">
                    <td className="px-6 py-4 font-medium text-white sm:px-8">{row.type}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{row.id}</td>
                    <td className="px-6 py-4">{row.count}</td>
                    <td className="px-6 py-4 sm:px-8 text-slate-300">{row.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Live flagged issues */}
          <div className="panel p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-white">Flagged Issues</h3>
            <ul className="mt-6 space-y-4">
              {flagged_issues.map((issue, idx) => (
                <li key={idx} className="rounded-2xl border border-white/10 bg-navy/70 p-4">
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      issue.severity === 'high' ? 'bg-rose-500/20 text-rose-300' :
                      issue.severity === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-electric/15 text-electric'
                    }`}>!</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold uppercase tracking-wide ${
                          issue.severity === 'high' ? 'text-rose-400' :
                          issue.severity === 'medium' ? 'text-amber-400' :
                          'text-slate-400'
                        }`}>{issue.severity}</span>
                        <span className="text-xs text-slate-500">· Page {issue.page}</span>
                      </div>
                      <p className="mt-1 text-sm leading-7 text-slate-200">{issue.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Labor estimate card */}
          <div className="panel p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-white">Labor Estimate</h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-navy/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Estimated labor hours</p>
                <p className="mt-3 font-display text-5xl font-semibold text-electric">{kpis.estimated_labor_hrs}</p>
                <p className="mt-2 text-sm text-slate-300">hrs for installation</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-navy/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Pipe run segments</p>
                <p className="mt-3 font-display text-3xl font-semibold text-white">{kpis.pipe_runs_estimated}</p>
                <p className="mt-2 text-sm text-slate-300">estimated run segments identified</p>
              </div>
              <div className="rounded-2xl border border-electric/20 bg-electric/10 p-4">
                <p className="text-xs font-medium text-electric">Note</p>
                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Connect real AI inference for project-specific material and labor estimates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPanel;
