
export interface Project {
  id: string;
  name: string;
  location: string;
  city: 'الخبر' | 'الدمام' | 'الرياض' | 'جدة';
  priceFrom: number;
  type: 'شقة' | 'فيلا' | 'دوبلكس' | 'تاون هاوس';
  status: 'جاهز' | 'على الخارطة';
  rooms: number;
  area: number;
  developer: string;
  deliveryDate?: string;
  image: string;
  description: string;
  roiEstimate?: number;
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
