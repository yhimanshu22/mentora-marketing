import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Cta } from './components/Cta';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="site">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
