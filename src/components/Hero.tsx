import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-dark mb-6">
            Développeur & Formateur
            <span className="text-primary block mt-2">Fullstack</span>
          </h1>
          <p className="text-lg sm:text-xl text-secondary-light mb-8 max-w-2xl">
            Je transforme vos idées en solutions digitales innovantes et forme la prochaine génération de développeurs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Démarrer un projet
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/formation"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/5 transition-colors"
            >
              Voir les formations
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="w-full h-[400px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-lg animate-float">
            <img
              src="/images/profile.jpg"
              alt="Hero illustration"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;