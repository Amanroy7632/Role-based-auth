import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constant";
import axiosInstance from "../utils/axiosInstance";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState(null);
  const login = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setCurrentUser(response.data?.data);
        
        
        return true;
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST" && error.status === 404) {
        alert("Email not registered."+" User not found.");
      }

      if (error.code === "ERR_BAD_REQUEST" && error.status === 403) {
        alert(
          "Account not Verified. " +
            "Please verify your account.Check your registered email for the verification link."
        );
        setTimeout(() => {
          window.location.href = "/get-verification-link";
        }, 5000);
      }
      if (error.code === "ERR_BAD_REQUEST" && error.status === 423) {
        alert(
          "Account Login Limit exceeded.Please logout from another device before new login."
        );
      }
      if (error.code === "ERR_BAD_REQUEST" && error.status === 401) {
        alert("Invalid credentials " + "Please check your email & password.");
      }

      if (error.code === "ERR_BAD_REQUEST" && error.status === 500) {
        alert("Service Unavilable " + "Please try again after some time.");
      }

      console.error("Login Error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data?.statusCode === 200) {
        setCurrentUser(null);

        return true;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get(`/auth/current-user`, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data?.statusCode === 200) {
        
        setCurrentUser(response.data?.data);
        // return true;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, errorLogin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
