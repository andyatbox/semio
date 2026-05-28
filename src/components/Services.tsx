import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import content from "@/content.json";

export function Services() {
  return (
    <section className="services container" id="services">
      <div className="section-head">
        <Reveal as="h2">What We Do</Reveal>
        <Reveal as="span" delay="d1" className="count">
          Services / 04
        </Reveal>
      </div>

      {content.services.map((s) => (
        <Reveal key={s.n} className="srow">
          <span className="srow__no">{s.n}</span>
          <div className="srow__main">
            <h3 className="srow__title">
              <span className="srow__dot">
                <Icon />
              </span>
              {s.title}
            </h3>
            <p className="srow__desc">{s.desc}</p>
          </div>
          <span className="srow__arrow">↗</span>
        </Reveal>
      ))}
    </section>
  );
}
