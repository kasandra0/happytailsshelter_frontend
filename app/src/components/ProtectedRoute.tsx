import { GlobalContext } from "@/hooks/GlobalContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole: number; // 1 for admin, 2 for foster parent
}

export function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { user, isLoading: isLoading } = useContext(GlobalContext);
  if (isLoading) return <div>App Loading...</div>;
  
  if(!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role < requiredRole) {
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
}
