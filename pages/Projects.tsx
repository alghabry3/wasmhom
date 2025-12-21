
import React, { useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

interface ProjectsProps {
  onNavigate: (page: string, id?: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [cityFilter, setCityFilter] = useState('الكل');
  const [typeFilter, setTypeFilter] = useState('الكل');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = MOCK_PROJECTS.filter(p => {
    return (cityFilter === 'الكل' || p.city === cityFilter) &&
           (typeFilter === 'الكل' || p.type === typeFilter);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2">استكشف مشاريعنا</h1>
            <p className="text-gray-500">نحن نغطي أهم المدن في المملكة بأفضل المواقع الاستراتيجية.</p>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 bg-white px-6 py-3 rounded-xl border border-gray-200 font-bold"
          >
            <Filter size={20} />
            تصفية
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className={`lg:w-72 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-lg">الفلاتر</h3>
                <button 
                  onClick={() => {setCityFilter('الكل'); setTypeFilter('الكل');}}
                  className="text-xs text-blue-600 font-bold underline"
                >
                  إعادة ضبط
                </button>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">المدينة</label>
                  {['الكل', 'الخبر', 'الرياض', 'الدمام'].map(city => (
                    <button 
                      key={city}
                      onClick={() => setCityFilter(city)}
                      className={`w-full text-right px-4 py-3 rounded-xl text-sm transition-all ${cityFilter === city ? 'bg-black text-white font-bold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">نوع العقار</label>
                  {['الكل', 'شقة', 'فيلا', 'تاون هاوس'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`w-full text-right px-4 py-3 rounded-xl text-sm transition-all ${typeFilter === type ? 'bg-black text-white font-bold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Projects Grid */}
          <main className="flex-grow">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={(id) => onNavigate('projectDetails', id)} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center flex flex-col items-center">
                <Search size={64} className="text-gray-200 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">لم يتم العثور على نتائج</h3>
                <p className="text-gray-500">جرب تغيير الفلاتر للحصول على خيارات أكثر.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Projects;
