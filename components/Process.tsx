const STEPS = [
  { step: "Discover", desc: "A 20-minute call to understand your business, customers, and what you need the site to do." },
  { step: "Design", desc: "We design pages around how your customers actually decide to buy, book, or visit." },
  { step: "Build", desc: "Development, content, and testing on real devices — no placeholder text left behind." },
  { step: "Launch & grow", desc: "We go live, connect it to Google, and stay on for updates as your business grows." },
];

export default function Process() {
  return (
    <section className="py-20 sm:py-28 border-t border-[var(--line)]">
      <div className="container-x">
        <div className="max-w-xl">
          <span className="eyebrow">how it works</span>
          <h2 className="mt-4 text-[28px] sm:text-[38px] font-semibold tracking-tight leading-tight">
            From first call to live site, in one straight line.
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-4 gap-8 sm:gap-6">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative pt-6 border-t border-[var(--line)]">
              <span className="font-mono-label text-[12px] text-[var(--accent-ink)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[16px] font-semibold">{s.step}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--ink-soft)]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
