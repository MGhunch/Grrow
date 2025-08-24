async function fetchAllQuestions(): Promise<Question[]> {
  const res = await fetch("/api/questions", { cache: "no-store" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Failed to load questions (${res.status})`);
  }
  const data = await res.json();
  return data.questions as Question[];
}
