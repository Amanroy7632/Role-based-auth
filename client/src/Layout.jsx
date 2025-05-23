import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Header";
import Footer from "./components/layout/Footer";
function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
