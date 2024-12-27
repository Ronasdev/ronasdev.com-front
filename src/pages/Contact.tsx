import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";  

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className={`
      min-h-screen 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gradient-to-b from-white to-gray-50'}
    `}>
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className={`
            text-4xl font-bold mb-8
            ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h1>
        <motion.p 
          className={`
            text-xl mb-12
            ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          N'hésitez pas à me contacter pour vos projets de développement ou de formation.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <h2 className={`
                text-2xl font-semibold mb-4
                ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
              `}>
                Informations de contact
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-3 rounded-full
                    ${theme === 'dark' 
                      ? 'bg-primary-dark/20' 
                      : 'bg-primary/10'}
                  `}>
                    <Phone className={`
                      w-6 h-6 
                      ${theme === 'dark' ? 'text-primary-light' : 'text-primary'}
                    `} />
                  </div>
                  <div>
                    <h3 className={`
                      font-medium
                      ${theme === 'dark' ? 'text-gray-200' : 'text-secondary-dark'}
                    `}>
                      Téléphone
                    </h3>
                    <p className={`
                      ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                    `}>
                      +229 60934817
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-3 rounded-full
                    ${theme === 'dark' 
                      ? 'bg-primary-dark/20' 
                      : 'bg-primary/10'}
                  `}>
                    <Mail className={`
                      w-6 h-6 
                      ${theme === 'dark' ? 'text-primary-light' : 'text-primary'}
                    `} />
                  </div>
                  <div>
                    <h3 className={`
                      font-medium
                      ${theme === 'dark' ? 'text-gray-200' : 'text-secondary-dark'}
                    `}>
                      Email
                    </h3>
                    <p className={`
                      ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                    `}>
                      contact@ronasdev.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-3 rounded-full
                    ${theme === 'dark' 
                      ? 'bg-primary-dark/20' 
                      : 'bg-primary/10'}
                  `}>
                    <MapPin className={`
                      w-6 h-6 
                      ${theme === 'dark' ? 'text-primary-light' : 'text-primary'}
                    `} />
                  </div>
                  <div>
                    <h3 className={`
                      font-medium
                      ${theme === 'dark' ? 'text-gray-200' : 'text-secondary-dark'}
                    `}>
                      Adresse
                    </h3>
                    <p className={`
                      ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                    `}>
                      Cotonou, Bénin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className={`
              space-y-6 rounded-lg shadow-lg p-8
              ${theme === 'dark' 
                ? 'bg-secondary-dark/10 border border-secondary-dark/20' 
                : 'bg-white'}
            `}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <label 
                htmlFor="name" 
                className={`
                  block mb-2
                  ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                `}
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`
                  w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2
                  ${theme === 'dark' 
                    ? 'bg-secondary-dark/20 text-white border-secondary-dark/30 focus:ring-primary-light' 
                    : 'border border-gray-300 focus:ring-primary'}
                `}
                required
              />
            </div>
            <div>
              <label 
                htmlFor="email" 
                className={`
                  block mb-2
                  ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                `}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`
                  w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2
                  ${theme === 'dark' 
                    ? 'bg-secondary-dark/20 text-white border-secondary-dark/30 focus:ring-primary-light' 
                    : 'border border-gray-300 focus:ring-primary'}
                `}
                required
              />
            </div>
            <div>
              <label 
                htmlFor="subject" 
                className={`
                  block mb-2
                  ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                `}
              >
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={`
                  w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2
                  ${theme === 'dark' 
                    ? 'bg-secondary-dark/20 text-white border-secondary-dark/30 focus:ring-primary-light' 
                    : 'border border-gray-300 focus:ring-primary'}
                `}
                required
              />
            </div>
            <div>
              <label 
                htmlFor="message" 
                className={`
                  block mb-2
                  ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
                `}
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className={`
                  w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2
                  ${theme === 'dark' 
                    ? 'bg-secondary-dark/20 text-white border-secondary-dark/30 focus:ring-primary-light' 
                    : 'border border-gray-300 focus:ring-primary'}
                `}
                required
              ></textarea>
            </div>
            <Button
              type="submit"
              className={`
                w-full flex items-center justify-center space-x-2
                ${theme === 'dark' 
                  ? 'bg-primary-light text-secondary-dark hover:bg-primary' 
                  : 'bg-primary text-white hover:bg-primary-dark'}
              `}
            >
              <Send className="w-4 h-4" />
              <span>Envoyer le message</span>
            </Button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;