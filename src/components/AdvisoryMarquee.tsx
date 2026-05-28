import { Fragment } from "react";
import { Icon } from "./Icon";
import content from "@/content.json";

function Items() {
  return (
    <span className="marquee__item">
      {content.advisoryAreas.map((area) => (
        <Fragment key={area}>
          <span className="bullet">
            <Icon />
          </span>
          {area}
        </Fragment>
      ))}
      <span className="bullet">
        <Icon />
      </span>
    </span>
  );
}

export function AdvisoryMarquee() {
  return (
    <section className="marquee" aria-label="Core advisory areas">
      <div className="container">
        <span className="eyebrow marquee__label">Core Advisory Areas</span>
      </div>
      {/* track duplicated x2 for a seamless -50% loop */}
      <div className="marquee__track">
        <Items />
        <span aria-hidden="true" style={{ display: "contents" }}>
          <Items />
        </span>
      </div>
    </section>
  );
}
