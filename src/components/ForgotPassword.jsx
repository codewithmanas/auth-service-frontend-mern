import React, { useState } from "react";
import { LoaderCircle, Mail } from "lucide-react";
import { Link, useLocation } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";

function ForgotPassword() {
  const location = useLocation();
  const getEmail = location.state?.email || "";

  const [email, setEmail] = useState(getEmail.trim());
  const [submitted, setSubmitted] = useState(false);
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

      try {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/api/auth/forgot-password`, {
          email: email,
        },
        {
          withCredentials: true,
        }
      );

        if(!data.success) {
          console.log("error response data", data.message);
          toast.error(data.message);
          setLoading(false);
          return;
        }

        console.log("response data", data);

        toast.success("Email sent successfully");
        setSubmitted(true);
        setLoading(false);
        
      } catch (error) {
        console.log("forgot password error", error);
        toast.error("Something went wrong, Try again");
        setLoading(false);
      }

  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center">
          <Mail className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setSubmitted(false)}
              className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              try another email address
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Forgot password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading && <LoaderCircle className="mr-2 animate-spin" color="#ffffff" strokeWidth={2} />}
              {loading ? "Resetting..." : "Reset password"}
              
            </button>
          </div>

          <div className="text-center text-sm">
            <Link
              to={"/login"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
