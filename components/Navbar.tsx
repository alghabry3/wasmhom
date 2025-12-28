
import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'الرئيسية', id: 'home' },
    { name: 'المشاريع', id: 'projects' },
    { name: 'الحلول التمويلية', id: 'financing' },
    { name: 'اختر لك عقارك', id: 'advisor' },
    { name: 'الاستثمار', id: 'investment' },
    { name: 'المدونة', id: 'blog' },
    { name: 'من نحن', id: 'about' },
    { name: 'تواصل معنا', id: 'contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <Logo className="h-10 md:h-12" />
          </div>

          <div className="hidden lg:flex space-x-reverse space-x-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-bold transition-all px-2 py-1 relative group ${
                  currentPage === item.id ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-300 ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="bg-black text-white px-6 py-3 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <PhoneCall size={16} />
              اتصل بنا
            </a>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-black p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-6 px-6 absolute w-full shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className={`text-right text-lg font-black py-2 ${currentPage === item.id ? 'text-black border-r-4 border-black pr-4' : 'text-gray-500'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
