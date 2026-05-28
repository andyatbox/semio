import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { IntroStatement } from "@/components/IntroStatement";
import { Services } from "@/components/Services";
import { ApproachBand } from "@/components/ApproachBand";
import { WhyUs } from "@/components/WhyUs";
import { AdvisoryMarquee } from "@/components/AdvisoryMarquee";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <IntroStatement />
        <Services />
        <ApproachBand />
        <WhyUs />
        <AdvisoryMarquee />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
