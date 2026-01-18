
import React, { useState } from 'react';
import { StudioSession, StudioClient, StudioExpense, Equipment, EquipmentStatus, EquipmentCategory, Branch } from '../types';
import { 
  Camera, LayoutDashboard, Calendar, Users, Wallet, 
  Plus, Search, Mail, Phone, ArrowUpRight, ArrowDownRight,
  ChevronRight, Filter, Download, MoreHorizontal,
  Box, Zap, Radio, Video, Layers, AlertCircle,
  Building2, ShoppingBag, TrendingUp, DollarSign
} from 'lucide-react';

type StudioTab = 'stats' | 'rdv' | 'clients' | 'equipment';

interface Props {
  branch: Branch;
}

const getInventory = (branch: Branch): Equipment[] => [
  { id: 'e1', name: 'Sony A7R V', category: 'Caméra', status: 'In Use', serialNumber: 'SN-7842-X', branch: 'France', assignedTo: 'Alex Riva', currentProject: 'Mariage Paris' },
  { id: 'e2', name: 'DJI Mavic 3 Pro', category: 'Drone', status: 'Available', serialNumber: 'DRN-442-A', branch: 'France' },
  { id: 'e5', name: 'Red Komodo 6K', category: 'Caméra', status: 'In Use', serialNumber: 'RED-112-K', branch: 'Cameroun', assignedTo: 'Samuel Ndjock', currentProject: 'Shooting Akwa' },
  { id: 'e6', name: 'Kit Profoto B10X', category: 'Éclairage', status: 'Available', serialNumber: 'LIT-221-Z', branch: 'Cameroun' }
];

const getSessions = (branch: Branch): StudioSession[] => [
  { id: '1', clientName: 'Julie Verne', branch: 'France', type: 'Maternité', date: '2024-06-18', duration: '2h', photographer: 'Alex Riva', status: 'Scheduled' },
  { id: '2', clientName: 'Famille Ewane', branch: 'Cameroun', type: 'Famille', date: '2024-06-19', duration: '3h', photographer: 'Samuel Ndjock', status: 'Scheduled' }
];

const Studio: React.FC<Props> = ({ branch }) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('stats');
  const inventory = getInventory(branch).filter(e => branch === 'Global' || e.branch === branch);
  const sessions = getSessions(branch).filter(s => branch === 'Global' || s.branch === branch);

  const getStatusStyle = (status: EquipmentStatus) => {
    switch (status) {
      case 'Available': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'In Use': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Maintenance': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-rose-50 text-rose-600 border-rose-100';
    }
  };

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
      <div className="glass p-6 rounded-3xl border border-slate-100 dark:border-white/5">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Utilisation Parc</p>
        <h4 className="text-3xl font-black text-slate-800 dark:text-white">{branch === 'Cameroun' ? '92%' : '82%'}</h4>
        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-[85%]"></div>
        </div>
      </div>
    </div>
  );

  const renderEquipment = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-500">
      {inventory.map((item) => (
        <div key={item.id} className="glass dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${
              item.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
            }`}>
              <Camera className="w-5 h-5" />
            </div>
            <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(item.status)}`}>
              {item.status}
            </div>
          </div>
          <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{item.name}</h4>
          <p className="text-xs text-slate-400 font-medium">{item.serialNumber} • {item.branch}</p>
          {item.status === 'In Use' && (
             <div className="mt-4 pt-4 border-t border-slate-50 dark:border-white/5">
               <span className="text-[10px] font-bold text-indigo-500 uppercase">{item.assignedTo} • {item.currentProject}</span>
             </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-5xl font-display font-bold text-slate-800 dark:text-white">Elegance Lab</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Matériel & Studio • {branch}.</p>
        </div>
        <div className="flex glass dark:bg-white/5 p-2 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-sm">
          <button onClick={() => setActiveTab('stats')} className={`px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'stats' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400'}`}>Stats</button>
          <button onClick={() => setActiveTab('equipment')} className={`px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'equipment' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400'}`}>Matériel</button>
        </div>
      </div>
      <div className="min-h-[500px]">
        {activeTab === 'stats' && renderStats()}
        {activeTab === 'equipment' && renderEquipment()}
      </div>
    </div>
  );
};

export default Studio;
