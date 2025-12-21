
import React from 'react';
import { MapPin, Building2, Ruler, DollarSign } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
      onClick={() => onClick(project.id)}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <span className="bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
            {project.status}
          </span>
          <span className="bg-white/90 backdrop-blur-md text-black px-3 py-1 rounded-full text-xs font-bold">
            {project.type}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors">
          {project.name}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <MapPin size={14} className="text-gray-400" />
          {project.location}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">{project.rooms} غرف</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">{project.area} م²</span>
          </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">يبدأ السعر من</span>
            <span className="text-xl font-black text-black">
              {project.priceFrom.toLocaleString()} <span className="text-sm font-normal">ريال</span>
            </span>
          </div>
          <button className="bg-gray-50 p-2 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
            <span className="sr-only">التفاصيل</span>
            <svg className="w-6 h-6 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
