import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import { CAGR_FUNCTIONS } from '../data/cagrData';
import { getPlaybookForCategory } from '../data/aiRmfPlaybook';
import { BookOpen, Brain, ChevronDown, ChevronRight, ClipboardList, FileText, Plus } from 'lucide-react';

const TABS = [
  { id: 'systems', label: 'Systems' },
];

const FUNCTION_DESCRIPTIONS = {
  GOVERN: 'Policies, accountability, stakeholder engagement, and supply chain governance for AI.',
  MAP: 'Context, categorization, capabilities, third-party components, and impact mapping.',
  MEASURE: 'Metrics, trustworthy AI evaluation, risk tracking, and measurement improvement.',
  MANAGE: 'Risk response, benefit management, third-party risk, communication, and improvement.',
};

const LIFECYCLE_STAGES = [
  { value: 'plan_design', label: 'Plan Design' },
  { value: 'data_collection', label: 'Data Collection' },
  { value: 'build_use', label: 'Build Use' },
  { value: 'verify_validate', label: 'Verify Validate' },
  { value: 'deploy_use', label: 'Deploy Use' },
  { value: 'operate_monitor', label: 'Operate Monitor' },
];

const OVERSIGHT_MODELS = [
  { value: 'human_in_loop', label: 'Human In Loop' },
  { value: 'human_on_loop', label: 'Human On Loop' },
  { value: 'human_out_of_loop', label: 'Automated' },
];

const lifecycleClasses = {
  plan_design: 'bg-blue-100 text-blue-700',
  data_collection: 'bg-purple-100 text-purple-700',
  build_use: 'bg-indigo-100 text-indigo-700',
  verify_validate: 'bg-cyan-100 text-cyan-700',
  deploy_use: 'bg-amber-100 text-amber-700',
  operate_monitor: 'bg-green-100 text-green-700',
};

const oversightClasses = {
  human_in_loop: 'bg-green-100 text-green-700',
  human_on_loop: 'bg-amber-100 text-amber-700',
  human_out_of_loop: 'bg-red-100 text-red-700',
};

const levelClasses = {
  1: 'bg-red-600 text-white border-red-600',
  2: 'bg-orange-500 text-white border-orange-500',
  3: 'bg-amber-500 text-white border-amber-500',
  4: 'bg-blue-600 text-white border-blue-600',
  5: 'bg-green-600 text-white border-green-600',
};

const levelNames = {
  1: 'Initial',
  2: 'Repeatable',
  3: 'Defined',
  4: 'Managed',
  5: 'Optimized',
};

const cairesGuideSteps = [
  {
    title: 'Review alignment',
    description: 'Review the CAGR category and NIST AI RMF alignment.',
  },
  {
    title: 'Select maturity',
    description: 'Select the highest maturity level supported by evidence.',
  },
  {
    title: 'Document notes',
    description: 'Add notes explaining the rating.',
  },
  {
    title: 'Capture evidence',
    description: 'Attach or document evidence.',
  },
  {
    title: 'Plan advancement',
    description: 'Review advancement guidance.',
  },
  {
    title: 'Prepare findings',
    description: 'Prepare board-ready findings.',
  },
];

function scoreColor(score) {
  if (!score) return 'text-slate-400';
  const level = Math.min(5, Math.max(1, Math.round(score)));
  return {
    1: 'text-red-600',
    2: 'text-orange-500',
    3: 'text-amber-500',
    4: 'text-blue-600',
    5: 'text-green-600',
  }[level];
}

function average(values) {
  const nums = values.filter(v => Number(v) > 0);
  return nums.length ? nums.reduce((sum, v) => sum + Number(v), 0) / nums.length : 0;
}

function emptyEvidence() {
  return { assessmentNotes: '', evidenceText: '', evidenceUrl: '' };
}

function parseEvidence(notes) {
  if (!notes) return emptyEvidence();
  try {
    const parsed = JSON.parse(notes);
    if (parsed && typeof parsed === 'object') {
      return {
        assessmentNotes: parsed.assessmentNotes || parsed.notes || '',
        evidenceText: parsed.evidenceText || '',
        evidenceUrl: parsed.evidenceUrl || '',
      };
    }
  } catch {
    return { ...emptyEvidence(), assessmentNotes: notes };
  }
  return emptyEvidence();
}

function stringifyEvidence(evidence) {
  return JSON.stringify({
    assessmentNotes: evidence.assessmentNotes || '',
    evidenceText: evidence.evidenceText || '',
    evidenceUrl: evidence.evidenceUrl || '',
  });
}

function countEvidence(evidence) {
  return ['assessmentNotes', 'evidenceText', 'evidenceUrl']
    .filter(key => evidence[key]?.trim()).length;
}

function ratingBadge(level) {
  if (!level) return 'Not Rated Yet';
  return `Level ${level}: ${levelNames[level]}`;
}

function getGuidedPrompts(category, level) {
  const nextLevel = level && level < 5
    ? category.advancement.find(item => item.from === level)?.steps?.[0]
    : null;
  return [
    'What evidence supports this rating?',
    'Has the district documented policy, process, role, or procedure for this category?',
    'Is this practice informal, documented, enforced, or continuously improved?',
    'Which stakeholders can validate this rating?',
    nextLevel || 'What would need to change to advance one maturity level?',
  ];
}

export default function AIGovernance() {
  const { user } = useAuth();
  const canEdit = ['platform_admin', 'district_it'].includes(user?.role);
  const [activeTab, setActiveTab] = useState('systems');
  const [activeFunctionKey, setActiveFunctionKey] = useState('GOVERN');
  const [systems, setSystems] = useState([]);
  const [selectedSystemId, setSelectedSystemId] = useState('');
  const [ratings, setRatings] = useState({ GOVERN: {}, MAP: {}, MEASURE: {}, MANAGE: {} });
  const [saveStatus, setSaveStatus] = useState('saved');
  const [showForm, setShowForm] = useState(false);
  const [savingSystem, setSavingSystem] = useState(false);
  const [expandedLevelDescriptions, setExpandedLevelDescriptions] = useState({});
  const [expandedPlaybooks, setExpandedPlaybooks] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    use_case: '',
    ai_lifecycle_stage: 'deploy_use',
    human_oversight_model: 'human_on_loop',
    third_party_components: '',
  });

  const loadSystems = useCallback(() => {
    api.aiSystems().then(setSystems).catch(() => setSystems([]));
  }, []);

  useEffect(() => {
    loadSystems();
  }, [loadSystems]);

  useEffect(() => {
    if (!selectedSystemId) return;
    setSaveStatus('saved');
    api.aiSystemRatings(selectedSystemId)
      .then(data => setRatings(data.ratings || { GOVERN: {}, MAP: {}, MEASURE: {}, MANAGE: {} }))
      .catch(() => setRatings({ GOVERN: {}, MAP: {}, MEASURE: {}, MANAGE: {} }));
  }, [selectedSystemId]);

  const selectedSystem = systems.find(s => s.id === Number(selectedSystemId)) || null;

  const stats = useMemo(() => {
    const functionScores = {};
    const functionSummaries = {};
    CAGR_FUNCTIONS.forEach(fn => {
      const levels = fn.categories
        .map(cat => ratings[fn.key]?.[cat.id]?.maturity_level)
        .filter(Boolean);
      functionScores[fn.key] = average(levels);
      functionSummaries[fn.key] = {
        completed: levels.length,
        total: fn.categories.length,
      };
    });
    const allLevels = CAGR_FUNCTIONS.flatMap(fn =>
      fn.categories.map(cat => ratings[fn.key]?.[cat.id]?.maturity_level).filter(Boolean)
    );
    return {
      functionScores,
      functionSummaries,
      overall: average(allLevels),
      assessed: allLevels.length,
      total: CAGR_FUNCTIONS.reduce((sum, fn) => sum + fn.categories.length, 0),
    };
  }, [ratings]);

  const selectedFunction = CAGR_FUNCTIONS.find(fn => fn.key === activeFunctionKey) || CAGR_FUNCTIONS[0];

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      use_case: '',
      ai_lifecycle_stage: 'deploy_use',
      human_oversight_model: 'human_on_loop',
      third_party_components: '',
    });
  };

  const createSystem = async () => {
    if (!formData.name.trim()) return;
    setSavingSystem(true);
    try {
      const created = await api.createAiSystem(formData);
      resetForm();
      setShowForm(false);
      await api.aiSystems().then(setSystems);
      setSelectedSystemId(created.id);
    } finally {
      setSavingSystem(false);
    }
  };

  const assessSystem = (id) => {
    setSelectedSystemId(id);
    window.location.hash = '#/self-assessment';
  };

  const updateLocalRating = (fnKey, categoryId, patch) => {
    setRatings(prev => ({
      ...prev,
      [fnKey]: {
        ...(prev[fnKey] || {}),
        [categoryId]: {
          ...(prev[fnKey]?.[categoryId] || {}),
          ...patch,
        },
      },
    }));
  };

  const saveRating = async (fnKey, category, maturityLevel, evidence) => {
    if (!selectedSystemId || !canEdit) return;
    setSaveStatus('saving');
    await api.saveAiRating(selectedSystemId, {
      cagr_function: fnKey,
      category_id: category.id,
      maturity_level: maturityLevel,
      notes: stringifyEvidence(evidence),
    })
      .then(() => {
        setSaveStatus('saved');
        loadSystems();
      })
      .catch(err => {
        setSaveStatus('error');
        throw err;
      });
  };

  const handleLevelChange = (fnKey, category, level) => {
    const evidence = parseEvidence(ratings[fnKey]?.[category.id]?.notes);
    updateLocalRating(fnKey, category.id, { maturity_level: level, notes: stringifyEvidence(evidence) });
    saveRating(fnKey, category, level, evidence).catch(() => {});
  };

  const updateEvidence = (fnKey, categoryId, field, value) => {
    const evidence = parseEvidence(ratings[fnKey]?.[categoryId]?.notes);
    const nextEvidence = { ...evidence, [field]: value };
    updateLocalRating(fnKey, categoryId, { notes: stringifyEvidence(nextEvidence) });
    setSaveStatus('unsaved');
  };

  const handleEvidenceBlur = (fnKey, category) => {
    const current = ratings[fnKey]?.[category.id];
    if (!current?.maturity_level) return;
    saveRating(fnKey, category, current.maturity_level, parseEvidence(current.notes)).catch(() => {});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Governance</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track AI systems and assess governance maturity with CAGR and CAIRE.
          </p>
        </div>
        {canEdit && activeTab === 'systems' && (
          <button
            onClick={() => setShowForm(v => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Register AI System
          </button>
        )}
      </div>

      {TABS.length > 1 && (
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'systems' && (
        <div className="space-y-4">
          {showForm && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="System name"
                  className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <input
                  value={formData.use_case}
                  onChange={e => setFormData({ ...formData, use_case: e.target.value })}
                  placeholder="Use case"
                  className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <select
                  value={formData.ai_lifecycle_stage}
                  onChange={e => setFormData({ ...formData, ai_lifecycle_stage: e.target.value })}
                  className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  {LIFECYCLE_STAGES.map(stage => (
                    <option key={stage.value} value={stage.value}>{stage.label}</option>
                  ))}
                </select>
                <select
                  value={formData.human_oversight_model}
                  onChange={e => setFormData({ ...formData, human_oversight_model: e.target.value })}
                  className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  {OVERSIGHT_MODELS.map(model => (
                    <option key={model.value} value={model.value}>{model.label}</option>
                  ))}
                </select>
                <input
                  value={formData.third_party_components}
                  onChange={e => setFormData({ ...formData, third_party_components: e.target.value })}
                  placeholder="Third-party components"
                  className="md:col-span-2 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description"
                  rows={3}
                  className="md:col-span-2 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => { resetForm(); setShowForm(false); }}
                  className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={createSystem}
                  disabled={savingSystem || !formData.name.trim()}
                  className="px-3 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {systems.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-10 text-center">
              <Brain size={34} className="mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No AI systems registered yet.</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Register a system to begin governance assessment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {systems.map(system => {
                const lifecycle = LIFECYCLE_STAGES.find(s => s.value === system.ai_lifecycle_stage);
                const oversight = OVERSIGHT_MODELS.find(m => m.value === system.human_oversight_model);
                return (
                  <div key={system.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-lg text-slate-900 dark:text-white truncate">{system.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{system.use_case}</p>
                      </div>
                      <div className={`text-right font-bold ${scoreColor(system.avgMaturity)}`}>
                        {system.avgMaturity ? system.avgMaturity.toFixed(1) : 'Not Assessed'}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${lifecycleClasses[system.ai_lifecycle_stage] || 'bg-slate-100 text-slate-700'}`}>
                        {lifecycle?.label || system.ai_lifecycle_stage}
                      </span>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${oversightClasses[system.human_oversight_model] || 'bg-slate-100 text-slate-700'}`}>
                        {oversight?.label || system.human_oversight_model}
                      </span>
                    </div>
                    <p className="mt-4 text-xs text-slate-400 truncate">{system.third_party_components || 'No third-party components listed'}</p>
                    <button
                      onClick={() => assessSystem(system.id)}
                      className="mt-4 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      Open CAIRE Assessment
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'assessment' && (
        <div className="space-y-6">
          {systems.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400">
              No AI systems registered yet. Register a system from the Systems tab to begin.
            </div>
          ) : (
            <>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select AI System</label>
                <select
                  value={selectedSystemId}
                  onChange={e => setSelectedSystemId(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="">Select an AI system</option>
                  {systems.map(system => (
                    <option key={system.id} value={system.id}>{system.name}</option>
                  ))}
                </select>
              </div>

              {!selectedSystem ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400">
                  Select an AI system above to begin assessment.
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">CAIRE Self-Assessment Audit</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      CAGR is the CyberReady AI Governance Rubric. CAIRE is the evaluator methodology used to validate AI governance maturity through evidence, interviews, and board-ready reporting.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Selected AI System</p>
                      <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{selectedSystem.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{selectedSystem.use_case || 'No use case documented'}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Overall CAGR Score</p>
                      <p className={`mt-2 text-3xl font-bold ${scoreColor(stats.overall)}`}>{stats.overall ? stats.overall.toFixed(1) : '-'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Average maturity level</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Progress</p>
                      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.assessed}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">of {stats.total} categories completed</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Save Status</p>
                      <p className={`mt-3 inline-flex px-2 py-1 rounded text-xs font-medium ${
                        saveStatus === 'saved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        saveStatus === 'saving' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        saveStatus === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {saveStatus === 'saved' ? 'All changes saved' : saveStatus === 'saving' ? 'Saving...' : saveStatus === 'error' ? 'Save error' : 'Unsaved changes'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Ratings save after level changes and evidence field blur.</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-start gap-3">
                      <Brain size={20} className="text-indigo-600 dark:text-indigo-400 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">CAGR + CAIRE</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          CAGR provides the rubric. CAIRE provides the evaluator process. Together they help districts document how AI tools are governed, monitored, and improved.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <BookOpen size={18} className="text-blue-700 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">CAIRE Evaluation Guide</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          The CAIRE workflow mirrors the CCRE evidence-based evaluation process, adapted for AI governance. Review the maturity descriptors, collect evidence, document notes, and select the highest level fully supported by evidence.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cairesGuideSteps.map(step => (
                        <div key={step.title} className="bg-white/80 dark:bg-slate-900/40 rounded-xl border border-blue-100 dark:border-blue-900/50 p-4">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {CAGR_FUNCTIONS.map(fn => (
                      <button
                        key={fn.key}
                        onClick={() => setActiveFunctionKey(fn.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedFunction.key === fn.key
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {fn.key} - {stats.functionSummaries[fn.key].completed}/{stats.functionSummaries[fn.key].total}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">{selectedFunction.key} Function</p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{selectedFunction.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{FUNCTION_DESCRIPTIONS[selectedFunction.key]}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Current Function Average</p>
                        <p className={`text-2xl font-bold mt-1 ${scoreColor(stats.functionScores[selectedFunction.key])}`}>
                          {stats.functionScores[selectedFunction.key] ? stats.functionScores[selectedFunction.key].toFixed(1) : '-'}
                        </p>
                      </div>
                    </div>

                    <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
                      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                        View {selectedFunction.name} maturity guide
                      </summary>
                      <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 p-4 pt-0">
                        {Object.entries(selectedFunction.levelDescriptions).map(([level, description]) => (
                          <div key={`${selectedFunction.key}-${level}`} className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                              Level {level}: {levelNames[level]}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{description}</p>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>

                  <div className="space-y-4">
                    {selectedFunction.categories.map(category => {
                      const current = ratings[selectedFunction.key]?.[category.id] || {};
                      const evidence = parseEvidence(current.notes);
                      const selectedLevel = current.maturity_level || 0;
                      const advancement = category.advancement.find(item => item.from === selectedLevel);
                      const playbook = getPlaybookForCategory(category.id);
                      const playbookKey = `${selectedFunction.key}-${category.id}`;
                      const levelKey = `${selectedFunction.key}-${category.id}-levels`;
                      const evidenceTotal = countEvidence(evidence);
                      return (
                        <div key={category.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                {category.id} - {category.nistRef}
                              </p>
                              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{category.name}</h4>
                            </div>
                            <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                              selectedLevel
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                            }`}>
                              {ratingBadge(selectedLevel)}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map(level => (
                              <button
                                key={`${category.id}-${level}`}
                                disabled={!canEdit}
                                onClick={() => handleLevelChange(selectedFunction.key, category, level)}
                                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-60 ${
                                  selectedLevel === level
                                    ? levelClasses[level]
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-transparent hover:bg-slate-200 dark:hover:bg-slate-600'
                                }`}
                              >
                                {level}. {levelNames[level]}
                              </button>
                            ))}
                          </div>

                          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr,1fr] gap-6">
                            <div className="space-y-4">
                              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Selected Maturity Description</p>
                                {selectedLevel ? (
                                  <>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-2">Level {selectedLevel}: {levelNames[selectedLevel]}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{category.levels[String(selectedLevel)]}</p>
                                  </>
                                ) : (
                                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                                    Choose the highest level that is fully supported by evidence.
                                  </p>
                                )}
                              </div>

                              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/20">
                                <button
                                  onClick={() => setExpandedLevelDescriptions(prev => ({ ...prev, [levelKey]: !prev[levelKey] }))}
                                  className="w-full px-4 py-3 flex items-center justify-between text-left text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                  <span>View all five maturity descriptions</span>
                                  {expandedLevelDescriptions[levelKey] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </button>
                                {expandedLevelDescriptions[levelKey] && (
                                  <div className="space-y-3 px-4 pb-4">
                                    {Object.entries(category.levels).map(([level, description]) => (
                                      <div key={`${category.id}-desc-${level}`} className="rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-4">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Level {level}: {levelNames[level]}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{description}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {selectedLevel && selectedLevel < 5 && advancement && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4 text-sm text-blue-900 dark:text-blue-200">
                                  <p className="font-semibold mb-2">To advance to Level {selectedLevel + 1}:</p>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {advancement.steps.map(step => (
                                      <li key={step}>{step}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            <div className="space-y-4">
                              <div className="rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-4">
                                <div className="flex items-center gap-2">
                                  <ClipboardList size={16} className="text-blue-700 dark:text-blue-400" />
                                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    Guided assessment prompts for {ratingBadge(selectedLevel || 1)}
                                  </p>
                                </div>
                                <ul className="mt-3 space-y-2">
                                  {getGuidedPrompts(category, selectedLevel).map(prompt => (
                                    <li key={prompt} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                      <span>{prompt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <FileText size={16} className="text-slate-500 dark:text-slate-400" />
                                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Evidence / assessment notes</label>
                                  </div>
                                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
                                    Evidence count: {evidenceTotal}
                                  </span>
                                </div>
                                <textarea
                                  value={evidence.assessmentNotes}
                                  disabled={!canEdit}
                                  onChange={event => updateEvidence(selectedFunction.key, category.id, 'assessmentNotes', event.target.value)}
                                  onBlur={() => handleEvidenceBlur(selectedFunction.key, category)}
                                  rows={4}
                                  placeholder="Capture notes, gaps, follow-up questions, or justification for the selected maturity level."
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white disabled:opacity-60"
                                />
                                <textarea
                                  value={evidence.evidenceText}
                                  disabled={!canEdit}
                                  onChange={event => updateEvidence(selectedFunction.key, category.id, 'evidenceText', event.target.value)}
                                  onBlur={() => handleEvidenceBlur(selectedFunction.key, category)}
                                  rows={3}
                                  placeholder="Optional text evidence, such as policy excerpts, interview notes, or artifact summaries."
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white disabled:opacity-60"
                                />
                                <input
                                  value={evidence.evidenceUrl}
                                  disabled={!canEdit}
                                  onChange={event => updateEvidence(selectedFunction.key, category.id, 'evidenceUrl', event.target.value)}
                                  onBlur={() => handleEvidenceBlur(selectedFunction.key, category)}
                                  placeholder="Optional file URL or evidence location"
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white disabled:opacity-60"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm text-slate-600 dark:text-slate-400">
                            <button
                              onClick={() => setExpandedPlaybooks(prev => ({ ...prev, [playbookKey]: !prev[playbookKey] }))}
                              className="w-full px-4 py-3 flex items-center justify-between text-left font-medium"
                            >
                              <span>NIST Playbook Actions</span>
                              {expandedPlaybooks[playbookKey] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>
                            {expandedPlaybooks[playbookKey] && (
                              <div className="px-4 pb-4 space-y-4">
                                {playbook.map(entry => (
                                  <div key={entry.title}>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 mb-1">
                                      {entry.title}: {entry.description}
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {entry.actions.map(action => (
                                        <li key={action}>{action}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
