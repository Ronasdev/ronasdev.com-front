import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";
import { motion } from "framer-motion";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="pt-20">
        <motion.div
          className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-secondary-dark mb-6">
            Services Professionnels
          </h1>
          <p className="text-xl text-secondary-light">
            Expertise technique et solutions sur mesure pour vos projets digitaux
          </p>
        </motion.div>
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;