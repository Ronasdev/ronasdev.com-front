// Composant de navigation principal
// Gère la navigation desktop et mobile avec des liens et des interactions dynamiques

import { useState, useEffect } from "react";
import { Menu, X, Youtube, Facebook, Github, Home, Briefcase, FolderKanban, GraduationCap, BookOpen, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useTheme } from "@/components/theme-provider"; // Ajout du hook de thème

/**
 * Composant de barre de navigation
 * Fournit une navigation responsive avec des liens et des interactions
 * @returns Composant de navigation
 */
const Navbar = () => {
  // États pour gérer l'ouverture du menu mobile et le défilement
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme(); // Récupération du thème actuel

  // Effet pour détecter le défilement et ajuster le style de la navbar
  useEffect(() => {
    const handleScroll = () => {
      // Change l'état si la page a défilé de plus de 20 pixels
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Configuration des liens de navigation
  const navLinks = [
    { name: "Accueil", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Services", path: "/services", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Portfolio", path: "/portfolio", icon: <FolderKanban className="w-5 h-5" /> },
    { name: "Formation", path: "/formation", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Blog", path: "/blog", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-5 h-5" /> },
  ];

  // Configuration des liens sociaux
  const socialLinks = [
    {
      icon: <Youtube className="w-5 h-5" />,
      url: "https://youtube.com/@ronasdev",
      name: "YouTube"
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      url: "https://facebook.com/ronasdev",
      name: "Facebook"
    },
    {
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/ronasdev",
      name: "GitHub"
    },
  ];

  return (
    // Navbar avec effet de transparence et de flou lors du défilement
    <nav className={`
      fixed w-full z-50 transition-all duration-300 
      ${isScrolled ?
        (theme === 'dark' ?
          'bg-secondary-dark/80 backdrop-blur-md shadow-lg' :
          'bg-white/80 backdrop-blur-md shadow-lg'
        ) :
        'bg-transparent'
      }
      ${isOpen ? (theme === 'dark' ?
        'bg-secondary-dark/80 backdrop-blur-md shadow-lg' :
        'bg-white/80 backdrop-blur-md shadow-lg'
      ) :
        'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Titre */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`
                text-2xl font-bold 
                ${theme === 'dark' ? 'text-primary-light' : 'text-primary-dark'}
              `}
            >
              Ronasdev
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    flex items-center space-x-2 
                    ${theme === 'dark' ?
                      'text-secondary-light hover:text-primary-light' :
                      'text-secondary-dark hover:text-primary-dark'
                    } 
                    transition-colors
                  `}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Conteneur pour les liens sociaux et le bouton de thème */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Liens sociaux */}
            <div className="flex space-x-4 mr-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${theme === 'dark' ?
                      'text-secondary-light hover:text-primary-light' :
                      'text-secondary-dark hover:text-primary-dark'
                    } 
                    transition-colors
                  `}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Bouton de changement de thème */}
            <ModeToggle />
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                ${theme === 'dark' ?
                  'text-secondary-light hover:text-primary-light' :
                  'text-secondary-dark hover:text-primary-dark'
                } 
                transition-colors
              `}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className={`
            px-2 pt-2 pb-3 space-y-1
            ${theme === 'dark' ? 'bg-secondary-dark/10' : 'bg-white/10'}
          `}>
            {/* Liens de navigation */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  flex items-center space-x-2 px-3 py-2 
                  ${theme === 'dark' ?
                    'text-secondary-light hover:text-primary-light' :
                    'text-secondary-dark hover:text-primary-dark'
                  } 
                  transition-colors
                `}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            {/* Liens sociaux et bouton de thème */}
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      ${theme === 'dark' ?
                        'text-secondary-light hover:text-primary-light' :
                        'text-secondary-dark hover:text-primary-dark'
                      } 
                      transition-colors
                    `}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;