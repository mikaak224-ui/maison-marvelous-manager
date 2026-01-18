
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
    id: '1', name: 'Alex Riva', role: 'Directeur Photo', department: 'Photographie', 
    status: 'En mission', branch: 'France', availability: 'Busy', performanceScore: 98, efficiency: 4.9, projectsCompleted: 142,
    email: 'alex.r@marvelous.fr', phone: '06 12 45 78 90',
    skills: [{name: 'Lumière', level: 95}, {name: 'Composition', level: 98}],
    workload: [2, 2, 2, 2, 1, 0, 0],
    evolutionData: [{month:'Jan', score:80}, {month:'Fev', score:85}, {month:'Mar', score:98}]
  },
  { 
    id: '2', name: 'Sarah J.', role: 'Senior Editor', department: 'Montage Vidéo', 
    status: 'Actif', branch: 'France', availability: 'Busy', performanceScore: 95, efficiency: 4.7, projectsCompleted: 89,
    email: 'sarah.j@marvelous.fr', phone: '06 98 76 54 32',
    skills: [{name: 'Premiere Pro', level: 99}, {name: 'Etalonnage', level: 92}],
    workload: [1, 1, 2, 2, 2, 2, 0],
    deliveryDelay: -2,
    evolutionData: [{month:'Jan', score:88}, {month:'Fev', score:90}, {month:'Mar', score:95}]
  },
  { 
    id: '5', name: 'Samuel Ndjock', role: 'Chef Opérateur', department: 'Cadrage', 
    status: 'En mission', branch: 'Cameroun', availability: 'Busy', performanceScore: 96, efficiency: 4.8, projectsCompleted: 110,
    email: 'samuel.n@marvelous.cm', phone: '+237 699 00 11 22',
    skills: [{name: 'Drone 6K', level: 95}, {name: 'Live stream', level: 90}],
    workload: [2, 2, 1, 1, 2, 2, 0],
    evolutionData: [{month:'Jan', score:85}, {month:'Fev', score:90}, {month:'Mar', score:96}]
  },
  { 
    id: '6', name: 'Fidèle Tagne', role: 'Visagiste de Luxe', department: 'Make-up', 
    status: 'Actif', branch: 'Cameroun', availability: 'Available', performanceScore: 94, efficiency: 4.6, projectsCompleted: 75,
    email: 'fidele.t@marvelous.cm', phone: '+237 677 88 99 00',
    skills: [{name: 'Maquillage Mariée', level: 98}, {name: 'Coiffure', level: 92}],
    workload: [0, 0, 1, 1, 2, 2, 2],
    evolutionData: [{month:'Jan', score:82}, {month:'Fev', score:88}, {month:'Mar', score:94}]
  }
];

const Personnel: React.FC<Props> = ({ branch }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('annuaire');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = branch === 'Global' 
    ? staffMembers 
    : staffMembers.filter(s => s.branch === branch);

  const renderAnnuaire = () => (
    <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-500">
      {filteredStaff
        .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((member) => (
        <div key={member.id} className="glass dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
          <div className="flex flex-col xl:flex-row">
            <div className="p-8 xl:w-80 border-b xl:border-b-0 xl:border-r border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-white/2">
              <div className="relative mb-6">
                <div className="h-24 w-24 rounded-[2rem] bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-3xl text-slate-400 border-4 border-white dark:border-slate-800 mx-auto xl:mx-0 shadow-lg">
                  {member.name.charAt(0)}
                </div>
                <div className={`absolute -bottom-1 right-1/2 translate-x-12 xl:translate-x-0 xl:right-1 w-8 h-8 rounded-2xl border-4 border-white dark:border-slate-800 flex items-center justify-center ${
                  member.status === 'Actif' ? 'bg-emerald-500' :
                  member.status === 'En mission' ? 'bg-blue-500' : 'bg-amber-500'
                }`}>
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-center xl:text-left">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">{member.name}</h4>
                <p className="text-sm font-medium text-slate-400 mb-4">{member.role}</p>
                <div className="flex flex-wrap justify-center xl:justify-start gap-2">
                  <span className="px-3 py-1 glass dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {member.department}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    member.branch === 'Cameroun' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {member.branch}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Award className="w-3 h-3 text-amber-500" /> Expertise
                </h5>
                <div className="space-y-4">
                  {member.skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-emerald-500" /> Score Performance
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

              <div className="flex flex-col justify-between">
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <Mail className="w-3 h-3 text-blue-500" /> Contact
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer overflow-hidden">
                      <Mail className="w-4 h-4 text-slate-300" /> <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                      <Phone className="w-4 h-4 text-slate-300" /> {member.phone}
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-colors shadow-lg">
                  Assigner une tâche
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-5xl font-display font-bold text-slate-800 dark:text-white">Marvelous Talents</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Gestion des équipes internationales • {branch}.</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Chercher un talent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex glass dark:bg-white/5 p-1.5 rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-sm w-fit">
        <button 
          onClick={() => setActiveSubTab('annuaire')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeSubTab === 'annuaire' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'text-slate-500'
          }`}
        >
          <Users className="w-4 h-4" /> Annuaire
        </button>
      </div>

      <div className="min-h-[600px]">
        {activeSubTab === 'annuaire' && renderAnnuaire()}
      </div>
    </div>
  );
};

export default Personnel;
