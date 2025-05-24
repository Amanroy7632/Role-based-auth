import React from "react";

const LoginPage=React.lazy(()=>import( "../pages/landing/LoginPage"));
const RegisterPage =React.lazy(()=>import("../pages/landing/RegisterPage"));
const HomePage=React.lazy(()=>import( "../pages/landing/HomePage"));
const VerifyAccountPage=React.lazy(()=>import( "../pages/landing/verifyAccount"));
const AccountVerificationPage=React.lazy(()=>import( "../pages/landing/AccountVerificationPage"));
const AboutUs=React.lazy(()=>import( "../pages/landing/AboutUsPage"));
const ContactUs=React.lazy(()=>import( "../pages/landing/ContactUsPage"));
const ResetPassword=React.lazy(()=>import( "../pages/landing/ResetPasswordPage"));
const landingRoutes = [
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "about",
    element: <AboutUs />,
  },
  {
    path: "contact",
    element: <ContactUs />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "verify-account",
    element: <VerifyAccountPage />,
  },
  {
    path: "get-verification-link",
    element: <AccountVerificationPage />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
];
export default landingRoutes;
