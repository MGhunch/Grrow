'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="grrow-wrap">
      <section className="grrow-stage">
        {/* Decorative progress (keeps visual language) */}
        <div className="grrow-progress" aria-hidden>
          <div className="bar" style={{ width: '0%' }} />
        </div>

        <header className="mb-6">
          <h1 className="grrow-skillset-title">Ready to Grrow?</h1>
          <p className="grrow-question-sub text-gray-700">
            Make one-on-ones meaningful, measurable and manageable. Take a quick
            self-assessment to get a clear snapshot and choose where to focus.
          </p>
        </header>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            className="btn btn-accent"
            onClick={() => router.push('/quiz')}
          >
            Start the Quiz
          </button>

          <a href="#how-it-works" className="btn btn-outline">
            How it works
          </a>
        </div>

        <div className="grrow-progress mt-6" aria-hidden>
          <div className="bar" style={{ width: '0%' }} />
        </div>
      </section>

      {/* Optional explainer tiles */}
      <section id="how-it-works" className="mt-8 space-y-4">
        <div className="skill-row">
          <div className="top">
            <span className="name">Answer 12 quick questions</span>
            <span className="status-pill is-learning">FAST</span>
          </div>
          <div className="mini-bar" aria-hidden>
            <span className="fill" style={{ width: '25%' }} />
          </div>
        </div>

        <div className="skill-row">
          <div className="top">
            <span className="name">See your snapshot for each circle</span>
            <span className="status-pill is-growing">INSIGHTS</span>
          </div>
          <div className="mini-bar" aria-hidden>
            <span className="fill" style={{ width: '50%' }} />
          </div>
        </div>

        <div className="skill-row">
          <div className="top">
            <span className="name">Pick Keep / Focus / Grow</span>
            <span className="status-pill is-nailing">ACTION</span>
          </div>
          <div className="mini-bar" aria-hidden>
            <span className="fill" style={{ width: '75%' }} />
          </div>
        </div>
      </section>
    </main>
  );
}
