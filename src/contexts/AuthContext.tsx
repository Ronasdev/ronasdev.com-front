/**
 * Contexte d'authentification pour la gestion des utilisateurs
 * 
 * Ce contexte fournit une gestion complète de l'authentification, incluant :
 * - Connexion et déconnexion
 * - Inscription de nouveaux utilisateurs
 * - Réinitialisation de mot de passe
 * - Gestion du profil utilisateur
 * - Vérification des droits d'accès
 * 
 * @module AuthContext
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    authService,
    User, 
    LoginCredentials, 
    RegisterData, 
    PasswordResetRequest, 
    PasswordResetConfirm 
} from '../services/authService';
 
/**
 * Interface définissant les propriétés et méthodes du contexte d'authentification
 */
interface AuthContextType {
    /** Utilisateur actuellement connecté */
    user: User | null;
    /** Indicateur de chargement des données d'authentification */
    isLoading: boolean;
    /** Message d'erreur potentiel */
    error: string | null;
    /** Méthode de connexion */
    login: (credentials: LoginCredentials) => Promise<void>;
    /** Méthode d'inscription */
    register: (data: RegisterData) => Promise<void>;
    /** Méthode de déconnexion */
    logout: () => void;
    /** Méthode de demande de réinitialisation de mot de passe */
    requestPasswordReset: (email: PasswordResetRequest) => Promise<void>;
    /** Méthode de réinitialisation de mot de passe */
    resetPassword: (data: PasswordResetConfirm) => Promise<void>;
    /** Méthode de mise à jour du profil utilisateur */
    updateProfile: (userId: number, data: Partial<User>) => Promise<void>;
    /** Méthode de changement de mot de passe */
    changePassword: (userId: number, oldPassword: string, newPassword: string) => Promise<void>;
    /** Vérifie si un utilisateur est authentifié */
    isAuthenticated: () => boolean;
    /** Vérifie si l'utilisateur a des droits d'administration */
    isAdmin: () => boolean;
    /** Efface les messages d'erreur */
    clearError: () => void;
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Fournisseur de contexte d'authentification
 * 
 * Gère l'état global de l'authentification pour toute l'application
 * 
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Composants enfants
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // États de gestion de l'authentification
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Initialisation de l'authentification au chargement de l'application
     * Vérifie si un token existe et récupère les informations de l'utilisateur
     */
    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = authService.getToken();
                if (token) {
                    const currentUser = await authService.getCurrentUser();
                    setUser(currentUser);
                }
            } catch (error) {
                console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
                // Déconnexion en cas d'erreur de token
                authService.logout();
            } finally {
                setIsLoading(false);
            }
        };
        initAuth();
    }, []);

    /**
     * Gestionnaire générique pour les opérations asynchrones
     * Gère les erreurs et met à jour l'état du contexte
     * 
     * @param {Function} operation - Opération asynchrone à exécuter
     * @param {Function} [successCallback] - Fonction de rappel en cas de succès
     * @returns {Promise} Résultat de l'opération
     */
    const handleAsyncOperation = async <T extends unknown>(
        operation: () => Promise<T>,
        successCallback?: (result: T) => void
    ) => {
        // Réinitialisation de l'erreur avant l'opération
        setError(null);
        try {
            const result = await operation();
            if (successCallback) {
                successCallback(result);
            }
            return result;
        } catch (err) {
            // Gestion standardisée des erreurs
            const errorMessage = err instanceof Error 
                ? err.message 
                : 'Une erreur inattendue est survenue';
            setError(errorMessage);
            throw err;
        }
    };

    /**
     * Méthode de connexion
     * @param {LoginCredentials} credentials - Identifiants de connexion
     */
    const login = async (credentials: LoginCredentials) => {
        await handleAsyncOperation(async () => {
            const response = await authService.login(credentials);
            setUser(response.user);
        });
    };

    /**
     * Méthode d'inscription
     * @param {RegisterData} data - Données d'inscription
     */
    const register = async (data: RegisterData) => {
        await handleAsyncOperation(async () => {
            const response = await authService.register(data);
            setUser(response.user);
        });
    };

    /**
     * Méthode de déconnexion
     * Supprime les informations utilisateur et le token
     */
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    /**
     * Demande de réinitialisation de mot de passe
     * @param {PasswordResetRequest} email - Email pour la réinitialisation
     */
    const requestPasswordReset = async (email: PasswordResetRequest) => {
        await handleAsyncOperation(() => authService.requestPasswordReset(email));
    };

    /**
     * Réinitialisation du mot de passe
     * @param {PasswordResetConfirm} data - Données de réinitialisation
     */
    const resetPassword = async (data: PasswordResetConfirm) => {
        await handleAsyncOperation(() => authService.resetPassword(data));
    };

    /**
     * Mise à jour du profil utilisateur
     * @param {number} userId - ID de l'utilisateur
     * @param {Partial<User>} data - Données de mise à jour
     */
    const updateProfile = async (userId: number, data: Partial<User>) => {
        await handleAsyncOperation(async () => {
            const updatedUser = await authService.updateProfile(userId, data);
            setUser(updatedUser);
        });
    };

    /**
     * Changement de mot de passe
     * @param {number} userId - ID de l'utilisateur
     * @param {string} oldPassword - Ancien mot de passe
     * @param {string} newPassword - Nouveau mot de passe
     */
    const changePassword = async (userId: number, oldPassword: string, newPassword: string) => {
        await handleAsyncOperation(() => 
            authService.changePassword(userId, oldPassword, newPassword)
        );
    };

    /**
     * Vérifie si l'utilisateur est authentifié
     * @returns {boolean} Statut d'authentification
     */
    const isAuthenticated = () => {
        return !!authService.getToken();
    };

    /**
     * Vérifie si l'utilisateur a des droits d'administration
     * @returns {boolean} Statut d'administration
     */
    const isAdmin = () => {
        return user?.role === 'admin';
    };

    /**
     * Efface les messages d'erreur
     */
    const clearError = () => {
        setError(null);
    };

    // Valeur du contexte regroupant toutes les méthodes et états
    const value = {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        updateProfile,
        changePassword,
        isAuthenticated,
        isAdmin,
        clearError,
    };

    // Fourniture du contexte à l'ensemble de l'application
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 * @returns {AuthContextType} Contexte d'authentification
 * @throws {Error} Si utilisé en dehors d'un AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
};
