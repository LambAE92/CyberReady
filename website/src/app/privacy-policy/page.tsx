import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CyberReady privacy policy. How we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: September 22, 2026
        </p>

        <div className="mt-10 prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">1. Scope</h2>
            <p>
              This notice covers the public CyberReady acquisition website. It is
              not a customer-platform privacy notice, data-processing agreement,
              or representation of legal compliance for a future buyer-operated
              deployment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">2. Public-site information</h2>
            <p>
              The website source in this repository is a static site. Its
              acquisition form opens a visitor&apos;s email application with a
              prefilled message; the site does not itself submit, store, or route
              that form data. The hosting provider may process standard server or
              access logs under its own terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">3. Email inquiries</h2>
            <p>
              If a visitor chooses to send an acquisition email, the recipient
              may receive the contact details and message included by that
              visitor. Those inquiries should be handled only for acquisition
              review and in accordance with the recipient&apos;s applicable legal
              obligations and retention practices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">4. Hall Monitor and evaluation data</h2>
            <p>
              Hall Monitor is included as a prototype application and can store
              account, district, assessment, evidence, uploaded-document, and
              report data when it is deployed. Do not load real district or
              student data into a public demo. Any production use requires a
              buyer-controlled privacy, security, retention, and data-processing
              program before real data is accepted.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">5. Third-party services</h2>
            <p>
              A buyer-operated deployment may use hosting, email, analytics, or
              optional AI services selected by that operator. Each service and
              its data-processing terms must be evaluated before production use.
              This repository does not establish a customer-data relationship
              with those providers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">6. Legal and regulatory review</h2>
            <p>
              Privacy, education-record, consumer-data, and breach-notification
              obligations depend on the operator, data, jurisdiction, and use
              case. CyberReady does not represent on this site that it complies
              with the Kentucky Consumer Data Protection Act, FERPA, or any other
              law. Seller, buyer, and counsel should determine applicable
              obligations before production use or transaction closing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">7. Updates and contact</h2>
            <p>
              This notice may be updated as the acquisition package or hosting
              arrangement changes. Privacy questions should be sent through the
              contact method displayed on the acquisition inquiry page.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
