import { motion } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';
import roomImage from '../assets/images/salon_room_1783241920958.jpg';
import oilImage from '../assets/images/organic_oil_1783241935131.jpg';

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-stone-100/40 border-b border-stone-200/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Our Sanctuary
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            扉を開けた瞬間から、日常を離れる場所へ。
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm leading-relaxed tracking-wider font-light">
            こだわり抜いた完全個室の空間と、肌に嘘をつかないオーガニック処方。<br className="hidden md:inline" />
            都会の慌ただしさを忘れ、ご自身をいつくしむための静かな聖域をご用意しました。
          </p>
        </div>

        {/* Feature 1: The Private Space */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <div className="flex items-center space-x-2 text-amber-800">
              <Compass className="w-5 h-5" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">The Space / 空間へのこだわり</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-stone-800 tracking-wide font-light leading-snug">
              静寂とぬくもりに包まれる、<br className="hidden sm:inline" />完全貸切のプライベート空間
            </h3>
            <p className="text-stone-600 text-sm leading-loose tracking-widest font-light text-justify">
              すべてのお部屋を贅沢な完全個室、あるいはサロンそのものを貸し切る形でお迎えいたします。
              間接照明の温かみのある光、心地よく心身を鎮めるヒーリングミュージック、そしておだやかなハーブの香り。
              他のお客様の気配、施術中の音、リラックスした無防備な姿などを一切気にかける必要はありません。
              ご自身のためだけに静かに流れる、最上の安らぎをお過ごしいただけます。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.0 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md group">
              <img
                src={roomImage}
                alt="Tranquil Treatment Room"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/5" />
            </div>
          </motion.div>
        </div>

        {/* Feature 2: The Organic Standard */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <div className="flex items-center space-x-2 text-amber-800">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">The Botanical / 素材へのこだわり</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-stone-800 tracking-wide font-light leading-snug">
              100%オーガニック処方、<br className="hidden sm:inline" />肌とからだに嘘をつかない選択
            </h3>
            <p className="text-stone-600 text-sm leading-loose tracking-widest font-light text-justify">
              当サロンで使用するすべての精油（エッセンシャルオイル）やトリートメントベースオイル、お肌を仕上げるスキンケア製品は、世界で最も厳しいとされるオーガニック基準をクリアした製品のみを使用しています。
              石油系界面活性剤、合成防腐剤、合成着色料、人工香料といった添加物は一切配合されておりません。
              経皮からゆっくりと吸収されるものだからこそ、安心できる純粋な大自然の力でお体を満たします。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.0 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md group">
              <img
                src={oilImage}
                alt="Organic Essential Oils"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
