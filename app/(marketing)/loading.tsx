/**
 * @file app/(marketing)/loading.tsx
 * @description Instant route-transition skeleton. App Router shows this while
 * a static segment streams in ~ prevents blank flashes on slower networks
 * and makes client navigations feel immediate.
 */

export default function MarketingLoading() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-4 w-32 rounded bg-secondary" />
      <div className="mt-6 h-12 w-3/4 rounded bg-secondary" />
      <div className="mt-4 h-5 w-1/2 rounded bg-muted" />
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="h-40 rounded-lg border border-border bg-card" />
        <div className="h-40 rounded-lg border border-border bg-card" />
        <div className="h-40 rounded-lg border border-border bg-card" />
      </div>
    </div>
  );
}
