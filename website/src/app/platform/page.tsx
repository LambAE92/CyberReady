import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DashboardPreview from "@/components/hallmonitor/DashboardPreview";
import { NIST_FUNCTIONS, AI_RMF_FUNCTIONS, MATURITY_LEVELS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "CyberReady is a transfer-ready platform package with CCRR/CEAM cybersecurity assessment, CAGR AI-governance assessment, CAIRE evidence-review workflow, and Hall Monitor reporting for K-12 school districts.",
  openGraph: {
    title: "Platform | CyberReady",
    description:
      "Structured cybersecurity and AI governance for K-12 school districts. CCRR/CEAM assessment, CAGR, CAIRE, NIST alignment, and Hall Monitor reporting.",
  },
};

const ecosystemLayers = [
  {
    title: "CCRR/CEAM cybersecurity assessment",
    eyebrow: "Cybersecurity maturity",
    description:
      "CyberReady's CCRR/CEAM workflow assesses cybersecurity governance maturity across six NIST CSF 2.0 Function groupings with interview-based and evidence-based documentation.",
  },
  {
    title: "CAGR",
    eyebrow: "AI governance maturity",
    description:
      "CAGR assesses AI governance maturity across GOVERN, MAP, MEASURE, and MANAGE, aligned to the NIST AI RMF.",
  },
  {
    title: "CAIRE",
    eyebrow: "AI evidence review",
    description:
      "CAIRE is CyberReady's structured method for documenting AI-governance evidence, stakeholder interviews, findings, and leadership-ready reports.",
  },
  {
    title: "Hall Monitor",
    eyebrow: "Operations platform",
    description:
      "Hall Monitor tracks maturity, evidence, findings, indicative insurance-readiness inputs, improvement progress, and board reporting.",
  },
];

const evaluationSteps = [
  {
    step: "01",
    title: "Pre-Assessment Research",
    description:
      "A trained practitioner reviews available documentation and policies before stakeholder interviews take place.",
  },
  {
    step: "02",
    title: "Stakeholder Interviews",
    description:
      "Structured interviews with key personnel including technology directors, network administrators, and district leadership to understand current practices and governance structures.",
  },
  {
    step: "03",
    title: "Evidence Collection",
    description:
      "Gather supporting documentation such as policies, procedures, incident-response plans, training records, and system configurations to support documented findings.",
  },
  {
    step: "04",
    title: "Draft Report",
    description:
      "The workflow supports a draft report with findings, maturity-level assessments, and preliminary recommendations organized by NIST function.",
  },
  {
    step: "05",
    title: "Feedback & Review",
    description:
      "The district reviews the draft report and provides feedback, corrections, and additional context to ensure accuracy and completeness.",
  },
  {
    step: "06",
    title: "Final Report",
    description:
      "A final report can document maturity levels, prioritized recommendations, and an improvement roadmap for district leadership.",
  },
];

const reportingOutputs = [
  {
    title: "Findings Summaries",
    description:
      "Detailed summaries of governance strengths and gaps identified during the evaluation, organized by NIST function for clear categorization.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Maturity Level Assessments",
    description:
      "Clear maturity level ratings across NIST CSF and AI RMF functions, giving districts a concrete understanding of where they stand on the governance maturity spectrum.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "NIST-Aligned Scoring",
    description:
      "Quantitative scores mapped to six NIST CSF 2.0 functions and four NIST AI RMF 1.0 functions, providing comparable cybersecurity and AI governance measurements.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
  },
  {
    title: "Leadership-Ready Reports",
    description:
      "Executive summaries designed for school boards and superintendents, translating technical findings into governance language that supports informed decision-making.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Improvement Roadmaps",
    description:
      "Prioritized, actionable improvement plans that guide districts from their current maturity level toward measurable governance milestones over defined timeframes.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    description:
      "Longitudinal tracking across evaluation cycles so districts can measure improvement over time, demonstrate accountability, and validate investment in cybersecurity and AI governance.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
];

const governanceSteps = [
  {
    label: "Evaluation",
    description: "Structured CCRR/CEAM and CAIRE assessment across CSF and AI RMF functions",
  },
  {
    label: "Analysis",
    description: "Findings synthesis, maturity scoring, and gap identification",
  },
  {
    label: "Reporting",
    description:
      "Leadership-ready reports with clear findings and recommendations",
  },
  {
    label: "Improvement",
    description: "Prioritized roadmap execution with measurable milestones",
  },
  {
    label: "Re-evaluation",
    description: "Follow-up assessment to measure progress and recalibrate",
  },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy-950 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-blue-900)_0%,_transparent_60%)] opacity-40" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Governance Evaluation Platform
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              The CyberReady Platform
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Structured cybersecurity and AI governance built for school
              districts. From CCRR/CEAM and CAGR assessment through CAIRE
              evidence review, Hall Monitor reporting, and improvement planning,
              CyberReady provides a working governance platform foundation.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Request Access
              </Button>
              <Button href="#methodology" variant="outline" size="lg" className="border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white">
                Explore the Methodology
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Ecosystem Section */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            label="CyberReady Ecosystem"
            title="One System for Cybersecurity and AI Governance"
            description="CyberReady connects assessment, evidence review, operational tracking, indicative insurance-readiness inputs, and board reporting in one governance lifecycle."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemLayers.map((layer) => (
              <Card key={layer.title} hover>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {layer.eyebrow}
                </p>
                <h3 className="mt-2 text-lg font-bold text-navy-900">
                  {layer.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {layer.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CCRR / CEAM Methodology Section */}
      <section id="methodology" className="py-20 sm:py-28 bg-slate-50 scroll-mt-20">
        <Container>
          <SectionHeading
            label="CyberReady Cybersecurity Methodology"
            title="CCRR v1.0 and CEAM v1.0"
            description="CyberReady uses an interview- and evidence-based CCRR/CEAM workflow for assessing K-12 cybersecurity governance maturity. NIST CSF 2.0 identifiers are external reference metadata; this is not a NIST certification or endorsement."
          />
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="p-8 bg-slate-50 border-blue-100">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">
                How the CCRR/CEAM Assessment Works
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <span>
                    Structured cybersecurity evaluation questions span the
                    NIST CSF 2.0 functions, giving districts a consistent view
                    of cyber governance maturity.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <span>
                    A trained practitioner conducts an interview- and
                    evidence-based assessment using the platform&apos;s
                    CCRR/CEAM workflow. The workflow records findings and
                    maturity scoring; it is not an independent certification.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <span>
                    Organizations should establish appropriate practitioner
                    qualifications and independent review procedures for their
                    own assessment engagements.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  <span>
                    Results are mapped to a five-level maturity model, giving
                    districts a clear picture of their governance posture and a
                    concrete path forward.
                  </span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Evaluation Process Steps */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-navy-900 text-center mb-10">
              The Evaluation Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluationSteps.map((step) => (
                <Card key={step.step} hover className="relative">
                  <span className="text-3xl font-bold text-blue-100">
                    {step.step}
                  </span>
                  <h4 className="mt-2 text-lg font-semibold text-navy-900">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Maturity Levels Section */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <SectionHeading
            label="Maturity Model"
            title="Five Levels of Governance Maturity"
            description="The implemented assessment workflow records maturity ratings. The five-level model provides a progression path from ad hoc practices to more mature governance practices."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {MATURITY_LEVELS.map((level) => (
              <div
                key={level.level}
                className="relative rounded-xl bg-white border border-slate-200 p-5 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white text-xl font-bold"
                  style={{ backgroundColor: level.color }}
                >
                  {level.level}
                </div>
                <h4 className="text-base font-semibold text-navy-900">
                  {level.name}
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {level.description}
                </p>
              </div>
            ))}
          </div>
          {/* Maturity scale bar */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="flex rounded-full overflow-hidden h-3">
              {MATURITY_LEVELS.map((level) => (
                <div
                  key={level.level}
                  className="flex-1"
                  style={{ backgroundColor: level.color }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>Ad Hoc</span>
              <span>Optimized</span>
            </div>
          </div>
        </Container>
      </section>

      {/* NIST Alignment Section */}
      <section id="nist" className="py-20 sm:py-28 bg-white scroll-mt-20">
        <Container>
          <SectionHeading
            label="Framework Alignment"
            title="Mapped to NIST Cybersecurity and AI Governance Frameworks"
            description="CyberReady maps cybersecurity maturity to the six NIST CSF 2.0 functions and AI-governance maturity to the four NIST AI RMF 1.0 functions. This is alignment, not NIST certification or endorsement."
          />
          <div className="mt-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-6">
              NIST CSF 2.0 Functions
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NIST_FUNCTIONS.map((func) => (
              <Card key={func.name} hover className="relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: func.color }}
                />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-white text-sm font-bold"
                      style={{ backgroundColor: func.color }}
                    >
                      {func.name.slice(0, 2).toUpperCase()}
                    </div>
                    <h4 className="text-lg font-semibold text-navy-900">
                      {func.name}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {func.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-6">
              NIST AI RMF 1.0 Functions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {AI_RMF_FUNCTIONS.map((func) => (
                <Card key={func.name} hover className="relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: func.color }}
                  />
                  <div className="pl-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-white text-sm font-bold"
                        style={{ backgroundColor: func.color }}
                      >
                        {func.name.slice(0, 2)}
                      </div>
                      <h4 className="text-lg font-semibold text-navy-900">
                        {func.name}
                      </h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {func.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Reporting & Outputs Section */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <SectionHeading
            label="Reporting & Outputs"
            title="From Assessment to Actionable Intelligence"
            description="The implemented workflow supports leadership-oriented outputs that can inform decisions, guide improvement efforts, and document accountability."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportingOutputs.map((output) => (
              <Card key={output.title} hover>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                  {output.icon}
                </div>
                <h4 className="text-base font-semibold text-navy-900">
                  {output.title}
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {output.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Hall Monitor Section */}
      <section id="hall-monitor" className="py-20 sm:py-28 bg-white scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionHeading
                label="Hall Monitor"
            title="The Interface Layer for CyberReady Evaluations"
            align="left"
                description="Hall Monitor is the operations and reporting layer of the CyberReady evaluation system. It presents CCRR/CEAM cybersecurity assessment results and CAGR AI-governance findings in interactive views for district leadership."
              />
              <div className="mt-8 space-y-5">
                {[
                  {
                    title: "Structured Assessment Visualization",
                    text: "Displays maturity levels, NIST function scores, CAGR function scores, findings, and gaps from completed cybersecurity and AI governance evaluations.",
                  },
                  {
                    title: "Leadership Visibility",
                    text: "Provides superintendents, school boards, and technology directors with one place to review documented governance posture.",
                  },
                  {
                    title: "Findings & Gap Reporting",
                    text: "Surfaces cybersecurity and AI governance findings, highlights gaps, and tracks recommended improvements across assessment cycles.",
                  },
                  {
                    title: "Progress Over Time",
                    text: "Stores assessment history so users can review documented maturity and improvement progress across evaluation cycles.",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy-900">
                        {feature.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-28">
              <DashboardPreview />
            </div>
          </div>
        </Container>
      </section>

      {/* Governance System Section */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <SectionHeading
            label="Complete System"
            title="A Continuous Governance Cycle"
            description="CyberReady is not a one-time audit. It is a structured governance system designed for continuous improvement. Each phase builds on the last, creating a measurable cycle that strengthens cybersecurity and AI governance posture over time."
          />
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
                {governanceSteps.map((step, index) => (
                  <div key={step.label} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white border-2 border-blue-500 shadow-md">
                      <span className="text-2xl font-bold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <h4 className="mt-4 text-base font-semibold text-navy-900">
                      {step.label}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
              {/* Cycle arrow indicator */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg
                    className="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Continuous improvement cycle</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-blue-900)_0%,_transparent_60%)] opacity-30" />
        <Container className="relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              CyberReady is available as a transfer-ready platform asset.
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Qualified buyers may request acquisition details, platform access,
              technical documentation, and supporting buyer materials.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Request Acquisition Details
              </Button>
              <Button
                href="/for-school-districts"
                variant="outline"
                size="lg"
                className="border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white"
              >
                Learn More for Districts
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
