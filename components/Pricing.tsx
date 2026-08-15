const PLANS = [
  {
    name: "Starter",
    price: "₹19,999",
    note: "one-time",
    desc: "A clean, complete website to get you online and easy to find.",
    features: [
      "Up to 5 pages",
      "Mobile-friendly design",
      "Contact & WhatsApp integration",
      "Google Maps & search setup",
      "7-day delivery",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹44,999",
    note: "one-time",
    desc: "For businesses ready to sell online or capture bookings directly.",
    features: [
      "Everything in Starter",
      "Online store or booking system",
      "Payment gateway setup",
      "Basic brand identity",
      "3 months of free support",
    ],
    highlight: true,
  },
  {
    name: "Custom",
    price: "Let's talk",
    note: "scoped to you",
    desc: "Multi-location businesses, custom features, or a full brand relaunch.",
    features: [
      "Everything in Growth",
      "Custom features & integrations",
      "Full brand identity system",
      "Ongoing retainer support",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 border-t border-[var(--line)]">
      <div className="container-x">
        <div className="max-w-xl">
          <span className="eyebrow">pricing</span>
          <h2 className="mt-4 text-[28px] sm:text-[38px] font-semibold tracking-tight leading-tight">
            Straightforward pricing, no surprises.
          </h2>
          <p className="mt-4 text-[var(--ink-soft)] text-[16px]">
            One-time project cost. No hidden monthly platform fees.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 items-start">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-7 sm:p-8 flex flex-col h-full ${
                p.highlight
                  ? "bg-[var(--ink)] text-white border border-[var(--ink)]"
                  : "bg-[var(--paper)] border border-[var(--line)]"
              }`}
            >
              {p.highlight && (
                <span className="self-start text-[11px] font-mono-label uppercase tracking-wider bg-[var(--accent)] text-white rounded-full px-2.5 py-1 mb-4">
                  most popular
                </span>
              )}
              <h3 className={`text-[17px] font-semibold ${p.highlight ? "text-white" : ""}`}>
                {p.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[30px] font-semibold tracking-tight">{p.price}</span>
                <span className={`text-[13px] ${p.highlight ? "text-white/60" : "text-[var(--ink-soft)]"}`}>
                  {p.note}
                </span>
              </div>
              <p className={`mt-3 text-[14px] leading-relaxed ${p.highlight ? "text-white/75" : "text-[var(--ink-soft)]"}`}>
                {p.desc}
              </p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px]">
                    <span className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${p.highlight ? "bg-[var(--accent)]" : "bg-[var(--accent)]"}`} />
                    <span className={p.highlight ? "text-white/90" : "text-[var(--ink)]"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-7 text-center rounded-full px-5 py-2.5 text-[13px] font-medium ${
                  p.highlight
                    ? "bg-white text-[var(--ink)] hover:bg-[var(--accent-tint)] transition-colors"
                    : "btn-ghost"
                }`}
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
