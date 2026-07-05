import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';
import { CONCERNS_LIST } from '../data/salonData';

interface ConcernsProps {
  onOpenReservationWithConcerns: (selectedConcerns: string[]) => void;
}

export default function Concerns({ onOpenReservationWithConcerns }: ConcernsProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(CONCERNS_LIST.length).fill(false)
  );

  const toggleCheck = (index: number) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };

  const getSelectedCount = () => checkedItems.filter(Boolean).length;

  const handleConsult = () => {
    const selected = CONCERNS_LIST.filter((_, i) => checkedItems[i]);
    onOpenReservationWithConcerns(selected);
  };

  return (
    <section id="concerns" className="py-24 bg-stone-50 border-b border-stone-200/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Your Signs
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            それ、「歳のせい」で片づけていませんか。
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed tracking-wider font-light">
            手足の冷え、夕方のむくみ、理由のわからない気分の浮き沈み。<br className="hidden sm:inline" />
            それらは、からだの内側からの静かなサインかもしれません。
          </p>
        </div>

        {/* Interactive Checklist Container */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 p-6 sm:p-10 mb-12">
          <p className="text-stone-500 text-xs tracking-wider mb-6 text-center">
            当てはまるものにチェックを入れてみてください（複数選択可能）
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONCERNS_LIST.map((concern, idx) => (
              <button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`flex items-start text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  checkedItems[idx]
                    ? 'bg-amber-50/50 border-amber-600/30 shadow-sm'
                    : 'bg-stone-50/50 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors duration-200 ${
                    checkedItems[idx]
                      ? 'bg-amber-800 border-amber-800 text-white'
                      : 'border-stone-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span
                  className={`ml-3 text-sm tracking-wide transition-colors ${
                    checkedItems[idx] ? 'text-stone-800 font-medium' : 'text-stone-600'
                  }`}
                >
                  {concern}
                </span>
              </button>
            ))}
          </div>

          {/* Feedback Area based on selection */}
          <div className="mt-8 pt-8 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-3 text-left">
              <AlertCircle className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-stone-800">
                  からだの冷えや更年期のゆらぎは、内側のバランスの乱れから
                </p>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  我慢したり、見て見ぬふりをしたりする前に。
                  これらは一時的な疲れではなく、自律神経や巡りの停滞が原因のことが多いです。
                  まずは、ご自身のからだの声に、少しだけ耳を傾けてみませんか。
                </p>
              </div>
            </div>

            {getSelectedCount() > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full md:w-auto flex-shrink-0"
              >
                <button
                  onClick={handleConsult}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-stone-50 text-xs font-medium tracking-widest px-6 py-3.5 rounded-md flex items-center justify-center space-x-2 shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <span>選択した {getSelectedCount()} つの悩みを相談する</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
