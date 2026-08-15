const TYPES = [
  "Restaurants & Cafes",
  "Salons & Spas",
  "Gyms & Studios",
  "Hotels & Homestays",
  "Bike & Auto Dealers",
  "Clinics",
  "Boutiques",
  "Local Services",
];

export default function LogoStrip() {
  const items = [...TYPES, ...TYPES];
  return (
    <section id="work" className="border-y border-[var(--line)] py-8 overflow-hidden">
      <p className="text-center text-[12px] font-mono-label uppercase tracking-wider text-[var(--ink-soft)] mb-6">
        Built for businesses like these
      </p>
      <div className="relative">
        <div className="flex w-max gap-10 marquee-track">
          {items.map((t, i) => (
            <span
              key={i}
              className="text-[15px] sm:text-[17px] text-[var(--ink)]/70 whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      </div>
    </section>
  );
}
