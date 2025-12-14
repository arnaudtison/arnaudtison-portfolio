import { useEffect, useRef } from "react";
import TechKeycaps3D from "../components/TechKeycaps3D.jsx";

import "../css/about.scss";

export default function About() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const START_OFFSET = 200; // px before horizontal movement starts
    const END_OFFSET = 200; // px after movement finishes (optional)

    const onScroll = () => {
      const rect = section.getBoundingClientRect();

      const totalScrollable = section.offsetHeight - window.innerHeight;

      // How far we've scrolled *inside* the section
      const rawScroll = Math.min(Math.max(-rect.top, 0), totalScrollable);

      // Adjust scroll to include lead-in and lead-out
      const usableScroll = totalScrollable - START_OFFSET - END_OFFSET;

      const adjustedScroll = Math.min(
        Math.max(rawScroll - START_OFFSET, 0),
        usableScroll
      );

      const progress = usableScroll > 0 ? adjustedScroll / usableScroll : 0;

      const maxX = track.scrollWidth - window.innerWidth;
      const x = maxX * progress;

      track.style.transform = `translateX(${-x}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="whoami-scroll-section" ref={sectionRef}>
      <div className="whoami-sticky">
        <div className="whoami-track" ref={trackRef}>
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

          <div className="whoami-panel whoami-right">
            <div className="whoami-technologies-container">
              <h2>TECHNOLOGIES</h2>
              <div className="technologies-content">
                <div className="technology-info">
                  <h3>Hover a keycap to see more info</h3>
                </div>
                <TechKeycaps3D />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
