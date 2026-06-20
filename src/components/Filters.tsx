import type {
  DifficultyFilter,
  TierFilter,
} from "../types/template";
import { SearchIcon } from "./Icons";

type FiltersProps = {
  search: string;
  onSearch: (value: string) => void;
  category: string;
  onCategory: (value: string) => void;
  difficulty: DifficultyFilter;
  onDifficulty: (value: DifficultyFilter) => void;
  tier: TierFilter;
  onTier: (value: TierFilter) => void;
  tag: string;
  onTag: (value: string) => void;
  categories: string[];
  tags: string[];
  onClear: () => void;
};

export function Filters(props: FiltersProps) {
  return (
    <div className="filters" aria-label="Template filters">
      <label className="search-field">
        <SearchIcon />
        <span className="sr-only">Search templates</span>
        <input
          type="search"
          placeholder="Search titles, use cases, tags..."
          value={props.search}
          onChange={(event) => props.onSearch(event.target.value)}
        />
      </label>
      <div className="select-row">
        <label>
          <span className="sr-only">Category</span>
          <select value={props.category} onChange={(e) => props.onCategory(e.target.value)}>
            <option value="all">All categories</option>
            {props.categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Difficulty</span>
          <select
            value={props.difficulty}
            onChange={(e) => props.onDifficulty(e.target.value as DifficultyFilter)}
          >
            <option value="all">All difficulty</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Tier</span>
          <select value={props.tier} onChange={(e) => props.onTier(e.target.value as TierFilter)}>
            <option value="all">Free + Pro</option>
            <option value="free">Free only</option>
            <option value="pro">Pro only</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Tag</span>
          <select value={props.tag} onChange={(e) => props.onTag(e.target.value)}>
            <option value="all">All tags</option>
            {props.tags.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <button className="filter-clear" type="button" onClick={props.onClear}>Reset</button>
      </div>
    </div>
  );
}
