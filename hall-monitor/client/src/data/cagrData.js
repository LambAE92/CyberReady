export const CAGR_FUNCTIONS = [
  {
    name: 'Govern',
    key: 'GOVERN',
    color: '#4F46E5',
    levelDescriptions: {
      "1": "No AI governance structures exist. AI tools are adopted without policy, oversight, or risk awareness.",
      "2": "Awareness of AI governance needs is emerging. Some informal practices exist but are inconsistent and undocumented.",
      "3": "AI governance policies and processes are formally adopted, communicated, and consistently applied district-wide.",
      "4": "AI governance is proactive, monitored, and enforced. Leadership actively oversees AI risk on a defined schedule.",
      "5": "AI governance is continuously improved, embedded in district culture, and adapted to emerging technologies and regulations."
    },
    categories: [
      {
        name: 'Policies, Processes, and Practices',
        id: 'GV.1',
        nistRef: 'GOVERN 1',
        subcategories: [
          { id: 'GV.1.1', text: "Legal and regulatory requirements involving AI are understood, managed, and documented." },
          { id: 'GV.1.2', text: "The characteristics of trustworthy AI are integrated into organizational policies, processes, procedures, and practices." },
          { id: 'GV.1.3', text: "Processes and practices are in place to determine the needed level of risk management activities based on the organization's risk tolerance." },
          { id: 'GV.1.4', text: "The risk management process and its outcomes are established through transparent policies and controls based on organizational risk priorities." },
          { id: 'GV.1.5', text: "Ongoing monitoring and periodic review of the risk management process and its outcomes are planned and roles are clearly defined." },
          { id: 'GV.1.6', text: "Mechanisms are in place to inventory AI systems and are resourced according to organizational risk priorities." },
          { id: 'GV.1.7', text: "Processes and procedures are in place for decommissioning and phasing out AI systems safely." }
        ],
        levels: {
          "1": "No AI policies, processes, or procedures exist. Legal and regulatory requirements such as FERPA and COPPA are not documented in relation to AI. AI tools are adopted without any governance framework. No AI system inventory exists. Evidence of this level: no written AI policy, no inventory record, no governance documentation.",
          "2": "Awareness of legal obligations related to AI is emerging at the IT or leadership level, but no formal written policy has been adopted. A partial list of AI tools may exist but is not actively maintained. Risk tolerance is understood intuitively but undefined. Evidence of this level: informal communications about AI use, an incomplete tool list.",
          "3": "A written AI governance policy is formally adopted, board-approved, and communicated district-wide. Legal and regulatory requirements are documented. A maintained AI system inventory exists, classified by risk. Decommissioning procedures are defined. Evidence of this level: adopted board policy, maintained inventory, documented risk tolerance statement.",
          "4": "AI policies are reviewed on a defined annual cycle and updated when new tools are adopted or regulations change. Risk tolerance actively guides all AI adoption decisions. Policy compliance is monitored and exceptions are documented. Evidence of this level: policy review records, annotated inventory with risk ratings, exception log.",
          "5": "AI governance policies are continuously refined based on incidents, audits, and updated NIST guidance. Trustworthy AI characteristics are embedded across all district processes. Inventory management is systematic and current. Evidence of this level: dated policy revision history, continuous improvement log, integrated decommissioning records."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Identify a staff member responsible for tracking AI tools in use across the district.", "Begin a log of AI tools including vendor and purpose, even if incomplete.", "Research FERPA and COPPA requirements and document them in a single reference sheet.", "Schedule a leadership conversation to discuss the district's comfort level with AI risk."] },
          { from: 2, to: 3, steps: ["Develop and seek board approval for a written AI governance policy.", "Formalize the AI tool inventory with risk classification and data access columns.", "Document the district's AI risk tolerance in writing and have leadership sign off.", "Define a basic decommissioning procedure for retiring AI tools including data deletion steps. Reference FERPA and COPPA explicitly in the policy."] },
          { from: 3, to: 4, steps: ["Establish an annual policy review cycle with a defined review date and assigned reviewer.", "Create a policy compliance tracking log to document whether staff are following adopted AI policies.", "Require formal documentation of exceptions whenever an unapproved AI tool is used.", "Update the inventory quarterly rather than annually and assign ownership to a specific role."] },
          { from: 4, to: 5, steps: ["Implement a continuous improvement process that connects policy updates to incident findings and external AI developments.", "Integrate AI decommissioning with the district's broader data governance and records management program.", "Automate inventory updates by connecting to procurement or IT asset management systems.", "Benchmark district AI governance practices annually against NIST guidance updates and peer districts."] }
        ]
      },
      {
        name: 'Accountability Structures',
        id: 'GV.2',
        nistRef: 'GOVERN 2',
        subcategories: [
          { id: 'GV.2.1', text: "Roles and responsibilities related to mapping, measuring, and managing AI risks are documented and clear throughout the organization." },
          { id: 'GV.2.2', text: "Personnel receive AI risk management training to perform duties consistent with related policies, procedures, and agreements." },
          { id: 'GV.2.3', text: "Executive leadership takes responsibility for decisions about risks associated with AI system deployment." }
        ],
        levels: {
          "1": "No one in the district is formally responsible for AI governance. AI decisions are made ad hoc without defined authority. No AI-specific training exists. Evidence of this level: no documented role assignments, no training records, no leadership communications on AI risk.",
          "2": "IT staff or a curriculum coordinator informally manage AI-related issues. Accountability is implied by position rather than formally assigned. Evidence of this level: informal role assumption, undocumented authority.",
          "3": "A designated AI governance lead is identified in writing. Roles are documented in position descriptions or policy. The superintendent accepts documented executive responsibility. Staff with oversight roles have completed documented training. Evidence of this level: written role assignments, training completion records, leadership accountability documentation.",
          "4": "AI accountability is formally embedded across IT, curriculum, HR, and legal. Training is role-specific, required, and tracked. Communication protocols for AI incidents are defined and tested. Evidence of this level: cross-functional role matrix, role-specific training curricula, documented escalation procedures.",
          "5": "Accountability structures are reviewed when new AI systems are adopted. Training programs are continuously improved. Executive leadership champions AI trustworthiness. Cross-functional teams operate with defined charters and board-level reporting. Evidence of this level: versioned role documentation, training revision history, board AI governance reports."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Assign one person by name and title as the AI point of contact for staff.", "Communicate the assignment to all staff so they know who to go to with AI concerns.", "Have that person complete at least one AI risk awareness training.", "Brief the superintendent on the district's AI tool usage and the need for governance oversight."] },
          { from: 2, to: 3, steps: ["Formally document AI governance roles in job descriptions, policy, or an organizational responsibility chart.", "Establish documented executive responsibility with the superintendent formally accepting AI risk oversight in writing.", "Develop a brief AI governance training for staff in AI oversight roles and track completion.", "Define how AI-related concerns should be escalated from staff to leadership."] },
          { from: 3, to: 4, steps: ["Expand accountability beyond IT to include curriculum, HR, and legal with documented role definitions.", "Develop role-specific training requirements and enforce completion for all roles with AI responsibilities.", "Define and document the escalation and communication process for AI incidents.", "Schedule regular leadership reviews of AI risk posture and document outcomes."] },
          { from: 4, to: 5, steps: ["Establish a cross-functional AI governance team with a formal charter and regular meeting schedule.", "Implement a process for reviewing and updating role assignments when new AI systems are adopted.", "Create a continuous training improvement cycle that incorporates lessons from incidents and new NIST guidance.", "Ensure AI governance is reported to the board on a defined schedule."] }
        ]
      },
      {
        name: 'Workforce Diversity and Equity in AI Risk',
        id: 'GV.3',
        nistRef: 'GOVERN 3',
        subcategories: [
          { id: 'GV.3.1', text: "Decision-making related to AI risks throughout the lifecycle is informed by a diverse team reflecting demographic diversity and broad domain expertise." },
          { id: 'GV.3.2', text: "Policies and procedures are in place to define and differentiate roles and responsibilities for human-AI configurations and oversight of AI systems." }
        ],
        levels: {
          "1": "AI adoption decisions are made by a single person or small homogeneous group without diverse input. No consideration is given to differential impacts on student populations. Human oversight roles are undefined. Evidence of this level: no multi-stakeholder review process, no human oversight documentation.",
          "2": "Some stakeholders such as a principal or curriculum lead are consulted informally. Awareness that AI can produce unequal outcomes exists but is not acted upon. Human oversight of AI is loosely understood but undocumented. Evidence of this level: informal consultation records, verbal acknowledgment of equity concerns without documented action.",
          "3": "AI risk decisions formally involve diverse perspectives including teachers, counselors, administrators, and where appropriate parent or student representatives. Human-AI oversight roles are documented per system. Evidence of this level: documented review team composition, written human oversight configurations per AI system.",
          "4": "Diverse participation is a documented requirement for all AI risk assessments. Equity impact analysis is a standard, documented step in AI adoption. Human oversight configurations are reviewed regularly. Evidence of this level: equity review documentation per tool, oversight configuration review records, enforced participation requirements.",
          "5": "Diversity and equity considerations are continuously evaluated in AI risk governance. The district proactively identifies and remedies disparate impacts on student subgroups using data. Evidence of this level: equity outcome tracking data, corrective action documentation, oversight model revision history."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Identify two or three additional perspectives to involve in AI decisions beyond the current decision-maker.", "Discuss at a staff meeting how AI tools might affect different student groups differently.", "Informally document who reviewed and approved each significant AI tool adoption."] },
          { from: 2, to: 3, steps: ["Establish a written requirement that AI adoption reviews must include representation from teaching, student support, and administration.", "Add an equity question to the AI adoption checklist: How might this tool affect students differently based on ability, language, or background?", "Document the human oversight model for each AI tool in use."] },
          { from: 3, to: 4, steps: ["Formalize equity impact analysis as a required, documented step before any AI tool is approved district-wide.", "Define participation requirements for AI risk assessments and enforce them consistently.", "Schedule annual reviews of human oversight configurations for all active AI systems."] },
          { from: 4, to: 5, steps: ["Collect and analyze outcome data by student subgroup for AI tools that affect instruction or student services.", "Create a corrective action process when disparate impacts are identified.", "Continuously refine human oversight models based on what the data shows about system performance and equity."] }
        ]
      },
      {
        name: 'Risk-Aware Organizational Culture',
        id: 'GV.4',
        nistRef: 'GOVERN 4',
        subcategories: [
          { id: 'GV.4.1', text: "Policies and practices are in place to foster a critical thinking and safety-first mindset in the deployment and uses of AI systems." },
          { id: 'GV.4.2', text: "Organizational teams document the risks and potential impacts of AI technology they deploy and communicate about impacts more broadly." },
          { id: 'GV.4.3', text: "Organizational practices are in place to enable AI testing, identification of incidents, and information sharing." }
        ],
        levels: {
          "1": "AI tools are adopted based on convenience or enthusiasm without any culture of risk awareness. No written guidance encourages critical evaluation. No process exists for identifying or reporting AI incidents. Evidence of this level: no risk documentation, no incident reporting mechanism, no guidance promoting critical AI evaluation.",
          "2": "Some staff informally question AI tools before using them, but no policy requires or standardizes this. Risks are occasionally discussed but not recorded. Evidence of this level: informal safety conversations, occasional undocumented risk concerns raised.",
          "3": "A written policy requires critical evaluation of AI tools before adoption and documents expected safety-first practices. Risk and impact documentation is required for significant AI systems. A defined process exists for staff to report AI incidents, and reports are tracked. Evidence of this level: written AI evaluation policy, incident report log, pre-deployment testing records.",
          "4": "A safety-first mindset is consistently practiced and enforced across all departments. Risk documentation is required before any AI tool is approved. Incident reports are actively reviewed and used to improve practices. Evidence of this level: risk documentation for all approved tools, incident trend analysis, cross-district safety communications.",
          "5": "AI risk awareness is embedded in district culture at all levels. Staff at every role are equipped to identify and communicate AI risks. Lessons from incidents feed back into policy and training improvements. Evidence of this level: culture survey results, incident-to-improvement records, sector communication documentation."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Communicate to all staff that AI safety is a shared responsibility and encourage questions before adopting tools.", "Identify a single point of contact for staff to bring AI concerns or observations.", "Begin informally documenting AI-related concerns raised by staff."] },
          { from: 2, to: 3, steps: ["Write and adopt a policy that requires a safety and risk review before any AI tool is used with students.", "Create a simple AI incident report form and communicate how to use it to all staff.", "Require documentation of risks and potential impacts for any AI tool used at the district level.", "Conduct basic pre-deployment testing of AI tools before rolling them out to classrooms."] },
          { from: 3, to: 4, steps: ["Make safety-first AI evaluation a consistent practice across all schools and departments.", "Review incident reports monthly and share findings with relevant staff.", "Create an internal communication channel to share AI safety insights across the district."] },
          { from: 4, to: 5, steps: ["Measure staff AI risk awareness through periodic surveys and use results to improve training.", "Build a formal feedback loop from incident findings to policy and training updates.", "Engage with state or national networks to share and receive AI safety lessons from peer districts."] }
        ]
      },
      {
        name: 'Stakeholder Engagement',
        id: 'GV.5',
        nistRef: 'GOVERN 5',
        subcategories: [
          { id: 'GV.5.1', text: "Policies and practices are in place to collect, consider, prioritize, and integrate feedback from those external to the team that deployed the AI system regarding potential impacts related to AI risks." },
          { id: 'GV.5.2', text: "Mechanisms are established to enable the team that deployed AI systems to regularly incorporate adjudicated feedback from relevant AI actors into system design and implementation." }
        ],
        levels: {
          "1": "No mechanism exists for students, parents, staff, or community members to provide feedback about AI systems. No feedback is solicited or considered in AI decisions. Evidence of this level: no feedback channel, no record of stakeholder input on AI tools.",
          "2": "Feedback about AI tools reaches leadership informally through complaints or staff concerns but is not systematically documented or acted upon. Evidence of this level: informal feedback received but not logged or tracked.",
          "3": "A defined process exists to solicit and collect feedback from teachers, parents, and where appropriate students on AI tools and their impacts. Collected feedback is documented, reviewed as part of AI evaluation cycles, and considered in tool continuation or removal decisions. Evidence of this level: feedback collection forms or surveys, documented review records, decisions influenced by feedback.",
          "4": "Feedback mechanisms are actively promoted to all stakeholders and used on a regular schedule. Feedback is reviewed, prioritized, and adjudicated with documented decisions. Stakeholders are notified when their input results in a change. Evidence of this level: regular stakeholder communications, adjudication records, documented policy or tool changes linked to feedback.",
          "5": "Stakeholder engagement is continuous, multi-channel, and proactively reaches underrepresented communities. Feedback loops are fast, transparent, and demonstrably influence AI governance decisions. Evidence of this level: engagement outreach records, public-facing summaries, feedback-to-decision traceability."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Create a simple way for staff, parents, and students to share concerns about AI tools.", "Begin logging feedback received informally, even if it came through complaints or conversations."] },
          { from: 2, to: 3, steps: ["Develop a short feedback survey for staff and parents about AI tools used in the district.", "Establish a review cycle at minimum annually to examine collected feedback.", "Document how feedback influenced each AI tool evaluation or renewal decision."] },
          { from: 3, to: 4, steps: ["Actively communicate feedback opportunities to all stakeholders at the start of each school year.", "Create an adjudication process: review feedback, decide how to respond, and document the decision.", "Notify stakeholders when their feedback results in a change to an AI tool or practice."] },
          { from: 4, to: 5, steps: ["Proactively reach out to communities most affected by AI tools including students with disabilities, English learners, and families with limited digital access.", "Reduce the time between receiving feedback and acting on it.", "Publish an annual summary of how community input has shaped AI governance decisions."] }
        ]
      },
      {
        name: 'Third-Party and Supply Chain AI Risk Governance',
        id: 'GV.6',
        nistRef: 'GOVERN 6',
        subcategories: [
          { id: 'GV.6.1', text: "Policies and procedures address AI risks associated with third-party entities, including risks of infringement of a third-party's intellectual property or other rights." },
          { id: 'GV.6.2', text: "Contingency processes are in place to handle failures or incidents in third-party data or AI systems deemed to be high-risk." }
        ],
        levels: {
          "1": "No policies address AI risks from third-party vendors. Data Processing Agreements do not include AI-specific provisions. The district has no contingency plan for third-party AI system failures. Evidence of this level: vendor contracts without AI provisions, no contingency documentation.",
          "2": "DPAs are in place for some vendors but are not reviewed specifically for AI data practices, model training on student data, or sub-processor disclosure. Awareness of vendor AI risk exists informally. Evidence of this level: generic DPAs on file, absence of AI-specific contract language.",
          "3": "A documented policy requires DPAs for all vendors with access to student data, including AI-specific provisions covering data use, model training restrictions, and sub-processor disclosure. Contingency procedures are documented for failure of high-risk third-party AI systems. Evidence of this level: executed AI-specific DPAs, documented contingency procedures.",
          "4": "Third-party AI governance is enforced at procurement. Existing vendor DPAs are reviewed annually for AI compliance. Sub-processor and embedded AI component risks are assessed. Contingency plans are reviewed and tested for critical vendor dependencies. Evidence of this level: procurement enforcement records, annual DPA review log, documented contingency test results.",
          "5": "Third-party AI supply chain governance is continuous. Vendor AI risk is monitored for material changes. Contract terms hold vendors to ongoing trustworthy AI standards. The district can act quickly including suspending vendor access when a risk materializes. Evidence of this level: vendor monitoring records, contract compliance correspondence, documented rapid-response actions."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Review current vendor contracts to determine whether any address AI data practices.", "Identify which vendors use AI or process student data through AI systems.", "Begin requesting AI-specific DPA addenda from vendors that handle student data."] },
          { from: 2, to: 3, steps: ["Develop a standard AI DPA template or addendum that covers data use, model training restrictions, and sub-processor disclosure.", "Require executed AI-specific DPAs before any new vendor with AI components is approved.", "Document a contingency procedure for what the district will do if a high-risk AI vendor goes offline or has a breach."] },
          { from: 3, to: 4, steps: ["Integrate AI DPA requirements into the procurement approval process so no new vendor can be approved without them.", "Schedule annual DPA reviews and assign a responsible reviewer.", "Test your contingency procedures for at least one critical AI vendor annually."] },
          { from: 4, to: 5, steps: ["Establish a process to monitor vendors for material AI changes such as model updates, ownership changes, or new sub-processors.", "Include contract terms that require vendors to notify the district of significant AI system changes.", "Define and practice a rapid-response protocol for suspending vendor access when a third-party AI risk materializes."] }
        ]
      }
    ]
  },
  {
    name: 'Map',
    key: 'MAP',
    color: '#0369A1',
    levelDescriptions: {
      "1": "Context for AI systems is not established. AI tools are deployed without structured context or impact analysis.",
      "2": "Some awareness of context and risk exists informally. Partial documentation may exist for major tools but no structured methodology is applied.",
      "3": "Context is formally established for significant AI systems. Risk, impact, and capability assessments are documented before or shortly after deployment.",
      "4": "Context establishment and risk mapping are required processes applied consistently to all AI tools. Diverse stakeholders contribute and findings are actively used.",
      "5": "Context and risk mapping are continuous and dynamic. Changes in tools, regulations, or student demographics automatically trigger reassessment."
    },
    categories: [
      {
        name: 'Context Establishment',
        id: 'MP.1',
        nistRef: 'MAP 1',
        subcategories: [
          { id: 'MP.1.1', text: "Intended purposes, context-specific laws, norms, and prospective settings in which the AI system will be deployed are understood and documented." },
          { id: 'MP.1.2', text: "Participation in establishing context reflects demographic diversity and broad domain and user experience expertise, and participation is documented." },
          { id: 'MP.1.3', text: "The organization's mission and relevant goals for AI technology are understood and documented." },
          { id: 'MP.1.4', text: "The business value or context of use has been clearly defined or re-evaluated for existing AI systems." },
          { id: 'MP.1.5', text: "Organizational risk tolerances are determined and documented." },
          { id: 'MP.1.6', text: "System requirements are elicited from and understood by relevant AI actors. Design decisions take socio-technical implications into account." }
        ],
        levels: {
          "1": "No documentation exists for any AI tool's intended purpose, target user population, or deployment context. AI tools are adopted based on vendor recommendations without district-authored context assessment. Evidence of this level: no context documentation, no risk tolerance statement, reliance solely on vendor materials.",
          "2": "Vendor marketing materials serve as informal context documentation. Some awareness exists of why a tool was adopted but no structured context assessment is completed by the district. Evidence of this level: vendor one-pagers as the only documentation, absence of district-authored context records.",
          "3": "For each significant AI tool, the district documents intended use case, target user population by grade and role, applicable legal requirements, alignment to district mission, and organizational AI risk tolerance. Evidence of this level: written context assessments per tool, documented risk tolerance, mission alignment statements.",
          "4": "Context documentation is completed before any AI tool is approved and re-evaluated when tools change materially. Diverse stakeholders formally contribute to context establishment. Evidence of this level: multi-stakeholder context review records, re-evaluation documentation for changed tools, dated context assessments.",
          "5": "Context establishment is dynamic and continuous. Changes in tool capabilities, applicable regulations, or student demographics automatically trigger context reassessment. Context documentation feeds directly into MAP, MEASURE, and MANAGE processes. Evidence of this level: reassessment trigger records, traceability from context documentation to downstream risk and measurement decisions."
        },
        advancement: [
          { from: 1, to: 2, steps: ["For each AI tool in use, write a one-paragraph summary of why the district adopted it and who uses it.", "Research and document the primary legal obligations that apply (FERPA, COPPA, state AI policy).", "Have leadership discuss and record a simple statement of the district's AI risk comfort level."] },
          { from: 2, to: 3, steps: ["Create a context assessment template that captures: intended use, target users, applicable regulations, mission alignment, and risk tolerance.", "Complete the template for all significant AI tools currently deployed.", "Require the template to be completed before new tools are approved for district use."] },
          { from: 3, to: 4, steps: ["Expand context reviews to include diverse voices, at minimum one teacher, one student support staff, and one administrator per tool.", "Define what constitutes a material change in a tool that requires a re-evaluation.", "Create a dated record for each context assessment so re-evaluations can be tracked over time."] },
          { from: 4, to: 5, steps: ["Build a process that monitors for regulatory changes, vendor updates, and demographic shifts that should trigger context reassessment.", "Connect context documentation directly to the district's MAP, MEASURE, and MANAGE records for each AI system.", "Review context documentation annually as part of the broader AI governance cycle."] }
        ]
      },
      {
        name: 'AI System Categorization',
        id: 'MP.2',
        nistRef: 'MAP 2',
        subcategories: [
          { id: 'MP.2.1', text: "The specific tasks and methods used to implement the tasks that the AI system will support are defined (e.g., classifiers, generative models, recommenders)." },
          { id: 'MP.2.2', text: "Information about the AI system's knowledge limits and how system output may be utilized and overseen by humans is documented." },
          { id: 'MP.2.3', text: "Scientific integrity and TEVV (test, evaluation, verification, and validation) considerations are identified and documented." }
        ],
        levels: {
          "1": "AI systems are used without any documentation of their type, underlying method, or operational limits. Staff do not know whether a tool uses generative AI, a classifier, or a recommendation engine. Evidence of this level: no categorization records, no system type documentation.",
          "2": "Basic awareness of AI tool types exists but is not formally recorded. System limitations are occasionally noted by teachers informally. No TEVV considerations have been identified. Evidence of this level: informal staff understanding only, absence of written categorization.",
          "3": "AI systems are formally categorized by type and method before deployment. Knowledge limits and human oversight expectations are documented per system. TEVV considerations are identified for significant systems. Evidence of this level: written system categorization records per tool, documented knowledge limits, TEVV notes for high-risk systems.",
          "4": "Categorization is required as part of the AI procurement and approval process. TEVV plans are documented for high-risk or high-impact systems. Categorization records include known failure modes and conditions under which the system should not be trusted without human review. Evidence of this level: procurement-linked categorization forms, TEVV plans, documented failure mode scenarios.",
          "5": "Categorization records are continuously updated as AI systems evolve. TEVV results feed back into categorization decisions. The district maintains a classification taxonomy enabling consistent risk comparison across tools. Evidence of this level: versioned categorization records, TEVV-to-categorization traceability, district AI classification taxonomy document."
        },
        advancement: [
          { from: 1, to: 2, steps: ["For each AI tool in use, identify and record its basic type: generative AI, recommender, classifier, or other.", "Ask each vendor to describe the limitations of their AI system and summarize that information for staff."] },
          { from: 2, to: 3, steps: ["Create a categorization record template that captures: AI system type, primary method, known limits, and human oversight expectations.", "Complete categorization records for all significant AI tools currently deployed.", "For any high-risk AI tool, document basic TEVV considerations."] },
          { from: 3, to: 4, steps: ["Require completed categorization records as part of the AI tool approval process.", "Develop TEVV plans for tools that affect student learning, assessment, or safety.", "Document at least one known failure mode for each high-risk AI system."] },
          { from: 4, to: 5, steps: ["Establish a process to update categorization records when vendors release significant updates.", "Create a district-wide AI classification taxonomy that groups tools by risk level.", "Build a feedback loop from TEVV results back into the categorization record."] }
        ]
      },
      {
        name: 'AI Capabilities and Benefits Assessment',
        id: 'MP.3',
        nistRef: 'MAP 3',
        subcategories: [
          { id: 'MP.3.1', text: "Potential benefits of intended AI system functionality and performance are examined and documented." },
          { id: 'MP.3.2', text: "Potential costs, including non-monetary costs from expected or realized AI errors or system functionality and trustworthiness, are examined and documented." },
          { id: 'MP.3.3', text: "Targeted application scope is specified and documented based on the system's capability, established context, and AI system categorization." },
          { id: 'MP.3.4', text: "Processes for operator and practitioner proficiency with AI system performance and trustworthiness are defined, assessed, and documented." },
          { id: 'MP.3.5', text: "Processes for human oversight are defined, assessed, and documented in accordance with organizational policies from the GOVERN function." }
        ],
        levels: {
          "1": "AI tools are adopted based on perceived benefit without any assessment of costs, limitations, or appropriate scope. Staff proficiency with AI tools is assumed. Human oversight expectations are undefined. Evidence of this level: no benefits or cost documentation, no scope definition, no proficiency assessment records.",
          "2": "Benefits are informally stated. Potential downsides are occasionally considered but not recorded. The scope of appropriate use is understood intuitively but not specified in writing. Evidence of this level: informal verbal benefits justification, absent scope or proficiency documentation.",
          "3": "A documented benefits-and-costs assessment is completed for significant AI tools, including privacy risks, equity concerns, and potential for AI error in student-facing contexts. Application scope is specified and communicated. Human oversight expectations are defined per tool. Staff proficiency needs are identified and addressed. Evidence of this level: written benefits-costs assessment, defined scope documentation, human oversight records, proficiency training records.",
          "4": "Benefits are formally compared against non-AI alternatives and benchmarks. Costs associated with AI errors are documented and connected to the district's risk tolerance. Staff proficiency is assessed and documented at defined intervals. Human oversight configurations are enforced and reviewed regularly. Evidence of this level: comparative benefits analysis, risk-linked cost records, periodic proficiency assessments, oversight review logs.",
          "5": "Benefits and costs are continuously monitored against real-world performance data. Scope constraints are enforced through both policy and technical controls. Staff proficiency programs are continuously refined based on observed tool performance. Evidence of this level: ongoing performance-to-benefit tracking, enforced scope controls, proficiency program revision history."
        },
        advancement: [
          { from: 1, to: 2, steps: ["For each AI tool, write a brief statement of the expected benefit and one or two anticipated drawbacks.", "Have the teacher or staff member who uses the tool describe the intended scope of use.", "Identify whether any training is needed for staff to use the tool safely and effectively."] },
          { from: 2, to: 3, steps: ["Create a benefits-and-costs assessment form that includes privacy, equity, and error risk considerations.", "Define in writing the intended scope of each AI tool.", "Document human oversight expectations for each tool and communicate them to relevant staff.", "Identify and address any staff proficiency gaps before deploying AI tools to students."] },
          { from: 3, to: 4, steps: ["Compare the benefits of AI tools against alternative approaches including non-AI options.", "Link documented cost and risk assessments to the district's AI risk tolerance statement.", "Conduct periodic staff proficiency assessments and document results.", "Review and update human oversight configurations at least annually."] },
          { from: 4, to: 5, steps: ["Track whether AI tools are delivering their stated benefits using real performance data.", "Implement technical controls that enforce scope constraints, not just policy guidance.", "Create a continuous proficiency improvement program based on observed tool performance and staff feedback."] }
        ]
      },
      {
        name: 'Third-Party Component Risk Mapping',
        id: 'MP.4',
        nistRef: 'MAP 4',
        subcategories: [
          { id: 'MP.4.1', text: "Approaches for mapping AI technology and legal risks of its components, including the use of third-party data or software, are in place, followed, and documented." },
          { id: 'MP.4.2', text: "Internal risk controls for components of the AI system, including third-party AI technologies, are identified and documented." }
        ],
        levels: {
          "1": "No review of third-party AI components, sub-processors, or embedded AI models has been conducted. The district does not know what data third-party vendors use or what models power the tools it has deployed. Evidence of this level: no component documentation, no vendor AI model disclosures reviewed.",
          "2": "Some awareness exists that third-party tools rely on external AI models or APIs, but no structured mapping of those components has been completed. Legal risks such as IP exposure or data rights are not formally considered. Evidence of this level: informal awareness without documented component map or legal risk review.",
          "3": "For significant AI systems, third-party components are identified and documented including underlying models, data sources, APIs, and sub-processors. Legal risks and data usage rights are assessed. Internal risk controls for third-party components are documented. Evidence of this level: written component maps per AI system, legal risk assessment records, documented internal controls.",
          "4": "Third-party component mapping is required during procurement. Vendor disclosures about AI components are reviewed, verified, and recorded. Risk controls are embedded in contract terms and monitored. Evidence of this level: procurement-linked component mapping forms, verified vendor disclosures, contract-embedded risk controls, monitoring records.",
          "5": "Third-party component risk is continuously monitored. Material changes in underlying models, data sources, or sub-processors trigger reassessment. The district maintains a current map of all AI component dependencies with associated risk ratings. Evidence of this level: live component dependency map with risk ratings, reassessment trigger records."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Ask each AI vendor to disclose what underlying models, APIs, or data sources power their product.", "Document those disclosures, even informally, for the tools most heavily used with students."] },
          { from: 2, to: 3, steps: ["Create a component map template to document sub-processors, underlying models, and data sources for each significant AI tool.", "Conduct a basic legal risk review asking: who owns the data, and can the vendor train AI models on student data?", "Document the internal risk controls the district applies to third-party AI components."] },
          { from: 3, to: 4, steps: ["Integrate component mapping into the procurement approval process.", "Verify vendor disclosures rather than accepting them at face value by reviewing contracts and privacy policies.", "Embed risk controls and disclosure obligations into vendor contract terms."] },
          { from: 4, to: 5, steps: ["Establish a process for vendors to notify the district of material changes to AI components.", "Maintain a live, rated component dependency map updated at least annually.", "Define what constitutes a material change that triggers a full component re-assessment."] }
        ]
      },
      {
        name: 'Impact Characterization',
        id: 'MP.5',
        nistRef: 'MAP 5',
        subcategories: [
          { id: 'MP.5.1', text: "Likelihood and magnitude of each identified impact (both potentially beneficial and harmful) based on expected use, past uses of AI systems in similar contexts, public incident reports, and other data are identified and documented." },
          { id: 'MP.5.2', text: "Practices and personnel for supporting regular engagement with relevant AI actors and integrating feedback about positive, negative, and unanticipated impacts are in place and documented." }
        ],
        levels: {
          "1": "No impact assessment has been conducted for any AI tool. Potential benefits and harms to students, staff, or the broader community are unknown and unconsidered. No mechanism exists to learn from observed or reported impacts. Evidence of this level: no impact documentation, no feedback channel for reporting tool effects.",
          "2": "Informal consideration of impacts occurs during tool adoption but nothing is formally documented. Unanticipated impacts are not tracked. Stakeholder feedback on AI impacts is not systematically collected or reviewed. Evidence of this level: informal consideration without written records, absence of structured feedback collection.",
          "3": "A documented impact characterization is completed for AI tools that interact with students or access student data. Both beneficial and harmful impacts are assessed and recorded. Feedback from teachers and relevant staff about observed impacts is collected and reviewed as part of evaluation cycles. Evidence of this level: written impact assessments per tool, staff feedback records, documented review of observed impacts.",
          "4": "Impact assessments include analysis of differential impacts on student subgroups including students with disabilities, English learners, and economically disadvantaged students. Public incident reports from comparable AI tools are reviewed and incorporated. Stakeholder engagement on impacts is regular, documented, and informs tool continuation decisions. Evidence of this level: disaggregated impact analysis, reviewed public incident reports, documented stakeholder engagement outcomes.",
          "5": "Impact characterization is continuous and informed by real-world performance data collected after deployment. Feedback loops from students, parents, and the community are active and demonstrably influence AI governance decisions. Evidence of this level: ongoing performance tracking data, sector network participation records, impact-to-decision traceability."
        },
        advancement: [
          { from: 1, to: 2, steps: ["For each AI tool, write a brief summary of expected benefits and at least one potential harm.", "Create a way for teachers to informally report unexpected outcomes or concerns about AI tools."] },
          { from: 2, to: 3, steps: ["Develop an impact assessment template that covers benefits, potential harms, and likelihood for each AI tool used with students.", "Establish a feedback collection process such as a survey or structured check-in to capture staff observations of tool impacts.", "Review feedback at least once per semester."] },
          { from: 3, to: 4, steps: ["Add disaggregated analysis to impact assessments, explicitly considering impacts on students with disabilities, English learners, and other subgroups.", "Search for and review public reports of issues with AI tools similar to those the district uses.", "Ensure impact findings formally influence tool renewal and continuation decisions."] },
          { from: 4, to: 5, steps: ["Collect post-deployment performance data to continuously update impact characterizations.", "Monitor sector-level AI incident reporting networks or publications.", "Create a clear path from feedback and impact data to documented governance decisions."] }
        ]
      }
    ]
  },
  {
    name: 'Measure',
    key: 'MEASURE',
    color: '#D97706',
    levelDescriptions: {
      "1": "No methods or metrics exist for evaluating AI risks or trustworthiness. The district has no way to assess whether AI tools are performing safely or appropriately.",
      "2": "Informal evaluation occurs through teacher observation or feedback. No structured methodology, defined metrics, or documentation standard exists.",
      "3": "Defined metrics and measurement approaches are documented and applied for significant AI risks. Trustworthy AI evaluation is completed and recorded for significant tools.",
      "4": "Measurement is comprehensive, prioritized by risk, and conducted on a defined schedule. Independent assessors review high-risk tools. Results actively inform governance decisions.",
      "5": "AI measurement is continuous, automated where feasible, and benchmarked against sector standards. Measurement gaps are actively addressed. Results feed the district's continuous improvement cycle."
    },
    categories: [
      {
        name: 'Measurement Methods and Metrics',
        id: 'MS.1',
        nistRef: 'MEASURE 1',
        subcategories: [
          { id: 'MS.1.1', text: "Approaches and metrics for measurement of AI risks are selected for implementation starting with the most significant AI risks. Risks that cannot be measured are properly documented." },
          { id: 'MS.1.2', text: "Appropriateness of AI metrics and effectiveness of existing controls are regularly assessed and updated, including reports of errors and potential impacts on affected communities." },
          { id: 'MS.1.3', text: "Internal experts who did not serve as front-line developers for the system and/or independent assessors are involved in regular assessments." }
        ],
        levels: {
          "1": "No metrics or measurement approaches exist for evaluating AI risks. The district has no method for determining whether AI tools are performing as intended or causing harm. Evidence of this level: no measurement documentation, no evaluation methodology, no review of AI tool performance.",
          "2": "Informal evaluation of AI tools occurs through teacher feedback or subjective observation, but without defined metrics, consistent methodology, or documentation. No independent reviewer has assessed any AI tool. Evidence of this level: verbal or anecdotal feedback only, absence of structured evaluation records.",
          "3": "Defined metrics and measurement approaches are documented for significant AI risks identified in the MAP process. Risks that cannot currently be measured are recorded with rationale. Control effectiveness is assessed at minimum annually. An evaluator not involved in the tool's deployment reviews significant systems. Evidence of this level: written measurement methodology, documented unmeasurable risks, annual review records, independent reviewer documentation.",
          "4": "Measurement approaches are comprehensive and prioritized by risk significance. Metrics are updated when tools change significantly or when errors are reported. Community impact is included in regular reviews. Independent assessments are conducted for high-risk tools. Evidence of this level: risk-prioritized measurement plans, error-linked metric updates, community impact review records, independent assessment reports.",
          "5": "AI measurement is continuous and automated where feasible. Metrics are regularly benchmarked against peer districts or sector standards. Measurement gaps are actively identified and addressed as better techniques become available. Evidence of this level: continuous monitoring logs, benchmarking records, gap remediation documentation, recurring independent assessment schedule."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Identify two or three observable indicators that would tell you whether an AI tool is working as intended.", "Collect teacher and staff feedback on AI tool performance at least once per semester.", "Document what you observe about AI tool effectiveness, even informally."] },
          { from: 2, to: 3, steps: ["Define specific metrics for the most significant AI risks identified in your MAP documentation.", "Document any AI risks that cannot currently be measured and note why.", "Identify a reviewer not involved in deploying the tool to independently evaluate significant AI systems annually."] },
          { from: 3, to: 4, steps: ["Prioritize your measurement resources toward the highest-risk AI tools.", "Update metrics when AI tools are updated significantly or when errors are reported.", "Require independent assessments for any AI tool rated high-risk.", "Include community impact in all significant AI tool reviews."] },
          { from: 4, to: 5, steps: ["Automate performance monitoring for high-use AI tools where feasible.", "Benchmark your AI measurement approaches against comparable districts or national guidance.", "Establish a recurring schedule for independent AI assessments across all significant systems."] }
        ]
      },
      {
        name: 'Trustworthy AI Characteristics Evaluation',
        id: 'MS.2',
        nistRef: 'MEASURE 2',
        subcategories: [
          { id: 'MS.2.1', text: "Test sets, metrics, and details about the tools used during TEVV are documented." },
          { id: 'MS.2.3', text: "AI system performance or assurance criteria are measured qualitatively or quantitatively and demonstrated for conditions similar to deployment settings." },
          { id: 'MS.2.5', text: "The AI system to be deployed is demonstrated to be valid and reliable. Limitations of generalizability are documented." },
          { id: 'MS.2.6', text: "The AI system is evaluated regularly for safety risks. The system can fail safely, particularly if made to operate beyond its knowledge limits." },
          { id: 'MS.2.7', text: "AI system security and resilience are evaluated and documented." },
          { id: 'MS.2.8', text: "Risks associated with transparency and accountability are examined and documented." },
          { id: 'MS.2.9', text: "The AI model is explained, validated, and documented, and AI system output is interpreted within its context to inform responsible use and governance." },
          { id: 'MS.2.10', text: "Privacy risk of the AI system is examined and documented." },
          { id: 'MS.2.11', text: "Fairness and bias are evaluated and results are documented." }
        ],
        levels: {
          "1": "No evaluation of trustworthy AI characteristics has been conducted for any AI tool. The district cannot verify whether its AI systems are valid, safe, secure, fair, or privacy-preserving. Vendor claims about safety and fairness are accepted without review. Evidence of this level: no trustworthy AI evaluation documentation, reliance solely on vendor claims.",
          "2": "Informal consideration of one or two characteristics, most often student safety or data privacy, occurs without structured documentation. No formal evaluation against the full set of trustworthy AI characteristics has been attempted. Evidence of this level: informal safety screening without documented evaluation criteria or results.",
          "3": "A structured trustworthy AI evaluation is completed for significant AI tools addressing all seven NIST trustworthy AI characteristics: valid and reliable, safe, secure and resilient, accountable and transparent, explainable and interpretable, privacy-enhanced, and fair with harmful bias managed. Results are documented. Evidence of this level: written trustworthy AI evaluation records per tool covering all seven characteristics.",
          "4": "Trustworthy AI evaluations are required before deployment and repeated on a defined schedule. Fairness and bias testing includes disaggregated analysis by student demographic groups. Privacy risk assessment is formally aligned with FERPA and COPPA. Evaluation results directly influence adoption and continuation decisions. Evidence of this level: pre-deployment and recurring evaluation records, disaggregated fairness analysis, FERPA/COPPA-aligned privacy assessments, documented decision rationale.",
          "5": "Trustworthy AI evaluation is continuous and integrated into the AI system lifecycle from pre-deployment through ongoing operation. All seven characteristics are monitored in production. Evaluation methodology is updated in response to NIST guidance revisions and emerging K-12 AI risks. Evidence of this level: production monitoring records for all seven characteristics, NIST-aligned methodology revision log, board and community reporting records."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Review each significant AI tool for two characteristics: student safety and data privacy.", "Document your findings rather than relying solely on vendor claims.", "Ask vendors for evidence of safety testing and privacy compliance."] },
          { from: 2, to: 3, steps: ["Learn the seven NIST trustworthy AI characteristics and create an evaluation checklist based on them.", "Complete evaluations for all AI tools used directly with students, covering all seven characteristics.", "Document results and keep them on file."] },
          { from: 3, to: 4, steps: ["Require trustworthy AI evaluations before any new tool is approved for district use.", "Add disaggregated fairness analysis: test whether the tool performs differently for different student groups.", "Align your privacy risk assessments explicitly to FERPA and COPPA requirements.", "Schedule recurring evaluations for all tools in active use."] },
          { from: 4, to: 5, steps: ["Implement ongoing monitoring of AI tool characteristics in production, not just during pre-deployment review.", "Update your evaluation methodology whenever NIST releases new guidance or K-12-specific AI risk research emerges.", "Report trustworthy AI evaluation results to the board and community annually."] }
        ]
      },
      {
        name: 'AI Risk Tracking',
        id: 'MS.3',
        nistRef: 'MEASURE 3',
        subcategories: [
          { id: 'MS.3.1', text: "Approaches, personnel, and documentation are in place to regularly identify and track existing, unanticipated, and emergent AI risks based on factors such as intended and actual performance in deployed contexts." },
          { id: 'MS.3.2', text: "Risk tracking approaches are considered for settings where AI risks are difficult to assess using currently available measurement techniques or where metrics are not yet available." }
        ],
        levels: {
          "1": "No mechanism exists for tracking AI risks after a tool is deployed. Once adopted, AI tools are not monitored for ongoing or emerging risks. Unanticipated risks are not detected or recorded. Evidence of this level: no risk tracking log, no post-deployment monitoring process, no assigned tracking responsibility.",
          "2": "AI risks are tracked informally. Staff may notice and mention issues but no formal tracking system, assigned owner, or documentation standard exists. Some risks may be addressed if escalated but tracking is reactive and incomplete. Evidence of this level: informal risk awareness without systematic documentation.",
          "3": "A defined risk tracking process is in place with assigned personnel, a documentation standard, and review timelines. Existing, unanticipated, and emergent AI risks are tracked with status and ownership. Risks that cannot currently be measured are documented with planned approaches for future assessment. Evidence of this level: risk tracking log with assigned owners and review dates, documented unmeasurable risk placeholders.",
          "4": "Risk tracking is active, comprehensive, and regularly reviewed by leadership. Unanticipated risks trigger immediate formal review. Emergent risks are identified proactively through performance monitoring, incident reports, and external AI safety intelligence. Tracking data informs AI governance decisions. Evidence of this level: regularly reviewed risk tracking log, documented responses to unanticipated risks, external intelligence records informing tracking updates.",
          "5": "AI risk tracking is continuous and integrated with the district's broader risk management program. Novel risks without established measurement methods are tracked qualitatively with plans to develop appropriate metrics. Risk trends across multiple AI systems are analyzed and reported to leadership. Evidence of this level: continuous risk monitoring records, trend analysis reports, qualitative tracking for emerging risk areas."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Create a simple log to record AI risks or issues as they are identified.", "Assign one person to be responsible for maintaining this log.", "Communicate to staff that they should report AI issues and explain how."] },
          { from: 2, to: 3, steps: ["Formalize the risk tracking log with columns for: risk description, AI system, date identified, owner, status, and next review date.", "Add a process for what happens when an unanticipated risk is identified.", "Document any AI risks that cannot currently be measured and record a plan for addressing them later."] },
          { from: 3, to: 4, steps: ["Schedule regular risk tracking reviews at minimum quarterly and involve leadership.", "Subscribe to AI safety alerts or newsletters relevant to K-12 AI tools.", "Require formal documentation of response actions when unanticipated risks are identified."] },
          { from: 4, to: 5, steps: ["Integrate AI risk tracking into the district's enterprise risk management program.", "Develop qualitative tracking approaches for AI risks that cannot yet be measured.", "Produce regular trend analysis reports and share them with leadership and the board."] }
        ]
      },
      {
        name: 'Measurement Feedback and Improvement',
        id: 'MS.4',
        nistRef: 'MEASURE 4',
        subcategories: [
          { id: 'MS.4.1', text: "Measurement approaches for identifying AI risks are connected to deployment contexts and informed through consultation with domain experts and other end users. Approaches are documented." },
          { id: 'MS.4.2', text: "Measurement results regarding AI system trustworthiness in deployment contexts are informed by input from domain experts and relevant AI actors to validate whether the system is performing consistently as intended." },
          { id: 'MS.4.3', text: "Measurable performance improvements or declines based on consultations with relevant AI actors, including affected communities, and field data about context-relevant risks are identified and documented." }
        ],
        levels: {
          "1": "No feedback loop exists between AI measurement results and governance decisions. Measurement activities are disconnected from context, stakeholders, and improvement processes. Evidence of this level: no feedback mechanisms, no use of measurement results to inform decisions.",
          "2": "Some feedback on AI tool performance is gathered informally through teacher observations or verbal reports but is not connected to formal measurement frameworks or used systematically. Evidence of this level: informal performance observations without structured documentation or use.",
          "3": "Measurement approaches are developed with input from domain experts including teachers, counselors, and curriculum specialists. Results are reviewed against the deployment context to validate whether they reflect actual performance. Feedback from relevant stakeholders informs updates to measurement methods. Evidence of this level: documented domain expert input into measurement design, context-validated review records, feedback-informed methodology updates.",
          "4": "Formal feedback loops are documented and scheduled. Domain experts and end users are regularly consulted to validate whether measurement results reflect real-world performance. Measurable performance improvements and declines are tracked, attributed to specific causes, and reported to leadership. Evidence of this level: scheduled consultation records, performance trend documentation with attributed causes, leadership-facing measurement reports.",
          "5": "Measurement efficacy is continuously assessed and improved based on outcomes. Feedback from affected communities including students and parents is incorporated into measurement design and revision. Performance trends across multiple AI systems inform district-wide AI governance strategy. Evidence of this level: community feedback incorporated into measurement methodology, cross-system performance trend analysis, measurement improvement history."
        },
        advancement: [
          { from: 1, to: 2, steps: ["After evaluating an AI tool, share the results with the teachers who use it and ask for their reactions.", "Record any observations about whether your measurement approach captured what mattered."] },
          { from: 2, to: 3, steps: ["Consult with teachers and student support staff when designing measurement approaches for AI tools they use.", "After completing a measurement review, document whether the results matched real-world observations.", "Update your measurement approach if stakeholder input reveals gaps."] },
          { from: 3, to: 4, steps: ["Schedule regular consultations with domain experts to validate measurement results.", "Track performance improvements and declines over time and attribute them to specific causes.", "Report measurement findings to leadership on a regular schedule."] },
          { from: 4, to: 5, steps: ["Engage students and parents in reviewing whether AI measurement approaches are capturing what matters most to them.", "Analyze measurement trends across multiple AI systems to identify district-wide patterns.", "Use measurement insights to improve the district's overall AI governance strategy."] }
        ]
      }
    ]
  },
  {
    name: 'Manage',
    key: 'MANAGE',
    color: '#059669',
    levelDescriptions: {
      "1": "No process exists for prioritizing or responding to AI risks. AI tools remain in use regardless of identified risks with no response planning.",
      "2": "AI risks may be informally discussed but no structured prioritization, response planning, or monitoring exists. Responses are reactive and undocumented.",
      "3": "AI risks are formally prioritized and responded to. Risk response plans, monitoring, and communication procedures are documented and applied to significant AI systems.",
      "4": "Risk management is systematic, enforced, and actively monitored. Third-party AI risks are managed. Incidents are tracked, communicated, and analyzed for improvement.",
      "5": "AI risk management is continuous, integrated with broader district governance, and continuously improved. Decommissioning, incident recovery, and community communication are optimized."
    },
    categories: [
      {
        name: 'Risk Prioritization and Response',
        id: 'MG.1',
        nistRef: 'MANAGE 1',
        subcategories: [
          { id: 'MG.1.1', text: "A determination is made as to whether the AI system achieves its intended purposes and stated objectives and whether its deployment should proceed." },
          { id: 'MG.1.2', text: "Treatment of documented AI risks is prioritized based on impact, likelihood, and available resources or methods." },
          { id: 'MG.1.3', text: "Responses to the AI risks deemed high priority are developed, planned, and documented. Risk response options include mitigating, transferring, avoiding, or accepting." },
          { id: 'MG.1.4', text: "Negative residual risks to downstream acquirers of AI systems and end users are documented." }
        ],
        levels: {
          "1": "No process exists for prioritizing or responding to AI risks. AI tools remain in use regardless of identified risks. No go/no-go decision process exists for AI deployment or continuation. Residual risks are not acknowledged. Evidence of this level: no risk response records, no deployment decision criteria, no residual risk documentation.",
          "2": "AI risks may be informally discussed but no structured prioritization process exists. Responses to risks are reactive and undocumented. Residual risks are not tracked. Evidence of this level: informal risk discussions without documented decisions or response plans.",
          "3": "AI risks identified through MAP and MEASURE are formally prioritized based on impact and likelihood. A documented go/no-go decision process is applied before AI deployment and periodically during operation. Risk responses are documented per system. Residual risks are disclosed to relevant staff. Evidence of this level: risk priority rankings, documented go/no-go decisions, risk response plans per tool, residual risk disclosures.",
          "4": "Risk prioritization is systematic and resource allocation reflects risk levels. High-priority risks trigger immediate documented responses with assigned owners and timelines. Risk treatment effectiveness is monitored and updated. Residual risks are reviewed regularly. Evidence of this level: risk-to-resource allocation records, documented high-priority risk responses with ownership and timelines, treatment effectiveness review records.",
          "5": "Risk prioritization is continuous and adaptive, reflecting real-time performance data. AI systems that fail to achieve their intended purposes are decommissioned promptly through a documented process. Residual risk disclosure is transparent and communicated to affected stakeholders including students, parents, and the board. Evidence of this level: real-time prioritization data, decommissioning records linked to performance criteria, transparent residual risk communications."
        },
        advancement: [
          { from: 1, to: 2, steps: ["List the AI risks identified during MAP and begin discussing which are most concerning.", "For at least one high-concern risk, document what action you plan to take.", "Establish a basic question before deploying any AI tool: Does this tool achieve its intended purpose? Are we comfortable with the risks?"] },
          { from: 2, to: 3, steps: ["Create a risk prioritization process that rates each identified risk by impact and likelihood.", "Document a go/no-go decision for each significant AI tool before or at deployment.", "Define and document a response for each high-priority risk: will you mitigate, transfer, avoid, or accept it?", "Document any residual risks and communicate them to relevant staff."] },
          { from: 3, to: 4, steps: ["Allocate staff time and resources based on risk priority levels.", "Assign an owner and a deadline to each high-priority risk response.", "Periodically review whether risk treatments are working and update them if not.", "Review residual risks at least annually."] },
          { from: 4, to: 5, steps: ["Connect risk prioritization to real-time performance and monitoring data rather than only periodic reviews.", "Create clear criteria and a documented process for decommissioning AI tools that fail to meet their intended purpose.", "Communicate residual risks openly to affected students, parents, and the board."] }
        ]
      },
      {
        name: 'AI Benefit Maximization and Impact Minimization',
        id: 'MG.2',
        nistRef: 'MANAGE 2',
        subcategories: [
          { id: 'MG.2.1', text: "Resources required to manage AI risks are taken into account along with viable non-AI alternative systems, approaches, or methods to reduce the magnitude or likelihood of potential impacts." },
          { id: 'MG.2.2', text: "Mechanisms are in place and applied to sustain the value of deployed AI systems." },
          { id: 'MG.2.3', text: "Procedures are followed to respond to and recover from a previously unknown risk when it is identified." },
          { id: 'MG.2.4', text: "Mechanisms are in place and responsibilities are assigned to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use." }
        ],
        levels: {
          "1": "No strategy exists to maximize AI benefits or minimize harms. Non-AI alternatives are never considered. No mechanism exists to deactivate or override a misbehaving AI system. Evidence of this level: no response procedures, no deactivation protocols, no alternatives analysis.",
          "2": "Some staff informally know how to stop using an AI tool if it causes visible problems, but no documented procedure for deactivation exists. Non-AI alternatives are occasionally considered but not systematically compared. Responses to new or unknown risks are improvised. Evidence of this level: informal tool cessation knowledge without documentation, absence of alternatives analysis or unknown risk response procedure.",
          "3": "Resources required for AI risk management are assessed as part of tool adoption. Non-AI alternatives are formally considered before adoption and documented. A written procedure exists for responding to previously unknown risks when identified. Defined mechanisms with assigned responsible parties enable deactivation of AI systems that perform inconsistently. Evidence of this level: alternatives analysis records, unknown risk response procedure, named responsible parties for deactivation, value-sustaining strategies.",
          "4": "Non-AI alternatives are systematically evaluated in every AI adoption decision. Deactivation procedures are tested at least annually. Previously unknown risk responses are followed and documented with root cause analysis. Value-sustaining mechanisms include regular performance reviews and vendor accountability measures. Evidence of this level: systematic alternatives analysis, tested deactivation records, documented unknown risk responses with root cause, vendor performance reviews.",
          "5": "Benefit and harm management is continuously optimized based on real-world performance data. Deactivation capabilities are automated for critical failure scenarios and can be executed district-wide rapidly. Unknown risk response procedures are practiced regularly and refined. Evidence of this level: automated deactivation records, practiced and refined unknown risk response records, benefit trend data over time."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Identify who is responsible for deciding to stop using an AI tool if it causes problems.", "Write a brief note for each AI tool describing what would trigger you to discontinue it.", "When evaluating a new AI tool, briefly consider whether a non-AI approach could achieve the same goal."] },
          { from: 2, to: 3, steps: ["Formally consider and document non-AI alternatives before approving any new AI tool.", "Create a written procedure for what to do when a new or unknown risk is discovered mid-deployment.", "Define who can authorize deactivation of each AI tool and document this clearly."] },
          { from: 3, to: 4, steps: ["Test your deactivation procedure for at least one AI tool annually.", "When an unknown risk is discovered, follow your procedure and document the root cause.", "Review vendor contracts for provisions that support value-sustaining accountability."] },
          { from: 4, to: 5, steps: ["Implement automated deactivation capabilities for high-risk AI tools.", "Regularly practice unknown risk response scenarios with relevant staff.", "Collect and report data showing how AI tool benefit delivery has changed over time."] }
        ]
      },
      {
        name: 'Third-Party AI Risk Management',
        id: 'MG.3',
        nistRef: 'MANAGE 3',
        subcategories: [
          { id: 'MG.3.1', text: "AI risks and benefits from third-party resources are regularly monitored, and risk controls are applied and documented." },
          { id: 'MG.3.2', text: "Pre-trained models which are used for development are monitored as part of AI system regular monitoring and maintenance." }
        ],
        levels: {
          "1": "Third-party AI vendors are not monitored after procurement. The district has no visibility into how vendor AI models change over time. Pre-trained models embedded in district-used tools are unknown or not considered. Evidence of this level: no vendor monitoring records, no awareness of pre-trained model usage.",
          "2": "Some awareness exists that third-party AI vendors release updates, but monitoring is informal and inconsistent. Pre-trained models embedded in tools are known to exist but are not tracked or reviewed. Risk controls for third-party AI are applied inconsistently. Evidence of this level: informal vendor awareness without systematic monitoring or pre-trained model tracking.",
          "3": "Third-party AI risks are monitored through vendor communications, security advisories, and contract review cycles. Risk controls are documented per vendor. Pre-trained models used in district AI systems are identified and included in the regular monitoring process. Evidence of this level: vendor monitoring records, documented risk controls per vendor, pre-trained model inventory with monitoring inclusion.",
          "4": "Third-party AI monitoring is active and systematic. Vendor risk changes trigger documented reviews and may result in contract action. Pre-trained model updates are assessed for impact on trustworthiness before deployment in district systems. Evidence of this level: documented responses to vendor risk changes, pre-trained model update review records, contract action documentation.",
          "5": "Third-party AI risk management is continuous and proactive. Automated monitoring flags material vendor changes. Contract terms require vendors to proactively notify the district of significant AI system changes. Pre-trained model governance is integrated into the full AI risk lifecycle from MAP through MANAGE. Evidence of this level: automated monitoring alerts, vendor notification compliance records, pre-trained model governance integration documentation."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Subscribe to update notifications or security advisories for the AI vendors the district uses most.", "Identify which AI tools use pre-trained models from external providers such as large language models.", "Document which vendor is responsible for each AI tool and what type of AI it uses."] },
          { from: 2, to: 3, steps: ["Establish a monitoring process for each significant AI vendor, reviewing communications and advisories at least quarterly.", "Document the risk controls applied to each vendor.", "Add pre-trained models to your AI tool inventory and include them in regular monitoring."] },
          { from: 3, to: 4, steps: ["Define what types of vendor changes would trigger a formal risk review or contract action.", "When a significant vendor risk is identified, document your review and the outcome.", "Require vendors to disclose material updates to pre-trained models used in district tools."] },
          { from: 4, to: 5, steps: ["Implement automated monitoring for high-risk vendors where feasible.", "Add vendor notification obligations into all new AI-related contracts.", "Integrate pre-trained model governance into your MAP, MEASURE, and MANAGE processes as a connected workflow."] }
        ]
      },
      {
        name: 'Risk Treatment, Communication, and Continuous Improvement',
        id: 'MG.4',
        nistRef: 'MANAGE 4',
        subcategories: [
          { id: 'MG.4.1', text: "Post-deployment AI system monitoring plans are implemented, including mechanisms for capturing and evaluating input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery, and change management." },
          { id: 'MG.4.2', text: "Measurable activities for continual improvements are integrated into AI system updates and include regular engagement with interested parties." },
          { id: 'MG.4.3', text: "Incidents and errors are communicated to relevant AI actors, including affected communities. Processes for tracking, responding to, and recovering from incidents and errors are followed and documented." }
        ],
        levels: {
          "1": "No post-deployment monitoring plan exists for any AI system. AI incidents are not recognized, communicated, or documented. No improvement process exists. Affected communities are not notified when AI systems cause harm. Evidence of this level: no monitoring plan, no incident records, no communication process, no improvement documentation.",
          "2": "Some post-deployment monitoring occurs informally through teacher feedback. Incidents are sometimes addressed when staff escalate them, but no formal tracking, communication process, or improvement cycle exists. Evidence of this level: informal incident response without formal tracking or communication standards.",
          "3": "Post-deployment monitoring plans are implemented for significant AI systems. Mechanisms for user input, appeal, override, and decommissioning are documented. A defined process exists for tracking and responding to AI incidents. Affected communities are notified of significant incidents. Improvement activities are documented following incidents and reviews. Evidence of this level: documented monitoring plans per significant system, incident tracking log, community notification records, improvement documentation.",
          "4": "Monitoring plans are comprehensive, actively maintained, and reviewed on a defined schedule. Continual improvement activities are tracked, assigned, and reported to leadership. Incident communication is timely, audience-appropriate, and includes actionable guidance. Recovery from incidents is documented and analyzed for root cause. Evidence of this level: maintained monitoring plans with review dates, assigned improvement activities with completion records, incident communications with documented timelines, root cause analyses.",
          "5": "Post-deployment governance is fully integrated into the AI system lifecycle. Improvement activities are continuously embedded in system updates rather than completed as one-time fixes. Incident communication is rapid, transparent, and tailored to each affected audience. Recovery lessons are systematically applied to prevent recurrence across all AI systems in the district. Evidence of this level: system update logs showing continuous improvement integration, rapid incident communication records, cross-system recurrence prevention documentation."
        },
        advancement: [
          { from: 1, to: 2, steps: ["Identify who is responsible for monitoring each AI system after it is deployed.", "Create a basic way for staff to report AI incidents or issues.", "When an AI incident occurs, write a brief record of what happened and how it was resolved."] },
          { from: 2, to: 3, steps: ["Develop a monitoring plan for each significant AI system that describes what will be observed, by whom, and how often.", "Create a formal incident tracking log with fields for: description, system, date, resolution, and communication sent.", "Write a basic communication template for notifying affected students, parents, or staff when an AI incident occurs.", "Document improvement actions taken after each significant incident or review."] },
          { from: 3, to: 4, steps: ["Review and update all monitoring plans on a defined annual schedule.", "Assign owners and deadlines to all improvement activities and track them to completion.", "Conduct root cause analyses for significant AI incidents.", "Report improvement activities and incident trends to leadership regularly."] },
          { from: 4, to: 5, steps: ["Integrate improvement activities directly into AI system update cycles rather than treating them as separate projects.", "Create rapid communication protocols that can notify affected audiences within a defined timeframe after an AI incident.", "Analyze incidents across all AI systems to identify systemic issues and address them district-wide."] }
        ]
      }
    ]
  }
];

export const CAGR_METADATA = {
  title: 'CyberReady AI Governance Rubric',
  version: '1.0',
  shortName: 'CAGR',
  nistReference: 'NIST AI RMF 1.0 (NIST AI 100-1)',
  totalFunctions: 4,
  totalCategories: 19,
  totalSubcategories: 58,
  scoringMethod: 'Category scores averaged to function scores; function scores averaged to overall CAGR score.',
  maturityLevels: {
    1: 'Initial', 2: 'Repeatable', 3: 'Defined',
    4: 'Managed', 5: 'Optimized'
  },
};
