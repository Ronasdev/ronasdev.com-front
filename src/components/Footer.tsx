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
import { useTheme } from "@/components/theme-provider";  // Ajout du hook de thème

const Footer = () => {
  // Récupération du thème actuel
  const { theme } = useTheme();

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
    <footer className={`
      mt-20
      ${theme === 'dark' 
        ? 'bg-secondary-dark/10 text-gray-200 border-t border-secondary-dark/20' 
        : 'bg-secondary text-white'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grille de contenu du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section À propos */}
          <div className="space-y-4">
            <h3 className={`
              text-xl font-semibold
              ${theme === 'dark' ? 'text-white' : ''}
            `}>
              Ronasdev
            </h3>
            <p className={`
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}
            `}>
              Expert en développement web/mobile et formateur passionné, je vous accompagne dans vos projets digitaux.
            </p>
          </div>

          {/* Section Liens rapides */}
          <div className="space-y-4">
            <h3 className={`
              text-xl font-semibold
              ${theme === 'dark' ? 'text-white' : ''}
            `}>
              Liens rapides
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`
                      transition-colors
                      ${theme === 'dark' 
                        ? 'text-gray-400 hover:text-primary-light' 
                        : 'text-gray-300 hover:text-primary'}
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Contact */}
          <div className="space-y-4">
            <h3 className={`
              text-xl font-semibold
              ${theme === 'dark' ? 'text-white' : ''}
            `}>
              Contact
            </h3>
            <ul className="space-y-2">
              {/* Numéro de téléphone */}
              <li className="flex items-center space-x-2">
                <Phone className={`
                  w-5 h-5 
                  ${theme === 'dark' ? 'text-primary-light' : 'text-primary'}
                `} />
                <span className={`
                  ${theme === 'dark' ? 'text-gray-300' : ''}
                `}>
                  +229 60934817
                </span>
              </li>
              
              {/* Email de contact */}
              <li className="flex items-center space-x-2">
                <Mail className={`
                  w-5 h-5 
                  ${theme === 'dark' ? 'text-primary-light' : 'text-primary'}
                `} />
                <a
                  href="mailto:contact@ronasdev.com"
                  className={`
                    transition-colors
                    ${theme === 'dark' 
                      ? 'text-gray-300 hover:text-primary-light' 
                      : 'hover:text-primary'}
                  `}
                >
                  contact@ronasdev.com
                </a>
              </li>
              
              {/* Localisation */}
              <li className="flex items-center space-x-2">
                <MapPin className={`
                  w-5 h-5 
                  ${theme === 'dark' ? 'text-primary-light' : 'text-primary'}
                `} />
                <span className={`
                  ${theme === 'dark' ? 'text-gray-300' : ''}
                `}>
                  Cotonou, Bénin
                </span>
              </li>
            </ul>
          </div>

          {/* Section Réseaux sociaux */}
          <div className="space-y-4">
            <h3 className={`
              text-xl font-semibold
              ${theme === 'dark' ? 'text-white' : ''}
            `}>
              Suivez-moi
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    transition-colors
                    ${theme === 'dark' 
                      ? 'text-gray-400 hover:text-primary-light' 
                      : 'text-gray-300 hover:text-primary'}
                  `}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Section Copyright */}
        <div className={`
          border-t mt-8 pt-8 text-center
          ${theme === 'dark' 
            ? 'border-secondary-dark/20 text-gray-500' 
            : 'border-gray-700 text-gray-300'}
        `}>
          <p>{currentYear} Ronasdev. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;