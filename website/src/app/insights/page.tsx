import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import InsightsBrowser from "./InsightsBrowser";
import { articles } from "./articles";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles and analysis on K-12 cyber governance, AI governance, digital resilience, current events, and cybersecurity workforce development from CyberReady.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="bg-navy-950 py-20">
        <Container>
          <SectionHeading
            label="Insights"
            title="Market Signals, Governance Analysis, and Current Events"
            description="CyberReady insights connect education-sector cyber events, AI governance trends, vendor risk, digital resilience, and workforce development to the need for structured K-12 governance systems."
            align="center"
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />
        </Container>
      </section>

      <InsightsBrowser articles={articles} />

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-3">
              Review the Acquisition Opportunity
            </h2>
            <p className="text-slate-600 mb-6">
              CyberReady packages cybersecurity assessment, AI governance
              evaluation, current market context, and Hall Monitor reporting
              into a transfer-ready system for qualified buyers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all duration-200"
            >
              Request Acquisition Access
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
