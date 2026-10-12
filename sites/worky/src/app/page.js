import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Audience from "@/components/Audience";
import Positions from "@/components/Positions";
import AiEngine from "@/components/AiEngine";
import Apply from "@/components/Apply";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProfileModalHost from "@/components/ProfileModalHost";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <HowItWorks />
        <Positions />
        <Audience />
        <AiEngine />
        <Apply />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Reveal />
      <ProfileModalHost />
      <CookieBanner />
    </>
  );
}
