
export type Branch = 'Global' | 'France' | 'Cameroun';
export type ViewType = 'dashboard' | 'weddings' | 'studio' | 'personnel' | 'performance' | 'marketing' | 'crm' | 'settings';
export type Theme = 'light' | 'dark';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export type SyncStatus = 'online' | 'offline' | 'syncing';

export type ProjectType = 'Mariage' | 'Studio' | 'Corporate' | 'Event';
export type ProjectStatus = 'Planning' | 'Confirmed' | 'In Progress' | 'Completed' | 'Delivered';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type StaffStatus = 'Actif' | 'En mission' | 'En pause';

export type EquipmentCategory = 'Caméra' | 'Objectif' | 'Drone' | 'Éclairage' | 'Audio' | 'Accessoire';
export type EquipmentStatus = 'Available' | 'In Use' | 'Maintenance' | 'Broken';

export interface ProjectAnalytics {
  firstPassSuccess: boolean;
  deliveryTimeDays: number;
  clientRating: number;
  revisionCount: number;
}

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  status: EquipmentStatus;
  serialNumber: string;
  branch: Branch;
  assignedTo?: string; 
  currentProject?: string; 
  lastMaintenance?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  deadline?: string;
  assignedTo?: string;
}

export interface Project {
  id: string;
  clientName: string;
  type: ProjectType;
  date: string;
  status: ProjectStatus;
  location: string;
  budget: number;
  branch: Branch;
  formula: string;
  tasks: Task[];
  urgency: 'low' | 'medium' | 'high';
  analytics?: ProjectAnalytics;
}

export type Department = 
  | 'Montage Vidéo' 
  | 'Retouche Photo' 
  | 'Photographie' 
  | 'Cadrage' 
  | 'Graphisme' 
  | 'Marketing' 
  | 'Make-up';

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: Department;
  status: StaffStatus;
  branch: Branch;
  availability: 'Available' | 'Busy' | 'On Leave';
  performanceScore: number;
  efficiency: number;
  projectsCompleted: number;
  email: string;
  phone: string;
  skills: Skill[];
  workload: number[];
  evolutionData: { month: string; score: number }[];
  deliveryDelay?: number;
}

export interface Interaction {
  id: string;
  type: 'Email' | 'Call' | 'Meeting' | 'Portal';
  date: string;
  summary: string;
}

export interface GalleryLink {
  id: string;
  label: string;
  url: string;
  isPrivate: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: Branch;
  status: 'Lead' | 'Active' | 'Past';
  category: 'Wedding' | 'Studio' | 'VIP';
  totalRevenue: number;
  projects: string[]; 
  interactions: Interaction[];
  galleries: GalleryLink[];
  portalAccessCode: string;
}

export interface StudioSession {
  id: string;
  clientName: string;
  branch: Branch;
  type: 'Portrait' | 'Fashion' | 'Engagement' | 'Product' | 'Maternité' | 'Famille';
  date: string;
  duration: string;
  photographer: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface StudioClient {
  id: string;
  name: string;
  branch: Branch;
  email: string;
  phone: string;
  lastSession: string;
  totalSpent: number;
}

export interface StudioExpense {
  id: string;
  branch: Branch;
  category: 'Equipement' | 'Consommables' | 'Location' | 'Marketing' | 'Maintenance' | 'Loyer/Charges';
  type: 'Fixe' | 'Variable';
  amount: number;
  date: string;
  description: string;
}

export type SocialPlatform = 'Instagram' | 'TikTok' | 'Facebook' | 'LinkedIn';
export type ContentStatus = 'Draft' | 'Scheduled' | 'Published';

export interface ContentPost {
  id: string;
  platform: SocialPlatform;
  title: string;
  date: string;
  status: ContentStatus;
  type: 'Video/Reel' | 'Photo' | 'Carousel' | 'Story';
  content: string;
}

export interface MarketingTemplate {
  id: string;
  title: string;
  category: 'Promotion' | 'Tips' | 'BehindTheScenes';
  body: string;
}

export interface CampaignROI {
  month: string;
  adSpend: number;
  revenue: number;
  leads: number;
}
