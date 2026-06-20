import type { GuidedReviewPlan } from "../types/guided";

const GUIDED_KEY = "appsec-prompt-kit:guided-review";

export function loadGuidedPlan(): GuidedReviewPlan | null {
  try {
    const value = localStorage.getItem(GUIDED_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as unknown;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("profile" in parsed) ||
      !("steps" in parsed) ||
      !("completedStepIds" in parsed)
    ) return null;

    const candidate = parsed as Partial<GuidedReviewPlan>;
    if (
      typeof candidate.profile !== "object" ||
      candidate.profile === null ||
      !Array.isArray(candidate.steps) ||
      !Array.isArray(candidate.completedStepIds) ||
      typeof candidate.profile.projectName !== "string" ||
      typeof candidate.profile.description !== "string" ||
      !Array.isArray(candidate.profile.dataSensitivity) ||
      !Array.isArray(candidate.profile.authModel) ||
      !Array.isArray(candidate.profile.roles) ||
      !Array.isArray(candidate.profile.features)
    ) return null;
    return candidate as GuidedReviewPlan;
  } catch {
    return null;
  }
}

export function saveGuidedPlan(plan: GuidedReviewPlan): boolean {
  try {
    localStorage.setItem(GUIDED_KEY, JSON.stringify(plan));
    return true;
  } catch {
    return false;
  }
}

export function clearGuidedPlan(): void {
  try {
    localStorage.removeItem(GUIDED_KEY);
  } catch {
    // Storage may be unavailable in restricted browser contexts.
  }
}
