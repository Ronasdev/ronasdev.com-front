import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "David K.",
      role: "Entrepreneur",
      content: "La formation avec Ronasdev m'a permis de créer mon propre site e-commerce. La pédagogie est excellente !",
      rating: 5,
    },
    {
      name: "Sarah M.",
      role: "Développeuse Junior",
      content: "Les cours sont très bien structurés et le suivi est personnalisé. Je recommande vivement !",
      rating: 5,
    },
    {
      name: "Jean P.",
      role: "Chef de Projet",
      content: "Une expertise technique impressionnante et une réelle capacité à transmettre ses connaissances.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-dark mb-4">
            Ce que disent mes étudiants
          </h2>
          <p className="text-secondary-light max-w-2xl mx-auto">
            Découvrez les retours d'expérience de ceux qui ont suivi mes formations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-secondary-light mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-secondary-dark">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-secondary-light">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;