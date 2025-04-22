import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";
import { AlertCircle, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import clsx from "clsx";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // 'success' | 'already-verified' | 'failed' | 'loading';
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      console.log("Invalid Token");
      setStatus("failed");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_BASE_URL}/api/auth/verify-email?token=${token}`
        );

        if (!res.data.success) {
            console.error("email verification error", res.data.message);
          setStatus("failed");
          return;
        }

        if (res.data.message === "Email already verified") {
          setStatus("already-verified");
          return;
        }

        if (res.data.success) {
          setStatus("success");
          return;
        }
      } catch (err) {
        console.error("email verification error", err);
        setStatus("failed");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  useEffect(() => {
    let timer;
    if (status === "success" || status === "already-verified") {
      timer = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Clean up the interval
    return () => clearInterval(timer);
  }, [status]);

  // New Effect to handle redirect
useEffect(() => {
  if (countdown === 0 && (status === "success" || status === "already-verified")) {
    navigate("/login");
  }
}, [countdown, status, navigate]);

  const statusConfig = {
    loading: {
      icon: RefreshCw,
      title: "Verifying your email...",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    success: {
      icon: CheckCircle2,
      title: "Email verified successfully!",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    "already-verified": {
      icon: CheckCircle2,
      title: "Email already verified",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    failed: {
      icon: XCircle,
      title: "Email verification failed",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  };

  const currentStatus = statusConfig[status];
  const Icon = currentStatus.icon;

  const handleResendVerification = () => {
    // Implement resend verification logic here
    console.log("Resending verification email...");
    toast.success("Resend Email Successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <div
          className={clsx(
            "mx-auto w-16 h-16 rounded-full flex items-center justify-center",
            currentStatus.bgColor
          )}
        >
          <Icon className={clsx("h-8 w-8", currentStatus.color)} />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          {currentStatus.title}
        </h2>

        {(status === "success" || status === "already-verified") && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Redirecting to login page in{" "}
              <span className="text-green-600">{countdown}s</span>
            </p>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-sm text-red-700">
                  Please check the verification link or try again
                </p>
              </div>
            </div>
            <button
              onClick={handleResendVerification}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Resend verification link
            </button>
          </div>
        )}

        {status === "loading" && (
          <div className="animate-spin h-8 w-8 mx-auto">
            <RefreshCw className="h-8 w-8 text-indigo-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;

//   {/* <h2>{status === "loading" ? "Please wait..." : message}</h2>
//   {status === "success" && <p>Redirecting to login page...</p>}
//   {status === "error" && <p>Please check the link or request a new one.</p>} */}
