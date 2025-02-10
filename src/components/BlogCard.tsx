
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Calendar, Tag, Clock } from 'lucide-react';
// import { BlogPost } from '@/services/blogService';

// interface BlogCardProps {
//   post: BlogPost;
// }

// const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
//   // Formatage de la date
//   const formattedDate = new Date(post.created_at).toLocaleDateString('fr-FR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   // Calcul du temps de lecture estimé
//   const readingTime = Math.ceil(post.content?.split(' ').length / 200) || post?.read_time;

//   return (
//     <div className="bg-white dark:bg-secondary-dark/10 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
//       {/* Image de couverture */}
//       {post.featured_image && (
//         <img 
//           src={post.featured_image} 
//           alt={post.title} 
//           className="w-full h-48 object-cover"
//         />
//       )}

//       {/* Contenu de la carte */}
//       <div className="p-6">
//         {/* Titre */}
//         <Link to={`/blog/${post.slug}`} className="block">
//           <h3 className="text-xl font-bold text-primary dark:text-primary-light mb-2 hover:text-primary-dark transition-colors">
//             {post.title}
//           </h3>
//         </Link>

//         {/* Extrait */}
//         <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
//           {post.excerpt}
//         </p>

//         {/* Métadonnées */}
//         <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
//           <div className="flex items-center space-x-2">
//             {/* Date */}
//             <div className="flex items-center">
//               <Calendar className="w-4 h-4 mr-1" />
//               <span>{formattedDate}</span>
//             </div>

//             {/* Temps de lecture */}
//             <div className="flex items-center ml-4">
//               <Clock className="w-4 h-4 mr-1" />
//               <span>{readingTime} min de lecture</span>
//             </div>
//           </div>

//           {/* Catégorie */}
//           {post.category && (
//             <div className="flex items-center">
//               <Tag className="w-4 h-4 mr-1" />
//               <span>{post.category.name}</span>
//             </div>
//           )}
//         </div>

//         {/* Bouton Lire la suite */}
//         <Link 
//           to={`/blog/${post.slug}`} 
//           className="mt-4 inline-block text-primary dark:text-primary-light hover:underline"
//         >
//           Lire la suite
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import ShareButtons from './ShareButtons';
import { BlogPost } from '@/services/blogService';

interface BlogCardProps {
  post: BlogPost;
  viewMode?: 'grid' | 'list';
  theme?: 'light' | 'dark';
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  viewMode = 'grid',
  theme = 'light' 
}) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  return (
    <article className={`
      rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow
      ${theme === 'dark'
        ? 'bg-secondary-dark/10 border border-secondary-dark/20'
        : 'bg-white'}
    `}>
      {/* Image de couverture */}
      <img
        src={VITE_API_URL + post.featured_image}
        alt={post.title}
        className={`
          w-full h-48 object-cover
          ${theme === 'dark' ? 'opacity-80' : 'opacity-100'}
        `}
      />
      <div className="p-6">
        {/* Métadonnées de l'article */}
        <div className={`
           flex items-center space-x-4 text-sm mb-4
           ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
         `}>
          {/* Catégorie principale */}
          <span className={`
             px-3 py-1 rounded-full
             ${theme === 'dark'
              ? 'bg-primary-dark/20 text-primary-light'
              : 'bg-primary/10 text-primary'}
           `}>
            {post?.categories[0]}
          </span>
          {/* Date de publication */}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.created_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          {/* Temps de lecture */}
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.read_time || 5} min
          </div>
        </div>
        {/* Titre de l'article */}
        <h2 className={`
          text-xl font-semibold mb-2
          ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
        `}>
          {post.title}
        </h2>
        {/* Extrait de l'article */}
        <p className={`
           mb-4
           ${theme === 'dark' ? 'text-gray-300' : 'text-secondary-light'}
           `}
           dangerouslySetInnerHTML={{ __html: post.excerpt }}
           
           />
        {/* Lien de lecture et le partage de l'article*/}
        <div className="flex items-center justify-between">
          {/* Lien de lecture */}
          <Link
            to={`/blog/${post.slug}`}
            className={`
              inline-flex items-center font-medium transition-colors
              ${theme === 'dark'
                ? 'text-primary-light hover:text-primary'
                : 'text-primary hover:text-primary-dark'}
            `}
          >
            Lire la suite
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
          <ShareButtons
            url={`${window.location.origin}/blog/${post.slug}`}
            title={post.title}
          />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;