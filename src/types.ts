export type MenuCategory = '冷え改善' | 'むくみケア' | '更年期ケア' | 'トータルコース';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  duration: number; // minutes
  price: number;
  firstTimePrice?: number;
  description: string;
  benefits: string[];
  steps: string[];
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  id: string;
  date: string;
  time: string;
  menuId: string;
  menuName: string;
  name: string;
  kana: string;
  email: string;
  phone: string;
  concerns: string[];
  notes?: string;
  status: ReservationStatus;
  createdAt: string;
}

export type InquiryStatus = 'unread' | 'replied' | 'archived';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  ageGroup: string; // e.g. "40代女性", "50代女性"
  nickname: string;
  menuName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  isApproved: boolean;
}
