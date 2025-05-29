import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "./ui/Spinner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/loginAdmin`,
        data
      );

      if (result.status === 200) {
        localStorage.setItem("adminToken", JSON.stringify(result.data.token));
        toast.success("Login successful");
        navigate("/admin/dashboard", { replace: true });
      } else {
        toast.error(result?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to login!");
    } finally {
      setLoading(false);
      reset();
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="border border-gray-300 shadow-lg p-4 rounded flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Admin Panel</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-2">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="border border-gray-400 rounded p-1 outline-none w-full"
              {...register("email", { required: true })}
            />
            <br />
            {errors.email && (
              <span className="text-red-500 text-xs font-semibold tracking-wide">
                This field is required!
              </span>
            )}
          </div>

          <div className="space-x-2">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              autoComplete="off"
              className="border border-gray-400 rounded p-1 outline-none w-full"
              {...register("password", { required: true })}
            />
            <br />
            {errors.password && (
              <span className="text-red-500 text-xs font-semibold tracking-wide">
                This field is required!
              </span>
            )}
          </div>
          <button
            type="submit"
            className="mt-2 w-full bg-green-500 text-white py-1 rounded cursor-pointer hover:bg-green-400"
          >
            {loading ? <Spinner /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
