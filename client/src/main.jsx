import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { SearchContextProvider } from "./context/searchContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <SearchContextProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SearchContextProvider>
  </AuthContextProvider>
);
