export type TemplateTier = "free" | "pro";

export type TemplateDifficulty = "basic" | "intermediate" | "advanced";

export type AppSecTemplate = {
  id: string;
  tier: TemplateTier;
  title: string;
  category: string;
  difficulty: TemplateDifficulty;
  useCase: string;
  description: string;
  prompt: string;
  expectedOutput: string[];
  safetyNotes: string[];
  tags: string[];
};

export type TemplatePack = {
  packId: string;
  packName: string;
  version: string;
  tier: TemplateTier;
  description: string;
  templates: AppSecTemplate[];
};

export type LockedProSection = {
  id: string;
  title: string;
  description: string;
  valueSummary: string;
  categories: string[];
  expectedTemplates: string[];
};

export type TierFilter = "all" | TemplateTier;
export type DifficultyFilter = "all" | TemplateDifficulty;
