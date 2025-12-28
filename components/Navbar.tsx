
import React, { useState } from 'react';
import { Menu, X, PhoneCall, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const navItems = [
    { name: 'الرئيسية', id: 'home' },
    { name: 'المشاريع', id: 'projects' },
    { 
      name: 'الحلول التمويلية', 
      id: 'financing',
      sub: [
        { name: 'القروض والرهن', id: 'mortgage' },
        { name: 'حلول التعثر', id: 'distress' },
        { name: 'الدعم السكني', id: 'sakani' }
      ]
    },
    { name: 'اختر لك عقارك', id: 'advisor' },
    { name: 'الاستثمار', id: 'investment' },
    { name: 'المدونة', id: 'blog' },
    { name: 'من نحن', id: 'about' },
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
              <div key={item.id} className="relative group">
                <button
                  onClick={() => !item.sub && onNavigate(item.id)}
                  className={`text-sm font-bold transition-all px-2 py-1 flex items-center gap-1 group ${
                    currentPage === item.id || (item.sub && item.sub.some(s => s.id === currentPage)) ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.name}
                  {item.sub && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                  <span className={`absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-300 ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>

                {item.sub && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-2xl rounded-2xl border border-gray-100 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {item.sub.map(s => (
                      <button
                        key={s.id}
                        onClick={() => onNavigate(s.id)}
                        className={`w-full text-right px-6 py-3 text-sm font-bold hover:bg-gray-50 transition-all ${currentPage === s.id ? 'text-black bg-gray-50' : 'text-gray-500'}`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-6 px-6 absolute w-full shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if(item.sub) setActiveSub(activeSub === item.id ? null : item.id);
                    else { onNavigate(item.id); setIsOpen(false); }
                  }}
                  className={`w-full text-right text-lg font-black py-2 flex justify-between items-center ${currentPage === item.id ? 'text-black' : 'text-gray-500'}`}
                >
                  {item.name}
                  {item.sub && <ChevronDown size={20} className={activeSub === item.id ? 'rotate-180' : ''} />}
                </button>
                {item.sub && activeSub === item.id && (
                  <div className="bg-gray-50 rounded-xl mt-2 p-4 flex flex-col space-y-3">
                    {item.sub.map(s => (
                      <button
                        key={s.id}
                        onClick={() => { onNavigate(s.id); setIsOpen(false); }}
                        className={`text-right text-sm font-bold py-1 ${currentPage === s.id ? 'text-black' : 'text-gray-500'}`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
