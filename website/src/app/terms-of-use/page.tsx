import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "CyberReady terms of use. Terms and conditions for using the website and acquisition review materials.",
};

export default function TermsOfUsePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: September 22, 2026
        </p>

        <div className="mt-10 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the CyberReady website and acquisition
              review materials, you
              agree to be bound by these Terms of Use. If you do not agree to
              these terms, you should not access or use our website or materials.
              These terms apply to all visitors, users, and others who access the
              website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              2. Description of Platform Materials
            </h2>
            <p>
              CyberReady is a transfer-ready K-12 cybersecurity and
              AI-governance platform package. The materials include structured
              cybersecurity-governance workflows using CyberReady&apos;s CCRR and
              CEAM methodology, CyberReady&apos;s CAGR and
              CAIRE materials, Hall Monitor prototype software, and buyer
              documentation. Transfer terms, asset scope, and rights are subject
              to a written acquisition agreement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              3. User Responsibilities
            </h2>
            <p className="mb-3">When using our website and materials, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide accurate and complete information when submitting
                inquiries or reviewing acquisition materials.
              </li>
              <li>
                Use the website and materials only for lawful purposes and in
                accordance with these terms.
              </li>
              <li>
                Not attempt to gain unauthorized access to any part of the
                website, server, or any systems connected to the website.
              </li>
              <li>
                Not reproduce, distribute, or create derivative works from our
                content without prior written permission.
              </li>
              <li>
                Maintain the confidentiality of any account credentials or access
                information provided to you.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              4. Intellectual Property
            </h2>
            <p>
              The website and repository identify CyberReady and Hall Monitor
              code, original copy, CAIRE/CAGR implementation, and associated
              brand assets as prospective seller assets, subject to confirmation
              of authorship, title, and transfer rights. Open-source software,
              NIST materials, CoSN CCRE-related materials, and other
              third-party content remain subject to their respective rights and
              are not represented as CyberReady-owned content. Public access to
              this site does not grant a licence to use any material beyond
              ordinary evaluation of the package.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              5. Evaluation Reports and Materials
            </h2>
            <p>
              Cyber governance evaluation reports, demo materials, and related
              artifacts are provided for review only unless otherwise stated in a
              written agreement. They are not independent certifications,
              guarantees of security posture, insurance eligibility, or legal
              compliance determinations. CyberReady does not claim ownership of
              the CoSN CCRE program, certification authority, or endorsement by
              CoSN, NIST, or another third party.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              6. Disclaimer of Warranties
            </h2>
            <p>
              The website and materials are provided on an &ldquo;as is&rdquo;
              and &ldquo;as available&rdquo; basis without warranties of any
              kind, either express or implied. CyberReady does not warrant that
              the website will be uninterrupted, error-free, or free of harmful
              components. We make no warranties regarding the accuracy or
              completeness of website content or the content of any sites linked
              to this website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, CyberReady
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including without limitation,
              loss of profits, data, use, or goodwill, arising out of or in
              connection with your use of the website or materials. Our total
              liability for any claims arising under these terms shall not exceed
              the amount paid by you, if any, for accessing the website during
              the twelve months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              8. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless CyberReady and
              its officers, directors, employees, and agents from any claims,
              damages, losses, liabilities, and expenses (including reasonable
              legal fees) arising out of your use of the website or materials,
              your violation of these terms, or your violation of any rights of a
              third party.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              9. Governing Law
            </h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance
              with the laws of the Commonwealth of Kentucky, without regard to
              its conflict of law provisions. Any disputes arising under or in
              connection with these terms shall be subject to the exclusive
              jurisdiction of the courts located in the Commonwealth of Kentucky.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              10. Modifications
            </h2>
            <p>
              CyberReady reserves the right to modify these Terms of Use at any
              time. Changes will be effective immediately upon posting to this
              page. Your continued use of the website following the posting of
              changes constitutes your acceptance of those changes. We encourage
              you to review these terms periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              11. Severability
            </h2>
            <p>
              If any provision of these Terms of Use is held to be invalid or
              unenforceable, the remaining provisions shall continue in full
              force and effect. The invalid or unenforceable provision shall be
              modified to the minimum extent necessary to make it valid and
              enforceable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              12. Contact Us
            </h2>
            <p>
              These public-site terms are not a purchase agreement. Questions
              about acquisition materials should be sent through the contact
              method displayed on the acquisition inquiry page. Seller and buyer
              should obtain legal review before relying on these terms or entering
              a transaction.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
