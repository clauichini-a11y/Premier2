import { motion } from 'motion/react';
import { Clock, Check, HelpCircle } from 'lucide-react';
import { MENU_ITEMS } from '../data/salonData';
import { MenuItem } from '../types';

interface MenuProps {
  onOpenReservationWithMenu: (menuId: string) => void;
}

export default function Menu({ onOpenReservationWithMenu }: MenuProps) {
  // Simple helper to format currency
  const formatYen = (num: number) => `¥${num.toLocaleString()}`;

  return (
    <section id="menu" className="py-24 bg-stone-50 border-b border-stone-200/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Menu & Rates
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            あなたの「今」に、寄り添うメニューを。
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm leading-relaxed tracking-wider font-light">
            冷え、むくみ、更年期──それぞれの状態に合わせたケアをご用意しています。<br className="hidden md:inline" />
            全てのコースには初回お試し優待価格を設定しております。内側から整う感覚を、まずはご体感ください。
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {MENU_ITEMS.map((item: MenuItem, idx: number) => {
            const hasFirstPrice = !!item.firstTimePrice;
            const discountAmount = hasFirstPrice ? item.price - (item.firstTimePrice || 0) : 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-stone-200/80 flex flex-col justify-between overflow-hidden hover:shadow-md hover:border-amber-800/20 transition-all duration-300 group"
              >
                {/* Card Top Information */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Category Tag & Time info */}
                  <div className="flex justify-between items-center">
                    <span className="bg-amber-100/60 text-amber-900 px-3 py-1 rounded text-[11px] font-medium tracking-widest font-serif">
                      {item.category}
                    </span>
                    <span className="flex items-center text-xs text-stone-500 font-mono tracking-wider font-light">
                      <Clock className="w-4 h-4 mr-1 text-stone-400" />
                      {item.duration}分
                    </span>
                  </div>

                  {/* Course Name */}
                  <h3 className="text-lg sm:text-xl font-serif text-stone-800 tracking-wide font-light group-hover:text-amber-800 transition-colors">
                    {item.name}
                  </h3>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed tracking-wider text-justify">
                    {item.description}
                  </p>

                  {/* Benefits checklist */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                      得られる効果・アプローチ
                    </h4>
                    <ul className="space-y-1.5">
                      {item.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start text-xs text-stone-600 tracking-wide">
                          <Check className="w-3.5 h-3.5 mr-2 text-amber-700 flex-shrink-0 mt-0.5" />
                          <span className="font-light">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Pricing & Booking CTA */}
                <div className="bg-stone-50 border-t border-stone-100 p-6 sm:p-8 space-y-4">
                  {/* Pricing Details */}
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-medium text-stone-400 block tracking-widest">
                        通常料金
                      </span>
                      <span className="text-stone-500 text-sm font-mono tracking-wider font-light line-through">
                        {formatYen(item.price)}
                      </span>
                    </div>

                    {hasFirstPrice && (
                      <div className="text-right">
                        <span className="inline-block bg-rose-50 border border-rose-200 text-rose-800 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-widest uppercase mb-1">
                          初回限定 {formatYen(discountAmount)}引
                        </span>
                        <div className="flex items-baseline justify-end space-x-1">
                          <span className="text-xs text-stone-500 tracking-wider">体験価格</span>
                          <span className="text-xl sm:text-2xl font-mono font-medium text-amber-800 tracking-wider">
                            {formatYen(item.firstTimePrice || 0)}
                          </span>
                          <span className="text-xs text-stone-500 font-light">(税込)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Booking CTA for this exact menu */}
                  <button
                    onClick={() => onOpenReservationWithMenu(item.id)}
                    className="w-full bg-white hover:bg-amber-800 hover:text-white text-amber-800 text-xs sm:text-sm tracking-widest font-medium py-3.5 px-4 rounded-md border border-amber-800/30 hover:border-amber-800 shadow-sm transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>このメニューで予約・体験する</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Consultation Helper */}
        <div className="mt-16 bg-amber-50/40 border border-amber-800/10 rounded-xl p-6 sm:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 text-left">
          <HelpCircle className="w-6 h-6 text-amber-800 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <h4 className="text-sm font-serif text-amber-900 font-medium tracking-wide">
              どのメニューを選べばよいか迷う場合も、ご安心ください。
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-light tracking-wide">
              お悩みやご体調は、お一人おひとり、また日によっても異なります。
              当サロンでは、ご予約いただいたメニューに関わらず、当日の詳細カウンセリングにてお客様の状態に合わせて最適なアプローチをご提案いたします。
              「話を聞いてから決めたい」という方は、予約フォームにて「無料カウンセリング」または気になる仮のコースをお気軽にお選びください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
