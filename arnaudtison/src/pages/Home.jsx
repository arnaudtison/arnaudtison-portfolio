import { useState, useEffect } from "react";
import imageSelf from "../assets/imageSelf.png";
import About from "./About.jsx";
import "../css/home.scss";

function Home() {
  const roles = ["Full-Stack Developer", "Designer", "Student"];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const delay = isDeleting ? 50 : 100;
    const target = isDeleting ? "" : role;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === role) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsDeleting(false);
      } else {
        setDisplayText(isDeleting ? displayText.slice(0, -1) : displayText + role[displayText.length]);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  return (
    <div className="page-wrapper">
      <div className="landing-wrapper">
        <div className="horizontal-slider">
          <div className="marquee">
            <div className="marquee__track">
              <span className="marquee__content">
                ARNAUD TISON&nbsp;ARNAUD TISON&nbsp;ARNAUD TISON&nbsp;ARNAUD
                TISON&nbsp;ARNAUD TISON&nbsp;ARNAUD TISON&nbsp;ARNAUD
                TISON&nbsp;ARNAUD TISON&nbsp;
              </span>
              <span className="marquee__content" aria-hidden="true">
                ARNAUD TISON&nbsp;ARNAUD TISON&nbsp;ARNAUD TISON&nbsp;ARNAUD
                TISON&nbsp;ARNAUD TISON&nbsp;ARNAUD TISON&nbsp;ARNAUD
                TISON&nbsp;ARNAUD TISON&nbsp;
              </span>
            </div>
          </div>
        </div>
        <div className="content-grid">
          <div className="syntax-block left">
            <div className="syntax-block-input">
              <span>java</span>
              <div className="syntax-wrapper">
                <p>String[] roles = {"{"}</p>
                <p>"<b>Full-Stack Developer</b>",</p>
                <p>"<b>Designer</b>",</p>
                <p>"<b>Student</b>"</p>
                <p>{"}"};</p>
                <br />
                <p>for (String role : roles) {"{"}</p>
                <p>System.out.println("I am a " + role);</p>
                <p>{"}"}</p>
              </div>
            </div>
            <div className="syntax-block-output">
              <p>{">"} portfolio.java: I am a <span className="typing-text">{displayText}</span><span className="cursor">|</span></p>
            </div>
          </div>
          <div className="image-container right">
            <img src={imageSelf} alt="Arnaud Tison" />
          </div>
        </div>
        <div className="horizontal-language-slider">
          <div className="marquee marquee--reverse">
            <div className="marquee__track">
              <div className="marquee__content">
                <span>HTML</span>
                <span>CSS</span>
                <span>JAVA</span>
                <span>JAVASCRIPT</span>
                <span>TYPESCRIPT</span>
                <span>REACT</span>
                <span>C#</span>
                <span>BLAZOR</span>
                <span>PYTHON</span>
                <span>SQL</span>
              </div>

              <div className="marquee__content" aria-hidden="true">
                <span>HTML</span>
                <span>CSS</span>
                <span>JAVA</span>
                <span>JAVASCRIPT</span>
                <span>TYPESCRIPT</span>
                <span>REACT</span>
                <span>C#</span>
                <span>BLAZOR</span>
                <span>PYTHON</span>
                <span>SQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ScrollIndicator /> */}

      <About />
      {/* <Work />
      <Contact /> */}
    </div>
  );
}

export default Home;
