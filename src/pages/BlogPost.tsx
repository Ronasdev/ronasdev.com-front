import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShareButtons from "../components/ShareButtons";
import Comments from "../components/Comments";
import RelatedPosts from "../components/RelatedPosts";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { blogPosts, getRelatedPosts } from "../data/blogPosts";

/**
 * Page de détail d'un article de blog
 * Affiche le contenu complet de l'article avec système de commentaires
 */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);

  // Récupération de l'article
  const post = blogPosts.find((post) => post.slug === slug);
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  // Simulation d'un chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // État pour les commentaires
  const [comments, setComments] = useState([
    {
      id: "1",
      author: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
      },
      content: "Super article ! J'ai beaucoup appris.",
      date: "2024-01-15T10:30:00",
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: "2",
          author: {
            name: "Jane Smith",
            avatar: "/avatars/jane.jpg",
          },
          content: "Totalement d'accord avec toi !",
          date: "2024-01-15T11:00:00",
          likes: 2,
          isLiked: false,
        },
      ],
    },
  ]);

  // Redirection si l'article n'existe pas
  if (!isLoading && !post) {
    return <Navigate to="/404" />;
  }

  // Affichage d'un skeleton loader pendant le chargement
  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <div className="animate-pulse pt-20 pb-12">
          <div className="h-96 bg-gray-200 mb-8" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="h-8 bg-gray-200 w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 w-1/2 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 w-full" />
              <div className="h-4 bg-gray-200 w-5/6" />
              <div className="h-4 bg-gray-200 w-4/6" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddComment = (content: string, parentId?: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: {
        name: "Utilisateur",
        avatar: "/avatars/default.jpg",
      },
      content,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    if (parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newComment],
          };
        }
        return comment;
      }));
    } else {
      setComments([...comments, newComment]);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked,
              };
            }
            return reply;
          }),
        };
      }
      return comment;
    }));
  };

  const handleReportComment = (commentId: string) => {
    // Implémentation du signalement
    console.log("Commentaire signalé:", commentId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <article className="pt-20 pb-12">
        {/* En-tête de l'article */}
        <div className="relative h-96 mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {post.title}
              </motion.h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Métadonnées de l'article */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-sm text-gray-500">{post.excerpt}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4 sm:mt-0">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} min de lecture
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contenu principal */}
            <div className="lg:w-2/3">
              {/* Catégories et partage */}
              <div className="flex flex-wrap items-center justify-between mb-8">
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      <Tag className="w-4 h-4 mr-1" />
                      {category}
                    </span>
                  ))}
                </div>
                <ShareButtons
                  title={post.title}
                  url={window.location.href}
                />
              </div>

              {/* Contenu de l'article */}
              <motion.div
                className="prose prose-lg max-w-none mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p>{post.excerpt}</p>
                {/* Ajoutez ici le contenu complet de l'article */}
              </motion.div>

              {/* Section commentaires */}
              <div className="mt-12 pt-8 border-t">
                <Comments
                  comments={comments}
                  onAddComment={handleAddComment}
                  onLikeComment={handleLikeComment}
                  onReportComment={handleReportComment}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Articles liés */}
                <RelatedPosts posts={relatedPosts} />
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
