import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../constants";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/auth/current-user`, {
        withCredentials: true,
      });

      // if (!res.data.success) {
      //   setUser(null);
      //   return;
      // }

      if (res.data?.data) {
        setUser(res.data.data);
      } else {
        setUser(null); // Unauthenticated
      }
    } catch (err) {
      console.log("check auth error", err);
      setUser(null);
    } finally {
      setLoading(false); // Done loading, no matter what
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
