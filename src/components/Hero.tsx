// Importation des dépendances essentielles
// framer-motion pour les animations fluides
// lucide-react pour les icônes prêtes à l'emploi
// Composants UI personnalisés
import { motion } from "framer-motion"  // Bibliothèque d'animations déclaratives
import { ArrowRight } from "lucide-react"  // Icônes vectorielles pour les boutons
import { Link } from "react-router-dom"  // Composant de lien personnalisé avec React Router

/**
 * Composant Hero - Section d'introduction principale
 * 
 * @description Affiche une section héroïque avec une présentation personnelle
 * Caractéristiques:
 * - Animation d'entrée douce
 * - Boutons d'action (CV, Contact)
 * - Mise en page responsive
 * - Support du mode sombre/clair
 * 
 * @returns {JSX.Element} Section héroïque principale
 */
const Hero = () => {
  return (
    // Section pleine largeur avec padding responsive et dégradé de fond
    // Utilise flexbox pour un alignement vertical et horizontal centré
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-16">
      {/* Conteneur principal avec largeur maximale et centrage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Colonne de texte avec animation Framer Motion */}
        <motion.div 
          // Configuration de l'animation d'entrée
          initial={{ opacity: 0, y: 20 }}  // Commence transparent et décalé
          animate={{ opacity: 1, y: 0 }}   // Animation vers l'état visible
          transition={{ duration: 0.5 }}   // Durée de transition douce
          // Grille responsive avec disposition flexible
          className="flex-1 text-center lg:text-left"
        >
          {/* Conteneur de texte avec espacement vertical */}
          <div className="space-y-2">
            {/* Titre principal avec tailles responsives et mise en valeur */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-dark mb-6">
              Développeur & Formateur
              <span className="text-primary block mt-2">Fullstack</span>
            </h1>
            {/* Description avec style de texte adaptatif */}
            <p className="text-lg sm:text-xl text-secondary-light mb-8 max-w-2xl">
              Je transforme vos idées en solutions digitales innovantes et forme la prochaine génération de développeurs.
            </p>
          </div>
          
          {/* Conteneur des boutons d'action avec disposition responsive */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            {/* Bouton de démarrage de projet avec effet de survol */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Démarrer un projet
              <ArrowRight className="ml-2 w-4 h-4" />  // Icône de direction
            </Link>
            
            {/* Bouton de formations avec style secondaire */}
            <Link
              to="/formation"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/5 transition-colors"
            >
              Voir les formations
            </Link>
          </div>
        </motion.div>
        
        {/* Colonne visuelle avec animation d'entrée */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}  // Commence transparent et réduit
          animate={{ opacity: 1, scale: 1 }}   // Animation vers l'état visible
          transition={{ duration: 0.5, delay: 0.2 }}   // Délai pour un effet séquentiel
          className="flex-1 relative"
        >
          {/* Conteneur d'image avec dégradé de fond et animation de flottement */}
          <div className="w-full h-[400px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-lg animate-float">
            {/* Image de profil avec couverture complète */}
            <img 
              src="/images/profile.jpg"  // Remplacer par votre image personnelle
              alt="Illustration de profil de Ronasdev" 
              className="w-full h-full object-contain rounded-lg"  // Assure que l'image couvre tout l'espace
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero  // Exportation du composant pour utilisation ailleurs