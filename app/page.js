import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import Solutions from "../components/Solutions";
import About from "../components/About";
import Team from "../components/Team";
import Clients from "../components/Clients";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import RevealObserver from "../components/RevealObserver";

export default function Home() {
  return (
    <RevealObserver>
      <main className="overflow-x-hidden">
        <Header />
        <Hero />
        <TrustBar />
        <Services />
        <Solutions />
        <About />
        <Team />
        <Clients />
        <CTA />
        <Footer />
      </main>
    </RevealObserver>
  );
}
