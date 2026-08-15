"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How long does a project take?",
    a: "A standard website is live in 7–10 days once we have your content and approve the design. Online stores and custom branding usually take 3–4 weeks.",
  },
  {
    q: "Do I need to give you content and photos?",
    a: "You can, or we can write the copy and source stock photography for you. Most clients give us the basics and we take it from there.",
  },
  {
    q: "What if I already have a domain or old website?",
    a: "No problem. We can migrate your existing domain or help you register a new one, and move your content across without any downtime.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Starter includes 30 days of bug fixes, Growth includes 3 months of support, and we offer simple monthly retainers after that for anyone who wants ongoing changes.",
  },
  {
    q: "Can you also handle our social media or ads?",
    a: "That's not our core focus, but we can set up your Google Business profile and social pages so they match your new brand, and point you to trusted partners for ongoing marketing.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 border-t border-[var(--line)]">
      <div className="container-x">
        <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 sm:gap-16">
          <div>
            <span className="eyebrow">faq</span>
            <h2 className="mt-4 text-[28px] sm:text-[38px] font-semibold tracking-tight leading-tight">
              Questions, answered.
            </h2>
            <p className="mt-4 text-[var(--ink-soft)] text-[15px] max-w-sm">
              Can't find what you're looking for? Book a call and we'll
              answer it directly.
            </p>
          </div>

          <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
            {FAQS.map((f, i) => {
              const open = openIdx === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[15px] sm:text-[16px] font-medium text-[var(--ink)]">
                      {f.q}
                    </span>
                    <span
                      className={`shrink-0 h-6 w-6 rounded-full border border-[var(--line)] flex items-center justify-center text-[13px] transition-transform duration-300 ${
                        open ? "rotate-45 bg-[var(--accent)] text-white border-[var(--accent)]" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-[14px] leading-relaxed text-[var(--ink-soft)] max-w-lg">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
