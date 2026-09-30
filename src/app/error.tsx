"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center px-5 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Something went wrong</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">This page couldn’t load.</h1>
      <p className="mt-3 leading-7 text-slate-400">Please try again. If the problem continues, come back in a little while.</p>
      <button onClick={reset} className="mt-6 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-200">Try again</button>
    </section>
  );
}
