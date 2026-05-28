import { LOCKUP_SVG } from "./logoMarkup";

/** Stacked "the / semio / group" lockup. Footer hero element. */
export function LogoLockup({ className = "footer__lockup" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: LOCKUP_SVG }} />
  );
}
