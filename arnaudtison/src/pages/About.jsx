import { useEffect, useRef, useState } from "react";
import TechKeycaps3D from "../components/TechKeycaps3D.jsx";
import "../css/about.scss";

export default function About() {
  // --- REMOVED: sectionRef and trackRef ---

  // 1. RAW INPUT: The data coming from the 3D keyboard (debounced)
  const [activeTech, setActiveTech] = useState(null);

  // 2. DISPLAY STATE: What is actually showing on screen right now
  const [displayedTech, setDisplayedTech] = useState(null);
  
  // 3. VISIBILITY STATE: Controls the fade opacity
  const [isVisible, setIsVisible] = useState(true);

  const hoverTimeoutRef = useRef(null);

  // DEBOUNCE HELPER
  const handleTechHover = (techData) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    const delay = techData ? 100 : 0;

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveTech(techData);
    }, delay);
  };

  // TRANSITION EFFECT
  useEffect(() => {
    setIsVisible(false);
    const transitionTimer = setTimeout(() => {
      setDisplayedTech(activeTech);
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(transitionTimer);
  }, [activeTech]);

  // --- REMOVED: The entire Scroll Logic useEffect ---

  return (
    // REMOVED: ref={sectionRef} from the section
    <section className="whoami-scroll-section">
      <div className="whoami-sticky">
        {/* REMOVED: ref={trackRef} from the div */}
        <div className="whoami-track">
          
          {/* Left Panel */}
          <div className="whoami-panel whoami-left">
            <div className="whoami-content-container">
              <h2>WHO AM I?</h2>
              <div className="content-text-container">
                <p>
                  Hi, I'm Arnaud Tison, a 19-year-old student in Applied IT at
                  the University College of Ghent in Belgium. I live in Brakel,
                  a small town in the Flemish Ardennes. I started programming
                  when I was 12 and never really stopped. Over the years, I've
                  faced a lot of challenges, but getting through them made me
                  who I am today.
                </p>
                <p>
                  I really enjoy creating user-friendly and visually appealing
                  websites from scratch. I prefer writing my own HTML and CSS
                  instead of using drag-and-drop libraries. In my opinion, it
                  gives me more control over what I'm building and helps me
                  understand every part of it.
                </p>
                <p>
                  A few years ago, during COVID, I picked up a new hobby besides
                  programming: 3D design. I've always loved creating and being
                  creative, and 3D design turned out to be a great way to
                  express that. I still do it whenever I have some free time.
                </p>
                <p>
                  Additionally, I'm fluent in both Dutch and English, and I can
                  find my way around in French too. I'd say I'm social,
                  team-oriented and I enjoy working with others and learning
                  together. Right now, I'm working on multiple school projects,
                  which has been a great opportunity to apply what I've learned
                  and keep growing.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="whoami-panel whoami-right">
            <div className="whoami-technologies-container">
              <h2>
                TECHNOLOGIES
                <p>Hover over a key to learn more</p>
              </h2>

              <div className="technologies-content">
                <div className="technology-info">
                  <div className="tech-info-content">
                    <div
                      style={{ opacity: isVisible ? 1 : 0 }}
                      className="tech-card-active"
                    >
                      <div className="tech-card-header">
                        <h2>{displayedTech?.label.toLowerCase()}</h2>
                        <span>{displayedTech?.desc}</span>
                      </div>
                      <p>{displayedTech?.details}</p>
                    </div>
                  </div>
                </div>

                <TechKeycaps3D setHoveredTech={handleTechHover} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}