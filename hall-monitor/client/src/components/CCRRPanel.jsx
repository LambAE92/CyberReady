import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, FilePlus2, ShieldCheck } from 'lucide-react';
import { api } from '../utils/api';
import { CCRR_DOMAINS, CCRR_FUNCTIONS, CCRR_MATURITY_LEVELS } from '../data/ccrrData';
import { CEAM, advancementPath, calculateCcrrScores } from '../data/ccrrAssessment';

const LEVEL_COLORS = { 1: 'bg-red-600', 2: 'bg-orange-500', 3: 'bg-amber-500', 4: 'bg-blue-600', 5: 'bg-green-600' };
const today = () => new Date().toISOString().slice(0, 10);

function DomainCard({ domain, record, onSave, onEvidence }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({
    current_maturity: record?.current_maturity || '', target_maturity: record?.target_maturity || '',
    confidence: record?.confidence || 'Moderate', rating_rationale: record?.rating_rationale || '',
    risk_sensitive_critical: Boolean(record?.risk_sensitive_critical),
  });
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [evidence, setEvidence] = useState({
    evidence_type: 'Document', title: '', source_owner: '', source_location: '',
    effective_or_observed_date: '', reviewed_date: today(), scope: '', assessor_notes: '',
    validation_status: 'Accepted', confidentiality: 'Internal', retention_or_review_date: '',
  });

  useEffect(() => setDraft({
    current_maturity: record?.current_maturity || '', target_maturity: record?.target_maturity || '',
    confidence: record?.confidence || 'Moderate', rating_rationale: record?.rating_rationale || '',
    risk_sensitive_critical: Boolean(record?.risk_sensitive_critical),
  }), [record]);

  const save = () => onSave({ ...draft, domain_id: domain.id,
    current_maturity: draft.current_maturity ? Number(draft.current_maturity) : null,
    target_maturity: draft.target_maturity ? Number(draft.target_maturity) : null });
  const path = advancementPath(domain.id, Number(draft.current_maturity), Number(draft.target_maturity));

  return <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
    <button onClick={() => setOpen(value => !value)} className="w-full p-5 flex justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30">
      <div>
        <p className="text-xs font-semibold text-slate-500">{domain.id} · NIST CSF 2.0: {domain.nistMapping.references.join(', ')}</p>
        <h4 className="mt-1 font-semibold text-slate-900 dark:text-white">{domain.title}</h4>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{domain.assessmentIntent}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {record?.critical_gap ? <span className="rounded-full bg-red-100 text-red-700 px-2 py-1 text-xs font-semibold">Critical gap</span> : null}
        <span className="text-sm text-slate-600 dark:text-slate-300">{record?.current_maturity ? `Current: L${record.current_maturity}` : 'Not rated'}</span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>
    </button>
    {open && <div className="border-t border-slate-200 dark:border-slate-700 p-5 space-y-5">
      <section><h5 className="text-sm font-semibold text-slate-900 dark:text-white">K–12 context</h5><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{domain.k12Context}</p></section>
      <section><h5 className="text-sm font-semibold text-slate-900 dark:text-white">Guided assessment questions</h5><ul className="mt-2 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-1">{domain.guidedQuestions.map(question => <li key={question}>{question}</li>)}</ul></section>
      <section><h5 className="text-sm font-semibold text-slate-900 dark:text-white">Canonical maturity criteria</h5><div className="mt-2 space-y-2">{CCRR_MATURITY_LEVELS.map(level => <div key={level.level} className="rounded-lg bg-slate-50 dark:bg-slate-900/40 p-3 text-sm"><b>Level {level.level} — {level.label}.</b> {domain.maturityLevels[level.level].description}</div>)}</div></section>
      <section><h5 className="text-sm font-semibold text-slate-900 dark:text-white">CEAM rating</h5><p className="mt-1 text-xs text-slate-500">Select the highest level supported by both domain conditions and evidence. Target does not change the current score; confidence does not mathematically alter it.</p>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
          <label className="text-sm">Current maturity<select value={draft.current_maturity} onChange={e => setDraft(v => ({ ...v, current_maturity: e.target.value }))} className="mt-1 w-full rounded border p-2 bg-white dark:bg-slate-900"> <option value="">Unrated</option>{CCRR_MATURITY_LEVELS.map(l => <option key={l.level} value={l.level}>{l.level} — {l.label}</option>)}</select></label>
          <label className="text-sm">Target maturity<select value={draft.target_maturity} onChange={e => setDraft(v => ({ ...v, target_maturity: e.target.value }))} className="mt-1 w-full rounded border p-2 bg-white dark:bg-slate-900"><option value="">Not set</option>{CCRR_MATURITY_LEVELS.map(l => <option key={l.level} value={l.level}>{l.level} — {l.label}</option>)}</select></label>
          <label className="text-sm">Evidence confidence<select value={draft.confidence} onChange={e => setDraft(v => ({ ...v, confidence: e.target.value }))} className="mt-1 w-full rounded border p-2 bg-white dark:bg-slate-900">{CEAM.confidenceLevels.map(v => <option key={v}>{v}</option>)}</select></label>
          <label className="text-sm flex items-end gap-2 pb-2"><input type="checkbox" checked={draft.risk_sensitive_critical} onChange={e => setDraft(v => ({ ...v, risk_sensitive_critical: e.target.checked }))} />Risk-sensitive critical gap</label>
        </div>
        <textarea value={draft.rating_rationale} onChange={e => setDraft(v => ({ ...v, rating_rationale: e.target.value }))} placeholder="Rating rationale, limitations, exceptions, or contradictory evidence" className="mt-3 w-full rounded border p-2 bg-white dark:bg-slate-900" rows={3} />
        <button onClick={save} className="mt-3 rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white">Save CCRR rating</button>
      </section>
      {path.length > 0 && <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950"><h5 className="font-semibold">Sequential advancement path</h5><ol className="mt-2 list-decimal pl-5 space-y-1">{path.map(item => <li key={item.from}><b>{item.from}→{item.to}:</b> {item.action}</li>)}</ol></section>}
      <section className="grid md:grid-cols-2 gap-4 text-sm"><div><h5 className="font-semibold">Evidence expectations</h5><ul className="mt-2 list-disc pl-5 space-y-1">{domain.evidenceExpectations.map(v => <li key={v}>{v}</li>)}</ul></div><div><h5 className="font-semibold">Common gaps</h5><ul className="mt-2 list-disc pl-5 space-y-1">{domain.commonGaps.map(v => <li key={v}>{v}</li>)}</ul></div></section>
      <section className="rounded-lg border border-slate-200 p-4"><button onClick={() => setEvidenceOpen(v => !v)} className="font-semibold text-sm">{evidenceOpen ? 'Hide' : 'Add'} structured CEAM evidence</button>{evidenceOpen && <div className="mt-3 grid md:grid-cols-2 gap-3">{[['evidence_type','Evidence type'],['title','Title'],['source_owner','Source owner'],['source_location','Source location'],['effective_or_observed_date','Effective / observed date'],['reviewed_date','Reviewed date'],['scope','Scope'],['confidentiality','Confidentiality'],['retention_or_review_date','Retention / review date']].map(([field,label]) => <label key={field} className="text-sm">{label}<input type={field.includes('date') ? 'date' : 'text'} value={evidence[field]} onChange={e => setEvidence(v => ({...v,[field]:e.target.value}))} className="mt-1 w-full rounded border p-2 bg-white dark:bg-slate-900" /></label>)}<label className="text-sm">Validation status<select value={evidence.validation_status} onChange={e => setEvidence(v => ({...v,validation_status:e.target.value}))} className="mt-1 w-full rounded border p-2 bg-white dark:bg-slate-900">{CEAM.validationStatuses.map(v => <option key={v}>{v}</option>)}</select></label><textarea value={evidence.assessor_notes} onChange={e => setEvidence(v => ({...v,assessor_notes:e.target.value}))} placeholder="Assessor notes" className="md:col-span-2 rounded border p-2 bg-white dark:bg-slate-900" rows={2}/><button onClick={() => onEvidence({ ...evidence, domain_id: domain.id })} className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white">Add evidence</button></div>}</section>
    </div>}
  </div>;
}

export default function CCRRPanel() {
  const [assessments, setAssessments] = useState([]); const [assessment, setAssessment] = useState(null); const [name, setName] = useState(''); const [expanded, setExpanded] = useState({ GOVERN: true }); const [status, setStatus] = useState('Loading');
  const load = async id => { const data = await api.ccrrAssessment(id); setAssessment(data); setStatus('All changes saved'); };
  useEffect(() => { api.ccrrAssessments().then(items => { setAssessments(items); if (items[0]) return load(items[0].id); setStatus('Create a CCRR assessment to begin.'); }).catch(() => setStatus('Unable to load CCRR assessments')); }, []);
  const create = async () => { if (!name.trim()) return; const data = await api.createCcrrAssessment({ name: name.trim() }); setAssessments(items => [data, ...items]); setAssessment(data); setName(''); setStatus('CCRR assessment created'); };
  const refresh = data => { setAssessment(data); setAssessments(items => items.map(item => item.id === data.id ? { ...item, updated_at: data.updated_at } : item)); setStatus('All changes saved'); };
  const saveDomain = data => api.saveCcrrDomain(assessment.id, data).then(refresh).catch(() => setStatus('Could not save rating'));
  const addEvidence = data => api.addCeamEvidence(assessment.id, data).then(refresh).catch(() => setStatus('Complete all required CEAM evidence fields before saving'));
  const records = Object.fromEntries((assessment?.domain_assessments || []).map(item => [item.domain_id, item])); const scores = useMemo(() => calculateCcrrScores(assessment?.domain_assessments || []), [assessment]);
  return <div className="space-y-6"><div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"><div className="flex flex-wrap gap-3 items-end"><label className="flex-1 text-sm">CCRR assessment<select value={assessment?.id || ''} onChange={e => load(e.target.value)} className="mt-1 w-full rounded border p-2 bg-white dark:bg-slate-900"><option value="">Select an assessment</option>{assessments.map(a => <option key={a.id} value={a.id}>{a.name} · {a.status}</option>)}</select></label><label className="flex-1 text-sm">New assessment name<input value={name} onChange={e => setName(e.target.value)} placeholder="2026 CCRR Baseline" className="mt-1 w-full rounded border p-2 bg-white dark:bg-slate-900"/></label><button onClick={create} className="rounded bg-blue-700 px-4 py-2 text-white text-sm font-medium inline-flex gap-2"><FilePlus2 size={16}/>Create</button></div></div>{assessment ? <><div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"><div className="flex gap-4 items-center"><ShieldCheck className="text-blue-700"/><div><h3 className="text-xl font-bold">CyberReady Cybersecurity Readiness Rubric (CCRR) v1.0</h3><p className="text-sm text-slate-500">CEAM v1.0 evidence-based assessment · NIST CSF 2.0 alignment is external reference metadata</p></div></div><div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm"><div><b>{scores.overall?.toFixed(1) || '—'}</b><p>Overall CCRR maturity</p></div><div><b>{scores.provisionalOverall?.toFixed(1) || '—'}</b><p>Provisional average</p></div><div><b>{scores.ratedDomains}/18</b><p>Domains rated</p></div><div><b>{status}</b><p>Assessment status</p></div></div></div>{CCRR_FUNCTIONS.map(fn => { const domains=CCRR_DOMAINS.filter(d=>d.function===fn.key); const score=scores.functions.find(s=>s.key===fn.key); const open=expanded[fn.key]; return <section key={fn.key} className="space-y-3"><button onClick={()=>setExpanded(v=>({...v,[fn.key]:!open}))} className="w-full text-left flex justify-between rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-3"><span className="font-semibold">{fn.name} <span className="text-sm font-normal">· {score?.ratedDomains || 0}/{domains.length} rated</span></span><span>{score?.current?.toFixed(1) || '—'} {open ? <ChevronDown size={16} className="inline"/>:<ChevronRight size={16} className="inline"/>}</span></button>{open && domains.map(domain=><DomainCard key={domain.id} domain={domain} record={records[domain.id]} onSave={saveDomain} onEvidence={addEvidence}/>)}</section>})}</> : null}</div>;
}
