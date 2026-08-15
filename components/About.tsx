export default function About() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--paper)] border-t border-[var(--line)]">
      <div className="container-x">
        <div className="grid sm:grid-cols-[220px_1fr] gap-8 sm:gap-14 items-start">
          <div>
            <span className="eyebrow">who's behind conversion house</span>
          </div>
          <div className="max-w-2xl">
            <div className="h-14 w-14 rounded-full bg-[var(--accent-tint)] border border-[var(--line)] flex items-center justify-center font-mono-label text-[13px] text-[var(--accent-ink)]">
              CH
            </div>
            <p className="mt-6 text-[19px] sm:text-[22px] leading-relaxed tracking-tight text-[var(--ink)]">
              Conversion House started because too many good businesses were invisible
              online — not from lack of quality, but lack of a website that
              did them justice. We work with owners directly, keep the
              process simple, and build sites meant to be used, not just
              looked at.
            </p>
            <p className="mt-4 text-[14px] text-[var(--ink-soft)]">
              — The Conversion House team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
