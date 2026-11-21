export type Language = "id" | "en";

export interface LocalizedText {
  id: string;
  en: string;
}

export interface LocalizedList {
  id: string[];
  en: string[];
}

export type ProjectCategory =
  | "enterprise"
  | "ecommerce"
  | "public-service"
  | "app";

export type MockupType =
  | "dretail-accounting"
  | "dretail-web"
  | "combiphar-pwa"
  | "xauusd-smc";

export interface ProjectItem {
  id: string;
  slug: string;
  section: "featured" | "labs";
  category: ProjectCategory;
  categoryLabel: LocalizedText;
  title: string;
  subtitle: LocalizedText;
  year: string;
  role: LocalizedText;
  client: string;
  liveUrl?: string;
  displayUrl: string;
  embeddable?: boolean;
  featuredBadge?: LocalizedText;
  image?: string;
  mockupType?: MockupType;
  accentColor: string;
  summary: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  highlights: LocalizedList;
  impact: LocalizedText;
  techStack: string[];
}

export interface ExperienceItem {
  id: string;
  role: LocalizedText;
  company: string;
  division: LocalizedText;
  period: LocalizedText;
  location: string;
  summary: LocalizedText;
  bullets: LocalizedList;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: LocalizedText;
  institution: string;
  period: string;
  note?: LocalizedText;
  type: "degree" | "certification";
}

export interface SkillGroup {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: "layout" | "server" | "database" | "sparkles";
  skills: string[];
}
