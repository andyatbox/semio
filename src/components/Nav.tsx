"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import content from "@/content.json";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = content.nav.filter((n) => n.label !== "Contact");
  const cta = content.nav.find((n) => n.label === "Contact");

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <a href="#top" aria-label="Semio home">
        <Logo />
      </a>
      <nav className="nav__links">
        {links.map((link) => (
          <a key={link.href} className="nav__link" href={link.href}>
            {link.label}
          </a>
        ))}
        {cta && (
          <a className="nav__cta" href={cta.href}>
            {cta.label}
          </a>
        )}
      </nav>
    </header>
  );
}
