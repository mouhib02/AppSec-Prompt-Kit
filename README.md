# AppSec Prompt Kit

Defensive prompt workflows for web apps, APIs, auth flows, business logic, AI features, and release readiness.

**Static App | Defensive Only | No Backend | JSON Packs | Docker Ready**

## Project Overview

AppSec Prompt Kit is a static defensive AppSec prompt library for developers, freelancers, startup builders, and small teams. It provides copy/paste workflows for reviewing web applications, APIs, authentication, authorization, business logic, AI features, and release readiness.

The prompts turn vague security questions into structured reviews with trust boundaries, protected objects, backend enforcement points, developer questions, safe negative tests, priority controls, and release decisions.

The application:

- does not run security scans;
- does not call an AI API;
- does not upload user data;
- has no backend, database, account system, payment processor, or license server;
- parses uploaded Pro Packs locally and stores them only in browser `localStorage`;
- is designed for defensive security review only.

## What this is

AppSec Prompt Kit is a static, JSON-driven prompt library for defensive application security review. It helps developers turn vague AI security questions into structured review workflows.

## What this is not

This is not:

- a vulnerability scanner;
- an exploit toolkit;
- a replacement for professional security testing;
- a backend service;
- a payment platform;
- an AI API wrapper.

## Free Pack

The Free Pack is public, bundled with the app, and available immediately without login.

It contains defensive prompts for classic AppSec risks including:

- XSS;
- SQL injection;
- SSRF;
- SSTI;
- CSRF;
- file upload risks;
- path traversal;
- open redirect;
- CORS basics;
- clickjacking and security headers;
- API input validation;
- basic IDOR/BOLA awareness;
- mass assignment and rate-limit basics;
- secrets, logs, and GitHub sharing;
- AI data safety;
- dependency and basic release review.

Free templates live in `src/data/freeTemplates.json`.

## Pro Pack

The Pro Pack is a separate `.json` file that unlocks advanced defensive AppSec review workflows inside the app.

Price: **$20**

It includes deeper prompts for:

- Authentication design
- Authorization and RBAC
- IDOR / BOLA defensive review
- multi-tenant SaaS isolation;
- Business logic abuse
- Payment and checkout flows
- API security architecture
- Admin and internal tools
- AI feature security
- Guided Security Mode
- Release readiness review

### How to buy

Pro Pack access is handled manually.

To buy the Pro Pack, DM me on Telegram:

`@Nanodex2`

Accepted payment method: crypto.

Payment details are shared privately after contact. No wallet address is published in this repository.

After payment confirmation, you will receive the Pro Pack `.json` file. Upload it inside the app using **Upload Pro Pack JSON** to unlock the Pro templates locally in your browser.

No backend is used.  
No account is required.  
No license server is used.  
The uploaded Pro Pack stays in browser `localStorage`.

> Defensive AppSec review only. The Pro Pack does not include exploit payloads, bypass instructions, or offensive attack chains.

Do not include wallet addresses in the public repository. Payment details should be shared privately after contact.

## Guided Security Mode

Guided Security Mode becomes available after a valid Pro Pack is uploaded. It is intended for projects built quickly with AI coding tools, vibe-coding workflows, or fast MVP development.

The user creates a local project profile containing the project type, stack, data sensitivity, authentication model, roles, and important features. The app then creates a relevant review path covering applicable layers such as authentication, authorization, APIs, business logic, files, SaaS isolation, administration, AI features, and release readiness.

Each guided step provides:

- why the layer matters;
- when it applies;
- mapped Pro templates;
- a project-specific copy/paste prompt;
- local completion tracking.

The profile and progress stay in `localStorage`. Guided Mode makes no AI API calls and performs no scanning. Users can edit the profile, reset progress, or export the review plan as JSON.

## How to Run Locally

```text
git clone <REPOSITORY_URL>
cd appsec-prompt-kit
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

- The Free Pack should be visible immediately.
- Pro sections and Guided Security Mode should be visible but locked.
- No account or backend service is required.

Build the static application:

```text
npm run build
```

This creates a production build in `dist/`. The contents can be hosted by any static site host.

## How to Run with Docker

```text
docker compose up --build
```

Open `http://localhost:8080`.

The app is served as a static site by Nginx inside the container. No backend or database is started.

Stop the container:

```text
docker compose down
```

## How to Use the App

### Step 1 — Open the app

- Open the deployed site or local development URL.
- The Free Pack loads automatically.
- No login is required.

### Step 2 — Browse Free Templates

- Browse defensive AppSec prompts in the catalog.
- Filter by search text, category, difficulty, tier, or tag.
- Open and copy any Free template directly.

### Step 3 — Open a Template

Each template includes:

- title;
- category;
- difficulty;
- use case;
- description;
- prompt;
- expected output;
- safety notes;
- tags.

### Step 4 — Copy a Prompt

- Select **Copy Prompt**.
- Paste the prompt into your AI assistant.
- Replace the placeholder with project details, a feature description, API routes, an auth flow, roles and permissions, or business logic.
- Remove real secrets, credentials, and unnecessary personal data first.

### Step 5 — Use the Output

Use the generated output as:

- a security review checklist;
- developer and product questions;
- a missing-control list;
- release-readiness notes;
- safe negative-test planning;
- architecture-review support.

The output improves defensive review quality but does not replace professional security testing.

### Step 6 — Unlock Pro Pack

- DM me on Telegram: `@Nanodex2`
- Price: **$20**
- Crypto accepted.
- Payment details are shared privately after contact.
- After payment confirmation, you receive the Pro Pack `.json` file.
- Click **Upload Pro Pack JSON** inside the app.
- Select the purchased `.json` file.
- If valid, Pro templates and Guided Security Mode unlock locally.

### Step 7 — Use Pro Templates

Pro templates are deeper than Free templates. They focus on architecture, authentication, authorization, business logic, SaaS boundaries, API design, admin tooling, AI agents, and release readiness.

They produce structured output such as:

- trust boundaries;
- role/permission matrices;
- protected objects and ownership rules;
- backend enforcement points;
- defensive abuse cases;
- safe negative tests;
- release decisions;
- must-have / should-have / later fixes.

### Step 8 — Use Guided Security Mode

- Guided Security Mode is available only after Pro Pack upload.
- Create a structured project profile.
- The app generates a relevant step-by-step review path.
- Copy the guided prompt for each layer.
- Mark completed steps as done.
- Progress is stored locally.
- Export the plan as JSON if required.

### Step 9 — Clear Pro Pack

- Select **Clear Pro Pack** to remove the uploaded pack from `localStorage`.
- Pro sections and Guided Security Mode become locked again.
- No server deletion is required because the file was never uploaded anywhere.

## Pro Pack JSON Schema

Example Pro Pack JSON:

```json
{
  "packId": "appsec-pro-core-v1",
  "packName": "AppSec Prompt Kit — Pro Core",
  "version": "1.0.0",
  "tier": "pro",
  "description": "Advanced defensive AppSec prompt workflows.",
  "templates": [
    {
      "id": "auth-login-flow-threat-model",
      "tier": "pro",
      "title": "Login Flow Threat Model",
      "category": "Authentication Design",
      "difficulty": "advanced",
      "useCase": "Review a production-bound login flow.",
      "description": "A defensive workflow for mapping login trust boundaries, account takeover risks, and release blockers.",
      "prompt": "Act as a senior defensive application security architect...",
      "expectedOutput": [
        "Executive summary",
        "Trust boundaries",
        "Missing controls",
        "Safe negative test cases",
        "Release decision"
      ],
      "safetyNotes": [
        "Defensive review only",
        "No exploit payloads",
        "No bypass instructions"
      ],
      "tags": ["authentication", "login", "threat-modeling"]
    }
  ]
}
```

Validation rules:

- pack tier must be `pro`;
- every template tier must be `pro`;
- template IDs must be unique;
- all required fields must exist;
- prompt text must be non-empty;
- difficulty must be `basic`, `intermediate`, or `advanced`;
- list fields must contain strings;
- file size is limited to 2 MB;
- malformed or invalid JSON is rejected.

## Adding Free Templates

Add objects matching `AppSecTemplate` to:

```text
src/data/freeTemplates.json
```

Use `"tier": "free"`. Categories and tags are discovered automatically.

## Private Pro Pack Safety

Never commit real Pro Pack files.

Real Pro Pack files should stay in:

```text
private-pro-packs/
```

This directory is ignored by Git and excluded from Docker builds.

Check before publishing:

```text
git status --short
git status --ignored private-pro-packs
```

`private-pro-packs/` should appear as ignored. Real Pro Pack JSON files must not appear as tracked files.

If the folder was accidentally tracked:

```text
git rm --cached -r private-pro-packs
```

This removes it from Git tracking but keeps the local files.

The public `src/data/sampleProPack.json` contains demo-only placeholder content for testing the upload flow.

## Static Deployment

Run:

```text
npm run build
```

Deploy the generated `dist/` directory to any static host, or deploy the included Docker image to a container host exposing port `80`.

No application server, database, account system, payment service, or environment secret is required.

## Defensive-Only Safety Boundary

- This project is for defensive AppSec review.
- It does not provide exploit payloads.
- It does not provide bypass instructions.
- It does not provide offensive attack chains.
- It helps developers ask better security questions before release.
- It does not replace professional security testing.

Only review projects and environments you are authorized to assess.

## Screenshots

Screenshots are not included yet. Before launch, capture real screenshots of the hero, template catalog, locked Pro section, Pro upload flow, and Guided Security Mode.

The empty `assets/screenshots/` directory is reserved for real launch screenshots.

## Quality Checks

```text
npm run build
npm run check:pro-prompts
```

The Pro prompt quality check safely skips when no private Pro Pack exists.

See [PUBLISH_CHECKLIST.md](PUBLISH_CHECKLIST.md) before pushing to GitHub.

## License

Released under the [MIT License](LICENSE).
