const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[14px] font-semibold tracking-tight">CONVERSION HOUSE</span>
          <span className="text-[13px] text-[var(--ink-soft)] ml-2">
            Websites & online stores for small business.
          </span>
        </div>
        <div className="flex items-center gap-6 text-[13px] text-[var(--ink-soft)]">
          <a href="#services" className="hover:text-[var(--ink)] transition-colors">Services</a>
          <a href="#pricing" className="hover:text-[var(--ink)] transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-[var(--ink)] transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-[var(--ink)] transition-colors">Contact</a>
        </div>
        <p className="text-[12px] text-[var(--ink-soft)]">
          © {YEAR} CONVERSION HOUSE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
