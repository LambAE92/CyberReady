import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Founder & System Architect",
  description:
    "Founder authority and system architecture context for CyberReady, a transfer-ready K-12 cybersecurity and AI governance asset package.",
};

const authoritySignals = [
  "CoSN Cybersecurity Readiness for Education (CCRE) Practitioner",
  "Higher education instructional designer and educator",
  "AI systems and workflow automation practitioner",
  "Homeland security and public safety subject matter expertise",
  "Kentucky United We Learn Council member",
  "Developer of CyberReady's governance model, CAIRE concept, CAGR rubric, and Hall Monitor architecture",
];

const systemFoundations = [
  {
    title: "Governance-First Architecture",
    text: "CyberReady was designed to translate cybersecurity, AI, vendor, and data risk into executive-level visibility for school district leaders.",
  },
  {
    title: "NIST-Aligned Structure",
    text: "The system connects CCRR/CEAM cybersecurity assessment, CAGR AI-governance assessment, CAIRE evidence review, and Hall Monitor reporting.",
  },
  {
    title: "Transfer-Ready Package",
    text: "The repository includes platform code, website assets, documentation, reference materials, and buyer handoff guidance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 py-20">
        <Container>
          <SectionHeading
            label="Platform Background"
            title="Founder & System Architect"
            description="CyberReady was developed by Alex Lamb as a governance-first system for K–12 cybersecurity readiness, AI governance, and digital resilience."
            align="center"
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <h2 className="text-3xl font-bold tracking-tight text-navy-900">
                Built at the intersection of education, cybersecurity, AI, and governance.
              </h2>
              <p>
                Alex Lamb is an educator, instructional designer, AI
                practitioner, and CoSN Cybersecurity Readiness for Education
                (CCRE) Practitioner whose work sits at the intersection of K–12 governance,
                cybersecurity readiness, AI governance, instructional systems,
                and digital resilience.
              </p>
              <p>
                His background combines higher education instructional design,
                public safety and homeland security subject matter expertise,
                AI systems and workflow automation practice, and education
                governance experience through service on the Kentucky United We
                Learn Council.
              </p>
              <p>
                CyberReady's governance model, CAIRE concept, CAGR rubric, and
                Hall Monitor platform architecture were developed to make
                cybersecurity and AI governance visible, measurable, and
                board-ready for school districts.
              </p>
              <p>
                Alex has also submitted public comment and concept work related
                to NIST AI RMF alignment and education-sector critical
                infrastructure needs, reinforcing the system's focus on
                governance, readiness, and institutional resilience.
              </p>
              <p className="font-semibold text-navy-900">
                CyberReady is structured for clean transfer; founder
                involvement after acquisition is optional and subject to
                separate agreement.
              </p>
            </div>

            <Card className="bg-slate-50">
              <h3 className="text-lg font-bold text-navy-900">
                Authority Signals
              </h3>
              <ul className="mt-5 space-y-3">
                {authoritySignals.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-slate-50">
        <Container>
          <SectionHeading
            label="Why the System Was Built"
            title="The governance gap is widening faster than districts can operationalize internally."
            description="CyberReady was created to address the widening governance gap facing K–12 institutions as cybersecurity risk, AI adoption, compliance expectations, third-party vendor exposure, and workforce shortages accelerate faster than districts can operationalize governance internally."
            align="center"
          />
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {systemFoundations.map((item) => (
              <Card key={item.title}>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-12 max-w-3xl mx-auto rounded-xl border border-blue-100 bg-blue-50 p-6">
            <p className="text-sm text-blue-900 leading-relaxed">
              Full technical materials, repository access, and domain transfer
              are subject to a written acquisition agreement. Buyer packet
              access should be manually controlled and shared only with
              qualified parties.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-navy-950">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Review CyberReady as a transfer-ready platform asset.
            </h2>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Qualified buyers can review the platform, buyer materials, and
              acquisition access path through the CyberReady website.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/platform" variant="primary" size="lg">
                Review the Platform
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="border-slate-400 text-white hover:bg-white/10 hover:text-white"
              >
                Request Acquisition Access
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
