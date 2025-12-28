
import React, { useState } from 'react';
import { Filter, Search, Building2, MapPin, Construction, Gem } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC<{ onNavigate: (p: string, id?: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ready' | 'construction' | 'investment'>('all');

  const filtered = MOCK_PROJECTS.filter(p => {
    if (activeTab === 'ready') return p.status === 'جاهز';
    if (activeTab === 'construction') return p.status === 'على الخارطة';
    // Fix: Corrected comparison from 'استثمار' to 'استثماري' to match Project.status type literal
    if (activeTab === 'investment') return p.status === 'استثماري';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">استكشف مشاريع وسم هوم</h1>
          <p className="text-gray-500 text-lg">نقدم لكم تشكيلة مختارة من أرقى المشاريع العقارية في المنطقة الشرقية والرياض.</p>
        </header>

        {/* Advanced Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 pb-4">
          {[
            { id: 'all', name: 'الكل', icon: Building2 },
            { id: 'ready', name: 'جاهزة للسكن', icon: MapPin },
            { id: 'construction', name: 'تحت الإنشاء (وافي)', icon: Construction },
            { id: 'investment', name: 'فرص استثمارية', icon: Gem },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(p => (
            <div key={p.id} className="relative group">
               {p.status === 'على الخارطة' && (
                 <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                   نسبة الإنجاز {p.progress}%
                 </div>
               )}
               <ProjectCard project={p} onClick={(id) => onNavigate('projectDetails', id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
