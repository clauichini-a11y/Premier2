import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Check, AlertCircle } from 'lucide-react';
import { MENU_ITEMS, CONCERNS_LIST } from '../data/salonData';
import { Reservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMenuId?: string;
  preSelectedConcerns?: string[];
  onAddReservation: (reservation: Reservation) => void;
}

export default function ReservationModal({
  isOpen,
  onClose,
  selectedMenuId,
  preSelectedConcerns = [],
  onAddReservation,
}: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [menuId, setMenuId] = useState(selectedMenuId || MENU_ITEMS[0].id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [kana, setKana] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [concerns, setConcerns] = useState<string[]>(preSelectedConcerns);
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  // Sync state with props when modal opens
  useEffect(() => {
    if (isOpen) {
      if (selectedMenuId) setMenuId(selectedMenuId);
      if (preSelectedConcerns.length > 0) setConcerns(preSelectedConcerns);
      // Initialize with tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
      setStep(1);
      setSuccess(false);
    }
  }, [isOpen, selectedMenuId, preSelectedConcerns]);

  if (!isOpen) return null;

  // Simple calendar generator for next 7 days
  const getNext7Days = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayStr = d.toISOString().split('T')[0];
      const weekday = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
      dates.push({
        value: dayStr,
        label: `${d.getMonth() + 1}/${d.getDate()} (${weekday})`,
        isClosed: d.getDay() === 3 || (d.getDay() === 2 && (Math.ceil(d.getDate() / 7) === 2 || Math.ceil(d.getDate() / 7) === 4)), // Closed Wed, 2nd & 4th Tue
      });
    }
    return dates;
  };

  const timeSlots = [
    '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '18:30'
  ];

  const handleNext = () => {
    if (step === 1 && !menuId) return;
    if (step === 2 && (!date || !time)) return;
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter((c) => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !kana || !email || !phone) return;

    const selectedMenu = MENU_ITEMS.find((m) => m.id === menuId);

    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      date,
      time,
      menuId,
      menuName: selectedMenu ? selectedMenu.name : 'カスタムコース',
      name,
      kana,
      email,
      phone,
      concerns,
      notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    onAddReservation(newRes);
    setSuccess(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-stone-50 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-stone-100 border-b border-stone-200 p-5 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-800" />
              <h3 className="text-base font-serif font-medium text-stone-800 tracking-wide">
                無料カウンセリング・WEB予約
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step indicators */}
          {!success && (
            <div className="bg-white border-b border-stone-100 py-3.5 px-6 flex items-center justify-center space-x-8 text-[11px] sm:text-xs font-medium tracking-wider text-stone-400 flex-shrink-0">
              <span className={step === 1 ? 'text-amber-800 font-bold border-b border-amber-800 pb-1' : step > 1 ? 'text-stone-600' : ''}>
                1. コース
              </span>
              <span className="text-stone-200">/</span>
              <span className={step === 2 ? 'text-amber-800 font-bold border-b border-amber-800 pb-1' : step > 2 ? 'text-stone-600' : ''}>
                2. 日時選択
              </span>
              <span className="text-stone-200">/</span>
              <span className={step === 3 ? 'text-amber-800 font-bold border-b border-amber-800 pb-1' : ''}>
                3. ご連絡先
              </span>
            </div>
          )}

          {/* Scrollable Form Body */}
          <div className="p-6 overflow-y-auto flex-grow">
            {success ? (
              /* Success view */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 px-4 text-center space-y-6 max-w-md mx-auto"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700 shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-serif font-medium text-stone-800 tracking-wider">
                    予約申込みを受け付けました
                  </h4>
                  <p className="text-xs text-stone-600 leading-loose tracking-widest font-light">
                    ご入力いただいたメールアドレス宛に、自動控えメールを送信いたしました。
                    のちほどセラピストより折り返しご予約確定メールをお送りします。
                    （※右上の「Admin Panel」から即座に予約承認シミュレーションが行えます）
                  </p>
                </div>

                {/* Booking summary card */}
                <div className="bg-white border border-stone-200 rounded-xl p-5 text-left text-xs space-y-3 shadow-sm font-light">
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-400">日時</span>
                    <span className="text-stone-800 font-medium font-mono">{date} {time}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-400">コース</span>
                    <span className="text-stone-800 font-medium text-right max-w-[200px]">{MENU_ITEMS.find(m => m.id === menuId)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">お名前</span>
                    <span className="text-stone-800 font-medium">{name} 様</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium tracking-widest px-8 py-3.5 rounded shadow-md transition-colors cursor-pointer"
                >
                  閉じる
                </button>
              </motion.div>
            ) : (
              /* Normal steps form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  /* Step 1: Menu Selector */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 text-left"
                  >
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                      ご希望のメニュー・カウンセリングを選択してください
                    </h4>
                    <div className="space-y-3">
                      {MENU_ITEMS.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setMenuId(item.id)}
                          className={`w-full flex justify-between items-center p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            menuId === item.id
                              ? 'bg-amber-50/40 border-amber-800/40 shadow-sm ring-1 ring-amber-800/15'
                              : 'bg-white border-stone-200 hover:bg-stone-50/50'
                          }`}
                        >
                          <div className="space-y-1 pr-4">
                            <span className="text-[10px] text-amber-800 font-serif tracking-widest font-medium uppercase block">
                              {item.category} / {item.duration}分
                            </span>
                            <span className="text-sm font-medium text-stone-800 block">
                              {item.name}
                            </span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {item.firstTimePrice ? (
                              <div className="space-y-0.5">
                                <span className="text-[10px] bg-rose-50 border border-rose-100 text-rose-800 font-bold px-1 py-0.5 rounded mr-1">
                                  初回
                                </span>
                                <span className="text-sm font-mono font-medium text-amber-800">
                                  ¥{(item.firstTimePrice).toLocaleString()}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm font-mono font-medium text-stone-700">
                                ¥{(item.price).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  /* Step 2: Date & Time Selector */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6 text-left"
                  >
                    {/* Date select */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        ご希望のお日にち
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {getNext7Days().map((day) => (
                          <button
                            key={day.value}
                            type="button"
                            disabled={day.isClosed}
                            onClick={() => {
                              setDate(day.value);
                              setTime(''); // Clear time when date changes
                            }}
                            className={`p-3 rounded-lg border text-center text-xs tracking-wider transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                              day.isClosed
                                ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                                : date === day.value
                                ? 'bg-amber-800 border-amber-800 text-white shadow-sm'
                                : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 text-stone-700'
                            }`}
                          >
                            <span>{day.label}</span>
                            {day.isClosed && <span className="text-[9px] text-stone-400 font-bold">休サロン日</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time select */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        ご希望の開始時間 (完全入替制)
                      </h4>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`p-3 rounded-lg border text-center text-xs font-mono tracking-wider transition-all cursor-pointer ${
                              time === slot
                                ? 'bg-amber-800 border-amber-800 text-white shadow-sm'
                                : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50 text-stone-700'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-stone-100 rounded-lg p-4 flex items-start space-x-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-stone-500 leading-relaxed font-light">
                        ※当サロンは完全予約制のマンツーマンサロンです。
                        前後のご案内枠との間にお着替え・アルコール除菌消毒などのインターバルを十分（45分以上）設けております。
                        当日ご希望の時間に沿えない場合のみ、当日のうちにご連絡を差し上げております。
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  /* Step 3: Contact details & Concerns */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6 text-left"
                  >
                    {/* Basic info form fields */}
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
                          className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                          フリガナ (必須)
                        </label>
                        <input
                          type="text"
                          required
                          value={kana}
                          onChange={(e) => setKana(e.target.value)}
                          placeholder="例：ヤマダ ハナコ"
                          className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none bg-white"
                        />
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
                          className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none bg-white"
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
                          className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none bg-white"
                        />
                      </div>
                    </div>

                    {/* Multi-select Concerns */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                        特に相談したいお悩み (お悩み共感セクションのチェックが引き継がれています)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {CONCERNS_LIST.map((concern) => (
                          <button
                            key={concern}
                            type="button"
                            onClick={() => toggleConcern(concern)}
                            className={`flex items-center p-3 rounded border text-left text-xs tracking-wider transition-colors cursor-pointer ${
                              concerns.includes(concern)
                                ? 'bg-amber-50/50 border-amber-800/30 font-medium text-stone-800'
                                : 'bg-white border-stone-200 hover:bg-stone-50/30 text-stone-600'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center mr-2 ${
                              concerns.includes(concern) ? 'bg-amber-800 text-white border-amber-800' : 'border-stone-300'
                            }`}>
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <span className="truncate">{concern}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes textarea */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                        ご質問・ご要望
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="アレルギーの有無、体調に関すること、セラピストへ事前に伝えたいご不安など、どうぞお書きください。"
                        className="w-full text-xs sm:text-sm p-3 border border-stone-200 rounded focus:border-amber-800 focus:outline-none bg-white"
                      />
                    </div>
                  </motion.div>
                )}
              </form>
            )}
          </div>

          {/* Footer Navigation Buttons */}
          {!success && (
            <div className="bg-stone-100 border-t border-stone-200 p-5 flex justify-between items-center flex-shrink-0">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="border border-stone-300 text-stone-600 hover:bg-stone-200/50 text-xs font-medium tracking-widest px-5 py-3 rounded cursor-pointer transition-colors"
                >
                  戻る
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={step === 2 && (!date || !time)}
                  className={`bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium tracking-widest px-8 py-3.5 rounded shadow-sm hover:shadow transition-all cursor-pointer ${
                    step === 2 && (!date || !time) ? 'opacity-50 cursor-not-allowed bg-stone-400 hover:bg-stone-400' : ''
                  }`}
                >
                  次に進む
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!name || !kana || !email || !phone}
                  className={`bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium tracking-widest px-8 py-3.5 rounded shadow-sm hover:shadow transition-all cursor-pointer ${
                    (!name || !kana || !email || !phone) ? 'opacity-50 cursor-not-allowed bg-stone-400 hover:bg-stone-400' : ''
                  }`}
                >
                  予約を確定する
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
