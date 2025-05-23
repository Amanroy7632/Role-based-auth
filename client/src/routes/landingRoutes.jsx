import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import VerifyAccountPage from "../pages/verifyAccount";
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
];
export default landingRoutes;
