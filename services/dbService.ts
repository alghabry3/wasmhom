
import { Project, Lead, Unit, BlogPost } from '../types';
import { MOCK_PROJECTS, MOCK_BLOG_POSTS } from '../constants';

const DB_KEYS = {
  PROJECTS: 'wasm_projects',
  LEADS: 'wasm_leads',
  BLOG: 'wasm_blog',
};

export const dbService = {
  // --- إدارة المشاريع ---
  getProjects(): Project[] {
    const data = localStorage.getItem(DB_KEYS.PROJECTS);
    if (!data) {
      this.saveProjects(MOCK_PROJECTS);
      return MOCK_PROJECTS;
    }
    return JSON.parse(data);
  },

  saveProjects(projects: Project[]) {
    localStorage.setItem(DB_KEYS.PROJECTS, JSON.stringify(projects));
  },

  addProject(project: Project) {
    const projects = this.getProjects();
    projects.unshift(project);
    this.saveProjects(projects);
  },

  updateProject(updatedProject: Project) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
      this.saveProjects(projects);
    }
  },

  deleteProject(id: string) {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    this.saveProjects(filtered);
  },

  // --- إدارة العملاء (CRM) ---
  getLeads(): Lead[] {
    const data = localStorage.getItem(DB_KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  },

  addLead(lead: Lead) {
    const leads = this.getLeads();
    leads.unshift(lead);
    localStorage.setItem(DB_KEYS.LEADS, JSON.stringify(leads));
  },

  updateLeadStatus(id: string, status: Lead['status']) {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index].status = status;
      localStorage.setItem(DB_KEYS.LEADS, JSON.stringify(leads));
    }
  },

  // --- إدارة المدونة ---
  getBlogPosts(): BlogPost[] {
    const data = localStorage.getItem(DB_KEYS.BLOG);
    if (!data) {
      localStorage.setItem(DB_KEYS.BLOG, JSON.stringify(MOCK_BLOG_POSTS));
      return MOCK_BLOG_POSTS;
    }
    return JSON.parse(data);
  }
};
