
import React, { useState } from 'react';
import { StudioSession, StudioClient, StudioExpense, Equipment, EquipmentStatus, EquipmentCategory, Branch } from '../types';
import { 
  Camera, LayoutDashboard, Calendar, Users, Wallet, 
  Plus, Search, Mail, Phone, ArrowUpRight, ArrowDownRight,
  ChevronRight, Filter, Download, MoreHorizontal,
  Box, Zap, Radio, Video, Layers, AlertCircle,
  Building2, ShoppingBag, TrendingUp, DollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, ComposedChart, Line } from 'recharts';

type StudioTab = 'stats' | 'rdv' | 'clients' | 'equipment' | 'expenses';

interface Props {
  branch: Branch;
}

const sessions: StudioSession[] = [
  { id: '1', clientName: 'Julie Verne', branch: 'France', type: 'Maternité', date: '2024-05-18, 14:00', duration: '2h', photographer: 'Alex Riva', status: 'Scheduled' },
  { id: '2', clientName: 'Marc Antoine', branch: 'France', type: 'Fashion', date: '2024-05-18, 10:00', duration: '4h', photographer: 'Sarah J.', status: 'Completed' },
  { id: '3', clientName: 'Sisters Brand', branch: 'France', type: 'Product', date: '2024-05-19, 09:30', duration: '6h', photographer: 'Sarah J.', status: 'Scheduled' },
];

const studioClients: StudioClient[] = [
  { id: '1', name: 'Julie Verne', branch: 'France', email: 'j.verne@gmail.com', phone: '06 11 22 33 44', lastSession: '18 Mai 2024', totalSpent: 250 },
  { id: '2', name: 'Marc Antoine', branch: 'France', email: 'marc.a@pro.fr', phone: '06 55 66 77 88', lastSession: '10 Mai 2024', totalSpent: 1200 },
  { id: '3', name: 'Brand Elite', branch: 'France', email: 'contact@brandelite.com', phone: '01 40 50 60 70', lastSession: '15 Avr 2024', totalSpent: 4500 },
];

const studioExpenses: StudioExpense[] = [
  { id: '1', branch: 'France', category: 'Equipement', type: 'Variable', amount: 1500, date: '2024-05-02', description: 'Flash Profoto B10X' },
  { id: '2', branch: 'France', category: 'Loyer/Charges', type: 'Fixe', amount: 2200, date: '2024-05-01', description: 'Loyer Studio Paris' },
  { id: '3', branch: 'France', category: 'Marketing', type: 'Variable', amount: 450, date: '2024-05-10', description: 'Ads Instagram Shooting Famille' },
  { id: '4', branch: 'France', category: 'Maintenance', type: 'Variable', amount: 120, date: '2024-05-12', description: 'Nettoyage Capteur Sony A7R' },
];

const inventory: Equipment[] = [
  { id: 'e1', name: 'Sony A7R V', category: 'Caméra', status: 'In Use', serialNumber: 'SN-7842-X', branch: 'France', assignedTo: 'Alex Riva', currentProject: 'Mariage Amélie', lastMaintenance: '2024-03-10' },
  { id: 'e2', name: 'DJI Mavic 3 Pro', category: 'Drone', status: 'Available', serialNumber: 'DRN-442-A', branch: 'France', lastMaintenance: '2024-04-15' },
  { id: 'e3', name: '85mm f/1.2 GM', category: 'Objectif', status: 'In Use', serialNumber: 'LNS-990-B', branch: 'France', assignedTo: 'Alex Riva', currentProject: 'Mariage Amélie' },
  { id: 'e4', name: 'Profoto B10X Kit', category: 'Éclairage', status: 'Maintenance', serialNumber: 'LIT-221-Z', branch: 'France', lastMaintenance: '2024-05-12' },
  { id: 'e5', name: 'Sennheiser AVX', category: 'Audio', status: 'Available', serialNumber: 'AUD-556-C', branch: 'France' },
  { id: 'e6', name: 'Red Komodo 6K', category: 'Caméra', status: 'Broken', serialNumber: 'RED-112-K', branch: 'France', lastMaintenance: '2024-01-20' }
];

const Studio: React.FC<Props> = ({ branch }) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('stats');

  const getEquipmentIcon = (category: EquipmentCategory) => {
    switch (category) {
      case 'Caméra': return <Camera className="w-5 h-5" />;
      case 'Objectif': return <Layers className="w-5 h-5" />;
      case 'Drone': return <Radio className="w-5 h-5" />;
      case 'Audio': return <Video className="w-5 h-5" />;
      // Fix: Handle 'Éclairage' with Zap icon (replaced missing Tool export)
      case 'Éclairage': return <Zap className="w-5 h-5" />;
      default: return <Box className="w-5 h-5" />;
    }
  };

  const getStatusStyle = (status: EquipmentStatus) => {
    switch (status) {
      case 'Available': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'In Use': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Maintenance': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Broken': return 'bg-rose-50 text-rose-600 border-rose-100';
    }
  };

  const renderStats = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Revenu Studio</p>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-black text-slate-800">14,200 €</h4>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[70%]"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Dépenses (Variable)</p>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-black text-slate-800">2,350 €</h4>
            <span className="text-rose-500 text-xs font-bold flex items-center gap-1 mb-1">
              <ArrowDownRight className="w-3 h-3" /> -4%
            </span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full w-[45%]"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Utilisation Parc</p>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-black text-slate-800">82%</h4>
            <span className="text-blue-500 text-xs font-bold flex items-center gap-1 mb-1">
              Optimisé
            </span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-[82%]"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Note Satisfaction</p>
          <div className="flex items-end justify-between">
            <h4 className="text-3xl font-black text-slate-800">4.92</h4>
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map(i => <Zap key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
            </div>
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full w-[98%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Rentabilité Opérationnelle</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                 <span className="text-xs font-bold text-slate-500">Revenus</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                 <span className="text-xs font-bold text-slate-500">Coûts Fixes</span>
               </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={[
                {name: 'Jan', rev: 12000, fixed: 2200, var: 1500},
                {name: 'Fév', rev: 9500, fixed: 2200, var: 1200},
                {name: 'Mar', rev: 15000, fixed: 2200, var: 3000},
                {name: 'Avr', rev: 13000, fixed: 2200, var: 1100},
                {name: 'Mai', rev: 14200, fixed: 2200, var: 2350},
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="rev" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                <Line type="monotone" dataKey="fixed" stroke="#f43f5e" strokeWidth={3} dot={{r: 4}} />
                <Area type="monotone" dataKey="var" fill="#3b82f6" fillOpacity={0.1} stroke="#3b82f6" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <ShoppingBag className="w-48 h-48" />
          </div>
          <h3 className="text-xl font-bold mb-2">Planification Stratégique</h3>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Le studio a atteint 82% de sa capacité. Nous recommandons l'embauche d'un assistant plateau pour les sessions du samedi.
          </p>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Opportunité</p>
              <p className="font-bold text-sm">Renouvellement Sony A7R IV vers V</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">+15% efficacité AF</span>
                <span className="text-xs text-slate-300">Estimé: 3,400€</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-900/20">
            Voir rapport complet
          </button>
        </div>
      </div>
    </div>
  );

  const renderEquipment = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, SN, ou catégorie..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filtres
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800">
            <Plus className="w-4 h-4" /> Ajouter Matériel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${
                item.status === 'Available' ? 'bg-emerald-50 text-emerald-600' :
                item.status === 'In Use' ? 'bg-indigo-50 text-indigo-600' :
                item.status === 'Maintenance' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {getEquipmentIcon(item.category)}
              </div>
              <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                {item.status}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h4>
              <p className="text-xs text-slate-400 font-medium">S/N: {item.serialNumber}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 space-y-4">
              {item.status === 'In Use' ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/100?u=${item.assignedTo}`} className="w-6 h-6 rounded-full" alt="" />
                    <span className="text-sm font-bold text-slate-700">{item.assignedTo}</span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                    {item.currentProject}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Maintenance: {item.lastMaintenance || 'N/A'}</span>
                  {item.status === 'Broken' && <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />}
                </div>
              )}
            </div>
            
            <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 py-2.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100">Détails</button>
              <button className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800">Assigner</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRDV = () => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/30">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Agenda Studio</h3>
          <p className="text-sm text-slate-500">Gérez vos séances et la disponibilité des plateaux.</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
          <Plus className="w-4 h-4" /> Réserver une séance
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 text-left">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Studio</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Type de Session</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plage Horaire</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Photographe</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sessions.map(s => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
                      {s.clientName.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-800">{s.clientName}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    s.type === 'Maternité' ? 'bg-pink-50 text-pink-600' :
                    s.type === 'Fashion' ? 'bg-indigo-50 text-indigo-600' :
                    s.type === 'Product' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {s.type}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{s.date.split(',')[0]}</span>
                    <span className="text-xs text-slate-500">{s.date.split(',')[1]} ({s.duration})</span>
                  </div>
                </td>
                <td className="px-6 py-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-700">AR</div>
                  <span className="text-sm text-slate-700 font-bold">{s.photographer}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {studioClients.map(client => (
        <div key={client.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
             <button className="p-2 hover:bg-slate-50 rounded-xl"><MoreHorizontal className="w-5 h-5 text-slate-300" /></button>
          </div>
          <div className="flex items-center gap-5 mb-8">
            <div className="h-16 w-16 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-slate-200">
              {client.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xl">{client.name}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dernier passage: {client.lastSession}</p>
            </div>
          </div>
          <div className="space-y-4 mb-8 bg-slate-50/50 p-6 rounded-3xl border border-slate-50">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <div className="p-2 bg-white rounded-xl shadow-sm"><Mail className="w-4 h-4 text-slate-300" /></div>
              {client.email}
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <div className="p-2 bg-white rounded-xl shadow-sm"><Phone className="w-4 h-4 text-slate-300" /></div>
              {client.phone}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Valeur Client</span>
              <span className="text-xl font-black text-emerald-500">{client.totalSpent.toLocaleString()}€</span>
            </div>
            <button className="bg-slate-900 text-white h-12 px-6 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
              Gérer Dossier <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      <div className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:border-emerald-500 transition-colors cursor-pointer">
         <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
            <Plus className="w-8 h-8 text-slate-300 group-hover:text-emerald-500 transition-colors" />
         </div>
         <p className="font-bold text-slate-800">Ajouter un nouveau client</p>
         <p className="text-xs text-slate-400 mt-1">Directement lié aux séances studio</p>
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex gap-12">
           <div>
             <p className="text-slate-400 text-xs font-bold uppercase mb-1">Coûts Fixes</p>
             <p className="text-2xl font-black text-slate-800">2,200 € <span className="text-xs font-medium text-slate-400">/ mois</span></p>
           </div>
           <div>
             <p className="text-slate-400 text-xs font-bold uppercase mb-1">Variables (Mai)</p>
             <p className="text-2xl font-black text-rose-500">2,070 €</p>
           </div>
           <div>
             <p className="text-slate-400 text-xs font-bold uppercase mb-1">Total Sorties</p>
             <p className="text-2xl font-black text-slate-800">4,270 €</p>
           </div>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-100">
            <Download className="w-4 h-4" /> Journal PDF
          </button>
          <button className="flex-1 lg:flex-none px-8 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" /> Nouvel Achat
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Catégorie</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Désignation</th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Montant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {studioExpenses.map(e => (
              <tr key={e.id} className="hover:bg-rose-50/10 transition-colors group">
                <td className="px-8 py-5">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                    e.type === 'Fixe' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {e.type}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center w-fit gap-1.5 ${
                    e.category === 'Equipement' ? 'bg-amber-100 text-amber-700' :
                    e.category === 'Loyer/Charges' ? 'bg-blue-100 text-blue-700' : 
                    e.category === 'Marketing' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {e.category === 'Loyer/Charges' ? <Building2 className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
                    {e.category}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-slate-700">{e.description}</td>
                <td className="px-6 py-5 text-xs text-slate-400 text-center">{e.date}</td>
                <td className="px-8 py-5 text-right font-black text-rose-500 group-hover:scale-105 transition-transform">-{e.amount.toLocaleString()}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Marvelous Studio</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-slate-800">Elegance Lab</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Production Visuelle, Parc Matériel & Logistique.</p>
        </div>
        
        <div className="flex bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm w-full lg:w-auto overflow-x-auto no-scrollbar scroll-smooth">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'stats' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('equipment')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'equipment' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Box className="w-4 h-4" /> Inventaire
          </button>
          <button 
            onClick={() => setActiveTab('rdv')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'rdv' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4" /> Planning
          </button>
          <button 
            onClick={() => setActiveTab('clients')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'clients' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" /> Clients
          </button>
          <button 
            onClick={() => setActiveTab('expenses')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'expenses' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Wallet className="w-4 h-4" /> Finance
          </button>
        </div>
      </div>

      <div className="min-h-[650px] transition-all duration-300">
        {activeTab === 'stats' && renderStats()}
        {activeTab === 'equipment' && renderEquipment()}
        {activeTab === 'rdv' && renderRDV()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'expenses' && renderExpenses()}
      </div>
    </div>
  );
};

export default Studio;
