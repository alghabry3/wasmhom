
import { Project } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'مجمع وسم السكني 01',
    location: 'حي العزيزية، الخبر',
    city: 'الخبر',
    priceFrom: 650000,
    type: 'شقة',
    status: 'جاهز',
    rooms: 3,
    area: 160,
    developer: 'وسم هوم العقارية',
    deliveryDate: '2024-12-01',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    description: 'مشروع عصري يوفر الرفاهية والأمان لعائلتك في قلب الخبر، مع تشطيبات فاخرة ومرافق متكاملة.',
    roiEstimate: 7.5
  },
  {
    id: '2',
    name: 'فلل الياقوت',
    location: 'حي النرجس، الرياض',
    city: 'الرياض',
    priceFrom: 1200000,
    type: 'فيلا',
    status: 'على الخارطة',
    rooms: 5,
    area: 350,
    developer: 'مطور نجد',
    deliveryDate: '2025-06-30',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    description: 'تصميم كلاسيكي حديث مع مساحات واسعة تلبي تطلعات الحياة العصرية للعائلات الكبيرة.',
    roiEstimate: 5.2
  },
  {
    id: '3',
    name: 'برج الشاطئ',
    location: 'كورنيش الدمام',
    city: 'الدمام',
    priceFrom: 850000,
    type: 'شقة',
    status: 'جاهز',
    rooms: 2,
    area: 120,
    developer: 'الشرقية للتطوير',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    description: 'إطلالة مباشرة على الخليج العربي وتصاميم فندقية فاخرة تناسب الباحثين عن التميز.',
    roiEstimate: 8.8
  },
  {
    id: '4',
    name: 'تاون هاوس الروضة',
    location: 'حي الروضة، الخبر',
    city: 'الخبر',
    priceFrom: 590000,
    type: 'تاون هاوس',
    status: 'على الخارطة',
    rooms: 4,
    area: 220,
    developer: 'وسم هوم العقارية',
    deliveryDate: '2026-01-01',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
    description: 'خيار اقتصادي ذكي للعائلات الشابة الباحثة عن الخصوصية والراحة في حي متكامل.',
    roiEstimate: 6.0
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: 'b1',
    title: 'لماذا الاستثمار العقاري في الخبر هو الأفضل حالياً؟',
    summary: 'نستعرض في هذا المقال أهم العوامل الجاذبة للاستثمار في مدينة الخبر وكيف تطورت البنية التحتية فيها.',
    category: 'استثمار',
    date: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'خطوات شراء عقارك الأول: دليل شامل للمبتدئين',
    summary: 'كل ما تحتاج معرفته عن إجراءات الشراء، التمويل العقاري، والتحقق من جودة البناء.',
    category: 'نصائح عقارية',
    date: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=800'
  }
];

export const COMPANY_INFO = {
  name: 'شركة وسم هوم العقارية',
  address: 'السعودية، مدينة الخبر، شارع الأمير تركي',
  phone: '920017195',
  whatsapp: '966920017195',
  email: 'info@wasmhome.com'
};
