import { motion } from 'motion/react';
import { MessageSquare, RefreshCw, Sparkles, Coffee } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'カウンセリング',
      icon: MessageSquare,
      description: 'まずはあたたかいウェルカムハーブティーをお召し上がりいただきながら、現在のお悩み、体調、日常生活での癖や睡眠状態について丁寧にお伺いします。どんな些細なことでも、まずはリラックスしてゆっくりお話をお聞かせください。無理におすすめをすることは一切いたしません。',
      tip: '※気になる症状や、力加減のご希望などもこの際にお気軽にお話しください。'
    },
    {
      num: '02',
      title: 'お着替え・フットバス',
      icon: RefreshCw,
      description: '完全個室の着替えスペースにて、サロンがご用意した清潔で心地よい施術着（ペーパーショーツ・ガウン等）にお着替えいただきます。その後、エプソムソルトや季節のハーブを贅沢に配合した足湯（フットバス）で、まずは足元からじんわりと温め、からだの緊張を解きほぐしていきます。',
      tip: '※生理中の方や、体調に不調がある方も、事前にお申し出いただければ最大限配慮いたします。'
    },
    {
      num: '03',
      title: '施術（オールハンドケア）',
      icon: Sparkles,
      description: 'お選びいただいたコースに基づき、お部屋の照明を落とした心地よい空間で施術を開始します。皮膚への摩擦を防ぎながら、オーガニックアロマの香りで嗅覚から自律神経を刺激し、絶妙なオールハンドの手技で巡りを促します。施術中はどうぞ力を抜き、まどろむような極上のひとときをお楽しみください。',
      tip: '※施術の最中でも、室温やベッドのあたたかさ、力加減のご要望があればいつでもお声がけください。'
    },
    {
      num: '04',
      title: 'アフターカウンセリング',
      icon: Coffee,
      description: '施術が終わりましたらお着替えいただき、ハーブティーでお体を潤しながらアフターカウンセリングを行います。本日施術してわかった、お客様のお体の状態（冷えやむくみの滞り箇所）をお伝えし、ご自宅で簡単にできる温活やセルフリンパマッサージ、おすすめの過ごし方について優しくお伝えします。',
      tip: '※お会計やお帰りのペースも、お客様のご都合に合わせてのんびりとお過ごしいただけます。'
    }
  ];

  return (
    <section id="process" className="py-24 bg-stone-100/40 border-b border-stone-200/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Treatment Flow
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            初めての方も、安心してお越しください。
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm leading-relaxed tracking-wider font-light">
            ご来店から施術、お帰りまでの流れです。<br className="hidden md:inline" />
            完全個室の贅沢な時間を、最初から最後までご不安なくお過ごしいただけるよう丁寧にご案内いたします。
          </p>
        </div>

        {/* Steps Timeline (Vertical layout) */}
        <div className="relative border-l border-amber-800/20 ml-4 sm:ml-32 space-y-16">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-12"
              >
                {/* Timeline Dot (Numbered) */}
                <span className="absolute -left-4 sm:-left-6 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-stone-50 border border-amber-800/40 text-amber-800 text-xs font-mono font-bold shadow-sm">
                  {step.num}
                </span>

                {/* Left Side Label (Hidden on mobile, elegant positioning on desktop) */}
                <div className="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-stone-400 block">
                    STEP
                  </span>
                  <span className="text-xl font-mono font-light text-amber-800 tracking-wider">
                    {step.num}
                  </span>
                </div>

                {/* Card Content */}
                <div className="bg-white border border-stone-200/80 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center space-x-3 border-b border-stone-100 pb-4">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-800">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-medium text-stone-800 tracking-wide">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-loose tracking-widest font-light text-justify">
                    {step.description}
                  </p>

                  <div className="bg-stone-50 rounded px-4 py-3 border-l-2 border-stone-300">
                    <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                      {step.tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
