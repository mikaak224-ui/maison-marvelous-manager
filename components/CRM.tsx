
import React, { useState, useEffect } from 'react';
import { Customer, Interaction, GalleryLink, Branch } from '../types';
import { supabase } from '../services/supabaseClient';
import { 
  Users, Search, UserPlus, Filter, Mail, Phone, 
  Calendar, History, ChevronRight, Lock, Copy, 
  UserCheck, AlertCircle
} from 'lucide-react';

interface Props {
  branch: Branch;
}

const CRM: React.FC<Props> = ({ branch }) => {
  const [activeTab, setActiveTab] = useState<'database' | 'portal' | 'interactions'>('database');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, [branch]);

  async function fetchCustomers() {
    try {
      setLoading(true);
      setErrorMessage(null);
      let query = supabase.from('customers').select('*').order('name');
      
      if (branch !== 'Global') {
        query = query.eq('branch', branch);
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      if (data) setCustomers(data as any);
    } catch (e: any) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  const renderDatabase = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher un client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 glass dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          />
        </div>
        <button className="flex-1 md:flex-none px-6 py-4 bg-emerald-600 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-xl shadow-emerald-900/20">
          <UserPlus className="w-4 h-4" /> Nouveau Client
        </button>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-bold">Erreur : {errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-24 glass rounded-3xl"></div>)}
            </div>
          ) : customers.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center glass rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-white/5">
              <Users className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">Aucun client trouvé pour {branch === 'Global' ? 'le Groupe' : branch}.</p>
            </div>
          ) : (
            customers
              .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(customer => (
              <div 
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`glass dark:bg-slate-900/40 p-6 rounded-[2rem] border-2 transition-all cursor-pointer group ${
                  selectedCustomer?.id === customer.id ? 'border-emerald-500 shadow-xl' : 'border-slate-100 dark:border-white/5 shadow-sm hover:border-emerald-500/30'
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-5">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-xl ${
                      customer.branch === 'Cameroun' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{customer.name}</h4>
                      <p className="text-[10px] font-black uppercase text-slate-400 mt-2">{customer.branch} • {customer.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
            <UserCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Client Relationship</span>
        </div>
        <h2 className="text-5xl font-display font-bold text-slate-900 dark:text-white">Elegance CRM</h2>
        <p className="text-slate-500 mt-2 font-medium italic">Base de données clients unifiée {branch === 'Global' ? 'France & Cameroun' : branch}.</p>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'database' && renderDatabase()}
      </div>
    </div>
  );
};

export default CRM;
