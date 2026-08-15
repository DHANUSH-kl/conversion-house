const QUOTES = [
  {
    quote:
      "We used to lose customers who just couldn't find us online. Three months after launch, half our new bookings come straight from the website.",
    name: "Ramesh Iyer",
    role: "Owner, The Grain House",
  },
  {
    quote:
      "Conversion House actually asked about our customers before designing anything. The site feels like our shop, not a template with our name on it.",
    name: "Ayesha Khan",
    role: "Founder, Studio Ayesha Salon",
  },
  {
    quote:
      "Our online store paid for itself in the first month. Orders come in while we sleep now.",
    name: "Vikram Shetty",
    role: "Director, Shetty Auto Parts",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--paper)] border-t border-[var(--line)]">
      <div className="container-x">
        <div className="max-w-xl">
          <span className="eyebrow">what clients say</span>
          <h2 className="mt-4 text-[28px] sm:text-[38px] font-semibold tracking-tight leading-tight">
            Results our clients notice.
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="rounded-2xl border border-[var(--line)] p-7 flex flex-col justify-between bg-[var(--bg)]"
            >
              <blockquote className="text-[15px] leading-relaxed text-[var(--ink)]">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-[var(--line)]">
                <div className="text-[14px] font-semibold">{q.name}</div>
                <div className="text-[13px] text-[var(--ink-soft)]">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
