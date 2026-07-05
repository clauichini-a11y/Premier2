import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MessageSquare, Star, Trash2, Check, Ban, Mail } from 'lucide-react';
import { Reservation, Inquiry, Testimonial } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  inquiries: Inquiry[];
  testimonials: Testimonial[];
  onUpdateReservationStatus: (id: string, status: Reservation['status']) => void;
  onDeleteReservation: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  onDeleteInquiry: (id: string) => void;
  onApproveTestimonial: (id: string, isApproved: boolean) => void;
  onDeleteTestimonial: (id: string) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  reservations,
  inquiries,
  testimonials,
  onUpdateReservationStatus,
  onDeleteReservation,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onApproveTestimonial,
  onDeleteTestimonial,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'reservations' | 'inquiries' | 'testimonials'>('reservations');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
        />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="bg-stone-50 w-full max-w-2xl h-full shadow-2xl relative z-10 flex flex-col border-l border-stone-200"
        >
          {/* Header */}
          <div className="bg-stone-100 border-b border-stone-200 p-6 flex justify-between items-center flex-shrink-0">
            <div>
              <h3 className="text-sm font-bold font-mono tracking-widest text-amber-900 uppercase">
                Salon Console (Simulator)
              </h3>
              <p className="text-[10px] text-stone-500 font-light mt-0.5">
                予約の確認、お問合せへの返信、お客様の声の承認シミュレーションが行えます。
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white border-b border-stone-200 px-6 flex space-x-6 text-xs font-mono font-bold tracking-widest uppercase flex-shrink-0">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`py-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'reservations'
                  ? 'border-amber-800 text-amber-800'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              予約管理 ({reservations.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'border-amber-800 text-amber-800'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              お問合せ ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`py-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'border-amber-800 text-amber-800'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              お客様の声 ({testimonials.length})
            </button>
          </div>

          {/* Body List Container */}
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
            {activeTab === 'reservations' && (
              /* Reservations List */
              <div className="space-y-4">
                {reservations.length === 0 ? (
                  <div className="py-20 text-center text-xs text-stone-400 font-light">
                    現在、新しいご予約申込みはありません。
                  </div>
                ) : (
                  reservations.map((res) => (
                    <div
                      key={res.id}
                      className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4 text-left font-light"
                    >
                      {/* Top status */}
                      <div className="flex justify-between items-start border-b border-stone-100 pb-3">
                        <div>
                          <span className="text-[10px] font-mono text-stone-400 block tracking-wider uppercase">
                            RESERVATION ID: {res.id}
                          </span>
                          <span className="text-xs font-mono text-stone-800 font-bold block mt-0.5">
                            {res.date} / {res.time}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${
                            res.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : res.status === 'cancelled'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {res.status === 'confirmed' ? '確定' : res.status === 'cancelled' ? 'キャンセル' : '未確定'}
                        </span>
                      </div>

                      {/* Course details & User contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-[10px] text-stone-400 font-bold tracking-wider block">ご希望コース</span>
                          <span className="text-stone-800 font-serif font-medium">{res.menuName}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-stone-400 font-bold tracking-wider block">お客様情報</span>
                          <span className="text-stone-800 font-medium">{res.name} 様 ({res.kana})</span>
                          <span className="text-stone-500 font-mono block mt-0.5">{res.phone}</span>
                          <span className="text-stone-500 font-mono block break-all">{res.email}</span>
                        </div>
                      </div>

                      {/* Concerns list */}
                      {res.concerns.length > 0 && (
                        <div className="space-y-1 pt-2 border-t border-stone-100">
                          <span className="text-[10px] text-stone-400 font-bold tracking-wider block">気になるお悩み</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {res.concerns.map((c) => (
                              <span
                                key={c}
                                className="bg-stone-100 border border-stone-200 text-stone-600 text-[10px] px-2 py-0.5 rounded"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes details */}
                      {res.notes && (
                        <div className="space-y-1 pt-2 border-t border-stone-100">
                          <span className="text-[10px] text-stone-400 font-bold tracking-wider block">質問・要望</span>
                          <p className="text-stone-600 text-xs leading-relaxed">{res.notes}</p>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex justify-between items-center pt-3 border-t border-stone-100 mt-2">
                        <div className="flex space-x-2">
                          {res.status === 'pending' && (
                            <button
                              onClick={() => onUpdateReservationStatus(res.id, 'confirmed')}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>予約確定</span>
                            </button>
                          )}
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => onUpdateReservationStatus(res.id, 'cancelled')}
                              className="border border-stone-300 text-stone-500 hover:bg-stone-100 text-[10px] font-bold tracking-widest px-3 py-1.5 rounded flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <Ban className="w-3 h-3" />
                              <span>キャンセル</span>
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => onDeleteReservation(res.id)}
                          className="text-stone-400 hover:text-rose-700 p-1.5 rounded hover:bg-stone-100 cursor-pointer transition-colors"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'inquiries' && (
              /* Inquiries List */
              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <div className="py-20 text-center text-xs text-stone-400 font-light">
                    現在、お問合せはありません。
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4 text-left font-light"
                    >
                      {/* Top details */}
                      <div className="flex justify-between items-start border-b border-stone-100 pb-3">
                        <div>
                          <span className="text-[10px] font-mono text-stone-400 block tracking-wider">
                            INQUIRY ID: {inq.id}
                          </span>
                          <span className="text-xs text-stone-800 font-bold block mt-0.5">
                            {inq.subject}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase ${
                            inq.status === 'replied'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : inq.status === 'archived'
                              ? 'bg-stone-100 text-stone-500 border border-stone-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {inq.status === 'replied' ? '返信済' : inq.status === 'archived' ? '保管中' : '未読'}
                        </span>
                      </div>

                      {/* Customer details & Body */}
                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-500">
                          <span>お名前：{inq.name} 様</span>
                          <span>お電話：{inq.phone}</span>
                          <span className="col-span-1 sm:col-span-2">メール：{inq.email}</span>
                        </div>
                        <div className="bg-stone-50 rounded p-3 text-stone-700 whitespace-pre-wrap leading-relaxed border border-stone-100 text-[11px]">
                          {inq.message}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex justify-between items-center pt-3 border-t border-stone-100 mt-2">
                        <div className="flex space-x-2">
                          {inq.status === 'unread' && (
                            <button
                              onClick={() => onUpdateInquiryStatus(inq.id, 'replied')}
                              className="bg-amber-800 hover:bg-amber-900 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <Mail className="w-3 h-3" />
                              <span>返信完了にする</span>
                            </button>
                          )}
                          {inq.status !== 'archived' && (
                            <button
                              onClick={() => onUpdateInquiryStatus(inq.id, 'archived')}
                              className="border border-stone-300 text-stone-500 hover:bg-stone-100 text-[10px] font-bold tracking-widest px-3 py-1.5 rounded flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <span>アーカイブ</span>
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => onDeleteInquiry(inq.id)}
                          className="text-stone-400 hover:text-rose-700 p-1.5 rounded hover:bg-stone-100 cursor-pointer transition-colors"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'testimonials' && (
              /* Testimonials List */
              <div className="space-y-4">
                {testimonials.length === 0 ? (
                  <div className="py-20 text-center text-xs text-stone-400 font-light">
                    現在、投稿された声はありません。
                  </div>
                ) : (
                  testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4 text-left font-light"
                    >
                      {/* Top details */}
                      <div className="flex justify-between items-start border-b border-stone-100 pb-3">
                        <div>
                          <span className="text-[10px] font-mono text-stone-400 block tracking-wider">
                            REVIEW ID: {test.id}
                          </span>
                          <div className="flex items-center space-x-1 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < test.rating ? 'text-amber-600 fill-amber-600' : 'text-stone-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase ${
                            test.isApproved
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {test.isApproved ? '掲載中' : '承認待ち'}
                        </span>
                      </div>

                      {/* Content details */}
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-[11px] text-stone-400">
                          <span>投稿者：{test.nickname} ({test.ageGroup})</span>
                          <span>{test.menuName}</span>
                        </div>
                        <p className="bg-stone-50 rounded p-3 text-stone-700 leading-relaxed italic text-[11px] border border-stone-100">
                          「{test.comment}」
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex justify-between items-center pt-3 border-t border-stone-100 mt-2">
                        <div className="flex space-x-2">
                          {!test.isApproved ? (
                            <button
                              onClick={() => onApproveTestimonial(test.id, true)}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>承認・ウェブ掲載</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => onApproveTestimonial(test.id, false)}
                              className="border border-stone-300 text-stone-500 hover:bg-stone-100 text-[10px] font-bold tracking-widest px-3 py-1.5 rounded flex items-center space-x-1 cursor-pointer transition-colors"
                            >
                              <span>掲載を停止する</span>
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => onDeleteTestimonial(test.id)}
                          className="text-stone-400 hover:text-rose-700 p-1.5 rounded hover:bg-stone-100 cursor-pointer transition-colors"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Close Panel Button */}
          <div className="bg-stone-100 border-t border-stone-200 p-4 flex justify-end flex-shrink-0">
            <button
              onClick={onClose}
              className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium tracking-widest px-6 py-3 rounded cursor-pointer"
            >
              コンソールを閉じる
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
