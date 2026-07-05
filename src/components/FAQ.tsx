import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/salonData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-stone-100/40 border-b border-stone-200/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Questions & Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            ご不安な点は、事前にご確認ください。
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm leading-relaxed tracking-wider font-light">
            初めての方からよくいただくご質問をまとめました。<br className="hidden sm:inline" />
            記載のない気になる点につきましては、お問合せフォームよりいつでもお気軽にご相談ください。
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-stone-50/50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-medium text-stone-800 tracking-wide pr-4">
                    Q. {faq.question}
                  </span>
                  <div className="text-stone-400 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer Area with smooth dropdown animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-5 sm:p-6 bg-stone-50/50 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-loose tracking-widest font-light text-justify">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
