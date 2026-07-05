import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { SALON_NAME } from '../data/salonData';

interface HeroProps {
  onOpenReservation: () => void;
}

export default function Hero({ onOpenReservation }: HeroProps) {
  // Use the exact generated image path
  const heroImage = '/src/assets/images/hero_meguri_1783241908198.jpg';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-stone-900 overflow-hidden">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tranquil Organic Salon Concept"
          className="w-full h-full object-cover opacity-60 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/60 to-stone-950/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Tagline */}
          <div className="inline-block border-y border-amber-300/30 py-2 px-6">
            <span className="text-amber-200 text-xs sm:text-sm tracking-[0.25em] font-medium uppercase">
              完全個室・オーガニックプライベートサロン
            </span>
          </div>

          {/* Main catchphrase using elegant Noto Serif / Playfair Display feel */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-50 font-serif font-light leading-snug sm:leading-relaxed lg:leading-loose tracking-wider">
            冷え、むくみ、<br className="sm:hidden" />
            ゆらぐ心とからだに。<br />
            <span className="text-amber-100/90 font-medium font-serif">内側から満たすプライベートエステ。</span>
          </h1>

          {/* Subcopy */}
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed tracking-widest px-4">
            完全個室とオーガニックの処方で、あなただけの時間を。
          </p>

          {/* Main body paragraphs with calm tone */}
          <div className="max-w-2xl mx-auto text-stone-300/80 text-xs sm:text-sm font-light leading-loose tracking-widest text-left sm:text-center space-y-4 pt-4 border-t border-stone-100/10 px-4">
            <p>
              年齢を重ねるごとに感じる、冷えやむくみ、気分の浮き沈み。
              それは、からだの内側の巡りが少しずつ変化しているサインかもしれません。
            </p>
            <p>
              {SALON_NAME}では、完全個室の落ち着いた空間で、オーガニック製品のみを使用したケアをご提供しています。
              外側からのお手入れだけでなく、内側から整えることを大切に。
              あなたのための静かな時間を、ご用意しています。
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onOpenReservation}
              id="hero_cta_reservation"
              className="w-full sm:w-auto bg-amber-800 hover:bg-amber-900 text-stone-50 font-medium tracking-widest text-sm px-10 py-4 rounded-md shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>無料カウンセリングを予約する</span>
            </button>
            <a
              href="#concept"
              className="text-stone-400 hover:text-stone-200 text-xs font-medium tracking-widest transition-colors py-2 border-b border-transparent hover:border-stone-400"
            >
              サロンについて詳しく知る
            </a>
          </div>
        </motion.div>
      </div>

      {/* Elegant scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10">
        <span className="text-[10px] tracking-[0.3em] font-mono text-stone-400 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-stone-400 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
