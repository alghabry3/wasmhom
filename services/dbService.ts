
import { Project, Lead, Unit, BlogPost, AdminUser } from '../types';
import { MOCK_PROJECTS, MOCK_BLOG_POSTS } from '../constants';

const DB_KEYS = {
  PROJECTS: 'wasm_projects',
  LEADS: 'wasm_leads',
  BLOG: 'wasm_blog',
  USERS: 'wasm_admin_users',
  ODOO_CONFIG: 'wasm_odoo_config',
};

export interface OdooConfig {
  url: string;
  apiKey: string;
  dbName: string;
  username: string;
  autoSync: boolean;
  syncInterval: number;
}

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'u1',
    name: 'أدمن النظام',
    email: 'admin@wasmhome.com',
    role: 'super_admin',
    status: 'active',
    lastLogin: new Date().toISOString(),
    permissions: ['all']
  },
  {
    id: 'u2',
    name: 'سارة المنصور',
    email: 'sara@wasmhome.com',
    role: 'manager',
    status: 'active',
    lastLogin: new Date().toISOString(),
    permissions: ['projects', 'leads']
  }
];

const DEFAULT_ODOO_CONFIG: OdooConfig = {
  url: 'https://wasmhome-sa.odoo.com',
  apiKey: 'wasm_live_7x92_k8l2',
  dbName: 'wasm_prod_v19',
  username: 'admin@wasmhome.com',
  autoSync: true,
  syncInterval: 15
};

export const dbService = {
  // --- إدارة المشاريع (Projects) ---
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
      projects[index] = { ...projects[index], ...updatedProject };
      this.saveProjects(projects);
    }
  },

  deleteProject(id: string) {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    this.saveProjects(filtered);
  },

  // --- إدارة العملاء (CRM - Leads) ---
  getLeads(): Lead[] {
    const data = localStorage.getItem(DB_KEYS.LEADS);
    if (!data) return [];
    return JSON.parse(data);
  },

  saveLeads(leads: Lead[]) {
    localStorage.setItem(DB_KEYS.LEADS, JSON.stringify(leads));
  },

  addLead(lead: Lead) {
    const leads = this.getLeads();
    leads.unshift(lead);
    this.saveLeads(leads);
  },

  updateLeadStatus(id: string, status: Lead['status']) {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index].status = status;
      this.saveLeads(leads);
    }
  },

  deleteLead(id: string) {
    const leads = this.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    this.saveLeads(filtered);
  },

  // --- إدارة المدونة (Blog Content) ---
  getBlogPosts(): BlogPost[] {
    const data = localStorage.getItem(DB_KEYS.BLOG);
    if (!data) {
      this.saveBlogPosts(MOCK_BLOG_POSTS);
      return MOCK_BLOG_POSTS;
    }
    return JSON.parse(data);
  },

  saveBlogPosts(posts: BlogPost[]) {
    localStorage.setItem(DB_KEYS.BLOG, JSON.stringify(posts));
  },

  addBlogPost(post: BlogPost) {
    const posts = this.getBlogPosts();
    posts.unshift(post);
    this.saveBlogPosts(posts);
  },

  updateBlogPost(updatedPost: BlogPost) {
    const posts = this.getBlogPosts();
    const index = posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      posts[index] = updatedPost;
      this.saveBlogPosts(posts);
    }
  },

  deleteBlogPost(id: string) {
    const posts = this.getBlogPosts();
    const filtered = posts.filter(p => p.id !== id);
    this.saveBlogPosts(filtered);
  },

  // --- إدارة المستخدمين (Admin Users) ---
  getAdminUsers(): AdminUser[] {
    const data = localStorage.getItem(DB_KEYS.USERS);
    if (!data) {
      this.saveAdminUsers(INITIAL_USERS);
      return INITIAL_USERS;
    }
    return JSON.parse(data);
  },

  saveAdminUsers(users: AdminUser[]) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  },

  addAdminUser(user: AdminUser) {
    const users = this.getAdminUsers();
    users.unshift(user);
    this.saveAdminUsers(users);
  },

  updateAdminUser(updatedUser: AdminUser) {
    const users = this.getAdminUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      this.saveAdminUsers(users);
    }
  },

  deleteAdminUser(id: string) {
    const users = this.getAdminUsers();
    const filtered = users.filter(u => u.id !== id);
    this.saveAdminUsers(filtered);
  },

  // --- إعدادات Odoo ---
  getOdooConfig(): OdooConfig {
    const data = localStorage.getItem(DB_KEYS.ODOO_CONFIG);
    if (!data) return DEFAULT_ODOO_CONFIG;
    return JSON.parse(data);
  },

  saveOdooConfig(config: OdooConfig) {
    localStorage.setItem(DB_KEYS.ODOO_CONFIG, JSON.stringify(config));
  }
};
