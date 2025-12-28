
import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ChevronLeft } from 'lucide-react';
import { dbService } from '../services/dbService';
import { BlogPost } from '../types';

interface BlogProps {
  onNavigate: (page: string, id?: string) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPosts(dbService.getBlogPosts());
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700 bg-gray-50 pb-24">
      {/* Header */}
      <section className="bg-white py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">مدونة وسم هوم</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">نشارككم المعرفة والنصائح وأحدث مستجدات السوق العقاري في المملكة.</p>
          
          <div className="mt-12 max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="ابحث عن مقال..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-0 rounded-2xl p-6 pr-14 text-lg focus:ring-2 focus:ring-black transition-all outline-none"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {filteredPosts.map(post => (
              <article 
                key={post.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-6 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-2"><User size={14} /> وسم هوم</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-black transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 mb-8 font-light leading-relaxed line-clamp-3">
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
        ) : (
          <div className="py-20 text-center text-gray-400 font-bold bg-white rounded-[3rem] border border-gray-100">
             لا توجد مقالات تطابق بحثك حالياً
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
         <div className="bg-black text-white p-12 md:p-20 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">اشترك في النشرة البريدية</h2>
            <p className="text-gray-400 mb-10 font-light">احصل على آخر الفرص العقارية والتحليلات السوقية مباشرة في بريدك.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
               <input type="email" placeholder="بريدك الإلكتروني" className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/50" />
               <button className="bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-gray-100 transition-all">اشترك الآن</button>
            </form>
         </div>
      </section>
    </div>
  );
};

export default Blog;
