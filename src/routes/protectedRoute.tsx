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
      console.log("Checking auth...");
      console.log("No access token found, redirecting to login...");

      // If accessToken is not available, redirect to login
      if (!accessToken) {
        console.log("No access token found, redirecting to login...");
        setIsAuthenticated(false);
      } else {
        console.log("Access Token:", accessToken);
        setIsAuthenticated(true);
      }

      // Ensure loading state is set after the check
      setLoading(false);
    };

    checkAuth();
  }, []); // Dependency on accessToken to update when token changes

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
