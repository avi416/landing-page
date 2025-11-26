import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../components/admin/AdminLayout";

export default function Admin() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/admin/login" />;

  if (!user.isAdmin) return <Navigate to="/" />;

  return <AdminLayout />;
}
