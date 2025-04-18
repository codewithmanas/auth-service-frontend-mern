import { Route, Routes, useNavigate } from "react-router";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";

function Home () {
  const navigate = useNavigate();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}> This is Home Page.</h1>
      <br />

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full max-w-[200px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Sign up
            </button>
            <br />
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full max-w-[200px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Login
            </button>
    </>
  )
}


function App() {
  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/termsofservice" element={<TermsOfService />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<div>404, Path Not Found</div>} />
    </Routes>
    </>
  );
}

export default App;
