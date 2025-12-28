
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { dbService } from '../services/dbService';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const newLead = {
      id: 'l' + Date.now(),
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      interestType: formData.get('interest') as string,
      status: 'new' as const,
      createdAt: new Date().toISOString()
    };

    // حفظ في قاعدة البيانات المحلية (CRM)
    dbService.addLead(newLead);
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-tajawal">
      {/* Header */}
      <section className="bg-gray-950 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">تواصل مع خبراء وسم</h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed">فريقنا مستعد لتحويل أحلامكم العقارية إلى واقع ملموس بدقة واحترافية.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: Phone, title: 'الرقم الموحد', val: COMPANY_INFO.phone, link: `tel:${COMPANY_INFO.phone}`, color: 'black' },
              { icon: MessageCircle, title: 'واتساب الأعمال', val: COMPANY_INFO.whatsapp, link: `https://wa.me/${COMPANY_INFO.whatsapp}`, color: 'green-500' },
              { icon: MapPin, title: 'مقر الشركة', val: COMPANY_INFO.address, link: '#', color: 'black' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 flex items-start gap-6 group hover:-translate-y-1 transition-all">
                <div className={`bg-${item.color === 'black' ? 'black' : 'green-500'} text-white p-4 rounded-2xl transition-colors`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.val}</p>
                  <a href={item.link} className="text-[10px] font-black uppercase tracking-widest text-black border-b border-black">تواصل الآن</a>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 md:p-16">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">الاسم الكامل</label>
                    <input name="name" type="text" required className="w-full bg-gray-50 border-0 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">رقم الجوال</label>
                    <input name="phone" type="tel" required className="w-full bg-gray-50 border-0 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">نوع الاهتمام</label>
                  <select name="interest" className="w-full bg-gray-50 border-0 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none transition-all">
                    <option>شراء عقار جاهز</option>
                    <option>مشروع تحت الإنشاء</option>
                    <option>حلول تمويلية</option>
                    <option>استثمار عقاري</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">رسالتك</label>
                  <textarea name="message" rows={4} className="w-full bg-gray-50 border-0 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none transition-all"></textarea>
                </div>
                <button disabled={loading} className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400">
                  {loading ? 'جاري الإرسال...' : 'إرسال الطلب الآن'}
                  {!loading && <Send size={20} className="rtl-flip" />}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                 <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/20">
                    <CheckCircle2 size={40} />
                 </div>
                 <h2 className="text-3xl font-black mb-4">تم استلام طلبك بنجاح!</h2>
                 <p className="text-gray-500 max-w-sm mx-auto font-light leading-relaxed">شكراً لثقتك بوسم هوم. سيقوم أحد مستشارينا بالتواصل معك قريباً جداً لمناقشة طلبك.</p>
                 <button onClick={() => setSubmitted(false)} className="mt-8 text-black font-black underline uppercase tracking-widest text-xs">إرسال رسالة أخرى</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
