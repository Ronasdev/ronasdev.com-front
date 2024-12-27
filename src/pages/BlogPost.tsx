// Page de détail d'article de blog
// Gère l'affichage complet d'un article, ses commentaires et contenus associés

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
import { useTheme } from "@/components/theme-provider";

const BlogPost = () => {
  const { theme } = useTheme();
  const { slug } = useParams<{ slug: string }>();
  
  const [isLoading, setIsLoading] = useState(true);

  const post = blogPosts.find((post) => post.slug === slug);
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  if (!isLoading && !post) {
    return <Navigate to="/404" />;
  }

  if (isLoading || !post) {
    return (
      <div className={`
        min-h-screen 
        ${theme === 'dark' 
          ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
          : 'bg-gradient-to-b from-white to-gray-50'}
      `}>
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
    console.log("Commentaire signalé:", commentId);
  };

  return (
    <div className={`
      min-h-screen 
      ${theme === 'dark' 
        ? 'bg-gradient-to-b from-secondary-dark/50 to-secondary-dark/20' 
        : 'bg-gradient-to-b from-white to-gray-50'}
    `}>
      <Navbar />
      <article className="pt-20 pb-12">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Informations de l'article */}
          <div className={`
            flex items-center justify-between mb-8
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} min de lecture</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5" />
              <span>{post.category}</span>
            </div>
          </div>

          {/* Contenu de l'article */}
          <div className={`
            prose lg:prose-xl 
            ${theme === 'dark' 
              ? 'prose-invert prose-dark' 
              : 'prose-light'}
            mx-auto
          `}>
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Boutons de partage */}
          <div className="mt-12">
            <ShareButtons 
              url={`/blog/${post.slug}`} 
              title={post.title} 
            />
          </div>

          {/* Articles connexes */}
          <div className="mt-16">
            <h3 className={`
              text-2xl font-bold mb-6
              ${theme === 'dark' ? 'text-white' : 'text-secondary-dark'}
            `}>
              Articles connexes
            </h3>
            <RelatedPosts posts={relatedPosts} />
          </div>

          {/* Commentaires */}
          <div className="mt-16">
            <Comments 
              comments={comments}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
              onReportComment={handleReportComment}
            />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
