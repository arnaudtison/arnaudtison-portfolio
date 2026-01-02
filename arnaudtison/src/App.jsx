import { useMemo, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import LenisProvider from "./components/LenisProvider.jsx";

export default function App() {
  const [cursorEnabled, setCursorEnabled] = useState(false);

  const router = useMemo(
    () =>
      createBrowserRouter([
        { path: "/", element: <Home cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled} /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ]),
    [cursorEnabled]
  );

  return (
    <>
      <Navbar setCursorEnabled={setCursorEnabled} />
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </>
  );
}
