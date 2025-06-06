import React, { useEffect, useState } from "react";
import AdminProducts from "./AdminProducts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";

const AdminDashboard = () => {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAdmin = async () => {
      const token = JSON.parse(localStorage.getItem("adminToken"));
      if (!token) {
        navigate("/admin", { replace: true });
      }
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/check-admin`,
          {
            headers: { adminToken: token },
          }
        );
        if (result.status !== 200) {
          navigate("/admin", { replace: true });
        }
      } catch (error) {
        console.log(error);
        toast.error("Session expired. Please log in again.");
        navigate("/admin", { replace: true });
      }
    };
    verifyAdmin();
  }, [navigate]);
  return (
    <div>
      <header className="relative w-full flex justify-center items-center shadow-lg">
        <div className="absolute md:top-1 top-2 md:left-8 left-3">
          <img src="/ekart_logo.png" alt="logo" className="md:w-24 w-16" />
        </div>
        <nav className="flex justify-center items-center px-2 py-3 min-w-[80%]">
          <ul className="flex gap-6">
            {["Users", "Products", "Orders"].map((item, idx) => {
              return (
                <li
                  key={idx}
                  className={`hover:scale-110 hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer ${
                    selected === idx
                      ? "scale-110 font-semibold"
                      : "scale-100 font-normal"
                  }`}
                >
                  <button onClick={() => setSelected(idx)}>{item}</button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <section>{selected === 0 && <AdminUsers />}</section>
      <section>{selected === 1 && <AdminProducts />}</section>
      <section>{selected === 2 && <AdminOrders />}</section>
    </div>
  );
};

export default AdminDashboard;
