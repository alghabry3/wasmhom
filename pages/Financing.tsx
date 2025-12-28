
import React from 'react';
import { Wallet, ShieldAlert, BadgeCheck, Landmark, ArrowLeft, Send } from 'lucide-react';
import { FINANCING_SOLUTIONS } from '../constants';

const Financing: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-950 text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-6">الحلول التمويلية والعقارية</h1>
          <p className="text-xl text-gray-400 font-light">نمهد لك الطريق لامتلك منزل أحلامك، مهما كانت التحديات المالية.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FINANCING_SOLUTIONS.map(sol => (
            <div key={sol.id} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl hover:-translate-y-2 transition-all">
              <div className="bg-black text-white p-5 rounded-2xl w-fit mb-8">
                {sol.id === 's1' ? <Wallet size={32} /> : <ShieldAlert size={32} />}
              </div>
              <h3 className="text-2xl font-black mb-4">{sol.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">{sol.description}</p>
              <ul className="space-y-3 mb-10">
                {sol.details.map((d, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <BadgeCheck size={18} className="text-green-500" />
                    {d}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                طلب استشارة تمويلية
                <ArrowLeft size={18} className="rtl-flip" />
              </button>
            </div>
          ))}
          
          <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
            <Landmark size={64} className="text-yellow-400 mb-6" />
            <h3 className="text-2xl font-black mb-4">التمويل البنكي</h3>
            <p className="text-gray-400 mb-8">نحن وسطاء معتمدون لدى كبرى البنوك السعودية لتقديم أفضل هوامش الربح.</p>
            <button className="bg-white text-black px-10 py-4 rounded-xl font-black">قارن العروض</button>
          </div>
        </div>

        {/* Housing Support Info */}
        <section className="mt-24 bg-yellow-50 rounded-[3rem] p-12 border border-yellow-100">
           <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                 <h2 className="text-3xl font-black text-gray-900 mb-6">دعم سكني وبرنامج القرض المدعوم</h2>
                 <p className="text-gray-700 text-lg leading-relaxed mb-8">
                   نساعدك في الاستفادة القصوى من برامج الدعم السكني وصندوق التنمية العقارية، بما في ذلك الدعم المباشر، وتخفيض الأقساط، وحلول الدفعة الأولى.
                 </p>
                 <div className="flex gap-4">
                    <div className="bg-white px-6 py-4 rounded-2xl font-bold shadow-sm">دعم مباشر 100-150 ألف</div>
                    <div className="bg-white px-6 py-4 rounded-2xl font-bold shadow-sm">تمويل لمستفيدي الضمان</div>
                 </div>
              </div>
              <div className="lg:w-1/3 bg-white p-8 rounded-3xl shadow-xl">
                 <h4 className="font-black mb-4">تواصل مع مستشار التمويل</h4>
                 <input type="tel" placeholder="رقم الجوال" className="w-full bg-gray-50 border-0 rounded-xl p-4 mb-4 focus:ring-2 focus:ring-black" />
                 <button className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                    إرسال الطلب
                    <Send size={18} />
                 </button>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Financing;
