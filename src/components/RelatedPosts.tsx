import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { BlogPost } from "../data/blogPosts";
import { useTheme } from "@/components/theme-provider";

interface RelatedPostsProps {
  posts: BlogPost[];
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

/**
 * Composant affichant les articles liés
 * Affiche une liste d'articles similaires avec une animation d'entrée
 */
const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  const { theme } = useTheme();

  return (
    <div className={`
      rounded-xl shadow-sm p-6
      ${theme === 'dark' 
        ? 'bg-secondary-dark/10 border border-secondary-dark/20' 
        : 'bg-white'}
    `}>
      <h3 className={`
        text-lg font-semibold mb-6
        ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
      `}>
        Articles similaires
      </h3>
      <div className="space-y-6">
        {posts?.map((post, index) => (
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
                src={VITE_API_URL+ post.featured_image}
                alt={post.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className={`
                  font-medium group-hover:text-primary transition-colors
                  ${theme === 'dark' 
                    ? 'text-gray-200 group-hover:text-primary-light' 
                    : 'text-secondary-dark'}
                `}>
                  {post.title}
                </h4>
                <div className={`
                  flex items-center text-sm mt-2
                  ${theme === 'dark' ? 'text-gray-400' : 'text-secondary-light'}
                `}>
                  <Clock className="w-4 h-4 mr-1" />
                  {post.read_time} min de lecture
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
