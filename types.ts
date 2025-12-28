
export interface Unit {
  id: string;
  projectId: string;
  unitNumber: string;
  type: 'شقة' | 'فيلا' | 'دوبلكس' | 'تاون هاوس' | 'أرض' | 'تجاري';
  area: number;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  paymentPlan?: string;
  floor?: number;
  rooms: number;
  bathrooms: number;
  description?: string;
  features?: string[];
}

export interface Project {
  id: string;
  name: string;
  location: string;
  district: string;
  city: 'الخبر' | 'الدمام' | 'الرياض' | 'جدة' | 'مكة' | 'المدينة';
  priceFrom: number;
  type: 'شقة' | 'فيلا' | 'دوبلكس' | 'تاون هاوس' | 'متعدد' | 'تجاري';
  status: 'جاهز' | 'على الخارطة' | 'استثماري' | 'مكتمل';
  progress?: number;
  rooms: number;
  area: number;
  developer: string;
  deliveryDate?: string;
  image: string;
  videoUrl?: string;
  mapUrl?: string;
  description: string;
  roiEstimate?: number;
  units?: Unit[];
  paymentPlans?: { title: string; details: string }[];
  wafiCertified?: boolean;
  features?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: 'نصائح عقارية' | 'أخبار السوق' | 'تمويل' | 'استثمار';
  date: string;
  image: string;
  content?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  interestType: string;
  status: 'new' | 'contacted' | 'negotiating' | 'closed' | 'lost';
  odooId?: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'manager' | 'editor';
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
}

// Added missing types for FAQ section
export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// Added missing types for Financing section
export interface FinancingSolution {
  id: string;
  title: string;
  icon: string;
  type: 'mortgage' | 'downpayment' | 'distress' | 'sakani';
  description: string;
  details: string[];
}

// Added missing types for AI Smart Advisor
export interface QuizState {
  purpose: string;
  city: string;
  budget: string;
  financing: boolean;
}

export interface AdvisorResult {
  projects: Project[];
  reason: string;
}
