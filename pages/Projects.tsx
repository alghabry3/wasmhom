
import React, { useState } from 'react';
import { Building2, MapPin, Construction, Gem } from 'lucide-react';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

interface ProjectsProps {
  onNavigate: (p: string, id?: string) => void;
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ onNavigate, projects }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ready' | 'construction' | 'investment'>('all');

  const filtered = projects.filter(p => {
    if (activeTab === 'ready') return p.status === 'جاهز';
    if (activeTab === 'construction') return p.status === 'على الخارطة';
    if (activeTab === 'investment') return p.status === 'استثماري';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">مشاريع وسم هوم</h1>
          <p className="text-gray-500 text-lg font-light">استعرض أحدث الفرص العقارية المتاحة في قاعدة بياناتنا المحدثة لحظياً.</p>
        </header>

        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 pb-4">
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

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onClick={(id) => onNavigate('projectDetails', id)} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
             <Building2 size={64} className="mx-auto text-gray-200 mb-4" />
             <p className="text-xl font-bold text-gray-400">لا توجد مشاريع تطابق هذا التصنيف حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
