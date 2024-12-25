/**
 * Composant de pied de page pour le site Ronasdev
 * 
 * Caractéristiques principales :
 * - Affichage des informations de l'entreprise
 * - Liens rapides vers différentes sections du site
 * - Coordonnées de contact
 * - Liens vers les réseaux sociaux
 * - Mention de copyright dynamique
 * 
 * @returns {JSX.Element} Composant de pied de page
 */
import { Facebook, Github, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Récupération dynamique de l'année courante pour le copyright
  const currentYear = new Date().getFullYear();

  // Configuration des liens rapides
  const quickLinks = [
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Formation", path: "/formation" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Configuration des liens sociaux
  const socialLinks = [
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      url: "https://youtube.com/@ronasdev"
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      url: "https://facebook.com/ronasdev"
    },
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/ronasdev"
    }
  ];

  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grille de contenu du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section À propos */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ronasdev</h3>
            <p className="text-gray-300">
              Expert en développement web/mobile et formateur passionné, je vous accompagne dans vos projets digitaux.
            </p>
          </div>

          {/* Section Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact</h3>
            <ul className="space-y-2">
              {/* Numéro de téléphone */}
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-primary" />
                <span>+229 60934817</span>
              </li>
              
              {/* Email de contact */}
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:contact@ronasdev.com"
                  className="hover:text-primary transition-colors"
                >
                  contact@ronasdev.com
                </a>
              </li>
              
              {/* Localisation */}
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Cotonou, Bénin</span>
              </li>
            </ul>
          </div>

          {/* Section Réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Suivez-moi</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p> {currentYear} Ronasdev. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;