import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';

export default function AdminLayout() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/auth/login');
            return;
        }

        if (user?.role !== 'admin') {
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    if (!isAuthenticated() || user?.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
