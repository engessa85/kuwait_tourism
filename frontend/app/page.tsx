import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import Hero from "@/components/Landing/Hero";
import Categories from "@/components/Landing/Categories";
import Experiences from "@/components/Landing/Experiences";
import MapSection from "@/components/Landing/MapSection";

import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <Categories />
          <Experiences />
          <MapSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
