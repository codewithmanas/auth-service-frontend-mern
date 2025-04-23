import clsx from "clsx";
import { Eye, EyeOff, Github, LoaderCircle, Mail } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    acceptPolicy: true,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.acceptPolicy === false) {
      setLoading(false);
      toast.error("Please accept the privacy policy");
      return;
    }

    setLoading(true);

    if(loading) return;

    try {
      const { data } = await axios.post(`${BACKEND_BASE_URL}/api/auth/register`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if(!data.success) {
        console.log("error response data", data.message);
        toast.error(data.message);
        return;
      }

      console.log("response data", data);
      toast.success("User registered successfully");

      navigate("/check-email", { state: { email: formData.email } });

    } catch (error) {
      console.error("Failed to register user", error);
      toast.error(error?.response?.data?.message || "Something went wrong, Try again");
    } finally {
      setLoading(false);
    }

    
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle google login
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us today and start your journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="acceptPolicy"
                name="acceptPolicy"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={formData.acceptPolicy}
                onChange={handleInputChange}
              />
              <label htmlFor="acceptPolicy" className="ml-2 block text-sm text-gray-900">
                I accept the{' '}
                <Link to={"/termsofservice"} className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to={"/privacypolicy"} className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
                {loading && <LoaderCircle className="mr-2 animate-spin" color="#ffffff" strokeWidth={2} />}
                {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className={clsx(
                "w-full inline-flex justify-center py-2 px-4 border border-gray-300 cursor-pointer",
                "rounded-md shadow-sm bg-white text-sm font-medium text-gray-500",
                "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <Github className="h-5 w-5 mr-2" />
              <span>GitHub</span>
            </button>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className={clsx(
                "w-full inline-flex justify-center py-2 px-4 border border-gray-300 cursor-pointer",
                "rounded-md shadow-sm bg-white text-sm font-medium text-gray-500",
                "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <Mail className="h-5 w-5 mr-2" />
              <span>Google</span>
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link to={"/login"} className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
