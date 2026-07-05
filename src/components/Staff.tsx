import { motion } from 'motion/react';
import { Award, Heart } from 'lucide-react';
import { STAFF_INFO } from '../data/salonData';
import therapistImage from '../assets/images/therapist_portrait_1783241945670.jpg';

export default function Staff() {
  return (
    <section id="staff" className="py-24 bg-stone-50 border-b border-stone-200/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Therapist Profile
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            あなたの「揺らぎ」に、静かに寄り添うセラピストが。
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm leading-relaxed tracking-wider font-light">
            女性特有の悩みに寄り添う深い知識と経験で、心からのケアをお届けします。
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-16">
          {/* Left: Image Card & Qualifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-2/5 space-y-6"
          >
            {/* Portrait frame */}
            <div className="relative aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-md border-4 border-white bg-white">
              <img
                src={therapistImage}
                alt={STAFF_INFO.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Qualifications Card */}
            <div className="bg-stone-100 rounded-xl p-6 border border-stone-200/60 max-w-[320px] mx-auto">
              <div className="flex items-center space-x-2 text-amber-800 border-b border-stone-200 pb-2 mb-3">
                <Award className="w-4 h-4" />
                <span className="text-xs font-serif font-bold tracking-wider">主な保有資格・ライセンス</span>
              </div>
              <ul className="space-y-2">
                {STAFF_INFO.qualifications.map((q, idx) => (
                  <li key={idx} className="text-[11px] sm:text-xs text-stone-600 tracking-wide flex items-start leading-relaxed font-light">
                    <span className="text-amber-700 mr-1.5">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Personal Intro & Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full md:w-3/5 space-y-6 text-left"
          >
            {/* Name and Role */}
            <div className="space-y-1">
              <span className="text-xs text-amber-800 font-serif tracking-widest block">
                {STAFF_INFO.role}
              </span>
              <div className="flex items-baseline space-x-3">
                <h3 className="text-xl sm:text-2xl font-serif text-stone-800 tracking-wide font-medium">
                  {STAFF_INFO.name}
                </h3>
                <span className="text-xs text-stone-400 font-light font-serif">
                  ({STAFF_INFO.nameKana})
                </span>
              </div>
              <span className="text-xs text-stone-500 font-mono tracking-wider font-light block">
                {STAFF_INFO.experience}
              </span>
            </div>

            <div className="w-8 h-[1px] bg-amber-800/30" />

            {/* Massage Message with line breaks preserved */}
            <div className="text-xs sm:text-sm text-stone-600 leading-loose tracking-widest font-light space-y-4 text-justify whitespace-pre-wrap">
              <div className="flex items-start space-x-2 text-amber-900/80 mb-2">
                <Heart className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="font-medium font-serif leading-relaxed">
                  「年齢や歳のせい」にする前に。あなたの心とからだに、おだやかな余白を。
                </span>
              </div>
              {STAFF_INFO.message}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
