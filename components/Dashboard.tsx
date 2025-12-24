
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, Calendar, Users, Star, ArrowUpRight, Globe } from 'lucide-react';
import { Branch } from '../types';

interface Props {
  branch: Branch;
}

const data = [
  { name: 'Jan', revenue: 4000, bookings: 12 },
  { name: 'Feb', revenue: 3000, bookings: 10 },
  { name: 'Mar', revenue: 5000, bookings: 18 },
  { name: 'Apr', revenue: 8000, bookings: 25 },
  { name: 'May', revenue: 9500, bookings: 30 },
  { name: 'Jun', revenue: 12000, bookings: 42 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
const pieData = [
  { name: 'Mariages', value: 55 },
  { name: 'Studio', value: 30 },
  { name: 'Events', value: 15 },
];

const StatCard = ({ title, value, change, icon: Icon, colorClass }: any) => (
  <div className="bg-white dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-emerald-500/20 transition-all group shadow-sm dark:shadow-none">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${colorClass} bg-opacity-20 text-white shadow-lg`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
        <ArrowUpRight className="w-4 h-4" />
        {change}
      </div>
    </div>
    <h3 className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</h3>
    <p className="text-3xl font-black text-slate-900 dark:text-white">{value}</p>
  </div>
);

const Dashboard: React.FC<Props> = ({ branch }) => {
  const isDark = document.documentElement.classList.contains('dark');

  const formatValue = (val: number) => {
    if (branch === 'Cameroun') return (val * 655).toLocaleString() + ' XAF';
    return val.toLocaleString() + ' €';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-display font-bold text-slate-900 dark:text-white">La Maison Marvelous</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Vue d'ensemble : Succursale {branch}.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm">
            Rapport PDF
          </button>
          <button className="px-6 py-3 bg-emerald-600 rounded-2xl text-xs font-bold text-white shadow-xl shadow-emerald-900/20 transition-all">
            Nouveau Projet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Chiffre d'affaires" value={formatValue(45280)} change="+12.5%" icon={DollarSign} colorClass="bg-emerald-600" />
        <StatCard title="Prochains Mariages" value="24" change="+2" icon={Calendar} colorClass="bg-blue-600" />
        <StatCard title="Clients Actifs" value="156" change="+8.2%" icon={Users} colorClass="bg-amber-600" />
        <StatCard title="Note Moyenne" value="4.9/5" change="+0.1" icon={Star} colorClass="bg-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Flux de Trésorerie ({branch})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}
                  itemStyle={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 flex flex-col items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8 self-start">Segmentation</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full mt-6 space-y-4">
            {pieData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
