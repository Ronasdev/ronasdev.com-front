/**
 * Composant AdminLayout
 * 
 * @description Mise en page globale pour l'interface d'administration
 * 
 * Caractéristiques principales :
 * - Protection de l'accès aux routes admin
 * - Structure de page avec en-tête et barre latérale
 * - Gestion dynamique des redirections
 * - Rendu conditionnel basé sur l'authentification et le rôle
 * 
 * @returns {JSX.Element} Structure de page pour l'administration
 */
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';

/**
 * Composant de mise en page pour l'interface d'administration
 * 
 * Workflow :
 * 1. Vérifie l'authentification de l'utilisateur
 * 2. Redirige si non authentifié ou sans droits admin
 * 3. Affiche la structure de page admin avec en-tête, barre latérale et contenu
 */
export default function AdminLayout() {
    // Récupération du contexte d'authentification
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Effet de vérification des droits d'accès
    useEffect(() => {
        // Redirection si non authentifié
        if (!isAuthenticated()) {
            navigate('/auth/login');
            return;
        }

        // Redirection si l'utilisateur n'est pas admin
        if (user?.role !== 'admin') {
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    // Rendu conditionnel : aucun rendu si non autorisé
    if (!isAuthenticated() || user?.role !== 'admin') {
        return null;
    }

    return (
        // Structure de page admin avec fond gris clair
        <div className="min-h-screen bg-gray-100">
            {/* En-tête de l'administration */}
            <Header />
            
            {/* Conteneur principal flex */}
            <div className="flex">
                {/* Barre latérale de navigation */}
                <Sidebar />
                
                {/* Zone de contenu principal */}
                <main className="flex-1 p-6">
                    {/* Outlet pour le rendu des routes enfants */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
