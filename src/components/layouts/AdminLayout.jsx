import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminLogin from "../AdminLogin";
import axios from "axios";
import Loading from "../ui/Loading";

const AdminLayout = () => {
  const [isAdminState, setIsAdminState] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAdmin = async () => {
      const adminToken = JSON.parse(localStorage.getItem("adminToken"));
      if (!adminToken) {
        setIsAdminState(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/check-admin`,
          {
            headers: { adminToken },
          }
        );
        setIsAdminState(response.status === 200);
      } catch (err) {
        console.error("Admin check failed:", err);
        setIsAdminState(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) return <Loading />;

  if (!isAdminState && location.pathname === "/admin") {
    return <AdminLogin />;
  }

  if (isAdminState && location.pathname === "/admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminLayout;
