import { useEffect, useMemo, useRef, useState } from "react";
import "../css/work.scss";

import work1 from "../assets/work/work1.jpg";
import work2 from "../assets/work/work2.jpg";
import work3 from "../assets/work/work3.jpg";
import work4 from "../assets/work/work4.jpg";
import work5 from "../assets/work/work5.jpg";
import work6 from "../assets/work/work6.jpg";

export default function Work() {
  const cellCount = 6;
  const carouselRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const compute = () => {
      const width = el.offsetWidth;
      // Bereken radius zodat items mooi uit elkaar staan in een cirkel
      // Pas de '2.5' aan om de cirkel groter/kleiner te maken
      const calculatedRadius =
        Math.round(width / 2 / Math.tan(Math.PI / cellCount)) * 2;
      setRadius(calculatedRadius);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [cellCount]);

  const images = useMemo(() => [work1, work2, work3, work4, work5, work6], []);
  const items = useMemo(() => Array.from({ length: cellCount }), [cellCount]);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % cellCount);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + cellCount) % cellCount);
  };

  // Hulpfunctie voor de korte route (zodat hij niet wild draait bij de overgang 7->0)
  const getShortestOffset = (index, selected, total) => {
    let diff = index - selected;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="work-section">
      <div className="work-content">
        <h2>WORK</h2>
        <div className="work-spotlight">
          <button
            type="button"
            className="previous-button"
            onClick={handlePrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="#000000"
              viewBox="0 0 256 256"
              className="bouncy-arrow-prev"
            >
              <g style={{ transformOrigin: "center", transform: "scaleX(-1)" }}>
                <path
                  className="arrow-part"
                  d="M189.66,122.34a8,8,0,0,1,0,11.32l-72,72a8,8,0,0,1-11.32-11.32L164.69,136H32a8,8,0,0,1,0-16H164.69L106.34,61.66a8,8,0,0,1,11.32-11.32Z"
                />
                <path
                  className="wall-part"
                  d="M216,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32Z"
                />
              </g>
            </svg>
          </button>

          <div className="work-carousel-wrapper">
            <div className="work-carousel" ref={carouselRef}>
              {items.map((_, i) => {
                // 1. Bereken de afstand in "stappen" (-1, 0, +1 etc.)
                const offset = getShortestOffset(i, selectedIndex, cellCount);

                // 2. Zet om naar graden en radialen
                const theta = 360 / cellCount;
                const angleDeg = offset * theta;
                const angleRad = angleDeg * (Math.PI / 180);

                // 3. Wiskunde voor cirkelpositie (Sinus voor X, Cosinus voor Z)
                const tx = radius * Math.sin(angleRad);
                // We doen '- radius' zodat het voorste item op Z=0 komt en de rest erachter
                const tz = radius * Math.cos(angleRad) - radius;

                // 4. Bepaal zichtbaarheid/styling
                const absOffset = Math.abs(offset);
                // Alles verder dan 3 stappen wordt onzichtbaar/donker
                const opacity = absOffset > 3 ? 0 : absOffset === 0 ? 1 : 0.2;
                const zIndex = cellCount - absOffset;

                return (
                  <div
                    key={i}
                    className="work-item"
                    style={{
                      // Hier gebeurt het: Wel op een cirkel positie (tx, tz),
                      // maar GEEN rotateY(). Ze blijven dus recht kijken.
                      transform: `translate3d(${tx}px, 0px, ${tz}px)`,
                      zIndex: zIndex,
                      opacity: opacity,
                      transition: "transform .7s ease-out, opacity 0.5s ease",
                      // backgroundImage: `url(${images[i]})`,
                      backgroundColor: "#e0e0e0",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                  </div>
                );
              })}
            </div>
          </div>

          <button type="button" className="next-button" onClick={handleNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="#000000"
              viewBox="0 0 256 256"
              className="bouncy-arrow-next"
            >
              <path
                className="arrow-part"
                d="M189.66,122.34a8,8,0,0,1,0,11.32l-72,72a8,8,0,0,1-11.32-11.32L164.69,136H32a8,8,0,0,1,0-16H164.69L106.34,61.66a8,8,0,0,1,11.32-11.32Z"
              />
              <path
                className="wall-part"
                d="M216,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
