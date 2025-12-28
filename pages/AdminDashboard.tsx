
import React from 'react';
import { LayoutDashboard, Building2, Users, FileText, Settings, BarChart, Plus, RefreshCw, LogOut } from 'lucide-react';
import Logo from '../components/Logo';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - Odoo Style */}
      <aside className="w-64 bg-gray-900 text-gray-400 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <Logo dark={false} className="h-8" />
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { icon: LayoutDashboard, name: 'نظرة عامة', active: true },
            { icon: Building2, name: 'العقارات والمشاريع', active: false },
            { icon: Users, name: 'العملاء (CRM)', active: false },
            { icon: FileText, name: 'طلبات التمويل', active: false },
            { icon: BarChart, name: 'التقارير المالية', active: false },
            { icon: Settings, name: 'الإعدادات', active: false },
          ].map((item, idx) => (
            <button key={idx} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${item.active ? 'bg-black text-white shadow-lg' : 'hover:bg-gray-800 hover:text-white'}`}>
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
           <button className="flex items-center gap-3 text-red-400 hover:text-red-300 text-sm">
              <LogOut size={18} /> تسجيل الخروج
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900">مرحباً، مدير النظام</h1>
            <p className="text-gray-500 text-sm">إليك ملخص الأداء لليوم</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-500">
              <RefreshCw size={20} />
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-black/20">
              <Plus size={20} /> مشروع جديد
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'إجمالي الوحدات', value: '420', color: 'blue' },
            { label: 'طلبات جديدة', value: '28', color: 'green' },
            { label: 'تحت المراجعة', value: '12', color: 'yellow' },
            { label: 'إجمالي المبيعات', value: '14.2M', color: 'purple' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
               <div className="text-3xl font-black mt-1">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Sync Status Odoo */}
        <div className="bg-blue-900 text-white p-6 rounded-2xl flex items-center justify-between shadow-2xl mb-10">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                 <RefreshCw className="animate-spin" />
              </div>
              <div>
                 <h4 className="font-bold">مزامنة Odoo 19</h4>
                 <p className="text-xs text-blue-200">آخر مزامنة قبل 5 دقائق. جميع البيانات محدثة.</p>
              </div>
           </div>
           <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-bold text-sm">مزامنة يدوية</button>
        </div>

        {/* Recent leads table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-black">آخر طلبات العملاء (CRM)</h3>
              <button className="text-sm font-bold text-gray-400 hover:text-black">عرض الكل</button>
           </div>
           <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 text-gray-400 font-bold uppercase tracking-wider">
                 <tr>
                    <th className="px-6 py-4">العميل</th>
                    <th className="px-6 py-4">العقار المفضل</th>
                    <th className="px-6 py-4">الطلب</th>
                    <th className="px-6 py-4">الحالة</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {[1,2,3].map(i => (
                   <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold">محمد الحربي</td>
                      <td className="px-6 py-4 text-gray-500">مجمع وسم 01</td>
                      <td className="px-6 py-4">شقة سكنية - تمويل بنكي</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">تم التواصل</span>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
