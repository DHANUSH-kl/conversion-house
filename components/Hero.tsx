import CompareVisual from "./CompareVisual";

export default function Hero() {
  return (
    <section id="top" className="pt-14 sm:pt-20 pb-16 sm:pb-24">
      <div className="container-x">
        <div className="max-w-3xl fade-up">
          <span className="eyebrow">websites &amp; online stores for small business</span>
          <h1 className="mt-5 text-[36px] leading-[1.08] sm:text-[56px] sm:leading-[1.05] font-semibold tracking-tight text-[var(--ink)]">
            Your business is ready.
            <br />
            Your website isn&apos;t.
          </h1>
          <p className="mt-6 text-[16px] sm:text-[18px] text-[var(--ink-soft)] max-w-xl leading-relaxed">
            Conversion House builds websites, online stores, and brand identities for
            businesses that are done relying on WhatsApp forwards and a Google
            Maps pin. Simple process, fast turnaround, built to bring in
            customers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="btn-primary rounded-full px-6 py-3 text-[14px] font-medium"
            >
              Book a free call
            </a>
            <a
              href="#work"
              className="btn-ghost rounded-full px-6 py-3 text-[14px] font-medium"
            >
              See the work
            </a>
          </div>
        </div>

        <div className="mt-14 sm:mt-16 fade-up" style={{ animationDelay: "120ms" }}>
          <CompareVisual />
          <p className="mt-3 text-center text-[12px] text-[var(--ink-soft)] font-mono-label">
            drag to compare — most small businesses live on the left
          </p>
        </div>
      </div>
    </section>
  );
}
