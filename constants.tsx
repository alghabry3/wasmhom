
import { Project, FaqItem, FinancingSolution, BlogPost } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'مجمع وسم السكني 01',
    location: 'حي العزيزية، الخبر',
    district: 'العزيزية',
    city: 'الخبر',
    priceFrom: 650000,
    type: 'شقة',
    status: 'جاهز',
    rooms: 3,
    area: 160,
    developer: 'وسم هوم العقارية',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    description: 'مشروع عصري في الخبر يوفر وحدات سكنية جاهزة للسكن المباشر مع ضمانات هيكلية وكهربائية شاملة.',
    roiEstimate: 7.5,
    wafiCertified: false,
    units: [
      { id: 'u1', projectId: 'p1', unitNumber: '101', type: 'شقة', area: 160, price: 650000, status: 'available', rooms: 3, bathrooms: 2 },
      { id: 'u2', projectId: 'p1', unitNumber: '102', type: 'شقة', area: 180, price: 720000, status: 'reserved', rooms: 4, bathrooms: 3 }
    ]
  },
  {
    id: 'p2',
    name: 'فلل وسم نجد (وافي)',
    location: 'حي النرجس، الرياض',
    district: 'النرجس',
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
    description: 'مشروع مرخص بنظام البيع على الخارطة (وافي)، يوفر فلل سكنية بتصاميم عصرية ومساحات خضراء خاصة في أرقى أحياء شمال الرياض.',
    roiEstimate: 5.2,
    wafiCertified: true,
    paymentPlans: [
      { title: 'دفعة أولى 10%', details: '10% عند الحجز، 10% عند اكتمال الهيكل الإنشائي، الباقي عند التسليم' },
      { title: 'تمويل مرابحة', details: 'متوافق مع جميع البنوك السعودية ببرنامج القرض المدعوم' }
    ]
  },
  {
    id: 'p3',
    name: 'برج وسم التجاري',
    location: 'طريق الملك فهد، الخبر',
    district: 'البندرية',
    city: 'الخبر',
    priceFrom: 1500000,
    type: 'تجاري',
    status: 'استثماري',
    rooms: 0,
    area: 250,
    developer: 'وسم هوم العقارية',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    description: 'مكاتب تجارية فاخرة وصالات عرض في موقع استراتيجي على طريق الملك فهد بالخبر، مثالي للشركات الراغبة في التوسع.',
    roiEstimate: 9.2
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'دليلك الشامل لنظام وافي السعودي',
    summary: 'تعرف على حقوقك كمشتري في نظام البيع على الخارطة وكيف تضمن تسليم وحدتك في الموعد.',
    category: 'نصائح عقارية',
    date: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'أثر الفائدة على القروض العقارية 2024',
    summary: 'تحليل لتوقعات الفائدة في البنوك السعودية وأفضل وقت للتقديم على طلب التمويل.',
    category: 'تمويل',
    date: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  }
];

export const FINANCING_SOLUTIONS: FinancingSolution[] = [
  {
    id: 's1',
    title: 'القرض العقاري المدعوم',
    icon: 'Landmark',
    type: 'mortgage',
    description: 'تمويل متوافق مع أحكام الشريعة الإسلامية بالتعاون مع صندوق التنمية العقارية وسكني.',
    details: ['دعم يصل لـ 100% من الأرباح', 'تغطية للمدنيين والعسكريين', 'مدة سداد تصل لـ 25 سنة']
  },
  {
    id: 's2',
    title: 'حلول الدفعة المقدمة',
    icon: 'Wallet',
    type: 'downpayment',
    description: 'نوفر لك السيولة اللازمة للدفعة الأولى لامتلاك عقارك دون تأخير.',
    details: ['بدون فوائد إضافية', 'سداد ميسر', 'سرعة الإجراءات']
  },
  {
    id: 's3',
    title: 'حلول التعثر وإيقاف الخدمات',
    icon: 'ShieldAlert',
    type: 'distress',
    description: 'معالجة المديونيات وتحسين السجل الائتماني (سمة) لتمكينك من الحصول على التمويل.',
    details: ['تسوية الديون الخارجية', 'رفع إيقاف الخدمات', 'تحسين الأهلية الائتمانية']
  },
  {
    id: 's4',
    title: 'الدعم السكني (سكني)',
    icon: 'BadgeCheck',
    type: 'sakani',
    description: 'الاستفادة من منتجات سكني المختلفة بما في ذلك الوحدات تحت الإنشاء والبناء الذاتي.',
    details: ['وحدات وزارة الإسكان', 'دعم الأرباح', 'تسهيلات لمستفيدي الضمان']
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  { id: 'f1', category: 'العقارات', question: 'ما هو نظام وافي؟', answer: 'هو نظام البيع على الخارطة الذي يتيح للمطور بيع الوحدات قبل بنائها تحت إشراف وزارة الشؤون البلدية والقروية والإسكان لضمان حقوق المشترين.' },
  { id: 'f2', category: 'التمويل', question: 'هل يمكنني شراء عقار براتب مدعوم؟', answer: 'نعم، يمكن لمستفيدي برنامج سكني الحصول على قرض مدعوم الأرباح لتمويل شراء الوحدات الجاهزة أو تحت الإنشاء.' },
  { id: 'f3', category: 'التمويل', question: 'كيف يتم معالجة إيقاف الخدمات؟', answer: 'نقوم بدراسة المديونيات وتسويتها مع الجهات المعنية ثم التنسيق مع البنوك لإعادة جدولتها وطلب تمويل عقاري جديد.' }
];

export const COMPANY_INFO = {
  name: 'شركة وسم هوم العقارية',
  address: 'المملكة العربية السعودية، الخبر، طريق الملك فيصل، برج الرامي الدور 4',
  phone: '920017195',
  whatsapp: '966920017195',
  email: 'info@wasmhome.com',
  license: 'سجل تجاري: 2051234567 | رخصة فال: 1200008899'
};
