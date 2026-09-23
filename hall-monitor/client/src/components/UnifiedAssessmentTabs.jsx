import { useCallback, useEffect, useMemo, useState } from 'react';
import { Brain, CheckCircle, ChevronDown, ChevronRight, ClipboardList, FileText, ShieldCheck } from 'lucide-react';
import { api } from '../utils/api';
import { RUBRIC_FUNCTIONS, MATURITY_LEVELS, NIST_FUNCTION_COLORS } from '../data/rubricData';
import { CAGR_FUNCTIONS } from '../data/cagrData';
import { getPlaybookForCategory } from '../data/aiRmfPlaybook';
import CCRRPanel from './CCRRPanel';

const LEVEL_COLORS = {
  1: '#dc2626',
  2: '#f97316',
  3: '#f59e0b',
  4: '#2563eb',
  5: '#16a34a',
};

const LEVEL_NAMES = {
  1: 'Initial',
  2: 'Repeatable',
  3: 'Defined',
  4: 'Managed',
  5: 'Optimized',
};

const CCRE_TOTAL = RUBRIC_FUNCTIONS.reduce((sum, fn) => sum + fn.categories.length, 0);
const CAGR_TOTAL = CAGR_FUNCTIONS.reduce((sum, fn) => sum + fn.categories.length, 0);

function average(values) {
  const nums = values.filter(value => Number(value) > 0);
  return nums.length ? nums.reduce((sum, value) => sum + Number(value), 0) / nums.length : 0;
}

function scoreTextColor(score) {
  if (!score) return 'text-slate-400';
  if (score >= 4) return 'text-green-600 dark:text-green-400';
  if (score >= 3) return 'text-blue-600 dark:text-blue-400';
  if (score >= 2) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

function scoreHex(score) {
  if (!score) return '#94a3b8';
  if (score >= 4) return '#16a34a';
  if (score >= 3) return '#2563eb';
  if (score >= 2) return '#d97706';
  return '#dc2626';
}

function ScoreRing({ score, size = 100 }) {
  const pct = Math.max(0, Math.min(100, ((score || 0) / 5) * 100));
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="10"
          className="stroke-slate-200 dark:stroke-slate-700" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="10"
          stroke={scoreHex(score)} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{score ? score.toFixed(1) : '0.0'}</span>
        <span className="text-[10px] uppercase tracking-wide text-slate-400">of 5.0</span>
      </div>
    </div>
  );
}

function parseCagrNotes(notes) {
  if (!notes) return '';
  try {
    const parsed = JSON.parse(notes);
    return parsed.assessmentNotes || parsed.notes || '';
  } catch {
    return notes;
  }
}

function stringifyCagrNotes(assessmentNotes) {
  return JSON.stringify({ assessmentNotes: assessmentNotes || '', evidenceText: '', evidenceUrl: '' });
}

function buildStats(functions, getLevel) {
  const functionScores = {};
  const functionCounts = {};
  let totalRated = 0;

  functions.forEach(fn => {
    const levels = fn.categories.map(cat => getLevel(fn, cat)).filter(Boolean);
    totalRated += levels.length;
    functionScores[fn.key] = average(levels);
    functionCounts[fn.key] = { completed: levels.length, total: fn.categories.length };
  });

  const activeScores = Object.values(functionScores).filter(Boolean);
  return {
    functionScores,
    functionCounts,
    totalRated,
    overall: average(activeScores),
  };
}

function CategoryCard({
  fn,
  category,
  level,
  note,
  canEdit,
  onLevelChange,
  onNoteChange,
  onNoteBlur,
  showPlaybook = false,
}) {
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [showPlaybookActions, setShowPlaybookActions] = useState(false);
  const advancement = category.advancement?.find(item => item.from === level);
  const playbookEntries = showPlaybook ? getPlaybookForCategory(category.id) : [];
  const selectedDescription = level ? category.levels?.[String(level)] : null;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {category.id ? `${category.id} · ${category.nistRef}` : fn.key}
          </p>
          <h4 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{category.name}</h4>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
          level ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
        }`}>
          {level ? `Level ${level}: ${LEVEL_NAMES[level]}` : 'Not Rated'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map(candidate => (
          <button
            key={`${fn.key}-${category.name}-${candidate}`}
            disabled={!canEdit}
            onClick={() => onLevelChange(candidate)}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-60 ${
              level === candidate
                ? 'text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-transparent hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
            style={level === candidate ? { backgroundColor: LEVEL_COLORS[candidate], borderColor: LEVEL_COLORS[candidate] } : undefined}
          >
            {candidate}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Selected Maturity Description</p>
        {selectedDescription ? (
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{selectedDescription}</p>
        ) : (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Select the highest maturity level that is fully supported by evidence.
          </p>
        )}
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/20">
        <button
          onClick={() => setShowDescriptions(value => !value)}
          className="w-full px-4 py-3 flex items-center justify-between text-left text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          <span>View all five maturity descriptions</span>
          {showDescriptions ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {showDescriptions && (
          <div className="px-4 pb-4 space-y-3">
            {Object.entries(category.levels || {}).map(([descriptionLevel, description]) => (
              <div key={`${category.name}-${descriptionLevel}`} className="rounded-lg bg-slate-50 dark:bg-slate-900/40 p-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Level {descriptionLevel}: {LEVEL_NAMES[descriptionLevel]}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Evidence and assessment notes
        </label>
        <textarea
          value={note}
          disabled={!canEdit}
          onChange={event => onNoteChange(event.target.value)}
          onBlur={onNoteBlur}
          rows={3}
          placeholder="Document the evidence, interview notes, gaps, or rationale that support this rating."
          className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white disabled:opacity-60"
        />
      </div>

      {level && level < 5 && advancement && (
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-sm text-blue-900 dark:text-blue-200">
          <p className="font-semibold mb-2">To advance to Level {level + 1}:</p>
          <ul className="list-disc pl-5 space-y-1">
            {advancement.steps.map(step => <li key={step}>{step}</li>)}
          </ul>
        </div>
      )}

      {showPlaybook && (
        <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setShowPlaybookActions(value => !value)}
            className="w-full px-4 py-3 flex items-center justify-between text-left font-medium"
          >
            <span>NIST Playbook Actions</span>
            {showPlaybookActions ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {showPlaybookActions && (
            <div className="px-4 pb-4 space-y-4">
              {playbookEntries.map(entry => (
                <div key={entry.title}>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mb-1">
                    {entry.title}: {entry.description}
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {entry.actions.map(action => <li key={action}>{action}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RubricSections({ functions, stats, expanded, setExpanded, getLevel, getNote, canEdit, onLevelChange, onNoteChange, onNoteBlur, showPlaybook }) {
  return (
    <div className="space-y-4">
      {functions.map(fn => {
        const open = expanded[fn.key] ?? fn.key === functions[0].key;
        const score = stats.functionScores[fn.key];
        const counts = stats.functionCounts[fn.key];
        return (
          <div key={fn.key} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
            <button
              onClick={() => setExpanded(prev => ({ ...prev, [fn.key]: !open }))}
              className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30"
              style={{ borderLeft: `4px solid ${fn.color || NIST_FUNCTION_COLORS[fn.key] || '#3b82f6'}` }}
            >
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{fn.name}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {counts.completed}/{counts.total} categories assessed
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {fn.levelDescriptions?.['3'] || 'Review category maturity and evidence for this function.'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${scoreTextColor(score)}`}>
                  {score ? score.toFixed(1) : '--'}
                </span>
                {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
            </button>
            {open && (
              <div className="border-t border-slate-200 dark:border-slate-700 p-5 space-y-4 bg-slate-50/50 dark:bg-slate-900/20">
                {fn.categories.map(category => (
                  <CategoryCard
                    key={category.id || category.name}
                    fn={fn}
                    category={category}
                    level={getLevel(fn, category)}
                    note={getNote(fn, category)}
                    canEdit={canEdit}
                    onLevelChange={level => onLevelChange(fn, category, level)}
                    onNoteChange={value => onNoteChange(fn, category, value)}
                    onNoteBlur={() => onNoteBlur(fn, category)}
                    showPlaybook={showPlaybook}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SummaryHeader({ title, description, score, stats, total, saveStatus, functions }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr,auto] gap-6 items-center">
        <ScoreRing score={score} />
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {functions.map(fn => (
              <span key={fn.key} className="rounded-full px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {fn.key}: {stats.functionScores[fn.key] ? stats.functionScores[fn.key].toFixed(1) : '--'}
              </span>
            ))}
          </div>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span>{stats.totalRated} of {total} categories assessed</span>
          </div>
          <div className="flex items-center gap-2">
            <ClipboardList size={16} className="text-blue-600" />
            <span>{saveStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CCREAssessmentPanel() {
  const [ratings, setRatings] = useState({});
  const [notes, setNotes] = useState({});
  const [saveStatus, setSaveStatus] = useState('Loading');
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    api.selfAssessment()
      .then(data => {
        setRatings(data?.ratings || {});
        setNotes(data?.notes || {});
        setSaveStatus('All changes saved');
      })
      .catch(() => setSaveStatus('Unable to load saved cybersecurity-governance assessment'));
  }, []);

  const saveAssessment = useCallback((nextRatings, nextNotes) => {
    setSaveStatus('Saving');
    api.saveSelfAssessment({
      timeframe: '2025-26',
      ratings: nextRatings,
      notes: nextNotes,
      status: 'in_progress',
    })
      .then(() => setSaveStatus('All changes saved'))
      .catch(() => setSaveStatus('Save error'));
  }, []);

  const getKey = (fn, category) => `${fn.name}::${category.name}`;
  const getLevel = (fn, category) => ratings[getKey(fn, category)] || 0;
  const getNote = (fn, category) => notes[getKey(fn, category)] || '';

  const stats = useMemo(() => buildStats(RUBRIC_FUNCTIONS, getLevel), [ratings]);

  const handleLevelChange = (fn, category, level) => {
    const key = getKey(fn, category);
    const nextRatings = { ...ratings, [key]: level };
    setRatings(nextRatings);
    saveAssessment(nextRatings, notes);
  };

  const handleNoteChange = (fn, category, value) => {
    const key = getKey(fn, category);
    setNotes(prev => ({ ...prev, [key]: value }));
    setSaveStatus('Unsaved changes');
  };

  const handleNoteBlur = (fn, category) => {
    const key = getKey(fn, category);
    saveAssessment(ratings, { ...notes, [key]: notes[key] || '' });
  };

  return (
    <div className="space-y-6">
      <SummaryHeader
        title="Cybersecurity Governance Self-Assessment"
        description="Use CyberReady's CCRE-aligned workflow to document cybersecurity maturity across GOVERN, IDENTIFY, PROTECT, DETECT, RESPOND, and RECOVER."
        score={stats.overall}
        stats={stats}
        total={CCRE_TOTAL}
        saveStatus={saveStatus}
        functions={RUBRIC_FUNCTIONS}
      />
      <RubricSections
        functions={RUBRIC_FUNCTIONS}
        stats={stats}
        expanded={expanded}
        setExpanded={setExpanded}
        getLevel={getLevel}
        getNote={getNote}
        canEdit
        onLevelChange={handleLevelChange}
        onNoteChange={handleNoteChange}
        onNoteBlur={handleNoteBlur}
      />
    </div>
  );
}

function CAGRAssessmentPanel() {
  const [systems, setSystems] = useState([]);
  const [selectedSystemId, setSelectedSystemId] = useState('');
  const [ratings, setRatings] = useState({ GOVERN: {}, MAP: {}, MEASURE: {}, MANAGE: {} });
  const [saveStatus, setSaveStatus] = useState('Loading');
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    api.aiSystems()
      .then(data => {
        setSystems(data || []);
        if (data?.length) setSelectedSystemId(current => current || String(data[0].id));
      })
      .catch(() => setSaveStatus('Unable to load AI systems'));
  }, []);

  useEffect(() => {
    if (!selectedSystemId) return;
    setSaveStatus('Loading');
    api.aiSystemRatings(selectedSystemId)
      .then(data => {
        setRatings(data.ratings || { GOVERN: {}, MAP: {}, MEASURE: {}, MANAGE: {} });
        setSaveStatus('All changes saved');
      })
        .catch(() => setSaveStatus('Unable to load saved CAIRE assessment'));
  }, [selectedSystemId]);

  const selectedSystem = systems.find(system => String(system.id) === String(selectedSystemId));
  const getLevel = (fn, category) => ratings[fn.key]?.[category.id]?.maturity_level || 0;
  const getNote = (fn, category) => parseCagrNotes(ratings[fn.key]?.[category.id]?.notes);

  const stats = useMemo(() => buildStats(CAGR_FUNCTIONS, getLevel), [ratings]);

  const updateRating = (fn, category, patch) => {
    setRatings(prev => ({
      ...prev,
      [fn.key]: {
        ...(prev[fn.key] || {}),
        [category.id]: {
          ...(prev[fn.key]?.[category.id] || {}),
          ...patch,
        },
      },
    }));
  };

  const saveRating = (fn, category, level, note) => {
    if (!selectedSystemId || !level) return;
    setSaveStatus('Saving');
    api.saveAiRating(selectedSystemId, {
      cagr_function: fn.key,
      category_id: category.id,
      maturity_level: level,
      notes: stringifyCagrNotes(note),
    })
      .then(() => setSaveStatus('All changes saved'))
      .catch(() => setSaveStatus('Save error'));
  };

  const handleLevelChange = (fn, category, level) => {
    const note = getNote(fn, category);
    updateRating(fn, category, { maturity_level: level, notes: stringifyCagrNotes(note) });
    saveRating(fn, category, level, note);
  };

  const handleNoteChange = (fn, category, value) => {
    updateRating(fn, category, { notes: stringifyCagrNotes(value) });
    setSaveStatus('Unsaved changes');
  };

  const handleNoteBlur = (fn, category) => {
    const level = getLevel(fn, category);
    saveRating(fn, category, level, getNote(fn, category));
  };

  if (systems.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center">
        <Brain size={34} className="mx-auto text-slate-300 mb-3" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No AI systems registered yet.</p>
        <a href="/ai-governance" className="mt-2 inline-block text-sm text-blue-600 hover:underline">
          Register an AI system from AI Governance
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Selected AI System</label>
        <select
          value={selectedSystemId}
          onChange={event => setSelectedSystemId(event.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        >
          {systems.map(system => <option key={system.id} value={system.id}>{system.name}</option>)}
        </select>
      </div>

      <SummaryHeader
        title="CAIRE Self-Assessment"
        description={`Use CAIRE with the CyberReady AI Governance Rubric to evaluate AI governance maturity across GOVERN, MAP, MEASURE, and MANAGE${selectedSystem ? ` for ${selectedSystem.name}` : ''}.`}
        score={stats.overall}
        stats={stats}
        total={CAGR_TOTAL}
        saveStatus={saveStatus}
        functions={CAGR_FUNCTIONS}
      />

      <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-5">
        <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">CAGR + CAIRE</h3>
        <p className="text-sm text-indigo-900 dark:text-indigo-200 mt-2">
          CAGR provides the rubric. CAIRE provides the evidence-review process. Together they help districts document how AI tools are governed, monitored, and improved.
        </p>
      </div>

      <RubricSections
        functions={CAGR_FUNCTIONS}
        stats={stats}
        expanded={expanded}
        setExpanded={setExpanded}
        getLevel={getLevel}
        getNote={getNote}
        canEdit
        onLevelChange={handleLevelChange}
        onNoteChange={handleNoteChange}
        onNoteBlur={handleNoteBlur}
        showPlaybook
      />
    </div>
  );
}

export default function UnifiedAssessmentTabs() {
  const [activeTab, setActiveTab] = useState('ccrr');
  const tabs = [
    { id: 'ccrr', label: 'CCRR Cybersecurity', icon: ShieldCheck },
    { id: 'cagr', label: 'CAGR AI Governance', icon: Brain },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assessment</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete evidence-based CCRR cybersecurity and CAIRE AI-governance assessments with distinct, versioned methodologies.
        </p>
      </div>

      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'ccrr' ? <CCRRPanel /> : <CAGRAssessmentPanel />}
    </div>
  );
}
