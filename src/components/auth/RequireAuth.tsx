/**
 * Composant RequireAuth
 * 
 * @description Composant de garde pour les routes nécessitant une authentification
 * 
 * Caractéristiques principales :
 * - Protection des routes privées
 * - Gestion des états de chargement
 * - Redirection conditionnelle vers la page de connexion
 * - Conservation de l'URL de destination originale
 * 
 * @param {Object} props - Propriétés du composant
 * @param {JSX.Element} props.children - Composants enfants à rendre si l'authentification est réussie
 * 
 * @returns {JSX.Element} Composant protégé ou page de redirection
 */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Composant de protection des routes nécessitant une authentification
 * 
 * Workflow :
 * 1. Vérifie l'état de chargement de l'authentification
 * 2. Affiche un spinner pendant le chargement
 * 3. Redirige vers la page de connexion si non authentifié
 * 4. Rend les composants enfants si authentifié
 */
export default function RequireAuth({ children }: { children: JSX.Element }) {
  // Récupération du contexte d'authentification
  const auth = useAuth();
  const location = useLocation();

  // Gestion de l'état de chargement : affichage d'un spinner
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Spinner de chargement avec animation */}
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Redirection si l'utilisateur n'est pas authentifié
  if (!auth.isAuthenticated()) {
    // Redirige vers la page de connexion en conservant l'URL de destination
    // Permet de renvoyer l'utilisateur vers sa page initiale après connexion
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Rend les composants enfants si l'authentification est réussie
  return children;
}
