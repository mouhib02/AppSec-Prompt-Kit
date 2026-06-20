import { useRef, useState } from "react";
import type { DragEvent } from "react";
import type { TemplatePack } from "../types/template";
import { FileIcon, LockIcon, UploadIcon } from "./Icons";

type UploadProPackProps = {
  pack: TemplatePack | null;
  error: string[];
  onFile: (file: File) => void;
  onClear: () => void;
};

export function UploadProPack({ pack, error, onFile, onClear }: UploadProPackProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return (
    <section className="upload-section section-shell" id="upload">
      <div className="upload-copy">
        <div className="section-kicker">Manual / P2P Pro access</div>
        <div className="upload-title-row">
          <h2>Unlock Pro Pack</h2>
          <span className="pro-price-badge">Pro Pack — $20</span>
        </div>
        <p>
          The Free Pack covers classic defensive AppSec prompts. The Pro Pack
          unlocks deeper security architecture workflows for authentication,
          authorization, business logic, SaaS, APIs, AI features, guided
          security review, and release readiness.
        </p>
        <div className="purchase-model">
          <span>Purchase model</span>
          Pro Pack access is handled manually through Telegram. DM me at{" "}
          <strong>@Nanodex2</strong>. Price: <strong>$20</strong>. Crypto accepted.
          Payment details are shared privately after contact. No wallet address
          is published in the app or repository.
        </div>
        <a className="button button-telegram" href="https://t.me/Nanodex2" target="_blank" rel="noreferrer">
          DM on Telegram: @Nanodex2
        </a>
        <ol className="purchase-flow">
          <li><span>01</span>DM me on Telegram: @Nanodex2.</li>
          <li><span>02</span>Confirm the $20 payment and receive the Pro Pack JSON file.</li>
          <li><span>03</span>Upload once and use it locally.</li>
        </ol>
        <div className="purchase-trust-notes" aria-label="Pro Pack trust notes">
          {["No backend", "No account", "No payment processor", "File-based unlock", "Stays in your browser", "Defensive-only prompts"].map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
        <div className="privacy-note"><LockIcon /><span><strong>No payment or account system</strong>No buyer verification, backend, network unlock request, or third-party storage.</span></div>
      </div>
      <div className="upload-card">
        {pack ? (
          <div className="pack-success">
            <span className="success-icon"><FileIcon /></span>
            <div className="success-label"><span className="status-dot" /> UPLOADED PRO PACK</div>
            <h3>{pack.packName}</h3>
            <p>{pack.description}</p>
            <div className="pack-stats">
              <span><strong>{pack.templates.length}</strong> templates</span>
              <span><strong>v{pack.version}</strong> version</span>
            </div>
            <button className="button button-danger" type="button" onClick={onClear}>Clear Pro Pack</button>
          </div>
        ) : (
          <>
            <div
              className={`drop-zone ${dragging ? "is-dragging" : ""}`}
              onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <span className="upload-icon"><UploadIcon /></span>
              <h3>Already bought the Pro Pack?</h3>
              <p>Upload the Pro Pack <code>.json</code> file inside this app to unlock advanced templates locally.</p>
              <p className="local-file-note">The file is parsed locally in your browser. It is not uploaded to any server.</p>
              <button className="button button-primary" type="button" onClick={() => inputRef.current?.click()}>
                Choose JSON file
              </button>
              <input
                ref={inputRef}
                className="sr-only"
                type="file"
                accept=".json,application/json"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) onFile(file);
                  event.target.value = "";
                }}
              />
              <small>JSON only · 2 MB limit · validated locally before storage</small>
            </div>
            {error.length > 0 && (
              <div className="validation-error" role="alert">
                <strong>Pack could not be loaded</strong>
                <ul>{error.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul>
                {error.length > 6 && <p>Plus {error.length - 6} more validation errors.</p>}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
