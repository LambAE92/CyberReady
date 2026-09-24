import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CyberReady | K-12 Cyber Governance & Digital Resilience",
    template: "%s | CyberReady",
  },
  description:
    "CyberReady is a K-12 cyber governance and digital resilience platform. Structured evaluation, leadership reporting, and improvement planning for school districts.",
  keywords: [
    "K-12 cybersecurity",
    "school district governance",
    "cyber readiness",
    "K-12 acquisition opportunity",
    "NIST CSF 2.0",
    "NIST AI RMF 1.0",
    "digital resilience",
    "Hall Monitor",
    "school board reporting",
  ],
  openGraph: {
    title: "CyberReady | K-12 Cyber Governance & Digital Resilience",
    description:
      "Transfer-ready K-12 cybersecurity and AI governance platform package with structured assessment workflows, reporting, and NIST-aligned methodology.",
    type: "website",
    locale: "en_US",
    siteName: "CyberReady",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberReady | K-12 Cyber Governance & Digital Resilience",
    description:
      "Structured cyber governance evaluation and reporting for school districts.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
