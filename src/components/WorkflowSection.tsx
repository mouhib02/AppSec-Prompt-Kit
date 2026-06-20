import { ArrowIcon, CheckIcon, CopyIcon, FileIcon, UploadIcon } from "./Icons";

const steps = [
  { number: "01", icon: <FileIcon />, title: "Browse a focused review", text: "Choose one template that matches the feature, API, auth flow, role model, or business workflow you are reviewing." },
  { number: "02", icon: <CopyIcon />, title: "Copy the prompt", text: "Use the copy control on any unlocked card or template detail panel." },
  { number: "03", icon: <FileIcon />, title: "Add project details", text: "Replace the placeholder with architecture, routes, roles, data flows, and known controls. Remove secrets and personal data." },
  { number: "04", icon: <CheckIcon />, title: "Use output as evidence", text: "Assign controls, answer developer questions, add safe negative tests, and record the release decision." },
  { number: "05", icon: <UploadIcon />, title: "Unlock advanced workflows", text: "Upload a manually delivered Pro Pack JSON for deeper architecture, authorization, business logic, SaaS, AI, and release reviews." },
];

export function WorkflowSection() {
  return (
    <section className="workflow-section section-shell" id="workflow">
      <div className="section-heading centered">
        <div>
          <div className="section-kicker">Build your review workflow</div>
          <h2>How to use this app.</h2>
        </div>
        <p>Move from a focused prompt to an actionable review checklist in five steps.</p>
      </div>
      <div className="workflow-grid">
        {steps.map((step, index) => (
          <article className="workflow-card" key={step.number}>
            <div className="workflow-number">{step.number}</div>
            <span className="workflow-icon">{step.icon}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {index < steps.length - 1 && <ArrowIcon className="workflow-arrow" />}
          </article>
        ))}
      </div>
    </section>
  );
}
