import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    authService,
    User, 
    LoginCredentials, 
    RegisterData, 
    PasswordResetRequest, 
    PasswordResetConfirm 
} from '../services/authService';
 
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    requestPasswordReset: (email: PasswordResetRequest) => Promise<void>;
    resetPassword: (data: PasswordResetConfirm) => Promise<void>;
    updateProfile: (userId: number, data: Partial<User>) => Promise<void>;
    changePassword: (userId: number, oldPassword: string, newPassword: string) => Promise<void>;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = authService.getToken();
                if (token) {
                    const currentUser = await authService.getCurrentUser();
                    setUser(currentUser);
                }
            } catch (error) {
                console.error('Erreur lors de l\'initialisation de l\'auth:', error);
            } finally {
                setIsLoading(false);
            }
        };
        initAuth();
    }, []);

    const handleAsyncOperation = async <T extends unknown>(
        operation: () => Promise<T>,
        successCallback?: (result: T) => void
    ) => {
        setError(null);
        try {
            const result = await operation();
            if (successCallback) {
                successCallback(result);
            }
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
            setError(errorMessage);
            throw err;
        }
    };

    const login = async (credentials: LoginCredentials) => {
        await handleAsyncOperation(async () => {
            const response = await authService.login(credentials);
            setUser(response.user);
        });
    };

    const register = async (data: RegisterData) => {
        await handleAsyncOperation(async () => {
            const response = await authService.register(data);
            setUser(response.user);
        });
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const requestPasswordReset = async (email: PasswordResetRequest) => {
        await handleAsyncOperation(() => authService.requestPasswordReset(email));
    };

    const resetPassword = async (data: PasswordResetConfirm) => {
        await handleAsyncOperation(() => authService.resetPassword(data));
    };

    const updateProfile = async (userId: number, data: Partial<User>) => {
        await handleAsyncOperation(async () => {
            const updatedUser = await authService.updateProfile(userId, data);
            setUser(updatedUser);
        });
    };

    const changePassword = async (userId: number, oldPassword: string, newPassword: string) => {
        await handleAsyncOperation(() => 
            authService.changePassword(userId, oldPassword, newPassword)
        );
    };

    const isAuthenticated = () => {
        return !!authService.getToken();
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const clearError = () => {
        setError(null);
    };

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

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
};
