import { useState } from 'react';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ResultsPanel from './components/ResultsPanel';
import UploadPanel from './components/UploadPanel';

const pricingTiers = [
  {
    name: 'Field Starter',
    price: '$99',
    cadence: '/month',
    description: 'For individual estimators reviewing small to midsize plumbing packages.',
    features: ['25 plan uploads', 'Fixture schedules', 'AI issue highlights'],
  },
  {
    name: 'Ops Team',
    price: '$349',
    cadence: '/month',
    description: 'For contractors standardizing takeoff review across the preconstruction team.',
    features: ['Unlimited projects', 'Pipe sizing recommendations', 'Shared result history'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    description: 'For multi-office plumbing firms that need API access, security review, and workflow integration.',
    features: ['SSO and audit logs', 'Custom QA rules', 'Priority onboarding'],
  },
];

const workflowSteps = [
  {
    title: 'Upload plan sheets',
    copy: 'Drop PDFs or annotated images from bid sets, as-builts, or coordination packages.',
  },
  {
    title: 'Run AI analysis',
    copy: 'BluePipe AI extracts fixture counts, traces risers, and compares layouts against rules.',
  },
  {
    title: 'Review flagged issues',
    copy: 'Your team gets actionable exceptions before layout, pricing, or field install slips.',
  },
];

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid bg-[size:48px_48px] opacity-20" />
      <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-electric/20 blur-3xl" />

      <Navbar />

      <main>
        <Hero />

        <section id="upload" className="section-shell py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <UploadPanel
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
              onAnalysisResult={setAnalysisData}
            />

            <aside className="panel shadow-glow">
              <div className="p-6 sm:p-8">
                <span className="eyebrow">Built for preconstruction</span>
                <h2 className="section-title mt-4">Move from plan intake to actionable review faster.</h2>
                <p className="muted-copy mt-4">
                  BluePipe AI is shaped for plumbing estimators, project managers, and BIM coordinators who
                  need clear signal from dense plan sets without adding another brittle review step.
                </p>

                <div className="mt-8 grid gap-4">
                  {workflowSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="rounded-2xl border border-white/10 bg-navy/70 p-4 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric text-sm font-semibold text-white">
                          0{index + 1}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-medium text-white">{step.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{step.copy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="results" className="section-shell py-16 sm:py-20">
          <ResultsPanel selectedFile={selectedFile} analysisData={analysisData} />
        </section>

        <section id="pricing" className="section-shell py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Pricing</span>
            <h2 className="section-title mt-4">Roll out AI review at the pace your team can absorb.</h2>
            <p className="muted-copy mt-4">
              Start with plan-level automation, then expand into standard operating procedures and system
              integrations once your review criteria are locked.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className={`panel p-6 sm:p-8 ${tier.featured ? 'border-electric/50 bg-electric/10 shadow-glow' : ''}`}
              >
                <p className="font-display text-2xl font-semibold text-white">{tier.name}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-display text-4xl font-semibold text-white">{tier.price}</span>
                  {tier.cadence ? <span className="pb-1 text-slate-300">{tier.cadence}</span> : null}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{tier.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-electric" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#upload"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 ${
                    tier.featured
                      ? 'bg-white text-navy hover:bg-slate-100'
                      : 'border border-white/15 bg-white/5 text-white hover:border-electric/50 hover:bg-electric/10'
                  }`}
                >
                  Start Analysis
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
