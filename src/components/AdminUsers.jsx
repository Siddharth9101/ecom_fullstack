import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./ui/Spinner";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [refreshUI, setRefreshUI] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/users/`,
          {
            headers: {
              adminToken: JSON.parse(localStorage.getItem("adminToken")),
            },
          }
        );
        const adminID = JSON.parse(localStorage.getItem("adminId"));
        const updatedUsers = result.data.users.filter(
          (user) => user._id !== adminID
        );
        setUsers(updatedUsers);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [refreshUI]);

  const onStatusChange = async (userId, status) => {
    try {
      setUpdatingStatus(true);
      await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/users/${userId}`,
        { status },
        {
          headers: {
            adminToken: JSON.parse(localStorage.getItem("adminToken")),
          },
        }
      );

      setRefreshUI((p) => !p);
      toast.success("Role Updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status!");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading)
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="w-full flex justify-center items-center">{error}</div>
    );

  if (users?.length === 0)
    return (
      <div className="w-full flex justify-center items-center">
        No Users found!
      </div>
    );
  return (
    <div className="md:px-26 px-8">
      <div>
        {users?.map((user) => (
          <div
            key={user._id}
            className="border border-gray-400 shadow-lg p-4 mb-4"
          >
            <div className="space-y-5 md:space-y-0 md:flex md:justify-between md:items-center">
              <div className="font-semibold">
                Full Name: <span className="font-normal">{user?.fullname}</span>
              </div>

              <div className="font-semibold">
                Email: <span className="font-normal">{user?.email}</span>
              </div>

              <div className="font-semibold">
                Is Admin:{" "}
                <select
                  name="orderStatus"
                  id="orderStatus"
                  className="outline-none border border-gray-400 rounded"
                  onChange={(e) => {
                    onStatusChange(user._id, e.target.value);
                  }}
                  disabled={updatingStatus}
                >
                  <option value={user.isAdmin}>
                    {user.isAdmin ? "Yes" : "No"}
                  </option>
                  <option value={user.isAdmin ? false : true}>
                    {user.isAdmin ? "No" : "Yes"}
                  </option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
