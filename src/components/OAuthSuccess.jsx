// pages/OAuthSuccess.jsx or similar route
import { useEffect } from "react";
import { useNavigate } from "react-router";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // Or use secure cookie
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default OAuthSuccess;
