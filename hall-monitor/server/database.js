const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '..', 'hallmonitor.db');

function initDatabase() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // ── Tenant table ──────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS districts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      state TEXT,
      student_count INTEGER,
      staff_count INTEGER,
      school_count INTEGER,
      fiscal_year TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Users with roles + district FK ────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('platform_admin','district_it','superintendent')),
      district_id INTEGER REFERENCES districts(id),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Health categories (per district) ──────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS health_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      name TEXT NOT NULL,
      weight REAL NOT NULL,
      score REAL NOT NULL,
      max_score REAL NOT NULL DEFAULT 100,
      description TEXT,
      sort_order INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_by INTEGER REFERENCES users(id),
      source_type TEXT DEFAULT 'manual'
    )
  `);

  // ── Dashboard metrics (per district) ──────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS dashboard_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      metric_key TEXT NOT NULL,
      metric_value TEXT NOT NULL,
      label TEXT NOT NULL,
      icon TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_by INTEGER REFERENCES users(id),
      source_type TEXT DEFAULT 'manual',
      UNIQUE(district_id, metric_key)
    )
  `);

  // ── Risks (per district) ─────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS risks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      title TEXT NOT NULL,
      severity TEXT NOT NULL CHECK(severity IN ('Critical','High','Medium','Low')),
      status TEXT NOT NULL CHECK(status IN ('Open','In Progress','Mitigated','Closed')),
      owner TEXT,
      category TEXT,
      recommended_action TEXT,
      notes TEXT,
      discovered_date DATE,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_by INTEGER REFERENCES users(id),
      source_type TEXT DEFAULT 'manual'
    )
  `);

  // Migrations: add nist_function to risks for existing databases
  try { db.exec("ALTER TABLE risks ADD COLUMN nist_function TEXT"); } catch { /* already exists */ }

  // ── Finding Documents ────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS finding_documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      original_name TEXT NOT NULL,
      file_type TEXT,
      content_text TEXT,
      findings_count INTEGER DEFAULT 0,
      uploaded_by INTEGER REFERENCES users(id),
      uploaded_by_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  try { db.exec('ALTER TABLE finding_documents ADD COLUMN assessment_id INTEGER REFERENCES assessments(id)'); } catch { /* already exists */ }

  // ── Training (per district) ──────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS training (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      department TEXT NOT NULL,
      total_staff INTEGER NOT NULL,
      completed INTEGER NOT NULL,
      completion_pct REAL GENERATED ALWAYS AS (ROUND(completed * 100.0 / total_staff, 1)) STORED,
      last_updated DATE,
      updated_by INTEGER REFERENCES users(id),
      source_type TEXT DEFAULT 'manual'
    )
  `);

  // ── Phishing simulations (per district) ──────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS phishing_sims (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      campaign_name TEXT NOT NULL,
      send_date DATE NOT NULL,
      total_sent INTEGER NOT NULL,
      opened INTEGER NOT NULL,
      clicked INTEGER NOT NULL,
      reported INTEGER NOT NULL,
      department TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      source_type TEXT DEFAULT 'manual'
    )
  `);

  // ── Compliance (per district) ────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS compliance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      framework TEXT NOT NULL,
      category TEXT NOT NULL,
      requirement TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('Met','Partially Met','Not Met','N/A')),
      evidence TEXT,
      notes TEXT,
      sort_order INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_by INTEGER REFERENCES users(id),
      source_type TEXT DEFAULT 'manual'
    )
  `);

  // ── Assessments (server-side, per district) ──────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS assessments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      user_id INTEGER NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'in_progress' CHECK(status IN ('draft','in_progress','completed')),
      overall_maturity REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS assessment_ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assessment_id INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
      nist_function TEXT NOT NULL,
      category TEXT NOT NULL,
      level INTEGER NOT NULL CHECK(level BETWEEN 1 AND 5),
      evidence TEXT,
      notes TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(assessment_id, nist_function, category)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS assessment_checklist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assessment_id INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
      phase TEXT NOT NULL,
      item_index INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(assessment_id, phase, item_index)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS interview_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assessment_id INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
      nist_function TEXT NOT NULL,
      category TEXT NOT NULL,
      target_level INTEGER NOT NULL,
      question TEXT NOT NULL,
      response TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(assessment_id, nist_function, category, target_level, question)
    )
  `);

  // ── Self-assessment snapshots (per district) ──────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS self_assessments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      user_id INTEGER NOT NULL REFERENCES users(id),
      status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','in_progress','completed')),
      timeframe TEXT,
      ratings TEXT NOT NULL DEFAULT '{}',
      notes TEXT NOT NULL DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Audit requests (districts request new audits) ─────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS ai_systems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      name TEXT NOT NULL,
      description TEXT,
      ai_lifecycle_stage TEXT DEFAULT 'deploy_use'
        CHECK(ai_lifecycle_stage IN (
          'plan_design','data_collection','build_use',
          'verify_validate','deploy_use','operate_monitor'
        )),
      use_case TEXT,
      human_oversight_model TEXT DEFAULT 'human_on_loop'
        CHECK(human_oversight_model IN (
          'human_in_loop','human_on_loop','human_out_of_loop'
        )),
      third_party_components TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS cagr_ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      ai_system_id INTEGER NOT NULL REFERENCES ai_systems(id),
      cagr_function TEXT NOT NULL
        CHECK(cagr_function IN ('GOVERN','MAP','MEASURE','MANAGE')),
      category_id TEXT NOT NULL,
      maturity_level INTEGER CHECK(maturity_level BETWEEN 1 AND 5),
      notes TEXT,
      assessed_by INTEGER REFERENCES users(id),
      assessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(ai_system_id, cagr_function, category_id)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      assessment_type TEXT DEFAULT 'CCRE Self-Assessment',
      requested_by INTEGER NOT NULL REFERENCES users(id),
      status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','in_progress','completed','declined')),
      notes TEXT,
      admin_notes TEXT,
      assessment_id INTEGER REFERENCES assessments(id),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Generated reports ────────────────────────────────────────
  try { db.exec("ALTER TABLE audit_requests ADD COLUMN assessment_type TEXT DEFAULT 'CCRE Self-Assessment'"); } catch { /* already exists */ }

  db.exec(`
    CREATE TABLE IF NOT EXISTS assessment_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assessment_id INTEGER NOT NULL REFERENCES assessments(id),
      district_id INTEGER NOT NULL REFERENCES districts(id),
      generated_by INTEGER NOT NULL REFERENCES users(id),
      filename TEXT NOT NULL,
      report_data BLOB NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Audit log ────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER REFERENCES districts(id),
      user_id INTEGER REFERENCES users(id),
      username TEXT,
      user_role TEXT,
      action TEXT NOT NULL,
      entity_type TEXT,
      entity_id INTEGER,
      details TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  // Migration: add user_role to audit_log for existing databases
  try { db.exec('ALTER TABLE audit_log ADD COLUMN user_role TEXT'); } catch { /* already exists */ }

  // ── Prototype training modules ─────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS masterclass_modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      nist_function TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL DEFAULT 30,
      required INTEGER NOT NULL DEFAULT 1,
      provider TEXT NOT NULL DEFAULT 'CyberReady learning workflow',
      order_index INTEGER NOT NULL DEFAULT 0
    )
  `);

  // ── Per-district per-department module completions ────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS masterclass_completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      district_id INTEGER NOT NULL REFERENCES districts(id),
      module_id INTEGER NOT NULL REFERENCES masterclass_modules(id),
      department TEXT NOT NULL,
      total_staff INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      last_updated DATE,
      UNIQUE(district_id, module_id, department)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS masterclass_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      organization TEXT NOT NULL,
      role TEXT NOT NULL,
      format_preference TEXT NOT NULL,
      availability TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  try { db.exec('ALTER TABLE masterclass_requests ADD COLUMN district_id INTEGER REFERENCES districts(id)'); } catch { /* already exists */ }

  return db;
}

// ── Seed helpers ───────────────────────────────────────────────
function createSeededRandom(seed = 2026) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function requireDemoSetting(name) {
  const value = process.env[name]?.trim();
  if (!value || value.startsWith('<') || value.includes('replace-with-')) {
    throw new Error(`${name} must be set to a unique value before creating a Hall Monitor demo database. See DEMO_SETUP.md.`);
  }
  return value;
}

function insertWalkervilleDemoData(db) {
  const rand = createSeededRandom();

  // Each seeded role requires a unique, operator-provided credential.
  // The database is initialized once, so configure these before first run.
  const demoAdminUser = requireDemoSetting('DEMO_ADMIN_USER');
  const demoAdminPass = requireDemoSetting('DEMO_ADMIN_PASS');
  const demoDistrictItUser = requireDemoSetting('DEMO_DISTRICT_IT_USER');
  const demoDistrictItPass = requireDemoSetting('DEMO_DISTRICT_IT_PASS');
  const demoSuperintendentUser = requireDemoSetting('DEMO_SUPERINTENDENT_USER');
  const demoSuperintendentPass = requireDemoSetting('DEMO_SUPERINTENDENT_PASS');
  const adminHash = bcrypt.hashSync(demoAdminPass, 10);
  const districtItHash = bcrypt.hashSync(demoDistrictItPass, 10);
  const superintendentHash = bcrypt.hashSync(demoSuperintendentPass, 10);

  // ── Districts ────────────────────────────────────────────────
  const districtDefs = [
    { name: 'Walkerville School District', slug: 'walkerville', state: 'Kentucky', students: 4800, staff: 385, schools: 8, fy: '2025-2026' },
  ];
  const distStmt = db.prepare('INSERT INTO districts (name, slug, state, student_count, staff_count, school_count, fiscal_year) VALUES (?,?,?,?,?,?,?)');
  const distIds = districtDefs.map(d => distStmt.run(d.name, d.slug, d.state, d.students, d.staff, d.schools, d.fy).lastInsertRowid);

  // ── Users ────────────────────────────────────────────────────
  const userStmt = db.prepare('INSERT INTO users (username, password_hash, full_name, role, district_id) VALUES (?,?,?,?,?)');
  userStmt.run(demoAdminUser, adminHash, 'Alex Lamb', 'platform_admin', distIds[0]);
  userStmt.run(demoDistrictItUser, districtItHash, 'Valorie Frizzle', 'district_it', distIds[0]);
  userStmt.run(demoSuperintendentUser, superintendentHash, 'Valorie Frizzle', 'superintendent', distIds[0]);

  // ── Health-score profiles ────────────────────────────────────
  const healthProfiles = [
    [72, 68, 61, 78, 55, 64],   // Walkerville - moderate
  ];
  const catDefs = [
    ['Governance',             0.15, 'Policy framework, leadership commitment, risk management strategy'],
    ['Identity & Access',      0.20, 'MFA adoption, privileged access controls, account lifecycle management'],
    ['Vulnerability Management',0.20, 'Patch cadence, scan coverage, remediation timelines'],
    ['Awareness & Training',   0.15, 'Staff completion rates, phishing sim results, security culture'],
    ['Incident Response',      0.15, 'Playbook readiness, tabletop exercises, communication plans'],
    ['Recovery / Resilience',  0.15, 'Backup verification, DR testing, continuity planning'],
  ];
  const catStmt = db.prepare('INSERT INTO health_categories (district_id, name, weight, score, description, sort_order) VALUES (?,?,?,?,?,?)');
  distIds.forEach((did, di) => {
    catDefs.forEach(([name, weight, desc], ci) => catStmt.run(did, name, weight, healthProfiles[di][ci], desc, ci));
  });

  // ── Dashboard metrics (computed differently per maturity) ────
  const metricStmt = db.prepare('INSERT INTO dashboard_metrics (district_id, metric_key, metric_value, label, icon) VALUES (?,?,?,?,?)');
  const metricSets = [
    { tb: '1247',  ppr: '82', tc: '76', vc: '3', vh: '8',  vm: '15', audit: '2026-06-15', mon: 'Active' },
  ];
  distIds.forEach((did, i) => {
    const m = metricSets[i];
    metricStmt.run(did, 'threats_blocked',      m.tb,    'Threats Blocked (30d)',     'shield');
    metricStmt.run(did, 'phishing_pass_rate',   m.ppr,   'Phishing Sim Pass Rate',   'fish');
    metricStmt.run(did, 'training_compliance',  m.tc,    'Staff Training Compliance', 'graduation-cap');
    metricStmt.run(did, 'open_vulns_critical',  m.vc,    'Critical Vulnerabilities',  'alert-triangle');
    metricStmt.run(did, 'open_vulns_high',      m.vh,    'High Vulnerabilities',      'alert-circle');
    metricStmt.run(did, 'open_vulns_medium',    m.vm,    'Medium Vulnerabilities',    'info');
    metricStmt.run(did, 'next_audit',           m.audit, 'Next Audit Date',           'calendar');
    metricStmt.run(did, 'monitoring_status',    m.mon,   'Monitoring Status',         'activity');
  });

  // ── Risks ────────────────────────────────────────────────────
  const riskTemplates = [
    ['Unpatched Windows servers in district data center',     'Critical','Vulnerability Management','IT Infrastructure','Apply latest cumulative updates and establish 30-day patch cycle'],
    ['Default admin credentials on network switches',         'Critical','Identity & Access','Network Team','Rotate all default credentials and implement credential vault'],
    ['Student SIS database lacks encryption at rest',         'Critical','Vulnerability Management','Database Admin','Enable TDE or migrate to encrypted storage solution'],
    ['No MFA on staff email accounts',                        'High','Identity & Access','IT Director','Roll out MFA via Azure AD conditional access policies'],
    ['Outdated firewall firmware (2+ years)',                  'High','Vulnerability Management','Network Team','Schedule firmware upgrade during maintenance window'],
    ['Incident response plan not tested in 18 months',        'High','Incident Response','CISO','Conduct tabletop exercise with admin team within 60 days'],
    ['Backup restoration not verified this quarter',          'High','Recovery / Resilience','IT Infrastructure','Run full backup restoration test and document results'],
    ['Staff phishing click rate above 20% in elementary',     'Medium','Awareness & Training','Training Coordinator','Deploy targeted micro-training for elementary staff'],
    ['Guest Wi-Fi network not properly segmented',            'Medium','Vulnerability Management','Network Team','Implement VLAN segmentation and verify ACLs'],
    ['Acceptable use policy not updated for AI tools',        'Medium','Governance','Policy Committee','Draft AI acceptable use addendum for board review'],
    ['USB storage devices unrestricted on workstations',      'Medium','Identity & Access','IT Support','Deploy endpoint DLP policy to restrict removable media'],
    ['Disaster recovery site failover untested',              'Low','Recovery / Resilience','IT Infrastructure','Schedule annual DR failover drill with documentation'],
    ['Security awareness signage outdated',                   'Low','Awareness & Training','Communications','New posters distributed to all campuses'],
    ['Vendor risk assessment process informal',               'Medium','Governance','Procurement','Formalize vendor security questionnaire and review cadence'],
    ['Legacy copier/printer firmware unpatched',              'Low','Vulnerability Management','IT Support','Include printers in quarterly vulnerability scan scope'],
  ];
  // Status profiles per maturity: [Open%, InProgress%, Mitigated%, Closed%]
  const statusProfiles = [
    ['Open','In Progress','Open','In Progress','Open','Open','In Progress','Open','Open','In Progress','Open','Open','Mitigated','Open','Open'],
  ];
  const riskStmt = db.prepare('INSERT INTO risks (district_id, title, severity, status, owner, category, recommended_action, discovered_date) VALUES (?,?,?,?,?,?,?,?)');
  distIds.forEach((did, di) => {
    riskTemplates.forEach((r, ri) => {
      const date = new Date(2025, 8 + Math.floor(ri / 4), 1 + (ri * 2));
      riskStmt.run(did, r[0], r[1], statusProfiles[di][ri], r[3], r[2], r[4], date.toISOString().split('T')[0]);
    });
  });

  // ── Training ─────────────────────────────────────────────────
  const deptTemplate = [
    ['Administration',         45],
    ['Elementary Teachers',    180],
    ['Middle School Teachers', 95],
    ['High School Teachers',   120],
    ['IT Department',          18],
    ['Counseling & Support',   35],
    ['Facilities & Maintenance',42],
    ['Transportation',         55],
    ['Food Services',          22],
  ];
  // Completion rate multipliers
  const completionMult = [0.76];
  const trainStmt = db.prepare('INSERT INTO training (district_id, department, total_staff, completed, last_updated) VALUES (?,?,?,?,?)');
  distIds.forEach((did, di) => {
    const staffScale = districtDefs[di].staff / 612;
    deptTemplate.forEach(([dept, baseStaff]) => {
      const staff = Math.max(2, Math.round(baseStaff * staffScale));
      const completed = Math.min(staff, Math.round(staff * completionMult[di] * (0.85 + rand() * 0.3)));
      trainStmt.run(did, dept, staff, completed, '2026-03-10');
    });
  });

  // ── Phishing simulations ────────────────────────────────────
  const phishStmt = db.prepare('INSERT INTO phishing_sims (district_id, campaign_name, send_date, total_sent, opened, clicked, reported, department) VALUES (?,?,?,?,?,?,?,?)');
  const phishTemplates = [
    ['Q1 Baseline Assessment',    '2025-10-15'],
    ['Holiday Shopping Lure',     '2025-11-20'],
    ['Tax Season Phish',          '2026-01-10'],
    ['Password Reset Lure',       '2026-02-14'],
    ['IT Support Impersonation',  '2026-03-05'],
  ];
  // Click-rate multipliers (lower=better)
  const clickMult = [0.14];
  distIds.forEach((did, di) => {
    const staff = districtDefs[di].staff;
    phishTemplates.forEach(([name, date], pi) => {
      const sent = staff;
      const baseClick = clickMult[di] * (1 - pi * 0.02);
      const clicked = Math.round(sent * Math.max(0.01, baseClick));
      const opened = Math.round(sent * (0.4 + rand() * 0.15));
      const reported = Math.round(clicked * (0.3 + completionMult[di] * 0.5));
      phishStmt.run(did, name, date, sent, opened, clicked, reported, 'All Staff');
    });
  });

  // ── Compliance ──────────────────────────────────────────────
  const compTemplate = [
    ['Cybersecurity Rubric 2.0','Governance','Cybersecurity policy approved by board'],
    ['Cybersecurity Rubric 2.0','Governance','Named cybersecurity program lead'],
    ['Cybersecurity Rubric 2.0','Governance','Annual risk assessment conducted'],
    ['Cybersecurity Rubric 2.0','Governance','AI governance policy adopted'],
    ['NIST CSF','Identify','Asset inventory maintained'],
    ['NIST CSF','Identify','Risk assessment process documented'],
    ['NIST CSF','Protect','Access control policies enforced'],
    ['NIST CSF','Protect','Security awareness training program'],
    ['NIST CSF','Protect','Data protection controls implemented'],
    ['NIST CSF','Detect','Continuous monitoring deployed'],
    ['NIST CSF','Detect','Anomaly detection configured'],
    ['NIST CSF','Respond','Incident response plan documented'],
    ['NIST CSF','Respond','Incident response plan tested'],
    ['NIST CSF','Recover','Recovery plan documented'],
    ['NIST CSF','Recover','Backups verified regularly'],
    ['NIST CSF','Govern','Cybersecurity supply chain risk management'],
    ['Policy Readiness','Documentation','Acceptable use policy current'],
    ['Policy Readiness','Documentation','Data breach notification procedure'],
    ['Policy Readiness','Documentation','BYOD policy documented'],
    ['Policy Readiness','Documentation','Vendor/third-party security policy'],
  ];
  // Status distributions per maturity (Met, Partially Met, Not Met probabilities)
  const compProfiles = [
    [0.40, 0.35, 0.25],  // Walkerville
  ];
  const compStmt = db.prepare('INSERT INTO compliance (district_id, framework, category, requirement, status, evidence, sort_order) VALUES (?,?,?,?,?,?,?)');
  distIds.forEach((did, di) => {
    const [metP, partP] = compProfiles[di];
    compTemplate.forEach((c, ci) => {
      let status;
      const r = rand();
      if (r < metP) status = 'Met';
      else if (r < metP + partP) status = 'Partially Met';
      else status = 'Not Met';
      const evidence = status === 'Met' ? 'Documentation on file' : status === 'Partially Met' ? 'In progress' : null;
      compStmt.run(did, c[0], c[1], c[2], status, evidence, ci);
    });
  });

  // ── Prototype training modules ──────────────────────────────────
  const itUser = db.prepare(
    "SELECT id FROM users WHERE username = 'walkerville_it'"
  ).get();

  const saRatings = {
    "Govern::ORGANIZATIONAL CONTEXT": 2,
    "Govern::RISK MANAGEMENT STRATEGY": 2,
    "Govern::ROLES, RESPONSIBILITIES, AND AUTHORITIES": 2,
    "Govern::POLICY": 3,
    "Govern::OVERSIGHT": 2,
    "Govern::CYBERSECURITY SUPPLY CHAIN RISK MANAGEMENT": 1,
    "Identify::ASSET MANAGEMENT": 2,
    "Identify::RISK ASSESSMENT": 2,
    "Identify::IMPROVEMENT": 1,
    "Protect::IDENTITY MANAGEMENT, AUTHENTICATION, AND ACCESS CONTROL": 2,
    "Protect::AWARENESS AND TRAINING": 3,
    "Protect::DATA SECURITY": 2,
    "Protect::PLATFORM SECURITY": 2,
    "Protect::TECHNOLOGY INFRASTRUCTURE RESILIENCE": 1,
    "Detect::CONTINUOUS MONITORING": 2,
    "Detect::ADVERSE EVENT ANALYSIS": 1,
    "Respond::INCIDENT MANAGEMENT": 2,
    "Respond::INCIDENT ANALYSIS": 1,
    "Respond::INCIDENT RESPONSE REPORTING AND COMMUNICATION": 2,
    "Respond::INCIDENT MITIGATION": 1,
    "Recover::INCIDENT RECOVERY PLAN EXECUTION": 2,
    "Recover::INCIDENT RECOVERY COMMUNICATION": 1,
  };

  db.prepare(`
    INSERT INTO self_assessments
      (district_id, user_id, status, timeframe, ratings, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    distIds[0],
    itUser.id,
    'in_progress',
    '2025-26',
    JSON.stringify(saRatings),
    '{}'
  );

  const aiSysStmt = db.prepare(`
    INSERT INTO ai_systems
      (district_id, name, description, ai_lifecycle_stage,
       use_case, human_oversight_model, third_party_components)
    VALUES (?,?,?,?,?,?,?)
  `);

  const sys1Id = aiSysStmt.run(
    distIds[0],
    'Curriculum AI Assistant',
    'AI-powered instructional tool for personalized learning recommendations',
    'deploy_use',
    'Personalized learning recommendations for K-8 students',
    'human_on_loop',
    'OpenAI API, Google Vertex AI'
  ).lastInsertRowid;

  aiSysStmt.run(
    distIds[0],
    'Administrative Chatbot',
    'AI assistant for parent communications and scheduling',
    'operate_monitor',
    'Answering parent inquiries and managing scheduling',
    'human_on_loop',
    'Microsoft Azure AI'
  );

  // Seed partial ratings for System 1 only.
  // System 2 intentionally has no ratings to show a gap.
  const cagrStmt = db.prepare(`
    INSERT INTO cagr_ratings
      (district_id, ai_system_id, cagr_function,
       category_id, maturity_level)
    VALUES (?,?,?,?,?)
  `);
  const cagrSeeds = [
    ['GOVERN','GV.1',1], ['GOVERN','GV.2',1],
    ['GOVERN','GV.3',2], ['GOVERN','GV.4',1],
    ['MAP','MP.1',2],    ['MAP','MP.2',1],
    ['MAP','MP.3',1],    ['MAP','MP.4',2],
  ];
  cagrSeeds.forEach(([fn, cat, lvl]) =>
    cagrStmt.run(distIds[0], sys1Id, fn, cat, lvl)
  );

  const modulesCurriculum = [
    { title: 'Cybersecurity Governance for K-12 Leaders',     desc: 'Foundational governance frameworks, board responsibilities, policy development, and the role of the cybersecurity program lead in K-12 organizations.',                              nist: 'Govern',   dur: 45, req: 1, order: 1 },
    { title: 'Understanding the NIST Cybersecurity Framework', desc: 'Overview of the six NIST CSF functions — Govern, Identify, Protect, Detect, Respond, Recover — and how they apply to school district operations.',                                   nist: 'Govern',   dur: 30, req: 1, order: 2 },
    { title: 'Asset Management and Data Classification',       desc: 'Building and maintaining a complete technology asset inventory, classifying student and staff data, and understanding FERPA and COPPA data protection obligations.',                   nist: 'Identify', dur: 25, req: 1, order: 3 },
    { title: 'Vulnerability Awareness for School Staff',       desc: 'Understanding how vulnerabilities arise in school environments, the importance of timely patching, and how staff behavior impacts the district\'s risk posture.',                    nist: 'Identify', dur: 20, req: 1, order: 4 },
    { title: 'Access Control and Password Security',           desc: 'Best practices for strong passwords, multi-factor authentication, managing shared accounts, and limiting access to sensitive systems on a need-to-know basis.',                       nist: 'Protect',  dur: 30, req: 1, order: 5 },
    { title: 'Phishing Recognition and Email Safety',          desc: 'How to identify phishing, spear-phishing, and business email compromise attempts targeting school staff, and the correct procedure for reporting suspicious messages.',                 nist: 'Protect',  dur: 25, req: 1, order: 6 },
    { title: 'Safe Computing and Device Security',             desc: 'Protecting school-issued devices, safe browsing practices, USB and removable media risks, and securing work done on personal devices or home networks.',                              nist: 'Protect',  dur: 20, req: 1, order: 7 },
    { title: 'Student Data Privacy (FERPA & COPPA)',           desc: 'Deep dive into FERPA and COPPA requirements, permissible disclosures, third-party vendor data sharing, and staff obligations when handling student records.',                         nist: 'Protect',  dur: 35, req: 1, order: 8 },
    { title: 'Recognizing and Reporting Cyber Threats',        desc: 'Early warning signs of a security incident, how to report suspicious activity to your IT team, and why timely detection is critical to minimizing breach impact.',                    nist: 'Detect',   dur: 20, req: 1, order: 9 },
    { title: 'Incident Response Procedures for Schools',       desc: 'Step-by-step walkthrough of the district incident response plan: containment, communication protocols, notification obligations, and returning to normal operations.',                 nist: 'Respond',  dur: 25, req: 1, order: 10 },
    { title: 'Ransomware Awareness and Response',              desc: 'What ransomware is, how it enters school networks, the district\'s response playbook, and why staff are the most important line of defense against ransomware attacks.',             nist: 'Respond',  dur: 30, req: 1, order: 11 },
    { title: 'Business Continuity and Disaster Recovery',      desc: 'How the district maintains critical operations during and after a cyber incident, the importance of verified backups, and each staff member\'s role in the recovery process.',       nist: 'Recover',  dur: 25, req: 1, order: 12 },
  ];
  const modStmt = db.prepare('INSERT OR IGNORE INTO masterclass_modules (title, description, nist_function, duration_minutes, required, provider, order_index) VALUES (?,?,?,?,?,?,?)');
  const getModId = db.prepare('SELECT id FROM masterclass_modules WHERE title = ?');
  const moduleIds = modulesCurriculum.map(m => {
    const result = modStmt.run(m.title, m.desc, m.nist, m.dur, m.req, 'CyberReady learning workflow', m.order);
    return result.lastInsertRowid || getModId.get(m.title).id;
  });

  // ── Per-district per-department completions ──────────────────
  const deptNames = deptTemplate.map(d => d[0]);
  const compModStmt = db.prepare('INSERT OR IGNORE INTO masterclass_completions (district_id, module_id, department, total_staff, completed, last_updated) VALUES (?,?,?,?,?,?)');
  // Seed completions: earlier modules have higher completion rates (staff do them first)
  distIds.forEach((did, di) => {
    const staffScale = districtDefs[di].staff / 612;
    const baseRate = completionMult[di];
    deptTemplate.forEach(([dept, baseStaff]) => {
      const staff = Math.max(2, Math.round(baseStaff * staffScale));
      moduleIds.forEach((mid, mi) => {
        // Completion tapers off for later modules in the curriculum
        const decay = Math.max(0.3, 1 - mi * 0.055);
        const rate = Math.min(1, baseRate * decay * (0.8 + rand() * 0.4));
        const completed = Math.min(staff, Math.round(staff * rate));
        compModStmt.run(did, mid, dept, staff, completed, '2026-03-10');
      });
    });
  });

  console.log(`Database seeded with ${districtDefs.length} demo districts`);
}

function resetWalkervilleDemo(db) {
  const wd = db.prepare(
    "SELECT id FROM districts WHERE slug='walkerville'"
  ).get();

  if (wd) {
    const wdId = wd.id;
    db.prepare('DELETE FROM cagr_ratings WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM ai_systems WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM self_assessments WHERE district_id = ?').run(wdId);
    db.prepare(`
      DELETE FROM assessment_ratings WHERE
        assessment_id IN (
          SELECT id FROM assessments WHERE district_id=?
        )
    `).run(wdId);
    db.prepare(`
      DELETE FROM assessment_checklist WHERE
        assessment_id IN (
          SELECT id FROM assessments WHERE district_id=?
        )
    `).run(wdId);
    db.prepare(`
      DELETE FROM interview_responses WHERE
        assessment_id IN (
          SELECT id FROM assessments WHERE district_id=?
        )
    `).run(wdId);
    db.prepare(`
      DELETE FROM finding_documents WHERE
        assessment_id IN (
          SELECT id FROM assessments WHERE district_id=?
        )
    `).run(wdId);
    db.prepare('DELETE FROM finding_documents WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM audit_requests WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM assessment_reports WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM assessments WHERE district_id = ?').run(wdId);
  }

  if (wd) {
    const wdId = wd.id;
    db.prepare('DELETE FROM masterclass_completions WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM masterclass_requests WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM compliance WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM phishing_sims WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM training WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM dashboard_metrics WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM health_categories WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM risks WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM users WHERE district_id = ?').run(wdId);
    db.prepare('DELETE FROM districts WHERE id = ?').run(wdId);
  }

  insertWalkervilleDemoData(db);
}

function seedDatabase(db) {
  const count = db.prepare('SELECT COUNT(*) as c FROM districts').get();
  if (count.c > 0) return;
  resetWalkervilleDemo(db);
}

module.exports = { initDatabase, seedDatabase, resetWalkervilleDemo };
