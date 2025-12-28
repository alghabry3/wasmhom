import React, { useState, useMemo } from 'react';
// Added Award icon to imports
import { MapPin, Building, Ruler, Calendar, CheckCircle, Info, Calculator, Download, ChevronLeft, Star, Share2, Heart, ShieldCheck, Award } from 'lucide-react';
import { Project } from '../types';
import { MOCK_PROJECTS } from '../constants';
// Added Logo component import
import Logo from '../components/Logo';

interface ProjectDetailsProps {
  projectId: string;
  onNavigate: (page: string, id?: string) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, onNavigate }) => {
  const project = MOCK_PROJECTS.find(p => p.id === projectId);
  const [loanAmount, setLoanAmount] = useState(650000);
  const [years, setYears] = useState(20);
  const [isLiked, setIsLiked] = useState(false);

  const monthlyPayment = useMemo(() => {
    const rate = 0.045 / 12;
    const n = years * 12;
    return Math.round((loanAmount * rate) / (1 - Math.pow(1 + rate, -n)));
  }, [loanAmount, years]);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">العقار غير موجود</h2>
        <button onClick={() => onNavigate('projects')} className="mt-4 text-black underline">العودة للمشاريع</button>
      </div>
    </div>
  );

  return (
    <div className="bg-white animate-in fade-in duration-500">
      {/* Top Navigation Overlay */}
      <div className="absolute top-24 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => onNavigate('projects')}
          className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white transition-all"
        >
          <ChevronLeft className="rtl-flip" size={24} />
        </button>
      </div>

      {/* Hero Gallery */}
      <section className="relative h-[60vh] lg:h-[80vh]">
        <img 
          src={project.image} 
          className="w-full h-full object-cover" 
          alt={project.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                 <span className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-xs font-black shadow-lg">مميز</span>
                 <span className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-black">{project.status}</span>
                 <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold border border-white/30">{project.type}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight">{project.name}</h1>
              <div className="flex items-center gap-6 text-gray-300">
                <p className="flex items-center gap-2 text-lg">
                  <MapPin size={20} className="text-yellow-400" />
                  {project.location}
                </p>
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-white">4.9</span>
                  <span className="text-sm">(120 تقييم)</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mb-4 md:mb-0">
               <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-4 rounded-2xl backdrop-blur-md transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'}`}
               >
                 <Heart size={24} className={isLiked ? 'fill-current' : ''} />
               </button>
               <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 transition-all">
                 <Share2 size={24} />
               </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-20">
            {/* Quick Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-300">
                 <Ruler size={32} className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">المساحة</span>
                 <span className="font-black text-xl">{project.area} م²</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-300">
                 <Building size={32} className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">الغرف</span>
                 <span className="font-black text-xl">{project.rooms} غرف</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-300">
                 <Calendar size={32} className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">التسليم</span>
                 <span className="font-black text-lg">{project.deliveryDate || 'جاهز'}</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-300">
                 <ShieldCheck size={32} className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">الضمان</span>
                 <span className="font-black text-lg">10 سنوات</span>
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-black rounded-full"></div>
                عن المشروع والتصميم
              </h2>
              <div className="prose prose-lg text-gray-600 font-light leading-loose max-w-none">
                <p>
                  {project.description} يمثل هذا المشروع نموذجاً فريداً للعمارة السعودية المعاصرة، حيث تم اختيار كل تفصيلة بعناية فائقة لتعكس الرقي والرفاهية. من الواجهات الزجاجية التي تسمح بدخول الضوء الطبيعي، إلى المساحات الخضراء التي تحيط بالمبنى، كل شيء مصمم ليوفر لك بيئة مثالية.
                </p>
                <p className="mt-4">
                  يتميز المشروع بموقعه الاستراتيجي الذي يسهل الوصول منه إلى كافة المراكز الحيوية، مع توفير أعلى معايير الخصوصية والأمان لقاطنيه عبر نظام حراسة وكاميرات مراقبة تعمل على مدار الساعة.
                </p>
              </div>
            </section>

            {/* Features List */}
            <section className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
              <h3 className="text-2xl font-black mb-10">المميزات والمرافق</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'تكييف مركزي ذكي', 'مواقف سيارات خاصة', 'نظام سمارت هوم متكامل',
                  'نادي رياضي رجالي ونسائي', 'منطقة ألعاب للأطفال', 'حراسة وأمن 24/7',
                  'مصاعد بانورامية', 'إطلالات خلابة'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-gray-700">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </section>

            {/* Financing Calculator */}
            <section id="calculator">
              <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <Calculator size={32} />
                حاسبة التمويل العقاري
              </h2>
              <div className="bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] p-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                   <div className="space-y-12">
                      <div className="relative">
                        <div className="flex justify-between mb-4">
                          <label className="text-sm font-black text-gray-400 uppercase">مبلغ التمويل</label>
                          <span className="font-black text-black">{loanAmount.toLocaleString()} ريال</span>
                        </div>
                        <input 
                          type="range" min="100000" max="5000000" step="50000" 
                          value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                      </div>
                      <div className="relative">
                        <div className="flex justify-between mb-4">
                          <label className="text-sm font-black text-gray-400 uppercase">مدة التمويل</label>
                          <span className="font-black text-black">{years} سنة</span>
                        </div>
                        <input 
                          type="range" min="5" max="30" step="1" 
                          value={years} onChange={(e) => setYears(Number(e.target.value))}
                          className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 text-sm text-yellow-800 font-medium">
                        * تم احتساب القسط بناءً على هامش ربح تقديري 4.5%. تواصل معنا للحصول على عرض سعر دقيق.
                      </div>
                   </div>
                   <div className="bg-black text-white p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                      <span className="block text-gray-400 mb-2 font-bold uppercase tracking-widest text-xs">القسط الشهري المتوقع</span>
                      <span className="text-6xl font-black text-yellow-400 tabular-nums">
                        {monthlyPayment.toLocaleString()}
                        <span className="text-xl font-normal text-white mr-2">ريال</span>
                      </span>
                      <button className="w-full mt-10 bg-white text-black py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all shadow-xl">
                        قدم طلب تمويل الآن
                      </button>
                   </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-gray-950 text-white rounded-[2.5rem] p-10 shadow-2xl sticky top-28 overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                 {/* Fixed: Logo component now imported */}
                 <Logo dark={false} className="h-32" />
               </div>
               <div className="relative z-10">
                 <span className="text-gray-400 block mb-1 font-bold uppercase tracking-widest text-xs">يبدأ السعر من</span>
                 <div className="text-5xl font-black mb-8 text-yellow-400">
                    {project.priceFrom.toLocaleString()} 
                    <span className="text-lg font-normal text-white mr-2">ريال</span>
                 </div>
                 
                 <div className="space-y-4 mb-10">
                    <button className="w-full bg-white text-black py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                       احجز وحدتك الآن
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
                       <Download size={20} />
                       تحميل البروشور PDF
                    </button>
                 </div>

                 <div className="pt-8 border-t border-white/10 space-y-4">
                    <p className="text-sm text-gray-400 text-center font-light">هل تحتاج للمساعدة؟</p>
                    <a 
                      href={`https://wa.me/966920017195`} 
                      target="_blank"
                      className="w-full flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-2xl font-black hover:bg-green-600 transition-all"
                    >
                      تواصل عبر الواتساب
                    </a>
                 </div>
               </div>
            </div>

            {/* Quality Guarantee Card */}
            <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] p-8 text-center">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 {/* Fixed: Award icon now imported */}
                 <Award size={32} className="text-black" />
               </div>
               <h4 className="font-black text-lg mb-2">ضمان الجودة الإنشائية</h4>
               <p className="text-gray-500 text-sm font-light">نلتزم بأعلى معايير كود البناء السعودي مع إشراف هندسي متكامل في كافة مراحل البناء.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;