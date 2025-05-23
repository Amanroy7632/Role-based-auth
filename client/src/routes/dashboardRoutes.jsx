import React, { Suspense } from "react";
import NavbarProgressLoader from "../components/common/NavbarLoader"
const UserPage = React.lazy(() => import("../pages/dashboard/userPage"));
const SettingsPage = React.lazy(() =>
  import("../pages/dashboard/SettingsPage")
);

const dashboardRoutes = [
  {
    path: "",
    element: <UserPage />,
  },
  {
    path: "users",
    element: <UserPage />,
  },
  {
    path: "setting",
    element: (
      <Suspense fallback={<NavbarProgressLoader/>}>
        <SettingsPage />
      </Suspense>
    ),
  },
];
export default dashboardRoutes;
