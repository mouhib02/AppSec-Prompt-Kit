import type { AppSecTemplate } from "../types/template";
import { ArrowIcon, CheckIcon, CopyIcon } from "./Icons";

type TemplateCardProps = {
  template: AppSecTemplate;
  onOpen: (template: AppSecTemplate) => void;
  onCopy: (template: AppSecTemplate) => void;
};

export function TemplateCard({ template, onOpen, onCopy }: TemplateCardProps) {
  return (
    <article className={`template-card ${template.tier === "pro" ? "template-pro" : ""}`}>
      <div className="card-accent" />
      <div className="card-meta">
        <span className="category-badge">{template.category}</span>
        <span className={`difficulty-badge difficulty-${template.difficulty}`}>
          {template.difficulty}
        </span>
        <span className={`tier-badge tier-badge-${template.tier}`}>
          {template.tier === "pro" && <CheckIcon />}
          {template.tier === "pro" ? "PRO UNLOCKED" : "FREE"}
        </span>
      </div>
      <div className="card-title-row">
        <h3>{template.title}</h3>
      </div>
      <p className="card-description">{template.description}</p>
      <p className="use-case"><span>Best for</span>{template.useCase}</p>
      <div className="tag-row">
        {template.tags.slice(0, 4).map((tag) => <span key={tag}>#{tag}</span>)}
      </div>
      <div className="pack-source">
        <span>Pack source</span>
        <strong>{template.tier === "pro" ? "Uploaded Pro Pack" : "Free Starter"}</strong>
      </div>
      <div className="card-actions">
        <button className="text-button" type="button" onClick={() => onOpen(template)}>
          View template <ArrowIcon />
        </button>
        <button
          className="icon-button"
          type="button"
          onClick={() => onCopy(template)}
          aria-label={`Copy ${template.title} prompt`}
          title="Copy prompt"
        >
          <CopyIcon />
        </button>
      </div>
      <p className="copy-helper">Copy, paste into your AI assistant, then replace the placeholder with project details.</p>
    </article>
  );
}
