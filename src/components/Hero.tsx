"use client";

import { useEffect } from "react";

export function Hero() {
  useEffect(() => {
    document.body.classList.add("play");
    const t = window.setTimeout(() => document.body.classList.add("play"), 350);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="hero container">
      {/* Brand icon, filled with grain texture via clip-path */}
      <div className="hero__icon" aria-hidden="true" />

      <div className="hero__top">
        <span className="eyebrow fade-seq d1">The Semio Group</span>
      </div>

      <h1 className="display hero__headline">
        <span className="line">
          <span>Driving revenue</span>
        </span>
        <span className="line">
          <span>
            by creating <span className="em">value.</span>
          </span>
        </span>
      </h1>

      <div className="hero__sub">
        <p className="hero__positioning fade-seq d2">
          Strategic Advisory for SaaS Growth, Channel Expansion &amp; Data Monetization.
        </p>
        <span className="hero__index fade-seq d3">
          01 — Strategic Advisory
          <br />
          for the Modern SaaS Economy
        </span>
        <span className="hero__scroll fade-seq d3">
          Scroll <span className="dash" />
        </span>
      </div>
    </section>
  );
}
