import { Reveal } from "./Reveal";
import content from "@/content.json";

export function ApproachBand() {
  const { statement, focuses } = content.approach;
  return (
    <section className="approach" id="approach">
      <div className="approach__bg" aria-hidden="true" />
      <div className="container">
        <Reveal as="span" className="eyebrow">
          Our Approach / 03
        </Reveal>
        <Reveal as="h2" delay="d1" className="approach__statement">
          {statement}
        </Reveal>

        <Reveal delay="d2" className="approach__focus">
          {focuses.map((f) => (
            <div className="focus__cell" key={f.n}>
              <div className="focus__no">{f.n}</div>
              <div className="focus__txt">{f.txt}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
