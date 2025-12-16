import "../css/home.scss";
import { Instagram, Github } from "lucide-react";
import logo from "../assets/at_logo.png";

export default function Navbar() {
  return (
    <div className="navigation-wrapper">
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
