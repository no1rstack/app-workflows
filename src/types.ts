export interface AppCardData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  url: string;
  color: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  iconName: string;
  purpose: string;
  consumes: string[];
  produces: string[];
  capabilities: string[];
  stepNumber: number;
  emits: string[];
  servicesUsed: string[];
}

export interface PlatformServiceData {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface SharedServiceData {
  id: string;
  name: string;
  iconName: string;
  category: string; // e.g., 'Core Utilities', 'AI & Data', 'Integrations'
}

export interface FlowStepData {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export interface UserSession {
  id: string;
  username: string;
  action: string;
  targetApp: string;
  timestamp: string;
}
