"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--line)]" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/CONVERION HOUSE LOGO .png"
            alt="Conversion House"
            width={180}
            height={45}
            className="h-8 w-auto object-contain invert scale-[1.5] origin-left"
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="btn-primary rounded-full px-4 py-2 text-[13px] font-medium"
          >
            Book a free call
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-[1.5px] w-5 bg-[var(--ink)] transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-[var(--ink)] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-[var(--ink)] transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--bg)]">
          <div className="container-x flex flex-col py-4 gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[15px] text-[var(--ink-soft)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary rounded-full px-4 py-2.5 text-[14px] font-medium text-center"
            >
              Book a free call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
