export const categories = [
  "All",
  "Governance",
  "AI Governance",
  "Digital Resilience",
  "Workforce",
  "Current Events",
] as const;

export type ArticleCategory = Exclude<(typeof categories)[number], "All">;

export type Article = {
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  slug: string;
  body: string[];
};

export const categoryColors: Record<ArticleCategory, string> = {
  Governance: "bg-blue-100 text-blue-800",
  "AI Governance": "bg-purple-100 text-purple-800",
  "Digital Resilience": "bg-emerald-100 text-emerald-800",
  Workforce: "bg-amber-100 text-amber-800",
  "Current Events": "bg-rose-100 text-rose-800",
};

export const articles: Article[] = [
  {
    title: "Instructure, Canvas, and the K-12 Vendor Governance Wake-Up Call",
    excerpt:
      "The Instructure/Canvas security incident reinforces why school districts need structured vendor governance, executive cyber visibility, and AI/data risk readiness before incidents become board-level crises.",
    category: "Current Events",
    date: "May 2026",
    slug: "instructure-canvas-vendor-governance",
    body: [
      "Instructure has confirmed a cybersecurity incident involving some Canvas user information and messages. Public reporting says the threat actor ShinyHunters claimed approximately 275 million users and nearly 9,000 schools may have been affected. Those figures should be treated as claims from public reporting unless and until independently verified, but the governance lesson is already clear for K-12 leaders.",
      "Large-scale education-sector incidents involving third-party platforms reinforce the need for structured governance, vendor risk visibility, and institutional cyber readiness within K-12 environments. Districts rely on learning management systems, student information systems, assessment platforms, communication tools, and AI-enabled services to operate. When those systems become part of an incident, the district still has to communicate, make decisions, respond to community concern, and demonstrate that it has a governance process.",
      "CyberReady does not claim that a governance system would prevent an incident at a third-party vendor. The more practical point is readiness. Districts need to know which vendors hold sensitive data, which contracts include data processing and notification obligations, which executives are responsible for oversight, and how board-level reporting will occur when a vendor incident becomes a district concern.",
      "The Instructure/Canvas incident also shows why AI and data governance are converging with cybersecurity governance. Many education platforms now include analytics, automation, integrations, or AI-adjacent data flows. Vendor review can no longer be limited to basic procurement approval. Districts need structured questions about data access, sub-processors, model training restrictions, human oversight, incident notification, and continuity planning.",
      "For buyers evaluating CyberReady, the current-event relevance is straightforward. CyberReady packages CoSN CCRE-aligned cybersecurity assessment, CAGR AI-governance assessment, CAIRE evidence review, and Hall Monitor reporting into a governance workflow that helps districts organize these questions before an incident forces them into view. The opportunity is not to promise prevention. It is to provide repeatable structure for visibility, readiness, accountability, and improvement.",
    ],
  },
  {
    title: "AI Governance Before AI Tools: Why Districts Need the Framework First",
    excerpt:
      "Districts do not need another AI policy template before they know which tools are in use, what data they touch, who oversees them, and what evidence supports continued use.",
    category: "AI Governance",
    date: "April 20, 2026",
    slug: "ai-governance-before-ai-tools",
    body: [
      "AI adoption in school districts is moving faster than governance. Teachers experiment with classroom assistants, administrators test productivity tools, vendors add AI features to existing platforms, and students encounter AI systems across learning, assessment, communication, and support services. A policy document is useful, but a policy alone cannot tell leadership which tools are active, what student data they touch, or whether human oversight is actually happening.",
      "The first governance task is inventory. Districts need to identify approved and unapproved AI tools, vendor ownership, data access, intended use, affected users, and the human role in each workflow. Without that baseline, leadership cannot distinguish low-risk productivity use from systems that influence instruction, services, assessment, discipline, or student support. Inventory turns AI from a vague concern into a manageable governance object.",
      "The second task is context. AI tools should be reviewed according to how they are used inside the district, not only according to vendor marketing language. A tool used by staff for drafting meeting notes presents a different risk profile than a tool used to personalize student learning recommendations. Governance depends on intended use, data sensitivity, stakeholder impact, and the district's tolerance for error.",
      "The third task is evidence. Districts need documentation showing why a tool was approved, what privacy and bias concerns were reviewed, which stakeholders were consulted, and what ongoing monitoring will occur. This is where CyberReady's CAIRE methodology supports the CAGR rubric. CAGR provides the maturity categories, while CAIRE gives reviewers a process for collecting notes, interview evidence, and board-ready findings.",
      "For a buyer, this creates a clear platform opportunity. CyberReady helps move AI governance from policy language to operational workflow. Districts can document tools, score maturity, identify gaps, and communicate risk in a structure aligned to the NIST AI RMF. That structure matters because AI oversight is becoming a district leadership issue, not only a technology department concern.",
    ],
  },
  {
    title: "The 11 Percent Problem: Formal AI Vetting Is Still Rare in K-12",
    excerpt:
      "When only a small share of districts have formal AI tool vetting, student data privacy, vendor risk, bias review, and human oversight become leadership issues instead of optional IT tasks.",
    category: "AI Governance",
    date: "April 12, 2026",
    slug: "formal-ai-vetting-k12",
    body: [
      "A recurring market signal in K-12 technology is that formal AI vetting remains early and uneven. Many districts are aware that AI tools are entering classrooms and operations, yet only a limited share have a repeatable approval process that covers data privacy, vendor review, human oversight, bias, safety, and ongoing monitoring. The exact percentage will vary by survey and year, but the governance pattern is consistent.",
      "This creates a practical problem for district leadership. If AI tools are reviewed informally, approval depends on who happens to see the tool, how much time they have, and whether the vendor's claims are accepted at face value. That is not a sustainable governance model for systems that may process student data, influence instruction, or introduce opaque decision support into educational settings.",
      "Formal AI vetting does not need to be complicated to be valuable. Districts need a structured intake process, an AI tool inventory, required privacy and DPA review, a human oversight model, documentation of intended use, and a clear decision record. They also need a way to revisit tools after deployment because vendor features, data flows, and AI capabilities can change over time.",
      "CyberReady's CAGR rubric gives districts a maturity structure for this work. It translates NIST AI RMF concepts into categories that K-12 leaders can understand and evaluate. CAIRE then provides an evidence-review process, including notes, interviews, documentation review, and advancement guidance. Together, they turn AI vetting into a repeatable assessment workflow.",
      "The buyer opportunity is not limited to software. CyberReady can support consulting, managed service, or platform-led delivery models. Organizations that already serve schools can use the framework to offer structured AI governance reviews, build executive reports, and help districts move from informal awareness to documented readiness.",
    ],
  },
  {
    title: "How CAGR Aligns District AI Governance to the NIST AI RMF",
    excerpt:
      "The CyberReady AI Governance Rubric translates the NIST AI RMF functions GOVERN, MAP, MEASURE, and MANAGE into a K-12 maturity model that districts can evaluate and improve.",
    category: "AI Governance",
    date: "April 4, 2026",
    slug: "cagr-nist-ai-rmf",
    body: [
      "The NIST AI Risk Management Framework gives organizations a useful structure for trustworthy AI governance, but districts need that structure translated into practical questions, maturity levels, evidence expectations, and improvement steps. CAGR, the CyberReady AI Governance Rubric, was built to make that translation usable for K-12 environments.",
      "CAGR follows the four core AI RMF functions: GOVERN, MAP, MEASURE, and MANAGE. GOVERN focuses on accountability, policy, organizational culture, stakeholder engagement, and third-party governance. MAP focuses on intended use, context, categorization, AI components, and impact characterization. MEASURE evaluates methods, metrics, trustworthy AI characteristics, risk tracking, and feedback loops. MANAGE addresses prioritization, response, third-party risk, communication, incidents, and continuous improvement.",
      "The value of a maturity rubric is that it gives leadership a path. A district may begin with informal AI awareness and partial tool lists, then advance toward documented policy, formal inventory, risk classification, monitoring, and board reporting. This is more useful than a yes-or-no checklist because it shows both current posture and what needs to change next.",
      "CAGR is paired with CAIRE, CyberReady's AI-governance evidence-review methodology. CAIRE helps reviewers collect evidence, interview stakeholders, document notes, and determine whether a maturity level is supported. That distinction matters because a district can claim to have AI governance, but governance maturity should be supported by policy, process, ownership, review cycles, and documented decisions.",
      "For buyers, CAGR creates a defensible AI governance product layer. It aligns to a recognized national framework while remaining specific enough for K-12. It can support district self-assessment, third-party evaluation, managed governance services, or a broader platform that combines cybersecurity and AI oversight in one executive reporting system.",
    ],
  },
  {
    title: "Why CAIRE Matters for Evidence-Based AI Governance",
    excerpt:
      "CAIRE gives districts an evidence-review workflow for documenting AI-governance maturity with evidence, interviews, tool documentation, and board-ready findings.",
    category: "AI Governance",
    date: "March 30, 2026",
    slug: "caire-evidence-based-ai-governance",
    body: [
      "AI governance maturity cannot be validated by asking whether a district has an AI policy. A policy may exist without an inventory, a vendor review process, a human oversight model, or evidence that staff understand how the policy applies to actual tools. CAIRE exists to bring evidence discipline to AI governance evaluation.",
      "CAIRE mirrors the logic of evidence-based cybersecurity assessment. It asks reviewers to review documentation, interview responsible stakeholders, record notes, identify gaps, and connect findings to a maturity rubric. In CyberReady, the rubric is CAGR. The methodology is CAIRE. That pairing makes AI governance measurable without reducing it to a shallow checklist.",
      "Evidence matters because AI governance claims can be easy to overstate. A district may say that it reviews vendors, but the reviewer needs to see whether AI-specific DPA language is required, whether model training restrictions are addressed, and whether sub-processors are reviewed. A district may say that staff supervise AI tools, but the reviewer needs to understand what human oversight means for each system.",
      "CAIRE also helps boards. School boards and superintendents do not need raw technical detail from every AI system. They need a clear summary of governance posture, key risks, evidence gaps, and improvement priorities. CAIRE creates a workflow for moving from interviews and evidence to board-ready findings.",
      "For acquisition evaluation, CAIRE is important because it gives CyberReady more than a content library. It gives the platform an evidence-review process that can be operationalized by a buyer. A cybersecurity firm, GRC provider, EdTech organization, or AI-governance operator could use CAIRE to package AI-governance reviews as a repeatable service or platform workflow.",
    ],
  },
  {
    title: "Why Cyber Governance Belongs in the Boardroom, Not the Server Room",
    excerpt:
      "School boards are ultimately accountable for cybersecurity posture, yet most governance conversations never leave the IT department. A structured evaluation framework changes that dynamic by translating technical risk into leadership-ready language.",
    category: "Governance",
    date: "March 28, 2026",
    slug: "cyber-governance-boardroom",
    body: [
      "Cybersecurity in K-12 is often discussed as an IT problem because the visible controls are technical: firewalls, endpoint tools, identity systems, backups, and monitoring. But the consequences of a cyber incident are institutional. A ransomware outage can disrupt instruction, payroll, transportation, food service, special education support, and public trust. Those consequences belong in governance conversations.",
      "School boards do not need to configure security tools. They need to understand whether the district has a documented risk strategy, clear accountability, current policies, vendor oversight, incident response planning, recovery objectives, and measurable improvement priorities. Without a structured framework, cybersecurity updates can become isolated technical briefings rather than governance oversight.",
      "A maturity model changes the conversation. Instead of asking whether the district is secure, leaders can ask where the district sits across specific governance functions. Are roles defined? Are policies current? Are risks assessed? Are vendors reviewed? Are response plans tested? Are recovery communications documented? These questions create a shared language between technical staff and executive leadership.",
      "CyberReady uses CCRE-aligned cybersecurity assessment to make that language visible. Hall Monitor then turns ratings, findings, and recommendations into dashboards and executive summaries. The goal is not to replace IT judgment. It is to give leadership the visibility needed to make funding, policy, oversight, and improvement decisions responsibly.",
      "For buyers, boardroom relevance is central to CyberReady's value. The platform packages cybersecurity as an executive governance problem, not only a technical operations problem. That makes it applicable to consulting, risk advisory, insurance readiness, managed service, and education leadership markets.",
    ],
  },
  {
    title: "AI Systems in Schools: The Governance Gap Districts Can't Ignore",
    excerpt:
      "Districts are rapidly adopting AI-powered tools for instruction, assessment, and operations. But without governance structures to evaluate these systems, schools face mounting risks around bias, data privacy, and accountability.",
    category: "AI Governance",
    date: "March 14, 2026",
    slug: "ai-governance-gap-schools",
    body: [
      "AI systems are entering schools through obvious and subtle channels. Some are standalone generative AI tools. Others are embedded in learning platforms, productivity suites, tutoring tools, analytics dashboards, assessment products, or communication systems. Districts may not always know when a familiar vendor has added AI features to an existing contract.",
      "That creates a governance gap. If a district lacks an AI tool inventory, it may not know which systems use student data, which staff rely on automated outputs, which tools require human review, and which vendors use third-party models or sub-processors. The gap is not only technical. It is organizational, legal, instructional, and ethical.",
      "The key governance questions are practical. What is the tool supposed to do? Who uses it? What data does it access? Can the vendor train models on district data? What are the known limitations? Who reviews outputs? How are bias, privacy, and safety evaluated? What happens if the tool changes or fails?",
      "CyberReady addresses this gap through CAGR and CAIRE. CAGR organizes AI-governance maturity across NIST AI RMF functions. CAIRE gives reviewers a way to document maturity through evidence. Hall Monitor provides a place to document AI systems, ratings, notes, and improvement guidance so governance can become operational rather than aspirational.",
      "For qualified buyers, the AI governance gap represents a market opening. Districts need help turning broad AI concern into repeatable process. CyberReady offers a starting point for that need: a rubric, methodology, application layer, and buyer handoff package that can be expanded into a product or service line.",
    ],
  },
  {
    title: "Building Digital Resilience: Lessons from the PowerSchool Breach",
    excerpt:
      "The PowerSchool breach exposed how vendor dependency and limited incident response planning leave districts vulnerable. Digital resilience requires more than firewalls; it demands governance maturity across every operational layer.",
    category: "Digital Resilience",
    date: "February 26, 2026",
    slug: "digital-resilience-powerschool",
    body: [
      "The PowerSchool breach became a major reminder that K-12 digital resilience depends on more than local network controls. Districts rely on vendors for student information, learning management, transportation, communication, assessment, and operations. When a vendor incident occurs, district leaders still have to understand exposure, communicate with families, coordinate response, and answer governance questions.",
      "Digital resilience begins with visibility. Districts need to know which vendors are critical, what data each vendor holds, what contractual obligations apply, and which systems are essential for continuity. Vendor inventories, data processing agreements, incident notification requirements, and escalation procedures are governance artifacts, not paperwork extras.",
      "Resilience also depends on tested process. A district may have backups and security tools, but if leadership has not rehearsed communication, recovery prioritization, legal notification, and board reporting, the response will be improvised. Improvisation increases operational stress at exactly the moment when clarity matters most.",
      "CyberReady's CCRE-aligned cybersecurity assessment evaluates governance categories such as policy, oversight, vendor risk management, incident response, mitigation, recovery, and communication. These categories help districts see resilience as a lifecycle. The goal is to prepare before a vendor or district incident becomes a public crisis.",
      "For buyers, digital resilience is a strong positioning theme because it connects cybersecurity, vendor governance, insurance readiness, and executive reporting. CyberReady can support a repeatable approach for helping districts document readiness, prioritize improvements, and communicate posture to leadership.",
    ],
  },
  {
    title: "From Classroom to Career: Rethinking Cybersecurity Workforce Pipelines",
    excerpt:
      "The cybersecurity talent gap will not close with four-year degrees alone. Building workforce pathways that start in K-12 education creates scalable routes into governance, risk, compliance, and digital resilience roles.",
    category: "Workforce",
    date: "February 10, 2026",
    slug: "cybersecurity-workforce-pipelines",
    body: [
      "Cybersecurity workforce conversations often focus on technical roles, but the field also needs people who can understand governance, risk, compliance, vendor oversight, policy, incident coordination, and executive communication. These skills are teachable before students enter college or the workforce, especially when framed through real institutional problems.",
      "K-12 workforce pathways can introduce students to how organizations manage cyber and AI risk. Students can learn why policies matter, how data moves through vendors, what incident response looks like, and how leaders make decisions under uncertainty. This does not replace technical training. It expands the definition of cyber readiness careers.",
      "CyberReady's workforce pathway is positioned as an optional expansion layer. It can support education service offerings, district programming, statewide initiatives, or employer-aligned learning models. The core acquisition asset remains the governance platform and assessment system, but the workforce layer gives buyers a way to connect platform credibility to talent development.",
      "The pathway is especially relevant because AI governance is becoming part of digital resilience. Future professionals will need to understand model risk, human oversight, privacy, bias, vendor AI claims, and accountability. Introducing these concepts early can help create a broader pipeline into GRC and AI governance roles.",
      "For buyers, the workforce pathway is not a required operating dependency. It is a flexible asset that can be adapted to market strategy. A buyer focused on services may use it for training. A buyer focused on EdTech may use it for curriculum. A buyer focused on platform growth may keep it as a thought leadership and expansion layer.",
    ],
  },
  {
    title: "State Privacy Laws and School District Cyber Governance",
    excerpt:
      "State privacy laws, FERPA, COPPA, and vendor data obligations are converging into a broader governance challenge for school districts handling sensitive student and staff information.",
    category: "Governance",
    date: "January 22, 2026",
    slug: "kcdpa-kentucky-school-districts",
    body: [
      "School districts operate inside a complex data environment. FERPA, COPPA, state privacy laws, procurement rules, data processing agreements, and cybersecurity expectations all shape how student and staff information should be handled. The challenge is that these obligations are often distributed across legal, technology, curriculum, and administrative teams.",
      "Governance turns distributed obligations into an operating model. Districts need to know who owns vendor review, who approves data sharing, how contracts are evaluated, how staff are trained, and how exceptions are documented. Without that structure, privacy compliance can become reactive and fragmented.",
      "State privacy laws add urgency because they can introduce new expectations around consumer rights, data handling, vendor obligations, or breach response. Even when a particular law does not apply directly to every school district function, it can signal where public expectations are moving. Districts benefit from a governance model that can adapt as legal requirements evolve.",
      "CyberReady's CoSN CCRE-aligned and CAIRE workflows help districts connect privacy to cybersecurity and AI governance. Vendor risk management, data security, oversight, incident communication, and AI tool review are related practices. A district that treats each requirement as a separate checklist will struggle to build lasting readiness.",
      "For a buyer, privacy convergence supports CyberReady's acquisition value. The platform gives operators a way to package governance reviews around school district realities: data, vendors, AI, cybersecurity, leadership reporting, and improvement planning. That is more durable than a single compliance checklist tied to one law.",
    ],
  },
  {
    title: "Maturity Models vs. Compliance Checklists: Why the Approach Matters",
    excerpt:
      "Compliance checklists confirm minimum standards. Maturity models reveal where you stand and where you need to go. For school districts building long-term cybersecurity posture, the distinction is critical.",
    category: "Governance",
    date: "January 8, 2026",
    slug: "maturity-models-vs-compliance",
    body: [
      "Compliance checklists have value. They help organizations confirm whether required controls, documents, or processes are present. But a checklist is often binary. It can tell a district whether a policy exists, but not whether the policy is current, communicated, enforced, reviewed, or embedded in daily operations.",
      "Maturity models answer a different question. They show progression. A district may begin with informal practices, then move toward documented processes, leadership oversight, measurement, enforcement, and continuous improvement. This is especially useful for school districts because governance capacity often develops over time rather than appearing all at once.",
      "Cybersecurity and AI-governance maturity models use staged practices to distinguish between ad hoc awareness, repeatable practices, defined procedures, managed oversight, and optimized governance. This gives leadership a more accurate view of posture and a clearer improvement path.",
      "Maturity models also support better investment decisions. If a district is weak in incident communication, vendor risk, or AI inventory, leadership can prioritize funding and staff time around those gaps. If a district is stronger in training but weaker in recovery planning, the roadmap can reflect that reality. Checklists rarely produce that level of strategic direction.",
      "For acquisition purposes, maturity modeling is one of CyberReady's strongest platform concepts. It creates repeatable assessments, longitudinal scoring, executive dashboards, and service opportunities. It also supports a more credible buyer story: CyberReady helps districts improve governance over time, not simply pass a one-time checklist.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug) ?? null;
}
