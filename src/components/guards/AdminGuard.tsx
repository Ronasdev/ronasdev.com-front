import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AdminGuardProps {
    children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (!isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AdminGuard;
