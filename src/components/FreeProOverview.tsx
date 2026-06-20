import { CheckIcon, FileIcon, LockIcon, UploadIcon } from "./Icons";

export function FreeProOverview({ proUnlocked }: { proUnlocked: boolean }) {
  return (
    <section className="tier-overview section-shell" aria-labelledby="tier-overview-title">
      <div className="section-heading tier-overview-heading">
        <div>
          <div className="section-kicker">Free vs Pro</div>
          <h2 id="tier-overview-title">Two libraries. One local workflow.</h2>
        </div>
        <p>No checkout, account, license server, or remote unlock request.</p>
      </div>
      <div className="tier-overview-grid">
        <article className="tier-plan tier-plan-free">
          <div className="tier-plan-top">
            <span className="tier-plan-icon"><CheckIcon /></span>
            <span className="tier-state tier-state-free">Free · Open</span>
          </div>
          <h3>Free Starter</h3>
          <p>Classic defensive AppSec prompts for known vulnerability classes, browser risks, files, APIs, data safety, and basic release review.</p>
          <a className="text-button" href="#catalog">Browse free templates</a>
        </article>
        <article className={`tier-plan tier-plan-pro ${proUnlocked ? "is-unlocked" : ""}`}>
          <div className="tier-plan-top">
            <span className="tier-plan-icon">{proUnlocked ? <FileIcon /> : <LockIcon />}</span>
            <span className={`tier-state ${proUnlocked ? "tier-state-unlocked" : "tier-state-locked"}`}>
              Pro · {proUnlocked ? "Unlocked" : "File locked"}
            </span>
          </div>
          <div className="tier-plan-title-row">
            <h3>Uploaded Pro Pack</h3>
            {!proUnlocked && <span className="compact-price-badge">$20</span>}
          </div>
          <p>Advanced secure-design prompts for authentication, authorization, business logic, SaaS, APIs, AI features, and release decisions.</p>
          {!proUnlocked && (
            <p className="tier-purchase-note">
              Pro Pack price: $20. Access is handled manually through Telegram. DM me at{" "}
              <a href="https://t.me/Nanodex2" target="_blank" rel="noreferrer">@Nanodex2</a>. Crypto accepted.
            </p>
          )}
          <a className="text-button" href={proUnlocked ? "#catalog" : "#upload"}>
            {proUnlocked ? "Browse uploaded templates" : <><UploadIcon /> Upload Pro Pack JSON</>}
          </a>
        </article>
      </div>
      <div className="defensive-note">
        Defensive AppSec review only. These prompts help developers ask better security questions, improve designs, and prepare safer releases. They do not provide exploit payloads or offensive instructions.
      </div>
    </section>
  );
}
