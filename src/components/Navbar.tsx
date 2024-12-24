import { useState, useEffect } from "react";
import { Menu, X, Youtube, Facebook, Github, Home, Briefcase, FolderKanban, GraduationCap, BookOpen, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Services", path: "/services", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Portfolio", path: "/portfolio", icon: <FolderKanban className="w-5 h-5" /> },
    { name: "Formation", path: "/formation", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Blog", path: "/blog", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-5 h-5" /> },
  ];

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-dark">
              Ronasdev
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center space-x-2 text-secondary-light hover:text-primary transition-colors"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-light hover:text-primary transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary-light hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-2 px-3 py-2 text-secondary-light hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="flex space-x-4 px-3 py-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-light hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;