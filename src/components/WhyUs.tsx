import { Reveal } from "./Reveal";
import content from "@/content.json";

export function WhyUs() {
  return (
    <section className="why container" id="why">
      <div className="section-head">
        <Reveal as="h2">Why The Semio Group</Reveal>
        <Reveal as="span" delay="d1" className="count">
          Differentiators / 04
        </Reveal>
      </div>

      <div className="why__grid">
        {content.whyUs.map((item, i) => (
          <Reveal key={item.n} delay={i % 2 === 1 ? "d1" : undefined} className="why__cell">
            <span className="why__no">{item.n}</span>
            <h3 className="why__title">{item.title}</h3>
            <p className="why__desc">{item.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
