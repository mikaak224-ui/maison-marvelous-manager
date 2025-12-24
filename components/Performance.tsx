
import React, { useState, useEffect } from 'react';
import { getPerformanceInsights } from '../services/geminiService';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Cell, PieChart, Pie, Legend, LineChart, Line
} from 'recharts';
import { 
  Brain, Sparkles, Loader2, TrendingUp, DollarSign, Clock, 
  CheckCircle2, AlertTriangle, Filter, Calendar, Target,
  ArrowUpRight, ArrowDownRight, Zap, ShieldAlert, Award,
  ChevronRight
} from 'lucide-react';
import { Branch } from '../types';

interface Props {
  branch: Branch;
}

const financialData = [
  { month: 'Jan', mariage: 12000, studio: 4500, goal: 15000 },
  { month: 'Fév', mariage: 9500, studio: 5200, goal: 15000 },
  { month: 'Mar', mariage: 18000, studio: 4800, goal: 20000 },
  { month: 'Avr', mariage: 15500, studio: 6100, goal: 20000 },
  { month: 'Mai', mariage: 22000, studio: 7500, goal: 25000 },
];

const deliveryKPIs = [
  { type: 'Teaser (7j)', actual: 5.2, target: 7, status: 'Excellence' },
  { type: 'Film Long (30j)', actual: 34.5, target: 30, status: 'Delay' },
  { type: 'Album (15j)', actual: 12.1, target: 15, status: 'Good' },
  { type: 'Retouches (3j)', actual: 1.8, target: 3, status: 'Excellence' },
];

const radarData = [
  { subject: 'Efficacité', A: 120, B: 110, fullMark: 150 },
  { subject: 'Vitesse', A: 98, B: 130, fullMark: 150 },
  { subject: 'Satisfaction', A: 140, B: 130, fullMark: 150 },
  { subject: 'Créativité', A: 110, B: 100, fullMark: 150 },
  { subject: 'Rigueur', A: 85, B: 90, fullMark: 150 },
];

const Performance: React.FC<Props> = ({ branch }) => {
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'finance' | 'ops' | 'alerts'>('finance');

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      const res = await getPerformanceInsights({ financialData, deliveryKPIs, radarData });
      setInsights(res);
      setIsLoading(false);
    };
    fetchInsights();
  }, []);

  const renderFinance = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10"><DollarSign className="w-16 h-16" /></div>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">CA Global Mai</p>
           <h4 className="text-4xl font-black text-slate-800">29,500 €</h4>
           <div className="flex items-center gap-2 mt-4 text-emerald-500 font-bold text-xs">
              <ArrowUpRight className="w-4 h-4" /> +15.4% vs Avril
           </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Performance Objectif</p>
           <h4 className="text-4xl font-black text-slate-800">118%</h4>
           <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-full"></div>
           </div>
           <p className="text-[10px] text-slate-400 mt-2">Objectif: 25,000 € • <strong>Atteint</strong></p>
        </div>
        <div className="bg-slate-900 p-8 rounded-3xl text-white">
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Marge Nette Est.</p>
           <h4 className="text-4xl font-black">62%</h4>
           <div className="flex items-center gap-2 mt-4 text-emerald-400 font-bold text-xs">
              Optimisation matériel efficace
           </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-10">
           <div>
              <h3 className="text-xl font-bold text-slate-800">Segmentation des Revenus</h3>
              <p className="text-sm text-slate-400 italic">Mariage vs Studio vs Objectifs</p>
           </div>
           <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Mariage
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div> Studio
              </div>
           </div>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="mariage" fill="#10b981" radius={[10, 10, 0, 0]} barSize={40} />
              <Bar dataKey="studio" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderOps = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <Clock className="w-6 h-6 text-indigo-500" /> Vitesse de Livraison
          </h3>
          <div className="space-y-8">
            {deliveryKPIs.map(kpi => (
              <div key={kpi.type}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-700">{kpi.type}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                    kpi.status === 'Excellence' ? 'bg-emerald-50 text-emerald-600' :
                    kpi.status === 'Good' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                  }`}>{kpi.actual} jours</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      kpi.actual <= kpi.target ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} 
                    style={{ width: `${Math.min((kpi.actual / kpi.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="relative w-48 h-48 mb-6">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-4xl font-black text-slate-800">89%</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Pass</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{value: 89}, {value: 11}]}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#f1f5f9" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <h4 className="text-xl font-bold text-slate-800">Taux de Validation Directe</h4>
          <p className="text-sm text-slate-400 max-w-[250px] mt-2">Pourcentage de projets livrés sans demande de retouches client.</p>
          <div className="mt-6 flex gap-4">
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
               <span className="text-xs font-bold text-slate-600">Objectif: 85%</span>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-[500px]">
        <h3 className="text-xl font-bold text-slate-800 mb-8">Analyse Radiale des Talents</h3>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#f1f5f9" />
            <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Studio" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            <Radar name="Mariage" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
            <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-rose-50 border border-rose-100 p-8 rounded-[2rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 text-rose-200 opacity-20"><ShieldAlert className="w-24 h-24" /></div>
           <h4 className="text-rose-600 font-black text-xl mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> Alertes Critiques
           </h4>
           <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-rose-100">
                <p className="text-xs font-bold text-slate-800">Projet 'Amélie & Thomas'</p>
                <p className="text-[10px] text-rose-500 font-bold uppercase mt-1">Retard Teaser: 3 jours</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-rose-100">
                <p className="text-xs font-bold text-slate-800">Inventaire Matériel</p>
                <p className="text-[10px] text-rose-500 font-bold uppercase mt-1">Red Komodo 6K : Panne critique</p>
              </div>
           </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 text-amber-200 opacity-20"><Zap className="w-24 h-24" /></div>
           <h4 className="text-amber-600 font-black text-xl mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" /> Opportunités IA
           </h4>
           <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100">
                <p className="text-xs font-bold text-slate-800">Optimisation Flux</p>
                <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">Assigner Alex Riva au pôle Mariage augmenterait la satisfaction de 12%</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100">
                <p className="text-xs font-bold text-slate-800">Marketing Studio</p>
                <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">Le ROI du pôle 'Maternité' justifie un doublement du budget Ads</p>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
         <h3 className="font-bold text-slate-800 mb-6">Journal d'Efficacité Hebdomadaire</h3>
         <div className="space-y-4">
            {[
              { time: 'Il y a 2h', msg: 'Objectif CA trimestriel atteint avec 15 jours d\'avance.', type: 'success' },
              { time: 'Hier', msg: 'Alerte : Le délai de post-prod sur les films longs dérive de +4.5j.', type: 'warning' },
              { time: '21 Mai', msg: 'Nouveau record de satisfaction client : 5.0/5 sur 12 sessions consécutives.', type: 'success' },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                 <div className={`w-2 h-2 rounded-full ${log.type === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                 <div className="flex-1">
                   <p className="text-sm text-slate-700 font-medium">{log.msg}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">{log.time}</p>
                 </div>
                 <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors" />
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Strategic Intelligence</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-slate-800">Elegance Insights</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Pilotage haute performance & Analyse prédictive.</p>
        </div>
        
        <div className="flex bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm w-full lg:w-auto overflow-x-auto no-scrollbar scroll-smooth">
          <button 
            onClick={() => setActiveTab('finance')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'finance' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Finances
          </button>
          <button 
            onClick={() => setActiveTab('ops')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'ops' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ActivityIcon className="w-4 h-4" /> Opérations
          </button>
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'alerts' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" /> Alertes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 min-h-[600px]">
          {activeTab === 'finance' && renderFinance()}
          {activeTab === 'ops' && renderOps()}
          {activeTab === 'alerts' && renderAlerts()}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-indigo-600 to-emerald-600 p-1 rounded-[2.5rem] shadow-2xl sticky top-4">
            <div className="bg-white p-8 rounded-[2.3rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Brain className="w-32 h-32" />
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-amber-500" />
                 Elegance AI Counselor
               </h3>

               {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-20 gap-4">
                   <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                   <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Synthèse stratégique...</p>
                 </div>
               ) : (
                 <div className="space-y-6">
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm font-medium">
                      {insights}
                    </div>
                    <div className="pt-6 border-t border-slate-50">
                       <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Actions Recommandées</h5>
                       <div className="space-y-3">
                          <button className="w-full text-left p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-slate-900 hover:text-white transition-all">
                             <span className="text-xs font-bold">Optimiser le planning d'Alex Riva</span>
                             <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                          <button className="w-full text-left p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-slate-900 hover:text-white transition-all">
                             <span className="text-xs font-bold">Lancer promo Studio 'Maternité'</span>
                             <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

export default Performance;
