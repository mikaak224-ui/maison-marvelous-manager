
import React, { useState } from 'react';
import { getMarketingIdeas, getHashtags } from '../services/geminiService';
import { 
  Megaphone, Send, Sparkles, Loader2, Target, Globe, Instagram, 
  Calendar, Layers, Tag, Copy, Plus, ChevronRight, TrendingUp, 
  DollarSign, Activity, Facebook, Video, Image as ImageIcon,
  Share2, BarChart2, PieChart as PieChartIcon, Search, MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, Legend
} from 'recharts';
import { ContentPost, MarketingTemplate, CampaignROI, Branch } from '../types';

type MarketingSubTab = 'strategy' | 'calendar' | 'creation' | 'roi';

interface Props {
  branch: Branch;
}

const scheduledPosts: ContentPost[] = [
  { id: '1', platform: 'Instagram', title: 'Teaser Mariage Amélie', date: '2024-05-20', status: 'Scheduled', type: 'Video/Reel', content: 'Un moment magique au château...' },
  { id: '2', platform: 'TikTok', title: 'BTS Shooting Mode', date: '2024-05-21', status: 'Draft', type: 'Video/Reel', content: 'Les coulisses de notre dernière session...' },
  { id: '3', platform: 'Facebook', title: 'Témoignage Client', date: '2024-05-18', status: 'Published', type: 'Photo', content: 'Merci à la famille Belmont pour leur confiance.' },
];

const templates: MarketingTemplate[] = [
  { id: '1', title: 'Offre Early Bird', category: 'Promotion', body: 'Réservez votre séance 6 mois à l\'avance et bénéficiez de -15% sur votre album prestige.' },
  { id: '2', title: 'Conseil Lumière', category: 'Tips', body: 'La "Golden Hour" est le secret d\'un portrait réussi. Voici comment en profiter...' },
  { id: '3', title: 'Behind The Lens', category: 'BehindTheScenes', body: 'Saviez-vous que nous utilisons 3 types d\'éclairage pour un simple portrait studio ?' },
];

const roiData: CampaignROI[] = [
  { month: 'Jan', adSpend: 450, revenue: 2800, leads: 12 },
  { month: 'Feb', adSpend: 600, revenue: 4200, leads: 18 },
  { month: 'Mar', adSpend: 800, revenue: 6500, leads: 25 },
  { month: 'Apr', adSpend: 550, revenue: 5100, leads: 15 },
  { month: 'May', adSpend: 900, revenue: 8400, leads: 32 },
];

const Marketing: React.FC<Props> = ({ branch }) => {
  const [activeTab, setActiveTab] = useState<MarketingSubTab>('strategy');
  const [prompt, setPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [hashtagPrompt, setHashtagPrompt] = useState('');
  const [hashtagResult, setHashtagResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false);

  const handleGenerateStrategy = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    const ideas = await getMarketingIdeas(prompt);
    setAiResult(ideas);
    setIsGenerating(false);
  };

  const handleGenerateHashtags = async () => {
    if (!hashtagPrompt.trim()) return;
    setIsGeneratingHashtags(true);
    const tags = await getHashtags(hashtagPrompt);
    setHashtagResult(tags);
    setIsGeneratingHashtags(false);
  };

  const renderStrategy = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            Stratégie de Campagne AI
          </h3>
          <p className="text-xs text-slate-400 mb-6 font-medium">L'IA analyse votre niche pour proposer des angles d'attaque percutants.</p>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Lancement d'une offre été pour les mariages à la plage..."
            className="w-full h-40 p-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none transition-all placeholder:text-slate-300"
          />
          <button 
            onClick={handleGenerateStrategy}
            disabled={isGenerating || !prompt}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Générer le Brief Stratégique
          </button>
        </div>

        <div className="bg-emerald-600 p-8 rounded-[2rem] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
            <Target className="w-32 h-32" />
          </div>
          <h4 className="font-bold text-xl mb-2">KPI Marketing</h4>
          <p className="text-emerald-100 text-xs mb-6">Objectifs mensuels vs Réel</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-1.5">
                <span>Reach Social</span>
                <span>85%</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[85%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-1.5">
                <span>Conversion Leads</span>
                <span>42%</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[42%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-900 text-white rounded-2xl">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Recommandations Stratégiques</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Généré par Elegance AI</p>
              </div>
            </div>
            {aiResult && <button className="p-2 hover:bg-slate-50 rounded-xl"><Share2 className="w-5 h-5 text-slate-300" /></button>}
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {aiResult ? (
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                {aiResult}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-12">
                <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                   <Sparkles className="w-10 h-10 text-slate-200" />
                </div>
                <h5 className="text-lg font-bold text-slate-800 mb-2">Prêt à dominer le marché ?</h5>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">Saisissez un objectif à gauche pour que l'IA élabore votre prochain plan de conquête.</p>
              </div>
            )}
          </div>

          {aiResult && (
            <div className="mt-8 flex gap-3 pt-6 border-t border-slate-50">
              <button className="flex-1 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors text-sm">
                Copier les idées
              </button>
              <button className="flex-1 items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 text-sm flex">
                Lancer la Campagne <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Planning Éditorial</h3>
          <p className="text-sm text-slate-500">Coordination multi-plateformes de vos publications.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Vue Mois
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nouveau Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scheduledPosts.map(post => (
          <div key={post.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${
                  post.platform === 'Instagram' ? 'bg-pink-50 text-pink-600 border-pink-100' :
                  post.platform === 'TikTok' ? 'bg-slate-900 text-white border-slate-900' :
                  'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                  {post.platform === 'Instagram' ? <Instagram className="w-3.5 h-3.5" /> : post.platform === 'TikTok' ? <Video className="w-3.5 h-3.5" /> : <Facebook className="w-3.5 h-3.5" />}
                  {post.platform}
                </div>
                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                  post.status === 'Published' ? 'bg-emerald-50 text-emerald-600' :
                  post.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {post.status}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h4>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{post.content}</p>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4" /> {post.type}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform">
               <button className="flex-1 py-2 bg-white text-slate-600 text-[10px] font-bold rounded-lg border border-slate-200">Éditer</button>
               <button className="flex-1 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg">Approuver</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreation = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Générateur de Hashtags</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Optimisé pour l'Engagement</p>
            </div>
          </div>
          <textarea 
            value={hashtagPrompt}
            onChange={(e) => setHashtagPrompt(e.target.value)}
            placeholder="Décrivez votre post (ex: Séance photo nouveau-né au studio...)"
            className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
          />
          <button 
            onClick={handleGenerateHashtags}
            disabled={isGeneratingHashtags || !hashtagPrompt}
            className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl"
          >
            {isGeneratingHashtags ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Générer Hashtags
          </button>

          {hashtagResult && (
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
              <button className="absolute top-4 right-4 p-2 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4 text-slate-400" />
              </button>
              <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                {hashtagResult}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          Bibliothèque de Templates
        </h3>
        {templates.map(tpl => (
          <div key={tpl.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                tpl.category === 'Promotion' ? 'bg-amber-50 text-amber-600' :
                tpl.category === 'Tips' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {tpl.category}
              </span>
              <button className="text-slate-300 group-hover:text-slate-900 transition-colors"><Copy className="w-4 h-4" /></button>
            </div>
            <h4 className="font-bold text-slate-800 mb-2">{tpl.title}</h4>
            <p className="text-sm text-slate-500 italic">"{tpl.body}"</p>
          </div>
        ))}
        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-sm hover:border-emerald-500 hover:text-emerald-500 transition-all flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Créer un nouveau template
        </button>
      </div>
    </div>
  );

  const renderROI = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18%
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Dépense Pub (Ads)</p>
          <h4 className="text-3xl font-black text-slate-800">3,300 €</h4>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24%
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">CA Généré Marketing</p>
          <h4 className="text-3xl font-black text-slate-800">27,000 €</h4>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 text-white rounded-2xl">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Coût d'Acquisition (CAC)</p>
          <h4 className="text-3xl font-black">28.12 €</h4>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Performance ROI</h3>
            <p className="text-sm text-slate-400">Suivi mensuel des conversions et du budget publicitaire.</p>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
               <span className="text-xs font-bold text-slate-500">Revenus</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-blue-500"></div>
               <span className="text-xs font-bold text-slate-500">Dépenses Ads</span>
             </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={roiData}>
              <defs>
                <linearGradient id="colorRevM" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevM)" />
              <Area type="monotone" dataKey="adSpend" stroke="#3b82f6" strokeWidth={3} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Growth & Influence</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-slate-800">Centre Marketing</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Dominez les réseaux sociaux et optimisez votre ROI.</p>
        </div>
        
        <div className="flex bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm w-full lg:w-auto overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'strategy' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Stratégie AI
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'calendar' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4" /> Calendrier Editorial
          </button>
          <button 
            onClick={() => setActiveTab('creation')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'creation' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Plus className="w-4 h-4" /> Création Contenu
          </button>
          <button 
            onClick={() => setActiveTab('roi')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'roi' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Tracker ROI
          </button>
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'strategy' && renderStrategy()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'creation' && renderCreation()}
        {activeTab === 'roi' && renderROI()}
      </div>
    </div>
  );
};

export default Marketing;
