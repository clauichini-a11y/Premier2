import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Plus, MessageSquare } from 'lucide-react';
import { Testimonial } from '../types';
import { INITIAL_TESTIMONIALS, MENU_ITEMS } from '../data/salonData';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onSubmitReview: (review: Omit<Testimonial, 'id' | 'createdAt' | 'isApproved'>) => void;
}

export default function Testimonials({ testimonials, onSubmitReview }: TestimonialsProps) {
  const [showForm, setShowForm] = useState(false);
  const [nickname, setNickname] = useState('');
  const [ageGroup, setAgeGroup] = useState('40代女性 / 会社員');
  const [menuName, setMenuName] = useState(MENU_ITEMS[0].name);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Filter approved testimonials
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !comment) return;

    onSubmitReview({
      nickname,
      ageGroup,
      menuName,
      rating,
      comment,
    });

    setSubmitted(true);
    setTimeout(() => {
      // Reset form
      setNickname('');
      setComment('');
      setRating(5);
      setShowForm(false);
      setSubmitted(false);
    }, 2500);
  };

  return (
    <section id="testimonials" className="py-24 bg-stone-50 border-b border-stone-200/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-amber-800 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
            Customer Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 tracking-wider">
            「もっと早く出会いたかった」──ご利用者様の声
          </h2>
          <div className="w-12 h-[1px] bg-amber-800/40 mx-auto my-4" />
          <p className="text-stone-600 text-sm leading-relaxed tracking-wider font-light">
            同じ悩みを抱えていた方々が、内側から変わっていく実感。<br className="hidden md:inline" />
            実際にご利用いただいたお客様から寄せられた、心温まるご感想の一部をご紹介いたします。
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative group hover:border-amber-800/10 hover:shadow-md transition-all duration-300"
            >
              {/* Quote icon & Star rating */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <Quote className="w-8 h-8 text-stone-200/70 group-hover:text-amber-100 transition-colors" />
                  <div className="flex space-x-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.rating ? 'text-amber-600 fill-amber-600' : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed tracking-wider text-justify h-auto">
                  「{item.comment}」
                </p>
              </div>

              {/* Author Details */}
              <div className="border-t border-stone-100 pt-4 mt-6 space-y-1 text-left">
                <span className="text-[10px] font-medium text-amber-800 tracking-wider block">
                  {item.menuName}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-medium text-stone-800">{item.nickname}</span>
                  <span className="text-[10px] text-stone-400 font-light tracking-wide">{item.ageGroup}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Submit Review Area */}
        <div className="mt-16 text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 border border-stone-300 hover:border-amber-800 hover:text-amber-800 text-stone-600 text-xs tracking-widest font-medium px-6 py-3 rounded-full shadow-sm hover:shadow transition-all cursor-pointer bg-white"
            >
              <Plus className="w-4 h-4" />
              <span>ご体験談を投稿する</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto bg-white rounded-xl border border-stone-200/80 p-6 sm:p-8 text-left shadow-md"
            >
              <div className="flex items-center space-x-2 border-b border-stone-100 pb-4 mb-6">
                <MessageSquare className="w-5 h-5 text-amber-800" />
                <h3 className="text-base font-serif font-medium text-stone-800">
                  ご体験談のご投稿
                </h3>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-800">
                    <Star className="w-6 h-6 fill-amber-800" />
                  </div>
                  <h4 className="text-sm font-serif font-medium text-stone-800">
                    ご投稿ありがとうございます
                  </h4>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    お送りいただいた感想は、管理者の承認後に一覧へ掲載されます。<br />
                    （右上の「Admin Panel」から承認して即時に掲載をお試しいただけます）
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nickname & AgeGroup */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                        ニックネーム (必須)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="例：はな 様"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                        年代・ご職業
                      </label>
                      <select
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none bg-white"
                      >
                        <option>30代女性 / 会社員</option>
                        <option>40代女性 / パート勤務</option>
                        <option>40代女性 / 会社役員</option>
                        <option>50代女性 / 会社員</option>
                        <option>50代女性 / 主婦</option>
                      </select>
                    </div>
                  </div>

                  {/* Course Name Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                      ご体験いただいたコース
                    </label>
                    <select
                      value={menuName}
                      onChange={(e) => setMenuName(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none bg-white"
                    >
                      {MENU_ITEMS.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating selection (Stars) */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                      満足度
                    </label>
                    <div className="flex space-x-2 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating ? 'text-amber-600 fill-amber-600' : 'text-stone-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comments input */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                      ご感想 (必須)
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="施術を受けた感想や、お体の変化、セラピストの対応など、ご自由にお書きください。お悩みがどのように和らいだかもお聞かせいただけると励みになります。"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none"
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-xs font-medium text-stone-400 hover:text-stone-600 px-4 py-2"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-800 hover:bg-amber-900 text-stone-50 text-xs font-medium tracking-widest px-6 py-3 rounded shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      ご体験談を送信する
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
