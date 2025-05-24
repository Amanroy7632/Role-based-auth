import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { BASE_URL } from "../../constant";

const VerifyAccountPage = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  async function verifyToken(token) {
    try {
      const response = await axios.get(
        `${BASE_URL}/auth/verify-account?token=${token}`
      );
      if (response.status === 200) {
        setStatus("success");
        setMessage("Your account has been verified!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        // alert("Account verified successfully.");
      }
    } catch (error) {
      setStatus("error");
      if (error.status === 400) {
        setMessage("TOken is missing.");
      }
      if (error.status === 401) {
        setMessage("Token has been expired.Please create a new account.");
      }
      if (error.status === 409) {
        setMessage("Your account has been already verified.");
        window.location.href = "/login";
      }
      if (error.status === 404) {
        setMessage("Account doesn't exists.Please check your email address.");
      }
      if (error.status === 500) {
        setMessage("Service unavailable.");
      }
      console.log(error);
    }
  }
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Verification token missing.");
      return;
    }

    verifyToken(token);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-md w-full">
        {status === "loading" && (
          <>
            {/* <Loader2 className="animate-spin mx-auto mb-4" size={32} /> */}
            <p className="text-gray-700">Verifying your account...</p>
          </>
        )}

        {status === "success" && (
          <>
            <FaCheckCircle className="text-green-500 mx-auto mb-4" size={32} />
            <p className="text-green-600 font-semibold">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <FaCircle className="text-red-500 mx-auto mb-4" size={32} />
            <p className="text-red-600 font-semibold">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyAccountPage