export const trainingGuide = {
  title: 'Cybersecurity Assessment Guidance',
  intro: 'Use the assessment as an evidence-based improvement workflow. Gather and review evidence before group scoring.',
  steps: [
    {
      title: 'Gather evidence before you score',
      description: 'Collect policies, agreements, inventories, MFA records, training records, tabletop or drill artifacts, and any other documentation that supports the maturity level you intend to select.',
    },
    {
      title: 'Review each maturity level in order',
      description: 'Read the level 1 through level 5 statements carefully for every category. Move upward only while the current level is fully supported by evidence.',
    },
    {
      title: 'Use stakeholders to validate the rating',
      description: 'Bring IT, cybersecurity, leadership, operations, and any process owners into the discussion so the score reflects how the district actually works, not just how it is supposed to work.',
    },
    {
      title: 'Document the why behind the rating',
      description: 'Record what evidence supports the selected level, what is missing for the next level, and what follow-up clarification is still needed.',
    },
    {
      title: 'Turn the score into an action plan',
      description: 'Call out strengths, identify gaps, and track practical improvements. Reassess regularly so the rubric becomes a continuous-improvement tool instead of a one-time exercise.',
    },
  ],
};

export const categoryCodes = {
  Govern: {
    'ORGANIZATIONAL CONTEXT': 'GV.OC',
    'RISK MANAGEMENT STRATEGY': 'GV.RM',
    'ROLES, RESPONSIBILITIES, AND AUTHORITIES': 'GV.RR',
    POLICY: 'GV.PO',
    OVERSIGHT: 'GV.OV',
    'CYBERSECURITY SUPPLY CHAIN RISK MANAGEMENT': 'GV.SC',
  },
  Identify: {
    'ASSET MANAGEMENT': 'ID.AM',
    'RISK ASSESSMENT': 'ID.RA',
    IMPROVEMENT: 'ID.IM',
  },
  Protect: {
    'IDENTITY MANAGEMENT, AUTHENTICATION, AND ACCESS CONTROL': 'PR.AA',
    'AWARENESS AND TRAINING': 'PR.AT',
    'DATA SECURITY': 'PR.DS',
    'PLATFORM SECURITY': 'PR.PS',
    'TECHNOLOGY INFRASTRUCTURE RESILIENCE': 'PR.IR',
  },
  Detect: {
    'CONTINUOUS MONITORING': 'DE.CM',
    'ADVERSE EVENT ANALYSIS': 'DE.AE',
  },
  Respond: {
    'INCIDENT MANAGEMENT': 'RS.MA',
    'INCIDENT ANALYSIS': 'RS.AN',
    'INCIDENT RESPONSE REPORTING AND COMMUNICATION': 'RS.CO',
    'INCIDENT MITIGATION': 'RS.MI',
  },
  Recover: {
    'INCIDENT RECOVERY PLAN EXECUTION': 'RC.RP',
    'INCIDENT RECOVERY COMMUNICATION': 'RC.CO',
  },
};
