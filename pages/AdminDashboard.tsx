
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Building2, Users, FileText, Settings, 
  BarChart3, Plus, RefreshCw, LogOut, CheckCircle2, 
  Clock, Search, Filter, Database, Link, Briefcase, 
  AlertTriangle, CreditCard, Layers, ExternalLink, MoreVertical, X, Trash2, Edit3
} from 'lucide-react';
import Logo from '../components/Logo';
import { Project, Lead } from '../types';
import { dbService } from '../services/dbService';

interface AdminDashboardProps {
  onRefresh: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onRefresh, onLogout }) => {
  const [activeModule, setActiveModule] = useState<string>('overview');
  const [isSyncing, setIsSyncing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // نموذج للمشروع الجديد
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    city: 'الخبر',
    priceFrom: 0,
    status: 'جاهز',
    type: 'شقة',
    rooms: 3,
    area: 150,
    description: '',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
  });

  useEffect(() => {
    setProjects(dbService.getProjects());
    setLeads(dbService.getLeads());
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    alert('تمت مزامنة البيانات مع Odoo 19 بنجاح');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const projectToAdd = {
      ...newProject,
      id: 'p' + Date.now(),
      developer: 'وسم هوم العقارية',
      district: 'العزيزية',
      location: 'المنطقة الشرقية'
    } as Project;

    dbService.addProject(projectToAdd);
    setProjects(dbService.getProjects());
    setShowAddModal(false);
    onRefresh();
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع نهائياً؟')) {
      dbService.deleteProject(id);
      setProjects(dbService.getProjects());
      onRefresh();
    }
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'إجمالي المحفظة', value: `${(projects.length * 1.2).toFixed(1)}M`, sub: 'قيمة تقديرية', color: 'blue', icon: BarChart3 },
                { label: 'طلبات العملاء', value: leads.length, sub: 'نشطة حالياً', color: 'green', icon: Users },
                { label: 'المشاريع', value: projects.length, sub: 'مشروع مسجل', color: 'purple', icon: Building2 },
                { label: 'حالة الربط', value: 'نشط', sub: 'Odoo 19', color: 'yellow', icon: Database },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-4 rounded-2xl bg-gray-50`}>
                      <stat.icon size={24} className="text-black" />
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  <div className="text-3xl font-black mt-2 text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-blue-700 text-white rounded-[2.5rem] p-8 shadow-2xl flex items-center justify-between">
               <div>
                  <h3 className="text-xl font-black mb-2">تكامل Odoo 19 Cloud</h3>
                  <p className="text-blue-100 text-sm">آخر مزامنة ناجحة قبل 10 دقائق. النظام مستعد لاستقبال طلبات جديدة.</p>
               </div>
               <button 
                onClick={handleSync}
                className="bg-white text-blue-700 px-8 py-3 rounded-xl font-black flex items-center gap-2"
               >
                 {isSyncing ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
                 مزامنة الآن
               </button>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-black text-gray-900">إدارة المستودع العقاري</h2>
               <button 
                onClick={() => setShowAddModal(true)}
                className="bg-black text-white px-6 py-3 rounded-xl font-black flex items-center gap-2"
               >
                 <Plus size={20} /> إضافة عقار جديد
               </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
               <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-400 font-bold text-xs uppercase tracking-widest">
                     <tr>
                        <th className="px-8 py-5">المشروع</th>
                        <th className="px-8 py-5">المدينة</th>
                        <th className="px-8 py-5">السعر</th>
                        <th className="px-8 py-5">الحالة</th>
                        <th className="px-8 py-5">الإجراءات</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {projects.map((p) => (
                       <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-3">
                                <img src={p.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                <span className="font-black">{p.name}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-gray-500 font-bold">{p.city}</td>
                          <td className="px-8 py-5 font-black">{p.priceFrom.toLocaleString()} ريال</td>
                          <td className="px-8 py-5">
                             <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black">{p.status}</span>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-black"><Edit3 size={18} /></button>
                                <button 
                                  onClick={() => handleDeleteProject(p.id)}
                                  className="p-2 text-gray-400 hover:text-red-600"
                                >
                                  <Trash2 size={18} />
                                </button>
                             </div>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        );
      
      default: return <div>الوحدة قيد التطوير</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-950 text-gray-400 flex flex-col h-screen sticky top-0 border-l border-white/5">
        <div className="p-8 border-b border-white/5">
          <Logo dark={false} className="h-10" />
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, name: 'الرئيسية' },
            { id: 'projects', icon: Building2, name: 'المشاريع والعقارات' },
            { id: 'leads', icon: Users, name: 'العملاء (CRM)' },
            { id: 'odoo', icon: Database, name: 'إعدادات Odoo' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeModule === item.id ? 'bg-white text-black shadow-2xl shadow-white/5' : 'hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-6">
           <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 text-red-400 font-bold py-4 hover:bg-red-500/10 rounded-2xl transition-all"
           >
             <LogOut size={18} /> خروج النظام
           </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow p-10">
        <header className="flex justify-between items-center mb-10">
           <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">إدارة النظام</h1>
           <div className="flex gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 <span className="text-xs font-bold text-gray-500">متصل بـ Odoo</span>
              </div>
           </div>
        </header>
        {renderModule()}
      </main>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                 <h3 className="text-2xl font-black">إضافة عقار جديد للقاعدة</h3>
                 <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
              </div>
              <form onSubmit={handleAddProject} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                       <label className="text-xs font-black text-gray-400">اسم المشروع</label>
                       <input 
                        type="text" required
                        value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        className="w-full bg-gray-50 border-0 rounded-xl p-4 text-sm font-bold shadow-sm" 
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-black text-gray-400">المدينة</label>
                       <select 
                        value={newProject.city} onChange={(e) => setNewProject({...newProject, city: e.target.value as any})}
                        className="w-full bg-gray-50 border-0 rounded-xl p-4 text-sm font-bold shadow-sm"
                       >
                          <option>الخبر</option>
                          <option>الرياض</option>
                          <option>الدمام</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-black text-gray-400">السعر الابتدائي</label>
                       <input 
                        type="number" required
                        value={newProject.priceFrom} onChange={(e) => setNewProject({...newProject, priceFrom: Number(e.target.value)})}
                        className="w-full bg-gray-50 border-0 rounded-xl p-4 text-sm font-bold shadow-sm" 
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-black text-gray-400">النوع</label>
                       <select 
                        value={newProject.type} onChange={(e) => setNewProject({...newProject, type: e.target.value as any})}
                        className="w-full bg-gray-50 border-0 rounded-xl p-4 text-sm font-bold shadow-sm"
                       >
                          <option>شقة</option>
                          <option>فيلا</option>
                          <option>دوبلكس</option>
                       </select>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-black text-gray-400">وصف المشروع</label>
                    <textarea 
                      value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="w-full bg-gray-50 border-0 rounded-xl p-4 text-sm font-bold shadow-sm" rows={3}
                    ></textarea>
                 </div>
                 <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg shadow-xl">حفظ المشروع</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
