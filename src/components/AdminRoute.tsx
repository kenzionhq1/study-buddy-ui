import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const adminEmails =
  (import.meta.env.VITE_ADMIN_EMAILS as string | undefined)
    ?.split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean) ?? [];
const allowlist = adminEmails.length > 0 ? adminEmails : ['kehindevictor070@gmail.com'];

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const email = (user?.email || '').toLowerCase();
  const isAdmin = allowlist.includes(email);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/app" replace />;

  return <>{children}</>;
};

export default AdminRoute;
