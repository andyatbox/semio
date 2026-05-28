import { LogoLockup } from "./LogoLockup";
import content from "@/content.json";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <LogoLockup />

        <div className="footer__row">
          <p className="footer__tag">{content.brand.tagline}</p>
          <nav className="footer__links">
            {content.nav.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href="#top">Back to top ↑</a>
          </nav>
        </div>

        <div className="footer__base">
          <span>© {year} The Semio Group. All rights reserved.</span>
          <span>{content.brand.valueProp}</span>
        </div>
      </div>
    </footer>
  );
}
