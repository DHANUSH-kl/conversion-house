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
                We build brands, websites, e-commerce experiences and growth systems designed to help businesses move forward.
              </p>
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
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  "Branding",
                  "Websites",
                  "E-commerce",
                  "SEO",
                  "Meta Ads",
                  "Google Ads",
                  "CRO",
                  "Analytics",
                  "Maintenance"
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="/services"
                      className="text-neutral-600 hover:text-black text-sm transition-colors"
                    >
                      {item}
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

          {/* CTA Block */}
          <div className="md:col-span-3 flex flex-col justify-between bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
            <div>
              <h4 className="text-lg font-display font-semibold mb-2 text-black">
                Have a project in mind?
              </h4>
              <p className="text-xs text-neutral-500 mb-6">
                Tell us about the brand, website, or growth system you're trying to build.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-black hover:bg-[#ff4500] text-white text-center py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Get a quote
            </Link>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} ConversionHouse. All rights reserved.</p>
          <p className="font-mono">Built for businesses ready to take digital seriously.</p>
        </div>
      </div>
    </footer>
  );
}
