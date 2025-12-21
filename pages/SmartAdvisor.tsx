
import React, { useState } from 'react';
import { Compass, Check, ArrowLeft, ArrowRight, Loader2, Sparkles, Building2, TrendingUp } from 'lucide-react';
import { QuizState, AdvisorResult } from '../types';
import { getSmartRecommendations } from '../services/geminiService';
import ProjectCard from '../components/ProjectCard';

interface SmartAdvisorProps {
  onNavigate: (page: string, id?: string) => void;
}

const SmartAdvisor: React.FC<SmartAdvisorProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [form, setForm] = useState<QuizState>({
    purpose: '',
    city: 'الخبر',
    budget: '700 ألف - 1.2 مليون',
    financing: true
  });

  const handleStart = async () => {
    setLoading(true);
    const recommendations = await getSmartRecommendations(form);
    setResult(recommendations);
    setLoading(false);
    setStep(5); // Result step
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="relative">
          <Loader2 className="animate-spin text-black mb-8" size={80} strokeWidth={1} />
          <Sparkles className="absolute top-0 right-0 text-yellow-400 animate-pulse" size={24} />
        </div>
        <h2 className="text-3xl font-black mb-4">نقوم الآن بتحليل أفضل الخيارات لك...</h2>
        <p className="text-gray-500 max-w-md mx-auto">ذكاؤنا الاصطناعي يراجع مئات الفرص العقارية لضمان حصولك على التوصية الأدق.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        {step < 5 && (
          <>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold mb-4">
                <Sparkles size={14} />
                مستشارك العقاري الذكي
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">اختر عقارك بذكاء</h1>
              <p className="text-gray-500">أجب على 4 أسئلة بسيطة لنرشدك نحو القرار الصحيح.</p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
               {/* Progress Bar */}
               <div className="h-2 bg-gray-100">
                  <div 
                    className="h-full bg-black transition-all duration-500" 
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
               </div>

               <div className="p-10 md:p-16">
                  {step === 1 && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h2 className="text-2xl font-black mb-8">ما هو الهدف الرئيسي من شراء العقار؟</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button 
                          onClick={() => { setForm({...form, purpose: 'سكن'}); setStep(2); }}
                          className={`p-8 rounded-3xl border-2 text-right transition-all group ${form.purpose === 'سكن' ? 'border-black bg-black/5' : 'border-gray-100 hover:border-black'}`}
                        >
                          <div className="bg-gray-100 p-4 rounded-2xl w-fit mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                            <Building2 size={32} />
                          </div>
                          <span className="block text-xl font-bold mb-2">لغرض السكن</span>
                          <span className="text-sm text-gray-500">أبحث عن منزل العمر والراحة والاستقرار لعائلتي.</span>
                        </button>
                        <button 
                          onClick={() => { setForm({...form, purpose: 'استثمار'}); setStep(2); }}
                          className={`p-8 rounded-3xl border-2 text-right transition-all group ${form.purpose === 'استثمار' ? 'border-black bg-black/5' : 'border-gray-100 hover:border-black'}`}
                        >
                          <div className="bg-gray-100 p-4 rounded-2xl w-fit mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                            <TrendingUp size={32} />
                          </div>
                          <span className="block text-xl font-bold mb-2">لغرض الاستثمار</span>
                          <span className="text-sm text-gray-500">أبحث عن عوائد تأجيرية مجزية أو نمو رأس المال.</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h2 className="text-2xl font-black mb-8">في أي مدينة تفضل تملك العقار؟</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['الخبر', 'الرياض', 'جدة', 'الدمام', 'مكة'].map(c => (
                          <button 
                            key={c}
                            onClick={() => { setForm({...form, city: c}); setStep(3); }}
                            className={`p-6 rounded-2xl border-2 text-center transition-all ${form.city === c ? 'border-black bg-black/5 font-black' : 'border-gray-100 hover:border-black'}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h2 className="text-2xl font-black mb-8">ما هي الميزانية المرصودة للعقار؟</h2>
                      <div className="space-y-4">
                        {['أقل من 700 ألف', '700 ألف - 1.2 مليون', '1.2 مليون - 2 مليون', 'أكثر من 2 مليون'].map(b => (
                          <button 
                            key={b}
                            onClick={() => { setForm({...form, budget: b}); setStep(4); }}
                            className={`w-full p-6 rounded-2xl border-2 text-right flex justify-between items-center transition-all ${form.budget === b ? 'border-black bg-black/5 font-black' : 'border-gray-100 hover:border-black'}`}
                          >
                            <span>{b}</span>
                            {form.budget === b && <Check size={20} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h2 className="text-2xl font-black mb-8">هل تخطط لاستخدام التمويل العقاري؟</h2>
                      <div className="grid grid-cols-2 gap-6 mb-12">
                        <button 
                          onClick={() => setForm({...form, financing: true})}
                          className={`p-8 rounded-3xl border-2 text-center transition-all ${form.financing === true ? 'border-black bg-black/5 font-black' : 'border-gray-100 hover:border-black'}`}
                        >
                          نعم، احتاج تمويل
                        </button>
                        <button 
                          onClick={() => setForm({...form, financing: false})}
                          className={`p-8 rounded-3xl border-2 text-center transition-all ${form.financing === false ? 'border-black bg-black/5 font-black' : 'border-gray-100 hover:border-black'}`}
                        >
                          لا، شراء نقدي
                        </button>
                      </div>
                      <button 
                        onClick={handleStart}
                        className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                      >
                        عرض النتائج الذكية
                        <Sparkles size={24} />
                      </button>
                    </div>
                  )}

                  <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-50">
                     {step > 1 && (
                       <button onClick={() => setStep(step - 1)} className="text-gray-400 font-bold flex items-center gap-2 hover:text-black transition-colors">
                         <ArrowRight size={20} className="rtl-flip" />
                         السابق
                       </button>
                     )}
                     <span className="text-gray-300 font-mono">الخطوة {step} من 4</span>
                  </div>
               </div>
            </div>
          </>
        )}

        {step === 5 && result && (
          <div className="animate-in fade-in zoom-in duration-700">
             <div className="text-center mb-16">
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h1 className="text-4xl font-black mb-4">هذه هي العقارات المثالية لك!</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">{result.reason}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {result.projects.map(p => (
                  <ProjectCard key={p.id} project={p} onClick={(id) => onNavigate('projectDetails', id)} />
                ))}
             </div>

             <div className="bg-black text-white p-12 rounded-[2.5rem] text-center shadow-2xl">
                <h3 className="text-2xl font-black mb-4">هل ترغب في مناقشة هذه الخيارات؟</h3>
                <p className="text-gray-400 mb-8 font-light">اترك رقمك وسيقوم مستشارك العقاري بالتواصل معك خلال 15 دقيقة لتقديم دراسة وافية لهذه المشاريع.</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                   <input type="tel" placeholder="رقم الجوال" className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/50" />
                   <button className="bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all">تواصل معي</button>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="mt-8 text-sm text-gray-500 underline"
                >
                  إعادة المحاولة
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartAdvisor;
