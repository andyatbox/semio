import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { renderWithEm } from "@/lib/em";
import content from "@/content.json";

export function Contact() {
  const { headline, copy, cta } = content.contact;
  const email = content.brand.contactEmail;
  return (
    <section className="contact container" id="contact">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="contact__glass" src="/assets/semio-icon-3d.jpg" alt="" aria-hidden="true" />
      <div className="contact__inner">
        <Reveal as="h2">{renderWithEm(headline)}</Reveal>
        <Reveal delay="d1">
          <p className="contact__copy">{copy}</p>
          <a className="contact__btn" href={`mailto:${email}`}>
            <span className="dot">
              <Icon />
            </span>
            {cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
