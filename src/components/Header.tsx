import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { SALON_NAME } from '../data/salonData';

interface HeaderProps {
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
}

export default function Header({ onOpenReservation, onOpenAdmin }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'コンセプト', href: '#concept' },
    { label: 'メニュー・料金', href: '#menu' },
    { label: '施術の流れ', href: '#process' },
    { label: 'お客様の声', href: '#testimonials' },
    { label: 'サロンのこだわり', href: '#gallery' },
    { label: 'セラピスト', href: '#staff' },
    { label: 'FAQ', href: '#faq' },
    { label: 'アクセス', href: '#access' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-50/90 backdrop-blur-md shadow-sm border-b border-stone-200/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo & Name */}
          <div className="flex items-center space-x-2">
            <a href="#" className="group flex flex-col">
              <span className="font-serif text-lg sm:text-xl tracking-widest text-stone-800 group-hover:text-amber-700 transition-colors">
                {SALON_NAME.split(' ')[1]}
              </span>
              <span className="text-[9px] tracking-widest text-stone-500 uppercase -mt-1">
                Private Esthetic Salon
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-stone-600 hover:text-amber-800 text-xs sm:text-sm tracking-wide transition-colors font-medium relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-800 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-stone-600 text-[11px] font-mono tracking-widest uppercase border border-stone-300 px-2 py-1 rounded transition-colors"
            >
              Admin Panel
            </button>
            <a
              href="tel:0312345678"
              className="flex items-center text-stone-700 hover:text-amber-800 transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4 mr-1 text-amber-700" />
              03-1234-5678
            </a>
            <button
              onClick={onOpenReservation}
              id="header_cta_btn"
              className="bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium tracking-wider px-5 py-2.5 rounded shadow-sm transition-all hover:shadow hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>ご予約はこちらから</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-stone-600 text-[10px] font-mono border border-stone-300 px-1.5 py-0.5 rounded"
            >
              Admin
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700 hover:text-amber-800 focus:outline-none p-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-stone-200/80 animate-fade-in">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-md text-stone-700 hover:bg-stone-100 hover:text-amber-800 text-sm tracking-wide font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-stone-200/50 mt-4 px-4 space-y-4">
              <a
                href="tel:0312345678"
                className="flex items-center text-stone-700 font-medium text-sm"
              >
                <Phone className="w-4 h-4 mr-2 text-amber-700" />
                03-1234-5678 (10:00〜20:00)
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenReservation();
                }}
                className="w-full bg-amber-800 hover:bg-amber-900 text-white text-center text-sm font-medium tracking-wider py-3 rounded shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>ご予約はこちらから</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
