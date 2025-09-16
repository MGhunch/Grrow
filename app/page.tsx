import { redirect } from "next/navigation";

export default function Home() {
  redirect("/quiz"); // server-side redirect
}
``` [oai_citation:0‡page (1).tsx](file-service://file-Sc6WJk7B8igbdzZh4tPHnr)

That’s why your app always goes straight into the quiz — this redirect runs before your landing page can render.

---

✅ **Fix**

Replace `app/page.tsx` with your proper landing page component (the one you pasted earlier with the “Start the Quiz” button). For example:

```tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="grrow-wrap">
      <section className="grrow-stage">
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
    </main>
  );
}
