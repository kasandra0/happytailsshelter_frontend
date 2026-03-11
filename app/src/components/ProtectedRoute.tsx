import { GlobalContext } from "@/hooks/GlobalContext";
import SidebarLayoutSkeleton from "@/layout/SidebarLayoutSkeleton";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole: number; // 1 for admin, 2 for foster parent
}

export function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useContext(GlobalContext);
  if (isLoading) return <SidebarLayoutSkeleton />;

  if(!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role < requiredRole) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
