import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Workforce Pathway",
  description:
    "CyberReady's Workforce Pathway is a scalable K-12 cybersecurity workforce development framework focused on cyber governance, AI governance, and digital infrastructure readiness.",
  openGraph: {
    title: "Workforce Pathway | CyberReady",
    description:
      "A national, implementation-ready workforce development framework for K-12 cyber governance, AI governance, and digital infrastructure education.",
  },
};

const focusAreas = [
  {
    title: "Governance, Risk & Compliance",
    abbr: "GRC",
    description:
      "Understanding cybersecurity frameworks, developing organizational policies, and aligning security practices with regulatory requirements. Students learn how governance structures protect institutions and communities.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Digital Forensics",
    abbr: "DF",
    description:
      "Evidence collection and preservation, incident analysis and response, and maintaining chain of custody in digital investigations. Students develop the analytical skills essential for protecting digital environments.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    title: "AI Governance",
    abbr: "AIG",
    description:
      "Policy frameworks for artificial intelligence systems, risk assessment for AI deployments, and ethical oversight of automated decision-making. Students prepare for the governance challenges of emerging technologies.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
  },
  {
    title: "Digital Infrastructure",
    abbr: "DI",
    description:
      "Architecture design and evaluation, resilience planning for critical systems, and infrastructure management. Students learn how to assess and strengthen the digital foundations that organizations depend on.",
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
];

const differentiators = [
  {
    title: "Governance-First, Not Tools-First",
    description:
      "Most cybersecurity programs start with tools and technical operations. This pathway starts with governance, policy, and strategic thinking, the skills that define cybersecurity leadership.",
  },
  {
    title: "Not Another IT Certification Track",
    description:
      "This is not a pipeline to entry-level IT help desk roles. It is a pathway to governance, risk management, and compliance careers that shape how organizations approach cybersecurity.",
  },
  {
    title: "Built on Real Evaluation Methodology",
    description:
      "The pathway is informed by CoSN Cybersecurity Readiness for Education (CCRE) concepts and introduces students to structured cybersecurity governance assessment practices.",
  },
  {
    title: "K-12 to Workforce Connection",
    description:
      "We bridge the gap between K-12 education and workforce readiness by introducing governance concepts early, building toward career and technical education credentials and post-secondary opportunities.",
  },
  {
    title: "Scalable Implementation Model",
    description:
      "The pathway is framework-based and implementation-ready, allowing buyers to adapt it across districts, states, education service agencies, and implementing organizations.",
  },
  {
    title: "Optional Expansion Layer",
    description:
      "The workforce pathway can extend cybersecurity, AI governance, consulting, managed-service, or education service offerings without requiring changes to the core Hall Monitor platform.",
  },
  {
    title: "Addressing the Real Skills Gap",
    description:
      "The cybersecurity industry does not just need more technicians. It needs leaders who understand risk, compliance, and organizational governance. That is the gap this pathway addresses.",
  },
];

const audienceTypes = [
  {
    title: "School Districts",
    description:
      "Expand your Career and Technical Education offerings with a governance-focused cybersecurity pathway that prepares students for high-demand careers.",
  },
  {
    title: "Workforce Development Boards",
    description:
      "Align workforce strategy with one of the fastest-growing career fields by supporting governance and compliance career pathways.",
  },
  {
    title: "Community Colleges & Universities",
    description:
      "Create articulation agreements and dual-credit opportunities that connect K-12 pathway graduates to post-secondary cybersecurity programs.",
  },
  {
    title: "Economic Development Agencies",
    description:
      "Invest in a cybersecurity workforce pipeline that can attract employers, retain talent, and build scalable capacity for digital resilience.",
  },
  {
    title: "Education Technology Organizations",
    description:
      "Support curriculum development, platform integration, and assessment tools that advance governance-focused cybersecurity education.",
  },
];

export default function WorkforcePathwayPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-navy-900 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(37,99,235,0.15),transparent)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Workforce Pathway
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              National Cyber Governance & Digital Infrastructure Pathway
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              A scalable, framework-based workforce development model for
              preparing K-12 learners for governance, risk, compliance, AI
              oversight, and digital infrastructure careers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg" variant="primary">
                Request Acquisition Details
              </Button>
              <Button href="#pathway-focus" size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                Learn About the Pathway
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* The Opportunity */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              label="The Opportunity"
              title="A Workforce Gap That Demands a New Approach"
              description="Over four million cybersecurity positions remain unfilled globally, and the gap continues to grow. But the shortage is not just about technical operators. It is about the leaders, strategists, and governance professionals who shape how organizations manage cyber risk."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-4xl font-bold text-navy-900">4M+</p>
                <p className="mt-2 text-sm text-slate-600">
                  Unfilled cybersecurity positions worldwide
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-navy-900">40%</p>
                <p className="mt-2 text-sm text-slate-600">
                  Of organizations report governance skills gaps
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-navy-900">Emerging</p>
                <p className="mt-2 text-sm text-slate-600">
                  need for K–12 governance pathways
                </p>
              </div>
            </div>
            <p className="mt-12 text-lg text-slate-600 leading-relaxed text-center">
              Traditional cybersecurity education pathways focus almost entirely
              on IT operations, including network administration, system configuration,
              and technical tooling. CyberReady takes a fundamentally different
              approach, preparing students for the governance, risk, compliance,
              and digital infrastructure roles that organizations urgently need
              to fill.
            </p>
          </div>
        </Container>
      </section>

      {/* Pathway Focus Areas */}
      <section id="pathway-focus" className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <SectionHeading
            label="Pathway Focus Areas"
            title="Four Pillars of Cyber Governance Education"
            description="Each focus area develops a distinct set of competencies that together form the foundation for careers in cybersecurity governance and digital infrastructure."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <Card key={area.abbr} hover className="flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-blue-50 p-3">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">
                      {area.title}
                    </h3>
                    <span className="inline-block mt-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {area.abbr}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {area.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why This Pathway Is Different */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            label="Why This Pathway Is Different"
            title="Governance Leadership, Not Just Technical Skills"
            description="CyberReady's Workforce Pathway is built on a fundamentally different premise than traditional cybersecurity education programs."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <h3 className="text-base font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Education Innovation */}
      <section className="py-20 sm:py-28 bg-navy-900">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">
              Education Innovation
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              An Implementation-Ready Education Framework
            </h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              The Workforce Pathway is designed as an education innovation
              framework that can integrate governance-focused cybersecurity
              and AI governance into existing K-12, workforce, and education
              service structures.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "K-12 Curriculum Integration",
                description:
                  "Designed to integrate into existing course structures and standards, giving schools a practical path to offering governance-focused cybersecurity education.",
              },
              {
                title: "CTE Alignment",
                description:
                  "Aligned with Career and Technical Education frameworks so students can earn recognized credentials while building governance competencies.",
              },
              {
                title: "Workforce Alignment",
                description:
                  "Designed for implementation with workforce agencies, education service organizations, and employer networks so the pathway can connect to buyer-specific career opportunities.",
              },
              {
                title: "Early Career Exposure",
                description:
                  "Introduces students to governance career paths years before they would typically encounter them, creating awareness and building foundational skills early.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Scalable Implementation */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                label="Scalable Implementation"
                title="Built for Districts, States, and Implementing Organizations"
                description="The Workforce Pathway is designed as a transferable framework that can be adapted by buyers across school districts, state programs, education service agencies, workforce organizations, and cybersecurity service providers."
                align="left"
              />
              <div className="mt-10 space-y-6">
                {[
                  {
                    title: "Framework-Based Career Pathways",
                    description:
                      "A structured model for introducing cybersecurity governance, AI governance, and compliance career concepts across K-12 and workforce programs.",
                  },
                  {
                    title: "Flexible Delivery Models",
                    description:
                      "The pathway can support district programming, state initiatives, education service offerings, consulting packages, or managed-service expansion.",
                  },
                  {
                    title: "Digital Resilience Capacity",
                    description:
                      "Learners develop governance and infrastructure concepts that help organizations understand, manage, and communicate cyber and AI risk.",
                  },
                  {
                    title: "Implementation-Ready Structure",
                    description:
                      "The framework can be aligned with education agencies, workforce boards, higher education institutions, and private-sector organizations.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
              <h3 className="text-xl font-bold text-navy-900">
                Optional Expansion Layer
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                The Workforce Pathway is included as an optional expansion
                layer for buyers who want to connect CyberReady's governance
                model to education programming, workforce development, or
                career pathway initiatives.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                It is designed to complement cybersecurity assessment, AI
                governance assessment, consulting, managed-service, and
                education service offerings. Buyers can adapt the framework to
                their own market, implementation network, and delivery model.
              </p>
              <div className="mt-8 rounded-lg bg-blue-50 p-5">
                <p className="text-sm font-semibold text-blue-900">
                  Scalable by design.
                </p>
                <p className="mt-2 text-sm text-blue-800/80">
                  The pathway is framework-based, implementation-ready, and
                  applicable across districts, states, and organizations that
                  want to build cybersecurity and AI governance talent.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* For Implementers */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeading
            label="For Implementers"
            title="Potential Integration Audiences"
            description="The Workforce Pathway can support organizations that want to add governance-focused cybersecurity workforce development to their education, advisory, or service offerings."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audienceTypes.map((audience) => (
              <Card key={audience.title} hover className="flex flex-col">
                <h3 className="text-base font-bold text-navy-900">
                  {audience.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
                  {audience.description}
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
              Workforce Pathway Is Included in the Asset Package
            </h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              The workforce pathway materials are included as part of the
              CyberReady acquisition package and can support a buyer's education,
              workforce, or governance strategy.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg" variant="primary">
                Request Access
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
