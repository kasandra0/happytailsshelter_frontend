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
  // const token = localStorage.getItem("token");
  // if (!token) return <Navigate to="/login" replace />;
  // const payload = JSON.parse(atob(token.split('.')[1]));
  // if (Date.now() >= payload.exp * 1000) {
  //   localStorage.removeItem("token");
  //   return <Navigate to="/login" replace />;
  // }
  return <Outlet />;
}
