import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    BookOpen,
    MessageSquare,
    Users,
    Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
    { name: 'Articles', href: '/admin/articles', icon: FileText },
    { name: 'Formations', href: '/admin/formations', icon: BookOpen },
    { name: 'Commentaires', href: '/admin/comments', icon: MessageSquare },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
    return (
        <aside className="w-64 bg-white shadow-sm min-h-screen">
            <nav className="p-4 space-y-1">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-gray-600 hover:bg-gray-50'
                            )
                        }
                        end={item.href === '/admin'}
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
