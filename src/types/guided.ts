export type ProjectType =
  | "saas"
  | "marketplace"
  | "dashboard"
  | "ecommerce"
  | "api-backend"
  | "ai-assistant"
  | "internal-tool"
  | "portfolio"
  | "mobile-backend"
  | "other";

export type ProjectProfile = {
  projectName: string;
  description: string;
  projectType: ProjectType;
  frontend?: string;
  backend?: string;
  database?: string;
  authProvider?: string;
  hosting?: string;
  storageProvider?: string;
  paymentProvider?: string;
  aiProvider?: string;
  dataSensitivity: string[];
  authModel: string[];
  roles: string[];
  features: string[];
  notes?: string;
};

export type GuidedStep = {
  id: string;
  title: string;
  appliesWhen: string[];
  description: string;
  whyItMatters: string;
  mappedTemplateTags: string[];
  reviewFocus: string[];
  expectedOutput: string[];
};

export type GuidedReviewPlan = {
  profile: ProjectProfile;
  steps: GuidedStep[];
  completedStepIds: string[];
  createdAt: string;
  updatedAt: string;
};
