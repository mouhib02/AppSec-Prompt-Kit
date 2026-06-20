import type { TemplatePack } from "../types/template";

const STORAGE_KEY = "appsec-prompt-kit:pro-pack";

export function saveProPack(pack: TemplatePack): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pack));
}

export function loadProPack(): unknown | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as unknown;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearProPack(): void {
  localStorage.removeItem(STORAGE_KEY);
}
