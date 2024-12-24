import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">À propos de moi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Qui suis-je ?</h2>
            <p className="text-gray-600">
              Je suis un développeur full-stack passionné par la création d'applications web modernes et performantes.
              Avec plusieurs années d'expérience dans le développement web, je me spécialise dans les technologies
              React, TypeScript et Node.js.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Mes compétences</h3>
              <ul className="space-y-2">
                <li>• React & TypeScript</li>
                <li>• Node.js & Express</li>
                <li>• Next.js & Gatsby</li>
                <li>• PHP & Laravel</li>
                <li>• MongoDB & PostgreSQL</li>
                <li>• AWS & Docker</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Mon parcours</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">2020 - Présent</h3>
                <p className="text-gray-600">Développeur Full-stack Freelance</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">2018 - 2020</h3>
                <p className="text-gray-600">Développeur Front-end Senior</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">2016 - 2018</h3>
                <p className="text-gray-600">Développeur Web Junior</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Certifications</h3>
              <ul className="space-y-2">
                <li>• AWS Certified Developer</li>
                <li>• MongoDB Certified Developer</li>
                <li>• React Certification</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
