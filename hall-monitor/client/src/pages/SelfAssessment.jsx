import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Camera, ClipboardList, FileText, RotateCcw, ShieldCheck } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import AdminDashboard from './AdminDashboard';
import UnifiedAssessmentTabs from '../components/UnifiedAssessmentTabs';
import assessmentDomains from '../data/cybersecurityAssessment.json';
import { categoryCodes, trainingGuide } from '../data/assessmentGuidance';

function createEmptyAssessment(districtName) {
  return {
    meta: { district: districtName || '', timeframe: '' },
    ratings: {},
    notes: {},
  };
}

function categoryKey(domainTitle, categoryName) {
  return `${domainTitle}::${categoryName}`;
}

function average(values) {
  if (!values.length) return 0;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

function levelLabel(title) {
  return title.replace(/^LEVEL\s+\d+:\s*/, '');
}

function splitPrompts(text) {
  return text.split(/\u2022/).map((item) => item.trim()).filter(Boolean);
}

export default function SelfAssessment() {
  const { user, activeDistrict } = useAuth();
  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;
  if (inAdminOverview) return <AdminDashboard defaultTab="selfAssessment" />;
  return <UnifiedAssessmentTabs />;

  const [activeDomain, setActiveDomain] = useState(assessmentDomains[0].title);
  const [assessment, setAssessment] = useState(() => createEmptyAssessment(activeDistrict?.name));
  const [saveStatus, setSaveStatus] = useState('saved');
  const saveTimer = useRef(null);
  const [history, setHistory] = useState([]);

  // Load from server on mount
  useEffect(() => {
    api.selfAssessment().then(sa => {
      if (sa) {
        setAssessment({
          meta: { district: activeDistrict?.name || '', timeframe: sa.timeframe || '' },
          ratings: sa.ratings || {},
          notes: sa.notes || {},
        });
      } else {
        setAssessment(createEmptyAssessment(activeDistrict?.name));
      }
    }).catch(() => {});
    api.selfAssessmentHistory().then(setHistory).catch(() => {});
  }, [activeDistrict]);

  // Auto-save to server (debounced)
  const saveToServer = useCallback(() => {
    setSaveStatus('saving');
    api.saveSelfAssessment({
      timeframe: assessment.meta.timeframe,
      ratings: assessment.ratings,
      notes: assessment.notes,
      status: 'in_progress',
    }).then(() => setSaveStatus('saved')).catch(() => setSaveStatus('error'));
  }, [assessment]);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(saveToServer, 1500);
    setSaveStatus('unsaved');
    return () => clearTimeout(saveTimer.current);
  }, [assessment, saveToServer]);

  const currentDomain = assessmentDomains.find((domain) => domain.title === activeDomain) || assessmentDomains[0];

  const domainSummaries = useMemo(() => {
    return assessmentDomains.map((domain) => {
      const ratings = domain.categories
        .map((category) => assessment.ratings[categoryKey(domain.title, category.name)])
        .filter(Boolean);
      return { title: domain.title, total: domain.categories.length, completed: ratings.length, average: average(ratings) };
    });
  }, [assessment]);

  const totalCategories = assessmentDomains.reduce((sum, domain) => sum + domain.categories.length, 0);
  const completedCategories = domainSummaries.reduce((sum, domain) => sum + domain.completed, 0);
  const allRatings = Object.values(assessment.ratings).filter(Boolean);
  const overallAverage = average(allRatings);
  const completionRate = Math.round((completedCategories / totalCategories) * 100);
  const savedNotes = Object.values(assessment.notes).filter(Boolean).length;

  const updateMeta = (field, value) => {
    setAssessment((prev) => ({ ...prev, meta: { ...prev.meta, [field]: value } }));
  };

  const updateRating = (domainTitle, categoryName, value) => {
    const key = categoryKey(domainTitle, categoryName);
    setAssessment((prev) => ({ ...prev, ratings: { ...prev.ratings, [key]: value } }));
  };

  const updateNote = (domainTitle, categoryName, value) => {
    const key = categoryKey(domainTitle, categoryName);
    setAssessment((prev) => ({ ...prev, notes: { ...prev.notes, [key]: value } }));
  };

  const handleSnapshot = async () => {
    await api.snapshotSelfAssessment({
      timeframe: assessment.meta.timeframe,
      ratings: assessment.ratings,
      notes: assessment.notes,
    });
    api.selfAssessmentHistory().then(setHistory).catch(() => {});
    setSaveStatus('snapshot saved');
  };

  const resetAssessment = () => {
    setAssessment(createEmptyAssessment(activeDistrict?.name));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Self-Assessment Audit</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            CoSN Cybersecurity Readiness for Education (CCRE)-aligned self-assessment — {activeDistrict?.name || 'Select a district'}
          </p>
          <p className="text-xs mt-1">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              saveStatus === 'saved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              saveStatus === 'saving' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
              saveStatus === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
              'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {saveStatus === 'saved' ? 'All changes saved' : saveStatus === 'saving' ? 'Saving...' : saveStatus === 'error' ? 'Save error' : saveStatus === 'snapshot saved' ? 'Snapshot created' : 'Unsaved changes'}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="#assessment-guidance"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <BookOpen size={16} />
            View Assessment Guidance
          </a>
          <button
            onClick={handleSnapshot}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Camera size={16} />
            Save Snapshot
          </button>
          <button
            onClick={resetAssessment}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Overall Maturity</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{overallAverage || '-'}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Average maturity level</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Progress</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{completionRate}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{completedCategories} of {totalCategories} categories</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Evidence Notes</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{savedNotes}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Categories with notes</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Snapshots</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{history.filter(h => h.status === 'completed').length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Completed assessments</p>
        </div>
      </div>

      {/* Assessment Setup */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Assessment Setup</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">District and timeframe for this assessment.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">District / Institution</label>
            <input
              value={activeDistrict?.name || ''}
              readOnly
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Assessment Timeframe</label>
            <input
              value={assessment.meta.timeframe}
              onChange={(event) => updateMeta('timeframe', event.target.value)}
              placeholder="e.g. March 2026"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Training Guide */}
      <div id="assessment-guidance" className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-800 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-blue-700 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{trainingGuide.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{trainingGuide.intro}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trainingGuide.steps.map((step) => (
            <div key={step.title} className="bg-white/80 dark:bg-slate-900/40 rounded-xl border border-blue-100 dark:border-blue-900/50 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Tabs */}
      <div className="flex flex-wrap gap-2">
        {domainSummaries.map((domain) => (
          <button
            key={domain.title}
            onClick={() => setActiveDomain(domain.title)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              domain.title === currentDomain.title
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {domain.title} - {domain.completed}/{domain.total}
          </button>
        ))}
      </div>

      {/* Domain Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">{currentDomain.title} Function</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{currentDomain.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Use the maturity descriptions below to select the highest level fully supported by evidence.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Current Function Average</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {domainSummaries.find((domain) => domain.title === currentDomain.title)?.average || '-'}
            </p>
          </div>
        </div>

        <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            View {currentDomain.title} maturity guide
          </summary>
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 p-4 pt-0">
            {currentDomain.overview.map((description, index) => (
              <div key={`${currentDomain.title}-${index}`} className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {levelLabel(currentDomain.categories[0].levels[index].title)}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{description}</p>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Category Cards */}
      <div className="space-y-4">
        {currentDomain.categories.map((category) => {
          const key = categoryKey(currentDomain.title, category.name);
          const selectedLevel = assessment.ratings[key] || 0;
          const selectedRubric = category.levels.find((level) => level.level === selectedLevel) || null;
          const promptLevel = selectedLevel || 1;
          const selectedPrompts = category.interviewPrompts.find((level) => level.level === promptLevel)?.prompts || '';
          const code = categoryCodes[currentDomain.title]?.[category.name];

          return (
            <div key={key} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {code ? `${code} - Assessment Category` : 'Assessment Category'}
                  </p>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{category.name}</h4>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedRubric
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {selectedRubric ? levelLabel(selectedRubric.title) : 'Not Rated Yet'}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.levels.map((level) => (
                  <button
                    key={`${key}-${level.level}`}
                    onClick={() => updateRating(currentDomain.title, category.name, level.level)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedLevel === level.level
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {level.level}. {levelLabel(level.title)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[1.2fr,1fr] gap-6">
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Selected Maturity Description</p>
                    {selectedRubric ? (
                      <>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white mt-2">{selectedRubric.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{selectedRubric.description}</p>
                      </>
                    ) : (
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                        Choose the highest level that is fully supported by evidence.
                      </p>
                    )}
                  </div>

                  <details className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/20">
                    <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                      View all five maturity descriptions
                    </summary>
                    <div className="space-y-3 px-4 pb-4">
                      {category.levels.map((level) => (
                        <div key={`${key}-desc-${level.level}`} className="rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-4">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{level.title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{level.description}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-4">
                    <div className="flex items-center gap-2">
                      <ClipboardList size={16} className="text-blue-700 dark:text-blue-400" />
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Guided assessment prompts for {selectedRubric ? selectedRubric.title : 'LEVEL 1: INITIAL'}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {splitPrompts(selectedPrompts).map((prompt) => (
                        <li key={prompt} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                          <span>{prompt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-slate-500 dark:text-slate-400" />
                      <label className="text-sm font-semibold text-slate-900 dark:text-white">Evidence / assessment notes</label>
                    </div>
                    <textarea
                      value={assessment.notes[key] || ''}
                      onChange={(event) => updateNote(currentDomain.title, category.name, event.target.value)}
                      rows={5}
                      placeholder="Capture evidence, gaps, follow-up questions, or justification for the selected maturity level."
                      className="w-full mt-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
