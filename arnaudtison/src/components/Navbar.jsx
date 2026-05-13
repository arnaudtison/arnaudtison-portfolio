import '../css/home.scss';
import {
  Github,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
} from 'lucide-react';
import logo from '../assets/at_logo.png';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const sectionIds = {
  about: 'about',
  technologies: 'technologies',
  work: 'work',
  experience: 'experience',
  contact: 'contact',
};

function getSectionDirection(sectionKey) {
  const el = document.getElementById(sectionIds[sectionKey]);
  if (!el) return 'down';
  return el.getBoundingClientRect().top < 0 ? 'up' : 'down';
}

function NavCursorArrow({ hovered }) {
  const arrowRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      if (arrowRef.current) {
        arrowRef.current.style.transform =
          `translate3d(${pos.current.x + 20}px, ${pos.current.y - 42}px, 0)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  let Icon = null;
  let animClass = '';
  if (hovered === 'logo') {
    Icon = ArrowUp;
    animClass = 'nav-arrow-anim--up';
  } else if (hovered === 'linkedin' || hovered === 'github') {
    Icon = ArrowUpRight;
    animClass = 'nav-arrow-anim--upright';
  } else if (hovered && sectionIds[hovered]) {
    const dir = getSectionDirection(hovered);
    Icon = dir === 'up' ? ArrowUp : ArrowDown;
    animClass = dir === 'up' ? 'nav-arrow-anim--up' : 'nav-arrow-anim--down';
  }

  return createPortal(
    <div
      ref={arrowRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 999997,
        opacity: Icon ? 1 : 0,
        transition: 'opacity 0.15s ease',
        willChange: 'transform',
      }}
    >
      {Icon && (
        <span className={animClass}>
          <Icon size={36} strokeWidth={2.2} color="#000" />
        </span>
      )}
    </div>,
    document.body,
  );
}

export default function Navbar({ setCursorEnabled, navigateToSection }) {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    return () => document.documentElement.classList.remove('menu-open');
  }, [menuOpen]);

  const navigateToExternal = (dest) => {
    window.open(dest, '_blank', 'noopener,noreferrer');
  };

  const handleSectionNav = (key) => {
    navigateToSection(key);
    setMenuOpen(false);
  };

  const navLinks = [
    { key: 'about', label: 'ABOUT' },
    { key: 'technologies', label: 'TECHNOLOGIES' },
    { key: 'work', label: 'PROJECTS' },
    { key: 'experience', label: 'EXPERIENCE' },
    { key: 'contact', label: 'GET IN TOUCH' },
  ];

  return (
    <>
      <NavCursorArrow hovered={hovered} />

      {/* Mobile overlay menu */}
      <div className={`nav-mobile-menu${menuOpen ? ' nav-mobile-menu--open' : ''}`}>
        <nav className="nav-mobile-links">
          {navLinks.map(({ key, label }) => (
            <div
              key={key}
              role="button"
              className="nav-mobile-link"
              onClick={() => handleSectionNav(key)}
            >
              {label}
            </div>
          ))}
        </nav>
        <div className="nav-mobile-external">
          <svg
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 34 34"
            width="34"
            height="34"
            fill="black"
            onClick={() => navigateToExternal('https://www.linkedin.com/in/arnaud-tison-b4779b2ba/')}
          >
            <path d="M34 2.5v29a2.5 2.5 0 0 1-2.5 2.5h-29A2.5 2.5 0 0 1 0 31.5v-29A2.5 2.5 0 0 1 2.5 0h29A2.5 2.5 0 0 1 34 2.5M10 13H5v16h5zm.45-5.5a2.88 2.88 0 0 0-2.86-2.9H7.5a2.9 2.9 0 0 0 0 5.8 2.88 2.88 0 0 0 2.95-2.81zM29 19.28c0-4.81-3.06-6.68-6.1-6.68a5.7 5.7 0 0 0-5.06 2.58h-.14V13H13v16h5v-8.51a3.32 3.32 0 0 1 3-3.58h.19c1.59 0 2.77 1 2.77 3.52V29h5z" />
          </svg>
          <Github
            role="button"
            onClick={() => navigateToExternal('https://github.com/arnaudtison')}
            size={35}
          />
        </div>
      </div>

      <div
        onMouseEnter={() => setCursorEnabled(true)}
        style={{
          backgroundColor:
            scrollY < 50 && scrollY != null
              ? 'transparent'
              : 'rgba(227, 227, 227, 0.37)',
          backgroundImage:
            scrollY < 50 && scrollY != null
              ? 'none'
              : 'url("data:image/svg+xml,%3Csvg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.2"/%3E%3C/svg%3E")',
        }}
        className="navigation-wrapper"
      >
        <div
          className="logo-container"
          onMouseEnter={() => setHovered('logo')}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            role="button"
            onClick={() => {
              navigateToSection('home');
              setMenuOpen(false);
            }}
            src={logo}
            alt="arnaudtison logo"
          />
        </div>

        {/* Desktop nav links */}
        <div className="redirect-links-container">
          {navLinks.map(({ key, label }) => (
            <div
              key={key}
              role="button"
              onClick={() => navigateToSection(key)}
              className="redirect-link"
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
            >
              {label}
            </div>
          ))}
          <div className="external-links-container">
            <svg
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34 34"
              width="34"
              height="34"
              fill="black"
              onMouseEnter={() => setHovered('linkedin')}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigateToExternal('https://www.linkedin.com/in/arnaud-tison-b4779b2ba/')}
            >
              <path d="M34 2.5v29a2.5 2.5 0 0 1-2.5 2.5h-29A2.5 2.5 0 0 1 0 31.5v-29A2.5 2.5 0 0 1 2.5 0h29A2.5 2.5 0 0 1 34 2.5M10 13H5v16h5zm.45-5.5a2.88 2.88 0 0 0-2.86-2.9H7.5a2.9 2.9 0 0 0 0 5.8 2.88 2.88 0 0 0 2.95-2.81zM29 19.28c0-4.81-3.06-6.68-6.1-6.68a5.7 5.7 0 0 0-5.06 2.58h-.14V13H13v16h5v-8.51a3.32 3.32 0 0 1 3-3.58h.19c1.59 0 2.77 1 2.77 3.52V29h5z" />
            </svg>
            <Github
              role="button"
              onMouseEnter={() => setHovered('github')}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigateToExternal('https://github.com/arnaudtison')}
              size={35}
            />
          </div>
        </div>

        {/* Hamburger / close button (mobile only) */}
        <button
          className={`nav-hamburger${menuOpen ? ' nav-hamburger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0.75" width="28" height="2.5" className="hamburger-line hamburger-line--1" />
            <rect x="0" y="8.75" width="28" height="2.5" className="hamburger-line hamburger-line--2" />
            <rect x="0" y="16.75" width="28" height="2.5" className="hamburger-line hamburger-line--3" />
          </svg>
        </button>
      </div>
    </>
  );
}
