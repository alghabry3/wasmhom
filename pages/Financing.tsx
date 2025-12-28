
import React, { useState } from 'react';
import { Wallet, ShieldAlert, BadgeCheck, Landmark, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FINANCING_SOLUTIONS } from '../constants';

interface FinancingProps {
  onNavigate: (page: string) => void;
  type?: string;
}

const Financing: React.FC<FinancingProps> = ({ onNavigate, type = 'all' }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getHeaderInfo = () => {
    switch(type) {
      case 'mortgage': return { title: 'القروض والرهن العقاري', desc: 'نوفر لك أفضل الحلول التمويلية بالتعاون مع البنوك السعودية بأسعار تنافسية.' };
      case 'distress': return { title: 'حلول التعثر المالي', desc: 'نساعدك في تسوية مديونياتك ورفع إيقاف الخدمات لتمكينك من التملك.' };
      case 'sakani': return { title: 'الدعم السكني (سكني)', desc: 'استفد من برامج صندوق التنمية العقارية والقرض المدعوم 100%.' };
      default: return { title: 'الحلول التمويلية العقارية', desc: 'نمهد لك الطريق لامتلاك منزل أحلامك عبر منظومة تمويلية متكاملة.' };
    }
  };

  const header = getHeaderInfo();

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-950 text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-6">{header.title}</h1>
          <p className="text-xl text-gray-400 font-light">{header.desc}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {FINANCING_SOLUTIONS.filter(s => type === 'all' || s.type === type).map(sol => (
            <div key={sol.id} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl hover:-translate-y-2 transition-all">
              <div className="bg-black text-white p-5 rounded-2xl w-fit mb-8">
                {sol.type === 'mortgage' && <Landmark size={32} />}
                {sol.type === 'downpayment' && <Wallet size={32} />}
                {sol.type === 'distress' && <ShieldAlert size={32} />}
                {sol.type === 'sakani' && <BadgeCheck size={32} />}
              </div>
              <h3 className="text-2xl font-black mb-4">{sol.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">{sol.description}</p>
              <ul className="space-y-3 mb-10">
                {sol.details.map((d, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <a 
                href="#financing-form"
                className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
              >
                طلب استشارة تمويلية
                <ArrowLeft size={18} className="rtl-flip" />
              </a>
            </div>
          ))}
        </div>

        {/* Informational Sections based on context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
           <div className="space-y-8">
              <h2 className="text-3xl font-black">لماذا تختار وسم هوم كحل تمويلي؟</h2>
              <div className="space-y-6">
                 {[
                   { t: 'شراكات بنكية واسعة', d: 'نحن وسطاء معتمدون لدى الراجحي، الأهلي، البلاد، وساب.' },
                   { t: 'نسبة أرباح تنافسية', d: 'نحصل لك على عروض حصرية غير متوفرة لعملاء الأفراد.' },
                   { t: 'دراسة ائتمانية مجانية', d: 'نقوم بتحليل سجلك الائتماني وتقديم خطة لتحسينه.' },
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="bg-gray-100 p-3 rounded-xl h-fit">
                         <BadgeCheck size={24} className="text-black" />
                      </div>
                      <div>
                         <h4 className="font-bold text-lg mb-1">{item.t}</h4>
                         <p className="text-gray-500 text-sm">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                 <AlertCircle className="text-yellow-600" />
                 <h3 className="text-xl font-black">تنبيه هام للمتعثرين</h3>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                 إذا كنت تعاني من مديونيات خارجية أو إيقاف خدمات، فإننا في وسم هوم نوفر لك حلول "تسوية الالتزامات" التي تهدف لتجميع ديونك في قسط واحد ميسر، مما يرفع اسمك من قائمة التعثر ويمهد الطريق لحصولك على منزل أحلامك.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                 <h4 className="font-bold mb-2">الأوراق المطلوبة للبدء:</h4>
                 <ul className="text-sm text-gray-500 space-y-2">
                    <li>• كشف حساب بنكي لآخر 3 أشهر</li>
                    <li>• تعريف بالراتب موثق</li>
                    <li>• تقرير سمة المحدث</li>
                 </ul>
              </div>
           </div>
        </div>

        {/* Lead Form */}
        <section id="financing-form" className="bg-black text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
           <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">ابدأ رحلة التملك اليوم</h2>
                 <p className="text-gray-400 text-lg mb-8">
                    أرسل بياناتك وسيقوم مستشار التمويل العقاري بالتواصل معك لدراسة حالتك وتقديم أفضل الحلول المتاحة لك.
                 </p>
                 <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-yellow-400">15</span>
                       <span className="text-xs text-gray-500">دقيقة للرد</span>
                    </div>
                    <div className="w-px h-12 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-3xl font-black text-yellow-400">100%</span>
                       <span className="text-xs text-gray-500">خصوصية تامة</span>
                    </div>
                 </div>
              </div>

              {!formSubmitted ? (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2rem] space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">الاسم الكامل</label>
                        <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-white/50 transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">رقم الجوال</label>
                        <input type="tel" required placeholder="05xxxxxxxx" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-white/50 transition-all" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-wider text-gray-400">نوع الخدمة المطلوبة</label>
                     <select className="w-full bg-gray-800 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-white/50">
                        <option>قرض عقاري جديد</option>
                        <option>رهن عقاري</option>
                        <option>حل تعثر مالي</option>
                        <option>توفير دفعة أولى</option>
                        <option>دعم سكني</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-wider text-gray-400">جهة العمل</label>
                     <select className="w-full bg-gray-800 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-white/50">
                        <option>قطاع حكومي (مدني)</option>
                        <option>قطاع حكومي (عسكري)</option>
                        <option>قطاع خاص (معتمد)</option>
                        <option>متقاعد</option>
                        <option>عمل حر / مؤسسة</option>
                     </select>
                  </div>
                  <button type="submit" className="w-full bg-white text-black py-5 rounded-xl font-black text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-2xl">
                     إرسال الطلب
                     <Send size={20} />
                  </button>
                </form>
              ) : (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-12 rounded-[2rem] text-center space-y-6">
                   <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                   </div>
                   <h3 className="text-2xl font-black">تم استلام طلبك بنجاح</h3>
                   <p className="text-gray-400">سيقوم مستشارنا بالتواصل معك قريباً جداً. شكراً لثقتك بوسم هوم.</p>
                   <button onClick={() => setFormSubmitted(false)} className="text-white underline text-sm">إرسال طلب آخر</button>
                </div>
              )}
           </div>
        </section>
      </div>
    </div>
  );
};

export default Financing;
