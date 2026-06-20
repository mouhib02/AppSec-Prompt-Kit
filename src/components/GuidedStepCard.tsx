import { useState } from "react";
import type { GuidedStep, ProjectProfile } from "../types/guided";
import type { AppSecTemplate } from "../types/template";
import { generateGuidedPrompt } from "../utils/guidedPlan";
import { CheckIcon, CopyIcon } from "./Icons";

type GuidedStepCardProps = {
  index: number;
  step: GuidedStep;
  profile: ProjectProfile;
  completed: boolean;
  templates: AppSecTemplate[];
  onToggle: () => void;
  onCopy: (text: string, title: string) => void;
};

export function GuidedStepCard({ index, step, profile, completed, templates, onToggle, onCopy }: GuidedStepCardProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const prompt = generateGuidedPrompt(profile, step);
  const availableTitles = new Set(templates.map((template) => template.title.toLowerCase()));
  const mapped = step.mappedTemplateTags.filter((title) => availableTitles.has(title.toLowerCase()));

  return (
    <article className={`guided-step-card ${completed ? "is-complete" : ""}`}>
      <div className="guided-step-head">
        <span className="guided-step-number">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
        <label className="guided-complete">
          <input type="checkbox" checked={completed} onChange={onToggle} />
          <span>{completed ? <CheckIcon /> : null}{completed ? "Done" : "Mark done"}</span>
        </label>
      </div>
      <div className="guided-step-context">
        <div><span>Why it matters</span>{step.whyItMatters}</div>
        <div><span>When this applies</span>{step.appliesWhen.join(" · ")}</div>
      </div>
      <div className="guided-mapped">
        <span>Mapped Pro templates</span>
        <div>
          {(mapped.length ? mapped : step.mappedTemplateTags).map((title) => (
            <i className={availableTitles.has(title.toLowerCase()) ? "is-available" : ""} key={title}>{title}</i>
          ))}
        </div>
      </div>
      <button className="guided-expand" type="button" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide generated prompt" : "Show generated prompt"}
      </button>
      {expanded && (
        <div className="guided-prompt">
          <pre><code>{prompt}</code></pre>
          <button className="button button-primary" type="button" onClick={() => onCopy(prompt, step.title)}>
            <CopyIcon /> Copy guided prompt
          </button>
        </div>
      )}
    </article>
  );
}
