
import React from 'react';
import { Search, Calendar, User, ArrowLeft, ChevronLeft } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../constants';

interface BlogProps {
  onNavigate: (page: string, id?: string) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700 bg-gray-50 pb-24">
      {/* Header */}
      <section className="bg-white py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">مدونة وسم هوم</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">نشارككم المعرفة والنصائح وأحدث مستجدات السوق العقاري في المملكة.</p>
          
          <div className="mt-12 max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="ابحث عن مقال..." 
              className="w-full bg-gray-50 border-0 rounded-2xl p-5 pr-14 text-lg focus:ring-2 focus:ring-black transition-all"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {MOCK_BLOG_POSTS.map(post => (
            <article 
              key={post.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">
                   <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                   <span className="flex items-center gap-1"><User size={14} /> وسم هوم</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-black transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-500 mb-8 font-light leading-relaxed">
                  {post.summary}
                </p>
                <button 
                   className="mt-auto flex items-center gap-2 font-black text-black group-hover:gap-4 transition-all"
                   onClick={() => onNavigate('blogPost', post.id)}
                >
                  اقرأ المزيد
                  <ChevronLeft size={20} className="rtl-flip" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
         <div className="bg-black text-white p-12 md:p-20 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                  <circle cx="0" cy="0" r="20" />
                  <circle cx="100" cy="100" r="30" />
               </svg>
            </div>
            <h2 className="text-3xl font-black mb-6">لا تفوت أي جديد</h2>
            <p className="text-gray-400 mb-10 font-light">اشترك في نشرتنا البريدية لتصلك أحدث المقالات والفرص العقارية الحصرية.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
               <input type="email" placeholder="بريدك الإلكتروني" className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/50" />
               <button className="bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all">اشترك الآن</button>
            </form>
         </div>
      </section>
    </div>
  );
};

export default Blog;
