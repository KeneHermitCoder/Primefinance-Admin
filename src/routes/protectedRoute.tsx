import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAccessToken from "../features/hooks/useAccessToken";

const ProtectedRoute = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get the accessToken from localStorage via the custom hook
  const accessToken = useAccessToken("get");

  useEffect(() => {
    const checkAuth = () => {
      // If accessToken is not available, redirect to login
      if (!accessToken) setIsAuthenticated(false);
      else setIsAuthenticated(true);

      // Ensure loading state is set after the check
      setLoading(false);
    };

    checkAuth();
  }, [accessToken]); // Added accessToken as dependency since we use it in effect

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
