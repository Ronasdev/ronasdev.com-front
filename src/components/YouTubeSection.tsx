import { motion } from "framer-motion";
import { Youtube, ArrowRight } from "lucide-react";

const YouTubeSection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white mb-4">
              <Youtube className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-secondary-dark">
              Rejoignez ma chaîne YouTube
            </h2>
            <p className="text-secondary-light">
              Découvrez des tutoriels gratuits, des astuces de développement et
              restez à jour avec les dernières technologies web et mobile.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-secondary-light">
                <ArrowRight className="w-5 h-5 text-primary mr-2" />
                Tutoriels détaillés sur React, Laravel, et plus
              </li>
              <li className="flex items-center text-secondary-light">
                <ArrowRight className="w-5 h-5 text-primary mr-2" />
                Projets pratiques de A à Z
              </li>
              <li className="flex items-center text-secondary-light">
                <ArrowRight className="w-5 h-5 text-primary mr-2" />
                Conseils pour devenir développeur
              </li>
            </ul>
            <a
              href="https://youtube.com/@ronasdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              S'abonner à la chaîne
              <Youtube className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <iframe
                width="100%"
                height="100%"
                // src="https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID"
                src="https://www.youtube.com/embed/Bi-Z6_-Ubtg?si=veCOfmAfTbixYZxc"
                title="YouTube playlist Ronasdev"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;