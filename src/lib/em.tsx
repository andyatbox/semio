import { Fragment, type ReactNode } from "react";

/**
 * Renders a content string, converting {{em:...}} tokens into emphasized
 * (weight-500) spans that echo the wordmark's `sem`-bold / `io`-light contrast.
 */
export function renderWithEm(text: string): ReactNode[] {
  return text.split(/(\{\{em:[^}]+\}\})/).map((part, i) =>
    part.startsWith("{{em:") ? (
      <span key={i} className="em" style={{ fontWeight: 500 }}>
        {part.slice(5, -2)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
