import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (Date.now() >= payload.exp * 1000) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
