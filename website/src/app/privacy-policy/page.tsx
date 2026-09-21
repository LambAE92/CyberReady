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
          Last updated: April 1, 2026
        </p>

        <div className="mt-10 prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              1. Introduction
            </h2>
            <p>
              CyberReady (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;) is committed to protecting the privacy of
              individuals who visit our website or submit acquisition inquiries.
              This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you interact with our website and buyer access
              materials.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect the following categories of information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact Information:</strong> Name, email address,
                organization, job title, and phone number submitted through our
                acquisition inquiry and access request forms.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you access and
                use our website, including IP address, browser type, pages
                visited, time spent on pages, and referring URLs.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> We use
                cookies and similar technologies to improve your browsing
                experience and analyze website traffic.
              </li>
              <li>
                <strong>Evaluation Data:</strong> Information provided during
                buyer diligence or platform review, including assessment
                responses, organizational documentation, and notes if shared
                voluntarily. Any production data handling should be governed by a
                separate written agreement.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              3. How We Use Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To respond to acquisition inquiries and provide approved access
                to buyer materials.
              </li>
              <li>
                To support platform evaluation, technical diligence, and
                acquisition review.
              </li>
              <li>
                To improve our website, platform materials, and user experience.
              </li>
              <li>
                To communicate updates about CyberReady materials, including
                insights and educational content relevant to K-12 cybersecurity
                governance.
              </li>
              <li>
                To comply with legal obligations and protect our legitimate
                interests.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              4. Student Data and FERPA Compliance
            </h2>
            <p>
              CyberReady is designed to support school districts in strengthening
              their cybersecurity governance. We do not directly collect, store,
              or process student personally identifiable information (PII). Our
              evaluation methodology focuses on organizational governance
              practices, policies, and procedures rather than individual student
              data. Where platform materials interact with systems that may contain
              student data, we operate in accordance with the Family Educational
              Rights and Privacy Act (FERPA) and applicable state student privacy
              laws. Specific production data handling obligations should be
              outlined in a written agreement before real district data is used.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              5. Data Protection and Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect information against unauthorized access, alteration,
              disclosure, or destruction. These measures include encryption in
              transit, access controls, and regular security reviews. However, no
              method of electronic transmission or storage is completely secure,
              and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              6. Third-Party Services
            </h2>
            <p>
              Our website may use third-party services for analytics, hosting,
              and communication. These service providers are selected for their
              commitment to data protection and are contractually obligated to
              handle data in accordance with this policy. We do not sell personal
              information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain personal information only for as long as necessary to
              fulfill the purposes described in this policy, comply with legal
              obligations, resolve disputes, and enforce our agreements.
              Evaluation data is retained in accordance with the terms of our
              service agreements with client organizations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              8. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to access,
              correct, delete, or restrict the processing of your personal
              information. To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@cyberreadyschools.com"
                className="text-blue-600 hover:text-blue-700"
              >
                privacy@cyberreadyschools.com
              </a>
              . We will respond to your request within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              9. Kentucky Consumer Data Protection Act
            </h2>
            <p>
              CyberReady operates in compliance with the Kentucky Consumer Data
              Protection Act (KCDPA) and other applicable state privacy
              regulations. Kentucky residents may have additional rights
              regarding their personal data under this law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated effective date. We encourage
              you to review this policy periodically to stay informed about how
              we protect your information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy-900 mb-3">
              11. Contact Us
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our
              data practices, please contact us at:
            </p>
            <p className="mt-2">
              CyberReady
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@cyberreadyschools.com"
                className="text-blue-600 hover:text-blue-700"
              >
                privacy@cyberreadyschools.com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
