import type { LockedProSection } from "../types/template";
import { ArrowIcon, CheckIcon, LockIcon, UploadIcon } from "./Icons";

type LockedProSectionsProps = {
  sections: LockedProSection[];
  unlocked: boolean;
  packName?: string;
  onBrowsePro: () => void;
};

export function LockedProSections({
  sections,
  unlocked,
  packName,
  onBrowsePro,
}: LockedProSectionsProps) {
  return (
    <section className="pro-sections section-shell" id="pro-sections">
      <div className="section-heading">
        <div>
          <div className="section-kicker">Pro library map</div>
          <h2>{unlocked ? "Pro sections unlocked." : "See the depth before you unlock."}</h2>
        </div>
        <p>
          {unlocked
            ? `${packName ?? "Your uploaded pack"} is active in this browser.`
            : "Public metadata only. Real Pro prompt text is never bundled in the app."}
        </p>
      </div>
      <div className="locked-pro-grid">
        {sections.map((section) => (
          <article className={`locked-pro-card ${unlocked ? "pro-section-unlocked" : ""}`} key={section.id}>
            <div className="locked-pro-top">
              <span className="locked-icon">{unlocked ? <CheckIcon /> : <LockIcon />}</span>
              <span className={`tier-state ${unlocked ? "tier-state-unlocked" : "tier-state-locked"}`}>
                Pro {unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
            <div className="pro-value">
              <span>What this unlocks</span>
              {section.valueSummary}
            </div>
            <div className="pro-category-row">
              {section.categories.map((category) => <span key={category}>{category}</span>)}
            </div>
            <div className="expected-count">
              <strong>{section.expectedTemplates.length}</strong>
              <span>expected template{section.expectedTemplates.length === 1 ? "" : "s"}</span>
            </div>
            {!unlocked && (
              <p className="locked-purchase-note">
                Pro Pack required — $20. DM me on Telegram{" "}
                <a href="https://t.me/Nanodex2" target="_blank" rel="noreferrer">@Nanodex2</a>{" "}
                to buy the JSON unlock pack.
              </p>
            )}
            <details>
              <summary>View expected templates</summary>
              <ul>{section.expectedTemplates.map((title) => <li key={title}>{title}</li>)}</ul>
            </details>
            {unlocked ? (
              <button className="text-button pro-card-action" type="button" onClick={onBrowsePro}>
                Browse uploaded Pro <ArrowIcon />
              </button>
            ) : (
              <a className="button button-secondary pro-card-action" href="#upload">
                <UploadIcon /> Upload Pro Pack JSON
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
