export const SITE_NAME = "CyberReady";
export const SITE_DESCRIPTION =
  "K-12 cybersecurity and AI governance platform. CoSN CCRE-aligned assessment, CAGR, CAIRE, Hall Monitor reporting, and improvement planning for school districts.";
export const SITE_URL = "https://cyberreadyschools.com";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "For School Districts", href: "/for-school-districts" },
  { label: "Workforce Pathway", href: "/workforce-pathway" },
  { label: "Hall Monitor", href: "/hall-monitor" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Acquisition Inquiry", href: "/contact" },
] as const;

export const NIST_FUNCTIONS = [
  {
    name: "Govern",
    color: "#6366f1",
    description:
      "Establish and maintain organizational cybersecurity governance, policy, and oversight.",
  },
  {
    name: "Identify",
    color: "#8b5cf6",
    description:
      "Understand organizational context, assets, risks, and improvement opportunities.",
  },
  {
    name: "Protect",
    color: "#3b82f6",
    description:
      "Implement safeguards for data security, identity management, and platform security.",
  },
  {
    name: "Detect",
    color: "#06b6d4",
    description:
      "Enable continuous monitoring, anomaly detection, and adverse event analysis.",
  },
  {
    name: "Respond",
    color: "#f97316",
    description:
      "Manage incident response processes, communication, and coordination.",
  },
  {
    name: "Recover",
    color: "#22c55e",
    description:
      "Restore capabilities and services affected by cybersecurity incidents.",
  },
] as const;

export const AI_RMF_FUNCTIONS = [
  {
    name: "GOVERN",
    color: "#4F46E5",
    description:
      "Establish AI policies, accountability structures, stakeholder engagement, and third-party governance.",
  },
  {
    name: "MAP",
    color: "#0369A1",
    description:
      "Document AI context, intended use, system categorization, components, and potential impacts.",
  },
  {
    name: "MEASURE",
    color: "#D97706",
    description:
      "Evaluate trustworthy AI characteristics, measurement methods, risk tracking, and feedback loops.",
  },
  {
    name: "MANAGE",
    color: "#059669",
    description:
      "Prioritize AI risks, manage third-party exposure, communicate incidents, and drive continuous improvement.",
  },
] as const;

export const MATURITY_LEVELS = [
  {
    level: 1,
    name: "Initial",
    color: "#ef4444",
    description: "Ad hoc processes with minimal governance structures in place.",
  },
  {
    level: 2,
    name: "Repeatable",
    color: "#f97316",
    description: "Emerging processes with basic governance beginning to form.",
  },
  {
    level: 3,
    name: "Defined",
    color: "#eab308",
    description:
      "Formalized governance with documented policies and strategic alignment.",
  },
  {
    level: 4,
    name: "Managed",
    color: "#22c55e",
    description:
      "Proactive governance with formal frameworks and continuous improvement.",
  },
  {
    level: 5,
    name: "Optimized",
    color: "#3b82f6",
    description:
      "Deeply embedded governance with continuous optimization and innovation.",
  },
] as const;

export const INSIGHTS_CATEGORIES = [
  "Governance",
  "AI Governance",
  "Digital Resilience",
  "Workforce",
  "Current Events",
] as const;
