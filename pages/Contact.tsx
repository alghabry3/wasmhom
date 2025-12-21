
import React from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-950 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">يسعدنا تواصلك</h1>
          <p className="text-xl text-gray-400 font-light">فريقنا جاهز للإجابة على جميع استفساراتك وتقديم المشورة التي تحتاجها.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50 flex items-start gap-6 group hover:-translate-y-1 transition-all">
              <div className="bg-black text-white p-4 rounded-2xl group-hover:bg-gray-800 transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 mb-1">الرقم الموحد</h3>
                <p className="text-gray-500 mb-2">{COMPANY_INFO.phone}</p>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-xs font-bold text-black border-b border-black">اتصل بنا الآن</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50 flex items-start gap-6 group hover:-translate-y-1 transition-all">
              <div className="bg-green-500 text-white p-4 rounded-2xl group-hover:bg-green-600 transition-colors">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 mb-1">واتساب</h3>
                <p className="text-gray-500 mb-2">{COMPANY_INFO.whatsapp}</p>
                <a href={`https://wa.me/${COMPANY_INFO.whatsapp}`} className="text-xs font-bold text-green-600 border-b border-green-600">تحدث مباشرة</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50 flex items-start gap-6 group hover:-translate-y-1 transition-all">
              <div className="bg-black text-white p-4 rounded-2xl group-hover:bg-gray-800 transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 mb-1">مقرنا الرئيسي</h3>
                <p className="text-gray-500 mb-2">{COMPANY_INFO.address}</p>
                <a href="#" className="text-xs font-bold text-black border-b border-black">افتح الخريطة</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-10 md:p-16">
            <h2 className="text-3xl font-black mb-8">أرسل لنا رسالة</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">الاسم الكامل</label>
                  <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl p-5 focus:ring-2 focus:ring-black transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">رقم الجوال</label>
                  <input type="tel" className="w-full bg-gray-50 border-0 rounded-2xl p-5 focus:ring-2 focus:ring-black transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">نوع الطلب</label>
                <select className="w-full bg-gray-50 border-0 rounded-2xl p-5 focus:ring-2 focus:ring-black transition-all">
                  <option>استشارة عقارية</option>
                  <option>طلب عرض سعر لمشروع</option>
                  <option>استثمار عقاري</option>
                  <option>أخرى</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">الرسالة</label>
                <textarea rows={5} className="w-full bg-gray-50 border-0 rounded-2xl p-5 focus:ring-2 focus:ring-black transition-all"></textarea>
              </div>
              <button className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
                إرسال الطلب
                <Send size={20} className="rtl-flip" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
