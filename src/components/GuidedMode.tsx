import { useEffect, useMemo, useState } from "react";
import type { GuidedReviewPlan, ProjectProfile } from "../types/guided";
import type { AppSecTemplate } from "../types/template";
import { clearGuidedPlan, loadGuidedPlan, saveGuidedPlan } from "../utils/guidedStorage";
import { createGuidedPlan } from "../utils/guidedPlan";
import { CopyIcon, FileIcon, LockIcon, UploadIcon } from "./Icons";
import { GuidedProjectForm } from "./GuidedProjectForm";
import { GuidedProgress } from "./GuidedProgress";
import { GuidedStepCard } from "./GuidedStepCard";

const emptyProfile: ProjectProfile = {
  projectName: "",
  description: "",
  projectType: "saas",
  dataSensitivity: [],
  authModel: [],
  roles: [],
  features: [],
};

type GuidedModeProps = {
  unlocked: boolean;
  templates: AppSecTemplate[];
  onCopy: (text: string, title: string) => void;
};

export function GuidedMode({ unlocked, templates, onCopy }: GuidedModeProps) {
  const [plan, setPlan] = useState<GuidedReviewPlan | null>(() => loadGuidedPlan());
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (plan) saveGuidedPlan(plan);
  }, [plan]);

  const completed = plan?.completedStepIds.length ?? 0;
  const total = plan?.steps.length ?? 0;
  const previewSteps = ["Project profile", "Security map", "Authentication", "Authorization", "APIs", "Business logic", "Files", "SaaS", "Admin", "AI features", "Release readiness"];

  const exportPlan = () => {
    if (!plan) return;
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${plan.profile.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "project"}-guided-security-plan.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    clearGuidedPlan();
    setPlan(null);
    setEditing(false);
  };

  const mappedTemplates = useMemo(() => templates.filter((template) => template.tier === "pro"), [templates]);

  return (
    <section className={`guided-mode section-shell ${unlocked ? "guided-unlocked" : "guided-locked"}`} id="guided-mode">
      <div className="guided-hero">
        <div>
          <div className="section-kicker">Pro workflow</div>
          <h2>Guided Security Mode</h2>
          <p>Guided Security Mode is for users who built a project with AI coding tools or fast MVP workflows. It helps you slow down and review the security design layer by layer before release.</p>
          <p className="guided-vibe-note">Vibe coding can create working features quickly, but security structure often remains implicit. This mode turns your project into a structured security review plan.</p>
        </div>
        <span className={`guided-status ${unlocked ? "is-unlocked" : ""}`}>
          {unlocked ? <FileIcon /> : <LockIcon />}
          {unlocked ? "Pro unlocked" : "Pro locked"}
        </span>
      </div>

      {!unlocked ? (
        <div className="guided-lock-panel">
          <div className="guided-preview-steps">
            {previewSteps.map((step, index) => <span key={step}><b>{String(index).padStart(2, "0")}</b>{step}</span>)}
          </div>
          <div className="guided-lock-copy">
            <LockIcon />
            <h3>Build a review plan without a scanner or AI API.</h3>
            <p>Upload a valid Pro Pack to create a local project profile, generate relevant review steps, copy structured prompts, track progress, and export the plan.</p>
            <a className="button button-primary" href="#upload"><UploadIcon /> Upload Pro Pack JSON to unlock guided mode</a>
          </div>
        </div>
      ) : !plan || editing ? (
        <div className="guided-profile-panel">
          <div className="guided-panel-heading">
            <div>
              <span>Step 0</span>
              <h3>{plan ? "Edit project profile" : "Create your project security profile"}</h3>
              <p>Your answers stay in this browser and determine which review layers are included.</p>
            </div>
            {plan && <button className="button button-secondary button-small" type="button" onClick={() => setEditing(false)}>Cancel</button>}
          </div>
          <GuidedProjectForm
            key={plan?.updatedAt ?? "new"}
            initial={plan?.profile ?? emptyProfile}
            submitLabel={plan ? "Update review plan" : "Build security review plan"}
            onSave={(profile) => {
              setPlan(createGuidedPlan(profile, plan));
              setEditing(false);
            }}
          />
        </div>
      ) : (
        <div className="guided-plan">
          <div className="guided-plan-toolbar">
            <div>
              <span>Active project</span>
              <h3>{plan.profile.projectName}</h3>
              <p>{plan.profile.description}</p>
            </div>
            <div>
              <button className="button button-secondary button-small" type="button" onClick={() => setEditing(true)}>Edit profile</button>
              <button className="button button-secondary button-small" type="button" onClick={exportPlan}><CopyIcon /> Export plan JSON</button>
              <button className="button button-danger button-small" type="button" onClick={reset}>Reset guided review</button>
            </div>
          </div>
          <GuidedProgress completed={completed} total={total} />
          <div className="guided-step-list">
            {plan.steps.map((step, index) => (
              <GuidedStepCard
                key={step.id}
                index={index}
                step={step}
                profile={plan.profile}
                completed={plan.completedStepIds.includes(step.id)}
                templates={mappedTemplates}
                onCopy={onCopy}
                onToggle={() => setPlan((current) => {
                  if (!current) return current;
                  const complete = current.completedStepIds.includes(step.id);
                  return {
                    ...current,
                    completedStepIds: complete
                      ? current.completedStepIds.filter((id) => id !== step.id)
                      : [...current.completedStepIds, step.id],
                    updatedAt: new Date().toISOString(),
                  };
                })}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
