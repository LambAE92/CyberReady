import { useEffect, useRef, useState } from 'react';
import { api } from '../utils/api';
import { Bell, X } from 'lucide-react';

export default function NotificationBell() {
  const [alerts, setAlerts] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    api.notifications().then(setAlerts).catch(() => {});
    const interval = setInterval(() => {
      api.notifications().then(setAlerts).catch(() => {});
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const totalCount = alerts.length;

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Notifications"
      >
        <Bell size={18} />
        {totalCount > 0 && (
          <span className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white ${
            criticalCount > 0 ? 'bg-red-500' : 'bg-amber-500'
          }`}>
            {totalCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 w-72 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Alerts</p>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          {alerts.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-slate-400">No active alerts</div>
          ) : (
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
              {alerts.map((a, i) => (
                <div key={i} className="px-4 py-3 flex items-start gap-3">
                  <span className={`flex-shrink-0 w-2 h-2 mt-1.5 rounded-full ${
                    a.type === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                  }`} />
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{a.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
