
export enum AppSection {
  STRATEGY = 'STRATEGY',
  IDENTITY = 'IDENTITY',
  SERVICES = 'SERVICES',
  AI_TOOLS = 'AI_TOOLS',
  COLLATERAL = 'COLLATERAL'
}

export interface BrandPersona {
  role: string;
  pains: string[];
  gains: string[];
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}
