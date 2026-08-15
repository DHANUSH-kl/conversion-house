import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoStrip />
        <Services />
        <Process />
        <Testimonials />
        <Pricing />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
