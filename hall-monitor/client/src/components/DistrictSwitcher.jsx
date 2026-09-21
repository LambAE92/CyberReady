import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { api } from '../utils/api';
import { Building2, ChevronDown, LayoutGrid } from 'lucide-react';

export default function DistrictSwitcher() {
  const { user, activeDistrict, switchDistrict } = useAuth();
  const [districts, setDistricts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user?.role === 'platform_admin') {
      api.districts().then(setDistricts);
    }
  }, [user]);

  const isAdmin = user?.role === 'platform_admin';
  const inOverview = isAdmin && !activeDistrict;

  if (!isAdmin) {
    return activeDistrict ? (
      <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-2">
        <Building2 size={14} />
        {activeDistrict.name}
      </div>
    ) : null;
  }

  const label = inOverview ? 'Admin Overview' : (activeDistrict?.name || 'Select district');
  const Icon = inOverview ? LayoutGrid : Building2;

  return (
    <div className="relative px-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <Icon size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <span className="truncate flex-1 text-left text-xs font-medium">{label}</span>
        <ChevronDown size={14} className={`transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-2 right-2 top-full mt-1 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {/* Admin Overview option */}
          <button
            onClick={() => { switchDistrict(null); setOpen(false); window.location.reload(); }}
            className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-b border-slate-100 dark:border-slate-700 ${
              inOverview ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <p className="font-medium flex items-center gap-1.5"><LayoutGrid size={12} /> Admin Overview</p>
            <p className="text-slate-400 dark:text-slate-500">All districts · cross-portfolio metrics</p>
          </button>
          {districts.map(d => (
            <button
              key={d.id}
              onClick={() => { switchDistrict(d.id); setOpen(false); window.location.reload(); }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                d.id === activeDistrict?.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <p className="font-medium">{d.name}</p>
              <p className="text-slate-400 dark:text-slate-500">{d.state} · {d.student_count?.toLocaleString()} students</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
