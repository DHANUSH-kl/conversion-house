import QuoteCalculator from "@/components/QuoteCalculator";

export const metadata = {
  title: "Get an Estimate — ConversionHouse",
  description: "Select what you need. Get an estimated investment dynamically calculated using our studio framework.",
};

export default function ContactPage() {
  return (
    <main className="bg-black text-white pt-32 pb-24 min-h-[90vh] flex flex-col justify-center">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Dynamic Pricing Engine ]</span>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
            Tell us what you're building.
          </h1>
          <p className="text-neutral-400 text-sm">
            Select what you need. Get an estimated investment.
          </p>
        </div>

        <QuoteCalculator />
      </div>
    </main>
  );
}
