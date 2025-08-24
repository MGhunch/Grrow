export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-semibold mb-4">Grrow</h1>
        <p className="text-gray-600 mb-6">
          Make one‑on‑ones meaningful, measurable and manageable.
        </p>
        <a
          href="/quiz"
          className="inline-block px-5 py-3 rounded-xl text-white"
          style={{ background:'#5F259F' }}
        >
          Take the Quiz
        </a>
      </div>
    </main>
  );
}
