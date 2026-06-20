import type {
  AppSecTemplate,
  TemplateDifficulty,
  TemplatePack,
} from "../types/template";

export type ValidationResult =
  | { valid: true; pack: TemplatePack }
  | { valid: false; errors: string[] };

const difficulties: TemplateDifficulty[] = [
  "basic",
  "intermediate",
  "advanced",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function stringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(nonEmptyString);
}

function validateTemplate(
  value: unknown,
  index: number,
  errors: string[],
): value is AppSecTemplate {
  const label = `Template ${index + 1}`;
  if (!isRecord(value)) {
    errors.push(`${label} must be an object.`);
    return false;
  }

  const requiredStrings = [
    "id",
    "title",
    "category",
    "useCase",
    "description",
    "prompt",
  ] as const;

  requiredStrings.forEach((field) => {
    if (!nonEmptyString(value[field])) {
      errors.push(`${label}: "${field}" must be a non-empty string.`);
    }
  });

  if (value.tier !== "pro") {
    errors.push(`${label}: "tier" must be "pro".`);
  }

  if (
    !nonEmptyString(value.difficulty) ||
    !difficulties.includes(value.difficulty as TemplateDifficulty)
  ) {
    errors.push(
      `${label}: "difficulty" must be "basic", "intermediate", or "advanced".`,
    );
  }

  (["expectedOutput", "safetyNotes", "tags"] as const).forEach((field) => {
    if (!stringArray(value[field])) {
      errors.push(`${label}: "${field}" must be an array of non-empty strings.`);
    }
  });

  return errors.length === 0;
}

export function validatePack(value: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isRecord(value)) {
    return { valid: false, errors: ["The JSON root must be an object."] };
  }

  (["packId", "packName", "version", "description"] as const).forEach(
    (field) => {
      if (!nonEmptyString(value[field])) {
        errors.push(`"${field}" must be a non-empty string.`);
      }
    },
  );

  if (value.tier !== "pro") {
    errors.push('"tier" must be "pro".');
  }

  if (!Array.isArray(value.templates)) {
    errors.push('"templates" must be an array.');
  } else if (value.templates.length === 0) {
    errors.push('"templates" must contain at least one template.');
  } else {
    value.templates.forEach((template, index) => {
      const templateErrors: string[] = [];
      validateTemplate(template, index, templateErrors);
      errors.push(...templateErrors);
    });

    const ids = value.templates
      .filter(isRecord)
      .map((template) => template.id)
      .filter(nonEmptyString);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      errors.push(`Template IDs must be unique. Duplicate: ${duplicateIds[0]}.`);
    }
  }

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true, pack: value as unknown as TemplatePack };
}
