import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Hall Monitor",
  description:
    "K-12 cybersecurity and AI governance operations platform with structured assessment, evidence tracking, findings, and board-ready reporting.",
  openGraph: {
    title: "Hall Monitor | CyberReady",
    description:
      "Cybersecurity and AI governance operations for K-12 school districts. CCRE-aligned and CAGR assessments, evidence tracking, and executive reporting.",
  },
};

const portalUrl =
  process.env.NEXT_PUBLIC_HALL_MONITOR_URL ?? "http://localhost:5173";

const features = [
  {
    title: "CoSN CCRE-aligned Cybersecurity Assessment",
    text:
      "Structured rubric evaluation across all six NIST CSF 2.0 functions. Evidence-based maturity scoring with board-ready reports and prioritized improvement roadmaps.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75 4.5 6.5v5.75c0 4.35 2.95 7.05 7.5 8 4.55-.95 7.5-3.65 7.5-8V6.5L12 3.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 12.25 1.5 1.5 3.25-3.5" />
      </svg>
    ),
  },
  {
    title: "CAGR AI Governance Assessment",
    text:
      "AI governance maturity assessment aligned to NIST AI RMF 1.0. Evaluates your district's AI tools across 19 categories in four governance functions.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25a3 3 0 0 1 5.75-1.2 3 3 0 0 1 4.75 2.45 3.25 3.25 0 0 1-1.75 6 3 3 0 0 1-5.25 1.7 3 3 0 0 1-5-2.2 3.25 3.25 0 0 1 1.5-6.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v9M8.25 12h7.5M5.5 12H3.75M20.25 12H18.5M12 4.5V3M12 21v-1.5" />
      </svg>
    ),
  },
  {
    title: "CAIRE Evidence-Review Workflow",
    text:
      "Evidence-based AI governance review process for interviews, notes, tool evidence, maturity scoring support, and board-ready AI findings.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M5.25 4.5h9l4.5 4.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 4.5V9h4.5" />
      </svg>
    ),
  },
  {
    title: "Evidence Tracking and Board Reporting",
    text:
      "Capture notes, evidence locations, findings, indicative insurance-readiness inputs, and leadership reports in one governance record.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15M4.5 12h15M4.5 17.25h9M7.5 4.5v15M16.5 4.5v7.5" />
      </svg>
    ),
  },
  {
    title: "Continuous Governance Tracking",
    text:
      "Track cybersecurity maturity, AI-governance posture, findings, training workflow status, compliance records, and improvement progress over time. Hall Monitor does not ingest real-time security telemetry.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25h15a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v-3M12 14V9M16 14v-5M9.75 20.25h4.5" />
      </svg>
    ),
  },
];

const roleCards = [
  {
    title: "District Technology Staff",
    text:
      "Role-based platform access for IT directors and technology coordinators documenting district cybersecurity and AI-governance work.",
    items: [
      "CoSN CCRE-aligned and CAGR rubric assessments",
      "CAIRE evidence workflow",
      "Risk and findings management",
      "Compliance tracking and documentation",
      "Masterclass training management",
      "Evaluation history and report generation",
    ],
    button: "Sign In",
    href: `${portalUrl}/login`,
    variant: "outline" as const,
  },
  {
    title: "District Leadership",
    text:
      "Executive-focused views for superintendents and leadership users who need governance visibility without navigating technical dashboards.",
    items: [
      "Executive summary and posture score",
      "Indicative insurance-readiness score",
      "AI governance board reporting",
      "Board-ready reporting",
      "NIST function overview",
      "Assessment history and trend data",
    ],
    button: "Sign In",
    href: `${portalUrl}/login`,
    variant: "outline" as const,
  },
  {
    title: "Acquisition Review",
    text:
      "Review the transfer-ready CyberReady asset package, including platform code, website assets, governance materials, and buyer documentation.",
    items: [
      "CoSN CCRE-aligned cybersecurity assessment",
      "CAGR AI governance assessment",
      "Hall Monitor platform access",
      "Improvement roadmap views",
      "Executive reporting",
    ],
    button: "Request Access",
    href: "/contact",
    variant: "primary" as const,
  },
];

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4 10-10" />
    </svg>
  );
}

export default function HallMonitorPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-blue-900)_0%,_transparent_60%)] opacity-40" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
              K-12 Cybersecurity &amp; AI Governance Platform
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Hall Monitor
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              The operations platform for cybersecurity and AI governance.
            </p>
            <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Hall Monitor supports structured, interview- and evidence-based cybersecurity and AI-governance assessments using workflows aligned to NIST frameworks.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href={portalUrl} size="lg" variant="primary">
                Sign In to Hall Monitor
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="border-slate-400 text-slate-200 hover:bg-white/10 hover:text-white">
                Request Access
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            label="What Hall Monitor Does"
            title="One platform for CCRE-aligned assessment, CAGR, CAIRE, and board reporting."
            align="center"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} hover>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-base font-bold text-navy-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.text}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <SectionHeading
            label="Role-Based Access"
            title="Built for your whole team."
            align="center"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roleCards.map((card) => (
              <Card key={card.title} hover className="flex flex-col">
                <h3 className="text-lg font-bold text-navy-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.text}
                </p>
                <ul className="mt-5 space-y-3 text-sm text-slate-600 flex-1">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button href={card.href} variant={card.variant}>
                    {card.button}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            label="Live Platform"
            title="See what your district looks like in Hall Monitor."
            align="center"
          />
          <div className="mt-16 max-w-2xl mx-auto bg-slate-900 rounded-xl shadow-2xl ring-1 ring-white/10 p-6">
            <div className="flex items-center justify-between">
              <p className="text-white font-bold">HallMonitor</p>
              <p className="text-slate-400 text-sm">Walkerville School District</p>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <div className="relative h-[120px] w-[120px]">
                <svg width="120" height="120" className="-rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#334155" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" strokeDasharray="314.16" strokeDashoffset="204.2" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">1.7</p>
                  <p className="text-xs text-slate-400">/ 5.0</p>
                </div>
              </div>
              <div className="mt-6 flex gap-2 flex-wrap justify-center">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-900/50 text-blue-300">Cyber: 1.7</span>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300">AI Gov: 1.6</span>
                <span className="text-xs px-3 py-1 rounded-full bg-amber-900/50 text-amber-300">Insurance: 38</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 text-left">
                <div className="rounded-lg bg-slate-800/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    NIST CSF 2.0
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Govern 2.0", "Identify 1.7", "Protect 2.0", "Detect 1.5", "Respond 1.5", "Recover 1.5"].map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-slate-800/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    NIST AI RMF 1.0
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["GOVERN 1.3", "MAP 1.5", "MEASURE --", "MANAGE --"].map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 text-center mt-4">
              Walkerville School District - Demo Data
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28 bg-navy-900">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Already have an account?
            </h2>
            <div className="mt-10">
              <Button href={portalUrl} size="lg" variant="primary">
                Open Hall Monitor
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
