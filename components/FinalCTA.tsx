export default function FinalCTA() {
  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-[var(--line)]">
      <div className="container-x">
        <div className="rounded-3xl bg-[var(--ink)] text-white px-8 py-16 sm:px-16 sm:py-20 text-center relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--accent)" }}
          />
          <span className="eyebrow !text-[var(--accent)]">let's get you online</span>
          <h2 className="font-display mt-5 text-[30px] sm:text-[46px] font-semibold leading-tight tracking-tight max-w-3xl mx-auto text-white">
            Working on something serious?
            <br />
            Get a quote in <span className="text-[#ff4500] font-bold">under 5 minutes.</span>
          </h2>
          <p className="mt-5 text-white/70 max-w-lg mx-auto text-[15px] sm:text-[16px]">
            Book a free 20-minute call. We'll look at what you have today and
            tell you exactly what it needs.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:contact@conversionhouse.in"
              className="rounded-full bg-white text-[var(--ink)] px-6 py-3 text-[14px] font-medium hover:bg-[var(--accent-tint)] transition-colors"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/919900447762"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/25 px-6 py-3 text-[14px] font-medium hover:bg-white/10 transition-colors"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
