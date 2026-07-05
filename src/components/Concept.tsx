import { motion } from 'motion/react';
import { REASONS_LIST, SALON_NAME } from '../data/salonData';

export default function Concept() {
  // Map reasons to their respective high-quality generated images
  const images = [
    '/src/assets/images/salon_room_1783241920958.jpg', // Reason 1 (Private Room)
    '/src/assets/images/organic_oil_1783241935131.jpg', // Reason 2 (Organic Oils)
    'https://picsum.photos/seed/spa_relax/800/600' // Reason 3 (Method - Warm, calm abstract)
  ];

  return (
    <section id="concept" className="py-24 bg-stone-100/40 border-b border-stone-200/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Our Concept & Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            「外側」より「内側」を。<br className="sm:hidden" />
            {SALON_NAME.split(' ')[1]}が大切にしていること
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm leading-relaxed tracking-wider font-light">
            私たちが大切にしているのは、表面的な「見た目を変える」ことだけではありません。<br className="hidden md:inline" />
            からだの内側の巡り（リンパ・血流・自律神経）を整え、ご自身本来のリズムを取り戻していただくこと。<br className="hidden md:inline" />
            そのために、以下の3つの約束を守り、静かに寄り添います。
          </p>
        </div>

        {/* Reasons Grid (Alternating magazine style) */}
        <div className="space-y-24">
          {REASONS_LIST.map((reason, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={reason.number}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Box */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.0, ease: 'easeOut' }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden shadow-md group">
                    <img
                      src={images[index]}
                      alt={reason.subtitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-all" />
                    {/* Number Overlay */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-mono font-bold text-amber-800 rounded">
                      {reason.number}
                    </div>
                  </div>
                </motion.div>

                {/* Text Box */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <span className="text-xs font-serif text-amber-800 tracking-[0.2em] font-medium block">
                    REASON {reason.number} / {reason.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-stone-800 tracking-wide font-light leading-snug">
                    {reason.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-amber-800/30" />
                  <p className="text-stone-600 text-sm leading-loose tracking-widest font-light text-justify">
                    {reason.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
