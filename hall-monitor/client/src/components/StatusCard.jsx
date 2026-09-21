import {
  Shield, Fish, GraduationCap, AlertTriangle, AlertCircle, Info,
  Calendar, Activity
} from 'lucide-react';

const iconMap = {
  shield: Shield, fish: Fish, 'graduation-cap': GraduationCap,
  'alert-triangle': AlertTriangle, 'alert-circle': AlertCircle,
  info: Info, calendar: Calendar, activity: Activity,
};

export default function StatusCard({ label, value, icon, className = '' }) {
  const Icon = iconMap[icon] || Info;
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-4 ${className}`}>
      <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}
