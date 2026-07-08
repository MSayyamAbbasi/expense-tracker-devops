import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

/**
 * Guards routes meant for guests only (login/register). If the person
 * is already authenticated, sends them straight to the dashboard.
 */
const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen label="Loading…" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
