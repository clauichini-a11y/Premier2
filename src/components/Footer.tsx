import { SALON_NAME, SALON_DETAILS } from '../data/salonData';
import { Calendar, Shield, MapPin, Phone, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenReservation, onOpenAdmin }: FooterProps) {
  const links = [
    { label: 'コンセプト・選ばれる理由', href: '#concept' },
    { label: 'お悩み共感', href: '#concerns' },
    { label: 'メニューと料金', href: '#menu' },
    { label: '施術の流れ', href: '#process' },
    { label: 'お客様の声', href: '#testimonials' },
    { label: 'こだわり空間', href: '#gallery' },
    { label: 'セラピスト紹介', href: '#staff' },
    { label: 'よくある質問', href: '#faq' },
    { label: 'アクセス', href: '#access' },
  ];

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper: Salon Brand pitch & quick CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-stone-800">
          
          {/* Logo Brand / Pitch Column */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="space-y-1">
              <span className="font-serif text-lg sm:text-xl tracking-widest text-stone-100 uppercase block">
                {SALON_NAME.split(' ')[1]}
              </span>
              <span className="text-[9px] tracking-widest text-stone-500 uppercase block -mt-1">
                Private Esthetic Salon
              </span>
            </div>
            
            <p className="text-xs text-stone-400 leading-loose tracking-widest text-justify font-light">
              {SALON_NAME}は、完全個室・オーガニック製品にこだわった大人女性のためのプライベートエステサロンです。
              冷え、むくみ、更年期のゆらぎなど、からだの内側からのお悩みに静かに寄り添っています。
            </p>

            <div className="flex items-center space-x-3 pt-2 text-stone-400 text-xs">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-stone-500 font-mono tracking-wider">
                {SALON_DETAILS.instagram}
              </span>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-4 text-left">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-4">
              サイト内リンク
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-stone-400 hover:text-amber-400 transition-colors font-light"
                >
                  • {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Info / Reservation Col */}
          <div className="lg:col-span-3 text-left space-y-5">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-stone-500">
              ご予約・お問い合わせ
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400 font-light">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>{SALON_DETAILS.phone} (10:00〜20:00)</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>{SALON_DETAILS.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="w-full bg-amber-800 hover:bg-amber-900 text-stone-100 text-xs font-medium tracking-widest py-3 px-4 rounded flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>無料カウンセリング予約</span>
              </button>
            </div>
          </div>

        </div>

        {/* Lower: Copyright, Privacy notes & Admin Console switch */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-stone-500 font-light">
          
          {/* Legal references */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-start">
            <button
              onClick={() => alert('プライバシーポリシー (モック)\n個人情報の取扱について：ご入力いただいた氏名・連絡先は、ご予約の調整およびサロンからのお知らせ以外に利用いたしません。')}
              className="hover:text-stone-300 transition-colors flex items-center"
            >
              <Shield className="w-3 h-3 mr-1" />
              <span>プライバシーポリシー</span>
            </button>
            <span>|</span>
            <button
              onClick={() => alert('特定商取引法に基づく表記 (モック)\n販売業者：プライベートエステサロン 巡\nサービス代金：メニューページに記載（表示価格は消費税を含みます）\nキャンセルについて：キャンセルポリシーに基づきます。')}
              className="hover:text-stone-300 transition-colors"
            >
              特定商取引法に基づく表記
            </button>
            <span>|</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-500 hover:text-amber-500 font-mono transition-colors"
            >
              管理者コンソールを開く
            </button>
          </div>

          {/* Copy info */}
          <p className="font-mono">
            &copy; {new Date().getFullYear()} {SALON_NAME.split(' ')[1]}. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}
