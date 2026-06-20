import { CheckIcon } from "./Icons";

export function Toast({ message }: { message: string | null }) {
  return (
    <div className={`toast ${message ? "toast-visible" : ""}`} role="status" aria-live="polite">
      <span><CheckIcon /></span>
      {message}
    </div>
  );
}
