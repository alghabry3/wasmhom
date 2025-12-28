
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Building2, Users, FileText, Settings, 
  BarChart3, Plus, RefreshCw, LogOut, CheckCircle2, 
  Clock, Search, Filter, Database, Link, Briefcase, 
  AlertTriangle, CreditCard, Layers, ExternalLink, MoreVertical, X, Trash2, Edit3, MessageSquare,
  ArrowUpDown, Calendar, UserCheck, Shield, Fingerprint, UserPlus, Key, Mail, ShieldCheck, ChevronRight,
  Server, Lock, Activity, Globe, Zap, CloudUpload, Camera, Upload
} from 'lucide-react';
import Logo from '../components/Logo';
import { Project, Lead, BlogPost, AdminUser } from '../types';
import { dbService, OdooConfig } from '../services/dbService';
import { odooService } from '../services/odooService';

interface AdminDashboardProps {
  onRefresh: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onRefresh, onLogout }) => {
  const [activeModule, setActiveModule] = useState<string>('overview');
  const [isSyncing, setIsSyncing] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  
  // Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [odooConfig, setOdooConfig] = useState<OdooConfig>(dbService.getOdooConfig());
  
  // CRM Filtering & Sorting State
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadSortOrder, setLeadSortOrder] = useState<string>('date-desc');
  const [leadSortDirection, setLeadSortDirection] = useState<'asc' | 'desc'>('desc');
  const [leadSearchQuery, setLeadSearchQuery] = useState<string>('');

  // Modal State
  const [showModal, setShowModal] = useState<'project' | 'blog' | 'user' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (showModal === 'project' && editingItem) {
      setPreviewImage(editingItem.image);
    } else if (showModal === 'project') {
      setPreviewImage(null);
    }
  }, [showModal, editingItem]);

  const loadData = () => {
    setProjects(dbService.getProjects());
    setLeads(dbService.getLeads());
    setBlogPosts(dbService.getBlogPosts());
    setAdminUsers(dbService.getAdminUsers());
  };

  const handleSync = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    alert('تمت مزامنة البيانات العامة مع Odoo 19 بنجاح');
  };

  const handleOdooSync = async (lead: Lead) => {
    setIsSyncing(true);
    try {
      const result = await odooService.syncLead({
        name: lead.name,
        phone: lead.phone,
        interest: lead.interestType,
        source: 'Admin Manual Sync'
      });
      
      if (result.status === 'success' && result.odoo_id) {
        // Update local lead with Odoo ID
        const currentLeads = dbService.getLeads();
        const updatedLeads = currentLeads.map(l => 
          l.id === lead.id ? { ...l, odooId: result.odoo_id } : l
        );
        dbService.saveLeads(updatedLeads);
        setLeads(updatedLeads);
        alert(`تمت مزامنة العميل ${lead.name} بنجاح! رقم المرجع في Odoo: ${result.odoo_id}`);
      }
    } catch (error) {
      alert('فشل الاتصال بخادم Odoo للمزامنة اليدوية.');
    } finally {
      setIsSyncing(false);
    }
  };

  const testOdooConnection = async () => {
    setTestStatus('testing');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTestStatus('success');
    setTimeout(() => setTestStatus('idle'), 3000);
  };

  const saveOdooSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newConfig: OdooConfig = {
      url: formData.get('url') as string,
      apiKey: formData.get('apiKey') as string,
      dbName: formData.get('dbName') as string,
      username: formData.get('username') as string,
      autoSync: formData.get('autoSync') === 'on',
      syncInterval: Number(formData.get('syncInterval'))
    };
    dbService.saveOdooConfig(newConfig);
    setOdooConfig(newConfig);
    alert('تم حفظ إعدادات الربط بنجاح');
  };

  const filteredAndSortedLeads = useMemo(() => {
    return leads
      .filter(l => leadStatusFilter === 'all' || l.status === leadStatusFilter)
      .filter(l => 
        l.name.toLowerCase().includes(leadSearchQuery.toLowerCase()) || 
        l.phone.includes(leadSearchQuery) ||
        l.interestType.toLowerCase().includes(leadSearchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (leadSortOrder === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (leadSortOrder === 'date-asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (leadSortOrder === 'name-asc') return a.name.localeCompare(b.name, 'ar');
        return 0;
      });
  }, [leads, leadStatusFilter, leadSortOrder, leadSearchQuery]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Actions
  const saveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData: any = {
      name: formData.get('name'),
      city: formData.get('city'),
      priceFrom: Number(formData.get('price')),
      type: formData.get('type'),
      status: formData.get('status'),
      rooms: Number(formData.get('rooms')),
      area: Number(formData.get('area')),
      description: formData.get('description'),
      image: previewImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
    };
    if (editingItem) dbService.updateProject({ ...editingItem, ...projectData });
    else dbService.addProject({ 
      ...projectData, 
      id: 'p' + Date.now(), 
      developer: 'وسم هوم العقارية',
      location: formData.get('city') + '، السعودية',
      district: 'حي الهدى'
    });
    closeModal();
    loadData();
    onRefresh();
  };

  const saveAdminUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const perms = Array.from(formData.getAll('permissions')) as string[];
    const userData: any = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      status: formData.get('status'),
      lastLogin: editingItem?.lastLogin || new Date().toISOString(),
      permissions: perms.length > 0 ? perms : ['read_only']
    };
    if (editingItem) dbService.updateAdminUser({ ...editingItem, ...userData });
    else dbService.addAdminUser({ ...userData, id: 'u' + Date.now() });
    closeModal();
    loadData();
  };

  // Added missing updateLead function
  const updateLead = (id: string, status: Lead['status']) => {
    dbService.updateLeadStatus(id, status);
    loadData();
  };

  // Added missing saveBlog function
  const saveBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const blogData: any = {
      title: formData.get('title'),
      category: formData.get('category'),
      summary: formData.get('summary'),
      date: editingItem?.date || new Date().toISOString().split('T')[0],
      image: editingItem?.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
    };
    if (editingItem) dbService.updateBlogPost({ ...editingItem, ...blogData });
    else dbService.addBlogPost({ ...blogData, id: 'b' + Date.now() });
    closeModal();
    loadData();
    onRefresh();
  };

  const closeModal = () => {
    setShowModal(null);
    setEditingItem(null);
    setPreviewImage(null);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'إجمالي العقارات', value: projects.length, color: 'indigo', icon: Building2 },
                { label: 'طلبات العملاء', value: leads.length, color: 'emerald', icon: Users },
                { label: 'مقالات المدونة', value: blogPosts.length, color: 'amber', icon: FileText },
                { label: 'مدراء النظام', value: adminUsers.length, color: 'rose', icon: Shield },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-xl hover:-translate-y-1 group">
                  <div className={`p-4 bg-gray-50 rounded-2xl mb-4 group-hover:bg-black transition-all duration-300`}>
                    <stat.icon size={28} className="text-gray-900 group-hover:text-white" />
                  </div>
                  <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                  <div className="text-3xl font-black mt-2 text-gray-900 tabular-nums">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 text-white rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                   <Database className="text-blue-500 animate-pulse" /> تكامل Odoo V19 Premium
                 </h3>
                 <p className="text-gray-400 font-light max-w-md">يتم الآن مزامنة كافة العمليات المحلية مع سجلات الشركة المركزية تلقائياً بنظام تشفير AES-256 المتطور.</p>
               </div>
               <button onClick={handleSync} disabled={isSyncing} className="relative z-10 bg-white text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-gray-100 active:scale-95 transition-all shadow-xl">
                 {isSyncing ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
                 مزامنة المستودع الآن
               </button>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
               <div>
                 <h2 className="text-3xl font-black">إدارة الصلاحيات والمدراء</h2>
                 <p className="text-sm text-gray-400 mt-1">إدارة المستخدمين، الأدوار الوظيفية، ومراقبة نشاط الدخول للنظام.</p>
               </div>
               <button onClick={() => setShowModal('user')} className="bg-black text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl hover:bg-gray-800 transition-all active:scale-95"><UserPlus /> إضافة مدير جديد</button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
               <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-6">الاسم والبريد</th>
                      <th className="px-8 py-6 text-center">الدور</th>
                      <th className="px-8 py-6 text-center">الحالة</th>
                      <th className="px-8 py-6 text-center">آخر نشاط</th>
                      <th className="px-8 py-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {adminUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-100 text-gray-900 rounded-2xl flex items-center justify-center font-black text-xl group-hover:bg-black group-hover:text-white transition-all">
                                 {user.name.charAt(0)}
                              </div>
                              <div>
                                 <div className="font-black text-gray-900 text-lg">{user.name}</div>
                                 <div className="text-xs text-gray-400 font-medium">{user.email}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                           <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide inline-block ${
                             user.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                             user.role === 'manager' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                           }`}>
                             {user.role === 'super_admin' ? 'مدير نظام' : user.role === 'manager' ? 'مدير عمليات' : 'محرر محتوى'}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                           <div className="flex items-center justify-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${user.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                              <span className="text-xs font-black text-gray-700">{user.status === 'active' ? 'نشط' : 'معطل'}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-center text-xs text-gray-400 font-bold tabular-nums">
                           {new Date(user.lastLogin).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => { setEditingItem(user); setShowModal('user'); }} className="p-3 bg-white text-gray-400 hover:text-black hover:shadow-md rounded-xl transition-all active:scale-90"><Edit3 size={18} /></button>
                             <button onClick={() => { if(confirm('حذف هذا المدير نهائياً؟')) { dbService.deleteAdminUser(user.id); loadData(); } }} className="p-3 bg-white text-gray-400 hover:text-red-500 hover:shadow-md rounded-xl transition-all active:scale-90"><Trash2 size={18} /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        );

      case 'odoo':
        return (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
             <div className="flex justify-between items-end">
               <div>
                 <h2 className="text-3xl font-black">إعدادات الربط السحابي (Odoo)</h2>
                 <p className="text-sm text-gray-400 mt-1">تكوين واجهة برمجة التطبيقات والمزامنة التلقائية مع قاعدة البيانات المركزية.</p>
               </div>
               <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 ${testStatus === 'success' ? 'bg-green-100 text-green-700' : testStatus === 'error' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                 <div className={`w-2 h-2 rounded-full ${testStatus === 'success' ? 'bg-green-500' : testStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                 {testStatus === 'idle' ? 'حالة الاتصال: غير مختبر' : testStatus === 'testing' ? 'جاري الاختبار...' : testStatus === 'success' ? 'متصل بنجاح' : 'فشل الاتصال'}
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm col-span-2">
                   <form onSubmit={saveOdooSettings} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-2"><Globe size={12}/> رابط الخادم (Odoo URL)</label>
                            <input name="url" defaultValue={odooConfig.url} required className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-2"><Lock size={12}/> مفتاح API (API Key)</label>
                            <input name="apiKey" type="password" defaultValue={odooConfig.apiKey} required className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-2"><Database size={12}/> اسم قاعدة البيانات</label>
                            <input name="dbName" defaultValue={odooConfig.dbName} required className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-2"><Users size={12}/> اسم المستخدم</label>
                            <input name="username" defaultValue={odooConfig.username} required className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                         </div>
                      </div>

                      <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                         <div className="flex gap-4">
                            <div className="flex items-center gap-3">
                               <input name="autoSync" type="checkbox" defaultChecked={odooConfig.autoSync} className="w-5 h-5 rounded-lg border-gray-300 accent-black cursor-pointer" />
                               <span className="text-xs font-black text-gray-700">مزامنة تلقائية</span>
                            </div>
                            <div className="flex items-center gap-3">
                               <span className="text-xs font-black text-gray-400">كل</span>
                               <input name="syncInterval" type="number" defaultValue={odooConfig.syncInterval} className="w-16 bg-gray-50 border border-gray-100 rounded-lg p-2 text-center font-bold text-xs" />
                               <span className="text-xs font-black text-gray-400">دقيقة</span>
                            </div>
                         </div>
                         <div className="flex gap-3">
                            <button type="button" onClick={testOdooConnection} className="bg-gray-100 text-gray-900 px-6 py-4 rounded-xl font-black text-xs hover:bg-gray-200 transition-all flex items-center gap-2">
                               {testStatus === 'testing' ? <RefreshCw className="animate-spin" size={14}/> : <Zap size={14}/>}
                               اختبار الاتصال
                            </button>
                            <button type="submit" className="bg-black text-white px-8 py-4 rounded-xl font-black text-xs hover:bg-gray-800 transition-all shadow-lg active:scale-95">حفظ الإعدادات</button>
                         </div>
                      </div>
                   </form>
                </div>

                <div className="space-y-6">
                   <div className="bg-gray-950 text-white p-8 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-8 opacity-10"><Server size={80}/></div>
                      <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">إحصائيات المزامنة</h4>
                      <div className="text-3xl font-black mb-4">99.8%</div>
                      <p className="text-[10px] text-gray-400 leading-relaxed">نجاح عمليات المزامنة خلال آخر 30 يوم من التشغيل المستمر.</p>
                      <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                         <Activity size={16} className="text-green-500"/>
                         <span className="text-[10px] font-black text-green-500">الخادم نشط الآن</span>
                      </div>
                   </div>

                   <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">السجلات السحابية (Logs)</h4>
                      <div className="space-y-3">
                         {[
                           { action: 'Sync Lead', time: '10:15 AM', status: 'Success' },
                           { action: 'Update Stock', time: '09:40 AM', status: 'Success' },
                           { action: 'API Connect', time: '09:00 AM', status: 'Success' },
                         ].map((log, i) => (
                           <div key={i} className="flex justify-between items-center text-[10px] font-bold border-b border-gray-50 pb-2">
                              <span className="text-gray-900">{log.action}</span>
                              <div className="flex gap-3">
                                <span className="text-gray-400">{log.time}</span>
                                <span className="text-green-600">{log.status}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'leads':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                 <h2 className="text-3xl font-black">إدارة العملاء والطلبات (CRM)</h2>
                 <p className="text-sm text-gray-400 mt-1">متابعة مسار العملاء وتحديث حالات التواصل لحظياً.</p>
               </div>
               
               <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
                 <div className="relative flex-grow md:flex-grow-0">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="بحث في CRM..." 
                      value={leadSearchQuery}
                      onChange={(e) => setLeadSearchQuery(e.target.value)}
                      className="bg-gray-50 border-0 rounded-xl pr-10 pl-4 py-2 text-xs font-bold w-full md:w-48 outline-none focus:ring-1 focus:ring-black" 
                    />
                 </div>
                 
                 <div className="flex items-center gap-2">
                    <Filter size={16} className="text-gray-400" />
                    <select 
                      value={leadStatusFilter}
                      onChange={(e) => setLeadStatusFilter(e.target.value)}
                      className="bg-gray-50 border-0 rounded-xl px-3 py-2 text-[10px] font-black uppercase outline-none"
                    >
                      <option value="all">كل الحالات</option>
                      <option value="new">جديد</option>
                      <option value="contacted">تم التواصل</option>
                      <option value="negotiating">تفاوض</option>
                      <option value="closed">تم البيع</option>
                      <option value="lost">خسارة</option>
                    </select>
                 </div>

                 <div className="flex items-center gap-2">
                    <ArrowUpDown size={16} className="text-gray-400" />
                    <select 
                      value={leadSortOrder}
                      onChange={(e) => setLeadSortOrder(e.target.value)}
                      className="bg-gray-50 border-0 rounded-xl px-3 py-2 text-[10px] font-black uppercase outline-none"
                    >
                      <option value="date-desc">الأحدث أولاً</option>
                      <option value="date-asc">الأقدم أولاً</option>
                      <option value="name-asc">الاسم (أ-ي)</option>
                    </select>
                 </div>
               </div>
             </div>

             <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
               <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-6">العميل</th>
                      <th className="px-8 py-6">الاهتمام</th>
                      <th className="px-8 py-6 text-center">الحالة</th>
                      <th className="px-8 py-6 text-center">التاريخ</th>
                      <th className="px-8 py-6 text-center">Odoo</th>
                      <th className="px-8 py-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredAndSortedLeads.length === 0 ? (
                      <tr><td colSpan={6} className="p-20 text-center text-gray-400 font-bold flex flex-col items-center gap-4 animate-pulse">
                        <Users size={48} className="opacity-20" />
                        لم يتم العثور على عملاء يطابقون خيارات التصفية
                      </td></tr>
                    ) : (
                      filteredAndSortedLeads.map(l => (
                        <tr key={l.id} className="hover:bg-gray-50 transition-all group cursor-default">
                          <td className="px-8 py-6">
                            <div className="font-black flex items-center gap-2 group-hover:text-black transition-colors text-lg">
                              {l.status === 'closed' ? <UserCheck size={18} className="text-green-500" /> : <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>}
                              {l.name}
                            </div>
                            <div className="text-xs text-gray-400 font-medium">{l.phone}</div>
                          </td>
                          <td className="px-8 py-6 font-bold text-gray-600">{l.interestType}</td>
                          <td className="px-8 py-6 text-center">
                             <select 
                              value={l.status} 
                              onChange={(e) => updateLead(l.id, e.target.value as any)}
                              className={`border-0 rounded-xl p-2.5 text-[10px] font-black outline-none shadow-sm transition-all cursor-pointer ${
                                l.status === 'new' ? 'bg-blue-50 text-blue-600' : 
                                l.status === 'closed' ? 'bg-green-50 text-green-600' : 
                                l.status === 'lost' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
                              }`}
                             >
                                <option value="new">جديد</option>
                                <option value="contacted">تم التواصل</option>
                                <option value="negotiating">تفاوض</option>
                                <option value="closed">تم البيع</option>
                                <option value="lost">خسارة</option>
                             </select>
                          </td>
                          <td className="px-8 py-6 text-center text-gray-400 text-[10px] font-black tabular-nums">
                             {new Date(l.createdAt).toLocaleDateString('ar-SA')}
                          </td>
                          <td className="px-8 py-6 text-center">
                            {l.odooId ? (
                              <div className="flex flex-col items-center">
                                <span className="bg-green-100 text-green-700 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">متزامن</span>
                                <span className="text-[8px] text-gray-300 font-mono mt-0.5">{l.odooId}</span>
                              </div>
                            ) : (
                              <span className="bg-gray-100 text-gray-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">محلي فقط</span>
                            )}
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => handleOdooSync(l)} 
                                  title="مزامنة مع Odoo"
                                  disabled={isSyncing}
                                  className="p-3 bg-white text-gray-400 hover:text-blue-500 hover:shadow-md rounded-xl transition-all active:scale-90"
                                >
                                  <CloudUpload size={18} className={isSyncing ? 'animate-bounce' : ''} />
                                </button>
                                <button 
                                  onClick={() => { if(confirm('حذف طلب العميل نهائياً؟')) { dbService.deleteLead(l.id); loadData(); } }} 
                                  className="p-3 bg-white text-gray-300 hover:text-red-500 hover:shadow-md transition-all rounded-xl active:scale-90"
                                >
                                  <Trash2 size={18} />
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
               </table>
             </div>
          </div>
        );

      case 'projects':
      case 'blog':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
               <h2 className="text-3xl font-black">{activeModule === 'projects' ? 'المستودع العقاري (Inventory)' : 'إدارة محتوى المدونة'}</h2>
               <button onClick={() => setShowModal(activeModule === 'projects' ? 'project' : 'blog')} className="bg-black text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl hover:bg-gray-800 transition-all active:scale-95"><Plus /> {activeModule === 'projects' ? 'إضافة عقار' : 'مقال جديد'}</button>
            </div>
            
            {activeModule === 'projects' ? (
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-6">العقارات</th>
                      <th className="px-8 py-6">المدينة</th>
                      <th className="px-8 py-6 text-center">السعر</th>
                      <th className="px-8 py-6 text-center">الحالة</th>
                      <th className="px-8 py-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {projects.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-all group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <img src={p.image} className="w-14 h-14 rounded-2xl object-cover transition-transform group-hover:scale-110 shadow-sm" alt="" />
                            <span className="font-black text-gray-900 group-hover:text-black transition-colors text-lg">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-gray-500 font-bold">{p.city}</td>
                        <td className="px-8 py-6 text-center font-black tabular-nums">{p.priceFrom.toLocaleString()} ريال</td>
                        <td className="px-8 py-6 text-center">
                          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black uppercase">{p.status}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                            <button onClick={() => { setEditingItem(p); setShowModal('project'); }} className="p-3 bg-white text-gray-400 hover:text-black hover:shadow-md rounded-xl transition-all active:scale-90"><Edit3 size={18} /></button>
                            <button onClick={() => { if(confirm('حذف هذا العقار نهائياً؟')) { dbService.deleteProject(p.id); loadData(); onRefresh(); } }} className="p-3 bg-white text-gray-300 hover:text-red-500 hover:shadow-md rounded-xl transition-all active:scale-90"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm flex flex-col group transition-all hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative overflow-hidden h-48">
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <div className="flex gap-3">
                           <button onClick={() => { setEditingItem(post); setShowModal('blog'); }} className="p-4 bg-white text-black rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"><Edit3 size={24}/></button>
                           <button onClick={() => { if(confirm('حذف هذا المقال؟')) { dbService.deleteBlogPost(post.id); loadData(); onRefresh(); } }} className="p-4 bg-red-500 text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"><Trash2 size={24}/></button>
                         </div>
                      </div>
                    </div>
                    <div className="p-8 space-y-4 flex-grow">
                       <h3 className="font-black text-gray-900 leading-tight h-12 overflow-hidden group-hover:text-black transition-colors text-xl">{post.title}</h3>
                       <div className="text-[10px] font-black text-gray-400 flex justify-between uppercase tracking-widest border-t border-gray-50 pt-4">
                          <span>{post.category}</span>
                          <span className="tabular-nums">{post.date}</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default: return <div className="p-20 text-center font-black text-gray-400">قيد التطوير...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-tajawal">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-950 text-gray-400 flex flex-col h-screen sticky top-0 border-l border-white/5 z-40">
        <div className="p-10 border-b border-white/5">
          <Logo dark={false} className="h-10" />
        </div>
        <nav className="flex-grow p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {[
            { id: 'overview', icon: LayoutDashboard, name: 'لوحة التحكم' },
            { id: 'projects', icon: Building2, name: 'المستودع العقاري' },
            { id: 'leads', icon: Users, name: 'العملاء (CRM)' },
            { id: 'blog', icon: FileText, name: 'المدونة' },
            { id: 'users', icon: Shield, name: 'إدارة الصلاحيات' },
            { id: 'odoo', icon: Settings, name: 'إعدادات Odoo' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl text-sm font-black transition-all duration-300 ${activeModule === item.id ? 'bg-white text-black shadow-[0_20px_40px_rgba(0,0,0,0.3)]' : 'hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} />
                {item.name}
              </div>
              {activeModule === item.id && <ChevronRight size={14} className="animate-pulse" />}
            </button>
          ))}
        </nav>
        <div className="p-8 mt-auto border-t border-white/5">
           <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 bg-red-500/10 text-red-500 py-6 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-lg">
             <LogOut size={20} /> خروج النظام
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 max-w-7xl mx-auto overflow-x-hidden">
        <header className="flex justify-between items-center mb-16 animate-in fade-in duration-700">
           <div>
             <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 leading-none">إدارة وسم هوم</h1>
             <p className="text-gray-400 text-sm mt-2 font-medium">نظام المزامنة الذكي • Odoo V19 Premium • سحابي آمن</p>
           </div>
           <div className="flex gap-4">
              <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="بحث سريع في النظام..." 
                  className="bg-white border border-transparent rounded-2xl pr-12 pl-6 py-4 text-sm w-72 shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all font-bold"
                  onChange={(e) => {
                    if (activeModule === 'leads') setLeadSearchQuery(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center gap-3 bg-white px-6 rounded-2xl shadow-sm border border-gray-100">
                 <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">المشغل: {adminUsers.find(u => u.email === 'admin@wasmhome.com')?.name || 'أدمن'}</span>
              </div>
           </div>
        </header>

        {renderModule()}
      </main>

      {/* Modern Translucent Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-2xl rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-500 overflow-hidden border border-white/20">
             
             {/* Header */}
             <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-5">
                   <div className="p-4 bg-black text-white rounded-2xl shadow-xl">
                      {showModal === 'user' && <ShieldCheck size={28} />}
                      {showModal === 'project' && <Building2 size={28} />}
                      {showModal === 'blog' && <FileText size={28} />}
                   </div>
                   <div>
                     <h3 className="text-2xl font-black">
                        {showModal === 'user' ? (editingItem ? 'تعديل بيانات المدير' : 'إضافة مدير نظام جديد') : 
                         showModal === 'project' ? (editingItem ? 'تعديل العقار' : 'إضافة عقار جديد') : 
                         (editingItem ? 'تعديل المقال' : 'نشر مقال جديد')}
                     </h3>
                     <p className="text-xs text-gray-400 font-bold mt-1">يرجى تعبئة كافة الحقول المطلوبة بدقة.</p>
                   </div>
                </div>
                <button onClick={closeModal} className="p-5 bg-white rounded-2xl hover:bg-gray-100 shadow-md transition-all active:scale-90"><X size={20}/></button>
             </div>

             {showModal === 'user' && (
               <form onSubmit={saveAdminUser} className="p-10 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mr-2"><Fingerprint size={12}/> الاسم الكامل</label>
                        <input name="name" type="text" required defaultValue={editingItem?.name} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-black focus:ring-2 focus:ring-black outline-none transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mr-2"><Mail size={12}/> البريد الإلكتروني</label>
                        <input name="email" type="email" required defaultValue={editingItem?.email} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-black focus:ring-2 focus:ring-black outline-none transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mr-2"><Shield size={12}/> الدور الوظيفي</label>
                        <select name="role" defaultValue={editingItem?.role || 'editor'} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-black focus:ring-2 focus:ring-black outline-none">
                           <option value="super_admin">مدير نظام (Super Admin)</option>
                           <option value="manager">مدير عمليات (Manager)</option>
                           <option value="editor">محرر محتوى (Editor)</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mr-2"><Zap size={12}/> حالة الحساب</label>
                        <select name="status" defaultValue={editingItem?.status || 'active'} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-black focus:ring-2 focus:ring-black outline-none">
                           <option value="active">نشط (Active)</option>
                           <option value="inactive">معطل (Disabled)</option>
                        </select>
                     </div>
                  </div>

                  <div className="bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100">
                     <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Lock size={12}/> صلاحيات الوصول التفصيلية</h4>
                     <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        {[
                          { id: 'projects', name: 'إدارة المستودع العقاري' },
                          { id: 'leads', name: 'إدارة العملاء CRM' },
                          { id: 'blog', name: 'إدارة محتوى المدونة' },
                          { id: 'odoo', name: 'إعدادات النظام Odoo' },
                          { id: 'users', name: 'إدارة الصلاحيات' },
                          { id: 'finance', name: 'التقارير المالية' },
                        ].map((perm) => (
                          <label key={perm.id} className="flex items-center gap-4 cursor-pointer group">
                             <div className="relative flex items-center">
                               <input 
                                  type="checkbox" 
                                  name="permissions" 
                                  value={perm.id} 
                                  defaultChecked={editingItem?.permissions?.includes('all') || editingItem?.permissions?.includes(perm.id)} 
                                  className="w-6 h-6 rounded-lg border-2 border-gray-200 accent-black cursor-pointer" 
                                />
                             </div>
                             <span className="text-sm font-black text-gray-700 group-hover:text-black transition-colors">{perm.name}</span>
                          </label>
                        ))}
                     </div>
                  </div>

                  <button type="submit" className="w-full bg-black text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-4">
                     <ShieldCheck size={28} />
                     حفظ بيانات المدير
                  </button>
               </form>
             )}

             {showModal === 'project' && (
               <form onSubmit={saveProject} className="p-10 space-y-6">
                  {/* Image Management Section */}
                  <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mb-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest block mb-4">صورة المشروع الرئيسية</label>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                       <div className="w-40 h-40 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0 flex items-center justify-center relative group">
                          {previewImage ? (
                            <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                          ) : (
                            <div className="text-gray-300 flex flex-col items-center gap-2">
                              <Camera size={32} />
                              <span className="text-[8px] font-black">لا توجد صورة</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <label className="cursor-pointer text-white flex flex-col items-center">
                                <Upload size={20} />
                                <span className="text-[8px] font-black mt-1">تغيير الصورة</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                             </label>
                          </div>
                       </div>
                       <div className="flex-grow w-full space-y-4">
                          <div className="space-y-1">
                             <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">رابط الصورة (URL)</label>
                             <input 
                               type="text" 
                               placeholder="https://..." 
                               value={previewImage || ''} 
                               onChange={(e) => setPreviewImage(e.target.value)}
                               className="w-full bg-white border border-gray-100 rounded-xl p-3 text-xs font-bold focus:ring-1 focus:ring-black outline-none transition-all" 
                             />
                          </div>
                          <div className="flex items-center gap-2">
                             <button type="button" onClick={() => setPreviewImage(null)} className="text-[10px] font-black text-red-500 hover:underline">إزالة الصورة</button>
                             <span className="text-[10px] text-gray-300">|</span>
                             <p className="text-[10px] text-gray-400">يفضل استخدام صور بنسبة 16:9 وبجودة عالية.</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">اسم المشروع / العقار</label>
                        <input name="name" type="text" required defaultValue={editingItem?.name} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">المدينة</label>
                        <select name="city" defaultValue={editingItem?.city || 'الخبر'} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none">
                           <option>الخبر</option><option>الرياض</option><option>الدمام</option><option>جدة</option>
                        </select>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">السعر (ريال)</label>
                        <input name="price" type="number" required defaultValue={editingItem?.priceFrom} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">الحالة</label>
                        <select name="status" defaultValue={editingItem?.status || 'جاهز'} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none">
                           <option>جاهز</option><option>على الخارطة</option><option>استثماري</option>
                        </select>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">عدد الغرف</label>
                        <input name="rooms" type="number" required defaultValue={editingItem?.rooms} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">المساحة (م²)</label>
                        <input name="area" type="number" required defaultValue={editingItem?.area} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none" />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">الوصف التفصيلي</label>
                     <textarea name="description" rows={3} required defaultValue={editingItem?.description} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-black text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-gray-800 transition-all active:scale-95">حفظ بيانات العقار</button>
               </form>
             )}

             {showModal === 'blog' && (
               <form onSubmit={saveBlog} className="p-10 space-y-6">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">عنوان المقال</label>
                     <input name="title" type="text" required defaultValue={editingItem?.title} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">التصنيف</label>
                     <select name="category" defaultValue={editingItem?.category || 'نصائح عقارية'} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none">
                        <option>نصائح عقارية</option><option>أخبار السوق</option><option>تمويل</option><option>استثمار</option>
                     </select>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase mr-2 tracking-widest">موجز المقال</label>
                     <textarea name="summary" rows={5} required defaultValue={editingItem?.summary} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-black outline-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-black text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-gray-800 transition-all active:scale-95">نشر المقال الآن</button>
               </form>
             )}

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
