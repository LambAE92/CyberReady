require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const mammoth = require('mammoth');
const { initDatabase, seedDatabase } = require('./database');
const { generateCCREReport } = require('./report-generator');
const { CCRR_DOMAIN_FUNCTIONS, CEAM_VALIDATION_STATUSES, CEAM_GAP_TYPES, calculateScores } = require('./ccrr');

// ── Anthropic client (optional — requires ANTHROPIC_API_KEY) ──
let anthropic = null;
try {
  const { Anthropic } = require('@anthropic-ai/sdk');
  if (process.env.ANTHROPIC_API_KEY) {
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
} catch { /* SDK not installed */ }

// ── Multer: memory storage for file uploads ────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['text/plain', 'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(txt|docx|doc|pdf)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Only .txt, .docx, and .pdf files are supported'));
    }
  },
});

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production');
const corsOrigin = process.env.CORS_ORIGIN || (isProduction ? undefined : 'http://localhost:5173');

// Render terminates HTTPS at the proxy, so Express must trust the proxy for secure cookies to work.
app.set('trust proxy', 1);

// Initialize and seed database
const db = initDatabase();
seedDatabase(db);

// ── Middleware ──────────────────────────────────────────────────
app.use(express.json());

if (!corsOrigin) {
  console.error('FATAL: CORS_ORIGIN env var is required in production');
  process.exit(1);
}

app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));

const sessionSecret = process.env.SESSION_SECRET || (isProduction ? undefined : 'dev-secret-change-me');
if (!sessionSecret) {
  console.error('FATAL: SESSION_SECRET env var is required in production');
  process.exit(1);
}

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

// ── Rate limiting on login ─────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 10 : 100,
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Auth middleware ─────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.session.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// ── Audit logging helper ───────────────────────────────────────
function auditLog(req, action, entityType, entityId, details) {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  db.prepare(
    'INSERT INTO audit_log (district_id, user_id, username, user_role, action, entity_type, entity_id, details, ip_address) VALUES (?,?,?,?,?,?,?,?,?)'
  ).run(
    req.session.districtId || null,
    req.session.userId || null,
    req.session.username || null,
    req.session.role || null,
    action, entityType, entityId || null, details || null, ip
  );
}
// Alias so any call to logAction also works
const logAction = auditLog;

// ── District scoping helper ────────────────────────────────────
function getDistrictId(req) {
  // Platform admins can switch districts via session
  if (req.session.role === 'platform_admin' && req.session.activeDistrictId) {
    return req.session.activeDistrictId;
  }
  return req.session.districtId;
}

// ════════════════════════════════════════════════════════════════
//  AUTH ROUTES
// ════════════════════════════════════════════════════════════════

app.post('/api/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    auditLog(req, 'login_failed', 'user', null, `username=${username}`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user.id;
  req.session.role = user.role;
  req.session.districtId = user.district_id;
  // Platform admins land in "admin overview" mode by default; others lock to their district
  req.session.activeDistrictId = user.role === 'platform_admin' ? null : user.district_id;
  req.session.username = user.username;

  auditLog(req, 'login_success', 'user', user.id, null);

  const adminOverview = user.role === 'platform_admin';
  const district = adminOverview
    ? null
    : (user.district_id
        ? db.prepare('SELECT * FROM districts WHERE id = ?').get(user.district_id)
        : db.prepare('SELECT * FROM districts ORDER BY id LIMIT 1').get());

  res.json({
    id: user.id,
    username: user.username,
    fullName: user.full_name,
    role: user.role,
    districtId: user.district_id,
    adminOverview,
    district,
  });
});

app.post('/api/logout', (req, res) => {
  if (req.session.userId) auditLog(req, 'logout', 'user', req.session.userId, null);
  req.session.destroy();
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, username, full_name, role, district_id FROM users WHERE id = ?').get(req.session.userId);
  if (!user) return res.status(401).json({ error: 'Not found' });

  // Platform admins can be in "admin overview" mode (activeDistrictId explicitly null)
  const adminOverview = user.role === 'platform_admin' && req.session.activeDistrictId === null;
  const did = adminOverview ? null : getDistrictId(req);
  const district = did
    ? db.prepare('SELECT * FROM districts WHERE id = ?').get(did)
    : (adminOverview ? null : db.prepare('SELECT * FROM districts ORDER BY id LIMIT 1').get());

  res.json({
    id: user.id,
    username: user.username,
    fullName: user.full_name,
    role: user.role,
    districtId: user.district_id,
    activeDistrictId: did,
    adminOverview,
    district,
  });
});

// ════════════════════════════════════════════════════════════════
//  DISTRICT ROUTES
// ════════════════════════════════════════════════════════════════

app.get('/api/districts', requireAuth, (req, res) => {
  if (req.session.role === 'platform_admin') {
    res.json(db.prepare('SELECT * FROM districts ORDER BY name').all());
  } else {
    const d = db.prepare('SELECT * FROM districts WHERE id = ?').get(req.session.districtId);
    res.json(d ? [d] : []);
  }
});

app.get('/api/district', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const d = db.prepare('SELECT * FROM districts WHERE id = ?').get(did);
  if (!d) return res.status(404).json({ error: 'District not found' });
  res.json(d);
});

app.post('/api/switch-district', requireAuth, requireRole('platform_admin'), (req, res) => {
  const { districtId } = req.body;
  // Admin overview mode (all districts)
  if (districtId === null || districtId === 'all' || districtId === undefined) {
    req.session.activeDistrictId = null;
    auditLog(req, 'switch_district', 'district', null, 'Admin Overview (All Districts)');
    return res.json({ adminOverview: true, name: 'Admin Overview' });
  }
  const d = db.prepare('SELECT * FROM districts WHERE id = ?').get(districtId);
  if (!d) return res.status(404).json({ error: 'District not found' });
  req.session.activeDistrictId = districtId;
  auditLog(req, 'switch_district', 'district', districtId, d.name);
  res.json(d);
});

// ════════════════════════════════════════════════════════════════
//  ADMIN OVERVIEW (cross-district aggregate for platform_admin)
// ════════════════════════════════════════════════════════════════

app.get('/api/admin/overview', requireAuth, requireRole('platform_admin'), (req, res) => {
  const districts = db.prepare('SELECT * FROM districts ORDER BY name').all();

  // Aggregate risk counts across all districts (active findings only)
  const riskRows = db.prepare(
    "SELECT severity, COUNT(*) as count FROM risks WHERE status IN ('Open','In Progress') GROUP BY severity"
  ).all();
  const risks = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  riskRows.forEach(r => { if (risks[r.severity] !== undefined) risks[r.severity] = r.count; });

  // Assessment-request counts for the CCRE-aligned workflow
  const auditRows = db.prepare('SELECT status, COUNT(*) as count FROM audit_requests GROUP BY status').all();
  const auditRequests = { pending: 0, scheduled: 0, in_progress: 0, completed: 0 };
  auditRows.forEach(a => { if (auditRequests[a.status] !== undefined) auditRequests[a.status] = a.count; });

  // Assessment (formal evaluation) counts
  const asmtRows = db.prepare('SELECT status, COUNT(*) as count FROM assessments GROUP BY status').all();
  const evaluations = { draft: 0, in_progress: 0, completed: 0 };
  asmtRows.forEach(a => { if (evaluations[a.status] !== undefined) evaluations[a.status] = a.count; });

  // Per-district summary with maturity from self_assessments
  const perDistrict = districts.map(d => {
    const sa = db.prepare(
      'SELECT ratings FROM self_assessments WHERE district_id = ? ORDER BY updated_at DESC LIMIT 1'
    ).get(d.id);
    let ratings = {};
    try { ratings = sa ? JSON.parse(sa.ratings) : {}; } catch { ratings = {}; }
    const vals = Object.values(ratings).filter(v => typeof v === 'number' && v > 0);
    const avg = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
    const ccreMaturity = Math.round(avg * 10) / 10;

    const cagr = db.prepare(`
      SELECT ROUND(AVG(maturity_level), 1) as avg,
             COUNT(DISTINCT category_id) as categoriesRated,
             MAX(assessed_at) as updatedAt
      FROM cagr_ratings
      WHERE district_id = ?
    `).get(d.id);
    const cagrMaturity = cagr?.avg == null ? 0 : Number(cagr.avg);
    const cagrCategoriesRated = cagr?.categoriesRated || 0;

    const dRiskRows = db.prepare(
      "SELECT severity, COUNT(*) as count FROM risks WHERE district_id = ? AND status IN ('Open','In Progress') GROUP BY severity"
    ).all(d.id);
    const dRisks = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    dRiskRows.forEach(r => { if (dRisks[r.severity] !== undefined) dRisks[r.severity] = r.count; });

    // Has an in-progress or completed evaluation?
    const latestAsmt = db.prepare(
      'SELECT status, updated_at FROM assessments WHERE district_id = ? ORDER BY updated_at DESC LIMIT 1'
    ).get(d.id);

    return {
      id: d.id,
      name: d.name,
      state: d.state,
      school_count: d.school_count,
      student_count: d.student_count,
      overallMaturity: ccreMaturity,
      ccreMaturity,
      cagrMaturity,
      categoriesRated: vals.length,
      cagrCategoriesRated,
      totalCategories: 22,
      cagrTotalCategories: 19,
      risks: dRisks,
      evaluationStatus: latestAsmt?.status || 'none',
      evaluationUpdatedAt: latestAsmt?.updated_at || null,
      cagrUpdatedAt: cagr?.updatedAt || null,
    };
  });

  // Average maturity across evaluated districts
  const evaluatedDistricts = perDistrict.filter(p => p.overallMaturity > 0);
  const averageMaturity = evaluatedDistricts.length
    ? Math.round(evaluatedDistricts.reduce((s, p) => s + p.overallMaturity, 0) / evaluatedDistricts.length * 10) / 10
    : 0;
  const aiEvaluatedDistricts = perDistrict.filter(p => p.cagrMaturity > 0);
  const averageCagrMaturity = aiEvaluatedDistricts.length
    ? Math.round(aiEvaluatedDistricts.reduce((s, p) => s + p.cagrMaturity, 0) / aiEvaluatedDistricts.length * 10) / 10
    : 0;

  // ── Masterclass training status per district ──
  const masterclassReqs = db.prepare('SELECT * FROM masterclass_requests ORDER BY created_at DESC').all();
  const masterclassModules = db.prepare('SELECT id FROM masterclass_modules').all();
  const totalModules = masterclassModules.length;
  const masterclassPerDistrict = districts.map(d => {
    // Count completions for this district
    const completions = db.prepare(
      'SELECT module_id, SUM(completed) as done, SUM(total_staff) as total FROM masterclass_completions WHERE district_id = ? GROUP BY module_id'
    ).all(d.id);
    const modulesCompleted = completions.filter(c => c.total > 0 && c.done >= c.total).length;
    const overallPct = completions.length && completions.reduce((s, c) => s + c.total, 0) > 0
      ? Math.round(completions.reduce((s, c) => s + c.done, 0) * 100 / completions.reduce((s, c) => s + c.total, 0))
      : 0;
    // Check if they requested a masterclass
    const request = masterclassReqs.find(r =>
      r.organization && d.name && r.organization.toLowerCase().includes(d.name.split(' ')[0].toLowerCase())
    );
    return {
      districtId: d.id,
      districtName: d.name,
      completionPct: overallPct,
      modulesCompleted,
      totalModules,
      requested: !!request,
      requestStatus: request?.status || null,
      requestDate: request?.created_at || null,
    };
  });

  // ── Self-Assessment & Audit status per district ──
  const selfAssessmentPerDistrict = districts.map(d => {
    const snapshots = db.prepare(
      'SELECT id, status, created_at, updated_at, ratings FROM self_assessments WHERE district_id = ? ORDER BY updated_at DESC'
    ).all(d.id);
    const latest = snapshots[0] || null;
    let categoriesRated = 0;
    if (latest?.ratings) {
      try {
        const r = JSON.parse(latest.ratings);
        categoriesRated = Object.values(r).filter(v => typeof v === 'number' && v > 0).length;
      } catch {}
    }
    // Audit requests for this district
    const auditReqs = db.prepare(
      'SELECT ar.*, u.full_name as requester_name FROM audit_requests ar LEFT JOIN users u ON ar.requested_by = u.id WHERE ar.district_id = ? ORDER BY ar.created_at DESC'
    ).all(d.id);
    const activeAudit = auditReqs.find(a => ['pending', 'approved', 'in_progress'].includes(a.status));
    const completedAudits = auditReqs.filter(a => a.status === 'completed');
    // Assessment-management view (platform administrator)
    const assessments = db.prepare(
      'SELECT id, name, status, overall_maturity, created_at, updated_at FROM assessments WHERE district_id = ? ORDER BY updated_at DESC'
    ).all(d.id);
    return {
      districtId: d.id,
      districtName: d.name,
      snapshotCount: snapshots.length,
      latestStatus: latest?.status || 'none',
      latestUpdatedAt: latest?.updated_at || null,
      categoriesRated,
      auditRequested: !!activeAudit,
      activeAuditStatus: activeAudit?.status || null,
      activeAuditId: activeAudit?.id || null,
      activeAuditRequester: activeAudit?.requester_name || null,
      completedAuditsCount: completedAudits.length,
      auditRequests: auditReqs,
      assessments,
    };
  });

  const formatActivityStatus = (status, ratedCount, totalCount) => {
    if (status === 'completed') return 'Validated';
    if (ratedCount >= totalCount && totalCount > 0) return 'Completed';
    if (ratedCount > 0) return 'In Progress';
    return 'Not Started';
  };

  const assessmentActivity = districts.flatMap(d => {
    const districtSummary = perDistrict.find(item => item.id === d.id);
    const selfSummary = selfAssessmentPerDistrict.find(item => item.districtId === d.id);
    const requests = selfSummary?.auditRequests || [];
    const ccreCompleted = requests.some(req =>
      ['CCRE Audit', 'CCRE Self-Assessment', 'Both'].includes(req.assessment_type || 'CCRE Self-Assessment') && req.status === 'completed'
    );
    const cagrValidated = requests.some(req =>
      ['CAIRE Audit', 'CAIRE Self-Assessment', 'CAGR Self-Assessment', 'Both'].includes(req.assessment_type) && req.status === 'completed'
    );
    return [
      {
        districtId: d.id,
        districtName: d.name,
        assessmentType: 'Cybersecurity Governance Self-Assessment (CCRE-aligned)',
        status: formatActivityStatus(ccreCompleted ? 'completed' : null, selfSummary?.categoriesRated || 0, 22),
        lastUpdated: selfSummary?.latestUpdatedAt || null,
      },
      {
        districtId: d.id,
        districtName: d.name,
        assessmentType: 'CAIRE Self-Assessment',
        status: formatActivityStatus(cagrValidated ? 'completed' : null, districtSummary?.cagrCategoriesRated || 0, 19),
        lastUpdated: districtSummary?.cagrUpdatedAt || null,
      },
    ];
  });

  // ── Aggregate compliance across all districts ──
  const complianceAgg = db.prepare(`
    SELECT status, COUNT(*) as cnt FROM compliance
    WHERE district_id IN (${districts.map(() => '?').join(',')})
    AND status != 'N/A'
    GROUP BY status
  `).all(...districts.map(d => d.id));
  const complianceSummary = { met: 0, partial: 0, notMet: 0, total: 0 };
  complianceAgg.forEach(r => {
    if (r.status === 'Met') complianceSummary.met = r.cnt;
    else if (r.status === 'Partially Met') complianceSummary.partial = r.cnt;
    else if (r.status === 'Not Met') complianceSummary.notMet = r.cnt;
    complianceSummary.total += r.cnt;
  });
  complianceSummary.rate = complianceSummary.total > 0
    ? Math.round(complianceSummary.met * 100 / complianceSummary.total) : 0;

  // Per-district compliance rates
  const compliancePerDistrict = districts.map(d => {
    const met = db.prepare("SELECT COUNT(*) as c FROM compliance WHERE district_id = ? AND status = 'Met'").get(d.id).c;
    const total = db.prepare("SELECT COUNT(*) as c FROM compliance WHERE district_id = ? AND status != 'N/A'").get(d.id).c;
    return {
      districtId: d.id,
      districtName: d.name,
      met,
      total,
      rate: total > 0 ? Math.round(met * 100 / total) : 0,
    };
  });

  // All admin's evaluations (assessment entries)
  const allAssessments = db.prepare(`
    SELECT a.*, d.name as district_name
    FROM assessments a
    JOIN districts d ON a.district_id = d.id
    ORDER BY a.updated_at DESC
  `).all();

  res.json({
    totalDistricts: districts.length,
    districtsEvaluated: evaluatedDistricts.length,
    districtsWithAiMaturity: aiEvaluatedDistricts.length,
    averageMaturity,
    averageCagrMaturity,
    aggregate: { risks, auditRequests, evaluations },
    districts: perDistrict,
    masterclass: masterclassPerDistrict,
    masterclassRequests: masterclassReqs,
    selfAssessments: selfAssessmentPerDistrict,
    assessmentActivity,
    auditRequests: db.prepare(`
      SELECT ar.*, d.name as district_name, u.full_name as requester_name
      FROM audit_requests ar
      JOIN districts d ON ar.district_id = d.id
      LEFT JOIN users u ON ar.requested_by = u.id
      ORDER BY ar.created_at DESC
    `).all(),
    compliance: { summary: complianceSummary, perDistrict: compliancePerDistrict },
    allAssessments,
    generatedAt: new Date().toISOString(),
  });
});

// ════════════════════════════════════════════════════════════════
//  DASHBOARD METRICS
// ════════════════════════════════════════════════════════════════

app.get('/api/metrics', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const rows = db.prepare('SELECT * FROM dashboard_metrics WHERE district_id = ?').all(did);
  const metrics = {};
  rows.forEach(r => {
    metrics[r.metric_key] = {
      value: r.metric_value, label: r.label, icon: r.icon,
      updatedAt: r.updated_at, sourceType: r.source_type,
    };
  });
  res.json(metrics);
});

// ════════════════════════════════════════════════════════════════
//  HEALTH SCORE
// ════════════════════════════════════════════════════════════════

app.get('/api/health', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const categories = db.prepare('SELECT * FROM health_categories WHERE district_id = ? ORDER BY sort_order').all(did);
  const totalWeight = categories.reduce((s, c) => s + c.weight, 0);
  const weightedScore = totalWeight ? categories.reduce((s, c) => s + (c.score * c.weight), 0) / totalWeight : 0;
  res.json({ overallScore: Math.round(weightedScore * 10) / 10, categories });
});

app.put('/api/health/:id', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const { score } = req.body;
  if (score == null || score < 0 || score > 100) return res.status(400).json({ error: 'Invalid score' });
  const did = getDistrictId(req);
  db.prepare('UPDATE health_categories SET score = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ? WHERE id = ? AND district_id = ?')
    .run(score, req.session.userId, req.params.id, did);
  auditLog(req, 'update_health_score', 'health_category', Number(req.params.id), `score=${score}`);
  res.json({ ok: true });
});

// ════════════════════════════════════════════════════════════════
//  RISKS
// ════════════════════════════════════════════════════════════════

app.get('/api/risks', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  let query = 'SELECT * FROM risks WHERE district_id = ?';
  const params = [did];
  if (req.query.severity) { query += ' AND severity = ?'; params.push(req.query.severity); }
  if (req.query.status) { query += ' AND status = ?'; params.push(req.query.status); }
  query += " ORDER BY CASE severity WHEN 'Critical' THEN 1 WHEN 'High' THEN 2 WHEN 'Medium' THEN 3 WHEN 'Low' THEN 4 END, discovered_date DESC";
  res.json(db.prepare(query).all(...params));
});

app.put('/api/risks/:id', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const did = getDistrictId(req);
  const { status, notes } = req.body;
  if (status) {
    db.prepare('UPDATE risks SET status = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ? WHERE id = ? AND district_id = ?')
      .run(status, req.session.userId, req.params.id, did);
    auditLog(req, 'update_risk_status', 'risk', Number(req.params.id), `status=${status}`);
  }
  if (notes !== undefined) {
    db.prepare('UPDATE risks SET notes = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ? WHERE id = ? AND district_id = ?')
      .run(notes, req.session.userId, req.params.id, did);
  }
  res.json({ ok: true });
});

// ════════════════════════════════════════════════════════════════
//  TRAINING
// ════════════════════════════════════════════════════════════════

app.get('/api/training', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  res.json(db.prepare('SELECT * FROM training WHERE district_id = ? ORDER BY completion_pct ASC').all(did));
});

// ════════════════════════════════════════════════════════════════
//  PHISHING SIMULATIONS
// ════════════════════════════════════════════════════════════════

app.get('/api/phishing', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  res.json(db.prepare('SELECT * FROM phishing_sims WHERE district_id = ? ORDER BY send_date ASC').all(did));
});

// ════════════════════════════════════════════════════════════════
//  MASTERCLASS TRAINING
// ════════════════════════════════════════════════════════════════

// All modules with per-district aggregate completion stats
app.get('/api/masterclass/modules', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const modules = db.prepare('SELECT * FROM masterclass_modules ORDER BY order_index').all();
  const stats = db.prepare(`
    SELECT module_id,
           SUM(total_staff) AS total_staff,
           SUM(completed)   AS completed
      FROM masterclass_completions
     WHERE district_id = ?
     GROUP BY module_id
  `).all(did);
  const statsMap = {};
  stats.forEach(s => { statsMap[s.module_id] = s; });
  const result = modules.map(m => {
    const s = statsMap[m.id] || { total_staff: 0, completed: 0 };
    const pct = s.total_staff > 0 ? Math.round(s.completed / s.total_staff * 100) : 0;
    return { ...m, total_staff: s.total_staff, completed: s.completed, completion_pct: pct };
  });
  res.json(result);
});

// Per-department breakdown for a single module
app.get('/api/masterclass/modules/:id/departments', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const rows = db.prepare(
    'SELECT * FROM masterclass_completions WHERE district_id = ? AND module_id = ? ORDER BY department'
  ).all(did, req.params.id);
  res.json(rows);
});

// All departments with their overall masterclass completion rate
app.get('/api/masterclass/departments', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const rows = db.prepare(`
    SELECT department,
           SUM(total_staff) AS total_staff,
           SUM(completed)   AS completed,
           ROUND(SUM(completed) * 100.0 / SUM(total_staff), 1) AS completion_pct
      FROM masterclass_completions
     WHERE district_id = ?
     GROUP BY department
     ORDER BY completion_pct ASC
  `).all(did);
  res.json(rows);
});

// Update a single department completion for a module
app.put('/api/masterclass/completions/:id', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const { completed } = req.body;
  if (completed == null || completed < 0) return res.status(400).json({ error: 'Invalid completed count' });
  const did = getDistrictId(req);
  const result = db.prepare(
    'UPDATE masterclass_completions SET completed = ?, last_updated = DATE("now") WHERE id = ? AND district_id = ?'
  ).run(completed, req.params.id, did);
  if (result.changes === 0) return res.status(404).json({ error: 'Completion record not found' });
  res.json({ ok: true });
});

const findingsUploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 10 : 50,
  message: { error: 'Too many document uploads. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ════════════════════════════════════════════════════════════════
//  COMPLIANCE
// ════════════════════════════════════════════════════════════════

app.get('/api/compliance', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  res.json(db.prepare('SELECT * FROM compliance WHERE district_id = ? ORDER BY sort_order').all(did));
});

// ── Governance status: CCRE-aligned met/partially/not-met view per function ──
app.get('/api/governance-status', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  if (!did) return res.json({ functions: [] });

  const activeCcrr = db.prepare(`SELECT id, rubric_key, rubric_version, evidence_methodology_key, evidence_methodology_version
    FROM ccrr_assessments WHERE district_id = ? ORDER BY updated_at DESC LIMIT 1`).get(did);

  // Get latest self-assessment ratings
  const sa = db.prepare(
    'SELECT ratings FROM self_assessments WHERE district_id = ? ORDER BY created_at DESC LIMIT 1'
  ).get(did);
  const ratings = sa?.ratings ? JSON.parse(sa.ratings) : {};

  // Get active findings by nist_function
  const activeFindings = db.prepare(
    "SELECT nist_function, severity, COUNT(*) as cnt FROM risks WHERE district_id = ? AND status IN ('Open','In Progress') AND nist_function IS NOT NULL GROUP BY nist_function, severity"
  ).all(did);

  const findingMap = {}; // nist_function -> { Critical, High, Medium, Low }
  activeFindings.forEach(f => {
    if (!findingMap[f.nist_function]) findingMap[f.nist_function] = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    findingMap[f.nist_function][f.severity] = (findingMap[f.nist_function][f.severity] || 0) + f.cnt;
  });

  // NIST function → category keys from ratings (format: "Function::CATEGORY NAME")
  const NIST_FUNCTIONS = ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];

  function computeStatus(maturityScore, findingsForArea) {
    const f = findingsForArea || { Critical: 0, High: 0, Medium: 0, Low: 0 };
    const hasCritical = f.Critical > 0;
    const hasHigh = f.High > 0;
    const hasMedium = f.Medium > 0;
    if (maturityScore === null) {
      // No rating — derive from findings only
      if (hasCritical) return 'Not Met';
      if (hasHigh) return 'Not Met';
      if (hasMedium) return 'Partially Met';
      return 'Not Assessed';
    }
    if (hasCritical || (hasHigh && maturityScore < 3)) return 'Not Met';
    if (maturityScore >= 4 && !hasHigh) return 'Met';
    if (maturityScore >= 3 && !hasCritical && !hasHigh) return 'Met';
    if (maturityScore === 3 && (hasHigh || hasMedium)) return 'Partially Met';
    if (maturityScore === 2) return 'Partially Met';
    return 'Not Met'; // maturityScore <= 1
  }

  if (activeCcrr) {
    const domainRatings = db.prepare('SELECT * FROM ccrr_domain_assessments WHERE assessment_id = ?').all(activeCcrr.id);
    const scores = calculateScores(domainRatings);
    const displayName = { GOVERN: 'Govern', IDENTIFY: 'Identify', PROTECT: 'Protect', DETECT: 'Detect', RESPOND: 'Respond', RECOVER: 'Recover' };
    const functions = scores.functions.map(fn => {
      const fnFindings = findingMap[displayName[fn.key]] || findingMap[fn.key] || { Critical: 0, High: 0, Medium: 0, Low: 0 };
      const categories = domainRatings.filter(row => CCRR_DOMAIN_FUNCTIONS[row.domain_id] === fn.key).map(row => ({
        name: row.domain_id,
        maturityScore: row.current_maturity,
        targetMaturity: row.target_maturity,
        confidence: row.confidence,
        criticalGap: Boolean(row.critical_gap),
        status: computeStatus(row.current_maturity, fnFindings),
        activeFindings: (fnFindings.Critical || 0) + (fnFindings.High || 0) + (fnFindings.Medium || 0) + (fnFindings.Low || 0),
      }));
      return { name: displayName[fn.key], status: computeStatus(fn.current, fnFindings), avgMaturity: fn.current || 0,
        targetMaturity: fn.target || 0, categoriesRated: fn.ratedDomains, activeFindings: fnFindings, categories };
    });
    return res.json({ methodology: { rubric: `${activeCcrr.rubric_key}@${activeCcrr.rubric_version}`, evidence: `${activeCcrr.evidence_methodology_key}@${activeCcrr.evidence_methodology_version}` }, functions, overall: scores.overall, provisionalOverall: scores.provisionalOverall });
  }

  const functions = NIST_FUNCTIONS.map(fn => {
    // Gather all category ratings for this function
    const catRatings = Object.entries(ratings)
      .filter(([key]) => key.startsWith(fn + '::'))
      .map(([key, score]) => ({ name: key.slice(fn.length + 2), score }));

    const fnFindings = findingMap[fn] || { Critical: 0, High: 0, Medium: 0, Low: 0 };
    const avgMaturity = catRatings.length
      ? Math.round(catRatings.reduce((s, c) => s + c.score, 0) / catRatings.length * 10) / 10
      : 0;

    const fnStatus = computeStatus(catRatings.length ? avgMaturity : null, fnFindings);

    const categories = catRatings.map(cat => ({
      name: cat.name,
      maturityScore: cat.score,
      status: computeStatus(cat.score, fnFindings),
      activeFindings: (fnFindings.Critical || 0) + (fnFindings.High || 0) + (fnFindings.Medium || 0) + (fnFindings.Low || 0),
    }));

    return {
      name: fn,
      status: fnStatus,
      avgMaturity,
      categoriesRated: catRatings.length,
      activeFindings: fnFindings,
      categories,
    };
  });

  res.json({ functions });
});

// ════════════════════════════════════════════════════════════════
//  EXECUTIVE SUMMARY (fully dynamic)
// ════════════════════════════════════════════════════════════════

app.get('/api/executive-summary', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const district = db.prepare('SELECT * FROM districts WHERE id = ?').get(did);

  // ── Cybersecurity maturity (CCRR / CEAM only; legacy snapshots are not converted) ──
  const ccrr = db.prepare('SELECT id, updated_at FROM ccrr_assessments WHERE district_id = ? ORDER BY updated_at DESC LIMIT 1').get(did);
  const ccrrRows = ccrr ? db.prepare('SELECT * FROM ccrr_domain_assessments WHERE assessment_id = ?').all(ccrr.id) : [];
  const ccrrScores = calculateScores(ccrrRows);
  const displayName = { GOVERN: 'Govern', IDENTIFY: 'Identify', PROTECT: 'Protect', DETECT: 'Detect', RESPOND: 'Respond', RECOVER: 'Recover' };
  const functionMaturity = ccrrScores.functions.map(fn => ({
    name: displayName[fn.key], score: fn.current ? Math.round(fn.current * 10) / 10 : 0,
    target: fn.target ? Math.round(fn.target * 10) / 10 : 0, rated: fn.ratedDomains, total: fn.totalDomains,
  }));
  const allRated = functionMaturity.reduce((sum, fn) => sum + fn.rated, 0);
  const overallMaturity = ccrrScores.overall ? Math.round(ccrrScores.overall * 10) / 10 : 0;

  const aiSystems = db.prepare('SELECT id FROM ai_systems WHERE district_id = ?').all(did);
  const aiSystemCount = aiSystems.length;
  const aiRows = db.prepare(`
    SELECT cagr_function, category_id, maturity_level
    FROM cagr_ratings
    WHERE district_id = ?
  `).all(did);
  const AI_RMF_FUNCTIONS = ['GOVERN', 'MAP', 'MEASURE', 'MANAGE'];
  const AI_FUNCTION_CATEGORY_TOTALS = { GOVERN: 6, MAP: 5, MEASURE: 4, MANAGE: 4 };
  const aiByFunction = {};
  aiRows.forEach(row => {
    if (!row.maturity_level || row.maturity_level <= 0) return;
    if (!aiByFunction[row.cagr_function]) aiByFunction[row.cagr_function] = [];
    aiByFunction[row.cagr_function].push(row.maturity_level);
  });
  const aiFunctionMaturity = AI_RMF_FUNCTIONS.map(fn => {
    const vals = aiByFunction[fn] || [];
    const avg = vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
    return {
      name: fn,
      score: Math.round(avg * 10) / 10,
      rated: vals.length,
      total: aiSystemCount * AI_FUNCTION_CATEGORY_TOTALS[fn],
    };
  });
  const aiCategoriesRated = aiFunctionMaturity.reduce((s, f) => s + f.rated, 0);
  const aiTotalCategories = aiSystemCount * 19;
  const aiWeighted = aiFunctionMaturity.reduce((s, f) => s + f.score * f.rated, 0);
  const aiOverallMaturity = aiCategoriesRated ? Math.round(aiWeighted / aiCategoriesRated * 10) / 10 : 0;

  // Top risks (findings)
  const topRisks = db.prepare(
    "SELECT title, severity, status, owner, recommended_action FROM risks WHERE district_id = ? AND status IN ('Open','In Progress') ORDER BY CASE severity WHEN 'Critical' THEN 1 WHEN 'High' THEN 2 WHEN 'Medium' THEN 3 WHEN 'Low' THEN 4 END LIMIT 5"
  ).all(did);

  // Training
  const training = db.prepare('SELECT SUM(completed) as done, SUM(total_staff) as total FROM training WHERE district_id = ?').get(did);
  const trainingRate = training.total ? Math.round(training.done * 100 / training.total) : 0;

  const maturityByFunction = Object.fromEntries(
    functionMaturity.map(f => [f.name, f.score || 0])
  );
  const governMaturity = maturityByFunction.Govern || 0;
  const identifyMaturity = maturityByFunction.Identify || 0;
  const protectMaturity = maturityByFunction.Protect || 0;
  const detectMaturity = maturityByFunction.Detect || 0;
  const respondMaturity = maturityByFunction.Respond || 0;
  const recoverMaturity = maturityByFunction.Recover || 0;
  const insuranceScore = Math.round((
    (governMaturity / 5)  * 0.25 +
    (protectMaturity / 5) * 0.20 +
    (detectMaturity / 5)  * 0.20 +
    (respondMaturity / 5) * 0.15 +
    (recoverMaturity / 5) * 0.10 +
    (trainingRate / 100) * 0.10
  ) * 100 * 10) / 10;

  // Compliance
  const complianceMet = db.prepare("SELECT COUNT(*) as c FROM compliance WHERE district_id = ? AND status = 'Met'").get(did);
  const complianceTotal = db.prepare("SELECT COUNT(*) as c FROM compliance WHERE district_id = ? AND status != 'N/A'").get(did);
  const complianceRate = complianceTotal.c ? Math.round(complianceMet.c * 100 / complianceTotal.c) : 0;

  // Dynamic next steps derived from maturity + other signals
  const nextSteps = [];
  const criticalRisks = db.prepare("SELECT COUNT(*) as c FROM risks WHERE district_id = ? AND severity = 'Critical' AND status IN ('Open','In Progress')").get(did);
  if (criticalRisks.c > 0) nextSteps.push(`Address ${criticalRisks.c} critical finding${criticalRisks.c === 1 ? '' : 's'} flagged in the latest evaluation.`);
  // Flag NIST functions below Level 3 (Defined)
  functionMaturity
    .filter(f => f.score > 0 && f.score < 3)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .forEach(f => {
      const level = Math.round(f.score);
      nextSteps.push(`Advance ${f.name} from L${level} toward L3 (Defined), formalize and document practices.`);
    });
  aiFunctionMaturity
    .filter(f => f.score > 0 && f.score < 3)
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .forEach(f => {
      const level = Math.round(f.score);
      nextSteps.push(`Advance AI RMF ${f.name} from L${level} toward L3 (Defined), document evidence and governance ownership.`);
    });
  if (trainingRate < 80) nextSteps.push(`Increase staff training completion from ${trainingRate}% to at least 80%.`);
  if (complianceRate < 70) nextSteps.push(`Close compliance gaps, currently ${complianceRate}% of framework requirements met.`);
  if (allRated === 0) nextSteps.push('Complete a CCRR / CEAM assessment to establish an evidence-supported baseline across all six NIST CSF functions.');
  if (aiSystemCount > 0 && aiCategoriesRated === 0) nextSteps.push('Complete the CAIRE Self-Assessment to establish AI RMF maturity across GOVERN, MAP, MEASURE, and MANAGE.');
  if (nextSteps.length === 0) nextSteps.push('Maintain current strong posture. Schedule quarterly review to track improvements.');

  // Phishing trend
  const latestPhish = db.prepare("SELECT * FROM phishing_sims WHERE district_id = ? AND department = 'All Staff' ORDER BY send_date DESC LIMIT 2").all(did);
  let phishingTrend = null;
  if (latestPhish.length === 2) {
    const cur = Math.round(latestPhish[0].clicked / latestPhish[0].total_sent * 100);
    const prev = Math.round(latestPhish[1].clicked / latestPhish[1].total_sent * 100);
    phishingTrend = { current: cur, previous: prev, improving: cur < prev };
  }

  // Risk summary counts
  const riskCounts = db.prepare(
    "SELECT severity, COUNT(*) as count FROM risks WHERE district_id = ? AND status IN ('Open','In Progress') GROUP BY severity"
  ).all(did);

  res.json({
    district,
    // Cybersecurity-governance maturity (replaces health-based 0-100 score)
    overallMaturity,
    functionMaturity,
    aiOverallMaturity,
    aiFunctionMaturity,
    aiSystemCount,
    aiCategoriesRated,
    aiTotalCategories,
    categoriesRated: allRated,
    totalCategories: 18,
    lastEvaluatedAt: ccrr?.updated_at || null,
    governMaturity,
    identifyMaturity,
    protectMaturity,
    detectMaturity,
    respondMaturity,
    recoverMaturity,
    insuranceScore,
    // Unchanged executive metrics
    topRisks,
    trainingRate,
    complianceRate,
    nextSteps,
    phishingTrend,
    riskCounts,
    generatedAt: new Date().toISOString(),
  });
});

// ════════════════════════════════════════════════════════════════
//  NOTIFICATIONS
// ════════════════════════════════════════════════════════════════

app.get('/api/notifications', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const alerts = [];

  const critRisks = db.prepare("SELECT COUNT(*) as c FROM risks WHERE district_id = ? AND severity = 'Critical' AND status = 'Open'").get(did);
  if (critRisks.c > 0) alerts.push({ type: 'critical', message: `${critRisks.c} critical risk(s) require immediate attention`, category: 'risks' });

  const lowTraining = db.prepare("SELECT COUNT(*) as c FROM training WHERE district_id = ? AND completion_pct < 50").get(did);
  if (lowTraining.c > 0) alerts.push({ type: 'warning', message: `${lowTraining.c} department(s) below 50% training completion`, category: 'training' });

  const notMetComp = db.prepare("SELECT COUNT(*) as c FROM compliance WHERE district_id = ? AND status = 'Not Met'").get(did);
  if (notMetComp.c > 0) alerts.push({ type: 'warning', message: `${notMetComp.c} compliance requirement(s) not met`, category: 'compliance' });

  res.json(alerts);
});

// ════════════════════════════════════════════════════════════════
//  ASSESSMENTS (server-side CRUD for Assessment.jsx)
// ════════════════════════════════════════════════════════════════

app.get('/api/assessments', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  res.json(db.prepare('SELECT * FROM assessments WHERE district_id = ? ORDER BY updated_at DESC').all(did));
});

app.post('/api/assessments', requireAuth, requireRole('platform_admin'), (req, res) => {
  const did = getDistrictId(req);
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const result = db.prepare('INSERT INTO assessments (district_id, user_id, name) VALUES (?,?,?)').run(did, req.session.userId, name);
  auditLog(req, 'create_assessment', 'assessment', result.lastInsertRowid, name);
  res.json({ id: result.lastInsertRowid });
});

app.get('/api/assessments/:id', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const a = db.prepare('SELECT * FROM assessments WHERE id = ? AND district_id = ?').get(req.params.id, did);
  if (!a) return res.status(404).json({ error: 'Not found' });
  a.ratings = db.prepare('SELECT * FROM assessment_ratings WHERE assessment_id = ?').all(a.id);
  a.checklist = db.prepare('SELECT * FROM assessment_checklist WHERE assessment_id = ?').all(a.id);
  res.json(a);
});

app.delete('/api/assessments/:id', requireAuth, requireRole('platform_admin'), (req, res) => {
  const did = getDistrictId(req);
  db.prepare('DELETE FROM assessments WHERE id = ? AND district_id = ?').run(req.params.id, did);
  auditLog(req, 'delete_assessment', 'assessment', Number(req.params.id), null);
  res.json({ ok: true });
});

app.put('/api/assessments/:id/complete', requireAuth, requireRole('platform_admin'), (req, res) => {
  const did = getDistrictId(req);
  db.prepare("UPDATE assessments SET status = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND district_id = ?").run(req.params.id, did);
  auditLog(req, 'complete_assessment', 'assessment', Number(req.params.id), null);
  res.json({ ok: true });
});

app.put('/api/assessments/:id/reopen', requireAuth, requireRole('platform_admin'), (req, res) => {
  const did = getDistrictId(req);
  db.prepare("UPDATE assessments SET status = 'in_progress', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND district_id = ?").run(req.params.id, did);
  res.json({ ok: true });
});

app.post('/api/assessments/:id/ratings', requireAuth, requireRole('platform_admin'), (req, res) => {
  const did = getDistrictId(req);
  const a = db.prepare('SELECT id FROM assessments WHERE id = ? AND district_id = ?').get(req.params.id, did);
  if (!a) return res.status(404).json({ error: 'Not found' });
  const { nist_function, category, level, evidence, notes } = req.body;
  db.prepare(`INSERT INTO assessment_ratings (assessment_id, nist_function, category, level, evidence, notes)
    VALUES (?,?,?,?,?,?) ON CONFLICT(assessment_id, nist_function, category) DO UPDATE SET level=excluded.level, evidence=excluded.evidence, notes=excluded.notes, updated_at=CURRENT_TIMESTAMP`)
    .run(a.id, nist_function, category, level, evidence || '', notes || '');
  // Update overall maturity
  const ratings = db.prepare('SELECT level FROM assessment_ratings WHERE assessment_id = ?').all(a.id);
  if (ratings.length > 0) {
    const avg = Math.round(ratings.reduce((s, r) => s + r.level, 0) / ratings.length * 10) / 10;
    db.prepare('UPDATE assessments SET overall_maturity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(avg, a.id);
  }
  res.json({ ok: true });
});

app.get('/api/assessments/:id/interview-responses', requireAuth, requireRole('platform_admin'), (req, res) => {
  const did = getDistrictId(req);
  const a = db.prepare('SELECT id FROM assessments WHERE id = ? AND district_id = ?').get(req.params.id, did);
  if (!a) return res.status(404).json({ error: 'Not found' });
  res.json(db.prepare('SELECT * FROM interview_responses WHERE assessment_id = ?').all(a.id));
});

app.post('/api/assessments/:id/interview-responses', requireAuth, requireRole('platform_admin'), (req, res) => {
  const did = getDistrictId(req);
  const a = db.prepare('SELECT id FROM assessments WHERE id = ? AND district_id = ?').get(req.params.id, did);
  if (!a) return res.status(404).json({ error: 'Not found' });
  const { nist_function, category, target_level, question, response } = req.body;
  db.prepare(`INSERT INTO interview_responses (assessment_id, nist_function, category, target_level, question, response)
    VALUES (?,?,?,?,?,?) ON CONFLICT(assessment_id, nist_function, category, target_level, question) DO UPDATE SET response=excluded.response, updated_at=CURRENT_TIMESTAMP`)
    .run(a.id, nist_function, category, target_level, question, response);
  res.json({ ok: true });
});

app.post('/api/assessments/:id/checklist', requireAuth, requireRole('platform_admin'), (req, res) => {
  const did = getDistrictId(req);
  const a = db.prepare('SELECT id FROM assessments WHERE id = ? AND district_id = ?').get(req.params.id, did);
  if (!a) return res.status(404).json({ error: 'Not found' });
  const { phase, item_index, completed } = req.body;
  db.prepare(`INSERT INTO assessment_checklist (assessment_id, phase, item_index, completed)
    VALUES (?,?,?,?) ON CONFLICT(assessment_id, phase, item_index) DO UPDATE SET completed=excluded.completed, updated_at=CURRENT_TIMESTAMP`)
    .run(a.id, phase, item_index, completed ? 1 : 0);
  res.json({ ok: true });
});

// ════════════════════════════════════════════════════════════════
//  AUDIT REQUESTS (district users request new audits)
// ════════════════════════════════════════════════════════════════

app.get('/api/audit-requests', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  if (req.session.role === 'platform_admin') {
    // Admin sees all requests (or filtered by active district)
    res.json(db.prepare(`
      SELECT ar.*, u.full_name as requester_name, u.username as requester_username, d.name as district_name
      FROM audit_requests ar
      JOIN users u ON ar.requested_by = u.id
      JOIN districts d ON ar.district_id = d.id
      ORDER BY ar.created_at DESC
    `).all());
  } else {
    // District users see only their district's requests
    res.json(db.prepare(`
      SELECT ar.*, u.full_name as requester_name, u.username as requester_username
      FROM audit_requests ar
      JOIN users u ON ar.requested_by = u.id
      WHERE ar.district_id = ?
      ORDER BY ar.created_at DESC
    `).all(did));
  }
});

app.post('/api/audit-requests', requireAuth, requireRole('platform_admin', 'district_it', 'superintendent'), (req, res) => {
  const did = req.session.role === 'platform_admin'
    ? Number(req.body.district_id || req.body.districtId)
    : getDistrictId(req);
  const { notes } = req.body;
  const normalizeAuditType = (type) => {
    if (!type || type === 'CCRE Self-Assessment') return 'CCRE Audit';
    if (type === 'CAGR Self-Assessment' || type === 'CAIRE Self-Assessment') return 'CAIRE Audit';
    return type;
  };
  const assessmentType = normalizeAuditType(req.body.assessment_type || req.body.assessmentType || 'CCRE Audit');
  if (!did) return res.status(400).json({ error: 'District is required' });
  if (!['CCRE Audit', 'CAIRE Audit', 'Both'].includes(assessmentType)) {
    return res.status(400).json({ error: 'Invalid assessment type' });
  }
  // Check for existing pending request
  const existing = db.prepare(`
    SELECT id, assessment_type FROM audit_requests
    WHERE district_id = ? AND status IN ('pending','approved','in_progress')
  `).all(did).find(row => {
    const existingType = normalizeAuditType(row.assessment_type);
    return existingType === assessmentType || existingType === 'Both' || assessmentType === 'Both';
  });
  if (existing) return res.status(409).json({ error: 'An active audit request already exists for this district.' });
  const result = db.prepare('INSERT INTO audit_requests (district_id, assessment_type, requested_by, notes) VALUES (?,?,?,?)')
    .run(did, assessmentType, req.session.userId, notes || null);
  auditLog(req, 'request_audit', 'audit_request', result.lastInsertRowid, `${assessmentType}: ${notes || ''}`);
  res.json({ id: result.lastInsertRowid });
});

app.put('/api/audit-requests/:id', requireAuth, requireRole('platform_admin'), (req, res) => {
  const { status, admin_notes, assessment_id } = req.body;
  const validStatuses = ['pending', 'approved', 'in_progress', 'completed', 'declined'];
  if (status && !validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const updates = [];
  const params = [];
  if (status) { updates.push('status = ?'); params.push(status); }
  if (admin_notes !== undefined) { updates.push('admin_notes = ?'); params.push(admin_notes); }
  if (assessment_id) { updates.push('assessment_id = ?'); params.push(assessment_id); }
  updates.push('updated_at = CURRENT_TIMESTAMP');
  params.push(req.params.id);
  db.prepare(`UPDATE audit_requests SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  auditLog(req, 'update_audit_request', 'audit_request', Number(req.params.id), `status=${status || 'unchanged'}`);
  res.json({ ok: true });
});

// ════════════════════════════════════════════════════════════════
//  REPORT GENERATION (CCRE-aligned cybersecurity-governance Word document)
// ════════════════════════════════════════════════════════════════

app.post('/api/assessments/:id/generate-report', requireAuth, requireRole('platform_admin'), async (req, res) => {
  try {
    const did = getDistrictId(req);
    const assessment = db.prepare('SELECT * FROM assessments WHERE id = ? AND district_id = ?').get(req.params.id, did);
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });

    const district = db.prepare('SELECT * FROM districts WHERE id = ?').get(did);
    const ratings = db.prepare('SELECT * FROM assessment_ratings WHERE assessment_id = ?').all(assessment.id);
    const auditor = db.prepare('SELECT full_name FROM users WHERE id = ?').get(req.session.userId);

    // Get self-assessment ratings for comparison (latest completed)
    const selfAssess = db.prepare("SELECT ratings FROM self_assessments WHERE district_id = ? AND status = 'completed' ORDER BY updated_at DESC LIMIT 1").get(did);
    let selfAssessmentRatings = null;
    if (selfAssess) {
      try { selfAssessmentRatings = JSON.parse(selfAssess.ratings); } catch (e) { /* ignore */ }
    }

    const buffer = await generateCCREReport({
      district,
      assessment,
      ratings,
      auditorName: auditor?.full_name || 'CyberReady Auditor',
      selfAssessmentRatings,
    });

    const filename = `Cybersecurity_Governance_Report_${district.slug}_${new Date().toISOString().split('T')[0]}.docx`;

    // Store in DB for district access
    db.prepare('INSERT INTO assessment_reports (assessment_id, district_id, generated_by, filename, report_data) VALUES (?,?,?,?,?)')
      .run(assessment.id, did, req.session.userId, filename, buffer);

    auditLog(req, 'generate_report', 'assessment_report', assessment.id, filename);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (err) {
    console.error('Report generation error:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// List reports for a district
app.get('/api/reports', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  res.json(db.prepare(`
    SELECT r.id, r.assessment_id, r.filename, r.created_at, u.full_name as generated_by_name, a.name as assessment_name
    FROM assessment_reports r
    JOIN users u ON r.generated_by = u.id
    JOIN assessments a ON r.assessment_id = a.id
    WHERE r.district_id = ?
    ORDER BY r.created_at DESC
  `).all(did));
});

// Download a specific report
app.get('/api/reports/:id/download', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const report = db.prepare('SELECT * FROM assessment_reports WHERE id = ? AND district_id = ?').get(req.params.id, did);
  if (!report) return res.status(404).json({ error: 'Report not found' });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${report.filename}"`);
  res.send(report.report_data);
});

// ════════════════════════════════════════════════════════════════
//  SELF-ASSESSMENT (server-side persistence)
// ════════════════════════════════════════════════════════════════

// ── CCRR / CEAM v1.0 ──────────────────────────────────────────
// These routes are intentionally separate from self_assessments. Legacy CCRE/
// Cybersecurity Rubric snapshots remain preserved and are never score-converted.
function getCcrrAssessment(req, assessmentId) {
  const assessment = db.prepare('SELECT * FROM ccrr_assessments WHERE id = ? AND district_id = ?')
    .get(assessmentId, getDistrictId(req));
  if (!assessment) return null;
  assessment.domain_assessments = db.prepare('SELECT * FROM ccrr_domain_assessments WHERE assessment_id = ? ORDER BY domain_id').all(assessment.id);
  assessment.evidence = db.prepare('SELECT * FROM ccrr_evidence WHERE assessment_id = ? ORDER BY reviewed_date DESC, id DESC').all(assessment.id);
  assessment.findings = db.prepare('SELECT * FROM ccrr_findings WHERE assessment_id = ? ORDER BY critical_gap DESC, updated_at DESC').all(assessment.id);
  assessment.roadmap = db.prepare('SELECT * FROM ccrr_roadmap_items WHERE assessment_id = ? ORDER BY id').all(assessment.id);
  assessment.scores = calculateScores(assessment.domain_assessments);
  return assessment;
}

app.get('/api/ccrr-assessments', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  res.json(db.prepare(`SELECT id, name, status, rubric_key, rubric_version, evidence_methodology_key,
    evidence_methodology_version, prior_assessment_id, reassessment_trigger, created_at, updated_at
    FROM ccrr_assessments WHERE district_id = ? ORDER BY updated_at DESC`).all(did));
});

app.post('/api/ccrr-assessments', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const did = getDistrictId(req);
  const { name, prior_assessment_id, reassessment_trigger } = req.body;
  if (!did || !name?.trim()) return res.status(400).json({ error: 'District and assessment name are required' });
  if (prior_assessment_id && !db.prepare('SELECT id FROM ccrr_assessments WHERE id = ? AND district_id = ?').get(prior_assessment_id, did)) {
    return res.status(400).json({ error: 'Prior assessment must belong to the active district' });
  }
  const result = db.prepare(`INSERT INTO ccrr_assessments
    (district_id, assessor_id, name, status, prior_assessment_id, reassessment_trigger) VALUES (?,?,?,'in_progress',?,?)`)
    .run(did, req.session.userId, name.trim(), prior_assessment_id || null, reassessment_trigger || null);
  auditLog(req, 'create_ccrr_assessment', 'ccrr_assessment', result.lastInsertRowid, 'ccrr_v1 / ceam_v1');
  res.json(getCcrrAssessment(req, result.lastInsertRowid));
});

app.get('/api/ccrr-assessments/:id', requireAuth, (req, res) => {
  const assessment = getCcrrAssessment(req, req.params.id);
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  res.json(assessment);
});

app.post('/api/ccrr-assessments/:id/domains', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const assessment = getCcrrAssessment(req, req.params.id);
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  const { domain_id, current_maturity, target_maturity, confidence, rating_rationale, risk_sensitive_critical } = req.body;
  if (!CCRR_DOMAIN_FUNCTIONS[domain_id]) return res.status(400).json({ error: 'Unknown CCRR v1.0 domain' });
  if (current_maturity !== null && current_maturity !== undefined && (!Number.isInteger(current_maturity) || current_maturity < 1 || current_maturity > 5)) {
    return res.status(400).json({ error: 'Current maturity must be an integer from 1 to 5' });
  }
  if (target_maturity !== null && target_maturity !== undefined && (!Number.isInteger(target_maturity) || target_maturity < 1 || target_maturity > 5)) {
    return res.status(400).json({ error: 'Target maturity must be an integer from 1 to 5' });
  }
  if (confidence && !['High', 'Moderate', 'Low'].includes(confidence)) return res.status(400).json({ error: 'Invalid CEAM confidence' });
  if (Number(current_maturity) >= 2) {
    const supportingEvidence = db.prepare(`SELECT COUNT(*) AS count FROM ccrr_evidence
      WHERE assessment_id = ? AND domain_id = ? AND validation_status IN ('Accepted','Partial')`).get(assessment.id, domain_id).count;
    if (!supportingEvidence) {
      return res.status(400).json({ error: 'CEAM requires accepted or partial evidence before assigning CCRR Level 2 or higher' });
    }
  }
  const critical = Number(current_maturity) === 1 || Boolean(risk_sensitive_critical);
  db.prepare(`INSERT INTO ccrr_domain_assessments
    (assessment_id, domain_id, current_maturity, target_maturity, confidence, rating_rationale, critical_gap, risk_sensitive_critical, assessor_id)
    VALUES (?,?,?,?,?,?,?,?,?)
    ON CONFLICT(assessment_id, domain_id) DO UPDATE SET current_maturity=excluded.current_maturity,
    target_maturity=excluded.target_maturity, confidence=excluded.confidence, rating_rationale=excluded.rating_rationale,
    critical_gap=excluded.critical_gap, risk_sensitive_critical=excluded.risk_sensitive_critical,
    assessor_id=excluded.assessor_id, assessed_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP`)
    .run(assessment.id, domain_id, current_maturity || null, target_maturity || null, confidence || null,
      rating_rationale || null, critical ? 1 : 0, risk_sensitive_critical ? 1 : 0, req.session.userId);
  auditLog(req, 'rate_ccrr_domain', 'ccrr_domain_assessment', domain_id, `${current_maturity || 'unrated'}→${target_maturity || 'untargeted'}`);
  res.json(getCcrrAssessment(req, assessment.id));
});

app.post('/api/ccrr-assessments/:id/evidence', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const assessment = getCcrrAssessment(req, req.params.id);
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  const fields = ['domain_id', 'evidence_type', 'title', 'source_owner', 'source_location', 'effective_or_observed_date', 'reviewed_date', 'scope', 'validation_status'];
  if (fields.some(field => !req.body[field]) || !CCRR_DOMAIN_FUNCTIONS[req.body.domain_id] || !CEAM_VALIDATION_STATUSES.includes(req.body.validation_status)) {
    return res.status(400).json({ error: 'A complete CEAM evidence record with a valid domain and validation status is required' });
  }
  const e = req.body;
  const result = db.prepare(`INSERT INTO ccrr_evidence (assessment_id, domain_id, evidence_type, title, source_owner, source_location,
    effective_or_observed_date, reviewed_date, scope, assessor_notes, validation_status, confidentiality, retention_or_review_date)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(assessment.id, e.domain_id, e.evidence_type, e.title, e.source_owner, e.source_location,
    e.effective_or_observed_date, e.reviewed_date, e.scope, e.assessor_notes || null, e.validation_status, e.confidentiality || null, e.retention_or_review_date || null);
  auditLog(req, 'add_ceam_evidence', 'ccrr_evidence', result.lastInsertRowid, e.domain_id);
  res.json(getCcrrAssessment(req, assessment.id));
});

app.post('/api/ccrr-assessments/:id/findings', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const assessment = getCcrrAssessment(req, req.params.id);
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  const f = req.body;
  if (!CCRR_DOMAIN_FUNCTIONS[f.domain_id] || !CEAM_GAP_TYPES.includes(f.gap_type) || !f.title?.trim()) return res.status(400).json({ error: 'A valid CCRR domain, CEAM gap type, and title are required' });
  const result = db.prepare(`INSERT INTO ccrr_findings (assessment_id, domain_id, gap_type, title, description, affected_scope, criticality, confidence, critical_gap)
    VALUES (?,?,?,?,?,?,?,?,?)`).run(assessment.id, f.domain_id, f.gap_type, f.title.trim(), f.description || null, f.affected_scope || null,
    f.criticality || null, f.confidence || null, f.critical_gap ? 1 : 0);
  auditLog(req, 'create_ceam_finding', 'ccrr_finding', result.lastInsertRowid, f.gap_type);
  res.json(getCcrrAssessment(req, assessment.id));
});

app.post('/api/ccrr-assessments/:id/roadmap', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const assessment = getCcrrAssessment(req, req.params.id);
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  const item = req.body;
  if (!CCRR_DOMAIN_FUNCTIONS[item.domain_id] || !Number.isInteger(item.current_level) || !Number.isInteger(item.target_level) ||
    item.current_level < 1 || item.target_level > 5 || item.target_level <= item.current_level ||
    !/^([1-4])→([2-5])$/.test(item.advancement_transition || '') || !item.advancement_action?.trim()) {
    return res.status(400).json({ error: 'A valid sequential CCRR advancement item is required' });
  }
  const result = db.prepare(`INSERT INTO ccrr_roadmap_items (assessment_id, domain_id, current_level, target_level, gap_statement,
    advancement_transition, advancement_action, owner, priority, due_date, expected_evidence, dependencies, status, reassessment_trigger)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(assessment.id, item.domain_id, item.current_level, item.target_level,
    item.gap_statement || null, item.advancement_transition, item.advancement_action.trim(), item.owner || null, item.priority || null,
    item.due_date || null, item.expected_evidence || null, item.dependencies || null, item.status || 'Planned', item.reassessment_trigger || null);
  auditLog(req, 'create_ccrr_roadmap_item', 'ccrr_roadmap_item', result.lastInsertRowid, item.advancement_transition);
  res.json(getCcrrAssessment(req, assessment.id));
});

app.get('/api/self-assessment', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const sa = db.prepare('SELECT * FROM self_assessments WHERE district_id = ? AND user_id = ? ORDER BY updated_at DESC LIMIT 1')
    .get(did, req.session.userId);
  if (!sa) return res.json(null);
  sa.ratings = JSON.parse(sa.ratings);
  sa.notes = JSON.parse(sa.notes);
  res.json(sa);
});

app.get('/api/self-assessment/history', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  res.json(db.prepare('SELECT id, status, timeframe, created_at, updated_at FROM self_assessments WHERE district_id = ? ORDER BY updated_at DESC').all(did));
});

app.post('/api/self-assessment', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const { timeframe, ratings, notes, status } = req.body;
  // Upsert: update latest draft/in_progress or create new
  const existing = db.prepare("SELECT id FROM self_assessments WHERE district_id = ? AND user_id = ? AND status != 'completed' ORDER BY updated_at DESC LIMIT 1")
    .get(did, req.session.userId);
  if (existing) {
    db.prepare('UPDATE self_assessments SET timeframe=?, ratings=?, notes=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?')
      .run(timeframe || '', JSON.stringify(ratings || {}), JSON.stringify(notes || {}), status || 'in_progress', existing.id);
    res.json({ id: existing.id });
  } else {
    const result = db.prepare('INSERT INTO self_assessments (district_id, user_id, timeframe, ratings, notes, status) VALUES (?,?,?,?,?,?)')
      .run(did, req.session.userId, timeframe || '', JSON.stringify(ratings || {}), JSON.stringify(notes || {}), status || 'draft');
    res.json({ id: result.lastInsertRowid });
  }
});

app.post('/api/self-assessment/snapshot', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const { timeframe, ratings, notes } = req.body;
  const result = db.prepare('INSERT INTO self_assessments (district_id, user_id, timeframe, ratings, notes, status) VALUES (?,?,?,?,?,?)')
    .run(did, req.session.userId, timeframe || '', JSON.stringify(ratings || {}), JSON.stringify(notes || {}), 'completed');
  auditLog(req, 'create_assessment_snapshot', 'self_assessment', result.lastInsertRowid, null);
  res.json({ id: result.lastInsertRowid });
});

// ════════════════════════════════════════════════════════════════
//  AUDIT LOG
// ════════════════════════════════════════════════════════════════

app.get('/api/ai-systems', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const systems = db.prepare(`
    SELECT s.*,
           ROUND(AVG(r.maturity_level), 1) as avgMaturity
    FROM ai_systems s
    LEFT JOIN cagr_ratings r ON r.ai_system_id = s.id
    WHERE s.district_id = ?
    GROUP BY s.id
    ORDER BY s.created_at DESC, s.id DESC
  `).all(did);
  res.json(systems.map(s => ({
    ...s,
    avgMaturity: s.avgMaturity == null ? null : Number(s.avgMaturity),
  })));
});

app.post('/api/ai-systems', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const did = getDistrictId(req);
  if (!did) return res.status(400).json({ error: 'No active district selected' });
  const {
    name,
    description,
    ai_lifecycle_stage,
    use_case,
    human_oversight_model,
    third_party_components,
  } = req.body;
  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const result = db.prepare(`
    INSERT INTO ai_systems
      (district_id, name, description, ai_lifecycle_stage,
       use_case, human_oversight_model, third_party_components)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    did,
    String(name).trim(),
    description || null,
    ai_lifecycle_stage || 'deploy_use',
    use_case || null,
    human_oversight_model || 'human_on_loop',
    third_party_components || null
  );

  const created = db.prepare('SELECT * FROM ai_systems WHERE id = ? AND district_id = ?')
    .get(result.lastInsertRowid, did);
  auditLog(req, 'create_ai_system', 'ai_system', result.lastInsertRowid, created.name);
  res.status(201).json(created);
});

app.get('/api/ai-systems/:id/ratings', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const system = db.prepare('SELECT id, name FROM ai_systems WHERE id = ? AND district_id = ?')
    .get(req.params.id, did);
  if (!system) return res.status(404).json({ error: 'AI system not found' });

  const rows = db.prepare(`
    SELECT cagr_function, category_id, maturity_level, notes
    FROM cagr_ratings
    WHERE ai_system_id = ? AND district_id = ?
    ORDER BY cagr_function, category_id
  `).all(system.id, did);

  const ratings = { GOVERN: {}, MAP: {}, MEASURE: {}, MANAGE: {} };
  rows.forEach(row => {
    ratings[row.cagr_function][row.category_id] = {
      maturity_level: row.maturity_level,
      notes: row.notes || '',
    };
  });

  res.json({
    systemId: system.id,
    systemName: system.name,
    ratings,
  });
});

app.post('/api/ai-systems/:id/ratings', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const did = getDistrictId(req);
  const system = db.prepare('SELECT id FROM ai_systems WHERE id = ? AND district_id = ?')
    .get(req.params.id, did);
  if (!system) return res.status(404).json({ error: 'AI system not found' });

  const { cagr_function, category_id, maturity_level, notes } = req.body;
  if (!['GOVERN', 'MAP', 'MEASURE', 'MANAGE'].includes(cagr_function)) {
    return res.status(400).json({ error: 'Invalid CAGR function' });
  }
  const level = Number(maturity_level);
  if (!category_id || level < 1 || level > 5) {
    return res.status(400).json({ error: 'Invalid rating' });
  }

  db.prepare(`
    INSERT OR REPLACE INTO cagr_ratings
      (district_id, ai_system_id, cagr_function, category_id,
       maturity_level, notes, assessed_by, assessed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `).run(
    did,
    system.id,
    cagr_function,
    category_id,
    level,
    notes || null,
    req.session.userId
  );
  auditLog(req, 'save_cagr_rating', 'ai_system', system.id, `${cagr_function} ${category_id}=${level}`);
  res.json({ success: true });
});

app.get('/api/ai-governance/summary', requireAuth, (req, res) => {
  const did = getDistrictId(req);
  const systemCount = db.prepare('SELECT COUNT(*) as c FROM ai_systems WHERE district_id = ?').get(did).c;
  const ratedSystemCount = db.prepare(`
    SELECT COUNT(DISTINCT ai_system_id) as c
    FROM cagr_ratings
    WHERE district_id = ?
  `).get(did).c;
  const overallRow = db.prepare(`
    SELECT ROUND(AVG(maturity_level), 1) as avg
    FROM cagr_ratings
    WHERE district_id = ?
  `).get(did);

  const functionScores = { GOVERN: null, MAP: null, MEASURE: null, MANAGE: null };
  db.prepare(`
    SELECT cagr_function, ROUND(AVG(maturity_level), 1) as avg
    FROM cagr_ratings
    WHERE district_id = ?
    GROUP BY cagr_function
  `).all(did).forEach(row => {
    functionScores[row.cagr_function] = row.avg == null ? null : Number(row.avg);
  });

  const systems = db.prepare(`
    SELECT s.id, s.name,
           ROUND(AVG(r.maturity_level), 1) as avgMaturity,
           COUNT(DISTINCT r.category_id) as ratedCategories
    FROM ai_systems s
    LEFT JOIN cagr_ratings r ON r.ai_system_id = s.id
    WHERE s.district_id = ?
    GROUP BY s.id
    ORDER BY s.created_at DESC, s.id DESC
  `).all(did).map(s => ({
    id: s.id,
    name: s.name,
    avgMaturity: s.avgMaturity == null ? null : Number(s.avgMaturity),
    ratedCategories: s.ratedCategories || 0,
    totalCategories: 19,
  }));
  const totalAssessableCategories = systemCount * 19;
  const assessedCategories = systems.reduce((sum, system) => sum + system.ratedCategories, 0);
  const categoriesAssessedPct = totalAssessableCategories > 0
    ? Math.round((assessedCategories * 1000) / totalAssessableCategories) / 10
    : 0;

  res.json({
    systemCount,
    ratedSystemCount,
    overallAvgMaturity: overallRow.avg == null ? null : Number(overallRow.avg),
    assessedCategories,
    totalAssessableCategories,
    categoriesAssessedPct,
    categoriesValidatedPct: null,
    functionScores,
    systemsNeedingAttention: systems
      .filter(s => s.avgMaturity == null || s.avgMaturity < 2.0)
      .map(({ id, name, avgMaturity }) => ({ id, name, avgMaturity })),
    systems,
  });
});

app.get('/api/audit-log', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const did = getDistrictId(req);
  const limit = Math.min(parseInt(req.query.limit) || 100, 500);
  const offset = parseInt(req.query.offset) || 0;

  let query, params;
  if (req.session.role === 'platform_admin' && !req.query.districtOnly) {
    // Platform admins see everything
    query = 'SELECT * FROM audit_log ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params = [limit, offset];
  } else {
    // district_it and superintendent see only their district's activity,
    // AND only actions performed by district-level users (not platform_admin actions)
    query = `SELECT * FROM audit_log
             WHERE district_id = ?
               AND (user_role IS NULL OR user_role != 'platform_admin')
             ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params = [did, limit, offset];
  }
  res.json(db.prepare(query).all(...params));
});

// ════════════════════════════════════════════════════════════════
//  MASTERCLASS REQUESTS
// ════════════════════════════════════════════════════════════════

app.post('/api/masterclass-requests', requireAuth, (req, res) => {
  const { full_name, email, organization, role, format_preference, availability, message } = req.body;
  if (!full_name || !email || !organization || !role || !format_preference) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const stmt = db.prepare(`
    INSERT INTO masterclass_requests (full_name, email, organization, role, format_preference, availability, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(full_name, email, organization, role, format_preference, availability || null, message || null);
  logAction(req, 'request_masterclass', 'masterclass_request', result.lastInsertRowid, `${full_name} — ${organization}`);
  res.status(201).json({ id: result.lastInsertRowid });
});

app.get('/api/masterclass-requests', requireAuth, requireRole('platform_admin'), (req, res) => {
  res.json(db.prepare('SELECT * FROM masterclass_requests ORDER BY created_at DESC').all());
});

// ════════════════════════════════════════════════════════════════
//  FINDINGS — DOCUMENT UPLOAD + AI EVALUATION
// ════════════════════════════════════════════════════════════════

// Helper: extract text from uploaded file buffer
async function extractText(file) {
  const name = file.originalname.toLowerCase();
  if (name.endsWith('.txt') || file.mimetype === 'text/plain') {
    return file.buffer.toString('utf-8');
  }
  if (name.endsWith('.docx') || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }
  if (name.endsWith('.pdf') || file.mimetype === 'application/pdf') {
    // Basic fallback: try to read as text (works for text-layer PDFs only)
    const text = file.buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ').trim();
    return text.length > 100 ? text : null;
  }
  return file.buffer.toString('utf-8');
}

// Helper: call Claude to extract findings from document text
async function extractFindingsWithAI(text, districtName) {
  if (!anthropic) return null;

  const systemPrompt = `You are a K-12 cybersecurity analyst reviewing documents for school districts.
Extract all cybersecurity findings, risks, gaps, weaknesses, or concerns from the provided text.
Return ONLY a valid JSON array of findings. Each finding must have these exact fields:
- title: string (max 80 chars, concise)
- description: string (brief explanation of the finding)
- severity: exactly one of "Critical", "High", "Medium", "Low"
- status: always "Open"
- owner: suggested responsible party (e.g., "IT Director", "Superintendent", "Business Manager", "Principal", "Network Administrator")
- nist_function: exactly one of "Govern", "Identify", "Protect", "Detect", "Respond", "Recover"
- recommended_action: specific remediation step
- notes: any additional context or source reference from the document

If there are no cybersecurity findings, return an empty array [].
Do not include any text outside the JSON array.`;

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{
      role: 'user',
      content: `District: ${districtName || 'Unknown'}\n\nDocument text:\n\n${text.slice(0, 15000)}`,
    }],
  });

  const raw = response.content[0]?.text?.trim() || '[]';
  // Extract JSON array from response (handle markdown code blocks)
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) return [];

  const findings = JSON.parse(jsonMatch[0]);
  return Array.isArray(findings) ? findings : [];
}

// GET /api/findings/documents — list uploaded documents for district
app.get('/api/findings/documents', requireAuth, requireRole('platform_admin', 'district_it'), (req, res) => {
  const did = getDistrictId(req);
  if (!did) return res.json([]);
  res.json(db.prepare(
    'SELECT * FROM finding_documents WHERE district_id = ? ORDER BY created_at DESC'
  ).all(did));
});

// POST /api/findings/upload — upload doc, extract text, run AI evaluation
app.post('/api/findings/upload',
  requireAuth, requireRole('platform_admin', 'district_it'),
  findingsUploadLimiter,
  upload.single('document'),
  async (req, res) => {
    const did = getDistrictId(req);
    if (!did) return res.status(400).json({ error: 'No active district selected' });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    let contentText;
    try {
      contentText = await extractText(req.file);
    } catch (err) {
      return res.status(422).json({ error: `Could not read file: ${err.message}` });
    }

    if (!contentText || contentText.trim().length < 50) {
      return res.status(422).json({ error: 'Document appears to be empty or could not be read as text.' });
    }

    // Get district name for context
    const district = db.prepare('SELECT name FROM districts WHERE id = ?').get(did);

    // Run AI extraction (or skip gracefully if no API key)
    let aiFindings = [];
    let aiError = null;
    try {
      aiFindings = await extractFindingsWithAI(contentText, district?.name) || [];
    } catch (err) {
      aiError = anthropic
        ? 'AI-assisted extraction did not complete. Review server logs for details.'
        : 'AI-assisted extraction is not configured for this deployment.';
    }

    // Save the document record
    const docResult = db.prepare(
      'INSERT INTO finding_documents (district_id, original_name, file_type, content_text, findings_count, uploaded_by, uploaded_by_name) VALUES (?,?,?,?,?,?,?)'
    ).run(did, req.file.originalname, req.file.mimetype, contentText.slice(0, 50000), aiFindings.length, req.session.userId || null, req.session.username || null);

    const documentId = docResult.lastInsertRowid;

    // Insert AI-extracted findings into risks table
    const insertRisk = db.prepare(`
      INSERT INTO risks (district_id, title, severity, status, owner, category, nist_function, recommended_action, notes, discovered_date, source_type)
      VALUES (?,?,?,?,?,?,?,?,?,DATE('now'),'ai_evaluated')
    `);

    const inserted = [];
    for (const f of aiFindings) {
      const sev = ['Critical','High','Medium','Low'].includes(f.severity) ? f.severity : 'Medium';
      const fn  = ['Govern','Identify','Protect','Detect','Respond','Recover'].includes(f.nist_function) ? f.nist_function : null;
      const result = insertRisk.run(
        did,
        String(f.title || 'Untitled Finding').slice(0, 200),
        sev,
        'Open',
        f.owner || null,
        fn || null,
        fn,
        f.recommended_action || null,
        f.notes ? `[Document: ${req.file.originalname}] ${f.notes}` : `[Document: ${req.file.originalname}]`,
      );
      inserted.push({ id: result.lastInsertRowid, ...f, severity: sev });
    }

    auditLog(req, 'upload_findings_document', 'finding_document', documentId,
      `${req.file.originalname} — ${aiFindings.length} findings extracted`);

    res.status(201).json({
      documentId,
      filename: req.file.originalname,
      findingsExtracted: inserted.length,
      findings: inserted,
      aiEnabled: !!anthropic,
      aiError,
    });
  }
);

// ════════════════════════════════════════════════════════════════
//  STATIC FILES (production)
// ════════════════════════════════════════════════════════════════

app.post('/api/demo/reset',
  requireAuth,
  requireRole('platform_admin'),
  (req, res) => {
    if (process.env.DEMO_RESET_ENABLED !== 'true') {
      return res.status(404).json({ error: 'Not found' });
    }
    try {
      if (!req.session.username) {
        return res.status(401).json({ success: false, error: 'Session username is unavailable.' });
      }
      const { resetWalkervilleDemo } = require('./database');
      resetWalkervilleDemo(db);
      const refreshedUser = db.prepare('SELECT * FROM users WHERE username = ?')
        .get(req.session.username);
      if (refreshedUser) {
        req.session.userId = refreshedUser.id;
        req.session.role = refreshedUser.role;
        req.session.districtId = refreshedUser.district_id;
        req.session.activeDistrictId = refreshedUser.role === 'platform_admin'
          ? null
          : refreshedUser.district_id;
      }
      res.json({
        success: true,
        message: 'Demo data reset to seed state.'
      });
    } catch (err) {
      console.error('Demo reset error:', err);
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
);

if (isProduction) {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`HallMonitor API running on http://localhost:${PORT}`);
});
