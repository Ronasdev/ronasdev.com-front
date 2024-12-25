// Configuration principale de l'application React
// Gère le routage, l'authentification et les fournisseurs globaux

// Importations des bibliothèques de gestion d'état et de routage
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";  // Gestion des requêtes et du cache
import { BrowserRouter, Route, Routes } from "react-router-dom";  // Routage côté client
import { Toaster as Sonner } from "@/components/ui/sonner";  // Système de notifications
import { Toaster } from "@/components/ui/toaster";  // Autre système de notifications
import { TooltipProvider } from "@/components/ui/tooltip";  // Fournisseur de tooltips

// Contexte et protection d'authentification
import { AuthProvider } from "./contexts/AuthContext";  // Gestion de l'état d'authentification
import RequireAuth from "./components/auth/RequireAuth";  // Composant de protection des routes

// Importation des pages publiques
import Index from "./pages/Index";  // Page d'accueil
import Services from "./pages/Services";  // Page des services
import Portfolio from "./pages/Portfolio";  // Portfolio de projets
import About from "./pages/About";  // Page À propos
import Blog from "./pages/Blog";  // Liste des articles de blog
import BlogPost from "./pages/BlogPost";  // Article de blog individuel
import Contact from "./pages/Contact";  // Page de contact
import NotFound from "./pages/NotFound";  // Page 404
import FormationPage from "./pages/Formation";  // Page de formations

// Importation des pages admin
import AdminLayout from "./layouts/AdminLayout";  // Mise en page admin
import Dashboard from "./pages/admin/Dashboard";  // Tableau de bord admin
import Articles from "./pages/admin/Articles";  // Gestion des articles
import Formations from "./pages/admin/Formations";  // Gestion des formations
import Users from "./pages/admin/Users";  // Gestion des utilisateurs
import Comments from "./pages/admin/Comments";  // Gestion des commentaires
import Settings from "./pages/admin/Settings";  // Paramètres

// Importation des pages d'authentification
import AuthLayout from "./layouts/AuthLayout";  // Mise en page d'authentification
import Login from "./pages/auth/Login";  // Page de connexion
import Register from "./pages/auth/Register";  // Page d'inscription
import ForgotPassword from "./pages/auth/ForgotPassword";  // Page de mot de passe oublié
import ResetPassword from "./pages/auth/ResetPassword";  // Page de réinitialisation de mot de passe

// Création du client React Query pour la gestion des requêtes
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configuration par défaut des requêtes
      staleTime: 1000 * 60 * 5, // Les données sont considérées fraîches pendant 5 minutes
      cacheTime: 1000 * 60 * 30, // Durée de cache de 30 minutes
      retry: 2, // Nombre de tentatives en cas d'échec
    },
  },
});

export default function App() {
  return (
    // Fournisseur React Query pour la gestion des requêtes et du cache
    <QueryClientProvider client={queryClient}>
      {/* Fournisseur de tooltips pour des info-bulles personnalisées */}
      <TooltipProvider>
        {/* Systèmes de notifications */}
        <Toaster />
        <Sonner />

        {/* Routeur côté client */}
        <BrowserRouter>
          {/* Fournisseur de contexte d'authentification */}
          <AuthProvider>
            {/* Configuration des routes */}
            <Routes>
              {/* Routes publiques accessibles à tous */}
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/formation" element={<FormationPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />

              {/* Routes d'authentification */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
              </Route>

              {/* Routes admin protégées - Nécessitent une authentification */}
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="articles" element={<Articles />} />
                <Route path="formations" element={<Formations />} />
                <Route path="users" element={<Users />} />
                <Route path="comments" element={<Comments />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Route 404 - Page non trouvée */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}