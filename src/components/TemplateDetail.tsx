import { useEffect, useRef } from "react";
import type { AppSecTemplate } from "../types/template";
import { CheckIcon, CloseIcon, CopyIcon, LockIcon } from "./Icons";

type TemplateDetailProps = {
  template: AppSecTemplate | null;
  onClose: () => void;
  onCopy: (template: AppSecTemplate) => void;
};

export function TemplateDetail({ template, onClose, onCopy }: TemplateDetailProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!template) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [template, onClose]);

  if (!template) return null;

  const pasteExamples = template.category.toLowerCase().includes("auth")
    ? ["Auth flow and state transitions", "Identity providers and session/token rules", "Roles, recovery paths, and known controls"]
    : template.category.toLowerCase().includes("api")
      ? ["API routes and methods", "Request/response schemas", "Roles, object ownership, and backend controls"]
      : template.category.toLowerCase().includes("business") || template.category.toLowerCase().includes("payment")
        ? ["Business logic flow", "Workflow states and invariants", "Roles, limits, retries, and manual overrides"]
        : ["Feature description", "Relevant architecture or code behavior", "Roles, data flows, and known controls"];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="detail-top">
          <div className="card-meta">
            <span className="category-badge">{template.category}</span>
            <span className={`difficulty-badge difficulty-${template.difficulty}`}>{template.difficulty}</span>
            <span className={`tier-detail tier-${template.tier}`}>
              {template.tier === "pro" && <LockIcon />} {template.tier === "pro" ? "Pro Unlocked" : "Free"}
            </span>
            <span className="source-detail">{template.tier === "pro" ? "Uploaded Pro Pack" : "Free Starter"}</span>
          </div>
          <button ref={closeRef} className="icon-button close-button" type="button" onClick={onClose} aria-label="Close template detail">
            <CloseIcon />
          </button>
        </div>
        <div className="detail-content">
          <h2 id="detail-title">{template.title}</h2>
          <p className="detail-description">{template.description}</p>
          <section className="detail-section">
            <h3>When to use</h3>
            <div className="detail-use-case">{template.useCase}</div>
          </section>
          <section className="detail-section">
            <h3>What to paste</h3>
            <div className="paste-examples">
              {pasteExamples.map((example) => <span key={example}>{example}</span>)}
            </div>
          </section>
          <div className="prompt-header">
            <div><span className="status-dot" /> PROMPT</div>
            <button className="button button-primary button-small" type="button" onClick={() => onCopy(template)}>
              <CopyIcon /> Copy prompt
            </button>
          </div>
          <p className="prompt-helper">Copy the prompt, paste it into your AI assistant, then replace the placeholder with your project details.</p>
          <pre className="prompt-block"><code>{template.prompt}</code></pre>
          <div className="prompt-bottom-action">
            <button className="button button-primary" type="button" onClick={() => onCopy(template)}>
              <CopyIcon /> Copy prompt
            </button>
          </div>
          <div className="detail-columns">
            <div>
              <h3>Expected output</h3>
              <ul className="check-list">
                {template.expectedOutput.map((item) => <li key={item}><CheckIcon />{item}</li>)}
              </ul>
            </div>
            <div>
              <h3>Safety notes</h3>
              <ul className="safety-list">
                {template.safetyNotes.map((item) => <li key={item}><span>!</span>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="tag-row detail-tags">
            {template.tags.map((tag) => <span key={tag}>#{tag}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
}
