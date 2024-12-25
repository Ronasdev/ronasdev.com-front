// Page d'accueil principale du site
// Assemble les différents composants pour créer la page de destination

// Importation des composants nécessaires pour la page d'accueil
import Navbar from "../components/Navbar";          // Barre de navigation
import Hero from "../components/Hero";              // Section héroïque/bannière
import Services from "../components/Services";      // Section des services
import Stats from "../components/Stats";            // Section des statistiques
import Testimonials from "../components/Testimonials"; // Section des témoignages
import YouTubeSection from "../components/YouTubeSection"; // Section vidéo YouTube
import Footer from "../components/Footer";          // Pied de page

/**
 * Composant de la page d'accueil
 * Combine différents composants pour créer une expérience utilisateur complète
 * @returns Rendu de la page d'accueil
 */
const Index = () => {
  return (
    // Conteneur principal avec une hauteur minimale de l'écran
    <div className="min-h-screen">
      <Navbar />        {/* Barre de navigation en haut de page */}
      <Hero />          {/* Section héroïque/bannière principale */}
      <Services />      {/* Présentation des services */}
      <Stats />         {/* Statistiques et chiffres clés */}
      <YouTubeSection /> {/* Section de contenu vidéo */}
      <Testimonials />  {/* Témoignages et avis clients */}
      <Footer />        {/* Pied de page */}
    </div>
  );
};

export default Index;