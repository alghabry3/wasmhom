
export interface Unit {
  id: string;
  projectId: string;
  unitNumber: string;
  type: 'شقة' | 'فيلا' | 'دوبلكس' | 'تاون هاوس';
  area: number;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  paymentPlan?: string;
  floor?: number;
  rooms: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  city: 'الخبر' | 'الدمام' | 'الرياض' | 'جدة';
  priceFrom: number;
  type: 'شقة' | 'فيلا' | 'دوبلكس' | 'تاون هاوس' | 'متعدد';
  status: 'جاهز' | 'على الخارطة' | 'استثماري';
  progress?: number; // نسبة الإنجاز للمشاريع تحت الإنشاء
  rooms: number;
  area: number;
  developer: string;
  deliveryDate?: string;
  image: string;
  description: string;
  roiEstimate?: number;
  units?: Unit[];
}

// Added BlogPost interface to resolve missing type definition for blog features
export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface FinancingSolution {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
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
}
