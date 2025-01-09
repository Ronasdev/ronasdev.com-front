// src/components/BlogCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, Clock } from 'lucide-react';
import { BlogPost } from '@/services/blogService';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Formatage de la date
  const formattedDate = new Date(post.created_at).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calcul du temps de lecture estimé
  const readingTime = Math.ceil(post.content?.split(' ').length / 200) || post?.read_time;

  return (
    <div className="bg-white dark:bg-secondary-dark/10 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Image de couverture */}
      {post.featured_image && (
        <img 
          src={post.featured_image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}

      {/* Contenu de la carte */}
      <div className="p-6">
        {/* Titre */}
        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-bold text-primary dark:text-primary-light mb-2 hover:text-primary-dark transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Extrait */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            {/* Date */}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formattedDate}</span>
            </div>

            {/* Temps de lecture */}
            <div className="flex items-center ml-4">
              <Clock className="w-4 h-4 mr-1" />
              <span>{readingTime} min de lecture</span>
            </div>
          </div>

          {/* Catégorie */}
          {post.category && (
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              <span>{post.category.name}</span>
            </div>
          )}
        </div>

        {/* Bouton Lire la suite */}
        <Link 
          to={`/blog/${post.slug}`} 
          className="mt-4 inline-block text-primary dark:text-primary-light hover:underline"
        >
          Lire la suite
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;