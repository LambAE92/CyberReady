// Prototype assessment data retained for current functionality.
// Framework/source provenance requires review before commercial deployment.

export const RUBRIC_FUNCTIONS = [
  {
    "name": "Govern",
    "key": "GOVERN",
    "levelDescriptions": {
      "1": "School executive leadership involvement is minimal, with ad hoc management oversight and undefined roles resulting in sporadic and undocumented cybersecurity practices.",
      "2": "Leadership and management oversight begin to take shape with some governance structures and risk management strategies emerging, though not systematically applied.",
      "3": "Governance and strategic plans are formalized, with clear cybersecurity risk mitigation expectations, contracts, policies, roles, and responsibilities established and communicated.",
      "4": "Leadership is proactive, with governance frameworks and oversight guiding well-defined and managed cybersecurity policies and practices across the school system.",
      "5": "Governance and oversight are deeply embedded and continuously improved, demonstrating high levels of efficiency, effectiveness, and adaptability in the school system's cybersecurity strategies, operations, and processes."
    },
    "categories": [
      {
        "name": "ORGANIZATIONAL CONTEXT",
        "levels": {
          "1": "No documented understanding of the district's cybersecurity obligations, regulatory requirements, or threat environment. Leadership is not engaged with cybersecurity as a governance responsibility.",
          "2": "Some awareness of cybersecurity obligations exists at the IT level. Leadership occasionally discusses cyber risk but no formal context assessment has been completed.",
          "3": "The district has documented its cybersecurity regulatory requirements (FERPA, CIPA, state mandates), key stakeholder expectations, and primary threat environment. This context informs governance decisions.",
          "4": "Organizational context is formally reviewed annually. Leadership uses the context assessment to set cybersecurity priorities and resource allocation across the district.",
          "5": "Context assessment is continuous and integrated into strategic planning. Changes in regulations, technology, or the threat landscape automatically trigger governance reviews."
        }
      },
      {
        "name": "RISK MANAGEMENT STRATEGY",
        "levels": {
          "1": "No risk management strategy exists. Cybersecurity decisions are made reactively, without a documented framework or risk tolerance definition.",
          "2": "Some risk management activities occur informally. Risk tolerance is implied rather than defined. No documented strategy guides prioritization.",
          "3": "A documented cybersecurity risk management strategy is approved by leadership. Risk tolerance is defined. Risk management responsibilities are assigned.",
          "4": "Risk management strategy is actively used to prioritize investments and responses. Leadership reviews risk posture quarterly. Strategy is aligned to district goals.",
          "5": "Risk management is embedded across all district operations. Risk data continuously informs strategic decisions. The strategy evolves with the threat landscape."
        }
      },
      {
        "name": "ROLES, RESPONSIBILITIES, AND AUTHORITIES",
        "levels": {
          "1": "Cybersecurity responsibilities are undefined or informally assigned to IT staff. No accountability exists at leadership or board level.",
          "2": "Basic IT roles related to cybersecurity exist, but governance-level accountability (superintendent, board) is absent. Responsibilities are not formally documented.",
          "3": "Cybersecurity roles and responsibilities are formally documented and communicated. A designated program lead exists. Board and superintendent have defined oversight responsibilities.",
          "4": "Role clarity is enforced across the district. Performance expectations include cybersecurity responsibilities. Leadership actively exercises its governance role.",
          "5": "Accountability structures are embedded in position descriptions, evaluations, and board policy. Cross-functional teams collaborate on governance with clear authority."
        }
      },
      {
        "name": "POLICY",
        "levels": {
          "1": "No formal cybersecurity policies exist. Staff operate without written guidance on acceptable use, data handling, or incident reporting.",
          "2": "Some policies exist (e.g., acceptable use) but are outdated, incomplete, or not consistently enforced. No policy review cycle exists.",
          "3": "A documented cybersecurity policy framework is in place, reviewed within the past year, board-approved, and communicated to all staff.",
          "4": "Policies are comprehensive, regularly reviewed, and actively enforced. Staff training on policies is documented. Exceptions require formal approval.",
          "5": "Policy framework is continuously refined based on incidents, audits, and emerging threats. Policies are embedded in onboarding and ongoing operations."
        }
      },
      {
        "name": "OVERSIGHT",
        "levels": {
          "1": "No formal cybersecurity oversight exists at the board or superintendent level. Cybersecurity is treated as an IT-only responsibility.",
          "2": "Leadership occasionally receives cybersecurity updates, but oversight is informal and not structured. No regular reporting cadence exists.",
          "3": "The board receives regular cybersecurity reporting. A defined oversight structure exists. Leadership reviews posture at least annually.",
          "4": "Oversight is active and informed. Leadership asks substantive questions about cyber risk. Governance decisions are documented and tracked.",
          "5": "Cybersecurity oversight is fully integrated into district governance alongside financial and safety oversight. Board competency in cyber risk is actively developed."
        }
      },
      {
        "name": "CYBERSECURITY SUPPLY CHAIN RISK MANAGEMENT",
        "levels": {
          "1": "No process exists for evaluating the cybersecurity posture of vendors or third-party service providers. Contracts do not address data security.",
          "2": "Some awareness of vendor risk exists. Data Processing Agreements (DPAs) may be in place for major vendors but are not systematically required or reviewed.",
          "3": "A documented vendor risk management process exists. DPAs are required for vendors with access to student or staff data. Vendor security is reviewed before contract signing.",
          "4": "Vendor risk management is enforced across all procurement. Annual reviews of critical vendors are conducted. Non-compliant vendors are flagged and escalated.",
          "5": "Supply chain risk management is continuous and automated where possible. Vendor security posture is tracked and influences renewal decisions."
        }
      }
    ]
  },
  {
    "name": "Identify",
    "key": "IDENTIFY",
    "levelDescriptions": {
      "1": "Processes to identify cybersecurity risks are lacking or nonexistent.",
      "2": "Processes for cybersecurity risk identification exist but are in the beginning stages.",
      "3": "Risks to Information Technology (IT) assets are identified and managed in a standard, well-defined process.",
      "4": "Risks to the school system environment are identified and proactively monitored on a regular basis.",
      "5": "Cybersecurity risks are continuously monitored and used to make system-wide decisions."
    },
    "categories": [
      {
        "name": "ASSET MANAGEMENT",
        "levels": {
          "1": "No complete inventory of hardware or software assets exists. The district cannot reliably identify what devices are on its network.",
          "2": "A partial asset inventory exists but is maintained informally and infrequently updated. Shadow IT and unmanaged devices are present.",
          "3": "A maintained, complete inventory of hardware and software assets exists. Assets are classified by type and data sensitivity. Ownership is assigned.",
          "4": "Asset inventory is actively managed and automatically updated. Assets are tracked through their full lifecycle. Unauthorized assets trigger alerts.",
          "5": "Asset management is fully automated and integrated with security operations. Asset data continuously informs risk decisions and governance reporting."
        }
      },
      {
        "name": "RISK ASSESSMENT",
        "levels": {
          "1": "No formal risk assessment process exists. Cyber risks are identified only after incidents occur.",
          "2": "Informal or ad hoc risk assessments have been conducted, but without a repeatable methodology or documentation standard.",
          "3": "A documented risk assessment methodology is used on at least an annual basis. Results are recorded, prioritized, and reviewed by leadership.",
          "4": "Risk assessments are conducted regularly and when significant changes occur. Results directly inform the risk management strategy and capital planning.",
          "5": "Risk assessment is continuous and integrated with threat intelligence. Risk data is used proactively to prevent incidents before they occur."
        }
      },
      {
        "name": "IMPROVEMENT",
        "levels": {
          "1": "No process exists for learning from cybersecurity incidents or near-misses. The same vulnerabilities recur without correction.",
          "2": "Lessons learned discussions occur informally after significant incidents but are not documented or tracked.",
          "3": "A documented improvement process captures lessons from incidents, assessments, and audits. Findings are tracked to resolution.",
          "4": "Improvement actions are formally tracked, assigned owners, and monitored through completion. Trends are analyzed to identify systemic issues.",
          "5": "Continuous improvement is embedded in district operations. Cybersecurity improvements are benchmarked against sector peers and best practices."
        }
      }
    ]
  },
  {
    "name": "Protect",
    "key": "PROTECT",
    "levelDescriptions": {
      "1": "Asset protection is reactive and ad hoc.",
      "2": "Data protection techniques are implemented across the school system.",
      "3": "Data is formally defined and protected per its risk classification.",
      "4": "The school system environment is proactively monitored using protective technologies.",
      "5": "Protection standards are operationalized through automation and advanced technologies."
    },
    "categories": [
      {
        "name": "IDENTITY MANAGEMENT, AUTHENTICATION, AND ACCESS CONTROL",
        "levels": {
          "1": "Access controls are minimal. Shared accounts, default passwords, and unrestricted administrative access are common. No MFA exists.",
          "2": "Basic account management exists. Some access controls are in place but are inconsistently applied. MFA may exist for a subset of systems.",
          "3": "Role-based access control is documented and enforced. MFA is required for administrative and remote access. Account provisioning and deprovisioning processes exist.",
          "4": "Access is governed by least-privilege principles across all systems. MFA is enforced district-wide. Access reviews are conducted regularly.",
          "5": "Identity management is fully automated with continuous access certification. Privileged access is strictly controlled and monitored in real time."
        }
      },
      {
        "name": "AWARENESS AND TRAINING",
        "levels": {
          "1": "No formal cybersecurity awareness program exists. Staff have received little or no training on recognizing or responding to cyber threats.",
          "2": "Annual training occurs for some staff. Training is generic and not role-specific. Completion is not consistently tracked.",
          "3": "A documented annual training program is in place for all staff. Training is tracked to completion. Phishing simulations are conducted.",
          "4": "Training is role-specific, regularly updated, and completion is enforced. Phishing simulation results drive targeted follow-up training.",
          "5": "Security awareness is embedded in district culture. Training is continuous, personalized, and measured for behavioral change."
        }
      },
      {
        "name": "DATA SECURITY",
        "levels": {
          "1": "No documented data classification or data protection controls exist. Student PII and sensitive data are not consistently protected.",
          "2": "Some data protection measures exist (e.g., antivirus, basic access controls) but are not tied to a documented classification scheme.",
          "3": "Data is classified by sensitivity. Protection controls are applied based on classification. DPAs are in place for third parties handling student data.",
          "4": "Data protection controls are consistently enforced and regularly audited. Encryption is applied to sensitive data at rest and in transit.",
          "5": "Data protection is fully automated and continuously monitored. Data loss prevention (DLP) tools alert on policy violations in real time."
        }
      },
      {
        "name": "PLATFORM SECURITY",
        "levels": {
          "1": "Patch management is reactive. Systems run outdated firmware and software. No formal vulnerability management program exists.",
          "2": "Patching occurs but without a defined cadence or prioritization framework. Critical patches may lag weeks or months behind release.",
          "3": "A documented patch management policy defines cadence (e.g., critical patches within 30 days). Patch compliance is tracked and reported.",
          "4": "Platform security is proactively managed. Vulnerability scans are run regularly. Patch compliance metrics are reviewed by leadership.",
          "5": "Platform security is automated and continuously monitored. Zero-day vulnerabilities trigger immediate response workflows."
        }
      },
      {
        "name": "TECHNOLOGY INFRASTRUCTURE RESILIENCE",
        "levels": {
          "1": "No redundancy or resilience planning exists for critical systems. A single point of failure could shut down district operations.",
          "2": "Some redundancy exists for critical systems (e.g., backup internet). Resilience is not formally documented or tested.",
          "3": "Technology resilience requirements are documented for critical systems. Redundant systems and failover procedures exist and are tested annually.",
          "4": "Resilience is actively managed. Failover capabilities are tested regularly. Recovery time objectives (RTOs) are defined and met.",
          "5": "Infrastructure resilience is continuously optimized. Automated failover, real-time monitoring, and resilience metrics inform ongoing investment."
        }
      }
    ]
  },
  {
    "name": "Detect",
    "key": "DETECT",
    "levelDescriptions": {
      "1": "Anomalies and events are not detected or not detected in a timely manner.",
      "2": "Anomaly detection is established through detection tools and monitoring processes.",
      "3": "A baseline of normal activity is established and applied against tools and processes to better identify malicious activity.",
      "4": "Continuous monitoring of the cybersecurity program is established to detect threats in real time.",
      "5": "Detection and monitoring solutions continuously learn behaviors and adjust to detection capabilities."
    },
    "categories": [
      {
        "name": "CONTINUOUS MONITORING",
        "levels": {
          "1": "No continuous monitoring exists. The district has no visibility into what is happening on its network in real time.",
          "2": "Basic logging is enabled on some systems. Logs are rarely reviewed. No centralized visibility into network activity exists.",
          "3": "Centralized logging and monitoring tools are deployed. Alerts are configured for critical events. Logs are reviewed regularly.",
          "4": "Monitoring coverage is comprehensive across all critical assets. Alerts are tuned to reduce false positives. Monitoring data informs risk decisions.",
          "5": "Continuous monitoring is automated and integrated with incident response. Behavioral analytics detect anomalies before they become incidents."
        }
      },
      {
        "name": "ADVERSE EVENT ANALYSIS",
        "levels": {
          "1": "No process exists for analyzing security events. Alerts, if they exist, are ignored or generate no response.",
          "2": "Security events are sometimes reviewed but without a formal process. Analysis is ad hoc and undocumented.",
          "3": "A documented process exists for analyzing adverse events. Severity classification guides prioritization. Events are logged and tracked.",
          "4": "Adverse event analysis is thorough and timely. Root cause analysis is conducted for significant events. Findings feed the improvement process.",
          "5": "Event analysis is automated and continuous. Threat intelligence enriches analysis. Patterns across events inform proactive threat hunting."
        }
      }
    ]
  },
  {
    "name": "Respond",
    "key": "RESPOND",
    "levelDescriptions": {
      "1": "Processes for responding to cybersecurity incidents are reactive or non-existent.",
      "2": "Analysis capabilities are applied consistently to cybersecurity incidents by Incident Response (IR) roles.",
      "3": "An Incident Response (IR) plan defines steps for pre-, during, and post-incident preparation, analysis, containment, and eradication.",
      "4": "Response times and impacts of cybersecurity incidents are monitored and minimized.",
      "5": "Detection and monitoring solutions continuously learn behaviors and adjust to detection capabilities."
    },
    "categories": [
      {
        "name": "INCIDENT MANAGEMENT",
        "levels": {
          "1": "No incident response plan exists. The district improvises its response to cyber incidents with no defined process.",
          "2": "A basic incident response plan may exist but has never been tested. Roles during an incident are unclear.",
          "3": "A documented incident response plan exists, is board-approved, and assigns clear roles. Staff know how to activate it.",
          "4": "The incident response plan is tested at least annually through tabletop exercises. Gaps identified in testing are remediated.",
          "5": "Incident management is practiced continuously. The plan is updated after every exercise and real incident. Response times consistently meet targets."
        }
      },
      {
        "name": "INCIDENT ANALYSIS",
        "levels": {
          "1": "No post-incident analysis occurs. Incidents are resolved and forgotten without documenting causes or lessons learned.",
          "2": "Some post-incident discussion occurs informally but is not documented. Root causes are rarely identified.",
          "3": "Post-incident analysis is required for significant events. Root causes are documented. Findings are shared with leadership.",
          "4": "Incident analysis is structured and thorough. Root causes consistently drive improvement actions. Trends across incidents are analyzed.",
          "5": "Incident analysis is integrated into continuous improvement. Findings are benchmarked and drive policy updates."
        }
      },
      {
        "name": "INCIDENT RESPONSE REPORTING AND COMMUNICATION",
        "levels": {
          "1": "No communication plan exists for cyber incidents. Leadership, parents, and regulators would receive no timely notification.",
          "2": "Informal communication occurs during incidents but without defined audiences, timelines, or messaging templates.",
          "3": "A documented communication plan exists for cyber incidents. It defines notification obligations (state agencies, families, media) and assigns spokespeople.",
          "4": "Communication templates are pre-drafted and regularly reviewed. Notification timelines are defined and tested. Legal and PR guidance is accessible.",
          "5": "Communication protocols are practiced in exercises. Templates are updated based on regulatory changes. Communications are consistently timely and accurate."
        }
      },
      {
        "name": "INCIDENT MITIGATION",
        "levels": {
          "1": "No documented mitigation procedures exist. Containment during an incident is improvised and often incomplete.",
          "2": "Basic containment steps are known to IT staff but are not documented. Mitigation is inconsistently applied.",
          "3": "Documented mitigation procedures exist for common incident types (ransomware, phishing, data breach). Procedures are accessible to response team members.",
          "4": "Mitigation procedures are regularly reviewed and updated. Staff are trained on them. Containment actions are logged and tracked during incidents.",
          "5": "Mitigation is automated where possible. Playbooks are continuously refined based on threat intelligence and past incidents."
        }
      }
    ]
  },
  {
    "name": "Recover",
    "key": "RECOVER",
    "levelDescriptions": {
      "1": "Processes for recovering from cybersecurity incidents are reactive or non-existent.",
      "2": "Resiliency and recovery capabilities are applied consistently to cybersecurity incidents impacting school system operations.",
      "3": "Continuity and disaster recovery plans define steps to continue critical functions, recover, and resume normal operations.",
      "4": "Recovery times and impacts of incidents are monitored and minimized.",
      "5": "The capabilities of all Information Technology (IT) personnel, processes, and technologies are regularly tested and updated."
    },
    "categories": [
      {
        "name": "INCIDENT RECOVERY PLAN EXECUTION",
        "levels": {
          "1": "No recovery plan exists. Restoration after an incident depends entirely on individual IT staff knowledge with no documented process.",
          "2": "Backups exist but restoration procedures are undocumented. Recovery time is unpredictable. Backups have not been verified recently.",
          "3": "A documented recovery plan exists. Backup procedures are defined and include verification. Recovery time objectives (RTOs) are documented.",
          "4": "Recovery capabilities are tested annually. Backup integrity is verified regularly. RTOs are consistently met during test exercises.",
          "5": "Recovery is highly automated and continuously tested. The district can restore critical systems within defined RTOs. Recovery capabilities are benchmarked."
        }
      },
      {
        "name": "INCIDENT RECOVERY COMMUNICATION",
        "levels": {
          "1": "No communication plan exists for the recovery phase. Stakeholders receive no updates on restoration progress.",
          "2": "Recovery communications occur informally. No defined process, audience list, or timeline exists for keeping stakeholders informed.",
          "3": "A documented recovery communication plan defines who receives updates, at what intervals, and through what channels during restoration.",
          "4": "Recovery communications are coordinated, accurate, and timely during exercises and real incidents. Stakeholder confidence is actively managed.",
          "5": "Recovery communications are practiced in exercises and continuously improved. Post-incident communication debriefs inform future messaging."
        }
      }
    ]
  }
];

function buildCcreAdvancement(categoryName) {
  const focus = categoryName.toLowerCase();
  return [
    {
      from: 1,
      to: 2,
      steps: [
        `Assign an owner for ${focus} and document who is responsible for next steps.`,
        `Create a simple inventory of current ${focus} practices, artifacts, gaps, and known risks.`,
        `Draft basic written guidance for ${focus} using district policy, procedure, or checklist format.`,
        'Review the draft with IT leadership and one district leadership stakeholder.',
      ],
    },
    {
      from: 2,
      to: 3,
      steps: [
        `Convert informal ${focus} practices into a documented district process with clear roles.`,
        'Define the evidence that will be used to prove the process is operating as intended.',
        'Communicate the process to affected schools, departments, and leadership roles.',
        'Set a recurring review date and store artifacts in a shared governance location.',
      ],
    },
    {
      from: 3,
      to: 4,
      steps: [
        `Track ${focus} performance with measurable indicators such as completion, review, exception, or remediation status.`,
        'Assign owners and due dates for gaps found through audits, incidents, reviews, or tabletop exercises.',
        'Report progress to district leadership at a defined cadence.',
        'Enforce the documented process consistently and require approval for exceptions.',
      ],
    },
    {
      from: 4,
      to: 5,
      steps: [
        `Use trends from ${focus} metrics, incidents, audits, and peer benchmarks to drive continuous improvement.`,
        'Automate monitoring, reminders, evidence capture, or reporting where practical.',
        'Update board reporting and strategic planning based on measurable outcomes.',
        'Refine the process after major technology, threat, regulatory, or operational changes.',
      ],
    },
  ];
}

RUBRIC_FUNCTIONS.forEach(fn => {
  fn.categories.forEach(category => {
    category.advancement = buildCcreAdvancement(category.name);
  });
});

export const INTERVIEW_QUESTIONS = {
  "GOVERN": {
    "ORGANIZATIONAL CONTEXT": {
      "1": "Risk Mitigation and Cybersecurity Planning: \n\u2022 Can you describe how your school approaches risk mitigation and cybersecurity planning without clearly defined defenses? \n\u2022 How does your school's approach to risk mitigation and cybersecurity planning impact your overall cybersecurity posture?\n\nThird-Party Data Sharing: \n\u2022 How are data-sharing agreements with third parties managed in the absence of formal agreements? \n\u2022 What challenges have arisen from the current approach to sharing data with third parties?\n\nSensitive Data Processes: \n\u2022 What processes are in place for managing sensitive data, and how are these processes in need of improvement? \n\u2022 Can you provide examples of the difficulties you've faced managing sensitive data?",
      "2": "Consistency in Operational Processes: \n\u2022 Can you discuss how operational processes and responsibilities for cybersecurity are managed, despite being mostly ad hoc or reactive?\n\nFormalization of Data Sharing Agreements: \n\u2022 What steps are you taking to formalize contractual data-sharing agreements with third parties? \n\u2022 How have formal data-sharing agreements impacted your cybersecurity strategy?\n\nManagement of Sensitive Data: \n\u2022 How are sensitive data processes managed, and what measures are in place to ensure these are routinely tracked and enforced?",
      "3": "Documentation of Risk Mitigation Operations: \n\u2022 Can you explain how you document risk mitigation operations and how third-party data-sharing agreements meet legal and regulatory requirements?\n\nEnforcement of Sensitive Data Processes: \n\u2022 How are sensitive data processes measured, enforced, and integrated with privacy and security requirements? \n\u2022 What controls are in place to prevent loss, damage, or theft?\n\nUnderstanding of Strategic Plans: \n\u2022 How do strategic plans address cybersecurity roles and responsibilities?\n\u2022 Can you describe how risk management decisions align with the organization's mission and stakeholder expectations?",
      "4": "Department Level Performance Controls: \n\u2022 How are performance controls implemented at the department level to evaluate system-wide risk? \n\u2022 Can you provide examples of how these measures have improved your cybersecurity posture?\n\nResiliency Measures and Cybersecurity Assessments: \n\u2022 What resiliency measures are in place to anticipate and recover from cyber events? \n\u2022 How regularly are cybersecurity assessments conducted to verify performance levels?\n\nStrategic Planning and Budget Allocation: \n\u2022 How do needs assessment data influence strategic planning and budget allocations? \n\u2022 Can you discuss the current strategic planning process and its impact on cybersecurity initiatives?",
      "5": "Informed Strategic Planning: \n\u2022 How do strategic plans inform your organization's cybersecurity roles, responsibilities, and risk management decisions? \n\u2022 Can you provide an example of how this approach has been beneficial?\n\nEffectiveness of Controls: \n\u2022 How do you ensure that controls in place are effective, systematic, and responsive? \n\u2022 Can you share insights from recent cybersecurity assessments?\n\nOrganizational-Wide Analysis for Cybersecurity: \n\u2022 How is an organizational-wide analysis used to optimize fact-based cybersecurity assessments? \n\u2022 Can you discuss how organizational-wide analysis has led to improvements in your cybersecurity strategy?"
    },
    "RISK MANAGEMENT STRATEGY": {
      "1": "Definition of Risk Management Priorities: \n\u2022 How does your school identify and prioritize its cybersecurity risks without clearly defined priorities, constraints, risk tolerances, and assumptions?\n\nDevelopment of Risk Management Strategy: \n\u2022 What steps are being taken to develop a comprehensive risk management strategy in the absence of documented processes aligned with your architecture and strategic roadmap?\n\nSupport for Operational Risk Decisions: \n\u2022 How do you support operational risk decisions without a clear risk management strategy or documented processes?",
      "2": "Development of Risk Management Components: \n\u2022 Can you describe the process of developing the organization's risk priorities, constraints, risk tolerances, and assumptions? \n\u2022 How are these components being integrated into your cybersecurity strategy?\n\nTransition to Proactive Risk Management: \n\u2022 What measures are you taking to transition risk management from reactive to proactive? \n\u2022 Can you provide examples of how these processes are being established?\n\nSupport for Operational Risk Decisions:\n\u2022 How are newly established risk management processes used to support operational risk decisions within the school?",
      "3": "Documentation and Agreement on Risk Management Processes: \n\u2022 How are risk management processes documented and agreed upon by organizational stakeholders? \n\u2022 Can you discuss the inclusion of cybersecurity risk objectives and activities?\n\nSupply Chain Risk Management: \n\u2022 How are supply chain risk management processes defined within your risk management strategy? \n\u2022 What actions do you track to disseminate cybersecurity risks to stakeholders?\n\nRisk Management Communication Plan: \n\u2022 Can you elaborate on the communication plan for the risk management strategy? \n\u2022 How does the communication plan for the risk management strategy facilitate sharing information on cybersecurity risks across the organization?",
      "4": "Cultural Embedment of Risk Management Strategy: \n\u2022 How is the shared risk management strategy culturally embedded within the school? \n\u2022 Can you share how this understanding influences response patterns to cybersecurity threats?\n\nStakeholder Commitment: \n\u2022 How do stakeholders demonstrate their commitment to detecting and responding to changing cybersecurity threats and vulnerabilities? \n\u2022 Can you provide an example of this commitment in action?\n\nStrategic Response to Cybersecurity Threats: \n\u2022 How does the organization ensure all stakeholders are aligned and committed to the strategic direction for responding to cybersecurity threats and vulnerabilities?",
      "5": "Deployment of Risk Management Strategy: \n\u2022 How is the risk management strategy fully deployed and integrated across the school system? \n\u2022 Can you discuss the absence of significant weaknesses or gaps?\n\nSharing Processes and Lessons Learned: \n\u2022 How do you regularly share processes and lessons learned with the broader education market sector community? \n\u2022 How does this sharing impact your cybersecurity posture?\n\nContinuous Improvement in Risk Management: \n\u2022 How does the organization ensure continuous improvement and optimization of the risk management strategy? \n\u2022 Can you provide examples of how feedback from the community influences your risk management strategy?"
    },
    "ROLES, RESPONSIBILITIES, AND AUTHORITIES": {
      "1": "Definition of Roles and Responsibilities: \n\u2022 How is your school currently defining the roles and responsibilities for developing and implementing data privacy and cybersecurity policies and practices?\n\nAllocation of Resources and Budgets: \n\u2022 What steps are being taken to allocate the necessary resources and budgets to meet the school's cybersecurity and data privacy needs?\n\nEstablishment of Cybersecurity Framework: \n\u2022 How do you plan to establish a framework for cybersecurity roles, responsibilities, and authorities to enhance accountability and performance assessment?",
      "2": "Development of Cybersecurity Processes: \n\u2022 Can you describe how cybersecurity processes are evolving within your school, particularly in defining stakeholder roles and responsibilities?\n\nExecutive Leadership in Cybersecurity: \n\u2022 Who is the executive leader responsible for developing and implementing cybersecurity policies and practices? \n\u2022 How has executive leadership's involvement in developing and implementing cybersecurity policies and practices impacted your cybersecurity posture?\n\nResource and Budget Allocation for Cybersecurity: \n\u2022 How are resources and budgets being identified and allocated to meet the school's essential cybersecurity and data privacy needs?",
      "3": "Documentation of Cybersecurity Roles and Responsibilities: \n\u2022 How are your organization's cybersecurity roles and responsibilities for internal and external stakeholders defined, understood, and documented?\n\nAlignment of Resources with Cybersecurity Needs: \n\u2022 Can you discuss how resources are aligned and allocated system-wide to meet current and future cybersecurity needs?\n\nIncorporation of Cybersecurity in HR Practices: \n\u2022 How are human resource processes adapted to include cybersecurity training during onboarding and regular updates for staff?",
      "4": "Cybersecurity Governance and Awareness Programs: \n\u2022 How does system-wide cybersecurity governance incorporate awareness programs to influence security-conscious behavior among the workforce?\n\nReview and Improvement of Cybersecurity Practices: \n\u2022 Can you provide examples of how you review TLE practice areas annually and determine improvement initiatives based on evaluation results?\n\nEnhancement of Cybersecurity Skills and Awareness: \n\u2022 How are staff encouraged and supported to improve their cybersecurity skills and awareness through ongoing training and development programs?",
      "5": "Accountability in Detection Roles: \n\u2022 How are roles and responsibilities for detection defined to ensure accountability within the school system?\n\nAnnual Audits of Governance Processes: \n\u2022 Can you discuss the annual audit process for assessing compliance with federal, state, and local regulations? \n\u2022 How does the annual audit process process impact your cybersecurity strategy?\n\nAchievement of TLE Seal Mark of Distinction: \n\u2022 Is the school system working toward\u2014or has it already obtained\u2014the TLE seal mark of distinction? \n\u2022 What steps are you taking to achieve the TLE seal mark of distinction?"
    },
    "POLICY": {
      "1": "Establishment of Cybersecurity Policies: \n\u2022 Can you describe how your school currently manages cybersecurity risks without documented policies?\n\nPolicy Communication and Enforcement: \n\u2022 Without established cybersecurity policies, how does the school communicate and enforce guidelines or rules regarding cybersecurity?\n\nProcess for Developing Policies: \n\u2022 What steps are you taking to develop and implement cybersecurity policies within the school?",
      "2": "Development of Cybersecurity Policies: \n\u2022 How are the school's policies for managing cybersecurity risks currently being developed? \n\u2022 Can you share the process involved in policy creation?\n\nGovernance Practice in Policy Approval: \n\u2022 What governance practices are in place to approve strategic direction and policy creation to support operational risk decisions?\n\nTransition to Proactive Risk Management: \n\u2022 Can you describe how risk management is transitioning from reactive to proactive within the context of policy development?",
      "3": "Documentation and Stakeholder Agreement on Policies: \n\u2022 How are cybersecurity policies documented and agreed upon by organizational stakeholders?\n\nInclusion of Risk Assessment in Policies: \n\u2022 How do your risk assessment policies account for identifying new threats, vulnerabilities, and conditions that may impact system security?\n\nPolicy Communication to Stakeholders: \n\u2022 How are documented cybersecurity policies communicated to relevant stakeholders within the school?",
      "4": "Review and Update of Cybersecurity Policies: \n\u2022 How are policies for managing cybersecurity risks reviewed and updated to reflect changes in requirements, threats, technology, and the school's mission?\n\nStakeholder Commitment to Cybersecurity: \n\u2022 Can you discuss the level of stakeholder commitment to detecting and responding to changes in cybersecurity threats and vulnerabilities?\n\nEnforcement of Updated Policies: \n\u2022 How are updated policies communicated and enforced across the school to ensure compliance and adaptation to new cybersecurity challenges?",
      "5": "Deployment of Risk Management Strategy in Policies: \n\u2022 How is the risk management strategy integrated into cybersecurity policies to ensure no significant weaknesses or gaps exist across the school?\n\nSharing of Policy Updates and Lessons Learned: \n\u2022 Can you explain how you regularly share policy updates and lessons learned with the broader education market sector community?\n\nContinuous Improvement of Cybersecurity Policies: \n\u2022 How does the school ensure continuous improvement and optimization of cybersecurity policies? \n\u2022 Can you provide examples of recent cybersecurity policy enhancements?"
    },
    "OVERSIGHT": {
      "1": "Executive Oversight on Cybersecurity: \n\u2022 Can you describe how executive leadership is involved in the oversight of cybersecurity guidelines, processes, or policies within your school?\n\nReview and Adjustment of Cybersecurity Outcomes: \n\u2022 How does your school plan to implement oversight for reviewing and adjusting cybersecurity risk management outcomes to better meet system requirements and risks?\n\nStrategy Coverage: \n\u2022 Without current oversight, how does the school ensure the cybersecurity risk management strategy covers all necessary organizational requirements and risks?",
      "2": "Leadership Approval of Cybersecurity Measures: \n\u2022 How does executive leadership approve and oversee cybersecurity guidelines, processes, and policies? \n\u2022 Can you provide an example of this process in action?\n\nAnnual Review of Cybersecurity Documentation: \n\u2022 Can you discuss the process and frequency of reviewing, evaluating, and improving cybersecurity documentation? \n\u2022 How does the current cybersecurity documentation review process impact the risk management outcomes?\n\nAdjustment to Ensure Coverage: \n\u2022 How are cybersecurity risk management outcomes reviewed and adjusted to ensure they cover all school system requirements and risks?",
      "3": "Measurement and Review of Performance: \n\u2022 How is organizational cybersecurity risk management performance measured and reviewed? \n\u2022 Can you share how these reviews have influenced strategic direction adjustments?\n\nQuarterly Review of Documentation: \n\u2022 What prompted the decision to review, evaluate, and improve cybersecurity documentation on a quarterly basis? \n\u2022 How has this frequency impacted your cybersecurity posture?\n\nStrategic Direction Adjustments: \n\u2022 Can you provide an example of how performance reviews have led to adjustments in your cybersecurity strategic direction?",
      "4": "Adherence to Regulations: \n\u2022 How do your governance practices ensure adherence to all federal, state, and local cybersecurity regulations? \n\u2022 Can you discuss any recent adjustments made to comply with federal, state, and local cybersecurity regulations?\n\nImpact of Governance on Cybersecurity: \n\u2022 How does the current governance model impact the overall cybersecurity risk management strategy and its effectiveness?\n\nRegulatory Compliance: \n\u2022 What processes are in place to continuously monitor and ensure your cybersecurity practices comply with evolving regulations?",
      "5": "Independent Cybersecurity Reviews: \n\u2022 How does having an outside independent party conduct annual cybersecurity reviews enhance your oversight and governance practices?\n\nEffectiveness of External Reviews: \n\u2022 Can you discuss the outcomes or improvements resulting from these independent cybersecurity reviews? How have they shaped your risk management strategy?\n\nIntegration of Independent Reviews: \n\u2022 How are the findings from these independent reviews integrated into your cybersecurity risk management activities and performance evaluation?"
    },
    "CYBERSECURITY SUPPLY CHAIN RISK MANAGEMENT": {
      "1": "Supplier Risk Management Processes: \n\u2022 How does your school currently manage risks associated with suppliers and third-party partners without documented processes?\n\nInventory of Suppliers and Third Parties: \n\u2022 How are you developing a comprehensive inventory of suppliers, third-party partners, and the information systems, components, and services they provide?\n\nAd Hoc Supplier Risk Management: \n\u2022 Can you describe the challenges faced due to the ad hoc and reactive approach to managing supplier and third-party risks?",
      "2": "Development of Supplier Inventory: \n\u2022 How are you developing an inventory of suppliers and third-party partners? \n\u2022 Can you share the process and criteria for identifying and assessing supply chain risks?\n\nSystematic Evaluation of Third Parties: \n\u2022 What systematic approach are you using to evaluate third-party key processes? \n\u2022 How are you developing improvement initiatives with suppliers to ensure compliance?\n\nInitiatives for Supplier Compliance: \n\u2022 Can you discuss the initiatives being developed to improve compliance among your suppliers and third-party partners? \n\u2022 What measures are you putting in place to improve compliance among your suppliers and third-party partners?",
      "3": "Inclusion of Suppliers in Risk Management: \n\u2022 How are suppliers and third-party partners integrated into your risk management processes for information systems, components, and services?\n\nRoutine Assessment of Suppliers: \n\u2022 Can you describe how suppliers and partners are routinely assessed through audits, test results, or other evaluations to confirm they meet contractual obligations?\n\nDocumentation and Prioritization of Processes: \n\u2022 How are the processes related to suppliers and third-party partners identified, documented, prioritized, and assessed within your cybersecurity framework?",
      "4": "Routine Tests by Suppliers for Compliance: \n\u2022 How do suppliers and third-party partners conduct routine tests to evaluate compliance and the effectiveness of implementations? \n\u2022 Can you provide examples of these tests?\n\nManagement of Policies, Processes, and Controls: \n\u2022 Can you discuss how you manage the results from supplier tests to ensure all policies, processes, and controls maintain appropriate cybersecurity levels?\n\nCorrective Actions and Independent Audits: \n\u2022 How are effective corrective actions taken to address weaknesses identified in supplier and third-party evaluations? \n\u2022 Are independent audits and valid certifications required?",
      "5": "Advancement of Supply Chain Risk Processes: \n\u2022 How are supply chain risk processes advancing, optimizing, and progressing within your cybersecurity framework?\n\nAnnual Planning and Testing with Suppliers: \n\u2022 Can you discuss how response and recovery planning and testing are conducted annually with suppliers and third-party providers? \n\u2022 What improvements have been made as a result of response and recovery planning and testing with suppliers and third-party providers?\n\nContinuous Improvement Based on Evaluations: \n\u2022 How are annual planning and testing results with suppliers and third parties evaluated and used for continuous improvement in your cybersecurity supply chain risk management?"
    }
  },
  "IDENTIFY": {
    "ASSET MANAGEMENT": {
      "1": "Ad Hoc Inventory Processes: \n\u2022 Can you walk me through how you currently manage your asset inventory? \n\u2022 How frequently is this information updated, and who is responsible?\n\nProtection Controls: \n\u2022 Can you describe the current controls for protecting your assets, including data, hardware, and software? \n\u2022 Have any instances occurred where you needed to test or improve these controls?\n\nConsistency and Reactiveness: \n\u2022 How do you respond when new assets are acquired or when existing assets are retired?\n\u2022 Is there a standard process in place when new assets are acquired or when existing assets are retired, or is it more of a case-by-case basis?",
      "2": "Current and Consistent Inventory Processes:\n\u2022 How have you standardized the process of maintaining current asset inventories? \n\u2022 Can you provide examples of how the process of maintaining current asset inventories has evolved from being reactive?\n\nImprovement Initiatives: \n\u2022 What specific initiatives are currently underway to improve asset protection controls?\n\u2022 How are asset protection control improvement initiatives being prioritized and tracked for success?\n\nAsset Protection Transition: \n\u2022 Can you describe the transition from reactive to more proactive asset protection controls? \n\u2022 What challenges have you faced in transitioning from a reactive to a proactive asset protection stance, and how have you addressed them?",
      "3": "Lifecycle Documentation:\n\u2022 How do you ensure that the asset inventories reflect the entire lifecycle of each asset? \n\u2022 Can you provide examples of how you use this information to manage assets?\n\nData Classifications: \n\u2022 How are data classifications defined and maintained in compliance with state standards and regulations? \n\u2022 What processes do you have in place to ensure ongoing compliance with defined data classifications?\n\nOff-Site Asset Security: \n\u2022 What measures are in place for securing assets off-site, especially regarding software installations and asset transfers? \n\u2022 How do off-site asset security measures integrate with your overall security strategy?",
      "4": "Managed Processes and Metrics: \n\u2022 Can you describe how asset inventory processes are managed and monitored using defined metrics? \n\u2022 How do you measure effectiveness and accuracy?\n\nAsset Compliance Evaluation: \n\u2022 How often do you conduct evaluations for asset compliance, and what does this process entail? \n\u2022 Can you discuss how noncompliance issues are identified and resolved?\n\nProtection Controls Testing: \n\u2022 How are protection controls tested, and how do the results of these tests inform improvements in your asset management strategy?",
      "5": "System-Wide Integration: \n\u2022 How have you integrated inventory management with the broader system-wide objectives and risk strategy? \n\u2022 Can you give examples of how the system-wide inventory management integration has led to improvements?\n\nBest Practice Process Improvements: \n\u2022 What best practices have you implemented for managing assets more efficiently and effectively? \n\u2022 How do asset management best practices contribute to innovation within your organization?\n\nAlignment with Current and Future Needs: \n\u2022 How does your asset management approach align with both current and future organizational needs? \n\u2022 Can you describe how the alignment of your asset management approach influences decision-making and strategic planning?"
    },
    "RISK ASSESSMENT": {
      "1": "Documentation and Consistency: \n\u2022 Can you describe how risk management processes are currently documented and executed within the school? \n\u2022 How consistent are the risk management processes across different departments or areas?\n\nAwareness and Reactiveness: \n\u2022 How does the school identify and respond to cybersecurity risks and vulnerabilities? \n\u2022 Can you provide examples of recent instances where risks were managed reactively?\n\nCollaboration in Risk Management: \n\u2022 What collaborative efforts are in place for identifying and managing cybersecurity risks?\n\u2022 How do you currently engage with external information-sharing forums or sources?",
      "2": "Leadership and Cybersecurity Awareness: \n\u2022 How has the school's leadership demonstrated awareness and prioritization of cybersecurity risks? \n\u2022 What steps are you taking to move from a reactive to a proactive risk management approach?\n\nProcess Development for Risk Mitigation: \n\u2022 Can you discuss the processes being developed to identify vulnerabilities and mitigate risks? \n\u2022 How are the processes to identify vulnerabilities and mitigate risks shaping the school's approach to cybersecurity?\n\nCollaboration and Information Sharing: \n\u2022 How is the school prioritizing collaborative problem-solving and engagement with information-sharing forums? \n\u2022 Can you provide examples of how collaboration and information sharing have influenced your cybersecurity practices?",
      "3": "Integration of Processes into Operations: \n\u2022 How are processes for identifying and mitigating vulnerabilities integrated into the school's daily operations? \n\u2022 Can you give examples of how current processes for identifying and mitigating vulnerabilities affect decision-making?\n\nUse of Threat Intelligence: \n\u2022 How does the school collect and use threat intelligence from information-sharing forums and sources? \n\u2022 What impact has threat intelligence from information-sharing forums and sources had on your cybersecurity strategy?\n\nSecurity and Recovery Procedures: \n\u2022 Can you discuss the security measures in place for information-processing facilities and the processes for backup and recovery systems? \n\u2022 How often are security and recovery processes tested and evaluated?",
      "4": "Risk Management Strategy: \n\u2022 Can you describe the established risk management strategy and how it integrates improvements beyond compliance regulations? \n\u2022 How is the current risk management strategy communicated across the school?\n\nKnowledge Building and Awareness: \n\u2022 What initiatives are in place to build knowledge about the risk management process and raise awareness of necessary capabilities for effective risk assessments and management?\n\nRisk Assessment and Management Capabilities: \n\u2022 How does the school ensure it has the capabilities to conduct effective risk assessments and manage risks? \n\u2022 Can you provide examples of how risk assessment and management capabilities have been used recently?",
      "5": "Process Improvement and Optimization: \n\u2022 How does the school focus on disciplined optimization and continual process improvement in risk assessment? \n\u2022 Can you provide examples of recent process improvements and optimizations?\n\nEmployment of Cybersecurity Practitioners: \n\u2022 Can you talk about how the school employs qualified cybersecurity practitioners to assess and improve cybersecurity across the system? \n\u2022 What impact have qualified cybersecurity practitioners had on overall cybersecurity?\n\nEvaluation Cycle of Improvement:\n\u2022 How is the fact-based evaluation cycle of improvement optimized within the school's cybersecurity strategy? \n\u2022 Can you describe how the fact-based evaluation cycle of improvement influences decision-making and strategic planning?"
    },
    "IMPROVEMENT": {
      "1": "Reactive Improvement Efforts: \n\u2022 Can you describe any recent situations where you had to react to cybersecurity issues? \n\u2022 How did you address recent situations resulting in a reactive approach to cybersecurity issues, and what was the outcome?\n\nCapacity for Detection, Response, and Recovery: \n\u2022 What resources or systems do you currently have for detecting, responding to, and recovering from cybersecurity incidents? \n\u2022 How effective have detection, response, and recovery resources or systems been in past incidents?\n\nRecovery Planning and Coordination: \n\u2022 How do you plan and coordinate recovery efforts after a cybersecurity incident? \n\u2022 Can you provide an example of where the cybersecurity incident recovery process was challenged?",
      "2": "Transition to Proactive Improvement: \n\u2022 What steps are you taking to move from a reactive to a more proactive approach in managing cybersecurity risks and improvements?\n\nLeadership and Budget Allocation: \n\u2022 How has leadership demonstrated their commitment to cybersecurity improvement? \n\u2022 Can you discuss how budgets are being allocated toward cybersecurity improvement efforts?\n\nAligning Architecture and Strategic Roadmap: \n\u2022 How are you aligning your school system's enterprise architecture and strategic roadmap to enhance your cybersecurity recovery plan?",
      "3": "Analysis of Recovery Actions:\n\u2022 Can you describe how incidents and the actions taken for business continuity are analyzed for improvement? \n\u2022 How are business continuity insights incorporated into planning?\n\nLessons Learned and Continuous Improvement: \n\u2022 How do you capture and apply lessons learned from cybersecurity incidents to improve your processes and response strategies?\n\nUpdating Strategies with Lessons Learned: \n\u2022 In what ways have your response and recovery strategies been updated based on retrospective lessons-learned sessions?",
      "4": "Value of Pristine Response and Recovery Plan:\n\u2022 How do stakeholders recognize the value of managing and continuously improving the response and recovery plan?\n\nEvaluating Incident Response Performance: \n\u2022 How do you evaluate the performance of your incident response? \n\u2022 Can you share how identified incident response challenges have led to improvements in your strategic plans?\n\nImprovements from Lessons Learned:\n\u2022 How have lessons learned and continuous improvement efforts resulted in a stronger cybersecurity posture and readiness for future incidents?",
      "5": "Continuous Evaluation and Improvement of\nProcesses:\n\u2022 Can you explain how you continuously evaluate and improve your response and recovery processes? \n\u2022 What metrics do you use to drive response and recovery process improvements?\n\nUse of Advanced Technology Solutions: \n\u2022 How do you incorporate advanced technology solutions in your incident recovery phases? \n\u2022 Can you provide examples of how advanced technology has enhanced your incident recovery capabilities?\n\nImproving Cybersecurity Maturity and Resilience: \n\u2022 In what ways has your approach to incident response, business continuity, and disaster recovery planning initiatives led to an improvement in overall cybersecurity maturity and system resilience?"
    }
  },
  "PROTECT": {
    "IDENTITY MANAGEMENT, AUTHENTICATION, AND ACCESS CONTROL": {
      "1": "Establishment of Access Control Protocols: \n\u2022 Can you describe how your school manages physical and remote access control without established and documented processes?\n\nImplementation of Multi-Factor Authentication: \n\u2022 What measures are in place for user authentication, especially considering multi-factor authentication has not been implemented?\n\nData Protection and Network Integrity: \n\u2022 How does your school approach data protection and network integrity without defined processes? \n\u2022 Can you provide examples of how you handle inconsistent data protection measures?",
      "2": "Documentation and Management of Access Controls: \n\u2022 Can you discuss the access control processes and protocols documented for physical and remote access? \n\u2022 How are access control processes managed?\n\nUse of Multi-Factor Authentication:\n\u2022 You've documented at least one multi-factor authentication method. How was this method chosen, and how is it implemented across the school?\n\nDefinition and Enforcement of Account Review Processes: \n\u2022 How are account review processes defined for user, supplier, and system accounts? \n\u2022 Can you explain the challenges in routinely enforcing account review processes?",
      "3": "Maintenance of Compliant Data Protection Measures: \n\u2022 How do you ensure your data protection measures remain compliant?\n\u2022 Can you provide an example of how data protection measures are maintained?\n\nRoutine Enforcement of Network Integrity Processes: \n\u2022 How do you routinely enforce network integrity processes, protections, and controls? \n\u2022 How do network integrity processes contribute to overall cybersecurity?\n\nManagement of Account Reviews and Role Memberships: \n\u2022 How are account review processes conducted routinely? \n\u2022 Can you discuss how account managers are assigned and how group and role membership conditions are met?",
      "4": "Systematic Access Control Measures: \n\u2022 How are access control processes, protocols, and protection measures systematically deployed and managed within your school?\n\nEvaluation of Multi-Factor Authentication Efficacy: \n\u2022 How do you routinely evaluate the efficacy of multi-factor authentication methods? \n\u2022 Can you share insights from recent multi-factor authentication efficacy evaluations?\n\nCompliance Evaluation in Network Integrity and Account Reviews: \n\u2022 How are network integrity and account review processes evaluated for compliance with state and federal regulations? \n\u2022 What do network integrity and account review evaluation processes entail?",
      "5": "Risk Mitigation Decisions: \n\u2022 How are data-driven decisions made to mitigate and avert risks in alignment with best practices? \n\u2022 Can you provide an example of a data-driven decision-making process?\n\nCybersecurity Awareness and Training Deployment: \n\u2022 How is the overall approach to cybersecurity awareness, training, and implementation fully deployed within your school? \n\u2022 Can you describe how you ensure there are no significant weaknesses or gaps in cybersecurity awareness, training, and implementation?\n\nContinuous Improvement in Cybersecurity Measures: \n\u2022 How do you ensure continuous improvement in your cybersecurity measures to stay aligned with best practices and mitigate risks effectively?"
    },
    "AWARENESS AND TRAINING": {
      "1": "Cybersecurity Training Processes: \n\u2022 How do you currently address cybersecurity awareness and training for staff and students? \n\u2022 What challenges have you faced due to the lack of documented and consistent processes?\n\nMandatory Training for Users: \n\u2022 How is cybersecurity awareness training handled for new and existing users in the absence of a mandatory or scheduled program?\n\nRole-Based Security Training: \n\u2022 What measures are in place for providing specific role-based security training to designated personnel, and how do you manage without consistent implementation?",
      "2": "Development of Training Processes: \n\u2022 What steps are you taking to develop processes ensuring all staff and students receive adequate cybersecurity training?\n\nImprovements in Cybersecurity Training: \n\u2022 Can you discuss the initiatives being developed to improve cybersecurity awareness training? \n\u2022 How are specific role-based training needs being addressed?\n\nDocumentation and Records Retention: \n\u2022 Who is responsible for documenting and monitoring information system security training activities? \n\u2022 How is the records retention policy defined and implemented?",
      "3": "Role-Based Security Training Provision: \n\u2022 How is role-based security training provided before personnel are authorized to access the information system or to perform their duties?\n\nActivity Documentation and Monitoring: \n\u2022 Can you describe how personnel actively document and monitor information system security training activities? \n\u2022 How are training records managed according to the retention policy?\n\nPre-authorization Training Requirements: \n\u2022 How do you ensure individuals receive necessary role-based security training before they are given authorized access or assigned duties?",
      "4": "Training Campaigns and Simulated Attacks: \n\u2022 Can you share how you integrate regular cybersecurity alerts, training campaigns, and simulated attacks into your awareness programs? \n\u2022 How is progress tracked and updated?\n\nLeadership Involvement in Training Monitoring: \n\u2022 How is leadership involved in continuously monitoring and improving the cybersecurity training process?\n\nEnforcement of Training Adherence: \n\u2022 How do designated staff monitor, measure, and enforce adherence to the cybersecurity training program? \n\u2022 Can you provide an example of how staff monitor, measure, and enforce adherence to the cybersecurity training program?",
      "5": "Continuous Improvement in Training Methods: \n\u2022 How are cybersecurity awareness and training methods optimized for continually improving performance? \n\u2022 Can you discuss the incremental and innovative optimizations you're making?\n\nMetrics for Training Performance: \n\u2022 What metrics do you have to measure the effectiveness of training performance objectives? \n\u2022 How are training effectiveness metrics used to drive improvements?\n\nLeadership's Role in Training Initiatives: \n\u2022 Can you explain how leadership is instrumental in designing, implementing, revising, and monitoring training initiatives and progress? \n\u2022 How does leadership involvement impact the effectiveness of your cybersecurity training program?"
    },
    "DATA SECURITY": {
      "1": "Data Management Processes: \n\u2022 Can you describe your current processes for managing and protecting stored and transmitted data? \n\u2022 What challenges have you encountered due to the lack of documented or consistent data protection practices?\n\nUnderstanding of Data Protection and Risk Management: \n\u2022 How does leadership currently understand and approach data protection and risk management? \n\u2022 Can you provide examples of how leadership's understanding of data protection and risk management impacts data security measures?\n\nPolicies for Data Confidentiality, Integrity, and Availability: \n\u2022 Without established processes and policies, how do you ensure the confidentiality, integrity, and availability of information and records?",
      "2": "Consistent Management and Monitoring: \n\u2022 How are stored and transmitted data managed and monitored consistently in your organization? \n\u2022 What processes have you defined and implemented for managing and monitoring stored and transmitted data?\n\nDevelopment of Formal Process Definitions: \n\u2022 What steps are you taking to develop and document formal process definitions and protocols for managing and monitoring data?\n\nLeadership's Understanding of Data Protection: \n\u2022 How has leadership demonstrated a sufficient understanding of data protection and risk management? \n\u2022 Can you give an example of how leadership's understanding of data protection and risk management has influenced data security practices?",
      "3": "Enforcement of Data Management Processes: \n\u2022 How do you ensure the routine enforcement of data management and protection processes? \n\u2022 Can you discuss any mitigating controls or innovative technologies you've implemented to enforce data management and protection processes?\n\nManagement of Data Records: \n\u2022 How are data records formally managed, and how do they align with your risk management strategies?\n\nMonitoring and Investigation by Dedicated Staff: \n\u2022 Can you describe how dedicated technology staff monitor and investigate alerts related to data security? \n\u2022 How are exceptions for non-encryption evaluated?",
      "4": "Beyond Compliance Risk Evaluation: \n\u2022 How do your risk evaluation processes and measures extend beyond compliance requirements? \n\u2022 Can you provide examples of identifying, analyzing, and controlling risks?\n\nImprovements Driven by Evaluation Results: \n\u2022 How are results from your evaluation and monitoring processes used to drive improvements in data security?\n\nTechnology Staff Skills and Knowledge: \n\u2022 Can you speak to the skill level and knowledge your technology staff demonstrates in managing and monitoring stored and transmitted data? \n\u2022 How does your technology staff's expertise contribute to your data security strategies?",
      "5": "Use of State-of-the-Art Data Security Solutions:\n\u2022 How do state-of-the-art data security solutions enhance visibility into system vulnerabilities within your organization? \n\u2022 Can you provide examples of your organization's state-of-the-art data security solutions in action?\n\nAdaptation of Cybersecurity Controls: \n\u2022 How are cybersecurity controls adapted to meet the challenges of a dynamic IT security environment? \n\u2022 Can you discuss the innovative integrity-checking mechanisms you use?\n\nProactive Risk Assessment and Mitigation: \n\u2022 How does your technology staff demonstrate consistent ownership of proactive risk assessment and mitigation measures? \n\u2022 Can you share how your technology staff's proactive risk assessment and mitigation efforts have improved your organization's data security posture?"
    },
    "PLATFORM SECURITY": {
      "1": "System Maintenance and Repair Processes: \n\u2022 Can you describe how your school currently approaches maintaining and repairing information systems and applications without established processes? \n\u2022 How do you address information and application issues when they arise?\n\nControl of Maintenance Systems and Tools: \n\u2022 What challenges have you faced due to the lack of control over maintenance systems and tools? \n\u2022 How are maintenance activities typically handled?\n\nSecurity Controls and Maintenance Records: \n\u2022 How do you ensure the functionality of systems after maintenance activities, given that security controls lack definition? \n\u2022 Can you discuss how maintenance records are kept?",
      "2": "Consistency in Maintenance Systems: \n\u2022 How are systems and tools for maintaining and repairing information systems and applications implemented consistently across the school? \n\u2022 Can you provide examples of how system and application maintenance and repair are handled?\n\nMaintenance Activity Documentation: \n\u2022 What process do you have to keep consistent maintenance activity records? \n\u2022 How have security controls been identified and documented?\n\nDefinition of Proactive Maintenance Activities: \n\u2022 Can you describe the steps to formally define and document proactive and preventative maintenance activities?",
      "3": "Documented Maintenance Processes: \n\u2022 How are documented processes for maintaining and repairing information systems and applications executed according to vendor specifications? \n\u2022 Can you describe the approval and monitoring process for maintaining and repairing information systems and applications according to vendor specifications?\n\nPost-maintenance Security Testing: \n\u2022 Can you explain how you routinely test post-maintenance security controls? \n\u2022 What procedures are in place for remote maintenance?\n\nMaintenance Records Management: \n\u2022 How are detailed records of maintenance activities logged and retained? \n\u2022 What impact has documentation related to maintenance activities had on your platform security?",
      "4": "Maintenance Management: \n\u2022 How are maintaining organizational information systems and applications managed to ensure protection? \n\u2022 Can you describe how regular maintenance is verified?\n\nMonitoring and Adherence to Maintenance Requirements: \n\u2022 How do designated staff monitor, measure, and enforce adherence to maintenance requirements? \n\u2022 What processes are in place for refresh cycles?\n\nLeadership and Resource Allocation: \n\u2022 How does the leadership ensure flexibility in the chain of command to provide resources for maintaining platform security, especially if there's a risk of noncompliance?",
      "5": "Proactive Life Cycle Maintenance: \n\u2022 Can you discuss how you maintain information systems and applications within a proactive life cycle? \n\u2022 What continuous improvement measures are in place for proactive information system and application maintenance?\n\nChange Management and Strategic Planning: \n\u2022 How is change management strategically planned and prioritized to enhance platform security? \n\u2022 Can you provide an example of how change management planning has improved efficiency?\n\nTraining and Proactive System Maintenance: \n\u2022 How are designated technology staff trained in cybersecurity to prioritize routine, proactive system maintenance? \n\u2022 Can you share how your organization's technology staff training approach meets and exceeds security objectives?"
    },
    "TECHNOLOGY INFRASTRUCTURE RESILIENCE": {
      "1": "Device Protection Processes: \n\u2022 Can you describe how your school protects student and staff devices without established processes? \n\u2022 What challenges have you encountered due to a lack of processes for protecting student and staff devices?\n\nSecurity Updates Management: \n\u2022 How is the scheduling and implementation of security updates handled, given their current status of needing to be conducted promptly?\n\nRemovable Media and Network Protection: \n\u2022 What steps are you taking to address the need for additional protection measures for removable media and network infrastructure components?",
      "2": "Definition of Protection Processes: \n\u2022 How are you defining processes to protect student and staff devices? \n\u2022 Can you share how advanced protective technologies are being researched and identified?\n\nResource Allocation for Security: \n\u2022 What resources and budgets are allocated to maintain protection measures and conduct security updates? \n\u2022 How are IT staff designated for tasks related to protecting devices and conducting security updates?\n\nDetermining Protection Measures: \n\u2022 Can you discuss the steps being taken to determine protection measures for removable media and network infrastructure components?",
      "3": "Implementation of Device Protection: \n\u2022 How have you documented and implemented processes to protect devices? \n\u2022 What advanced protective technologies have been put in place?\n\nManagement of Security Updates and Audit Logs: \n\u2022 Can you describe how timely installation of security updates is applied and how you manage the audit log records?\n\nProtection of Removable Media and Networks: \n\u2022 How is removable media protected, and how is its use restricted? \n\u2022 What measures are in place to protect communications and control networks?",
      "4": "Protective Technology Deployment: \n\u2022 How is protective technology implemented across your school's infrastructure to ensure there are no significant gaps? \n\u2022 Can you share how best practices drive your cybersecurity sustainability?\n\nHandling of Advanced Persistent Threats: \n\u2022 How are enhanced practices reviewed and evaluated to protect against changing tactics, techniques, and vulnerabilities of advanced persistent threats?\n\nNetwork Monitoring and Automated Checks: \n\u2022 Can you explain the routine monitoring of communications and control networks and the use of automated checks to avert cyber-attacks?",
      "5": "Measurement of Protective Technologies: \n\u2022 How are the effects of deployed protective technologies measured using key indicators, and how do these measurements guide improvement activities?\n\nStandardization and Sophisticated Technologies: \n\u2022 Can you discuss how protective technologies are standardized across the organization and enhanced with sophisticated technologies to detect and respond to advanced threats?\n\nEnsuring System Availability and Cyber Protection: \n\u2022 How do protective technologies, aided by automated checks, ensure system availability and cyber protection is sustained at 100%? \n\u2022 Can you provide examples of your organization's protective technologies in action?"
    }
  },
  "DETECT": {
    "CONTINUOUS MONITORING": {
      "1": "Asset Management Practices:\n\u2022 How does your school manage and monitor its digital and physical assets? \n\u2022 What challenges have you faced in detecting, removing, or remediating unauthorized and unmanaged assets?\n\nConsistency in Security Reviews:\n\u2022 How often do you conduct reviews of accounts, firewall rules, and penetration tests of external-facing systems? \n\u2022 Can you provide examples of how your organization's security review practices might be inconsistent or reactive?\n\nExternal Vulnerability Scans: \n\u2022 Are external vulnerability scans part of your current cybersecurity practices? \n\u2022 If so, how frequently are they conducted, and what has been the outcome?",
      "2": "Documentation of Asset Management Processes: \n\u2022 Can you discuss the documented processes you have for managing assets? \n\u2022 How are you moving from reactive measures to more systematic approaches?\n\nImprovement of Key Processes: \n\u2022 What steps are you taking to evaluate and improve key processes for detecting and managing unauthorized and unmanaged assets?\n\nDevelopment of Vulnerability Scan Schedules: \n\u2022 How are schedules for regular external vulnerability scans being developed and implemented? \n\u2022 What prompted the development of your organization's vulnerability scan schedules?",
      "3": "Routine Asset Management Implementation: \n\u2022 How are processes for managing assets and remediating unauthorized ones routinely implemented within your school? \n\u2022 Can you provide examples of asset management and remediation processes in action?\n\nRegular Security Assessments: \n\u2022 Can you explain how you conduct quarterly vulnerability scans and annual penetration tests? \n\u2022 How have scheduled security assessments impacted your cybersecurity posture?\n\nSystematic Account Reviews: \n\u2022 How are systematic account reviews performed, and how do they contribute to your overall security strategy?",
      "4": "Integration of Continuous Monitoring: \n\u2022 How is continuous monitoring integrated into your daily operations? \n\u2022 Can you describe the technologies and methods you use for real-time threat detection?\n\nMonitoring and Analysis for Security: \n\u2022 How do you prioritize the monitored performance of critical security processes? \n\u2022 Can you share how forensics, root cause analysis, and threat intelligence contribute to your incident response?\n\nCorrective Actions for Weaknesses: \n\u2022 When weaknesses or vulnerabilities are identified, what process do you follow to take effective corrective actions? \n\u2022 Can you provide an example of a recent improvement based on this process?",
      "5": "Effectiveness of Proactive Security Measures: \n\u2022 How do you use data from continuous security monitoring to verify the effectiveness of your proactive measures? \n\u2022 Can you discuss how security monitoring optimization has improved your threat detection capabilities?\n\nGap Analysis for Vulnerability Identification: \n\u2022 How are gap analyses conducted to identify vulnerabilities? \n\u2022 Can you share how gap analyses have led\u2014and continue to lead\u2014to the development of failsafe measures and process improvements?\n\nReal-time Threat Detection and Mitigation: \n\u2022 How has optimized real-time threat detection aided in timely mitigation and reduced risk? \n\u2022 Can you provide examples of how your cybersecurity maturity has improved through real-time threat detection processes?"
    },
    "ADVERSE EVENT ANALYSIS": {
      "1": "Event Data Analysis Processes: \n\u2022 Can you describe how your school currently handles collecting, reviewing, and correlating event data following a cybersecurity attack? \n\u2022 What challenges have you encountered due to the lack of documented processes?\n\nBaseline Network Operations: \n\u2022 How do you manage and understand network operations and expected data flows without a baseline? \n\u2022 What impact has the lack of baseline network operations had on your ability to detect anomalies?\n\nTechnology Staff Assignment: \n\u2022 What has been your approach to assigning technology staff to analyze the impact of events? \n\u2022 How do you cope with the lack of capacity to detect anomalies effectively?",
      "2": "Detection of Anomalous Activity: \n\u2022 How consistently is anomalous activity detected within your network?\n\u2022 Can you share how you are transitioning from a reactive to a more proactive approach to detecting anomalous network activity?\n\nDevelopment of Event Data Processes: \n\u2022 What steps are you taking to develop processes for collecting, reviewing, and correlating event data from cybersecurity attacks? \n\u2022 How are improvement initiatives being prioritized for collecting, reviewing, and correlating event data from cybersecurity attacks?\n\nSkill Development in Staff: \n\u2022 How are staff developing their skills in pattern recognition and understanding attack targets and methods?\n\u2022 What training or resources are being provided to help staff develop their skills in pattern recognition and understanding attack targets and methods?",
      "3": "Documentation of Processes: \n\u2022 Can you discuss the documented processes for collecting, reviewing, and correlating event data from multiple sources? \n\u2022 How do processes for collecting, reviewing, and correlating event data from multiple sources improve your response to cybersecurity incidents?\n\nBaseline Establishment: \n\u2022 How have you established and managed a baseline of network operations and expected data flows? \n\u2022 What benefits has establishing and maintaining a baseline of network operations and expected data flows brought to your cybersecurity efforts?\n\nEvidence Collection and Analysis: \n\u2022 Can you explain your evidence collection and forensic procedures? \n\u2022 How do designated technology staff routinely analyze the impact of detected anomalies?",
      "4": "Use of Rigorous Analytics: \n\u2022 How are rigorous analytics from anomalies and trends used in your school\u2019s applications, systems, and databases? \n\u2022 Can you provide an example of how analyzing anomalies and trends used in your school's applications, systems, and databases has identified underlying causes for vulnerabilities?\n\nFormal Analysis of IT Activity Patterns: \n\u2022 How is a formal analysis conducted on patterns of IT activities outside of expected behavior? \n\u2022 What has been learned from analyses of anomalous IT activity patterns?\n\nVulnerability Identification Tracking: \n\u2022 Can you discuss how issues related to vulnerability identification are tracked and reported? \n\u2022 How do vulnerability identification processes inform your cybersecurity strategy?",
      "5": "Advanced Processes for Anomaly Detection: \n\u2022 How do advanced processes help you identify and detect anomalies and events to trigger rapid responses? \n\u2022 Can you share a recent example of when implementing processes for identifying and detecting anomalies was particularly effective?\n\nIntegration of Cybersecurity Technologies: \n\u2022 How are cybersecurity technologies based on threat intelligence and data analytics used to distinguish normal from abnormal activity? \n\u2022 How has the integration of cybersecurity technologies affected your ability to proactively detect unauthorized access or suspicious behavior?\n\nReal-Time Alert Technologies: \n\u2022 Can you describe the proactive technologies in place that alert to unauthorized access or suspicious behavior in real time? \n\u2022 How have alert technologies enhanced your cybersecurity posture?"
    }
  },
  "RESPOND": {
    "INCIDENT MANAGEMENT": {
      "1": "Incident Response Plan Status: \n\u2022 Can you describe the current status of your cybersecurity incident response plan? \n\u2022 How does the school handle incidents without a formal plan?\n\nStaff Responsibilities and Training: \n\u2022 Who is responsible for responding to cybersecurity incidents in your school, and what training have they received to manage these situations effectively?\n\nProcess and Procedure Development: \n\u2022 What steps are you taking to develop and implement an approved process for managing cybersecurity incidents? \n\u2022 How are priorities set without designated staff or a formal plan to manage cybersecurity incidents?",
      "2": "Documentation and Improvement Priorities: \n\u2022 Could you walk me through your documented incident response plan?\n\u2022 How are improvements to the documented incident response plan prioritized in your strategic planning?\n\nStaff Designation and Training: \n\u2022 Who has been designated to handle cybersecurity incidents, and what training do they undergo to prepare for this responsibility?\n\nSystematic Approach to Evaluation: \n\u2022 What beginnings of a systematic approach do you have in place for evaluating and improving key processes within your incident management strategy?",
      "3": "Plan Documentation and Review: \n\u2022 How comprehensive is your cybersecurity incident response plan, and can you discuss the annual review process? \n\u2022 How are staff involved in the annual review process for the incident response plan?\n\nScenario-based Plan Testing:\n\u2022 Could you provide examples of in-house and third-party scenario-based tests conducted? \n\u2022 How are in-house and third-party scenario-based test results used to improve your response plan?\n\nStaff Participation in Development:\n\u2022 How do designated staff participate in developing and implementing your incident response practices? \n\u2022 Can you describe the impact of the involvement of designated staff in developing and implementing your incident response practices?",
      "4": "Use of Cyber Event Playbook:\n\u2022 How does your customized, scenario-based cyber event playbook contribute to measuring and evaluating risk? \n\u2022 Can you share insights from recent scenario-based cyber event exercises?\n\nIncorporation of Business Continuity: \n\u2022 How have business continuity, resilience, and agility been prioritized and incorporated into your scenario planning?\n\nFindings and Action Plans: \n\u2022 Can you discuss how you use practice scenario findings to strengthen recovery plans and generate actionable improvements?",
      "5": "Reflective and Flexible Planning: \n\u2022 How is the reflective and flexible response planning process integrated into your organizational culture? \n\u2022 Can you provide examples of how the reflective and flexible response planning process has evolved?\n\nContinuous Improvement and Feedback: \n\u2022 How do you incorporate continuous improvement into your incident management process, and how are results from feedback used to drive change?\n\nLessons Learned Initiatives: \n\u2022 Can you describe the lessons learned initiatives that have resulted from your incident management practices?\n\u2022 How have lessons learned initiatives impacted your overall cybersecurity posture?"
    },
    "INCIDENT ANALYSIS": {
      "1": "Incident Analysis Processes: \n\u2022 Can you describe how your school currently approaches incident analysis? \n\u2022 How do you ensure effective response and support recovery activities without consistent incident analysis processes?\n\nAd Hoc Responses: \n\u2022 In recent incidents, how have you managed to conduct investigations and support recovery efforts on an ad hoc basis? \n\u2022 Can you provide an example of how you investigated and responded to a recent cybersecurity incident?\n\nConsistency and Reactivity:\n\u2022 How do you identify the need to improve your incident analysis and recovery activities? \n\u2022 What challenges have you faced in improving your incident analysis and recovery activities due to the lack of consistent processes?",
      "2": "Cross-Functional Examination:\n\u2022 How does your cross-functional process work for examining incidents? \n\u2022 What cross-functionality process improvements are you currently prioritizing?\n\nSystematic Response Development: \n\u2022 Can you share how your school is developing systematic responses and support for recovery activities? \n\u2022 What role does proactive evaluation play in the process of developing systematic responses and support for recovery activities?\n\nTransition to Prioritized Improvement:\n\u2022 How are you transitioning to a more proactive evaluation and improvement of key processes in incident analysis and recovery? \n\u2022 Can you give an example of a recent shift from a reactive to a more proactive approach to incident analysis and recovery?",
      "3": "Consistent Analysis and Categorization: \n\u2022 How do you ensure incidents are analyzed and categorized consistently? \n\u2022 Can you discuss how compliance with regulations impacts your response plans?\n\nSystematic Evaluation of Findings: \n\u2022 How are analysis findings and results systematically evaluated in your school?\n\u2022 Can you provide an example of how systematic evaluation of findings has influenced your response to an incident?\n\nThird-party Analysis Contribution:\n\u2022 What role does third-party analysis play in your incident investigation process?\n\u2022 How does external analysis contribute to your overall incident management strategy?",
      "4": "Cultural Embedment of Response Analysis: \n\u2022 How is response analysis culturally embedded within your school? \n\u2022 Can you describe how embedded response analysis influences your incident management processes' design, implementation, and evaluation?\n\nSubprocess Level Management: \n\u2022 How do you manage detailed analysis at the subprocess level to understand causation and correlation?\n\u2022 Can you share how detailed subprocess analysis has helped mitigate risks?\n\nAnalysis-driven Process Identification: \n\u2022 How does your analysis drive the identification of processes and inventories for effectively mitigating risks and determining response levels? \n\u2022 Can you provide an example of an improvement made based on analysis-driven process identification?",
      "5": "Broad Incident Analysis for Improvement:\n\u2022 How does broad incident analysis help you identify shortfalls and performance gaps? \n\u2022 Can you discuss how broad incident analysis leads to process improvement?\n\nIT Staff's Role in Cybersecurity Landscape Analysis: \n\u2022 Can you describe how your IT staff measures and assesses the full cybersecurity landscape? \n\u2022 How does your IT staff identify possible issues and improvement opportunities?\n\nContinuous Improvement Process: \n\u2022 How is the continuous improvement process integrated into your incident analysis and recovery strategies? \n\u2022 Can you provide an example of a recent continuous improvement initiative?"
    },
    "INCIDENT RESPONSE REPORTING AND COMMUNICATION": {
      "1": "Orderly Response Activities: \n\u2022 Can you describe how your school currently coordinates response activities following an incident? \n\u2022 How do you decide when and how to report incidents internally or externally?\n\nIncident Reporting Criteria: \n\u2022 What criteria do you currently use for reporting cybersecurity incidents? \n\u2022 How has your current approach to reporting cybersecurity incidents approach affected your ability to respond effectively?\n\nCommunication Processes: \n\u2022 How are communication processes for incident reporting structured within your school? \n\u2022 Can you provide an example of a challenge you've faced due to unclear communication processes?",
      "2": "Development of Response Activities: \n\u2022 How are you developing processes for defining orderly response activities? \n\u2022 What steps have you taken to improve coordination with internal and external stakeholders?\n\nCriteria Determination for Incident Reporting: \n\u2022 How does your school determine consistent criteria for incident reporting? \n\u2022 Can you share how developing and implementing consistent incident reporting criteria has changed from a primarily reactive approach?\n\nSystematic Evaluation and Improvement: \n\u2022 What approach are you taking to systematically evaluate and improve key incident response reporting and communication processes?",
      "3": "Orderly Response Processes: \n\u2022 How have you defined and shared processes to ensure orderly response activities? \n\u2022 Can you give an example of how implementing processes to ensure orderly response activities has streamlined coordination with stakeholders?\n\nInformation Sharing: \n\u2022 How do you ensure transparent situational awareness by sharing information with leadership and internal and external stakeholders?\n\nStakeholder Coordination: \n\u2022 Can you discuss how your coordination with stakeholders aligns with your response plans? \n\u2022 How has coordination with stakeholders improved your incident response outcomes?",
      "4": "Cybersecurity Incident Communication Plan: \n\u2022 Can you explain how your cybersecurity incident communication plan is documented and managed? \n\u2022 How are incident responsibilities assigned?\n\nSuccess Measurement of Communications: \n\u2022 What criteria do you use to measure communication success following an incident? \n\u2022 How often do you evaluate processes for post-incident communication?\n\nImprovement Initiatives: \n\u2022 How do evaluation results inform your incident response reporting and communication improvement initiatives? \n\u2022 Can you share an example of an incident response communication improvement made recently?",
      "5": "Collaboration with External Groups: \n\u2022 How does collaboration with external cybersecurity experts, privacy groups, and solution providers optimize your communications? \n\u2022 Can you provide an example of how external insights have improved your response activities?\n\nSharing with External Sources: \n\u2022 How do you manage cybersecurity alerts and recommendations with external sources? \n\u2022 How has information sharing with external sources influenced your incident response strategies?\n\nOptimization of Response Activities: \n\u2022 Can you describe how you've optimized response activities using best practices, innovative processes, and technological aids? \n\u2022 How have response activity improvements and optimizations affected your overall cybersecurity posture?"
    },
    "INCIDENT MITIGATION": {
      "1": "Systematic Approach to Incident Expansion Prevention: \n\u2022 Can you describe how your school attempts to prevent the expansion of cybersecurity incidents? \n\u2022 What challenges have you faced without a systematic approach to preventing incident expansion?\n\nMitigation and Eradication Practices:\n\u2022 How do you currently approach the mitigation and eradication of incidents? \n\u2022 Are there any specific processes or technologies you use to mitigate and eradicate incidents, or is the approach more ad hoc?\n\nConsistency and Reactivity in Practices: \n\u2022 In what ways are your current practices for dealing with incidents inconsistent or reactive? \n\u2022 Can you provide an example of how inconsistent or reactive approaches to cybersecurity incidents have affected incident management?",
      "2": "Definition of Processes: \n\u2022 What processes have you defined for preventing the expansion of an event and mitigating its effects? \n\u2022 How did you arrive at your current processes for preventing incident expansion and mitigating the effects?\n\nConsistency in Cyber Defense: \n\u2022 Can you discuss how your approach to cyber defense has become more consistent? \n\u2022 What specific collaborative problem-solving techniques have you used to ensure cyber defense is more consistent?\n\nEvent Expansion Prevention: \n\u2022 How do you collaborate internally or externally to prevent the expansion of cybersecurity events? \n\u2022 Can you provide an example of a recent cybersecurity incident and how it was managed to ensure it was contained?",
      "3": "Routine Prevention Activities: \n\u2022 What activities do you routinely perform to prevent the expansion of incidents? \n\u2022 How are routine incident containment activities integrated into your incident response plan?\n\nContainment and Mitigation Practices: \n\u2022 How are incidents contained and their effects mitigated with the help of available processes and technologies? \n\u2022 Can you walk me through a recent example of when processes and technologies were put in place to contain an incident?\n\nVulnerability Mitigation Documentation: \n\u2022 How are identified vulnerabilities managed? \n\u2022 Are vulnerabilities mitigated immediately or documented as accepted risks, and under what criteria?",
      "4": "Sophisticated Response Mitigation: \n\u2022 How do you manage sophisticated response mitigation during cybersecurity incidents? \n\u2022 What best practices, tools, and techniques do you use for response mitigation?\n\nIsolation and Blocking of Threats: \n\u2022 Can you describe how you use effective near-real-time mitigation strategies to isolate and block threats?\n\nUniversal Deployment of Processes: \n\u2022 How are processes universally deployed and maintained to manage mitigation and generate data? \n\u2022 How does data from response mitigation processes inform future incident response strategies?",
      "5": "Proactive Improvement of Mitigation Activities: \n\u2022 How are your school's risk mitigation activities and technical mechanisms proactively and interactively improved?\n\nLeadership and Resource Allocation: \n\u2022 How does leadership demonstrate understanding and commitment to building resilience? \n\u2022 Can you give an example of resources being allocated to address capability gaps?\n\nCataloging Vulnerabilities and Establishing Best Practices: \n\u2022 How are vulnerabilities cataloged and best practices collaboratively established? \n\u2022 How do current processes for cataloging vulnerabilities and collaboratively developing best practices contribute to your school's overall cybersecurity posture?"
    }
  },
  "RECOVER": {
    "INCIDENT RECOVERY PLAN EXECUTION": {
      "1": "Existence and Quality of Incident Plans: \n\u2022 Can you describe the current state of your incident response plan, particularly regarding recovery actions for educational continuity? \n\u2022 How does your current incident response plan align with your strategic roadmap and cybersecurity objectives?\n\nDetermination of Recovery Action Steps: \n\u2022 How do you determine the steps for recovery action in a cybersecurity incident? \n\u2022 Are recovery action steps documented or communicated within the school?\n\nAlignment with Objectives: \n\u2022 How have you managed recovery without a formal plan in cybersecurity incidents? \n\u2022 How do your current incident recovery approaches align with your school's broader objectives?",
      "2": "Documentation and Detailing of Incident Plans: \n\u2022 Can you walk me through your documented incident plan, especially the recovery action steps? \n\u2022 How are roles and responsibilities defined within the current documented incident recovery plan?\n\nExecution of the Plan: \n\u2022 How is your plan executed during and after cyber incidents? \n\u2022 Can you provide an example of a past incident and how the documented plan facilitated recovery?\n\nClarity of Restoration Procedures: \n\u2022 Can you explain the restoration procedures outlined in your recovery action steps? \n\u2022 How do the restoration procedures outlined in your documented recovery action steps ensure the continuity of educational services?",
      "3": "Asset Protection and Normal Operations: \n\u2022 How do your recovery plans address asset protection and its impact on everyday operations? \n\u2022 Can you share evidence or examples of executed recovery plans in actual incidents?\n\nDocumentation of Recovery Efforts: \n\u2022 How are your recovery efforts, including asset protection and direct and indirect processes affecting normal operations, documented and evaluated following an incident?\n\nExecution Evidence: \n\u2022 Can you provide instances of executed recovery plans during or after cyber events? \n\u2022 How were recovery actions documented and assessed for effectiveness?",
      "4": "Management and Success of Incident Plans: \n\u2022 How do you manage and assess the success of your incident plans, especially regarding pre-incident asset protection and recovery processes?\n\nBusiness Continuity Testing: \n\u2022 Can you describe how you test business continuity within your school?\n\u2022 How do leadership and IT teams review and improve recovery processes based on business continuity tests?\n\nGap Analysis and Improvement Plans: \n\u2022 How do you conduct gap analyses of your recovery processes, and how are identified weaknesses translated into actionable improvement plans?",
      "5": "Integration and Innovation in Recovery Planning: \n\u2022 How are your incident plans integrated into daily decision-making? \n\u2022 Can you provide examples of how you've optimized recovery planning using innovative techniques?\n\nPost-Recovery Improvements: \n\u2022 How do you address lessons learned post-recovery, and what improvements have you made to the recovery plan based on these insights?\n\nLeadership and Strategic Evolution: \n\u2022 How is leadership committed to evolving strategic plans based on trends in the education market? \n\u2022 Can you give examples of how you've adapted recovery planning in response to education market trends?"
    },
    "INCIDENT RECOVERY COMMUNICATION": {
      "1": "Communication Strategy for Restoration Activities: \n\u2022 How do you currently communicate about restoration activities following an incident? \n\u2022 Is there a formal process or policy in place for communicating about post-incident restoration activities?\n\nRecovery Plan Invocation Conditions: \n\u2022 Can you describe the conditions under which you would invoke your recovery plan? \n\u2022 Are the conditions warranting execution of the recovery plan and the responsibilities associated with them documented?\n\nSystematic Approach Absence:\n\u2022 Without a systematic approach to communication, how have you managed communication regarding recovery activities in past incidents?",
      "2": "Development of Communication Processes:\n\u2022 What processes are you developing to manage media interactions and triage communication requests during recovery activities?\n\nPublic Relations and Privacy Policy Awareness: \n\u2022 How do you ensure your staff knows and adheres to public relations and privacy policies during incident recovery?\n\nAction Steps for Event Damage Reduction:\n\u2022 Can you detail the action steps defined for reducing damage from an incident? \n\u2022 How do post-incident action steps include handling data breaches and recovery activities?",
      "3": "Documentation of Recovery Plan Conditions:\n\u2022 How are the conditions and responsibilities for invoking the recovery plan documented and communicated to relevant stakeholders?\n\nManagement of Public Relations Post-Event: \n\u2022 How do you manage public relations and ensure your school's reputation is protected and/or restored after an incident? \n\u2022 How is the current process for managing public relations and protecting or restoring the school's reputation integrated with your recovery communications?\n\nCommunication with Stakeholders and Law Enforcement: \n\u2022 Can you explain how you communicate recovery activities to internal and external stakeholders, including law enforcement and leadership teams?",
      "4": "Coordinated Communication Response Management: \n\u2022 How do you manage a coordinated communication response to balance cybersecurity investigation and recovery concerns?\n\nPre-Identification of Communication Channels: \n\u2022 What communication channels have you identified in advance for incident recovery communication? \n\u2022 How do pre-identified communication channels facilitate effective communication?\n\nUse of Communication Templates and Playbooks: \n\u2022 Can you describe the communication templates and playbooks derived from tabletop exercises? \n\u2022 How have communication templates and playbooks been used in actual incidents?",
      "5": "Cyclical Improvement Process for Recovery Communications: \n\u2022 How does your recovery communication undergo a continuous improvement process? \n\u2022 Can you share examples of how post-incident recovery feedback is collected and analyzed?\n\nIntegration of Transparent Communication: \n\u2022 How is transparent communication integrated into your incident recovery process? \n\u2022 What role does a playbook with predefined communication topics play in your incident recovery process?\n\nMeasurable Process Improvement through Feedback Analysis: \n\u2022 Can you provide an example of how feedback analysis has identified shortfalls or gaps and led to measurable improvements in your recovery communication strategy?"
    }
  }
};

export const MATURITY_LEVELS = [
  { level: 1, name: 'Initial', color: '#ef4444', description: 'Ad hoc, undocumented processes with minimal leadership involvement.' },
  { level: 2, name: 'Repeatable', color: '#f97316', description: 'Some processes emerging but not systematically applied.' },
  { level: 3, name: 'Defined', color: '#eab308', description: 'Formalized governance with documented policies and clear roles.' },
  { level: 4, name: 'Managed', color: '#22c55e', description: 'Proactive governance with well-defined and managed practices.' },
  { level: 5, name: 'Optimized', color: '#3b82f6', description: 'Continuously improved with high efficiency and adaptability.' },
];

export const NIST_FUNCTION_COLORS = {
  GOVERN: '#6366f1',
  IDENTIFY: '#8b5cf6',
  PROTECT: '#3b82f6',
  DETECT: '#06b6d4',
  RESPOND: '#f97316',
  RECOVER: '#22c55e',
};

export const INTERVIEW_CHECKLIST = {
  "before": [
    "Preview the school's web presence and research its cybersecurity and data privacy policies.",
    "Research the school's profile, including demographics, vision, mission, and values.",
    "Explore the school's strategic challenges (e.g., cybersecurity incidents, financial status, academic performance, political climate).",
    "Identify regulatory compliance requirements.",
    "Identify key contacts and create a list of personnel to interview.",
    "Obtain significant physical and virtual assets, including facilities, network operating environment(s), and systems.",
    "Investigate the school's cybersecurity needs and expectations of internal personnel and key stakeholders.",
    "Gather cybersecurity performance measurements and evaluate their alignment to overall operations.",
    "Analyze how technology suppliers and partners work with the school.",
    "Obtain the processes for vetting online data privacy and security services, including all formal and informal data-sharing agreements with third parties.",
    "Explore cybersecurity operations and alignment with overall school operations, including senior-level leadership involvement.",
    "Obtain organizational charts, reporting structures, policies, processes, and standards for review.",
    "Identify the leadership and governance structure, including reporting relationships between senior leaders and cybersecurity personnel.",
    "Identify the interview format (e.g., in-person, virtual, length).",
    "Send a formal meeting invitation to all personnel involved in the assessment process.",
    "Ensure, in advance, that objectives are communicated.",
    "Create, finalize, and add an agenda to the meeting invitation."
  ],
  "during": [
    "Explore the school's culture and cybersecurity practices.",
    "Obtain specific information about functional-level cybersecurity practices.",
    "Identify evidence to support the Cybersecurity Rubric (CR) maturity levels.",
    "Achieve clarification about the maturity levels assigned from the self-assessment.",
    "Determine how well the school's people, processes, and technologies work together to reduce cybersecurity risk."
  ],
  "after": [
    "Schedule a meeting with the school to present the draft Evaluation Report.",
    "Schedule when the school will provide feedback on the report.",
    "Schedule when and how you will provide the school with the final report."
  ]
};

export const TRAINING_GUIDE = {
  "title": "Learn How to Use the Cybersecurity Rubric 2.0",
  "modules": [
    {
      "id": 1,
      "title": "Module 1: Cybersecurity Awareness",
      "topics": [
        {
          "id": "1.1",
          "title": "Cybersecurity Awareness",
          "content": "Cybersecurity awareness fosters a culture of prevention, empowering individuals to recognize suspicious activities and take appropriate steps to enhance safety. This course equips you with the skills to examine a school's cybersecurity practices using a NIST rubric designed for education.",
          "keyPoints": [
            "Cybersecurity is protecting people from technology-related risks.",
            "Schools must prioritize cybersecurity \u2014 they are not immune to threats like identity theft, monetary loss, and data breaches.",
            "Common threats include: Phishing, Ransomware, DDoS, Insider Threats, MitM, IoT Attacks, Spoofing, and Malware.",
            "Cybersecurity awareness helps mitigate risk, identify suspicious activity, and continuously improve security practices."
          ]
        },
        {
          "id": "1.2",
          "title": "The Purpose of Independent Reviews",
          "content": "Cybersecurity evaluations identify the extent of safety provided by a school's environment. Independent third-party evaluations provide unbiased assessment of current cyber practices.",
          "keyPoints": [
            "Evaluations clarify areas of strength and identify vulnerabilities.",
            "Independent third-party reviews increase objectivity and validity.",
            "Benefits: ensuring systematic processes, inspecting weaknesses, building stakeholder confidence, developing improvement roadmaps, verifying policies and controls.",
            "Qualified practitioners can conduct structured, objective, and independent examinations."
          ]
        },
        {
          "id": "1.3",
          "title": "The Role of an Evaluator",
          "content": "CCREs deliver comprehensive reports covering governance, risk management, asset management, incident response, and recovery planning.",
          "keyPoints": [
            "Evaluators provide information about potential risks \u2014 they do not provide solutions.",
            "Evaluators must possess cybersecurity expertise, objectivity, diligence, and practical strategies.",
            "Schools can increase protection through: Awareness, MFA, Cybersecurity reviews, and Zero Trust security models."
          ]
        }
      ]
    },
    {
      "id": 2,
      "title": "Module 2: Cybersecurity Framework",
      "topics": [
        {
          "id": "2.1",
          "title": "Cybersecurity Standards",
          "content": "The NIST Cybersecurity Framework (CSF 2.0) provides a structured set of guidelines for mitigating cybersecurity threats. Key supporting organizations include CIO, CISA, CoSN, ISO 27001, K12 SIX, NIST, Security Studio, and SETDA.",
          "keyPoints": [
            "NIST CSF 2.0 emphasizes flexibility and adaptability across sectors.",
            "CISA supports educational institutions with resources, training, and guidance.",
            "K12 SIX is focused entirely on K-12 cybersecurity through collaboration and information sharing.",
            "ISO 27001 provides international ISMS standards."
          ]
        },
        {
          "id": "2.2",
          "title": "NIST Categories",
          "content": "The NIST CSF 2.0 consists of 6 Functions: Govern, Identify, Protect, Detect, Respond, and Recover. Each function contains categories that define specific cybersecurity outcomes.",
          "keyPoints": [
            "GOVERN: Organizational context, risk management strategy, roles/responsibilities, policy, oversight, supply chain risk management.",
            "IDENTIFY: Asset management, risk assessment, improvement.",
            "PROTECT: Identity management & access control, awareness & training, data security, platform security, technology infrastructure resilience.",
            "DETECT: Continuous monitoring, adverse event analysis.",
            "RESPOND: Incident management, incident analysis, response reporting & communication, incident mitigation.",
            "RECOVER: Incident recovery plan execution, incident recovery communication."
          ]
        },
        {
          "id": "2.3",
          "title": "Cybersecurity Rubric Introduction",
          "content": "The Cybersecurity Rubric (CR 2.0) assesses a school's cyber-readiness aligned with NIST CSF 2.0. It includes 6 Functions and 22 Categories, each rated from Initial (Level 1) to Optimized (Level 5).",
          "keyPoints": [
            "The overall maturity level is based on function maturity levels.",
            "All categories must be rated for an accurate maturity assessment.",
            "Level descriptions describe the behaviors and practices expected at each maturity level.",
            "The Results tab auto-populates after all function categories are rated."
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "Module 3: Cybersecurity Evaluations",
      "topics": [
        {
          "id": "3.1",
          "title": "Cybersecurity Rubric",
          "content": "The CR 2.0 rubric tool has 6 Function tabs (Govern, Identify, Protect, Detect, Respond, Recover). Each tab has categories that must be evaluated and assigned a maturity level from 1 to 5.",
          "keyPoints": [
            "Evaluate each category by reading all 5 level descriptions carefully.",
            "Select the level that BEST describes the school's current state \u2014 not aspirational state.",
            "Look for evidence to support the assigned level.",
            "When in doubt, select the lower level \u2014 it's better to be conservative and accurate.",
            "The interview checklist helps gather evidence during the evaluation process."
          ]
        },
        {
          "id": "3.2",
          "title": "Evaluating Maturity Ratings",
          "content": "Maturity ratings should reflect the current state of cybersecurity practices. Each level builds upon the previous one, representing increasing sophistication and integration.",
          "keyPoints": [
            "Level 1 (Initial): Ad hoc, undocumented, reactive processes.",
            "Level 2 (Repeatable): Some processes emerging, not yet systematic.",
            "Level 3 (Defined): Formalized, documented, and communicated processes.",
            "Level 4 (Managed): Proactive, measured, and well-managed practices.",
            "Level 5 (Optimized): Continuous improvement, deeply embedded, highly adaptive.",
            "The overall function maturity is the average of its category scores, rounded down.",
            "The overall organizational maturity is the lowest function maturity level."
          ]
        }
      ]
    }
  ]
};
