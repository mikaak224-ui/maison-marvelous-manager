
import React, { useState, useEffect } from 'react';
import { Project, TaskStatus, ProjectType, ProjectStatus, Branch } from '../types';
import { supabase } from '../services/supabaseClient';
import { 
  MoreHorizontal, MapPin, Calendar, Heart, 
  Search, Zap, Briefcase, Camera, Plus, Loader2
} from 'lucide-react';

interface Props {
  branch: Branch;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 'demo-1',
    clientName: 'Amélie & Thomas',
    type: 'Mariage',
    date: '12 Juin 2024',
    status: 'In Progress',
    location: 'Château de Rambouillet',
    budget: 15000,
    branch: 'France',
    formula: 'Prestige',
    tasks: [],
    urgency: 'high'
  },
  {
    id: 'demo-2',
    clientName: 'Marc-Aurèle Tchakounté',
    type: 'Studio',
    date: '18 Mai 2024',
    status: 'Planning',
    location: 'Studio Douala',
    budget: 2500000,
    branch: 'Cameroun',
    formula: 'VIP',
    tasks: [],
    urgency: 'medium'
  }
];

const Weddings: React.FC<Props> = ({ branch }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'All'>('All');

  useEffect(() => {
    fetchProjects();
  }, [branch]);

  async function fetchProjects() {
    try {
      setLoading(true);
      let query = supabase
        .from('projects')
        .select('*, tasks (*)')
        .order('date', { ascending: false });

      if (branch !== 'Global') {
        query = query.eq('branch', branch);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      if (data && data.length > 0) {
        const mappedData = data.map((item: any) => ({
          ...item,
          clientName: item.client_name || item.clientName,
          tasks: item.tasks || []
        }));
        setProjects(mappedData as Project[]);
      } else {
        setProjects(MOCK_PROJECTS.filter(p => branch === 'Global' || p.branch === branch));
      }
    } catch (error: any) {
      console.warn("Using offline mode data");
      setProjects(MOCK_PROJECTS.filter(p => branch === 'Global' || p.branch === branch));
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (amount: number, projectBranch: Branch) => {
    if (projectBranch === 'Cameroun') {
      return new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(amount);
    }
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const getTypeIcon = (type: ProjectType) => {
    switch (type) {
      case 'Mariage': return <Heart className="w-5 h-5" />;
      case 'Corporate': return <Briefcase className="w-5 h-5" />;
      case 'Studio': return <Camera className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.status === activeFilter);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-5xl font-display font-bold text-slate-900 dark:text-white">Projets & Mariages</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Gestion connectée {branch === 'Global' ? 'France & Cameroun' : `Succursale ${branch}`}.</p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un projet..."
              className="w-full pl-10 pr-4 py-3 glass dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm outline-none"
            />
          </div>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-emerald-900/20 transition-all hover:scale-[1.02]">
            <Plus className="w-5 h-5" /> Nouveau Projet
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Planning', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status as any)}
              className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === status 
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' 
                : 'glass dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:border-emerald-500/50'
              }`}
            >
              {status === 'All' ? 'Tous les projets' : 
               status === 'Planning' ? 'En Planification' :
               status === 'In Progress' ? 'En Production' : 'Terminés'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 opacity-50">
           {[1,2].map(i => (
             <div key={i} className="h-48 glass animate-pulse rounded-[2.5rem] flex items-center justify-center">
               <Loader2 className="w-8 h-8 animate-spin text-slate-200" />
             </div>
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center glass rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/5">
              <Heart className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">Aucun projet trouvé pour cette catégorie.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div key={project.id} className="glass dark:bg-slate-900/40 rounded-[2.5rem] border-2 border-slate-200 dark:border-white/5 transition-all group overflow-hidden hover:border-emerald-500/40 shadow-sm hover:shadow-2xl">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${
                        project.branch === 'Cameroun' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {getTypeIcon(project.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-500/10 px-2 py-0.5 rounded-md">
                            {project.type} • {project.branch}
                          </span>
                        </div>
                        <h4 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">{project.clientName}</h4>
                        <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {project.date}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {project.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        {formatCurrency(project.budget || 0, project.branch)}
                      </span>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        project.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                        project.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {project.status === 'In Progress' ? 'En Production' : project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Weddings;
