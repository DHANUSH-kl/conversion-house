"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border-b border-neutral-200 dark:border-neutral-800 pb-4 transition-colors"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between py-4 text-left font-display font-medium text-lg md:text-xl transition-colors hover:text-[#ff5722]"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#ff5722]" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed pt-2 pb-4">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
