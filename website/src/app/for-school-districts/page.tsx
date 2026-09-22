import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "For School Districts",
  description:
    "CyberReady includes structured cybersecurity and AI-governance assessment workflows with leadership reporting for school district leaders. CCRE-aligned assessment, CAGR, CAIRE, and Hall Monitor.",
  openGraph: {
    title: "Cybersecurity and AI Governance for School Districts | CyberReady",
    description:
      "Structured cybersecurity and AI governance evaluation for superintendents, school boards, and district administrators.",
  },
};

const challenges = [
  {
    stat: "Ransomware and vendor risk",
    text: "District leaders need a documented way to discuss cyber exposure, vendor dependencies, response planning, and governance responsibilities.",
  },
  {
    stat: "Student-data stewardship",
    text: "School systems manage sensitive student and staff information across many internal and third-party systems.",
  },
  {
    stat: "Insurance questionnaires",
    text: "Insurance carriers may request evidence of controls and governance practices; coverage and underwriting decisions remain with each carrier.",
  },
  {
    stat: "Unchecked AI",
    text: "AI tools are entering classrooms and offices faster than districts can inventory, vet, or govern them.",
  },
  {
    stat: "AI governance gaps",
    text: "Districts may need a repeatable way to document tool inventory, privacy considerations, human oversight, and decision records.",
  },
  {
    stat: "Unanswered questions",
    text: "Board members are asking about cyber readiness and AI oversight, but most districts lack a structured way to measure, report, or improve their posture.",
  },
  {
    stat: "Changing requirements",
    text: "Privacy, procurement, and cybersecurity obligations vary by jurisdiction and organization; legal applicability requires district-specific review.",
  },
  {
    stat: "Stretched IT teams",
    text: "District technology staff are managing day-to-day operations and have limited capacity for governance planning, policy alignment, or board-level reporting.",
  },
];

const aiGovernanceCards = [
  {
    title: "AI Tool Inventory",
    description:
      "Document which AI systems are in use, who owns them, what data they access, and where they sit in the AI lifecycle.",
  },
  {
    title: "Vendor and DPA Review",
    description:
      "Record vendor, data-use, model-training, sub-processor, and agreement considerations for the district's own review process.",
  },
  {
    title: "Human Oversight",
    description:
      "Define whether each AI system requires human-in-loop, human-on-loop, or automated oversight and document who is accountable.",
  },
  {
    title: "Bias, Privacy, and Safety Review",
    description:
      "Assess AI tools for privacy exposure, harmful bias, safety risks, transparency, and reliability using the CAGR rubric.",
  },
  {
    title: "Board-Ready AI Governance Reporting",
    description:
      "Translate AI tool risk, evidence, maturity scores, and improvement priorities into leadership-ready reporting through Hall Monitor.",
  },
];

const governanceEcosystem = [
  "CoSN CCRE-aligned cybersecurity assessment",
  "CAGR AI governance assessment",
  "CAIRE evidence-review workflow",
  "Hall Monitor board reporting",
];

const audiences = [
  {
    role: "Superintendents",
    description:
      "District leaders need strategic visibility into cyber posture without digging through technical reports. CyberReady includes maturity scoring, gap analysis, and board-ready summaries for governance and diligence workflows.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
  },
  {
    role: "School Board Members",
    description:
      "Governance oversight requires evidence, not assumptions. CyberReady includes structured findings summaries and maturity assessments that support board-level visibility into student data protection.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    role: "District Technology Directors",
    description:
      "Technology teams understand the operational landscape but need a structured assessment framework to translate technical realities into governance language. CyberReady bridges that gap with NIST-aligned evaluation and clear maturity benchmarks.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
      </svg>
    ),
  },
  {
    role: "District Administrators",
    description:
      "CyberReady includes governance artifacts, evidence trails, and structured reporting that can support a district&apos;s internal preparation for auditors, insurers, and applicable requirements.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
];

const deliverables = [
  {
    title: "Leadership Visibility",
    description:
      "Clear maturity scoring across all six NIST CSF functions gives district leaders an honest picture of where they stand and where the gaps are, without needing to interpret raw technical data.",
  },
  {
    title: "Board Reporting",
    description:
      "Structured findings summaries are designed for board presentations. Each report translates assessment results into governance language that board members can act on with confidence.",
  },
  {
    title: "Policy Readiness",
    description:
      "Evaluations map directly to NIST Govern, Identify, Protect, Detect, Respond, and Recover functions, making it clear which governance policies are in place and which need development.",
  },
  {
    title: "Audit Alignment",
    description:
      "Evidence-based documentation built during the assessment process can support a district&apos;s own preparation for auditor or insurance-carrier questions; it is not a coverage or compliance determination.",
  },
  {
    title: "Student Data Protection",
    description:
      "The workflow includes governance questions concerning student-record protection, FERPA considerations, and vendor-management practices. It does not determine legal compliance.",
  },
  {
    title: "Improvement Planning",
    description:
      "The workflow supports documented improvement recommendations that can be prioritized by a district according to impact and feasibility.",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Initial Evaluation",
    description:
      "The process begins with a structured CoSN CCRE-aligned cybersecurity assessment, establishing baseline maturity across all NIST CSF functions.",
  },
  {
    step: 2,
    title: "Stakeholder Interviews & Evidence Collection",
    description:
      "The workflow supports interviews with district leadership, technology staff, and relevant stakeholders. Documentation and evidence can be recorded to support documented governance findings.",
  },
  {
    step: 3,
    title: "Findings Summary & Maturity Assessment",
    description:
      "Assessment results are compiled into a comprehensive findings summary with maturity scores, identified gaps, and prioritized areas for improvement across all governance domains.",
  },
  {
    step: 4,
    title: "Board-Ready Reporting via Hall Monitor",
    description:
      "Results are organized through Hall Monitor, the CyberReady reporting dashboard. Leadership and board members get a clear, visual representation of the district's cyber governance posture.",
  },
  {
    step: 5,
    title: "Improvement Roadmap Development",
    description:
      "The workflow supports an improvement roadmap with objectives a district can prioritize by risk impact and implementation feasibility.",
  },
  {
    step: 6,
    title: "Ongoing Progress Tracking & Re-evaluation",
    description:
      "The platform stores assessment history and supports periodic re-evaluation so districts can review progress against an earlier baseline.",
  },
];

const evidenceStats = [
  {
    figure: "K–12 context",
    label: "District governance use case",
    detail:
      "The product is designed around school-district leadership, technology, vendor, policy, and reporting workflows.",
  },
  {
    figure: "Legal review",
    label: "Jurisdiction-specific obligations",
    detail:
      "A buyer or district should determine applicable privacy, education, procurement, and cybersecurity obligations with counsel.",
  },
  {
    figure: "Evidence",
    label: "Documented governance records",
    detail:
      "Hall Monitor stores assessment notes, findings, selected maturity ratings, and reports; it does not replace security controls or incident response services.",
  },
  {
    figure: "Buyer opportunity",
    label: "Strategic expansion",
    detail:
      "A strategic operator may extend the platform through its own security services, integrations, identity capabilities, and K–12 distribution.",
  },
];

export default function ForSchoolDistrictsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-blue-900)_0%,_transparent_60%)] opacity-40" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
              For School Districts
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Cybersecurity and AI Governance for School District Leaders
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Superintendents, school boards, and district administrators need
              structured answers about cyber readiness, cyber insurance,
              unchecked AI adoption, student data privacy, and board oversight.
              CyberReady includes the evaluation framework, maturity reporting,
              and governance documentation that K-12 leadership demands.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" size="lg" variant="primary">
                Acquisition Details
              </Button>
              <Button href="/platform" size="lg" variant="outline" className="border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white">
                Explore the Platform
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* The Challenge */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            label="The Challenge"
            title="K-12 Is the Most Targeted Sector in the Country"
            description="School districts hold vast amounts of sensitive student data, face ransomware and cyber insurance pressure, and now must govern AI tools that may enter classrooms before formal vetting exists."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((item) => (
              <Card key={item.stat} hover>
                <p className="text-2xl font-bold text-navy-900">{item.stat}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* AI Governance Issue */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            label="AI Governance"
            title="AI Governance Is Now a District Leadership Issue"
            description="AI adoption is no longer limited to pilots or innovation teams. District leaders need an evidence-based way to inventory tools, review vendors, document human oversight, and report governance maturity to the board."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {aiGovernanceCards.map((item) => (
              <Card key={item.title} hover>
                <h3 className="text-base font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="text-lg font-bold text-navy-900">
              The CyberReady Governance Ecosystem
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              CoSN CCRE-aligned assessment supports cybersecurity-maturity
              review. CAGR structures AI-governance maturity review. CAIRE
              provides an evidence-review workflow for notes and findings.
              Hall Monitor keeps maturity, reporting, indicative
              insurance-readiness inputs, and improvement planning visible to
              district leadership.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {governanceEcosystem.map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Who This Is For */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <SectionHeading
            label="Who This Is For"
            title="Built for the People Responsible for District Governance"
            description="CyberReady is designed for the leaders who are accountable for student data protection, operational resilience, and governance oversight at the district level."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {audiences.map((item) => (
              <Card key={item.role} hover className="flex flex-col">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-navy-900">
                  {item.role}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 flex-1">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* What CyberReady Delivers */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            label="What CyberReady Includes"
            title="Governance Outcomes That Matter to District Leaders"
            description="Every element of the CyberReady platform is designed to support actionable cybersecurity and AI governance outcomes, not just technical findings."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <Card key={item.title} hover>
                <h3 className="text-base font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How Districts Use CyberReady */}
      <section className="py-20 sm:py-28 bg-navy-950">
        <Container>
          <SectionHeading
            label="How It Works"
            title="A Clear Process from Evaluation to Improvement"
            description="CyberReady includes a structured methodology that takes districts from initial assessment through ongoing governance maturity, with measurable progress at every stage."
            className="[&_h2]:text-white [&_p]:text-slate-300 [&_p:first-child]:text-blue-400"
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {processSteps.map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Evidence Section */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <SectionHeading
            label="Acquisition Context"
            title="What the Current Package Demonstrates"
            description="CyberReady is presented as a working product foundation. Buyers should independently validate market data, regulatory applicability, and commercial demand for their intended delivery model."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {evidenceStats.map((item) => (
              <Card key={item.label}>
                <p className="text-2xl font-bold text-blue-600">
                  {item.figure}
                </p>
                <p className="mt-1 text-sm font-semibold text-navy-900">
                  {item.label}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  {item.detail}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-navy-900">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              CyberReady Is Available for Acquisition Review
            </h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Qualified buyers may review the platform, website, governance
              materials, and buyer handoff documentation as part of acquisition
              diligence.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg" variant="primary">
                Request Access
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
