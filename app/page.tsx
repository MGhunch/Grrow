'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="mx-auto w-full max-w-[44rem] px-4">
      <section className="bg-white rounded-2xl shadow p-5 sm:p-8 my-5">
        {/* decorative progress */}
        <div className="h-1.5 rounded-full bg-gray-200 mb-6" aria-hidden>
          <div className="h-full w-0 bg-brand-accent" />
        </div>

        <header className="mb-6">
          <h1 className="text-2xl font-bold text-brand-purple mb-3">
            Ready to Grrow?
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Make one-on-ones meaningful, measurable and manageable. Take a quick
            self-assessment to get a clear snapshot and choose where to focus.
          </p>
        </header>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            className="btn btn-accent w-full sm:w-auto"
            onClick={() => router.push('/quiz')}
          >
            Start the Quiz
          </button>
          <a href="#how-it-works" className="btn btn-outline w-full sm:w-auto">
            How it works
          </a>
        </div>

        <div className="h-1.5 rounded-full bg-gray-200 mt-8" aria-hidden>
          <div className="h-full w-0 bg-brand-accent" />
        </div>
      </section>
    </main>
  );
}
