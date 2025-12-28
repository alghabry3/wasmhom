
import React, { useState, useMemo } from 'react';
import { Building2, MapPin, Construction, Gem, Filter, X, ChevronDown, Check } from 'lucide-react';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

interface ProjectsProps {
  onNavigate: (p: string, id?: string) => void;
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ onNavigate, projects }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ready' | 'construction' | 'investment'>('all');
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique developers
  const developers = useMemo(() => {
    const devs = projects.map(p => p.developer);
    return Array.from(new Set(devs)).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Status filtering
      const matchesStatus = 
        activeTab === 'all' || 
        (activeTab === 'ready' && p.status === 'جاهز') ||
        (activeTab === 'construction' && p.status === 'على الخارطة') ||
        (activeTab === 'investment' && p.status === 'استثماري');
      
      // Developer filtering
      const matchesDeveloper = 
        selectedDevelopers.length === 0 || 
        selectedDevelopers.includes(p.developer);

      return matchesStatus && matchesDeveloper;
    });
  }, [projects, activeTab, selectedDevelopers]);

  const toggleDeveloper = (dev: string) => {
    setSelectedDevelopers(prev => 
      prev.includes(dev) ? prev.filter(d => d !== dev) : [...prev, dev]
    );
  };

  const clearFilters = () => {
    setSelectedDevelopers([]);
    setActiveTab('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">مشاريع وسم هوم</h1>
            <p className="text-gray-500 text-lg font-light">استعرض أحدث الفرص العقارية المتاحة في قاعدة بياناتنا المحدثة لحظياً.</p>
          </div>
          
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold shadow-sm border border-gray-100"
          >
            <Filter size={18} />
            تصفية النتائج
            {selectedDevelopers.length > 0 && <span className="bg-black text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center">{selectedDevelopers.length}</span>}
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-xl flex items-center gap-2">
                  <Filter size={20} />
                  تصفية
                </h3>
                {(selectedDevelopers.length > 0 || activeTab !== 'all') && (
                  <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-black font-bold">مسح الكل</button>
                )}
              </div>

              {/* Developer Filter */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">المطور العقاري</h4>
                  <div className="space-y-3">
                    {developers.map(dev => (
                      <label key={dev} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            checked={selectedDevelopers.includes(dev)}
                            onChange={() => toggleDeveloper(dev)}
                            className="appearance-none w-5 h-5 rounded-lg border-2 border-gray-200 checked:bg-black checked:border-black transition-all cursor-pointer"
                          />
                          {selectedDevelopers.includes(dev) && <Check size={12} className="absolute text-white" />}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${selectedDevelopers.includes(dev) ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>
                          {dev}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">نتائج البحث</h4>
                  <p className="text-2xl font-black text-black tabular-nums">{filteredProjects.length} <span className="text-sm font-normal text-gray-400">مشروع</span></p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow space-y-8">
            {/* Horizontal Tabs (Sub-filtering by Status) */}
            <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-4">
              {[
                { id: 'all', name: 'الكل', icon: Building2 },
                { id: 'ready', name: 'جاهزة للسكن', icon: MapPin },
                { id: 'construction', name: 'قيد الإنشاء', icon: Construction },
                { id: 'investment', name: 'استثمارية', icon: Gem },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-black text-white shadow-xl' : 'text-gray-500 hover:text-black hover:bg-white'}`}
                >
                  <tab.icon size={18} />
                  {tab.name}
                </button>
              ))}
            </div>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-500">
                {filteredProjects.map(p => (
                  <ProjectCard key={p.id} project={p} onClick={(id) => onNavigate('projectDetails', id)} />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-200 animate-in zoom-in duration-300">
                <Building2 size={64} className="mx-auto text-gray-100 mb-6" />
                <p className="text-2xl font-black text-gray-300">لا توجد مشاريع تطابق خيارات التصفية</p>
                <button onClick={clearFilters} className="mt-6 text-black font-black underline">إعادة تعيين الفلاتر</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden flex justify-end animate-in fade-in duration-300">
          <div className="w-80 bg-white h-full shadow-2xl p-8 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-black text-2xl">تصفية النتائج</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">المطور العقاري</h4>
                <div className="space-y-4">
                  {developers.map(dev => (
                    <label key={dev} className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={selectedDevelopers.includes(dev)}
                          onChange={() => toggleDeveloper(dev)}
                          className="appearance-none w-6 h-6 rounded-lg border-2 border-gray-200 checked:bg-black checked:border-black transition-all cursor-pointer"
                        />
                        {selectedDevelopers.includes(dev) && <Check size={14} className="absolute text-white" />}
                      </div>
                      <span className={`text-lg font-bold transition-colors ${selectedDevelopers.includes(dev) ? 'text-black' : 'text-gray-500'}`}>
                        {dev}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-gray-100">
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all"
                >
                  عرض النتائج ({filteredProjects.length})
                </button>
                <button 
                  onClick={clearFilters}
                  className="w-full mt-4 text-gray-400 font-bold hover:text-black transition-all py-2"
                >
                  مسح كافة الاختيارات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
