import { Reveal } from "./Reveal";
import { renderWithEm } from "@/lib/em";
import content from "@/content.json";

export function IntroStatement() {
  const { lead, body } = content.intro;
  return (
    <section className="intro container">
      <div className="intro__grid">
        <Reveal className="intro__label">
          <span className="eyebrow">(About) / 02</span>
        </Reveal>
        <div>
          <Reveal as="p" className="lead intro__lead">
            {renderWithEm(lead)}
          </Reveal>
          <div className="intro__body">
            {body.map((para, i) => (
              <Reveal key={i} as="p" delay={i === 0 ? "d1" : "d2"} className="body">
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
