"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-neutral-100 pt-24 pb-12">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-neutral-100">
          
          {/* Brand Identity / Left info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="group flex flex-col mb-4">
                <span className="font-display text-2xl font-bold tracking-tighter text-black transition-colors group-hover:text-[#ff4500]">
                  ConversionHouse.
                </span>
                <span className="text-xs text-[#ff4500] tracking-widest uppercase font-semibold">
                  Brand. Build. Convert. Grow.
                </span>
              </Link>
              <p className="text-neutral-500 text-sm max-w-sm leading-relaxed mt-4">
                We build brands, websites, performance marketing campaigns, and growth systems designed to turn attention into qualified customers.
              </p>
              
              {/* Contact Information */}
              <div className="mt-6 space-y-1.5 text-xs text-neutral-600 font-mono">
                <p>
                  <span className="text-[#ff4500]">Email:</span>{" "}
                  <a href="mailto:contact@conversionhouse.in" className="hover:underline hover:text-black">
                    contact@conversionhouse.in
                  </a>
                </p>
                <p>
                  <span className="text-[#ff4500]">WhatsApp:</span>{" "}
                  <a href="https://wa.me/919900447762" target="_blank" rel="noreferrer" className="hover:underline hover:text-black">
                    +91 99004 47762
                  </a>
                </p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 pt-4">
              <span className="text-xs text-neutral-400 font-mono block">
                [ Located Remotely · Working Globally ]
              </span>
            </div>
          </div>

          {/* Navigation link stacks */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            {/* Services */}
            <div>
              <h4 className="text-xs font-mono text-[#ff4500] uppercase tracking-wider mb-4">
                Capabilities
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Meta Ads Agency", href: "/services/meta-ads" },
                  { label: "Google Ads Agency", href: "/services/google-ads" },
                  { label: "Lead Generation", href: "/services/lead-generation" },
                  { label: "CRO & UX Design", href: "/services/conversion-rate-optimization" },
                  { label: "UGC Ads Creative", href: "/services/ugc-ads" },
                  { label: "All Capabilities", href: "/services" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-neutral-600 hover:text-black text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-mono text-[#ff4500] uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Work", href: "/work" },
                  { label: "About", href: "/about" },
                  { label: "Process", href: "/process" },
                  { label: "Contact", href: "/contact" },
                  { label: "Insights", href: "/insights" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-black text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA & Contact Block */}
          <div className="md:col-span-3 flex flex-col justify-between bg-neutral-50/70 p-6 sm:p-7 rounded-2xl border border-neutral-200/60 shadow-sm">
            <div>
              <h4 className="text-lg font-display font-semibold mb-4 text-black tracking-normal">
                Talk to the right person.
              </h4>
              <ul className="divide-y divide-neutral-200/80 text-[11px] font-mono text-neutral-600 mb-6">
                <li className="pb-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#ff4500] font-bold">Projects:</span>
                  <a href="mailto:projects@conversionhouse.in" className="hover:text-black transition-colors font-mono">
                    projects@conversionhouse.in
                  </a>
                </li>
                <li className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#ff4500] font-bold">Support:</span>
                  <a href="mailto:support@conversionhouse.in" className="hover:text-black transition-colors font-mono">
                    support@conversionhouse.in
                  </a>
                </li>
                <li className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#ff4500] font-bold">Accounts:</span>
                  <a href="mailto:accounts@conversionhouse.in" className="hover:text-black transition-colors font-mono">
                    accounts@conversionhouse.in
                  </a>
                </li>
                <li className="pt-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#ff4500] font-bold">Direct:</span>
                  <a href="mailto:dhanush@conversionhouse.in" className="hover:text-black transition-colors font-mono">
                    dhanush@conversionhouse.in
                  </a>
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="bg-black hover:bg-[#ff4500] text-white text-center py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Get a quote
            </Link>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <p>© {new Date().getFullYear()} ConversionHouse. All rights reserved.</p>
          <p className="text-[#ff4500]">Brand. Build. Convert. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
