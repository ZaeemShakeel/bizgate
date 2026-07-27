import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import Solutions from "../components/Solutions";
import About from "../components/About";
import Team from "../components/Team";
import Clients from "../components/Clients";
import CaseStudies from "../components/CaseStudies";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <Solutions />
      <CaseStudies />
      <About />
      <Team />
      <Clients />
      <CTA />
      <Footer />
    </main>
  );
}
