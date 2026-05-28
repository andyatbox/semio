import { LOGO_SVG } from "./logoMarkup";

/** Primary "semio" wordmark. Inherits color via currentColor. */
export function Logo({ className = "logo-wordmark" }: { className?: string }) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{ display: "inline-flex" }}
      dangerouslySetInnerHTML={{ __html: LOGO_SVG }}
    />
  );
}
