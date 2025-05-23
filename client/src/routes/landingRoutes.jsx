import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import VerifyAccountPage from "../pages/verifyAccount";
import AccountVerificationPage from "../pages/AccountVerificationPage";
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
];
export default landingRoutes;
