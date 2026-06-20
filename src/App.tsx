import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import freeTemplatesData from "./data/freeTemplates.json";
import lockedProSectionsData from "./data/lockedProSections.json";
import type {
  AppSecTemplate,
  DifficultyFilter,
  LockedProSection,
  TemplatePack,
  TierFilter,
} from "./types/template";
import { clearProPack, loadProPack, saveProPack } from "./utils/storage";
import { validatePack } from "./utils/validatePack";
import { copyText } from "./utils/copy";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { Filters } from "./components/Filters";
import { TemplateCatalog } from "./components/TemplateCatalog";
import { TemplateDetail } from "./components/TemplateDetail";
import { UploadProPack } from "./components/UploadProPack";
import { WorkflowSection } from "./components/WorkflowSection";
import { PackSchema } from "./components/PackSchema";
import { SafetySection } from "./components/SafetySection";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";
import { FreeProOverview } from "./components/FreeProOverview";
import { LockedProSections } from "./components/LockedProSections";
import { GuidedMode } from "./components/GuidedMode";

const freeTemplates = freeTemplatesData as AppSecTemplate[];
const lockedProSections = lockedProSectionsData as LockedProSection[];

export function App() {
  const [proPack, setProPack] = useState<TemplatePack | null>(null);
  const [packErrors, setPackErrors] = useState<string[]>([]);
  const [selected, setSelected] = useState<AppSecTemplate | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [tier, setTier] = useState<TierFilter>("all");
  const [tag, setTag] = useState("all");

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), 2500);
  }, []);

  useEffect(() => {
    const stored = loadProPack();
    if (!stored) return;
    const result = validatePack(stored);
    if (result.valid) {
      setProPack(result.pack);
    } else {
      clearProPack();
    }
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
  }, []);

  const allTemplates = useMemo(
    () => [...freeTemplates, ...(proPack?.templates ?? [])],
    [proPack],
  );

  const categories = useMemo(
    () => [...new Set(allTemplates.map((template) => template.category))].sort(),
    [allTemplates],
  );

  const tags = useMemo(
    () => [...new Set(allTemplates.flatMap((template) => template.tags))].sort(),
    [allTemplates],
  );

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allTemplates.filter((template) => {
      const searchable = [
        template.title,
        template.category,
        template.useCase,
        template.description,
        ...template.tags,
      ].join(" ").toLowerCase();

      return (
        (!query || searchable.includes(query)) &&
        (category === "all" || template.category === category) &&
        (difficulty === "all" || template.difficulty === difficulty) &&
        (tier === "all" || template.tier === tier) &&
        (tag === "all" || template.tags.includes(tag))
      );
    });
  }, [allTemplates, category, difficulty, search, tag, tier]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setDifficulty("all");
    setTier("all");
    setTag("all");
  };

  const handleCopy = async (template: AppSecTemplate) => {
    try {
      await copyText(template.prompt);
      showToast(`${template.title} copied`);
    } catch {
      showToast("Could not copy automatically");
    }
  };

  const handleGuidedCopy = async (text: string, title: string) => {
    try {
      await copyText(text);
      showToast(`${title} guided prompt copied`);
    } catch {
      showToast("Could not copy automatically");
    }
  };

  const handleFile = async (file: File) => {
    setPackErrors([]);
    if (!file.name.toLowerCase().endsWith(".json")) {
      setPackErrors(["Choose a file with a .json extension."]);
      return;
    }
    if (file.size > 2_000_000) {
      setPackErrors(["The pack is larger than the 2 MB local safety limit."]);
      return;
    }

    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const result = validatePack(parsed);
      if (!result.valid) {
        setPackErrors(result.errors);
        return;
      }
      saveProPack(result.pack);
      setProPack(result.pack);
      showToast(`${result.pack.templates.length} Pro templates unlocked`);
    } catch {
      setPackErrors(["This file is not valid JSON. Check its syntax and try again."]);
    }
  };

  const handleClearPack = () => {
    clearProPack();
    setProPack(null);
    setPackErrors([]);
    if (selected?.tier === "pro") setSelected(null);
    if (tier === "pro") setTier("all");
    showToast("Pro Pack removed from this browser");
  };

  const browseProTemplates = () => {
    setSearch("");
    setCategory("all");
    setDifficulty("all");
    setTag("all");
    setTier("pro");
    document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="page-noise" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <FreeProOverview proUnlocked={Boolean(proPack)} />
        <GuidedMode
          unlocked={Boolean(proPack)}
          templates={proPack?.templates ?? []}
          onCopy={handleGuidedCopy}
        />
        <ProblemSection />
        <TemplateCatalog
          templates={filteredTemplates}
          total={allTemplates.length}
          onOpen={setSelected}
          onCopy={handleCopy}
          onClear={clearFilters}
          filterSlot={
            <Filters
              search={search}
              onSearch={setSearch}
              category={category}
              onCategory={setCategory}
              difficulty={difficulty}
              onDifficulty={setDifficulty}
              tier={tier}
              onTier={setTier}
              tag={tag}
              onTag={setTag}
              categories={categories}
              tags={tags}
              onClear={clearFilters}
            />
          }
        />
        <LockedProSections
          sections={lockedProSections}
          unlocked={Boolean(proPack)}
          packName={proPack?.packName}
          onBrowsePro={browseProTemplates}
        />
        <UploadProPack
          pack={proPack}
          error={packErrors}
          onFile={handleFile}
          onClear={handleClearPack}
        />
        <WorkflowSection />
        <PackSchema />
        <SafetySection />
      </main>
      <Footer />
      <TemplateDetail template={selected} onClose={() => setSelected(null)} onCopy={handleCopy} />
      <Toast message={toast} />
    </>
  );
}
