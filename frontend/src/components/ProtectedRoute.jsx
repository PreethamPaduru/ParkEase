import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ allowedRole, children }) {
  const token = localStorage.getItem('Token');
  const role = localStorage.getItem('Role');

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    if (role === 'SEEKER') return <Navigate to="/seeker" replace />;
    if (role === 'PROVIDER') return <Navigate to="/provider" replace />;
    if (role === 'ADMIN') return <Navigate to="/admin" replace />;

    return <Navigate to="/login" replace />;
  }

  return children;
}