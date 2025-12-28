
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
  progress?: number; // نسبة الإنجاز للمشاريع تحت الإنشاء (وافي)
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

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'العقارات' | 'التمويل' | 'الاستثمار' | 'إجراءات';
}

export interface FinancingSolution {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  type: 'mortgage' | 'distress' | 'sakani' | 'downpayment';
}

export interface AdvisorResult {
  projects: Project[];
  reason: string;
}

export interface QuizState {
  purpose: 'سكن' | 'استثمار' | '';
  city: string;
  budget: string;
  financing: boolean;
  propertyType?: string;
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
