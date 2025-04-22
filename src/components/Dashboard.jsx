import React, { useContext, useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  // const { user } = useAuth();

  const { user, loading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    if(user === null) {
      navigate("/login");
    }
  }, [user,navigate])


  if(loading) {
    return <div>Loading...</div>;
  }



  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });

      console.log("logout response: ", res);

      if(res.status === 200) {
        setUser(null);
        navigate("/login"); // Redirect after logout
      }

    } catch (err) {
        console.log("logout error", err);
        toast.error("Logout failed");
    }
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Dashboard</h1>

      <div className="max-w-2xl mx-auto flex items-center gap-4 justify-between">
        <div>Welcome, {user.fullName}</div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full max-w-[200px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Dashboard;
