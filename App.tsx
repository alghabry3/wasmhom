
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, activeId]);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (id) setActiveId(id);
    else setActiveId(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} />;
      case 'projectDetails':
        return activeId ? <ProjectDetails projectId={activeId} onNavigate={handleNavigate} /> : <Projects onNavigate={handleNavigate} />;
      case 'advisor':
        return <SmartAdvisor onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact />;
      case 'investment':
        return <Investment onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'blog':
        return <Blog onNavigate={handleNavigate} />;
      case 'blogPost':
        // Simplified: render the same blog but could be expanded
        return <div className="py-40 text-center"><h1 className="text-4xl font-black">المقال (قيد التنفيذ)</h1><button onClick={() => setCurrentPage('blog')} className="mt-4 text-black underline">العودة للمدونة</button></div>;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
