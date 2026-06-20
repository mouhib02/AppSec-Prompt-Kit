import { useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";
import { copyText } from "../utils/copy";

const schemaExample = `{
  "packId": "my-appsec-pro-pack",
  "packName": "My AppSec Pro Pack",
  "version": "1.0.0",
  "tier": "pro",
  "description": "Advanced defensive reviews.",
  "templates": [
    {
      "id": "unique-template-id",
      "tier": "pro",
      "title": "Authorization Design Review",
      "category": "Authorization Design",
      "difficulty": "advanced",
      "useCase": "Review access control design.",
      "description": "A short catalog summary.",
      "prompt": "Act as a defensive reviewer...",
      "expectedOutput": ["Permission matrix"],
      "safetyNotes": ["No exploit steps"],
      "tags": ["authorization", "rbac"]
    }
  ]
}`;

const requirements = [
  "The pack tier and every template tier must be “pro”.",
  "Every field is required; IDs must be unique within the pack.",
  "Difficulty must be basic, intermediate, or advanced.",
  "Prompt text and all array entries must be non-empty strings.",
];

export function PackSchema() {
  const [copied, setCopied] = useState(false);

  const copySchema = async () => {
    await copyText(schemaExample);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="schema-section section-shell" id="pack-format">
      <div className="schema-copy">
        <div className="section-kicker">Pro Pack format</div>
        <h2>A simple, portable JSON contract.</h2>
        <p>
          Real Pro Packs are created outside this public app and delivered
          directly to buyers as JSON files. The browser validates the file,
          stores it locally, and exposes its prompt content only after upload.
        </p>
        <ul className="check-list">
          {requirements.map((item) => <li key={item}><CheckIcon />{item}</li>)}
        </ul>
        <p className="schema-hint">
          <strong>Do not commit real paid packs.</strong> The included
          <code> src/data/sampleProPack.json</code> is demo-only placeholder
          content for testing the schema and unlock flow.
        </p>
      </div>
      <div className="code-window">
        <div className="code-top">
          <span><i /><i /><i /></span>
          <b>pro-pack.json</b>
          <button type="button" onClick={copySchema}>{copied ? <CheckIcon /> : <CopyIcon />}{copied ? "Copied" : "Copy"}</button>
        </div>
        <pre><code>{schemaExample}</code></pre>
      </div>
    </section>
  );
}
