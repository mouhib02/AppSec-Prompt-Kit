const outputs = [
  ["01", "Risk areas", "Identify where design and implementation assumptions can fail."],
  ["02", "Secure controls", "Turn vague concerns into concrete engineering requirements."],
  ["03", "Developer questions", "Surface missing context before it becomes release debt."],
  ["04", "Release decisions", "Finish with evidence, blockers, and an actionable verdict."],
];

export function ProblemSection() {
  return (
    <section className="problem-section section-shell">
      <div className="section-kicker">A better review primitive</div>
      <div className="problem-grid">
        <div>
          <h2>Generic security prompts produce generic security advice.</h2>
          <p>
            “Is this secure?” is too broad to be useful. AppSec Prompt Kit
            gives AI a defensive scope, concrete review dimensions, and a
            required output structure.
          </p>
        </div>
        <div className="output-grid">
          {outputs.map(([number, title, text]) => (
            <article className="output-item" key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
