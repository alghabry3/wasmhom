
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import SmartAdvisor from './pages/SmartAdvisor';
import Contact from './pages/Contact';
import Investment from './pages/Investment';
import About from './pages/About';
import Blog from './pages/Blog';
import Financing from './pages/Financing';
import AdminDashboard from './pages/AdminDashboard';
import LegalPage from './pages/LegalPage';
import Login from './pages/Login';
import { dbService } from './services/dbService';
import { Project } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // تحميل البيانات والتحقق من الجلسة عند تشغيل التطبيق
  useEffect(() => {
    setProjects(dbService.getProjects());
    const authStatus = sessionStorage.getItem('wasm_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, activeId]);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (id) setActiveId(id);
    else setActiveId(null);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('wasm_auth');
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const refreshData = () => {
    setProjects(dbService.getProjects());
  };

  const renderPage = () => {
    // حماية صفحة الإدارة
    if (currentPage === 'admin') {
      if (!isAuthenticated) {
        return <Login onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentPage('home')} />;
      }
      return <AdminDashboard onRefresh={refreshData} onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case 'home': return <Home onNavigate={handleNavigate} projects={projects} />;
      case 'projects': return <Projects onNavigate={handleNavigate} projects={projects} />;
      case 'projectDetails': return activeId ? <ProjectDetails projectId={activeId} onNavigate={handleNavigate} /> : <Projects onNavigate={handleNavigate} projects={projects} />;
      case 'advisor': return <SmartAdvisor onNavigate={handleNavigate} />;
      case 'contact': return <Contact />;
      case 'investment': return <Investment onNavigate={handleNavigate} />;
      case 'financing': 
      case 'mortgage':
      case 'distress':
      case 'sakani':
        return <Financing onNavigate={handleNavigate} type={currentPage === 'financing' ? 'all' : currentPage} />;
      case 'about': return <About />;
      case 'blog': return <Blog onNavigate={handleNavigate} />;
      case 'faq':
      case 'terms':
      case 'privacy':
        return <LegalPage type={currentPage as any} />;
      case 'login': return <Login onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentPage('home')} />;
      default: return <Home onNavigate={handleNavigate} projects={projects} />;
    }
  };

  // إذا كانت الصفحة الحالية هي الإدارة أو تسجيل الدخول، لا نعرض الـ Navbar و الـ Footer الافتراضي
  const hideLayout = currentPage === 'admin' || currentPage === 'login' || (currentPage === 'admin' && !isAuthenticated);

  return (
    <div className="flex flex-col min-h-screen selection:bg-black selection:text-white">
      {!hideLayout && <Navbar onNavigate={handleNavigate} currentPage={currentPage} />}
      <main className="flex-grow">{renderPage()}</main>
      {!hideLayout && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
