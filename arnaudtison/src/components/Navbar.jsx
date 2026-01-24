import "../css/home.scss";
import {
  Github,
} from "lucide-react";
import logo from "../assets/at_logo.png";
import { useEffect, useState } from "react";

export default function Navbar({ setCursorEnabled, navigateToSection }) {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToExternal = (dest) => {
    window.open(dest, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onMouseEnter={() => setCursorEnabled(true)}
      style={{
        backgroundColor:
          scrollY < 50 && scrollY != null
            ? "transparent"
            : "rgba(227, 227, 227, 0.37)",
        backgroundImage:
          scrollY < 50 && scrollY != null
            ? "none"
            : 'url("data:image/svg+xml,%3Csvg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.2"/%3E%3C/svg%3E")',
      }}
      className="navigation-wrapper"
    >
      <div className="logo-container">
        <img
          onClick={() => navigateToSection("home")}
          src={logo}
          alt="arnaudtison logo"
        />
      </div>
      <div className="redirect-links-container">
        <div
          onClick={() => navigateToSection("about")}
          className="redirect-link"
        >
          WHO AM I?
        </div>
        <div
          onClick={() => navigateToSection("technologies")}
          className="redirect-link"
        >
          TECHNOLOGIES
        </div>
        <div
          onClick={() => navigateToSection("work")}
          className="redirect-link"
        >
          WORK
        </div>
        <div
          onClick={() => navigateToSection("contact")}
          className="redirect-link"
        >
          GET IN TOUCH
        </div>
        <div className="external-links-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 34 34"
            width="34"
            height="34"
            fill="black"
            onClick={() => navigateToExternal("https://www.linkedin.com/in/arnaud-tison-b4779b2ba/")}
          >
            <path d="M34 2.5v29a2.5 2.5 0 0 1-2.5 2.5h-29A2.5 2.5 0 0 1 0 31.5v-29A2.5 2.5 0 0 1 2.5 0h29A2.5 2.5 0 0 1 34 2.5M10 13H5v16h5zm.45-5.5a2.88 2.88 0 0 0-2.86-2.9H7.5a2.9 2.9 0 0 0 0 5.8 2.88 2.88 0 0 0 2.95-2.81zM29 19.28c0-4.81-3.06-6.68-6.1-6.68a5.7 5.7 0 0 0-5.06 2.58h-.14V13H13v16h5v-8.51a3.32 3.32 0 0 1 3-3.58h.19c1.59 0 2.77 1 2.77 3.52V29h5z" />
          </svg>
          <Github
            onClick={() => navigateToExternal("https://github.com/arnaudtison")}
            size={35}
          />
        </div>
      </div>
    </div>
  );
}
