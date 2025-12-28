import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, Building, Ruler, Calendar, CheckCircle, Info, Calculator, Download, 
  ChevronLeft, Star, Share2, Heart, Bookmark, ShieldCheck, Award, Construction, 
  FileCheck, Phone, MessageSquare, Car, Shield, Zap, Waves, Dumbbell, Trees, 
  Store, ArrowUpCircle, Wifi, Wind, Coffee, Sparkles 
} from 'lucide-react';
import { Project, Unit } from '../types';
import { MOCK_PROJECTS } from '../constants';
import Logo from '../components/Logo';

interface ProjectDetailsProps {
  projectId: string;
  onNavigate: (page: string, id?: string) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, onNavigate }) => {
  const project = MOCK_PROJECTS.find(p => p.id === projectId);
  const [loanAmount, setLoanAmount] = useState(project?.priceFrom || 650000);
  const [years, setYears] = useState(20);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  // Wishlist state persisted to localStorage
  const [isSaved, setIsSaved] = useState(() => {
    try {
      const saved = localStorage.getItem('wasm_wishlist');
      const list = saved ? JSON.parse(saved) : [];
      return list.includes(projectId);
    } catch (e) {
      return false;
    }
  });

  const toggleSave = () => {
    try {
      const saved = localStorage.getItem('wasm_wishlist');
      let list = saved ? JSON.parse(saved) : [];
      if (list.includes(projectId)) {
        list = list.filter((id: string) => id !== projectId);
        setIsSaved(false);
      } else {
        list.push(projectId);
        setIsSaved(true);
      }
      localStorage.setItem('wasm_wishlist', JSON.stringify(list));
    } catch (e) {
      console.error("Failed to update wishlist", e);
    }
  };

  const monthlyPayment = useMemo(() => {
    const rate = 0.045 / 12;
    const n = years * 12;
    return Math.round((loanAmount * rate) / (1 - Math.pow(1 + rate, -n)));
  }, [loanAmount, years]);

  // Helper to map feature strings to icons
  const getFeatureIcon = (feature: string) => {
    const f = feature.toLowerCase();
    if (f.includes('موقف') || f.includes('سيارة')) return <Car size={24} />;
    if (f.includes('أمن') || f.includes('حراسة')) return <Shield size={24} />;
    if (f.includes('ذكي') || f.includes('سمارت')) return <Zap size={24} />;
    if (f.includes('مسبح')) return <Waves size={24} />;
    if (f.includes('نادي') || f.includes('رياضي')) return <Dumbbell size={24} />;
    if (f.includes('حديقة') || f.includes('خضراء')) return <Trees size={24} />;
    if (f.includes('خدمات') || f.includes('سوق')) return <Store size={24} />;
    if (f.includes('مصعد')) return <ArrowUpCircle size={24} />;
    if (f.includes('واي فاي') || f.includes('انترنت')) return <Wifi size={24} />;
    if (f.includes('تكييف')) return <Wind size={24} />;
    if (f.includes('كافيه') || f.includes('مطبخ')) return <Coffee size={24} />;
    return <Sparkles size={24} />;
  };

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
                 {project.wafiCertified && (
                   <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1">
                      <FileCheck size={14} /> مرخص وافي
                   </span>
                 )}
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
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mb-4 md:mb-0">
               <button 
                onClick={() => setIsLiked(!isLiked)}
                title="أعجبني"
                className={`p-4 rounded-2xl backdrop-blur-md transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'}`}
               >
                 <Heart size={24} className={isLiked ? 'fill-current' : ''} />
               </button>
               <button 
                onClick={toggleSave}
                title="حفظ"
                className={`p-4 rounded-2xl backdrop-blur-md transition-all ${isSaved ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'}`}
               >
                 <Bookmark size={24} className={isSaved ? 'fill-current' : ''} />
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
            {/* Project Progress for Wafi */}
            {project.status === 'على الخارطة' && project.progress !== undefined && (
              <section className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-2xl font-black text-blue-900 flex items-center gap-3">
                      <Construction /> حالة الإنجاز (وافي)
                   </h3>
                   <span className="text-3xl font-black text-blue-600">{project.progress}%</span>
                </div>
                <div className="w-full h-4 bg-blue-200 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-blue-600 transition-all duration-1000" 
                     style={{ width: `${project.progress}%` }}
                   ></div>
                </div>
                <p className="mt-6 text-blue-800 text-sm font-bold">تاريخ التسليم المتوقع: {project.deliveryDate}</p>
              </section>
            )}

            {/* Quick Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-300">
                 <Ruler size={32} className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">المساحة تبدأ من</span>
                 <span className="font-black text-xl">{project.area} م²</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-300">
                 <Building size={32} className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">الغرف</span>
                 <span className="font-black text-xl">{project.rooms} غرف</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-300">
                 <Calendar size={32} className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">الحالة</span>
                 <span className="font-black text-lg">{project.status}</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-300">
                 <ShieldCheck size={32} className="text-gray-400 group-hover:text-yellow-400 mb-3" />
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">المطور</span>
                 <span className="font-black text-lg">{project.developer}</span>
              </div>
            </section>

            {/* Amenities & Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-black rounded-full"></div>
                  المزايا والمرافق
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all text-center">
                      <div className="p-4 bg-gray-50 text-black rounded-2xl mb-4">
                        {getFeatureIcon(feature)}
                      </div>
                      <span className="text-sm font-bold text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Description */}
            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-black rounded-full"></div>
                عن المشروع
              </h2>
              <div className="prose prose-lg text-gray-600 font-light leading-loose max-w-none">
                <p>{project.description}</p>
                <p className="mt-4">
                  تم تصميم هذا المشروع ليتوافق مع تطلعات العائلة السعودية الحديثة، مع التركيز على الخصوصية، استدامة الموارد، واستخدام أفضل الخامات في التشطيبات النهائية.
                </p>
              </div>
            </section>

            {/* Units Listing */}
            {project.units && project.units.length > 0 && (
              <section>
                <h2 className="text-3xl font-black text-gray-900 mb-8">الوحدات المتوفرة</h2>
                <div className="overflow-x-auto rounded-[2rem] border border-gray-100 shadow-sm">
                   <table className="w-full text-right text-sm">
                      <thead className="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider">
                         <tr>
                            <th className="px-6 py-4">رقم الوحدة</th>
                            <th className="px-6 py-4">النوع</th>
                            <th className="px-6 py-4">المساحة</th>
                            <th className="px-6 py-4">الغرف</th>
                            <th className="px-6 py-4">السعر</th>
                            <th className="px-6 py-4">الحالة</th>
                            <th className="px-6 py-4"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {project.units.map(unit => (
                           <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-black">{unit.unitNumber}</td>
                              <td className="px-6 py-4">{unit.type}</td>
                              <td className="px-6 py-4">{unit.area} م²</td>
                              <td className="px-6 py-4">{unit.rooms}</td>
                              <td className="px-6 py-4 font-bold">{unit.price.toLocaleString()} ريال</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${unit.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                  {unit.status === 'available' ? 'متاحة' : 'محجوزة'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                 {unit.status === 'available' && (
                                   <button 
                                    onClick={() => setLoanAmount(unit.price)}
                                    className="text-black font-bold hover:underline"
                                   >
                                     احسب التمويل
                                   </button>
                                 )}
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              </section>
            )}

            {/* Payment Plans */}
            {project.paymentPlans && (
              <section className="bg-gray-900 text-white p-10 rounded-[2.5rem]">
                <h3 className="text-2xl font-black mb-8">خطط الدفع والتمويل</h3>
                <div className="grid md:grid-cols-2 gap-8">
                   {project.paymentPlans.map((plan, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h4 className="font-black text-yellow-400 mb-2">{plan.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{plan.details}</p>
                     </div>
                   ))}
                </div>
              </section>
            )}

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
                          type="range" min="100000" max="10000000" step="50000" 
                          value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 
                                     [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-gray-100 [&::-webkit-slider-runnable-track]:to-gray-300 [&::-webkit-slider-runnable-track]:rounded-lg
                                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
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
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 
                                     [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-gray-100 [&::-webkit-slider-runnable-track]:to-gray-300 [&::-webkit-slider-runnable-track]:rounded-lg
                                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                        />
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
                 <Logo dark={false} className="h-32" />
               </div>
               <div className="relative z-10">
                 <span className="text-gray-400 block mb-1 font-bold uppercase tracking-widest text-xs">السعر يبدأ من</span>
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
                    <p className="text-sm text-gray-400 text-center font-light">تواصل مباشر مع المستشار</p>
                    <div className="grid grid-cols-2 gap-4">
                       <a href="tel:920017195" className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                          <Phone size={24} />
                          <span className="text-xs font-bold">اتصال</span>
                       </a>
                       <a href="https://wa.me/966920017195" target="_blank" className="flex flex-col items-center gap-2 p-4 bg-green-500/20 text-green-400 rounded-2xl hover:bg-green-500/30 transition-all">
                          <MessageSquare size={24} />
                          <span className="text-xs font-bold">واتساب</span>
                       </a>
                    </div>
                 </div>
               </div>
            </div>

            <div className="bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] p-8 text-center">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
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