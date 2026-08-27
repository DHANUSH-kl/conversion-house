"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-neutral-100 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="font-display text-2xl font-bold tracking-tighter text-black transition-colors group-hover:text-[#ff4500]">
            ConversionHouse.
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium transition-colors hover:text-[#ff4500] ${
                  isActive ? "text-[#ff4500]" : "text-neutral-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center gap-6">
          <span className="text-[12px] text-neutral-400 font-mono">
            [ Client login ]
          </span>
          <Link
            href="/contact"
            className="bg-black hover:bg-[#ff4500] text-white text-[13px] font-semibold px-6 py-3 rounded-full transition-all duration-200"
          >
            Get a quote
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          aria-label="Toggle Navigation Menu"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-1.5 p-2 text-black justify-center items-center"
        >
          <span
            className={`h-[2px] w-6 bg-black transition-transform duration-300 ${
              open ? "translate-y-[8px] rotate-45 bg-[#ff4500]" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black transition-transform duration-300 ${
              open ? "-translate-y-[8px] -rotate-45 bg-[#ff4500]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {open && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-white/95 backdrop-blur z-40 border-t border-neutral-100 animate-fade-in">
          <div className="flex flex-col p-8 gap-6 h-full justify-between pb-24">
            <div className="flex flex-col gap-6">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-display font-semibold text-black hover:text-[#ff4500] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-sm text-neutral-500 font-mono">[ Client login ]</div>
              <Link
                href="/contact"
                className="bg-black hover:bg-[#ff4500] text-white text-center py-4 rounded-full font-semibold transition-colors"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
