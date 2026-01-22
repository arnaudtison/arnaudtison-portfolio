import { useEffect, useMemo, useState, useRef } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import LenisProvider from "./components/LenisProvider.jsx";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// gsap plugins:
gsap.registerPlugin(ScrollToPlugin);


export default function App() {
  const [cursorEnabled, setCursorEnabled] = useState(false);

  function navigateToSection(type) {
    switch (type) {
      case "home":
        goToSection(0)
        break;
      case "about":
        goToSection(910)
        break;
      case "technologies":
        goToSection(1600)
        break;
      case "work":
        goToSection(2350)
        break;
      case "contact":
        goToSection(1)
      default:
        break;
    }
  }

  const goToSection = (pageY) => {
    if (pageY === 1) {
      gsap.to(window, {
        duration: 1.5, 
        scrollTo: { y: document.body.scrollHeight }, 
        ease: "power3.inOut" // The "smoother" easing
      });
    } else {
      gsap.to(window, {
        duration: 1.5, 
        scrollTo: { y: pageY }, 
        ease: "power3.inOut" // The "smoother" easing
      });
    }
    
  }


  const router = useMemo(
    () =>
      createBrowserRouter([
        { path: "/", element: <Home cursorEnabled={cursorEnabled} 
        setCursorEnabled={setCursorEnabled} /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ]),
    [cursorEnabled, navigateToSection]
  );

  return (
    <>
      <Navbar navigateToSection={navigateToSection} setCursorEnabled={setCursorEnabled} />
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </>
  );
}
