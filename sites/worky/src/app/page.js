import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Positions from "@/components/Positions";
import HowItWorks from "@/components/HowItWorks";
import WhyConsiti from "@/components/WhyConsiti";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Positions />
        <HowItWorks />
        <WhyConsiti />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Reveal />
      <CookieBanner />
    </>
  );
}
