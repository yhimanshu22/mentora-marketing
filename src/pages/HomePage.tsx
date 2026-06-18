import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Pricing } from '../components/Pricing';
import { Faq } from '../components/Faq';
import { DownloadSection } from '../components/DownloadSection';
import { Footer } from '../components/Footer';
import { Seo } from '../components/Seo';
import { PAGE_SEO, faqJsonLd, homeJsonLd } from '../seo';

export function HomePage() {
  return (
    <>
      <Seo page={PAGE_SEO.home} jsonLd={[homeJsonLd(), faqJsonLd()]} />
      <Header />
      <main className="max-w-full overflow-x-clip">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Faq />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
