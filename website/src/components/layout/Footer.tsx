import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";

const footerLinks = {
  Platform: [
    { label: "Overview", href: "/platform" },
    { label: "Assessment Methodology", href: "/platform#methodology" },
    { label: "NIST Alignment", href: "/platform#nist" },
    { label: "Hall Monitor", href: "/platform#hall-monitor" },
  ],
  Solutions: [
    { label: "For School Districts", href: "/for-school-districts" },
    { label: "Workforce Pathway", href: "/workforce-pathway" },
    { label: "Request Access", href: "/contact" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Acquisition Inquiry", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/cyberready-logo.png"
                alt="CyberReady"
                width={32}
                height={32}
                className="h-8 w-auto brightness-200"
              />
              <span className="text-lg font-bold text-white">CyberReady</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transfer-ready K-12 cybersecurity and AI governance system with
              structured rubrics, Hall Monitor, and buyer materials.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} CyberReady. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Cybersecurity aligned to NIST CSF 2.0 · AI governance aligned to NIST AI RMF 1.0
          </p>
        </div>
      </Container>
    </footer>
  );
}
