<p align="center">
  <img src="public/logo.svg" width="96" alt="AppSec Prompt Kit logo">
</p>

<h1 align="center">AppSec Prompt Kit</h1>

<p align="center">
  Defensive prompt workflows for web apps, APIs, auth flows, business logic, AI features, and release readiness.
</p>

<p align="center">
  Static App · Defensive Only · No Backend · JSON Packs · Docker Ready
</p>

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

## Pro Pack

The Pro Pack is a separate `.json` file that unlocks advanced defensive AppSec review workflows inside the app.

Price: **$20**

It includes deeper prompts for authentication design, authorization and RBAC, IDOR / BOLA defensive review, multi-tenant SaaS isolation, business logic abuse, payment and checkout flows, API security architecture, admin and internal tools, AI feature security, Guided Security Mode, and release readiness review.

To buy the Pro Pack, DM me on Telegram: `@Nanodex2`

Accepted payment method: crypto. Payment details are shared privately after contact. No wallet address is published in this repository.

After payment confirmation, you receive the Pro Pack `.json` file. Upload it inside the app using **Upload Pro Pack JSON** to unlock the Pro templates locally in your browser.

No backend is used. No account is required. No license server is used. The uploaded Pro Pack stays in browser `localStorage`.

> Defensive AppSec review only. The Pro Pack does not include exploit payloads, bypass instructions, or offensive attack chains.

## Guided Security Mode

Guided Security Mode becomes available after a valid Pro Pack is uploaded. It helps turn a project into a step-by-step defensive security review when the architecture was built quickly or is still evolving.

The user creates a local project profile, the app builds a relevant review path, and each step provides a project-specific prompt with local completion tracking. The profile and progress stay in `localStorage`, and Guided Mode makes no AI API calls.

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

### Browse

Open the app and use search, category filters, difficulty filters, and tags to find the prompt you need.

### Copy

Open a template, copy the prompt, and paste it into your AI assistant with your feature details, API routes, auth flow, roles, or business logic.

### Unlock Pro

If you bought the Pro Pack, upload the `.json` file in the browser to unlock advanced templates and Guided Security Mode locally.

### Work locally

Use the generated prompts as a review checklist, a source of security questions, and a guide for release readiness.

## Local-first by design

AppSec Prompt Kit runs as a static frontend app.

There is no backend, no account system, no license server, and no payment processor inside the app. Free templates are included by default. Pro templates are unlocked by uploading a valid Pro Pack JSON file in the browser.

Uploaded Pro Pack files stay local to the browser through `localStorage`.

## Defensive use only

AppSec Prompt Kit is built for defensive application security review. It helps developers structure better security questions before release.

It is not a scanner, exploit toolkit, bypass guide, or replacement for professional security testing. Use it only for projects and environments you are authorized to review.

## Screenshots

Screenshots will be added from the real app UI before public promotion.

Do not include fake screenshots.

## License

Released under the [MIT License](LICENSE).
