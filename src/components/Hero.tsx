import { ArrowIcon, UploadIcon } from "./Icons";

export function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot" /> Static defensive review system</div>
        <div className="hero-product-name">[APK] AppSec Prompt Kit</div>
        <h1>Defensive prompts that produce <span>decisions.</span></h1>
        <p className="hero-lede">
          Defensive prompt workflows for web apps, APIs, auth flows, business
          logic, AI features, and release readiness.
          Start free, then unlock a manually delivered Pro Pack JSON locally.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#catalog">
            Browse free templates <ArrowIcon />
          </a>
          <a className="button button-secondary" href="#upload">
            <UploadIcon /> Upload Pro Pack
          </a>
        </div>
        <div className="trust-row" aria-label="Product properties">
          <span>Static App</span>
          <span>Defensive Only</span>
          <span>No Backend</span>
          <span>JSON Packs</span>
          <span>Docker Ready</span>
        </div>
      </div>

      <div className="hero-console" aria-label="Example review output">
        <div className="console-top">
          <div className="console-dots"><i /><i /><i /></div>
          <span>review.output</span>
          <span className="console-state">READY</span>
        </div>
        <div className="console-body">
          <div className="console-command"><span>$</span> review --scope auth-flow</div>
          <div className="console-divider" />
          <div className="console-label">ASSESSMENT</div>
          <div className="risk-line">
            <span className="risk-index high">01</span>
            <div><strong>Session rotation</strong><small>Required after privilege change</small></div>
            <b>HIGH</b>
          </div>
          <div className="risk-line">
            <span className="risk-index medium">02</span>
            <div><strong>Recovery path</strong><small>Support override needs audit trail</small></div>
            <b>MED</b>
          </div>
          <div className="risk-line">
            <span className="risk-index low">03</span>
            <div><strong>Cookie policy</strong><small>Secure defaults evidenced</small></div>
            <b>PASS</b>
          </div>
          <div className="console-divider" />
          <div className="console-footer"><span>12 controls checked</span><span>2 actions required</span></div>
        </div>
      </div>
    </section>
  );
}
