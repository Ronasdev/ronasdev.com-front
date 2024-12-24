import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import YouTubeSection from "../components/YouTubeSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <YouTubeSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;