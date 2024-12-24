import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { BlogPost } from "../data/blogPosts";

interface RelatedPostsProps {
  posts: BlogPost[];
}

/**
 * Composant affichant les articles liés
 * Affiche une liste d'articles similaires avec une animation d'entrée
 */
const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Articles similaires</h3>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="flex gap-4 group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-secondary-dark group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center text-sm text-secondary-light mt-2">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min de lecture
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
