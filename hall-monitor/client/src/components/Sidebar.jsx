import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';
import {
  LayoutDashboard, ShieldAlert, ExternalLink, ClipboardCheck, ClipboardList,
  FileText, LogOut, Sun, Moon, ScrollText, Clipboard, Brain
} from 'lucide-react';
import DistrictSwitcher from './DistrictSwitcher';
import NotificationBell from './NotificationBell';

const allNavItems = [
  { path: '/',                label: 'Dashboard',                  icon: LayoutDashboard, roles: ['platform_admin', 'district_it', 'superintendent'] },
  { path: '/risks',           label: 'Findings & Recommendations', icon: ShieldAlert,     roles: ['platform_admin', 'district_it'] },
  { path: '/self-assessment', label: 'Self-Assessment Audit',      icon: ClipboardList,   roles: ['platform_admin', 'district_it'] },
  { path: '/assessment',      label: 'Assessment',                 icon: Clipboard,       roles: ['platform_admin', 'district_it', 'superintendent'] },
  { path: '/ai-governance',   label: 'AI Governance',              icon: Brain,           roles: ['platform_admin', 'district_it', 'superintendent'] },
  { path: '/compliance',      label: 'Governance Compliance',      icon: ClipboardCheck,  roles: ['platform_admin', 'district_it', 'superintendent'] },
  { path: '/executive',       label: 'Executive Summary',          icon: FileText,        roles: ['platform_admin', 'district_it', 'superintendent'] },
  { path: '/audit-log',       label: 'Evaluation History',         icon: ScrollText,      roles: ['platform_admin', 'district_it'] },
];

export default function Sidebar() {
  const { user, activeDistrict, logout } = useAuth();
  const { dark, toggle } = useTheme();

  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;

  const navItems = allNavItems.filter(item => {
    if (!item.roles.includes(user?.role)) return false;
    if (inAdminOverview && item.path === '/executive') return false;
    return true;
  });

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CyberReady" className="w-10 h-10 rounded" />
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">HallMonitor</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">by CyberReady</p>
          </div>
        </div>
      </div>

      {/* District Switcher */}
      <div className="py-2 border-b border-slate-200 dark:border-slate-700">
        <DistrictSwitcher />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeZ2aPcUYbsr4h9c7EbbivgdwwF2quM6nTp81tsCvvUwvYgWQ/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ExternalLink size={18} />
          CoSN Masterclass Interest Form
        </a>
        <button onClick={toggle} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex-1 min-w-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate block">{user?.fullName}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 capitalize">{user?.role?.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-1">
            <NotificationBell />
            <button onClick={logout} className="text-slate-400 hover:text-red-500 p-1" title="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
