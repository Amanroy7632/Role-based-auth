import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import dashboardRoutes from "./routes/dashboardRoutes";
import landingRoutes from "./routes/landingRoutes";
import ProtectedPage from "./components/protected/ProtectedPage";
import React, { Suspense } from "react";
import NavbarProgressLoader from "./components/common/NavbarLoader";
const DashboardLayout = React.lazy(() => import("./layouts/dahboardLayout"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<NavbarProgressLoader />}>
        <Layout />
      </Suspense>
    ),
    children: [...landingRoutes],
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<NavbarProgressLoader />}>
        <ProtectedPage>
          <DashboardLayout />
        </ProtectedPage>
      </Suspense>
    ),
    children: [...dashboardRoutes],
  },
]);
