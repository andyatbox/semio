import { Reveal } from "./Reveal";
import content from "@/content.json";

const DELAYS = [undefined, "d1", "d2"] as const;

export function Clients() {
  return (
    <section className="clients container">
      <div className="section-head">
        <Reveal as="h2">Who We Work With</Reveal>
        <Reveal as="span" delay="d1" className="count">
          Partners / 06
        </Reveal>
      </div>

      <div className="clients__grid">
        {content.clients.map((c, i) => (
          <Reveal key={c.n} delay={DELAYS[i % 3]} className="client">
            <span className="client__no">{c.n}</span>
            <h3 className="client__name">{c.name}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
