import { ShieldIcon } from "./Icons";

const principles = [
  ["Defensive scope", "Prompts focus on threat modeling, safe design, secure requirements, and release readiness."],
  ["No weaponization", "The library intentionally avoids exploit payloads, bypass instructions, and offensive chains."],
  ["Human judgment", "Outputs support engineering decisions; they do not replace professional testing or expert review."],
];

export function SafetySection() {
  return (
    <section className="safety-section section-shell" id="safety">
      <div className="safety-heading">
        <span className="safety-shield"><ShieldIcon /></span>
        <div>
          <div className="section-kicker">Safety philosophy</div>
          <h2>Better questions before release.</h2>
          <p>A deliberate boundary keeps the kit useful to builders without turning reviews into attack playbooks.</p>
        </div>
      </div>
      <div className="principle-grid">
        {principles.map(([title, text], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
