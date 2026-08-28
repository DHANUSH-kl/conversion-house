import QuoteCalculator from "@/components/QuoteCalculator";
import { MessageSquare, Mail, Briefcase, LifeBuoy, CreditCard, UserCheck } from "lucide-react";

export const metadata = {
  title: "Contact & Estimate — ConversionHouse",
  description: "Get in touch with ConversionHouse or calculate an estimated investment for your project.",
};

export default function ContactPage() {
  const contactChannels = [
    {
      title: "General Inquiries",
      email: "contact@conversionhouse.in",
      desc: "For general questions, studio info, and introduction calls.",
      icon: Mail,
    },
    {
      title: "New Projects & Scope",
      email: "projects@conversionhouse.in",
      desc: "Ready to start a brand, website, or digital system? Reach out to our project team.",
      icon: Briefcase,
    },
    {
      title: "Client Support & Maintenance",
      email: "support@conversionhouse.in",
      desc: "For active clients needing help, updates, maintenance, or growth support.",
      icon: LifeBuoy,
    },
    {
      title: "Accounts & Finance",
      email: "accounts@conversionhouse.in",
      desc: "For billing, invoices, payments, and financial queries.",
      icon: CreditCard,
    },
    {
      title: "Founder / Direct Contact",
      email: "dhanush@conversionhouse.in",
      desc: "Direct line for strategic partnerships and founder consultations.",
      icon: UserCheck,
    },
  ];

  return (
    <main className="bg-black text-white pt-32 pb-24 min-h-[90vh] flex flex-col justify-center">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
          <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Dynamic Pricing Engine ]</span>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
            Tell us what you're building.
          </h1>
          <p className="text-neutral-400 text-sm">
            Select what you need. Get an estimated investment.
          </p>
        </div>

        <QuoteCalculator />

        {/* DIRECT CONTACT CHANNELS & ALIASES */}
        <div className="mt-28 border-t border-neutral-900 pt-20 max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[#ff4500] text-xs font-mono uppercase tracking-widest">[ Direct Channels ]</span>
            <h2 className="font-display text-3xl md:text-4xl text-white">
              Get in touch directly.
            </h2>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">
              Need immediate assistance or looking to reach a specific department? Choose the best channel below.
            </p>
          </div>

          {/* WHATSAPP HIGHLIGHT CARD */}
          <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-2xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ff4500]/10 border border-[#ff4500]/30 flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-[#ff4500]" />
              </div>
              <div>
                <h3 className="font-display text-lg text-white font-semibold">WhatsApp Enquiries</h3>
                <p className="text-xs text-neutral-400 mt-1">Instant chat for quick questions, quotes, and project discussions.</p>
                <p className="text-sm font-mono text-[#ff4500] mt-1">+91 99004 47762</p>
              </div>
            </div>
            <a
              href="https://wa.me/919900447762"
              target="_blank"
              rel="noreferrer"
              className="bg-[#ff4500] hover:bg-[#ff5722] text-white text-xs font-mono font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors shrink-0"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* EMAIL ALIASES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.email}
                  href={`mailto:${channel.email}`}
                  className="group bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-6 rounded-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{channel.title}</span>
                      <Icon className="w-4 h-4 text-[#ff4500] group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-mono text-sm font-semibold text-white group-hover:text-[#ff4500] transition-colors block mb-2">
                      {channel.email}
                    </span>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {channel.desc}
                    </p>
                  </div>
                  <div className="mt-6 text-[11px] font-mono text-[#ff4500] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Send Email &rarr;
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
