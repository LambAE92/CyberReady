import { useState } from 'react';
import {
  GraduationCap, Clock, Users, MapPin, Video,
  CheckCircle2, BookOpen, Award, Sparkles,
} from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import AdminDashboard from './AdminDashboard';

const SESSIONS = [
  { fn: 'Govern',               mins: 140, color: 'bg-indigo-500',  textColor: 'text-indigo-700 dark:text-indigo-300',  bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',  desc: 'Organizational context, risk management strategy, roles, policy, oversight, and supply chain risk management.' },
  { fn: 'Identify',             mins: 60,  color: 'bg-blue-500',    textColor: 'text-blue-700 dark:text-blue-300',      bgColor: 'bg-blue-50 dark:bg-blue-900/20',      desc: 'Asset management, risk assessment, and continuous improvement of your cybersecurity program.' },
  { fn: 'Protect',              mins: 60,  color: 'bg-emerald-500', textColor: 'text-emerald-700 dark:text-emerald-300',bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',desc: 'Identity & access management, awareness & training, data & platform security, and infrastructure resilience.' },
  { fn: 'Detect',               mins: 40,  color: 'bg-amber-500',   textColor: 'text-amber-700 dark:text-amber-300',    bgColor: 'bg-amber-50 dark:bg-amber-900/20',    desc: 'Documented monitoring and adverse-event analysis practices.' },
  { fn: 'Respond',              mins: 90,  color: 'bg-orange-500',  textColor: 'text-orange-700 dark:text-orange-300',  bgColor: 'bg-orange-50 dark:bg-orange-900/20',  desc: 'Incident management, analysis, reporting & communication, and mitigation.' },
  { fn: 'Recover',              mins: 60,  color: 'bg-cyan-500',    textColor: 'text-cyan-700 dark:text-cyan-300',      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',      desc: 'Incident recovery plan execution and recovery communication.' },
  { fn: 'Wrap-up & Reflection', mins: 30,  color: 'bg-slate-500',   textColor: 'text-slate-700 dark:text-slate-300',    bgColor: 'bg-slate-50 dark:bg-slate-800/60',    desc: 'Final Q&A, group reflection, and planning next steps for your district.' },
];

const OUTCOMES = [
  "Use a sample cybersecurity-governance learning workflow aligned to NIST CSF 2.0 concepts",
  'Identify strengths, gaps, and priority areas across the six NIST CSF 2.0 functions',
  'Develop actionable improvement steps tied to each maturity level',
  'Complete a self-evaluation and outline an improvement roadmap',
  'Collaborate with peers facing the same K-12 cybersecurity challenges',
];

const FACTS = [
  { icon: Award,    label: 'Type',        value: 'Prototype workflow' },
  { icon: Clock,    label: 'Timing',      value: 'Illustrative modules' },
  { icon: Video,    label: 'Delivery',    value: 'Buyer configured' },
  { icon: MapPin,   label: 'Scope',       value: 'K–12 governance' },
  { icon: Users,    label: 'Best For',    value: 'District teams' },
  { icon: BookOpen, label: 'Framework',   value: 'NIST CSF 2.0 concepts' },
];

const ROLES = [
  'Superintendent',
  'Board Member',
  'Technology Director / IT Admin',
  'District Administrator',
  'Curriculum / Instructional Lead',
  'Business Manager / CFO',
  'Other',
];

const FORMATS = ['In-Person', 'Virtual / Online', 'No Preference'];

const WHAT_TO_EXPECT = [
  'A sample request recorded in the prototype workflow',
  'A structured module outline for governance discussion',
  'A place to document district context and learning preferences',
  'A starting point for a buyer to configure its own delivery model',
];

const inputCls = 'w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors';
const labelCls = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5';

export default function Training() {
  const { user, activeDistrict } = useAuth();
  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;
  if (inAdminOverview) return <AdminDashboard defaultTab="masterclass" />;

  const totalMins = SESSIONS.reduce((s, x) => s + x.mins, 0);

  const [form, setForm]       = useState({ full_name: '', email: '', organization: '', role: '', format_preference: '', availability: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await api.submitMasterclassRequest(form);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cybersecurity Governance Learning Workflow</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sample K–12 learning and request-tracking workflow included with the Hall Monitor prototype
        </p>
      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-white/15 rounded-lg">
            <GraduationCap size={32} />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/20 rounded text-xs font-medium mb-2">
              <Sparkles size={12} />
              PROTOTYPE LEARNING WORKFLOW
            </div>
            <h3 className="text-xl font-bold">Cybersecurity Governance Learning Modules</h3>
            <p className="text-sm text-blue-100 mt-2 max-w-2xl">
              This prototype provides a sample, facilitator-configurable module
              outline for discussing K–12 cybersecurity governance. It is not an
              official CoSN course, a certification program, or a promise of a
              live training service.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {FACTS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <Icon size={14} />
              <span className="text-xs uppercase tracking-wider font-medium">{label}</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Preparation note */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
        <BookOpen size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            Preparation: <span className="font-semibold">Gather district governance evidence before using the workflow</span>
          </p>
          <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
            The sample modules are designed to accompany discussion of policy,
            asset, training, incident-response, and vendor-governance evidence.
          </p>
        </div>
      </div>

      {/* Session Breakdown */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Session Breakdown
          </h3>
          <span className="text-xs text-slate-400">Total: {Math.floor(totalMins / 60)}h {totalMins % 60}m</span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {SESSIONS.map((s) => (
            <div key={s.fn} className={`px-6 py-4 flex items-start gap-4 ${s.bgColor}`}>
              <div className={`w-1 self-stretch rounded-full ${s.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className={`font-semibold ${s.textColor}`}>{s.fn}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Clock size={11} />
                    {s.mins} min
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            What You'll Walk Away With
          </h3>
        </div>
        <div className="px-6 py-4 space-y-3">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 dark:text-slate-300">{o}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sample request form ───────────────────────────────────── */}
      <div id="request-form" className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Record a Sample Learning Request</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            This saves a request in the prototype for workflow demonstration. It does not schedule a session or notify a third-party facilitator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700">

          {/* Form column (2/3) */}
          <div className="lg:col-span-2 px-6 py-6">
            {submitted ? (
              <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                  <CheckCircle2 size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Sample Request Recorded</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  The request is stored in this Hall Monitor prototype for demonstration. It does not create a training engagement, certification, or facilitator commitment.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ full_name: '', email: '', organization: '', role: '', format_preference: '', availability: '', message: '' }); }}
                  className="mt-5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text" required placeholder="Jane Smith"
                      value={form.full_name} onChange={set('full_name')}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                    <input
                      type="email" required placeholder="jane@district.edu"
                      value={form.email} onChange={set('email')}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className={labelCls}>School District / Organization <span className="text-red-500">*</span></label>
                  <input
                    type="text" required placeholder="Lincoln County School District"
                    value={form.organization} onChange={set('organization')}
                    className={inputCls}
                  />
                </div>

                {/* Role + Format */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Your Role <span className="text-red-500">*</span></label>
                    <select required value={form.role} onChange={set('role')} className={inputCls}>
                      <option value="">Select your role</option>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Format <span className="text-red-500">*</span></label>
                    <select required value={form.format_preference} onChange={set('format_preference')} className={inputCls}>
                      <option value="">Select format</option>
                      {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className={labelCls}>Preferred Availability</label>
                  <input
                    type="text" placeholder="e.g. Weekdays after 2pm, or specific dates"
                    value={form.availability} onChange={set('availability')}
                    className={inputCls}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className={labelCls}>Additional Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your team size, any specific areas of focus, or questions you have..."
                    value={form.message} onChange={set('message')}
                    className={`${inputCls} resize-y`}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
                >
                  {submitting ? 'Saving…' : 'Save Sample Request'}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar (1/3) */}
          <div className="px-6 py-6 space-y-6 bg-slate-50 dark:bg-slate-900/40">

            {/* Prototype scope */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Prototype Scope</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A buyer may adapt these screens into its own learning, consulting, or managed-service workflow after confirming content rights and service-delivery requirements.
              </p>
            </div>

            {/* What to Expect */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">What to Expect</h4>
              <ol className="space-y-3">
                {WHAT_TO_EXPECT.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-xs font-bold text-blue-700 dark:text-blue-300 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Assessment-preparation reminder */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-xs font-semibold text-amber-900 dark:text-amber-200 mb-1">Before you request</p>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Assemble the relevant governance, policy, asset, training, and incident-response evidence before beginning a group assessment.
              </p>
            </div>

          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
        This prototype includes a sample K–12 cybersecurity learning workflow. It does not provide or imply third-party certification, sponsorship, endorsement, affiliation, or evaluator services.
      </p>
    </div>
  );
}
