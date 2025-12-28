
import React, { useState, useMemo } from 'react';
import { MapPin, Building, Ruler, Calendar, CheckCircle, Info, Calculator, Download, ChevronLeft } from 'lucide-react';
import { Project } from '../types';
import { MOCK_PROJECTS } from '../constants';

interface ProjectDetailsProps {
  projectId: string;
  onNavigate: (page: string, id?: string) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, onNavigate }) => {
  const project = MOCK_PROJECTS.find(p => p.id === projectId);
  const [loanAmount, setLoanAmount] = useState(650000);
  const [years, setYears] = useState(20);

  const monthlyPayment = useMemo(() => {
    const rate = 0.045 / 12;
    const n = years * 12;
    return Math.round((loanAmount * rate) / (1 - Math.pow(1 + rate, -n)));
  }, [loanAmount, years]);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="bg-white">
      {/* Hero Gallery */}
      <section className="relative h-[60vh] lg:h-[75vh]">
        <img 
          src={project.image} 
          className="w-full h-full object-cover" 
          alt={project.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex gap-2 mb-4">
                 <span className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-black">{project.status}</span>
                 <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold border border-white/30">{project.type}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-2">{project.name}</h1>
              <p className="flex items-center gap-2 text-gray-300 text-lg">
                <MapPin size={20} />
                {project.location}
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl min-w-[300px]">
               <span className="text-gray-400 block mb-1">يبدأ السعر من</span>
               <span className="text-4xl font-black text-black">{project.priceFrom.toLocaleString()} ريال</span>
               <button className="w-full mt-6 bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/20">
                 احجز استشارة الآن
               </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Info className="text-black" />
                عن المشروع
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                {project.description} يعد هذا المشروع نقلة نوعية في التصميم المعماري بالمنطقة، حيث يدمج بين الفخامة والوظيفية. تتوفر مرافق متكاملة تضمن لك ولعائلتك تجربة سكنية استثنائية بعيداً عن صخب المدينة وبقرب أهم الخدمات.
              </p>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-8 rounded-3xl">
              <div className="flex flex-col items-center text-center">
                 <Ruler size={32} className="text-black mb-3" />
                 <span className="text-xs text-gray-400 mb-1">المساحة</span>
                 <span className="font-bold text-lg">{project.area} م²</span>
              </div>
              <div className="flex flex-col items-center text-center">
                 <Building size={32} className="text-black mb-3" />
                 <span className="text-xs text-gray-400 mb-1">الغرف</span>
                 <span className="font-bold text-lg">{project.rooms}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                 <Calendar size={32} className="text-black mb-3" />
                 <span className="text-xs text-gray-400 mb-1">التسليم</span>
                 <span className="font-bold text-lg">{project.deliveryDate || 'جاهز'}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                 <CheckCircle size={32} className="text-black mb-3" />
                 <span className="text-xs text-gray-400 mb-1">المطور</span>
                 <span className="font-bold text-lg">{project.developer}</span>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-8">لماذا هذا المشروع؟</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                  <h4 className="text-green-800 font-bold text-lg mb-4">لمن يناسب؟</h4>
                  <ul className="space-y-3 text-green-700 font-medium">
                    <li>• العائلات الباحثة عن الهدوء والخصوصية.</li>
                    <li>• المستثمرين الراغبين بعائد تأجيري مجزي.</li>
                    <li>• محبي التصاميم الحديثة والذكية.</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                  <h4 className="text-red-800 font-bold text-lg mb-4">لمن لا يناسب؟</h4>
                  <ul className="space-y-3 text-red-700 font-medium">
                    <li>• من يفضل السكن في مراكز المدن المزدحمة.</li>
                    <li>• الراغبين في استلام فوري للعقارات قيد الإنشاء.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="text-black" />
                حاسبة التمويل
              </h2>
              <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                   <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-500 mb-4">مبلغ التمويل: {loanAmount.toLocaleString()} ريال</label>
                        <input 
                          type="range" min="100000" max="5000000" step="50000" 
                          value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-500 mb-4">مدة التمويل: {years} سنة</label>
                        <input 
                          type="range" min="5" max="30" step="1" 
                          value={years} onChange={(e) => setYears(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                      </div>
                   </div>
                   <div className="bg-black text-white p-10 rounded-2xl text-center">
                      <span className="block text-gray-400 mb-2 font-medium">القسط الشهري المتوقع</span>
                      <span className="text-4xl font-black">{monthlyPayment.toLocaleString()} ريال</span>
                      <p className="mt-4 text-xs text-gray-500">* تطبق الشروط والأحكام الخاصة بالجهات التمويلية</p>
                   </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar CTA & Tools */}
          <div className="space-y-8">
            <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl sticky top-28">
               <h3 className="text-xl font-bold mb-6">احصل على الملف الكامل</h3>
               <p className="text-gray-400 mb-8 font-light">يحتوي الملف على المخططات الهندسية، قائمة التشطيبات، ودراسة العائد الاستثماري التفصيلية.</p>
               <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold mb-4 hover:bg-gray-100 transition-all">
                  <Download size={20} />
                  تحميل بروشور المشروع PDF
               </button>
               <button className="w-full flex items-center justify-center gap-3 bg-black border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-white/5 transition-all">
                  قارن مع مشاريع مشابهة
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
