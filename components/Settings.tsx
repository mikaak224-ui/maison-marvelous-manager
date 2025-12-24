
import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Globe, Github, Camera, Shield, 
  Bell, Save, Trash2, ExternalLink, AlertCircle, CheckCircle2,
  Key, RefreshCw, HelpCircle, LogOut, AlertTriangle
} from 'lucide-react';

const Settings: React.FC = () => {
  const [config, setConfig] = useState({
    businessName: 'La Maison Marvelous',
    githubRepo: 'https://github.com/votre-compte/maison-manager',
    emailContact: 'contact@marvelous.com',
    enableNotifications: true,
    branchManagement: 'France & Cameroun'
  });

  const [isChecking, setIsChecking] = useState(false);
  const [githubStatus, setGithubStatus] = useState<'connected' | 'error' | 'idle'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('marvelous-config');
    if (saved) setConfig(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem('marvelous-config', JSON.stringify(config));
    alert('Paramètres enregistrés avec succès !');
  };

  const checkConnection = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setGithubStatus(config.githubRepo.includes('github.com') ? 'connected' : 'error');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-slate-800 rounded-lg flex items-center justify-center text-white">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Administration</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-slate-900 dark:text-white">Paramètres</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Configurez votre environnement de travail.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-emerald-900/20 hover:scale-[1.02] transition-all"
        >
          <Save className="w-5 h-5" /> Enregistrer tout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Guide de dépannage pour l'erreur d'authentification */}
          <div className="bg-rose-50 dark:bg-rose-500/10 p-8 rounded-[2.5rem] border-2 border-rose-200 dark:border-rose-500/20 animate-pulse-subtle">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-100 dark:bg-rose-500/20 text-rose-600 rounded-2xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-rose-800 dark:text-rose-400 mb-2">Résoudre l'erreur d'authentification GitHub</h4>
                <p className="text-sm text-rose-700/80 dark:text-rose-500/70 mb-6 leading-relaxed">
                  L'erreur "authentication error" que vous voyez est liée à votre session GitHub dans l'éditeur. Suivez ces étapes :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-rose-200/50">
                    <span className="text-[10px] font-black text-rose-400 uppercase">Étape 1</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-white mt-1">Déconnexion</p>
                    <p className="text-[10px] text-slate-500 mt-1">Cliquez sur votre profil (bas gauche) et faites "Sign Out".</p>
                  </div>
                  <div className="bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-rose-200/50">
                    <span className="text-[10px] font-black text-rose-400 uppercase">Étape 2</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-white mt-1">Rafraîchir</p>
                    <p className="text-[10px] text-slate-500 mt-1">Actualisez cette page (F5) pour réinitialiser la session.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-rose-200/50">
                    <span className="text-[10px] font-black text-rose-400 uppercase">Étape 3</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-white mt-1">Re-connexion</p>
                    <p className="text-[10px] text-slate-500 mt-1">Réessayez l'export GitHub et autorisez l'accès.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Manuelle */}
          <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
              <Github className="w-6 h-6" /> Lien vers votre code
            </h3>
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1 block">URL de votre dépôt une fois créé</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="https://github.com/votre-compte/maison-marvelous"
                  value={config.githubRepo}
                  onChange={(e) => setConfig({...config, githubRepo: e.target.value})}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
                <button 
                  onClick={checkConnection}
                  disabled={isChecking}
                  className="px-6 py-3 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  {isChecking ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Vérifier'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
              <Globe className="w-6 h-6 text-emerald-500" /> Profil Entreprise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nom Business</label>
                  <input 
                    type="text" 
                    value={config.businessName}
                    onChange={(e) => setConfig({...config, businessName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Officiel</label>
                  <input 
                    type="email" 
                    value={config.emailContact}
                    onChange={(e) => setConfig({...config, emailContact: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/2 rounded-3xl p-6 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center">
                 <div className="h-20 w-20 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center mb-4 border-2 border-slate-100 dark:border-white/10">
                    <Camera className="w-10 h-10 text-emerald-600" />
                 </div>
                 <h5 className="font-bold text-slate-800 dark:text-white text-sm">Logo Marvelous</h5>
                 <button className="mt-4 px-4 py-2 bg-slate-900 dark:bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl hover:scale-105 transition-transform">Modifier</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-500" /> Sécurité
            </h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/2 rounded-2xl border border-slate-100 dark:border-white/5 hover:bg-slate-100 transition-colors">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Accès Multi-succursales</span>
                <Globe className="w-4 h-4 text-emerald-500" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/2 rounded-2xl border border-slate-100 dark:border-white/5 hover:bg-slate-100 transition-colors">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Mot de passe</span>
                <Key className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>

          <div className="bg-rose-500/5 p-8 rounded-[2.5rem] border border-rose-500/20">
            <h3 className="text-lg font-bold text-rose-600 mb-2 flex items-center gap-3">
              <Trash2 className="w-5 h-5" /> Zone de danger
            </h3>
            <p className="text-[10px] text-rose-500/70 mb-6 font-medium">La réinitialisation supprimera tous les réglages locaux.</p>
            <button className="w-full py-3 bg-rose-600/10 border border-rose-500/30 text-rose-600 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" /> Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
