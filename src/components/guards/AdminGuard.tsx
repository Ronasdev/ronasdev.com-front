/**
 * Composant AdminGuard
 * 
 * @description Garde de route pour l'accès aux pages administrateur
 * 
 * Caractéristiques principales :
 * - Protection des routes réservées aux administrateurs
 * - Gestion des états de chargement
 * - Redirection conditionnelle
 * - Intégration avec le contexte d'authentification
 * 
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Composants enfants à rendre si l'accès est autorisé
 * 
 * @returns {React.ReactElement} Composant protégé ou page de redirection
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Interface des propriétés du composant
interface AdminGuardProps {
    children: React.ReactNode;  // Composants enfants à protéger
}

/**
 * Composant de garde pour les routes administrateur
 * 
 * Vérifie les conditions d'accès :
 * 1. Chargement en cours : affiche un spinner
 * 2. Non authentifié : redirige vers la page de connexion
 * 3. Non administrateur : redirige vers la page d'accueil
 * 4. Administrateur : rend les composants enfants
 */
const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    // Récupération du contexte d'authentification
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const location = useLocation();

    // État de chargement : affichage d'un spinner
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {/* Spinner de chargement */}
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    // Redirection si l'utilisateur n'est pas authentifié
    if (!isAuthenticated()) {
        // Conserve l'emplacement d'origine pour un retour après connexion
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // Redirection si l'utilisateur n'est pas administrateur
    if (!isAdmin()) {
        // Redirige vers la page d'accueil
        return <Navigate to="/" replace />;
    }

    // Rend les composants enfants si toutes les conditions sont remplies
    return <>{children}</>;
};

export default AdminGuard;
