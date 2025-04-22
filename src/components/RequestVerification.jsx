import React from "react";
import { Mail } from "lucide-react";
import { useLocation } from "react-router";

function RequestVerification() {

    const location = useLocation();
    const emailGet = location.state?.email || "your email";

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center">
          <Mail className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a new verification link to <strong>{emailGet}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{" "}
            <button
            //   onClick={() => setSubmitted(false)}
              className="text-indigo-600 hover:text-indigo-500"
            >
              try another email address
            </button>
          </p>
        </div>
      </div>
    );
}

export default RequestVerification;
