import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Concerns from './components/Concerns';
import Concept from './components/Concept';
import Menu from './components/Menu';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Staff from './components/Staff';
import FAQ from './components/FAQ';
import Access from './components/Access';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import AdminPanel from './components/AdminPanel';
import { Reservation, Inquiry, Testimonial } from './types';
import { INITIAL_TESTIMONIALS } from './data/salonData';

export default function App() {
  // States
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  // Modal control states
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<string | undefined>(undefined);
  const [preSelectedConcerns, setPreSelectedConcerns] = useState<string[]>([]);
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showMobileFixedCta, setShowMobileFixedCta] = useState(false);

  // Load initial states from localStorage
  useEffect(() => {
    // 1. Load Testimonials
    const storedTestimonials = localStorage.getItem('salon_testimonials');
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    } else {
      localStorage.setItem('salon_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
      setTestimonials(INITIAL_TESTIMONIALS);
    }

    // 2. Load Reservations (with a warm demo reservation if empty)
    const storedReservations = localStorage.getItem('salon_reservations');
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    } else {
      const demoRes: Reservation = {
        id: 'demo-res-1',
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days later
        time: '13:00',
        menuId: 'kounenki-care',
        menuName: 'ゆらぎに寄り添うホルモンバランス調整コース',
        name: '佐藤 優子',
        kana: 'サトウ ユウコ',
        email: 'sato_yuko_demo@example.com',
        phone: '090-9876-5432',
        concerns: ['年齢とともに気分の浮き沈みが増えた', '疲れが翌朝になっても残っている'],
        notes: '更年期による急なほてりやイライラがあり、アロマエステが初めてなので心配です。優しく施術していただけると嬉しいです。',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      const initialRes = [demoRes];
      localStorage.setItem('salon_reservations', JSON.stringify(initialRes));
      setReservations(initialRes);
    }

    // 3. Load Inquiries (with a warm demo inquiry if empty)
    const storedInquiries = localStorage.getItem('salon_inquiries');
    if (storedInquiries) {
      setInquiries(JSON.parse(storedInquiries));
    } else {
      const demoInq: Inquiry = {
        id: 'demo-inq-1',
        name: '高橋 美紀',
        email: 'takahashi_miki_demo@example.com',
        phone: '080-1234-5678',
        subject: '生理中の対応や、持病等にともなうお体の相談',
        message: '来週の木曜日で予約を検討中ですが、ちょうど生理周期と重なりそうです。むくみが辛いのでぜひお願いしたいのですが、施術は可能でしょうか。お腹以外のトリートメントへの変更なども相談できますか。',
        status: 'unread',
        createdAt: new Date().toISOString(),
      };
      const initialInq = [demoInq];
      localStorage.setItem('salon_inquiries', JSON.stringify(initialInq));
      setInquiries(initialInq);
    }
  }, []);

  // Monitor scroll for mobile fixed bottom CTA (appears after scrolling past Hero)
  useEffect(() => {
    const handleScroll = () => {
      setShowMobileFixedCta(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper: Persist reservations
  const saveReservations = (newRes: Reservation[]) => {
    localStorage.setItem('salon_reservations', JSON.stringify(newRes));
    setReservations(newRes);
  };

  // Helper: Persist inquiries
  const saveInquiries = (newInq: Inquiry[]) => {
    localStorage.setItem('salon_inquiries', JSON.stringify(newInq));
    setInquiries(newInq);
  };

  // Helper: Persist testimonials
  const saveTestimonials = (newTest: Testimonial[]) => {
    localStorage.setItem('salon_testimonials', JSON.stringify(newTest));
    setTestimonials(newTest);
  };

  // HANDLERS
  const handleOpenReservation = (menuId?: string, concerns: string[] = []) => {
    setSelectedMenuId(menuId);
    setPreSelectedConcerns(concerns);
    setIsReservationOpen(true);
  };

  const handleAddReservation = (newRes: Reservation) => {
    const updated = [newRes, ...reservations];
    saveReservations(updated);
  };

  const handleAddInquiry = (newInq: Inquiry) => {
    const updated = [newInq, ...inquiries];
    saveInquiries(updated);
  };

  const handleAddReview = (review: Omit<Testimonial, 'id' | 'createdAt' | 'isApproved'>) => {
    const newTestimonial: Testimonial = {
      ...review,
      id: `test-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isApproved: false, // Default unapproved, requires admin approval to appear on the homepage
    };
    const updated = [newTestimonial, ...testimonials];
    saveTestimonials(updated);
  };

  // ADMIN OPERATIONS
  const handleUpdateReservationStatus = (id: string, status: Reservation['status']) => {
    const updated = reservations.map((r) => (r.id === id ? { ...r, status } : r));
    saveReservations(updated);
  };

  const handleDeleteReservation = (id: string) => {
    if (confirm('この予約データを削除してもよろしいですか？')) {
      const updated = reservations.filter((r) => r.id !== id);
      saveReservations(updated);
    }
  };

  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    saveInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('このお問合せデータを削除してもよろしいですか？')) {
      const updated = inquiries.filter((i) => i.id !== id);
      saveInquiries(updated);
    }
  };

  const handleApproveTestimonial = (id: string, isApproved: boolean) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, isApproved } : t));
    saveTestimonials(updated);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('このお客様の声を削除してもよろしいですか？')) {
      const updated = testimonials.filter((t) => t.id !== id);
      saveTestimonials(updated);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 antialiased font-sans selection:bg-amber-100 selection:text-amber-900 scroll-smooth">
      {/* 1. Header */}
      <Header
        onOpenReservation={() => handleOpenReservation()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 2. Main Visual (Hero) */}
      <Hero onOpenReservation={() => handleOpenReservation()} />

      {/* 3. Concerns Section */}
      <Concerns
        onOpenReservationWithConcerns={(concerns) => handleOpenReservation(undefined, concerns)}
      />

      {/* 4. Concept & Why Choose Us */}
      <Concept />

      {/* 5. Menu & Pricing */}
      <Menu
        onOpenReservationWithMenu={(menuId) => handleOpenReservation(menuId)}
      />

      {/* 6. Treatment Process Flow */}
      <Process />

      {/* 7. Testimonials (Customer Reviews) */}
      <Testimonials
        testimonials={testimonials}
        onSubmitReview={handleAddReview}
      />

      {/* 8. Gallery (Privacy Room & Material details) */}
      <Gallery />

      {/* 9. Therapist Staff Intro */}
      <Staff />

      {/* 10. Frequently Asked Questions (FAQ) */}
      <FAQ />

      {/* 11. Access & Location Map */}
      <Access />

      {/* 12. Final CTA (Contact & Inquiry Form) */}
      <ContactForm
        onOpenReservation={() => handleOpenReservation()}
        onAddInquiry={handleAddInquiry}
      />

      {/* 13. Footer */}
      <Footer
        onOpenReservation={() => handleOpenReservation()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Reservation Multi-step Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        selectedMenuId={selectedMenuId}
        preSelectedConcerns={preSelectedConcerns}
        onAddReservation={handleAddReservation}
      />

      {/* Simulated Admin Control panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        reservations={reservations}
        inquiries={inquiries}
        testimonials={testimonials}
        onUpdateReservationStatus={handleUpdateReservationStatus}
        onDeleteReservation={handleDeleteReservation}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onApproveTestimonial={handleApproveTestimonial}
        onDeleteTestimonial={handleDeleteTestimonial}
      />

      {/* Mobile Screen Fixed Bottom CTA (Slides in dynamically) */}
      {showMobileFixedCta && (
        <div className="fixed bottom-0 left-0 w-full z-30 p-3 bg-stone-50/90 backdrop-blur-md border-t border-stone-200/60 md:hidden flex justify-center items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)] animate-slide-up">
          <button
            onClick={() => handleOpenReservation()}
            id="mobile_fixed_cta"
            className="w-full bg-amber-800 hover:bg-amber-900 text-stone-50 text-sm font-medium tracking-widest py-3.5 rounded-lg flex items-center justify-center space-x-2 shadow-md hover:shadow cursor-pointer transition-all active:scale-98"
          >
            <Calendar className="w-4 h-4" />
            <span>WEB予約・無料カウンセリングはこちら</span>
          </button>
        </div>
      )}
    </div>
  );
}

