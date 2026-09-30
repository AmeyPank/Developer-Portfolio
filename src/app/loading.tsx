export default function Loading() {
  return (
    <div role="status" aria-label="Loading portfolio" className="mx-auto max-w-6xl animate-pulse px-5 py-24 sm:px-8">
      <div className="h-5 w-44 rounded bg-white/10" />
      <div className="mt-6 h-14 max-w-3xl rounded bg-white/10" />
      <div className="mt-3 h-14 max-w-2xl rounded bg-white/10" />
      <div className="mt-8 h-5 max-w-xl rounded bg-white/[0.06]" />
      <div className="mt-3 h-5 max-w-lg rounded bg-white/[0.06]" />
    </div>
  );
}
