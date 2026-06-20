import { useState } from "react";
import type { ProjectProfile, ProjectType } from "../types/guided";
import { ArrowIcon } from "./Icons";

const projectTypes: { value: ProjectType; label: string }[] = [
  { value: "saas", label: "SaaS" },
  { value: "marketplace", label: "Marketplace" },
  { value: "dashboard", label: "Dashboard" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "api-backend", label: "API backend" },
  { value: "ai-assistant", label: "AI assistant / agent" },
  { value: "internal-tool", label: "Internal tool" },
  { value: "portfolio", label: "Portfolio / public site" },
  { value: "mobile-backend", label: "Mobile app backend" },
  { value: "other", label: "Other" },
];

const dataOptions = ["public", "user personal data", "customer/business data", "payments", "files/documents", "secrets/tokens", "internal admin data"];
const authOptions = ["no login", "email/password", "OAuth/social login", "magic links", "external auth provider", "custom sessions/JWT"];
const roleOptions = ["guest", "user", "member", "admin", "owner", "support", "custom roles"];
const featureOptions = ["login", "signup", "password reset", "dashboard", "file upload", "documents", "media", "payments", "subscriptions", "trials", "coupons", "refunds", "approvals", "invitations", "team/workspace", "organization", "tenant", "admin panel", "internal dashboard", "impersonation", "webhooks", "public sharing", "AI assistant", "RAG", "tool calling", "document summarization", "chatbot", "automated actions", "exports", "API routes", "notifications", "comments/messages", "search"];

type GuidedProjectFormProps = {
  initial: ProjectProfile;
  onSave: (profile: ProjectProfile) => void;
  submitLabel?: string;
};

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (option: string) => {
    onChange(selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option]);
  };

  return (
    <fieldset className="guided-fieldset">
      <legend>{label}</legend>
      <div className="guided-options">
        {options.map((option) => (
          <label className={selected.includes(option) ? "is-selected" : ""} key={option}>
            <input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function GuidedProjectForm({ initial, onSave, submitLabel = "Build security review plan" }: GuidedProjectFormProps) {
  const [profile, setProfile] = useState<ProjectProfile>(initial);
  const update = <K extends keyof ProjectProfile>(key: K, value: ProjectProfile[K]) =>
    setProfile((current) => ({ ...current, [key]: value }));

  return (
    <form className="guided-form" onSubmit={(event) => {
      event.preventDefault();
      if (profile.projectName.trim() && profile.description.trim()) onSave(profile);
    }}>
      <div className="guided-form-grid">
        <label className="guided-field">
          <span>Project name</span>
          <input required value={profile.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="Acme customer portal" />
        </label>
        <label className="guided-field">
          <span>Project type</span>
          <select value={profile.projectType} onChange={(e) => update("projectType", e.target.value as ProjectType)}>
            {projectTypes.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label className="guided-field guided-field-wide">
          <span>Short project description</span>
          <textarea required value={profile.description} onChange={(e) => update("description", e.target.value)} placeholder="What the project does, who uses it, and which actions or data matter most." />
        </label>
      </div>

      <h4>Tech stack</h4>
      <div className="guided-form-grid stack-grid">
        {([
          ["frontend", "Frontend framework"],
          ["backend", "Backend framework"],
          ["database", "Database"],
          ["authProvider", "Auth provider"],
          ["hosting", "Hosting / deployment"],
          ["storageProvider", "Storage provider"],
          ["paymentProvider", "Payment provider"],
          ["aiProvider", "AI provider / tools"],
        ] as const).map(([key, label]) => (
          <label className="guided-field" key={key}>
            <span>{label}</span>
            <input value={profile[key] ?? ""} onChange={(e) => update(key, e.target.value)} placeholder="Optional" />
          </label>
        ))}
      </div>

      <CheckboxGroup label="Data sensitivity" options={dataOptions} selected={profile.dataSensitivity} onChange={(value) => update("dataSensitivity", value)} />
      <CheckboxGroup label="Auth model" options={authOptions} selected={profile.authModel} onChange={(value) => update("authModel", value)} />
      <CheckboxGroup label="Roles" options={roleOptions} selected={profile.roles} onChange={(value) => update("roles", value)} />
      <CheckboxGroup label="Important features" options={featureOptions} selected={profile.features} onChange={(value) => update("features", value)} />

      <label className="guided-field guided-field-wide">
        <span>Additional notes</span>
        <textarea value={profile.notes ?? ""} onChange={(e) => update("notes", e.target.value)} placeholder="Known controls, architecture constraints, custom roles, or unusual workflows." />
      </label>

      <button className="button button-primary guided-submit" type="submit">
        {submitLabel} <ArrowIcon />
      </button>
    </form>
  );
}
