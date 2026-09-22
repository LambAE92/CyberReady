import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DashboardPreview from "@/components/hallmonitor/DashboardPreview";
import { NIST_FUNCTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "CyberReady | K-12 Cybersecurity & AI Governance Acquisition",
  description:
    "Acquire a transfer-ready K-12 cybersecurity and AI governance platform package with Hall Monitor, assessment workflows, reporting, and buyer diligence materials.",
  openGraph: {
    title: "CyberReady | K-12 Cybersecurity & AI Governance Acquisition",
    description:
      "Transfer-ready cybersecurity and AI governance platform package with structured evaluation, leadership reporting, and improvement planning for K-12 school districts.",
    url: "https://cyberreadyschools.com",
    siteName: "CyberReady",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberReady | K-12 Cybersecurity & AI Governance Acquisition",
    description:
      "Transfer-ready cybersecurity and AI governance platform package with structured evaluation, leadership reporting, and improvement planning for K-12 school districts.",
  },
};

const howItWorksSteps = [
  {
    step: "01",
    title: "Self-Assessment",
    description:
      "Before any external evaluation, the district completes a guided self-assessment inside Hall Monitor. Working through all six NIST functions, staff rate their current practices across 22 governance categories. Hall Monitor walks through each category with structured guidance so nothing is overlooked.",
  },
  {
    step: "02",
    title: "Structured Assessment",
    description:
      "Hall Monitor supports interview-based and evidence-based assessment across all six NIST functions. Findings can be documented, scored against the maturity rubric, and mapped to categories identified in the self-assessment.",
  },
  {
    step: "03",
    title: "Leadership Reporting",
    description:
      "Assessment results are translated into clear, board-ready outputs. Findings summaries, maturity level ratings, and NIST-aligned reports give superintendents and board members the visibility they need without requiring technical expertise.",
  },
  {
    step: "04",
    title: "Improvement Planning",
    description:
      "The workflow supports a prioritized improvement roadmap. District leaders can track progress against specific findings, review maturity over time, and document governance improvement for leadership.",
  },
];

const differentiators = [
  {
    title: "Governance-First",
    description:
      "Built for strategic oversight, not IT monitoring. CyberReady treats cybersecurity as a governance responsibility that belongs in the boardroom.",
  },
  {
    title: "Rubric-Based",
    description:
      "Structured cybersecurity-governance maturity evaluation using a CCRE-aligned workflow, rather than a checkbox compliance or pass/fail audit.",
  },
  {
    title: "Leadership-Ready",
    description:
      "Every output is designed for boards, superintendents, and district administrators. No jargon, no technical prerequisites.",
  },
  {
    title: "NIST-Aligned",
    description:
      "Cybersecurity maturity maps to the six NIST CSF 2.0 functions, while AI governance maturity maps to NIST AI RMF 1.0: GOVERN, MAP, MEASURE, and MANAGE.",
  },
  {
    title: "Evidence-Based",
    description:
      "The workflow supports structured interviews, documentation review, and recorded evidence alongside maturity scoring and findings.",
  },
  {
    title: "Improvement-Focused",
    description:
      "Assessment is the starting point, not the end. The workflow supports prioritized governance-improvement planning and progress review.",
  },
];

const coreOfferings = [
  {
    title: "CoSN CCRE-aligned Cybersecurity Assessment",
    description:
      "Evidence-based cybersecurity maturity evaluation across the six NIST CSF 2.0 functions, built for boards, superintendents, and district technology leaders.",
  },
  {
    title: "CAGR AI Governance Assessment",
    description:
      "CyberReady AI Governance Rubric assessment aligned to NIST AI RMF 1.0, covering GOVERN, MAP, MEASURE, and MANAGE across 19 AI governance categories.",
  },
  {
    title: "Hall Monitor Governance Platform",
    description:
      "The operations platform for maturity tracking, evidence notes, findings, improvement roadmaps, and board-ready reporting across cybersecurity and AI governance.",
  },
];

const acquisitionAssets = [
  {
    title: "Working Hall Monitor application",
    description: "Role-based K-12 cyber and AI governance workflows, dashboards, findings, and reporting views.",
  },
  {
    title: "Assessment and scoring workflows",
    description: "CCRE-aligned cybersecurity assessment plus CAGR AI-governance assessment implementation.",
  },
  {
    title: "CAIRE and CAGR methodology",
    description: "CyberReady-created AI-governance workflow and rubric implementation, subject to authorship confirmation in diligence.",
  },
  {
    title: "Executive reporting layer",
    description: "Maturity, findings, compliance, and leadership-oriented reporting functionality.",
  },
  {
    title: "Transfer-ready technical package",
    description: "Source code, architecture, setup, security, IP, limitations, and handoff documentation.",
  },
  {
    title: "Brand and domain assets",
    description: "CyberReady and Hall Monitor marketing assets and domain-transfer materials, subject to agreement and rights review.",
  },
];

const insightsPreview = [
  {
    category: "Current Events",
    title: "Instructure, Canvas, and the K-12 Vendor Governance Wake-Up Call",
    excerpt:
      "Education-sector vendor incidents reinforce why districts need structured vendor governance, executive visibility, and cyber readiness.",
    href: "/insights/instructure-canvas-vendor-governance",
  },
  {
    category: "AI Governance",
    title: "AI Governance Before AI Tools",
    excerpt:
      "Districts need to know which AI tools are in use, what data they touch, who oversees them, and what evidence supports continued use.",
    href: "/insights/ai-governance-before-ai-tools",
  },
  {
    category: "Digital Resilience",
    title: "Building Digital Resilience",
    excerpt:
      "Vendor dependency and incident response planning are now central to district governance readiness.",
    href: "/insights/digital-resilience-powerschool",
  },
];

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-navy-900 py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Strategic Acquisition Opportunity
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Acquire a purpose-built K–12 Cybersecurity &amp; AI Governance Platform.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              CyberReady combines a working Hall Monitor application, a CoSN
              CCRE-aligned cybersecurity workflow, CyberReady&apos;s CAGR and CAIRE
              AI-governance methodology, executive reporting, and buyer-ready
              technical documentation into one transfer-ready asset package.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Request Diligence Access
              </Button>
              <Button href="/platform" variant="outline" size="lg" className="border-slate-400 text-white hover:bg-white/10 hover:text-white">
                Explore the Platform
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────── Acquisition Package ───────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            label="What the Buyer Acquires"
            title="A working K–12 governance product foundation—not a concept deck."
            description="The package is designed for a cybersecurity firm, MSSP/MSP, GRC provider, EdTech company, AI-governance operator, or education technology integrator that can supply commercial infrastructure and distribution."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {acquisitionAssets.map((asset) => (
              <Card key={asset.title} hover>
                <h3 className="text-base font-bold text-navy-900 mb-2">{asset.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{asset.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/contact" variant="primary" size="md">
              Review the acquisition package
            </Button>
          </div>
        </Container>
      </section>

      {/* ───────────────────────── Problem ───────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            label="The Problem"
            title="School Districts Are Flying Blind on Cyber Risk"
            description="Many K-12 districts lack a structured governance process for understanding cybersecurity and AI adoption. Without a documented evaluation process, leadership teams may have limited visibility into ransomware exposure, insurance questionnaires, student-data risk, or AI-tool oversight."
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stat: "Rising",
                label: "cyber and vendor risk pressure on school districts",
              },
              {
                stat: "Growing",
                label: "AI adoption without consistent governance operations",
              },
              {
                stat: "Emerging",
                label: "need for K–12 cyber and AI governance frameworks",
              },
              {
                stat: "Limited",
                label: "executive visibility into cyber and AI posture",
              },
            ].map((item) => (
              <Card key={item.label} className="text-center">
                <p className="text-4xl font-bold text-navy-900">{item.stat}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.label}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-12 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Cybersecurity in K-12 has historically been treated as an IT
            responsibility. The result is fragmented tooling, reactive
            decision-making, and leadership teams that have no structured way to
            evaluate or improve their district&apos;s readiness.
          </p>
        </Container>
      </section>

      {/* ───────────────────────── Shift ───────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="The Shift"
              title="Cybersecurity Is a Leadership Issue, Not Just an IT Issue"
            />
            <div className="mt-10 space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                When a ransomware attack shuts down a district, it is not the
                firewall vendor who faces the community. It is the
                superintendent, the school board, and the leadership team. Cyber
                risk carries operational, financial, and reputational
                consequences that demand governance-level attention.
              </p>
              <p>
                School boards are increasingly expected to demonstrate oversight
                of cybersecurity, just as they do for finances, student safety,
                and academic performance. The challenge is that most boards lack
                a structured framework to evaluate where their district stands
                and what needs to improve.
              </p>
              <p className="font-semibold text-navy-900">
                Cyber readiness is not a technical metric. It is a strategic
                priority that requires governance-level evaluation, reporting,
                and planning.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────── Solution ───────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            label="The Solution"
            title="A Governance-First Ecosystem for Cybersecurity and AI"
            description="CyberReady combines CoSN CCRE-aligned cybersecurity assessment, CAGR AI governance assessments, CAIRE workflow, and Hall Monitor reporting so districts can document risk, evidence, recommendations, and improvement over time."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreOfferings.map((offering) => (
              <Card key={offering.title} hover>
                <h3 className="text-base font-bold text-navy-900 mb-2">
                  {offering.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {offering.description}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-10 text-center text-slate-600 max-w-3xl mx-auto leading-relaxed">
            CAIRE is CyberReady&apos;s evidence-review methodology for AI governance
            maturity reviews. It adapts the cybersecurity assessment process for AI
            tools, human oversight, vendor review, privacy, safety, and board
            reporting.
          </p>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {NIST_FUNCTIONS.map((fn) => (
              <div
                key={fn.name}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center"
              >
                <div
                  className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${fn.color}18` }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: fn.color }}
                  />
                </div>
                <p className="text-sm font-semibold text-navy-900">{fn.name}</p>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {fn.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────────── How It Works ───────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <Container>
          <SectionHeading
            label="How It Works"
            title="From Self-Assessment to Improvement in Four Steps"
            description="CyberReady replaces ad hoc security conversations with a repeatable, evidence-based governance process, starting with the district's own guided self-assessment."
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step) => (
              <Card key={step.step} className="relative pt-10">
                <span className="absolute top-5 left-6 text-5xl font-bold text-blue-100 select-none">
                  {step.step}
                </span>
                <h3 className="relative text-lg font-bold text-navy-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────────── Hall Monitor Showcase ───────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            label="Hall Monitor"
            title="See Cybersecurity and AI Governance Posture at a Glance"
            description="Hall Monitor is the operations layer of CyberReady. It translates CoSN CCRE-aligned cybersecurity assessment results and CAGR AI-governance findings into leadership-ready dashboards that display maturity, evidence, findings, and prioritized improvements."
          />
          <div className="mt-14 max-w-5xl mx-auto">
            <DashboardPreview />
          </div>

          {/* Video Demo */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-navy-900 mb-2 text-center">
                Modernizing Cyber Governance
              </h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                See how CyberReady structures governance evaluation for school
                districts.
              </p>
              <div className="rounded-xl overflow-hidden bg-navy-950">
                <video
                  controls
                  preload="metadata"
                  className="w-full"
                  poster=""
                >
                  <source
                    src="/media/modernizing-cyber-governance.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video element.
                </video>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button href="/platform" variant="ghost" size="md">
              Learn more about the platform &rarr;
            </Button>
          </div>
        </Container>
      </section>

      {/* ───────────────────── Differentiation ───────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <Container>
          <SectionHeading
            label="Why CyberReady"
            title="What Makes CyberReady Different"
            description="Most cybersecurity tools are built for IT teams. CyberReady is built for the people who are accountable for the district."
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item) => (
              <Card key={item.title} hover>
                <h3 className="text-base font-bold text-navy-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────────── Workforce Pathway Teaser ───────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <div className="rounded-2xl bg-navy-900 p-10 sm:p-14 lg:p-20 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent"
            />
            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
                Workforce Pipeline
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Workforce Pathway as an Optional Expansion Layer
              </h2>
              <p className="mt-5 text-slate-300 leading-relaxed text-lg">
                CyberReady includes a scalable workforce pathway concept that
                can extend education service offerings around cyber governance,
                AI governance, digital infrastructure, and workforce readiness.
              </p>
              <div className="mt-8">
                <Button href="/workforce-pathway" variant="primary" size="lg">
                  Explore the Pathway
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Platform background */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3 block">
                Platform Background
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
                Built from K-12 governance and cybersecurity expertise.
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-[280px_1fr]">
                {/* Left column - photo */}
                <div className="bg-gradient-to-br from-navy-950 to-navy-800 flex flex-col items-center justify-center p-10 gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75M5.25 4.5h9l4.5 4.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5Z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">Transfer-Ready</p>
                    <p className="text-blue-400 font-medium text-sm mt-1">Asset Package</p>
                    <p className="text-slate-400 text-xs mt-0.5">CyberReady</p>
                  </div>
                </div>

                {/* Right column - bio & credentials */}
                <div className="p-8 lg:p-10">
                  <p className="text-slate-600 leading-relaxed text-base">
                    CyberReady was developed as a governance-first system for
                    K-12 cybersecurity and AI risk management. The platform
                    combines structured assessment workflows, executive
                    reporting, and governance frameworks aligned to NIST CSF 2.0
                    and NIST AI RMF 1.0.
                  </p>
                  <p className="mt-4 text-slate-600 leading-relaxed text-base">
                    It was designed to help school districts translate cyber and
                    AI risk into board-ready visibility, maturity scoring, and
                    actionable improvement planning. CyberReady is now being
                    offered as a transfer-ready asset for acquisition by a
                    qualified operator, cybersecurity firm, EdTech company, or AI
                    governance organization positioned to develop and scale it.
                  </p>

                  {/* Credential tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Framework-informed",
                      "NIST CSF 2.0",
                      "NIST AI RMF 1.0",
                      "CAIRE workflow",
                      "Hall Monitor prototype",
                      "Buyer handoff docs",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-navy-950/5 border border-navy-950/10 rounded-full text-xs font-medium text-navy-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Governance background link */}
                  <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3.75 4.5 6.5v5.75c0 4.35 2.95 7.05 7.5 8 4.55-.95 7.5-3.65 7.5-8V6.5L12 3.75Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-900">
                        Developed for K–12 cybersecurity governance
                      </p>
                      <Link
                        href="/about"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-0.5"
                      >
                        Review platform background
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────── Insights Preview ───────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            label="Insights"
            title="Perspectives on K-12 Cyber Governance"
            description="Market validation, current events, and governance analysis for buyers evaluating the K-12 cybersecurity and AI governance opportunity."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {insightsPreview.map((article) => (
              <Card key={article.title} hover className="flex flex-col">
                <span className="inline-block self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
                  {article.category}
                </span>
                <h3 className="text-base font-bold text-navy-900 mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                <Link
                  href={article.href}
                  className="mt-4 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Read insight
                </Link>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/insights" variant="outline" size="md">
              View All Insights
            </Button>
          </div>
        </Container>
      </section>

      {/* ───────────────────────── Final CTA ───────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              CyberReady is available as a transfer-ready cybersecurity and AI governance asset.
            </h2>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Qualified buyers may request access to the platform demo,
              screenshots, technical documentation, and supporting buyer
              materials.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Request Access
              </Button>
              <Button href="/platform" variant="outline" size="lg" className="border-slate-400 text-white hover:bg-white/10 hover:text-white">
                Explore the Platform
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
