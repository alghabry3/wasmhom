
import React from 'react';
import { COMPANY_INFO } from '../constants';
import { Facebook, Twitter, Instagram, Linkedin, ArrowLeft } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Logo dark={false} className="h-12" />
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              وجهتكم الموثوقة للتملك العقاري الذكي في المملكة العربية السعودية. نسعى لتطوير السوق العقاري من خلال الشفافية والابتكار وتقديم الحلول السكنية التي تناسب احتياجات المجتمع.
            </p>
            <div className="flex gap-4">
               {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                 <a key={i} href="#" className="bg-white/5 p-3 rounded-xl hover:bg-white text-black transition-all">
                    <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              روابط سريعة
              <span className="absolute bottom-[-10px] right-0 w-10 h-1 bg-white"></span>
            </h3>
            <ul className="space-y-4 text-gray-400">
              {[
                { name: 'الرئيسية', id: 'home' },
                { name: 'المشاريع', id: 'projects' },
                { name: 'الاستثمار العقاري', id: 'investment' },
                { name: 'من نحن', id: 'about' },
                { name: 'تواصل معنا', id: 'contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white transition-colors flex items-center gap-2 group text-sm"
                  >
                    <ArrowLeft size={12} className="opacity-0 group-hover:opacity-100 transition-all rtl-flip" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              السياسات
              <span className="absolute bottom-[-10px] right-0 w-10 h-1 bg-white"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {['سياسة الخصوصية', 'الشروط والأحكام', 'إخلاء المسؤولية', 'حقوق الملكية'].map((link, idx) => (
                <li key={idx}>
                  <button className="hover:text-white transition-colors">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-8 relative inline-block">
              معلومات التواصل
              <span className="absolute bottom-[-10px] right-0 w-10 h-1 bg-white"></span>
            </h3>
            <ul className="space-y-6 text-gray-400 text-sm">
              <li className="flex gap-4">
                <span className="text-white font-bold whitespace-nowrap">الموقع:</span>
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex gap-4">
                <span className="text-white font-bold whitespace-nowrap">الهاتف:</span>
                <span dir="ltr">{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex gap-4">
                <span className="text-white font-bold whitespace-nowrap">البريد:</span>
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center text-gray-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} شركة وسم هوم العقارية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">تصميم وتنفيذ وسم هوم</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
