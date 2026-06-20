import guidedStepsData from "../data/guidedSteps.json";
import type { GuidedReviewPlan, GuidedStep, ProjectProfile } from "../types/guided";

const guidedSteps = guidedStepsData as GuidedStep[];

const hasAny = (values: string[], candidates: string[]) =>
  candidates.some((candidate) => values.some((value) => value.toLowerCase() === candidate));

export function buildGuidedSteps(profile: ProjectProfile): GuidedStep[] {
  const features = profile.features.map((value) => value.toLowerCase());
  const roles = profile.roles.map((value) => value.toLowerCase());
  const auth = profile.authModel.map((value) => value.toLowerCase());

  return guidedSteps.filter((step) => {
    if (step.id === "security-map" || step.id === "release") return true;
    if (step.id === "authentication") return auth.length > 0 && !auth.includes("no login");
    if (step.id === "authorization") {
      return roles.length > 1 || hasAny(features, ["dashboard", "admin panel", "api routes", "team/workspace"]);
    }
    if (step.id === "api") {
      return ["api-backend", "mobile-backend"].includes(profile.projectType) ||
        hasAny(features, ["api routes", "webhooks"]);
    }
    if (step.id === "business-logic") {
      return ["ecommerce", "marketplace", "saas"].includes(profile.projectType) ||
        hasAny(features, ["payments", "subscriptions", "trials", "coupons", "refunds", "approvals", "invitations"]);
    }
    if (step.id === "files") {
      return hasAny(features, ["file upload", "documents", "exports", "media", "public sharing"]);
    }
    if (step.id === "saas") {
      return profile.projectType === "saas" ||
        hasAny(features, ["team/workspace", "organization", "company", "tenant"]);
    }
    if (step.id === "admin") {
      return hasAny(roles, ["admin", "support"]) ||
        hasAny(features, ["admin panel", "internal dashboard", "impersonation", "exports"]);
    }
    if (step.id === "ai") {
      return profile.projectType === "ai-assistant" ||
        hasAny(features, ["ai assistant", "rag", "tool calling", "document summarization", "chatbot", "automated actions"]);
    }
    return false;
  });
}

export function createGuidedPlan(profile: ProjectProfile, existing?: GuidedReviewPlan | null): GuidedReviewPlan {
  const now = new Date().toISOString();
  const steps = buildGuidedSteps(profile);
  const stepIds = new Set(steps.map((step) => step.id));
  return {
    profile,
    steps,
    completedStepIds: (existing?.completedStepIds ?? []).filter((id) => stepIds.has(id)),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

const value = (items: string[]) => items.length ? items.join(", ") : "Not specified";

export function generateGuidedPrompt(profile: ProjectProfile, step: GuidedStep): string {
  const stack = [
    profile.frontend && `Frontend: ${profile.frontend}`,
    profile.backend && `Backend: ${profile.backend}`,
    profile.database && `Database: ${profile.database}`,
    profile.authProvider && `Auth: ${profile.authProvider}`,
    profile.hosting && `Hosting: ${profile.hosting}`,
    profile.storageProvider && `Storage: ${profile.storageProvider}`,
    profile.paymentProvider && `Payments: ${profile.paymentProvider}`,
    profile.aiProvider && `AI: ${profile.aiProvider}`,
  ].filter(Boolean).join("; ") || "Not specified";

  return `You are a defensive application security reviewer.

Review the following project from the perspective of ${step.title}.

Safety rules:
- Do not provide exploit payloads.
- Do not provide bypass instructions.
- Do not provide offensive attack chains.
- Do not provide steps for attacking real targets.
- Focus on secure design, backend enforcement, safe abuse cases, negative test cases, and release readiness.

Project profile:
- Name: ${profile.projectName}
- Description: ${profile.description}
- Type: ${profile.projectType}
- Stack: ${stack}
- Data sensitivity: ${value(profile.dataSensitivity)}
- Auth model: ${value(profile.authModel)}
- Roles: ${value(profile.roles)}
- Important features: ${value(profile.features)}
- Additional notes: ${profile.notes?.trim() || "None"}

Review focus:
${step.reviewFocus.map((item) => `- ${item}`).join("\n")}

Return:
1. Summary
2. Trust boundaries
3. Main risks
4. Missing controls
5. Developer questions
6. Safe negative test cases without payloads
7. Priority fixes: must-have / should-have / later
8. Release checklist

Project details:
[PASTE MORE ARCHITECTURE, API ROUTES, AUTH FLOW, ROLES AND PERMISSIONS, OR BUSINESS LOGIC DETAILS HERE]`;
}
