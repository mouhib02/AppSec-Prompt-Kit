import type { ReactNode } from "react";
import type { AppSecTemplate } from "../types/template";
import { SearchIcon } from "./Icons";
import { TemplateCard } from "./TemplateCard";

type TemplateCatalogProps = {
  templates: AppSecTemplate[];
  total: number;
  onOpen: (template: AppSecTemplate) => void;
  onCopy: (template: AppSecTemplate) => void;
  onClear: () => void;
  filterSlot: ReactNode;
};

export function TemplateCatalog({
  templates,
  total,
  onOpen,
  onCopy,
  onClear,
  filterSlot,
}: TemplateCatalogProps) {
  return (
    <section className="catalog-section section-shell" id="catalog">
      <div className="section-heading">
        <div>
          <div className="section-kicker">Prompt library</div>
          <h2>Start with a focused review.</h2>
        </div>
        <p>{total} defensive templates available in this browser.</p>
      </div>
      {filterSlot}
      <div className="catalog-count">
        Showing <strong>{templates.length}</strong> of {total} templates
      </div>
      {templates.length > 0 ? (
        <div className="template-grid">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onOpen={onOpen}
              onCopy={onCopy}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span><SearchIcon /></span>
          <h3>No matching templates</h3>
          <p>Try a broader search or reset the active filters.</p>
          <button className="button button-secondary" type="button" onClick={onClear}>Reset filters</button>
        </div>
      )}
    </section>
  );
}
