
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Heart, Camera, Users, TrendingUp, Megaphone,
  Menu, Bell, Search, UserCircle, UserCheck, Wifi, WifiOff,
  X, CheckCircle2, AlertTriangle, Info, Clock, Sun, Moon, MapPin, Globe, Settings as SettingsIcon
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Weddings from './components/Weddings';
import Studio from './components/Studio';
import Personnel from './components/Personnel';
import Performance from './components/Performance';
import Marketing from './components/Marketing';
import CRM from './components/CRM';
import Settings from './components/Settings';
import { ViewType, AppNotification, SyncStatus, Theme, Branch } from './types';
import { OfflineManager } from './services/offlineService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedBranch, setSelectedBranch] = useState<Branch>('Global');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('online');
  const [theme, setTheme] = useState<Theme>('light');
  const [notifications, setNotifications] = useState<AppNotification[]>([
    { id: '1', title: 'Retard Critique', message: 'Le teaser de "Amélie & Thomas" a 3 jours de retard.', type: 'error', timestamp: '14:30', read: false },
    { id: '2', title: 'Matériel Prêt', message: 'La Red Komodo est revenue de maintenance.', type: 'success', timestamp: 'Hier', read: true },
    { id: '3', title: 'Nouveau Lead', message: 'Demande de devis (Cameroun) pour un shooting.', type: 'info', timestamp: '2h ago', read: false },
  ]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme-preference') as Theme;
    if (saved) setTheme(saved);
    const savedBranch = localStorage.getItem('selected-branch') as Branch;
    if (savedBranch) setSelectedBranch(savedBranch);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('selected-branch', selectedBranch);
  }, [selectedBranch]);

  useEffect(() => {
    const handleOnline = () => setSyncStatus('online');
    const handleOffline = () => setSyncStatus('offline');
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setSyncStatus(OfflineManager.isOnline() ? 'online' : 'offline');
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
    { id: 'weddings', label: 'Projets & Mariages', icon: Heart },
    { id: 'studio', label: 'Studio & Matériel', icon: Camera },
    { id: 'personnel', label: 'Équipe RH', icon: Users },
    { id: 'crm', label: 'Relation Client', icon: UserCheck },
    { id: 'performance', label: 'Performances', icon: TrendingUp },
    { id: 'marketing', label: 'Marketing AI', icon: Megaphone },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard branch={selectedBranch} />;
      case 'weddings': return <Weddings branch={selectedBranch} />;
      case 'studio': return <Studio branch={selectedBranch} />;
      case 'personnel': return <Personnel branch={selectedBranch} />;
      case 'performance': return <Performance branch={selectedBranch} />;
      case 'marketing': return <Marketing branch={selectedBranch} />;
      case 'crm': return <CRM branch={selectedBranch} />;
      case 'settings': return <Settings />;
      default: return <Dashboard branch={selectedBranch} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} glass border-r border-slate-200 dark:border-white/5 transition-all duration-300 ease-in-out flex flex-col z-30`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-900/20">
            <Camera className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && <h1 className="font-display text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">La Maison <br/>Marvelous</h1>}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewType)}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                  activeView === item.id 
                    ? 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20' 
                    : 'text-slate-500 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
              >
                <Icon className="w-6 h-6 shrink-0" />
                {isSidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 space-y-2 border-t border-slate-200 dark:border-white/5">
          <button
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
              activeView === 'settings' 
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' 
                : 'text-slate-500 hover:bg-slate-900/5 dark:hover:bg-white/5'
            }`}
          >
            <SettingsIcon className="w-6 h-6 shrink-0" />
            {isSidebarOpen && <span className="text-sm">Paramètres</span>}
          </button>

          <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${!isSidebarOpen && 'flex justify-center'}`}>
            {isSidebarOpen ? (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Succursale Active</span>
                <select 
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value as Branch)}
                  className="bg-transparent border-none outline-none text-xs font-bold text-emerald-600 cursor-pointer"
                >
                  <option value="Global">Groupe Global</option>
                  <option value="France">France (EUR)</option>
                  <option value="Cameroun">Cameroun (XAF)</option>
                </select>
              </div>
            ) : (
              <Globe className="w-5 h-5 text-emerald-600" />
            )}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 glass border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-lg text-slate-500 dark:text-slate-400">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600">{selectedBranch === 'Global' ? 'Vue Consolidée' : `Succursale ${selectedBranch}`}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              syncStatus === 'online' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-rose-500/10 text-rose-600 dark:text-rose-500'
            }`}>
              {syncStatus === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {syncStatus}
            </div>

            <button onClick={toggleTheme} className="p-2 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-slate-400 transition-all">
              {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative p-2 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-slate-400">
              <Bell className="w-6 h-6" />
              {notifications.some(n => !n.read) && <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>}
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">Admin Marvelous</p>
                <p className="text-[10px] text-slate-500 font-medium">Super-Admin</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold border border-white/10 shadow-lg">M</div>
            </div>
          </div>
        </header>

        {isNotifOpen && (
          <div className="absolute top-20 right-8 w-80 glass border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl z-50 p-6 animate-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white">Centre de Notifications</h4>
              <button onClick={() => setIsNotifOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.map(n => (
                <div key={n.id} className={`p-4 rounded-2xl border ${n.read ? 'bg-slate-50 dark:bg-white/2 border-slate-100 dark:border-white/5' : 'bg-white dark:bg-white/5 border-emerald-500/20'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 p-1.5 rounded-lg ${n.type === 'error' ? 'bg-rose-500/20 text-rose-500' : n.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'}`}>
                      {n.type === 'error' ? <AlertTriangle className="w-3.5 h-3.5" /> : n.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold mb-1 text-slate-900 dark:text-white">{n.title}</h5>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{n.message}</p>
                      <span className="text-[9px] text-slate-400 dark:text-slate-600 mt-2 block uppercase font-bold">{n.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
