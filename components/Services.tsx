const SERVICES = [
  {
    n: "01",
    title: "Website Design & Development",
    desc: "A fast, mobile-friendly website that explains what you do, builds trust, and makes it easy to call, message, or visit.",
    points: ["Custom design, not a template", "Google-friendly from day one", "Live in 7–10 days"],
  },
  {
    n: "02",
    title: "Online Stores",
    desc: "Sell directly to customers with a store that handles payments, inventory, and orders without extra staff.",
    points: ["Secure checkout & payments", "Inventory that stays in sync", "Works on any device"],
  },
  {
    n: "03",
    title: "Branding & Identity",
    desc: "A logo, colours, and visual identity that make your business look as good as it actually is.",
    points: ["Logo & visual identity", "Signage & menu-ready assets", "Social media templates"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-xl">
          <span className="eyebrow">what we do</span>
          <h2 className="mt-4 text-[28px] sm:text-[38px] font-semibold tracking-tight leading-tight">
            Three things. Done properly.
          </h2>
          <p className="mt-4 text-[var(--ink-soft)] text-[16px]">
            No bloated packages. We focus on what actually moves the needle
            for a small business online.
          </p>
        </div>

        <div className="mt-12 grid gap-px bg-[var(--line)] border border-[var(--line)] rounded-2xl overflow-hidden sm:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.n} className="bg-[var(--paper)] p-7 sm:p-8 flex flex-col">
              <span className="font-mono-label text-[12px] text-[var(--ink-soft)]">
                {s.n}
              </span>
              <h3 className="mt-4 text-[19px] font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)] flex-1">
                {s.desc}
              </p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] text-[var(--ink)]">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--accent)] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
