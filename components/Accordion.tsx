"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto border-t border-neutral-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border-b border-neutral-200/80 transition-colors"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between py-7 sm:py-9 text-left group cursor-pointer select-none"
            >
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-black tracking-tight group-hover:text-[#ff4500] transition-colors pr-6">
                {item.question}
              </h3>
              
              <span className={`text-[#ff4500] font-light text-3xl sm:text-4xl transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                +
              </span>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 text-neutral-700 font-sans text-base sm:text-lg leading-relaxed max-w-4xl">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
