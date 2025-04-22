import React, { useState } from "react";
import { useLocation } from "react-router";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

function CheckEmail() {
  const location = useLocation();
  const email = location.state?.email || "your email";

  const [resendEmail, setResendEmail] = useState(false);

  const resendEmailVerification = () => {

    if(email === "your email") {
      toast.error("Email not found");
      return;
    }

    setResendEmail(true);
    toast.success("Resend Email Successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <Mail className="mx-auto h-12 w-12 text-indigo-600" />
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Verify your email
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            We've sent a verification link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-600">
            Click the link in the email to verify your account and complete the
            registration process.
          </p>
          <div className="pt-4">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={resendEmailVerification}
                disabled={resendEmail}
                className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                resend verification email
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;
