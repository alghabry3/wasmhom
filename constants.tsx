
import { Project, FaqItem, FinancingSolution, BlogPost } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'مجمع وسم السكني 01',
    location: 'حي العزيزية، الخبر',
    city: 'الخبر',
    priceFrom: 650000,
    type: 'شقة',
    status: 'جاهز',
    rooms: 3,
    area: 160,
    developer: 'وسم هوم العقارية',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    description: 'مشروع عصري يوفر الرفاهية والأمان لعائلتك في قلب الخبر، مع تشطيبات فاخرة ومرافق متكاملة.',
    roiEstimate: 7.5,
    units: [
      { id: 'u1', projectId: 'p1', unitNumber: '101', type: 'شقة', area: 160, price: 650000, status: 'available', rooms: 3 },
      { id: 'u2', projectId: 'p1', unitNumber: '102', type: 'شقة', area: 180, price: 720000, status: 'reserved', rooms: 4 }
    ]
  },
  {
    id: 'p2',
    name: 'فلل وسم نجد (تحت الإنشاء)',
    location: 'حي النرجس، الرياض',
    city: 'الرياض',
    priceFrom: 2200000,
    type: 'فيلا',
    status: 'على الخارطة',
    progress: 35,
    rooms: 5,
    area: 400,
    developer: 'وسم هوم للتطوير',
    deliveryDate: '2025-12-30',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    description: 'فلل سكنية فاخرة بنظام البيع على الخارطة، تتميز بتصاميم نجدية حديثة ومساحات مفتوحة.',
    roiEstimate: 5.2
  }
];

// Added MOCK_BLOG_POSTS to fix the export error in Blog.tsx
export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'كيف تختار منزلك الأول في 2024؟',
    summary: 'دليل شامل للمقبلين على شراء العقار لأول مرة، نناقش فيه أهم المعايير من الموقع إلى التمويل.',
    category: 'نصائح عقارية',
    date: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'مستقبل العقار في المنطقة الشرقية',
    summary: 'تحليل معمق للمشاريع الكبرى في الخبر والدمام وأثرها على أسعار الوحدات السكنية.',
    category: 'أخبار السوق',
    date: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    title: 'التمويل العقاري المدعوم: كل ما تحتاج معرفته',
    summary: 'شرح مفصل لبرامج سكني والصندوق العقاري وكيفية الاستفادة منها لتخفيض تكلفة التملك.',
    category: 'تمويل',
    date: '2024-05-05',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  }
];

export const FINANCING_SOLUTIONS: FinancingSolution[] = [
  {
    id: 's1',
    title: 'حلول الدفعة المقدمة',
    icon: 'Wallet',
    description: 'توفير حلول سيولة للدفعة المقدمة لتمكينك من حجز عقارك فوراً.',
    details: ['بدون فوائد إضافية', 'تسهيلات سداد مرنة', 'متوافق مع الشريعة']
  },
  {
    id: 's2',
    title: 'حلول التعثر المالي',
    icon: 'ShieldAlert',
    description: 'معالجة التعثرات وإيقاف الخدمات لتحسين أهليتك الائتمانية لدى البنوك.',
    details: ['سرية تامة', 'تسوية الديون الخارجية', 'رفع إيقاف الخدمات']
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  { category: 'العقارات', question: 'ما هو نظام البيع على الخارطة؟', answer: 'هو بيع وحدات عقارية قبل أو أثناء مرحلة الإنشاء وفق ضوابط وافي.' },
  { category: 'التمويل', question: 'هل تقبلون الدعم السكني؟', answer: 'نعم، جميع مشاريعنا متوافقة مع برامج الدعم السكني والصندوق العقاري.' }
];

export const COMPANY_INFO = {
  name: 'شركة وسم هوم العقارية',
  address: 'السعودية، مدينة الخبر، شارع الأمير تركي',
  phone: '920017195',
  whatsapp: '966920017195',
  email: 'info@wasmhome.com'
};
