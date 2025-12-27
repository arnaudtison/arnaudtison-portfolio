import "../css/home.scss";
import { Instagram, Github } from "lucide-react";
import logo from "../assets/at_logo.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
  }, []);

  return (
    <div style={{backgroundColor: scrollY < 50 && scrollY != null ? 'transparent' : 'rgba(187, 187, 187, 0.529)',
    backgroundImage: scrollY < 50 && scrollY != null ? 'none' : 'url("data:image/svg+xml,%3Csvg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.2"/%3E%3C/svg%3E")'}} className="navigation-wrapper">
      <div className="logo-container">
        <img src={logo} alt="arnaudtison logo" />
      </div>
      <div className="redirect-links-container">
        <div className="redirect-link">WHO AM I?</div>
        <div className="redirect-link">TECHNOLOGIES</div>
        <div className="redirect-link">WORK</div>
        <div className="redirect-link">GET IN TOUCH</div>
        <div className="external-links-container">
          <Instagram size={35} />
          <Github size={35} />
        </div>
      </div>
    </div>
  );
}
