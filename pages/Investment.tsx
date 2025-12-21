
import React, { useState } from 'react';
import { TrendingUp, BarChart3, Calculator, ChevronLeft, Target, ShieldCheck } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

interface InvestmentProps {
  onNavigate: (page: string, id?: string) => void;
}

const Investment: React.FC<InvestmentProps> = ({ onNavigate }) => {
  const [invAmount, setInvAmount] = useState(1000000);
  const [roiPercent, setRoiPercent] = useState(8);

  const annualIncome = (invAmount * roiPercent) / 100;

  const investmentProjects = MOCK_PROJECTS.filter(p => (p.roiEstimate || 0) >= 6);

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero */}
      <section className="bg-black text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-20">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="bg" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">استثمر بذكاء مع <span className="text-gray-400">وسم هوم</span></h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
              نوفر لك حلولاً استثمارية عقارية مدروسة بعناية لتحقيق أعلى العوائد بأقل المخاطر، مع تحليلات دقيقة للسوق السعودي الواعد.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <BarChart3 size={24} />
                ابدأ رحلتك الاستثمارية
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Tools */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">حاسبة العائد الاستثماري (ROI)</h2>
            <p className="text-gray-500 text-lg">خطط لمستقبلك المالي من خلال تقدير العوائد السنوية المتوقعة من عقاراتك المؤجرة.</p>
            
            <div className="space-y-10 bg-gray-50 p-10 rounded-[2.5rem]">
              <div>
                <label className="block text-sm font-black text-gray-400 mb-4 uppercase tracking-wider">قيمة الاستثمار: {invAmount.toLocaleString()} ريال</label>
                <input 
                  type="range" min="100000" max="10000000" step="50000"
                  value={invAmount} onChange={(e) => setInvAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-400 mb-4 uppercase tracking-wider">العائد السنوي المتوقع: {roiPercent}%</label>
                <input 
                  type="range" min="3" max="15" step="0.5"
                  value={roiPercent} onChange={(e) => setRoiPercent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-end">
                   <div>
                      <span className="text-gray-500 block text-sm mb-1">الدخل السنوي المتوقع</span>
                      <span className="text-4xl font-black text-black">{annualIncome.toLocaleString()} ريال</span>
                   </div>
                   <div className="text-right">
                      <span className="text-gray-500 block text-sm mb-1">الدخل الشهري</span>
                      <span className="text-2xl font-bold text-black">{Math.round(annualIncome/12).toLocaleString()} ريال</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Target className="text-black" />, title: "أهداف واضحة", desc: "نساعدك في تحديد استراتيجية التخارج والنمو." },
              { icon: <TrendingUp className="text-black" />, title: "نمو رأس المال", desc: "مشاريع في مناطق تشهد ارتفاعاً مستمراً في الأسعار." },
              { icon: <ShieldCheck className="text-black" />, title: "أمان قانوني", desc: "تغطية قانونية كاملة لجميع عقود الاستثمار." },
              { icon: <Calculator className="text-black" />, title: "تقارير دورية", desc: "تحليلات ربع سنوية لأداء استثماراتك العقارية." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <div className="bg-gray-50 p-4 rounded-2xl w-fit mb-6">{item.icon}</div>
                <h3 className="font-black text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High ROI Projects */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">مشاريع بعوائد مرتفعة</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">قائمة مختارة من المشاريع التي تحقق توازناً مثالياً بين المخاطرة والربحية.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentProjects.map(p => (
              <div key={p.id} className="relative">
                <div className="absolute top-4 left-4 z-10 bg-black text-white px-4 py-2 rounded-xl text-xs font-black shadow-xl">
                  عائد متوقع {p.roiEstimate}%
                </div>
                <ProjectCard project={p} onClick={(id) => onNavigate('projectDetails', id)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investment;
