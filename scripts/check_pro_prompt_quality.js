import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const packPath = resolve("private-pro-packs/appsec-pro-core-v1.json");

if (!existsSync(packPath)) {
  console.log("No private Pro Pack found. Skipping Pro prompt quality check.");
  process.exit(0);
}

let pack;
try {
  pack = JSON.parse(readFileSync(packPath, "utf8"));
} catch (error) {
  console.error(`Private Pro Pack is not valid JSON: ${error.message}`);
  process.exit(1);
}

if (!Array.isArray(pack.templates)) {
  console.error('Private Pro Pack must contain a "templates" array.');
  process.exit(1);
}

const requirements = [
  ["Role", /# Role/i],
  ["Safety rules", /Safety Rules/i],
  ["Do not provide exploit payloads", /Do not provide exploit payloads/i],
  ["No bypass instructions", /(?:Do not provide|no) bypass instructions/i],
  ["Required input", /Required Input/i],
  ["Assumption handling", /Assumption Handling/i],
  ["Trust boundaries", /Trust boundar/i],
  ["Protected objects", /protected objects/i],
  ["Backend enforcement", /Backend Enforcement/i],
  ["Abuse cases", /Abuse Cases/i],
  ["Safe negative test cases", /Safe Negative Test/i],
  ["Must-have / should-have / later", /Must-have.*Should-have.*Later/is],
  ["Developer questions", /Developer and Product Questions|Developer Questions/i],
  ["Release decision", /Release Decision/i],
  ["Ready states", /Ready\s*\/\s*Ready with conditions\s*\/\s*Not ready/i],
  ["Anti-generic rule", /If the answer is generic, rewrite it/i],
];

const warnings = [];
const ids = new Set();

for (const [index, template] of pack.templates.entries()) {
  const label = template?.title || template?.id || `Template ${index + 1}`;
  const prompt = typeof template?.prompt === "string" ? template.prompt : "";

  if (template?.tier !== "pro") warnings.push(`${label}: tier must be "pro".`);
  if (!template?.id || ids.has(template.id)) warnings.push(`${label}: missing or duplicate ID.`);
  if (template?.id) ids.add(template.id);
  if (prompt.length < 3500) warnings.push(`${label}: prompt is only ${prompt.length} characters; expected a serious review playbook.`);

  for (const [name, pattern] of requirements) {
    if (!pattern.test(prompt)) warnings.push(`${label}: missing quality concept "${name}".`);
  }

  for (const field of ["description", "useCase"]) {
    if (typeof template?.[field] !== "string" || template[field].trim().length < 40) {
      warnings.push(`${label}: ${field} is missing or too shallow.`);
    }
  }

  for (const field of ["expectedOutput", "safetyNotes", "tags"]) {
    if (!Array.isArray(template?.[field]) || template[field].length < 3) {
      warnings.push(`${label}: ${field} should contain at least three entries.`);
    }
  }
}

if (warnings.length) {
  console.error(`Pro prompt quality check found ${warnings.length} issue(s):`);
  warnings.forEach((warning) => console.error(`- ${warning}`));
  process.exit(1);
}

console.log(`Pro prompt quality check passed for ${pack.templates.length} templates.`);
