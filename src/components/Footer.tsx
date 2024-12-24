import { Facebook, Github, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ronasdev</h3>
            <p className="text-gray-300">
              Expert en développement web/mobile et formateur passionné, je vous accompagne dans vos projets digitaux.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              {[
                { name: "Services", path: "/services" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Formation", path: "/formation" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
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

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-primary" />
                <span>+229 60934817</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:contact@ronasdev.com"
                  className="hover:text-primary transition-colors"
                >
                  contact@ronasdev.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Cotonou, Bénin</span>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Suivez-moi</h3>
            <div className="flex space-x-4">
              <a
                href="https://youtube.com/@ronasdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/ronasdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/ronasdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>© {currentYear} Ronasdev. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;