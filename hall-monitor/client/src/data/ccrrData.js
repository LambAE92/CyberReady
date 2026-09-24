// Generated from the CyberReady CCRR Canonical Domain Register v1.0.
// NIST CSF 2.0 identifiers are external reference metadata, not CCRR source content.

export const CCRR_RUBRIC = {
  "key": "ccrr_v1",
  "version": "1.0",
  "name": "CyberReady Cybersecurity Readiness Rubric",
  "shortName": "CCRR",
  "externalReference": "NIST Cybersecurity Framework (CSF) 2.0"
};

export const CCRR_MATURITY_LEVELS = [
  {
    "level": 1,
    "label": "Ad Hoc",
    "description": "Reactive, person-dependent, undocumented, or inconsistently performed."
  },
  {
    "level": 2,
    "label": "Developing",
    "description": "Core practices recognized and partially implemented; ownership and documentation are emerging."
  },
  {
    "level": 3,
    "label": "Established",
    "description": "Defined, owned, documented, and implemented across the intended scope."
  },
  {
    "level": 4,
    "label": "Measured",
    "description": "Execution and effectiveness are measured, reviewed, exceptions managed, and results used for action."
  },
  {
    "level": 5,
    "label": "Resilient",
    "description": "Practices are tested, adaptive, integrated, and continuously improved."
  }
];

export const CCRR_FUNCTIONS = [
  {
    "key": "GOVERN",
    "name": "Govern",
    "domains": [
      "CR.GV-01",
      "CR.GV-02",
      "CR.GV-03",
      "CR.GV-04"
    ]
  },
  {
    "key": "IDENTIFY",
    "name": "Identify",
    "domains": [
      "CR.ID-01",
      "CR.ID-02",
      "CR.ID-03"
    ]
  },
  {
    "key": "PROTECT",
    "name": "Protect",
    "domains": [
      "CR.PR-01",
      "CR.PR-02",
      "CR.PR-03",
      "CR.PR-04",
      "CR.PR-05"
    ]
  },
  {
    "key": "DETECT",
    "name": "Detect",
    "domains": [
      "CR.DE-01",
      "CR.DE-02"
    ]
  },
  {
    "key": "RESPOND",
    "name": "Respond",
    "domains": [
      "CR.RS-01",
      "CR.RS-02"
    ]
  },
  {
    "key": "RECOVER",
    "name": "Recover",
    "domains": [
      "CR.RC-01",
      "CR.RC-02"
    ]
  }
];

export const CCRR_DOMAINS = [
  {
    "id": "CR.GV-01",
    "version": "1.0",
    "function": "GOVERN",
    "functionName": "Govern",
    "title": "Mission & Leadership",
    "assessmentIntent": "Determine whether district leadership understands cybersecurity as organizational risk tied to the educational mission, essential services, stakeholder expectations, and operational continuity—not solely as an IT issue.",
    "k12Context": "Scope includes superintendent/cabinet, board governance where applicable, technology leadership, finance, HR, instruction, student services, safety/operations, and other mission-critical owners.",
    "nistMapping": {
      "references": [
        "GV.OC",
        "GV.OV"
      ],
      "sourceNote": "GV.OC; GV.OV"
    },
    "guidedQuestions": [
      "What district services are mission-critical?",
      "Which technology and data dependencies support them?",
      "Who owns cybersecurity risk at the executive level?",
      "What cybersecurity information reaches leadership?",
      "How are stakeholder expectations identified?",
      "How do cyber risks affect operational and strategic decisions?",
      "How often does leadership review cybersecurity posture?",
      "What evidence shows leadership acted on cybersecurity information?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Cybersecurity is treated mainly as a technical issue; mission dependencies, executive ownership, and leadership oversight are largely undocumented."
      },
      "2": {
        "label": "Developing",
        "description": "Leadership recognizes cybersecurity as organizational risk and some critical services/dependencies are known, but oversight and reporting remain person- or event-dependent."
      },
      "3": {
        "label": "Established",
        "description": "Executive sponsorship, critical services, major dependencies, stakeholder considerations, reporting responsibilities, and governance expectations are documented and routinely applied."
      },
      "4": {
        "label": "Measured",
        "description": "Leadership reviews defined risk and performance information on a recurring cadence, records significant decisions, and follows unresolved risk and improvement work."
      },
      "5": {
        "label": "Resilient",
        "description": "Cybersecurity is integrated into strategic and operational decisions; leadership adjusts priorities using incidents, exercises, performance information, changing dependencies, and emerging risk."
      }
    },
    "evidenceExpectations": [
      "L1–2: interviews, isolated leadership records, identified critical services, and evidence of emerging ownership.",
      "L3: governance charter or equivalent, reporting responsibilities, documented dependencies, executive sponsorship, and recurring review records.",
      "L4: decision records, metrics, tracked actions, unresolved-risk follow-up, and evidence of management action.",
      "L5: evidence that outcomes, incidents, exercises, or changing risk altered strategy, priorities, investment, or resource decisions."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish executive sponsorship and identify critical services and dependencies."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize ownership, governance, reporting responsibilities, and recurring review."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Establish measurable executive oversight and track decisions, actions, and unresolved risk."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Demonstrate that results, incidents, exercises, and changing risk alter strategy and resources."
      }
    ],
    "commonGaps": [
      "Cybersecurity confined to IT.",
      "No executive risk owner.",
      "Critical educational services undocumented.",
      "Leadership receives cybersecurity information only after incidents.",
      "Technology dependencies are disconnected from continuity planning."
    ],
    "roadmapOutputs": [
      "Designate an executive sponsor.",
      "Document critical services and dependencies.",
      "Establish a quarterly executive cybersecurity review.",
      "Create an executive risk dashboard.",
      "Define decision and escalation processes."
    ]
  },
  {
    "id": "CR.GV-02",
    "version": "1.0",
    "function": "GOVERN",
    "functionName": "Govern",
    "title": "Risk Strategy & Policy",
    "assessmentIntent": "Determine whether the district uses an intentional, repeatable system for defining cybersecurity risk, deciding what risk is acceptable, evaluating and treating risk, and maintaining policy expectations.",
    "k12Context": "Applies across district governance, technology, operational units, procurement, exceptions, and executive risk decisions.",
    "nistMapping": {
      "references": [
        "GV.RM",
        "GV.PO",
        "GV.OV"
      ],
      "sourceNote": "GV.RM; GV.PO; GV.OV"
    },
    "guidedQuestions": [
      "How does the district define cybersecurity risk?",
      "Are risk objectives and tolerances documented?",
      "How are cybersecurity risks prioritized?",
      "What risk-response options are used?",
      "What cybersecurity policies are maintained?",
      "Who approves policies and exceptions?",
      "How frequently are policies and risk strategy reviewed?",
      "Are exceptions documented and tracked?",
      "How does the district know policy is followed?",
      "What conditions cause strategy or policy to change?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Risk decisions are reactive or fragmented; policies may be incomplete, outdated, or inconsistently used, and risk acceptance is often implicit."
      },
      "2": {
        "label": "Developing",
        "description": "Core policies and risk practices exist, but execution, coverage, ownership, or review remains inconsistent or person-dependent."
      },
      "3": {
        "label": "Established",
        "description": "The district maintains an approved policy structure, defined risk methodology, ownership, review cycles, response expectations, and an exception process."
      },
      "4": {
        "label": "Measured",
        "description": "Policy compliance, exceptions, risk treatment, and strategy effectiveness are measured and reviewed; results influence decisions."
      },
      "5": {
        "label": "Resilient",
        "description": "Cybersecurity strategy and policy are integrated with budgeting, procurement, planning, incidents, technology change, and continuous improvement and adapt as risk changes."
      }
    },
    "evidenceExpectations": [
      "L1–2: policy fragments, informal risk lists, isolated approvals, and baseline governance documents.",
      "L3: approved policy suite, documented risk methodology, risk register, exception process, ownership, and review schedule.",
      "L4: policy/risk metrics, exception tracking, treatment reviews, management decisions, and effectiveness records.",
      "L5: evidence that incidents, results, changing threats, or operational changes caused strategy and policy adaptation."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish a minimum policy baseline and common cybersecurity risk vocabulary."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize methodology, ownership, approval/review cycles, and exception handling."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure policy/risk effectiveness and actively manage unresolved exceptions."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Integrate risk strategy into planning, investment, procurement, and continuous improvement."
      }
    ],
    "commonGaps": [
      "Risk acceptance is implicit.",
      "Policies are stale or fragmented.",
      "Risk ratings are inconsistent.",
      "Exceptions are undocumented.",
      "Policy compliance is assumed rather than reviewed.",
      "Cybersecurity risk is disconnected from budgeting or procurement."
    ],
    "roadmapOutputs": [
      "Establish a district cybersecurity risk methodology.",
      "Document risk-tolerance statements.",
      "Create a policy lifecycle.",
      "Create an exception register.",
      "Conduct an annual cybersecurity strategy review."
    ]
  },
  {
    "id": "CR.GV-03",
    "version": "1.0",
    "function": "GOVERN",
    "functionName": "Govern",
    "title": "Accountability & Workforce",
    "assessmentIntent": "Determine whether cybersecurity responsibilities, authority, staffing, skills, and organizational capability are sufficient to manage district cybersecurity risk.",
    "k12Context": "Includes IT and security personnel as well as executive, operational, instructional, HR, finance, procurement, vendor, and other roles with material cybersecurity responsibilities.",
    "nistMapping": {
      "references": [
        "GV.RR"
      ],
      "sourceNote": "GV.RR"
    },
    "guidedQuestions": [
      "Who is accountable for cybersecurity risk?",
      "Who can accept material cybersecurity risk?",
      "Who owns major cybersecurity processes?",
      "Are responsibilities documented?",
      "Are staffing and skills adequate for the district's needs?",
      "What happens if key personnel are unavailable?",
      "Are responsibilities outside IT defined?",
      "How are service providers incorporated into responsibility models?",
      "How are competencies reviewed?",
      "Are cybersecurity duties reflected in job or role expectations?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Cybersecurity responsibility is heavily individual-dependent and informal."
      },
      "2": {
        "label": "Developing",
        "description": "Major responsibilities are generally understood, but documentation, authority, coverage, succession, or capability remains incomplete; gaps may be informally known."
      },
      "3": {
        "label": "Established",
        "description": "Roles, authorities, escalation paths, responsibilities, and competency/training expectations are documented and communicated."
      },
      "4": {
        "label": "Measured",
        "description": "The district reviews staffing, competency, workload, accountability, and role performance and takes action on identified capability gaps."
      },
      "5": {
        "label": "Resilient",
        "description": "Workforce capability, succession, external expertise, and cybersecurity responsibilities adapt proactively to technology, risk, and operational change."
      }
    },
    "evidenceExpectations": [
      "L1–2: interviews, informal assignments, organizational charts, and partial responsibility records.",
      "L3: RACI or equivalent, job/role descriptions, governance records, authority definitions, training and competency expectations.",
      "L4: capability reviews, workload/performance information, workforce plans, and tracked gap remediation.",
      "L5: succession, cross-training, external expertise, and evidence that workforce design adapted to changing risk or technology."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Identify owners for material cybersecurity responsibilities and clarify basic authority."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize roles, decision authority, escalation, and competency expectations."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure capability, workload, accountability, and role performance and remediate gaps."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Institutionalize succession, cross-training, adaptive capability, and resilient staffing."
      }
    ],
    "commonGaps": [
      "Single-person dependency.",
      "Unclear risk-acceptance authority.",
      "Business-unit cybersecurity responsibilities absent.",
      "Inadequate succession or cross-training.",
      "Vendor responsibilities assumed rather than defined."
    ],
    "roadmapOutputs": [
      "Create a cybersecurity RACI.",
      "Define a risk-acceptance authority matrix.",
      "Create a competency plan.",
      "Establish succession and cross-training.",
      "Conduct an annual workforce capability review."
    ]
  },
  {
    "id": "CR.GV-04",
    "version": "1.0",
    "function": "GOVERN",
    "functionName": "Govern",
    "title": "Third-Party Ecosystem",
    "assessmentIntent": "Determine whether the district governs cybersecurity risk created by vendors, SaaS providers, contractors, cloud services, data processors, and other external dependencies throughout their lifecycle.",
    "k12Context": "Particularly relevant to SIS, LMS, identity, communications, curriculum platforms, transportation, payments, HR/payroll, special education, classroom applications, and other vendor-hosted services.",
    "nistMapping": {
      "references": [
        "GV.SC",
        "GV.OC"
      ],
      "sourceNote": "GV.SC; GV.OC where appropriate"
    },
    "guidedQuestions": [
      "Which third parties are critical or handle sensitive data?",
      "How are vendors and services risk-tiered?",
      "What cybersecurity review occurs before acquisition?",
      "What security requirements appear in contracts?",
      "How are data protection and breach-notification requirements addressed?",
      "How are subprocessors considered?",
      "How are material vendor changes handled?",
      "How are critical providers monitored or reassessed?",
      "What happens if a critical provider fails or must be replaced?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Third-party cybersecurity is addressed mainly after procurement or after a problem occurs."
      },
      "2": {
        "label": "Developing",
        "description": "Selected high-profile vendors receive cybersecurity review, but criteria, ownership, coverage, and lifecycle practices remain inconsistent."
      },
      "3": {
        "label": "Established",
        "description": "The district maintains documented risk-based review, security requirements, ownership, contract expectations, critical-provider identification, and lifecycle processes."
      },
      "4": {
        "label": "Measured",
        "description": "Critical vendors are periodically reassessed; exceptions, contractual requirements, concentration/dependency risk, and material changes are monitored."
      },
      "5": {
        "label": "Resilient",
        "description": "Third-party cybersecurity risk is integrated into enterprise risk and continuity; contingency planning, provider-performance learning, and procurement/contract practices adapt over time."
      }
    },
    "evidenceExpectations": [
      "L1–2: contracts, questionnaires, isolated vendor reviews, and procurement records.",
      "L3: vendor inventory, risk tiering, review records, standard security clauses, assigned owners, and lifecycle procedures.",
      "L4: recurring reassessments, exception tracking, contract requirement reviews, dependency/concentration analysis, and reporting.",
      "L5: contingency/exit testing and evidence that provider experience changed procurement, contracts, continuity, or enterprise risk decisions."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Inventory critical providers and establish a baseline cybersecurity review."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize vendor tiering, procurement review, contractual expectations, and ownership."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Implement lifecycle monitoring, reassessment, exception management, and dependency review."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Integrate supplier intelligence, continuity/exit planning, and lessons learned into enterprise risk."
      }
    ],
    "commonGaps": [
      "Incomplete vendor inventory.",
      "Classroom applications bypass procurement.",
      "Security contract language is inconsistent.",
      "No recurring reassessment.",
      "Subprocessors are unknown.",
      "No contingency plan exists for critical SaaS failure."
    ],
    "roadmapOutputs": [
      "Create a critical-vendor inventory.",
      "Implement vendor risk tiering.",
      "Establish a procurement cybersecurity gate.",
      "Adopt standard security contract requirements.",
      "Perform annual reassessment of critical vendors.",
      "Develop contingency and exit plans.",
      "ID"
    ]
  },
  {
    "id": "CR.ID-01",
    "version": "1.0",
    "function": "IDENTIFY",
    "functionName": "Identify",
    "title": "Asset & Data Visibility",
    "assessmentIntent": "Determine whether the district can identify, understand, prioritize, and manage the technology, services, identities, information, and dependencies necessary to operate the educational environment.",
    "k12Context": "Includes endpoints, network equipment, servers, cloud services, SaaS, instructional technology, administrative systems, privileged/service identities, critical information, externally hosted services, and dependencies.",
    "nistMapping": {
      "references": [
        "ID.AM"
      ],
      "sourceNote": "ID.AM"
    },
    "guidedQuestions": [
      "What hardware, software, cloud services, SaaS applications, and technology services are in use?",
      "How is an owner or responsible party identified for each significant asset or service?",
      "Which assets and services support mission-critical functions?",
      "What sensitive or important data is associated with them?",
      "How are unauthorized, unknown, abandoned, or unsupported technologies discovered?",
      "How are assets added, changed, transferred, retired, or removed?",
      "How are vendor-hosted and cloud systems represented in inventories?",
      "How does criticality influence cybersecurity decisions?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Asset and service visibility is fragmented, informal, or individual-dependent; selected equipment may be inventoried while cloud/SaaS, data, ownership, lifecycle, or dependencies remain unknown."
      },
      "2": {
        "label": "Developing",
        "description": "Inventories cover significant portions of the environment, but coverage, ownership, reconciliation, lifecycle management, or criticality classification remains inconsistent."
      },
      "3": {
        "label": "Established",
        "description": "Documented inventories cover relevant hardware, software, services, cloud/SaaS, and material technology assets; ownership, lifecycle, and criticality are defined, significant data/service dependencies are documented, and add/change/retire processes exist."
      },
      "4": {
        "label": "Measured",
        "description": "Inventories are routinely reconciled against authoritative sources or discovery; coverage, accuracy, unsupported assets, lifecycle exceptions, and critical dependencies are reviewed and tracked, and asset information informs vulnerability, access, procurement, continuity, and risk decisions."
      },
      "5": {
        "label": "Resilient",
        "description": "Asset and dependency visibility is integrated into operations and adapts rapidly; discrepancies, unauthorized technology, and emerging dependencies trigger action, and asset intelligence directly informs risk, architecture, incident response, and resilience."
      }
    },
    "evidenceExpectations": [
      "L1–2: device inventories, spreadsheets, purchasing records, and individual management systems.",
      "L3: broader inventories, ownership, lifecycle records, cloud/SaaS registers, criticality classifications, and responsibility definitions.",
      "L4: reconciliation results, exception records, lifecycle metrics, unsupported-system reports, discovery results, and management review.",
      "L5: evidence that asset intelligence changed decisions such as retirement, architecture, restrictions, recovery priorities, or dependency treatment."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish baseline inventories and identify critical technology and services."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Create authoritative inventory, ownership, lifecycle, criticality, and coverage practices."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Reconcile inventories, measure quality/exceptions, and integrate asset intelligence into risk decisions."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Operationalize timely visibility and demonstrate continuous influence on architecture and resilience."
      }
    ],
    "commonGaps": [
      "Shadow IT.",
      "Unmanaged classroom applications.",
      "Incomplete SaaS inventory.",
      "Hardware-only inventory.",
      "Unknown service accounts.",
      "Unsupported equipment.",
      "Unclear ownership.",
      "No relationship between inventory and criticality.",
      "Retired assets remain active."
    ],
    "roadmapOutputs": [
      "Establish an authoritative technology inventory.",
      "Create a SaaS/application register.",
      "Assign owners.",
      "Classify critical systems.",
      "Define lifecycle procedures.",
      "Perform quarterly reconciliation.",
      "Track unsupported systems.",
      "Document critical dependencies."
    ]
  },
  {
    "id": "CR.ID-02",
    "version": "1.0",
    "function": "IDENTIFY",
    "functionName": "Identify",
    "title": "Cyber Risk Discovery",
    "assessmentIntent": "Determine whether the district systematically discovers, analyzes, records, prioritizes, communicates, and treats cybersecurity risks affecting mission, systems, information, people, and dependencies.",
    "k12Context": "Risk discovery should connect technical findings, operational dependencies, vendor risks, incidents, audits, vulnerabilities, and organizational impact rather than treating vulnerability severity alone as organizational risk.",
    "nistMapping": {
      "references": [
        "ID.RA"
      ],
      "sourceNote": "ID.RA"
    },
    "guidedQuestions": [
      "How are threats and vulnerabilities identified?",
      "How are likelihood and impact considered?",
      "How does the district determine which systems, services, or information require greater attention?",
      "Where are material cybersecurity risks recorded?",
      "Who owns each significant risk?",
      "How are vulnerability findings converted into organizational risk decisions?",
      "How are vendor and external-dependency risks considered?",
      "What events trigger reassessment?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Cybersecurity risk is recognized mainly through incidents, obvious technical issues, audits, or individual knowledge and is rarely analyzed or documented consistently."
      },
      "2": {
        "label": "Developing",
        "description": "Scans, audits, assessments, or informal reviews identify risk in portions of the environment; significant risks may be tracked, but methodology, ownership, prioritization, and reassessment vary."
      },
      "3": {
        "label": "Established",
        "description": "A documented risk-assessment process considers threats, vulnerabilities, likelihood, impact, criticality, and dependencies; material risks are recorded, owners assigned, priorities established, and treatment connected to the assessment."
      },
      "4": {
        "label": "Measured",
        "description": "Risk is reassessed on a defined cadence and after material change; status, treatment, residual risk, aging, and exceptions are tracked, risks can be compared across systems/services, and results direct resources and remediation."
      },
      "5": {
        "label": "Resilient",
        "description": "Risk discovery is integrated with changing threat information, incidents, technology changes, vulnerabilities, vendor developments, and operations; priorities adapt as conditions change and accumulated risk information is used proactively."
      }
    },
    "evidenceExpectations": [
      "L1–2: vulnerability reports, audit findings, insurance questionnaires, informal risk lists, and incident findings.",
      "L3: documented methodology, risk register, owners, likelihood/impact analysis, treatment decisions, and assessment records.",
      "L4: reassessment history, aging, residual-risk decisions, trends, exceptions, and evidence that risk priority influenced action.",
      "L5: evidence that emerging threats, incidents, architecture changes, vendors, or environmental changes drove proactive reprioritization or control change."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish repeatable risk identification and recording."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize methodology, ownership, likelihood/impact analysis, prioritization, and treatment."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Establish review cadence, residual-risk tracking, aging/trends, and management reporting."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Integrate dynamic threat, incident, dependency, and environmental information into risk decisions."
      }
    ],
    "commonGaps": [
      "Vulnerability automatically equals risk.",
      "Findings disappear after reports.",
      "No assigned risk owner.",
      "Risk register is stale.",
      "Ratings are undefined or inconsistent.",
      "Vendor risk is excluded.",
      "Risk acceptance is undocumented.",
      "Technical severity is the only prioritization factor."
    ],
    "roadmapOutputs": [
      "Create a cybersecurity risk register.",
      "Adopt likelihood/impact methodology.",
      "Assign risk owners.",
      "Create a risk-acceptance workflow.",
      "Conduct quarterly risk review.",
      "Connect vulnerability findings to risk records.",
      "Track residual risk."
    ]
  },
  {
    "id": "CR.ID-03",
    "version": "1.0",
    "function": "IDENTIFY",
    "functionName": "Identify",
    "title": "Improvement Planning",
    "assessmentIntent": "Determine whether the district systematically converts assessments, incidents, exercises, tests, operational experience, and identified gaps into tracked cybersecurity improvement.",
    "k12Context": "Improvement planning is the bridge between assessment and sustained change and should connect findings to ownership, evidence-producing remediation, target maturity, and reassessment.",
    "nistMapping": {
      "references": [
        "ID.IM"
      ],
      "sourceNote": "ID.IM"
    },
    "guidedQuestions": [
      "What happens to findings after an assessment?",
      "How do incident lessons affect future safeguards?",
      "Are exercises and tests followed by corrective actions?",
      "Who owns improvement items?",
      "How are priorities and deadlines established?",
      "How does leadership see progress?",
      "How does the district determine whether remediation worked?",
      "Are recurring weaknesses analyzed systemically?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Improvement is primarily reactive; individual problems may be corrected, but findings and lessons are not consistently converted into organizational improvement."
      },
      "2": {
        "label": "Developing",
        "description": "Significant findings and remediation are tracked in some areas, but prioritization, ownership, deadlines, closure evidence, and follow-up are inconsistent."
      },
      "3": {
        "label": "Established",
        "description": "A structured improvement process captures material findings from assessments, incidents, exercises, audits, vulnerability work, and reviews; items are prioritized, assigned, tracked, and closed using defined criteria."
      },
      "4": {
        "label": "Measured",
        "description": "Leadership monitors aging, completion, overdue work, recurring findings, target-state progress, and remediation effectiveness; closure requires evidence."
      },
      "5": {
        "label": "Resilient",
        "description": "Improvement is continuous and systemic; patterns and root causes across incidents, assessments, tests, and operations are analyzed, intended outcomes are evaluated, and governance, architecture, training, investment, and target states are adjusted."
      }
    },
    "evidenceExpectations": [
      "L1–2: emails, tickets, isolated remediation lists, and informal follow-up.",
      "L3: formal improvement register/roadmap, ownership, priority, due dates, status, and closure evidence.",
      "L4: aging metrics, overdue reports, maturity-gap trends, effectiveness validation, recurring-finding analysis, and executive review.",
      "L5: evidence of systemic change to procurement, architecture, training, policy, resources, or target posture driven by trends and lessons."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Record material findings and improvement actions."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Establish a unified process with ownership, priority, deadlines, target state, and evidence-based closure."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure improvement performance, validate effectiveness, and escalate overdue or recurring gaps."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Use pattern and root-cause analysis to drive strategy, architecture, investment, and target-state change."
      }
    ],
    "commonGaps": [
      "Assessment reports are not operationalized.",
      "Improvement tracking is fragmented.",
      "Completion is treated as a checkbox.",
      "Closure evidence is absent.",
      "Recurring findings are treated independently.",
      "No connection exists to target maturity.",
      "Leadership cannot see overdue risk."
    ],
    "roadmapOutputs": [
      "Centralize findings.",
      "Assign owners.",
      "Use risk-based priority.",
      "Require closure evidence.",
      "Establish overdue escalation.",
      "Perform effectiveness review.",
      "Analyze recurring findings.",
      "Update target maturity as appropriate.",
      "PR"
    ]
  },
  {
    "id": "CR.PR-01",
    "version": "1.0",
    "function": "PROTECT",
    "functionName": "Protect",
    "title": "Identity & Access Safeguards",
    "assessmentIntent": "Determine whether the district reliably establishes, verifies, grants, reviews, changes, and removes access to systems, services, data, facilities, and privileged capabilities according to organizational need and cybersecurity risk.",
    "k12Context": "District identity environments are unusually dynamic. Students enter and leave, employees change roles, substitutes and contractors require temporary access, service accounts persist across systems, privileged IT accounts carry elevated risk, and numerous SaaS platforms may rely on district identity infrastructure.",
    "nistMapping": {
      "references": [
        "PR.AA"
      ],
      "sourceNote": "PR.AA"
    },
    "guidedQuestions": [
      "How are student, employee, contractor, vendor, service, and privileged identities created and managed?",
      "What triggers creation, modification, suspension, and removal of access?",
      "How does the district determine what access an individual should receive?",
      "Where is stronger authentication required, and how are exceptions handled?",
      "How are privileged and administrative accounts controlled?",
      "How are inactive, orphaned, shared, or unnecessary accounts discovered?",
      "How frequently is access reviewed?",
      "How are identity or access anomalies escalated and investigated?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Account creation, access changes, and removal depend substantially on manual requests, individual knowledge, or inconsistent practices. Privileged access and authentication requirements may vary significantly."
      },
      "2": {
        "label": "Developing",
        "description": "Standard practices exist for major identity populations and systems. Stronger authentication and access controls have been introduced in selected areas, but lifecycle automation, access review, privileged controls, or coverage remain inconsistent."
      },
      "3": {
        "label": "Established",
        "description": "The district maintains documented identity and access processes covering relevant account populations, lifecycle events, authentication, authorization, privileged access, remote access, and periodic access review. Responsibilities and exception processes are defined."
      },
      "4": {
        "label": "Measured",
        "description": "Identity-control performance is routinely reviewed using evidence such as provisioning/deprovisioning timeliness, inactive accounts, privileged-access reviews, authentication coverage, access exceptions, and failed or anomalous access activity."
      },
      "5": {
        "label": "Resilient",
        "description": "Identity controls adapt to changing risk, roles, technology, and observed behavior. Access is continuously refined using lifecycle information, risk signals, incidents, testing, and operational evidence, while high-risk access paths receive additional validation and oversight."
      }
    },
    "evidenceExpectations": [
      "L1–2: account lists, help-desk tickets, directory configuration, MFA deployment records, and onboarding/offboarding examples.",
      "L3: documented lifecycle procedures, role/access standards, privileged-account requirements, remote-access controls, review records, and exception processes.",
      "L4: account-aging reports, termination/deprovisioning metrics, MFA coverage, privileged-access review results, exception aging, and anomaly reports.",
      "L5: evidence that incidents, access analytics, exercises, architecture changes, or changing risk resulted in demonstrable access-control improvements."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Standardize account lifecycle practices and protect high-risk accounts and access paths."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize identity lifecycle, authorization, authentication, privileged access, review, and exception processes."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure coverage and effectiveness and actively manage exceptions and anomalies."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Incorporate risk signals, lessons learned, and environmental changes into adaptive access decisions."
      }
    ],
    "commonGaps": [
      "Former employees remain active.",
      "Shared administrative credentials.",
      "Excessive privileges.",
      "Inconsistent MFA.",
      "Service accounts without owners.",
      "Access persists after role changes.",
      "SaaS accounts fall outside central lifecycle management.",
      "Periodic access review exists only on paper."
    ],
    "roadmapOutputs": [
      "Establish an identity lifecycle standard.",
      "Inventory privileged and service accounts.",
      "Expand MFA coverage.",
      "Assign service-account owners.",
      "Institute quarterly privileged-access review.",
      "Define a termination SLA.",
      "Create an access-exception register."
    ]
  },
  {
    "id": "CR.PR-02",
    "version": "1.0",
    "function": "PROTECT",
    "functionName": "Protect",
    "title": "Human Readiness",
    "assessmentIntent": "Determine whether people understand and can perform the cybersecurity responsibilities associated with their roles and whether the district measures and improves human preparedness over time.",
    "k12Context": "Scope can include administrators, faculty, staff, technology personnel, temporary workers, contractors, and other populations whose responsibilities create material cybersecurity risk. Student-facing education may also be included when appropriate, but employee cybersecurity responsibility should not be confused with general digital-citizenship instruction.",
    "nistMapping": {
      "references": [
        "PR.AT"
      ],
      "sourceNote": "PR.AT"
    },
    "guidedQuestions": [
      "Who receives cybersecurity awareness or role-specific preparation?",
      "How are training requirements determined?",
      "Are personnel with elevated responsibilities given specialized training?",
      "How are new employees prepared before or shortly after receiving access?",
      "How does the district know training changed preparedness rather than merely recording completion?",
      "Are exercises, simulations, incidents, or observed behaviors used to identify human-risk patterns?",
      "How are training requirements updated when threats or technologies change?",
      "How are repeated risky behaviors or knowledge gaps addressed?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Cybersecurity education is informal, inconsistent, or primarily provided after a problem occurs."
      },
      "2": {
        "label": "Developing",
        "description": "Baseline awareness activities are provided to major workforce populations, but content, timing, role differentiation, measurement, or follow-up remain inconsistent."
      },
      "3": {
        "label": "Established",
        "description": "The district maintains a documented, recurring cybersecurity awareness and training program with defined audiences, baseline content, onboarding requirements, and role-specific preparation for personnel with elevated responsibilities."
      },
      "4": {
        "label": "Measured",
        "description": "The district evaluates preparedness using multiple indicators such as completion, exercises, simulations, incident patterns, assessments, or observed behavior and uses results to target additional intervention."
      },
      "5": {
        "label": "Resilient",
        "description": "Human-readiness activities continuously adapt to actual district risk, emerging threats, technologies, incidents, and measured behavior. Lessons from exercises and real events materially influence training and operational practices."
      }
    },
    "evidenceExpectations": [
      "L1–2: presentations, awareness emails, and training completion records.",
      "L3: training standard, audience definitions, schedule, onboarding requirements, role-based curricula, and completion evidence.",
      "L4: simulation/exercise outcomes, behavioral indicators, incident trends, targeted retraining, and effectiveness reviews.",
      "L5: evidence showing measured weaknesses or changing threats caused substantive changes to training, process, technology, or organizational behavior."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish recurring baseline awareness."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize audiences, onboarding, recurring requirements, and role-specific training."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure effectiveness beyond completion."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Continuously adapt human-risk interventions using observed outcomes."
      }
    ],
    "commonGaps": [
      "Annual training treated as the entire program.",
      "Completion equated with effectiveness.",
      "Administrators or technical staff receive no role-specific preparation.",
      "Substitutes or contractors excluded.",
      "Phishing results collected but never used.",
      "Training disconnected from incidents."
    ],
    "roadmapOutputs": [
      "Establish a workforce awareness standard.",
      "Define role-based training populations.",
      "Implement onboarding requirements.",
      "Create effectiveness measures.",
      "Establish targeted retraining.",
      "Connect incident lessons to future training."
    ]
  },
  {
    "id": "CR.PR-03",
    "version": "1.0",
    "function": "PROTECT",
    "functionName": "Protect",
    "title": "Data Protection",
    "assessmentIntent": "Determine whether district information is appropriately identified, handled, accessed, stored, transmitted, retained, backed up, recovered, and disposed of throughout its lifecycle.",
    "k12Context": "Includes student, employee, financial, instructional, operational, and other sensitive or mission-important information across district systems, endpoints, cloud services, backups, removable media, and third parties.",
    "nistMapping": {
      "references": [
        "PR.DS"
      ],
      "sourceNote": "PR.DS"
    },
    "guidedQuestions": [
      "What information requires enhanced protection and why?",
      "How are protection requirements communicated to system and data owners?",
      "How is sensitive information protected when stored and transmitted?",
      "How are backup copies protected from unauthorized access or destructive events?",
      "What retention and disposal requirements exist?",
      "How does the district prevent or identify inappropriate disclosure or movement of information?",
      "How are data-protection requirements applied to cloud and vendor services?",
      "How are protection failures or exceptions discovered and addressed?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Data protection depends heavily on default technology settings and individual practices. Sensitive information may not be consistently identified or handled."
      },
      "2": {
        "label": "Developing",
        "description": "Basic safeguards and handling expectations exist for significant information and systems, but classification, encryption, backup protection, retention, disposal, monitoring, or third-party coverage are incomplete."
      },
      "3": {
        "label": "Established",
        "description": "The district maintains documented requirements for protecting relevant information throughout its lifecycle, including access, storage, transmission, backup, retention, disposal, and third-party handling according to risk and applicable obligations."
      },
      "4": {
        "label": "Measured",
        "description": "The district routinely evaluates protection effectiveness, exceptions, backup integrity, inappropriate exposure, retention compliance, and other material data-protection indicators."
      },
      "5": {
        "label": "Resilient",
        "description": "Data protection is integrated into architecture, procurement, service design, and risk decisions and continually improves based on testing, incidents, changing data use, technology changes, and observed control performance."
      }
    },
    "evidenceExpectations": [
      "L1–2: backup configuration, encryption settings, retention schedules, and privacy/security guidance.",
      "L3: formal data-handling requirements, ownership, lifecycle standards, backup requirements, disposal procedures, and relevant vendor requirements.",
      "L4: backup validation, exception reports, exposure findings, retention/disposal review, and management reporting.",
      "L5: demonstrated architectural, contractual, or operational changes resulting from measured protection weaknesses or emerging risk."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Identify sensitive and critical information and establish baseline safeguards."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize lifecycle requirements and ownership."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure safeguard effectiveness, integrity, and exceptions."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Continuously integrate data-risk evidence into architecture, procurement, and improvement."
      }
    ],
    "commonGaps": [
      "Backups exist but cannot be reliably restored.",
      "Retention is indefinite by default.",
      "Sensitive data stored in unapproved platforms.",
      "Cloud data overlooked.",
      "Backup credentials share the production identity environment.",
      "Disposal is undocumented.",
      "Encryption is assumed rather than verified."
    ],
    "roadmapOutputs": [
      "Establish an information-protection standard.",
      "Identify critical and sensitive datasets.",
      "Validate backup protection.",
      "Define retention and disposal processes.",
      "Review cloud data safeguards.",
      "Create a protection-exception workflow."
    ]
  },
  {
    "id": "CR.PR-04",
    "version": "1.0",
    "function": "PROTECT",
    "functionName": "Protect",
    "title": "Secure Platforms",
    "assessmentIntent": "Determine whether district hardware, software, endpoints, servers, network components, cloud environments, and other technology platforms are configured, maintained, changed, and retired in ways that reduce cybersecurity exposure.",
    "k12Context": "The district may operate a mixture of managed devices, servers, network appliances, instructional devices, specialized operational systems, cloud infrastructure, and externally managed platforms with widely varying support lifecycles.",
    "nistMapping": {
      "references": [
        "PR.PS"
      ],
      "sourceNote": "PR.PS"
    },
    "guidedQuestions": [
      "Are secure configuration expectations defined for major technology classes?",
      "How are security updates and patches identified, prioritized, and deployed?",
      "How are unsupported or end-of-life technologies identified?",
      "How are vulnerabilities tracked through remediation or accepted risk?",
      "How are configuration changes authorized and recorded?",
      "What protections exist against unauthorized software or malicious code?",
      "How is administrative access to platforms controlled?",
      "How does the district verify that platform safeguards remain effective?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Platform security relies primarily on vendor defaults, individual administrator practices, and reactive maintenance."
      },
      "2": {
        "label": "Developing",
        "description": "Baseline configuration, patching, endpoint protection, and vulnerability practices exist for significant portions of the environment, but consistency, coverage, or exception handling varies."
      },
      "3": {
        "label": "Established",
        "description": "Documented standards govern secure configuration, patching, vulnerability remediation, administrative access, software integrity, change management, and technology lifecycle for relevant platform classes."
      },
      "4": {
        "label": "Measured",
        "description": "The district measures configuration compliance, patch/vulnerability aging, unsupported technology, endpoint/control coverage, exceptions, and remediation performance and uses results to direct action."
      },
      "5": {
        "label": "Resilient",
        "description": "Platform protection adapts continuously to threat information, vulnerabilities, incidents, testing, and architectural change. Secure configurations and lifecycle decisions are refined using measured effectiveness and lessons learned."
      }
    },
    "evidenceExpectations": [
      "L1–2: patch reports, endpoint console records, administrator procedures, and vulnerability scans.",
      "L3: configuration standards, patch/vulnerability procedures, lifecycle standards, change records, administrative requirements, and exception process.",
      "L4: compliance metrics, remediation aging, unsupported-system reporting, exception tracking, and management review.",
      "L5: evidence of proactive platform or architecture changes arising from testing, incidents, emerging threats, or measured weaknesses."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish baseline platform protection and patching."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize secure configuration, vulnerability, lifecycle, and change-management standards."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure compliance and remediation effectiveness."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Continuously adapt platform protection using threat and performance evidence."
      }
    ],
    "commonGaps": [
      "Unsupported operating systems.",
      "Inconsistent patch cadence.",
      "No configuration baseline.",
      "Vulnerability scans performed but findings not owned.",
      "Emergency changes never reviewed.",
      "Administrator accounts used for routine work.",
      "Cloud configuration outside normal security governance."
    ],
    "roadmapOutputs": [
      "Define secure configuration baselines.",
      "Establish patch SLAs.",
      "Inventory unsupported technology.",
      "Create a vulnerability remediation workflow.",
      "Implement configuration review.",
      "Formalize security change controls."
    ]
  },
  {
    "id": "CR.PR-05",
    "version": "1.0",
    "function": "PROTECT",
    "functionName": "Protect",
    "title": "Infrastructure Resilience",
    "assessmentIntent": "Determine whether the district designs, protects, and operates technology infrastructure so that critical services can withstand, contain, and recover from disruption.",
    "k12Context": "This domain assesses resilience before an incident, while CR.RC-01 assesses the district's actual restoration and continuity capability after disruption.",
    "nistMapping": {
      "references": [
        "PR.IR"
      ],
      "sourceNote": "PR.IR"
    },
    "guidedQuestions": [
      "Which infrastructure components create single points of failure for critical district services?",
      "How are networks and systems separated to limit the spread of compromise?",
      "What redundancy exists for critical services and dependencies?",
      "How are capacity and availability requirements determined?",
      "Can critical security functions remain available during degraded operations?",
      "How does the district account for internet, cloud, identity, power, or communications dependencies?",
      "When were resilience mechanisms last tested?",
      "How are test results or outages used to improve architecture?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Infrastructure resilience depends primarily on existing architecture and individual technical knowledge. Critical dependencies and single points of failure may be poorly understood."
      },
      "2": {
        "label": "Developing",
        "description": "Redundancy, segmentation, availability safeguards, or contingency measures exist for selected critical services, but coverage and design rationale are inconsistent."
      },
      "3": {
        "label": "Established",
        "description": "The district documents critical infrastructure dependencies and implements proportionate resilience safeguards such as segmentation, redundancy, capacity planning, protected management paths, and alternative arrangements based on service criticality."
      },
      "4": {
        "label": "Measured",
        "description": "Resilience mechanisms are periodically tested or otherwise validated. Failures, capacity limitations, architectural exceptions, dependency risks, and test results are tracked and reviewed."
      },
      "5": {
        "label": "Resilient",
        "description": "Infrastructure design continually adapts using exercises, outages, incidents, dependency changes, and measured performance. The district demonstrates an ability to maintain or safely degrade critical operations under realistic disruption."
      }
    },
    "evidenceExpectations": [
      "L1–2: network diagrams, redundancy configurations, backup connectivity, and informal continuity arrangements.",
      "L3: current architecture/dependency documentation, segmentation design, redundancy requirements, criticality-based resilience standards, and assigned ownership.",
      "L4: failover tests, segmentation validation, capacity reports, outage analysis, architecture exceptions, and resilience metrics.",
      "L5: evidence that realistic testing or actual disruption produced architectural improvements and demonstrated continued or safely degraded service."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Identify critical dependencies and address obvious single points of failure."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Establish risk-based resilience architecture and documented requirements."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Routinely validate resilience and measure failures and exceptions."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Use realistic disruption and operational learning to continually strengthen architecture."
      }
    ],
    "commonGaps": [
      "Redundancy exists but has never been tested.",
      "Backup internet depends on the same physical path.",
      "Identity service is an undocumented single point of failure.",
      "Segmentation exists only conceptually.",
      "Cloud availability is assumed to equal district continuity.",
      "Critical infrastructure diagrams are outdated."
    ],
    "roadmapOutputs": [
      "Map critical infrastructure dependencies.",
      "Identify single points of failure.",
      "Validate segmentation.",
      "Establish failover testing.",
      "Document alternate connectivity.",
      "Establish a resilience test schedule.",
      "Track architecture exceptions.",
      "DE"
    ]
  },
  {
    "id": "CR.DE-01",
    "version": "1.0",
    "function": "DETECT",
    "functionName": "Detect",
    "title": "Security Visibility & Monitoring",
    "assessmentIntent": "Determine whether the district maintains sufficient cybersecurity visibility across relevant systems, services, networks, identities, endpoints, cloud environments, and external dependencies to identify potentially harmful activity in a timely manner.",
    "k12Context": "CCRR does not require a district to own a SIEM, SOC, EDR platform, or any particular commercial product. The assessment asks whether monitoring outcomes are appropriate to district risk, resources, architecture, and critical services.",
    "nistMapping": {
      "references": [
        "DE.CM"
      ],
      "sourceNote": "DE.CM"
    },
    "guidedQuestions": [
      "Which systems, services, identities, networks, and endpoints require security monitoring?",
      "What security-relevant information is collected from them?",
      "Who is responsible for reviewing alerts and monitoring results?",
      "What happens outside normal staffing hours?",
      "Are cloud/SaaS environments and identity systems included where appropriate?",
      "How are monitoring gaps and blind spots identified?",
      "How long is relevant security information retained?",
      "How does the district determine whether its monitoring actually detects meaningful activity?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Security events are primarily discovered through user reports, system failures, vendor notifications, or individual administrator observation. Monitoring coverage and responsibilities are limited or poorly understood."
      },
      "2": {
        "label": "Developing",
        "description": "Monitoring exists for selected high-value systems, endpoints, networks, identities, or services, but coverage, alert handling, retention, escalation, or staffing arrangements vary."
      },
      "3": {
        "label": "Established",
        "description": "The district defines security-monitoring requirements based on risk and criticality. Relevant systems and services have documented monitoring coverage, ownership, alert-handling procedures, retention expectations, and escalation paths."
      },
      "4": {
        "label": "Measured",
        "description": "Monitoring coverage and effectiveness are periodically evaluated. Blind spots, unavailable telemetry, alert volumes, unresolved alerts, detection timing, exceptions, and other relevant indicators are tracked and reviewed."
      },
      "5": {
        "label": "Resilient",
        "description": "Monitoring capabilities adapt to changing systems, threats, incidents, testing, and detection performance. Lessons from missed or delayed detections result in demonstrable improvements to visibility and monitoring."
      }
    },
    "evidenceExpectations": [
      "L1–2: platform alerts, endpoint consoles, firewall logs, email alerts, vendor notifications, and administrator records.",
      "L3: monitoring standard, defined coverage, responsibilities, retention requirements, alert workflow, and escalation procedures.",
      "L4: coverage reviews, blind-spot registers, detection metrics, exception records, and alert-performance analysis.",
      "L5: evidence showing that incidents, exercises, threat changes, or detection failures caused measurable monitoring improvements."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Identify high-risk monitoring priorities and establish baseline visibility."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize monitoring coverage, ownership, retention, alert handling, and escalation."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure coverage and detection effectiveness and actively manage blind spots."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Continuously adapt monitoring using incidents, testing, threat information, and measured outcomes."
      }
    ],
    "commonGaps": [
      "Endpoint monitoring but no identity visibility.",
      "Logs collected but never reviewed.",
      "SaaS systems omitted.",
      "Excessive alerts without triage.",
      "Monitoring unavailable after hours.",
      "Critical log sources silently stop reporting.",
      "Retention insufficient for investigations."
    ],
    "roadmapOutputs": [
      "Define monitoring requirements.",
      "Inventory security telemetry.",
      "Establish alert ownership.",
      "Document retention.",
      "Identify blind spots.",
      "Establish monitoring-effectiveness review.",
      "Track visibility exceptions."
    ]
  },
  {
    "id": "CR.DE-02",
    "version": "1.0",
    "function": "DETECT",
    "functionName": "Detect",
    "title": "Event Analysis & Escalation",
    "assessmentIntent": "Determine whether the district can distinguish meaningful cybersecurity events from routine activity, assess their significance, correlate relevant information, prioritize them, and escalate potential incidents appropriately.",
    "k12Context": "Event analysis connects monitoring to incident response. The district should be able to apply context and severity rather than treating every alert as equivalent.",
    "nistMapping": {
      "references": [
        "DE.AE"
      ],
      "sourceNote": "DE.AE"
    },
    "guidedQuestions": [
      "How are security alerts initially triaged?",
      "What distinguishes routine events from suspected incidents?",
      "Are severity and priority criteria documented?",
      "Can analysts obtain enough contextual information to evaluate events?",
      "How are related events correlated across systems?",
      "When and to whom are significant events escalated?",
      "How are false positives or repeated low-value alerts addressed?",
      "How are lessons from event analysis used to improve detection?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Event analysis depends heavily on individual judgment and technical experience. Escalation is informal."
      },
      "2": {
        "label": "Developing",
        "description": "Basic triage and escalation practices exist for common events, but severity criteria, correlation, documentation, or consistency are limited."
      },
      "3": {
        "label": "Established",
        "description": "The district maintains documented processes for event triage, severity determination, contextual analysis, correlation where appropriate, documentation, and escalation into incident response."
      },
      "4": {
        "label": "Measured",
        "description": "Analysis effectiveness is evaluated using indicators such as escalation timeliness, recurring false positives, missed events, unresolved queues, severity changes, or incident-analysis outcomes."
      },
      "5": {
        "label": "Resilient",
        "description": "Analysis practices continually adapt based on threat information, incidents, exercises, environmental change, and measured detection performance."
      }
    },
    "evidenceExpectations": [
      "L1–2: isolated alert records, tickets, analyst notes, and informal escalation examples.",
      "L3: documented triage, severity, contextual analysis, correlation, documentation, and escalation procedures with supporting records.",
      "L4: escalation-timeliness metrics, false-positive analysis, missed-event review, queue aging, severity changes, and quality review.",
      "L5: evidence that incident outcomes, exercises, threat changes, or measured detection performance caused tuning or process changes."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Define basic triage and escalation."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Establish severity, analysis, documentation, and escalation standards."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure analytical quality and timeliness."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Continuously tune analysis using operational and threat evidence."
      }
    ],
    "commonGaps": [
      "Everything classified at the same severity.",
      "Alerts closed without rationale.",
      "No connection between detection and incident response.",
      "False positives accepted indefinitely.",
      "No correlation across identity, endpoint, network, or cloud events."
    ],
    "roadmapOutputs": [
      "Create an event-severity model.",
      "Establish a triage workflow.",
      "Define escalation thresholds.",
      "Measure analysis timeliness.",
      "Review recurring false positives.",
      "Connect significant events to incident-management records.",
      "RS"
    ]
  },
  {
    "id": "CR.RS-01",
    "version": "1.0",
    "function": "RESPOND",
    "functionName": "Respond",
    "title": "Incident Command & Coordination",
    "assessmentIntent": "Determine whether the district can establish control, authority, accountability, and coordinated decision-making when a cybersecurity incident occurs.",
    "k12Context": "Significant incidents can involve technology, executive leadership, communications, legal/privacy responsibilities, insurance, vendors, law enforcement, instructional operations, safety personnel, finance, and other district functions.",
    "nistMapping": {
      "references": [
        "RS.MA"
      ],
      "sourceNote": "RS.MA"
    },
    "guidedQuestions": [
      "What causes an event to be formally declared an incident?",
      "Who has authority to lead the response?",
      "Who can make significant containment or operational decisions?",
      "How are executives brought into significant incidents?",
      "What internal and external parties must be contacted?",
      "Are incident roles and escalation thresholds documented?",
      "How are actions and decisions recorded?",
      "When were response arrangements last exercised?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Incident leadership and coordination depend on whoever is available and knowledgeable at the time."
      },
      "2": {
        "label": "Developing",
        "description": "Basic response plans, contact lists, or informal roles exist, but command, decision authority, escalation, or cross-functional coordination are inconsistent."
      },
      "3": {
        "label": "Established",
        "description": "The district maintains documented incident-management procedures defining declaration criteria, roles, authority, escalation, coordination, documentation, external dependencies, and leadership involvement."
      },
      "4": {
        "label": "Measured",
        "description": "Incident-management capability is exercised or otherwise validated. Performance, coordination issues, decision delays, role failures, plan exceptions, and lessons are documented and tracked."
      },
      "5": {
        "label": "Resilient",
        "description": "Incident command adapts effectively to complex or changing conditions. Exercises and real incidents produce sustained improvements in authority, coordination, playbooks, staffing, external relationships, and executive decision-making."
      }
    },
    "evidenceExpectations": [
      "L1–2: contact lists, informal plans, incident tickets, and ad hoc response records.",
      "L3: approved incident-response plan, roles, decision authority, escalation criteria, communication paths, and response records.",
      "L4: exercise results, response metrics, after-action findings, tracked improvements, and evidence of plan validation.",
      "L5: evidence that repeated testing or actual incidents materially strengthened the response system."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Identify response leadership, contacts, and basic escalation."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize incident command, decision rights, roles, documentation, and cross-functional coordination."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Exercise the capability and measure performance."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Use realistic incidents and exercises to continually adapt the command system."
      }
    ],
    "commonGaps": [
      "The IT director is implicitly responsible for everything.",
      "Executive authority is unclear.",
      "Contact lists are outdated.",
      "No alternate incident leader exists.",
      "Insurance or vendor requirements are unknown.",
      "Actions occur but are not documented."
    ],
    "roadmapOutputs": [
      "Define an incident command structure.",
      "Document declaration criteria.",
      "Assign alternates.",
      "Create an escalation matrix.",
      "Validate external contacts.",
      "Schedule a tabletop exercise.",
      "Track after-action improvements."
    ]
  },
  {
    "id": "CR.RS-02",
    "version": "1.0",
    "function": "RESPOND",
    "functionName": "Respond",
    "title": "Incident Analysis, Containment & Communication",
    "assessmentIntent": "Determine whether the district can investigate cybersecurity incidents, understand their scope and impact, contain and mitigate harm, preserve necessary information, and communicate appropriately with affected stakeholders and external parties.",
    "k12Context": "In a K–12 operating environment, investigation, containment, mitigation, and communication are closely interconnected parts of incident execution.",
    "nistMapping": {
      "references": [
        "RS.AN",
        "RS.CO",
        "RS.MI"
      ],
      "sourceNote": "RS.AN; RS.CO; RS.MI"
    },
    "guidedQuestions": [
      "How does the district determine what happened and what is affected?",
      "How are investigative records and relevant evidence preserved?",
      "Who determines containment actions?",
      "How are compromised accounts, devices, services, or connections isolated?",
      "How are mitigation decisions documented?",
      "Who determines internal and external communication requirements?",
      "How are legal, contractual, insurance, vendor, or other notification obligations evaluated?",
      "How does the district verify that containment was effective?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Investigation, containment, and communication are improvised based on immediate circumstances."
      },
      "2": {
        "label": "Developing",
        "description": "Procedures exist for common incidents and key contacts are generally known, but investigation, evidence preservation, containment, communication, or documentation practices vary."
      },
      "3": {
        "label": "Established",
        "description": "Documented procedures govern incident analysis, scope determination, evidence handling, containment, mitigation, communication, notification evaluation, documentation, and coordination with relevant external parties."
      },
      "4": {
        "label": "Measured",
        "description": "Response execution is evaluated using containment time, investigative completeness, communication performance, unresolved impacts, plan deviations, and other appropriate measures. Exercises and incidents validate procedures."
      },
      "5": {
        "label": "Resilient",
        "description": "Response procedures, technical containment capabilities, communication practices, and investigative readiness continually improve using incident experience, exercises, emerging threats, and measured results."
      }
    },
    "evidenceExpectations": [
      "L1–2: tickets, emails, isolated incident notes, and informal response records.",
      "L3: playbooks, evidence procedures, communication templates, containment procedures, incident records, and notification decision records.",
      "L4: response metrics, exercise results, communication review, containment validation, and after-action findings.",
      "L5: evidence of sustained procedural or technical improvement resulting from actual events and testing."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish repeatable response procedures for common incident scenarios."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize analysis, containment, evidence, mitigation, communication, and notification-decision processes."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Exercise and measure response effectiveness."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Continually adapt response capability using operational evidence."
      }
    ],
    "commonGaps": [
      "Containment performed without documenting impact.",
      "No evidence-preservation procedure.",
      "Notification decisions undocumented.",
      "Communication plans assume email remains available.",
      "Vendors excluded from exercises.",
      "Recovery begins before containment has been validated."
    ],
    "roadmapOutputs": [
      "Create incident playbooks.",
      "Establish an evidence-handling procedure.",
      "Define containment authority.",
      "Develop communication alternatives and templates.",
      "Document a notification-decision workflow.",
      "Conduct ransomware and account-compromise exercises.",
      "RC"
    ]
  },
  {
    "id": "CR.RC-01",
    "version": "1.0",
    "function": "RECOVER",
    "functionName": "Recover",
    "title": "Restoration & Continuity",
    "assessmentIntent": "Determine whether the district can restore critical technology and educational/operational services to an acceptable state following cybersecurity disruption.",
    "k12Context": "Recovery includes technical restoration and the continuity dependencies necessary to return critical district services safely and in an appropriate order.",
    "nistMapping": {
      "references": [
        "RC.RP"
      ],
      "sourceNote": "RC.RP"
    },
    "guidedQuestions": [
      "Which district services must be restored first?",
      "Who establishes restoration priorities?",
      "Are recovery dependencies documented?",
      "Are backups available, protected, and usable?",
      "When was restoration last tested?",
      "What conditions must be satisfied before a recovered system returns to production?",
      "How are temporary or manual operations addressed?",
      "How are restoration failures captured and corrected?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Recovery depends on available backups, individual knowledge, vendor assistance, and improvised technical effort."
      },
      "2": {
        "label": "Developing",
        "description": "Recovery procedures and backups exist for selected important systems, but priorities, dependencies, validation, testing, or coverage are inconsistent."
      },
      "3": {
        "label": "Established",
        "description": "The district documents recovery priorities, responsibilities, critical dependencies, backup requirements, restoration procedures, validation criteria, alternate arrangements, and relevant third-party dependencies."
      },
      "4": {
        "label": "Measured",
        "description": "Recovery capability is periodically tested. Restoration success, timing, backup integrity, dependency failures, unmet objectives, exceptions, and corrective actions are documented and reviewed."
      },
      "5": {
        "label": "Resilient",
        "description": "Recovery capabilities adapt using realistic testing, actual disruption, changing architecture, service criticality, and lessons learned. The district can demonstrate restoration or appropriate continuity of critical services under credible disruption scenarios."
      }
    },
    "evidenceExpectations": [
      "L1–2: backup reports, technical procedures, vendor recovery documentation, and informal recovery records.",
      "L3: formal recovery plans, service priorities, dependency maps, recovery responsibilities, restoration criteria, and alternate arrangements.",
      "L4: restoration tests, timing results, backup validation, failure analysis, exceptions, and corrective actions.",
      "L5: evidence that tests or incidents drove architecture, backup, dependency, continuity, or recovery-strategy improvements."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish reliable backups and baseline recovery procedures for critical services."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize priorities, dependencies, responsibilities, validation, and continuity arrangements."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Regularly test recovery and measure outcomes."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Use realistic disruption and measured results to continually strengthen recovery capability."
      }
    ],
    "commonGaps": [
      "Backup success mistaken for recovery capability.",
      "Restore tests absent.",
      "Recovery priorities undocumented.",
      "Identity, DNS, or internet dependencies overlooked.",
      "Vendor restoration assumptions unverified.",
      "Recovered systems returned without security validation."
    ],
    "roadmapOutputs": [
      "Establish service recovery priorities.",
      "Define restoration validation.",
      "Conduct recovery testing.",
      "Document dependencies.",
      "Validate backup isolation and integrity.",
      "Establish a recovery exercise cadence."
    ]
  },
  {
    "id": "CR.RC-02",
    "version": "1.0",
    "function": "RECOVER",
    "functionName": "Recover",
    "title": "Recovery Communication & Improvement",
    "assessmentIntent": "Determine whether recovery status is communicated effectively, stakeholder expectations are managed, lessons are captured, and recovery experience results in sustained organizational improvement.",
    "k12Context": "Recovery communication must remain viable when primary systems are impaired, and recovery lessons should feed back into governance, architecture, protection, monitoring, response, training, vendor management, and continuity.",
    "nistMapping": {
      "references": [
        "RC.CO",
        "ID.IM"
      ],
      "sourceNote": "RC.CO; deliberate linkage to ID.IM"
    },
    "guidedQuestions": [
      "Who requires recovery-status information?",
      "Who is authorized to communicate externally?",
      "What communication channels remain available if primary systems are unavailable?",
      "How are restoration priorities and status communicated internally?",
      "How are external partners and vendors coordinated?",
      "Is an after-action review conducted after significant incidents or recovery exercises?",
      "How are lessons converted into owned corrective actions?",
      "How does the district verify that lessons were actually implemented?"
    ],
    "maturityLevels": {
      "1": {
        "label": "Ad Hoc",
        "description": "Recovery communication and lessons learned depend on immediate circumstances and individual initiative."
      },
      "2": {
        "label": "Developing",
        "description": "Basic communication arrangements and informal after-action practices exist, but audience, authority, alternatives, follow-through, or documentation vary."
      },
      "3": {
        "label": "Established",
        "description": "The district maintains documented recovery communication procedures, stakeholder responsibilities, alternative communication methods, status-reporting expectations, after-action review, and corrective-action processes."
      },
      "4": {
        "label": "Measured",
        "description": "Communication effectiveness, stakeholder issues, recovery lessons, corrective actions, recurring findings, and closure evidence are reviewed and tracked."
      },
      "5": {
        "label": "Resilient",
        "description": "Recovery learning systematically influences governance, architecture, protection, monitoring, response, training, vendor management, continuity planning, and future resilience investments."
      }
    },
    "evidenceExpectations": [
      "L1–2: emails, contact lists, informal after-action notes, and isolated status records.",
      "L3: recovery communication plan, templates, alternate channels, after-action procedure, and improvement records.",
      "L4: communication and exercise evaluations, corrective-action tracking, closure evidence, and recurring-finding analysis.",
      "L5: evidence that recovery lessons caused broader and sustained organizational changes."
    ],
    "advancement": [
      {
        "from": 1,
        "to": 2,
        "action": "Establish basic recovery communication and after-action practices."
      },
      {
        "from": 2,
        "to": 3,
        "action": "Formalize audiences, authority, alternative channels, review, and corrective-action processes."
      },
      {
        "from": 3,
        "to": 4,
        "action": "Measure communication effectiveness and track lessons through evidence-based closure."
      },
      {
        "from": 4,
        "to": 5,
        "action": "Systematically feed recovery learning into cybersecurity strategy and resilience."
      }
    ],
    "commonGaps": [
      "Primary communication method depends on affected infrastructure.",
      "No designated spokesperson.",
      "After-action reports produced without remediation.",
      "Repeated recovery failures treated independently.",
      "Technical lessons never reach leadership."
    ],
    "roadmapOutputs": [
      "Define a recovery communication matrix.",
      "Establish alternate channels.",
      "Create an after-action standard.",
      "Link lessons to the improvement register.",
      "Require closure evidence.",
      "Report recurring recovery findings to leadership."
    ]
  }
];

export const CCRR_DOMAIN_BY_ID = Object.fromEntries(CCRR_DOMAINS.map(domain => [domain.id, domain]));

