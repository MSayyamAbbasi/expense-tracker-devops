import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

/**
 * Guards nested routes so only authenticated users can access them.
 * Waits for the auth bootstrap check to finish before deciding,
 * to avoid a flash-redirect on page refresh.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen label="Checking your session…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
