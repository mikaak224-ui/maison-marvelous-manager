
import React, { useState } from 'react';
import { Staff, Department, StaffStatus, Branch } from '../types';
import { 
  Mail, Phone, MoreVertical, CheckCircle2, Clock, 
  Star, Briefcase, TrendingUp, Search, Calendar, 
  Award, Zap, HardDrive, AlertTriangle, ChevronRight,
  Filter, UserPlus, SlidersHorizontal, Users
} from 'lucide-react';

type SubTab = 'annuaire' | 'planning' | 'post-prod';

interface Props {
  branch: Branch;
}

const staffMembers: Staff[] = [
  { 
    id: '1', name: 'Alex Riva', role: 'Senior Photographer', department: 'Photographie', 
    status: 'En mission', branch: 'France', availability: 'Busy', performanceScore: 98, efficiency: 4.9, projectsCompleted: 142,
    email: 'alex.r@elegance.com', phone: '06 12 45 78 90',
    skills: [{name: 'Lightroom', level: 95}, {name: 'Composition', level: 98}],
    workload: [2, 2, 2, 2, 1, 0, 0],
    evolutionData: [{month:'Jan', score:80}, {month:'Fev', score:85}, {month:'Mar', score:98}]
  },
  { 
    id: '2', name: 'Sarah J.', role: 'Expert Video Editor', department: 'Montage Vidéo', 
    status: 'Actif', branch: 'France', availability: 'Busy', performanceScore: 95, efficiency: 4.7, projectsCompleted: 89,
    email: 'sarah.j@elegance.com', phone: '06 98 76 54 32',
    skills: [{name: 'Premiere Pro', level: 99}, {name: 'Color Grading', level: 92}],
    workload: [1, 1, 2, 2, 2, 2, 0],
    deliveryDelay: -2, // 2 jours d'avance
    evolutionData: [{month:'Jan', score:88}, {month:'Fev', score:90}, {month:'Mar', score:95}]
  },
  { 
    id: '3', name: 'Léa Morel', role: 'Visagiste Pro', department: 'Make-up', 
    status: 'En pause', branch: 'France', availability: 'Available', performanceScore: 92, efficiency: 4.5, projectsCompleted: 64,
    email: 'lea.m@elegance.com', phone: '07 44 33 22 11',
    skills: [{name: 'Contouring', level: 90}, {name: 'Luxe Styling', level: 95}],
    workload: [0, 0, 1, 1, 1, 1, 1],
    evolutionData: [{month:'Jan', score:75}, {month:'Fev', score:82}, {month:'Mar', score:92}]
  },
  { 
    id: '4', name: 'Thomas G.', role: 'Lead Colorist', department: 'Retouche Photo', 
    status: 'Actif', branch: 'France', availability: 'On Leave', performanceScore: 88, efficiency: 4.2, projectsCompleted: 110,
    email: 'thomas.g@elegance.com', phone: '06 55 66 77 88',
    skills: [{name: 'Capture One', level: 95}, {name: 'Skin Retouch', level: 88}],
    workload: [0, 0, 0, 0, 0, 0, 0],
    deliveryDelay: 1, // 1 jour de retard
    evolutionData: [{month:'Jan', score:80}, {month:'Fev', score:85}, {month:'Mar', score:88}]
  }
];

const Personnel: React.FC<Props> = ({ branch }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('annuaire');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage par succursale si non "Global"
  const filteredStaff = branch === 'Global' 
    ? staffMembers 
    : staffMembers.filter(s => s.branch === branch);

  const renderAnnuaire = () => (
    <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-500">
      {filteredStaff
        .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((member) => (
        <div key={member.id} className="bg-white dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
          <div className="flex flex-col xl:flex-row">
            {/* Left Info Panel */}
            <div className="p-8 xl:w-80 border-b xl:border-b-0 xl:border-r border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-white/2">
              <div className="relative mb-6">
                <img src={`https://i.pravatar.cc/150?u=${member.id}`} className="h-24 w-24 rounded-[2rem] object-cover shadow-lg border-4 border-white dark:border-slate-800 mx-auto xl:mx-0" alt="" />
                <div className={`absolute -bottom-1 right-1/2 translate-x-12 xl:translate-x-0 xl:right-1 w-8 h-8 rounded-2xl border-4 border-white dark:border-slate-800 flex items-center justify-center ${
                  member.status === 'Actif' ? 'bg-emerald-500' :
                  member.status === 'En mission' ? 'bg-blue-500' : 'bg-amber-500'
                }`}>
                  {member.status === 'Actif' ? <Zap className="w-4 h-4 text-white" /> : <Clock className="w-4 h-4 text-white" />}
                </div>
              </div>
              <div className="text-center xl:text-left">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">{member.name}</h4>
                <p className="text-sm font-medium text-slate-400 mb-4">{member.role}</p>
                <div className="flex flex-wrap justify-center xl:justify-start gap-2">
                  <span className="px-3 py-1 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {member.department}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    member.status === 'Actif' ? 'bg-emerald-50 text-emerald-600' :
                    member.status === 'En mission' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content Panel */}
            <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Skills Section */}
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Award className="w-3 h-3 text-amber-500" /> Compétences Clés
                </h5>
                <div className="space-y-4">
                  {member.skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-800 dark:bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-emerald-500" /> Performance Actuelle
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100/50 dark:border-white/5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Efficacité</p>
                    <p className="text-lg font-black text-slate-800 dark:text-white">{member.efficiency}/5</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100/50 dark:border-white/5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Missions</p>
                    <p className="text-lg font-black text-slate-800 dark:text-white">{member.projectsCompleted}</p>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <Mail className="w-3 h-3 text-blue-500" /> Contact Direct
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                      <Mail className="w-4 h-4 text-slate-300" /> {member.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                      <Phone className="w-4 h-4 text-slate-300" /> {member.phone}
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-2.5 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-colors shadow-lg">
                  Assigner une tâche
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPlanning = () => (
    <div className="bg-white dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-500">
      <div className="p-8 border-b border-slate-50 dark:border-white/5 flex justify-between items-center bg-slate-50/30 dark:bg-white/2">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Board Hebdomadaire</h3>
          <p className="text-sm text-slate-500 italic">Visualisation de la charge de travail (Semaine 21)</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:bg-slate-50"><SlidersHorizontal className="w-4 h-4" /></button>
          <button className="px-4 py-2 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl text-xs font-bold">Modifier Planning</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-white/2">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 dark:border-white/5">Collaborateur</th>
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <th key={day} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {filteredStaff.map(member => (
              <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors">
                <td className="px-8 py-4 border-r border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/50?u=${member.id}`} className="w-8 h-8 rounded-xl object-cover" alt="" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{member.department}</p>
                    </div>
                  </div>
                </td>
                {member.workload.map((load, i) => (
                  <td key={i} className="px-4 py-4">
                    <div className="flex justify-center">
                      <div className={`h-8 w-12 rounded-lg flex items-center justify-center transition-all ${
                        load === 2 ? 'bg-emerald-500 shadow-lg shadow-emerald-100 text-white' :
                        load === 1 ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600' : 'bg-slate-100 dark:bg-white/2 text-slate-300 dark:text-slate-700'
                      }`}>
                        {load === 2 ? <Briefcase className="w-3.5 h-3.5" /> : 
                         load === 1 ? <Clock className="w-3.5 h-3.5" /> : null}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPostProd = () => (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="p-3 bg-purple-50 dark:bg-purple-500/10 text-purple-600 rounded-2xl w-fit mb-4">
            <HardDrive className="w-6 h-6" />
          </div>
          <p className="text-slate-500 text-sm font-medium">Taux de livraison à temps</p>
          <h4 className="text-3xl font-black text-slate-800 dark:text-white mt-1">94%</h4>
        </div>
        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-2xl w-fit mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-slate-500 text-sm font-medium">Retards critiques (DVD)</p>
          <h4 className="text-3xl font-black text-slate-800 dark:text-white mt-1">2 Projets</h4>
        </div>
        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl w-fit mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-slate-500 text-sm font-medium">Volumes traités / mois</p>
          <h4 className="text-3xl font-black text-slate-800 dark:text-white mt-1">12.4 TB</h4>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Pôle Post-Production (DVD/Editing)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/2">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Éditeur / Monteur</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Efficacité</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Délais Avg</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredStaff.filter(s => ['Montage Vidéo', 'Retouche Photo'].includes(s.department)).map(editor => (
                <tr key={editor.id} className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-bold">
                        {editor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{editor.name}</p>
                        <p className="text-xs text-slate-400">{editor.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-24 bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${editor.efficiency * 20}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{editor.efficiency}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                      (editor.deliveryDelay || 0) < 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {(editor.deliveryDelay || 0) < 0 ? `${Math.abs(editor.deliveryDelay || 0)}j d'avance` : `${editor.deliveryDelay}j de retard`}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-slate-400 hover:text-slate-800"><ChevronRight className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-white">Marvelous Talents</h2>
          <p className="text-slate-500">Pilotage RH, charge de travail et excellence post-production.</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un talent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <button className="bg-slate-900 dark:bg-emerald-600 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all">
            <UserPlus className="w-4 h-4" /> Recrutement
          </button>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-sm w-fit">
        <button 
          onClick={() => setActiveSubTab('annuaire')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeSubTab === 'annuaire' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" /> Annuaire
        </button>
        <button 
          onClick={() => setActiveSubTab('planning')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeSubTab === 'planning' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Calendar className="w-4 h-4" /> Planning Hebdo
        </button>
        <button 
          onClick={() => setActiveSubTab('post-prod')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeSubTab === 'post-prod' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <HardDrive className="w-4 h-4" /> Post-Prod & DVD
        </button>
      </div>

      {/* View Rendering */}
      <div className="min-h-[600px]">
        {activeSubTab === 'annuaire' && renderAnnuaire()}
        {activeSubTab === 'planning' && renderPlanning()}
        {activeSubTab === 'post-prod' && renderPostProd()}
      </div>
    </div>
  );
};

export default Personnel;
