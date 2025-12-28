import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import LenisProvider from "./components/LenisProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*", 
    element: <Navigate to="/" replace />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <LenisProvider>
      <RouterProvider router={router} />
    </LenisProvider>
  </StrictMode>
);
