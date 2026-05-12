import { useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import LenisProvider from './components/LenisProvider.jsx';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// gsap plugins:
gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const [cursorEnabled, setCursorEnabled] = useState(false);

  function navigateToSection(type) {
    if (type === 'home') {
      goToSection(0);
      return;
    }
    const sectionId = type === 'about' ? 'about'
      : type === 'technologies' ? 'technologies'
        : type === 'work' ? 'work'
          : type === 'experience' ? 'experience'
            : type === 'contact' ? 'contact'
              : null;
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    if (!el) return;
    const nav = document.querySelector('.navigation-wrapper');
    const navHeight = nav ? nav.offsetHeight : 0;
    const paddingTop = parseInt(getComputedStyle(el).paddingTop) || 0;
    const y = el.getBoundingClientRect().top + window.scrollY + paddingTop - navHeight - 32;
    goToSection(Math.max(0, y));
  }

  const goToSection = (pageY) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: pageY },
      ease: 'power3.inOut',
    });
  };

  const router = useMemo(
    () =>
      createBrowserRouter([
        { path: '/', element: <Home cursorEnabled={cursorEnabled} 
          setCursorEnabled={setCursorEnabled} /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ]),
    [cursorEnabled],
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
