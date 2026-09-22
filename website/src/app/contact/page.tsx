"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [mailClientOpened, setMailClientOpened] = useState(false);
  const [formError, setFormError] = useState("");
  const acquisitionEmail = process.env.NEXT_PUBLIC_ACQUISITION_EMAIL;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!acquisitionEmail) {
      setFormError(
        "The acquisition contact channel is not configured. Please use the contact method supplied by the seller.",
      );
      return;
    }

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const organization = String(form.get("organization") || "");
    const role = String(form.get("role") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");
    const subject = `CyberReady acquisition inquiry from ${organization || name}`;
    const body = [
      `Name: ${name}`,
      `Organization: ${organization}`,
      `Role or title: ${role}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = `mailto:${acquisitionEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormError("");
    setMailClientOpened(true);
  }

  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Acquisition Inquiry
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            CyberReady is available for acquisition as a transfer-ready K–12
            cybersecurity and AI governance system.
          </p>
          <p className="mt-3 text-base text-slate-400 max-w-2xl mx-auto">
            This form is intended for qualified organizations evaluating
            strategic fit and acquisition potential.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {mailClientOpened ? (
                <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-7 w-7 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-navy-900">
                    Email Draft Opened
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Your email application should now contain a prefilled
                    acquisition inquiry. Please send that message to complete
                    the request; this static website does not store form
                    submissions.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Organization <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                        placeholder="Acme Cyber Group"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Role or Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                        placeholder="CEO, investor, product lead"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-colors resize-y"
                      placeholder="Briefly describe your interest and how CyberReady could fit into your organization."
                    />
                  </div>

                  <div>
                    <Button type="submit" size="lg">
                      Draft Acquisition Email
                    </Button>
                    <p className="mt-3 text-sm text-slate-500">
                      This opens your email application with a prefilled
                      inquiry. The website does not store or transmit this form.
                    </p>
                    {formError ? (
                      <p role="alert" className="mt-3 text-sm text-red-600">
                        {formError}
                      </p>
                    ) : null}
                  </div>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">
                  Buyer Materials
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Qualified buyers may request access to the platform demo,
                  screenshots, technical documentation, and supporting buyer
                  materials.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">
                  Access Control
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Full technical materials, repository access, and domain
                  transfer are subject to a written acquisition agreement. Buyer
                  packet access should be manually controlled and shared only
                  with qualified parties.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">
                  Included Assets
                </h3>
                <ul className="space-y-3">
                  {[
                    "Hall Monitor prototype platform",
                    "CyberReady website and branding assets",
                    "CoSN CCRE-aligned and CAIRE/CAGR governance materials",
                    "Documentation and buyer handoff packet",
                    "Domain transfer, subject to agreement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
