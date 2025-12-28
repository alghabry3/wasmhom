
import React, { useState } from 'react';
import { Search, Compass, ChevronLeft, ShieldCheck, Heart, BarChart3, Users2, Sparkles } from 'lucide-react';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

interface HomeProps {
  onNavigate: (page: string, id?: string) => void;
  projects: Project[];
}

const Home: React.FC<HomeProps> = ({ onNavigate, projects }) => {
  const [activeTab, setActiveTab] = useState<'residential' | 'investment' | 'budget'>('residential');

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'budget') return p.priceFrom < 800000;
    if (activeTab === 'investment') return (p.roiEstimate || 0) > 6 || p.status === 'استثماري';
    return p.type === 'فيلا' || p.type === 'شقة';
  }).slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Hero background"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-right">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              نساعدك تختار العقار المناسب لك <span className="text-yellow-400">بثقة</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
              في وسم هوم، لا نقدم مجرد جدران، بل نصمم لك أسلوب حياة يلبي تطلعاتك ويؤمن مستقبلك باستشارات عقارية ذكية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate('advisor')}
                className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-2"
              >
                <Compass size={24} />
                ابدأ الاستشارة الذكية
              </button>
              <button 
                onClick={() => onNavigate('projects')}
                className="bg-black/30 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                تصفح المشاريع
                <ChevronLeft className="rtl-flip" size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Quiz */}
      <section className="relative z-20 -mt-16 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">الغرض من العقار</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-black outline-none">
                  <option>سكن عائلي</option>
                  <option>استثمار طويل الأمد</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">المدينة</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-black outline-none">
                  <option>الخبر</option>
                  <option>الرياض</option>
                  <option>الدمام</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">الميزانية</label>
                <select className="w-full bg-gray-50 border-0 rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-black outline-none">
                  <option>أقل من 800 ألف</option>
                  <option>أكثر من 800 ألف</option>
                </select>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('advisor')}
              className="bg-black text-white w-full md:w-auto px-10 py-5 rounded-2xl font-bold whitespace-nowrap hover:bg-gray-800 transition-colors shadow-lg shadow-black/20"
            >
              اعرض التوصيات
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">مشاريعنا المميزة</h2>
            <p className="text-gray-500 max-w-lg font-light">نعرض لكم أحدث ما تم إضافته لقاعدة بياناتنا من فرص عقارية استثنائية.</p>
          </div>
          
          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab('residential')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'residential' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-gray-900'}`}
            >
              للسكن
            </button>
            <button 
              onClick={() => setActiveTab('investment')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'investment' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-gray-900'}`}
            >
              للاستثمار
            </button>
            <button 
              onClick={() => setActiveTab('budget')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'budget' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-gray-900'}`}
            >
              أقل من 800 ألف
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={(id) => onNavigate('projectDetails', id)} 
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 font-bold text-black border-b-2 border-black pb-1 hover:gap-4 transition-all"
          >
            عرض كافة المشاريع
            <ChevronLeft size={20} className="rtl-flip" />
          </button>
        </div>
      </section>

      {/* Why Wasm Home? */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">لماذا وسم هوم؟</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">نحن نربط أحلامكم بالواقع من خلال نظام بيانات عقاري متطور وحلول تقنية مبتكرة.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { icon: <Compass className="text-yellow-400" size={40} />, title: "بيانات حية", desc: "قاعدة بياناتنا يتم تحديثها لحظياً لتعكس واقع السوق المتغير." },
              { icon: <ShieldCheck className="text-yellow-400" size={40} />, title: "أمان المشتري", desc: "نضمن لك شفافية كاملة في كافة العقود والإجراءات القانونية." },
              { icon: <Users2 className="text-yellow-400" size={40} />, title: "إدارة CRM", desc: "نظام متطور لمتابعة طلباتكم وضمان سرعة الاستجابة." },
              { icon: <BarChart3 className="text-yellow-400" size={40} />, title: "تحليل ROI", desc: "أدوات حسابية دقيقة تساعدكم في اتخاذ القرار الاستثماري الأصوب." },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="bg-white/10 p-6 rounded-3xl mb-6 group-hover:bg-white/20 transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
