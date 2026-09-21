import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    "NIST framework",
    "cybersecurity rubric",
    "digital resilience",
    "CCRE",
    "school board reporting",
  ],
  openGraph: {
    title: "CyberReady | K-12 Cyber Governance & Digital Resilience",
    description:
      "Structured cyber governance evaluation and reporting for school districts. Built on the Cybersecurity Rubric framework, aligned to NIST.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
