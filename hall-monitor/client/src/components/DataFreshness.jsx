import { Clock } from 'lucide-react';

function timeAgo(dateStr) {
  if (!dateStr) return 'Unknown';
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function DataFreshness({ updatedAt, sourceType, className = '' }) {
  if (!updatedAt && !sourceType) return null;

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 ${className}`}>
      <Clock size={10} />
      {updatedAt && <span>{timeAgo(updatedAt)}</span>}
      {sourceType && <span className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-700">{sourceType}</span>}
    </span>
  );
}
