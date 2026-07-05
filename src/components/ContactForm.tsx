import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Calendar, ArrowRight, Check } from 'lucide-react';
import { SALON_DETAILS } from '../data/salonData';
import { Inquiry } from '../types';

interface ContactFormProps {
  onOpenReservation: () => void;
  onAddInquiry: (inquiry: Inquiry) => void;
}

export default function ContactForm({ onOpenReservation, onAddInquiry }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('サロンのご予約・空き状況について');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone,
      subject,
      message,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };

    onAddInquiry(newInquiry);
    setSubmitted(true);

    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-stone-100/50 border-b border-stone-200/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Core Final Pitch */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase block">
                Contact & Counseling
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider leading-snug">
                まずは、お話を<br />聞かせてください。
              </h2>
              <div className="w-12 h-[1px] bg-amber-800/40 my-4" />
              <p className="text-stone-600 text-sm leading-loose tracking-widest font-light text-justify">
                ここまでお読みいただき、誠にありがとうございます。<br />
                女性特有の冷えやむくみ、更年期のゆらぎは、一人で抱え込むと本当に辛いものです。
              </p>
              <p className="text-stone-600 text-sm leading-loose tracking-widest font-light text-justify">
                無理に施術をお勧めすることは絶対にいたしません。ご相談だけでも大歓迎です。
                ご自身のからだとゆっくり向き合い、お体をいたわる最初の第一歩として、お気軽な気持ちでご連絡をお待ちしております。
              </p>
            </div>

            {/* Direct Contact Alternatives */}
            <div className="bg-white rounded-xl border border-stone-200/60 p-6 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                お電話・LINEでのご連絡
              </h4>
              <div className="space-y-3">
                <a
                  href={`tel:${SALON_DETAILS.phone.replace(/-/g, '')}`}
                  className="flex items-center space-x-3 text-stone-700 hover:text-amber-800 transition-colors group"
                >
                  <div className="p-2 bg-stone-100 rounded-lg text-amber-800 group-hover:bg-amber-50">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-medium block">お電話受付 (10:00〜20:00)</span>
                    <span className="text-base font-serif font-medium">{SALON_DETAILS.phone}</span>
                  </div>
                </a>
                
                {/* Visual Line reserve button representation */}
                <div className="flex items-center space-x-3 text-stone-700">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-medium block">LINE公式アカウント / Instagram</span>
                    <span className="text-xs tracking-wider font-light text-stone-600">{SALON_DETAILS.instagram}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-stone-50 text-xs font-medium tracking-widest py-3.5 rounded flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>無料カウンセリングのご予約はこちら</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl border border-stone-200/80 p-6 sm:p-10 shadow-sm text-left"
            >
              <h3 className="text-base sm:text-lg font-serif font-medium text-stone-800 tracking-wide border-b border-stone-100 pb-4 mb-6">
                メールでのお問い合わせ・ご相談
              </h3>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-serif font-medium text-stone-800">
                    お問合せを送信いたしました
                  </h4>
                  <p className="text-xs text-stone-500 leading-loose font-light">
                    ご入力いただいたアドレスに、送信完了メールをお送りしました。<br />
                    通常24時間以内にセラピストよりご返信いたします。<br />
                    （※右上の「Admin Panel」からすぐに受信確認が行えます）
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-light">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                        お名前 (必須)
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="例：山田 花子"
                        className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                        電話番号 (必須)
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="090-1234-5678"
                        className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                      メールアドレス (必須)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.com"
                      className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                      お問合せ用件
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none bg-white"
                    >
                      <option>サロンのご予約・空き状況について</option>
                      <option>メニュー選びのご相談（冷え・更年期ケア等）</option>
                      <option>生理中の対応や、持病等にともなうお体の相談</option>
                      <option>その他のご質問・ご相談</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                      お問合せ詳細 (必須)
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="どのようなお悩みでも、どうぞご自由にお書きください。お体の状態や施術へのご質問、不安なことなど丁寧にお答えいたします。"
                      className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-amber-800 hover:bg-amber-900 text-stone-50 text-xs font-medium tracking-widest px-8 py-4 rounded shadow-sm hover:shadow transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <span>お問合せを送信する</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
