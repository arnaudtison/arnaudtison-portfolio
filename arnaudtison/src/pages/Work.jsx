import { useEffect, useMemo, useRef, useState } from 'react';
import '../css/work.scss';
import WorkModal from '../components/WorkModal';

import work1 from '../assets/work/Belvedere.png';
import work1b from '../assets/work/Belvedere2.png';
import work2 from '../assets/work/Delaware.png';
import work3 from '../assets/work/Musicplayer.png';
import work4 from '../assets/work/Nodo.png';
import work5 from '../assets/work/Springboot.png';
import work5b from '../assets/work/Springboot_detail.png';

const PROJECTS = [
  {
    title: 'Belvedere',
    date: '2026',
    languages: ['React', 'TypeScript', 'Python', 'FastAPI', 'SCSS'],
    description: 'Dashboard web application built during an internship at Turtle Srl, an SME in Italy. '
      + 'The frontend is React with TypeScript; the backend runs on Python with FastAPI. '
      + 'My main contributions were design, design-to-code implementation, responsiveness, '
      + 'connecting the frontend to the API, and writing hooks and services. '
      + 'Users can create their own dashboards with charts or browse coworkers\' dashboards and share charts. '
      + 'An AI assistant with access to the company\'s data sources generates the right chart type for your data automatically '
      + '— no more manual Excel work or digging through datasets.',
    images: [work1, work1b],
    github: null,
  },
  {
    title: 'Delaware',
    date: '2025',
    languages: ['React', 'TypeScript', 'Node.js', 'Java', 'JavaFX', 'MySQL'],
    description: 'Project oriented around Delaware Consulting. A dashboard viewer for managers, technicians, and site responsibles. '
      + 'Managers get chart dashboards with operational data; site responsibles can manage their sites and view their metrics; '
      + 'technicians can see which machines are down, underperforming, or need maintenance. '
      + 'Available as both a web application (React TypeScript + Node.js) and a desktop application (Java + JavaFX), '
      + 'backed by a MySQL database. Users receive in-app notifications to stay informed about relevant events.',
    images: [work2],
    github: null,
  },
  {
    title: 'Music Player',
    date: '2024',
    languages: ['React', 'TypeScript', 'Node.js', 'MySQL', 'Prisma'],
    description: 'Browser-based music player powered by the Spotify API. Users can manage playlists, add songs, and leave reviews on other users\' playlists. The full Spotify catalogue is available for playback through the API. Built with React TypeScript on the frontend, Node.js on the backend, MySQL for persistence, and Prisma for database schemas.',
    images: [work3],
    github: null,
  },
  {
    title: 'Nodo',
    date: '2025',
    languages: ['C#', 'Blazor', 'PostgreSQL'],
    description: 'PWA designed to help people with a slight mental disability connect with one another, '
      + 'monitored by linked supervisors. Users can share their experiences, and supervisors can step in '
      + 'during conversations if someone feels unsafe. Upcoming events nearby are surfaced in the app and '
      + 'users can request to attend — supervisors receive a notification and approve or decline. '
      + 'A built-in FAQ chatbot and helpdesk help users find answers independently; '
      + 'if that\'s not enough, they can request to speak directly to their supervisor. '
      + 'Built with C# Blazor and PostgreSQL.',
    images: [work4],
    github: 'https://github.com/arnaudtison/dotnet-2526-gent15',
  },
  {
    title: 'MyConference',
    date: '2025',
    languages: ['Java', 'Spring Boot', 'JPA'],
    description: 'Individual project built with Java JPA Spring Boot. Users can browse upcoming conference events, view event details, and save favourites. The application supports both English and Dutch, letting users switch the display language at any time.',
    images: [work5, work5b],
    github: null,
  },
];

export default function Work() {
  const cellCount = 5;
  const carouselRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [radius, setRadius] = useState(0);
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const compute = () => {
      const width = el.offsetWidth;
      const calculatedRadius =
        Math.round(width / 2 / Math.tan(Math.PI / cellCount)) * 2;
      setRadius(calculatedRadius);
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [cellCount]);

  const images = useMemo(() => [work1, work2, work3, work4, work5], []);
  const items = useMemo(() => Array.from({ length: cellCount }), [cellCount]);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % cellCount);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + cellCount) % cellCount);
  };

  const getShortestOffset = (index, selected, total) => {
    let diff = index - selected;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const handleItemClick = (i, offset) => {
    if (offset === 0) {
      setModalProject(PROJECTS[i]);
    } else {
      // Navigate to the clicked item
      setSelectedIndex(i);
    }
  };

  return (
    <div id="work" className="work-section">
      <div className="work-content">
        <h2>PROJECTS</h2>
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
              <g style={{ transformOrigin: 'center', transform: 'scaleX(-1)' }}>
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
                const offset = getShortestOffset(i, selectedIndex, cellCount);

                const theta = 360 / cellCount;
                const angleDeg = offset * theta;
                const angleRad = angleDeg * (Math.PI / 180);

                const tx = radius * Math.sin(angleRad);
                const tz = radius * Math.cos(angleRad) - radius;

                const absOffset = Math.abs(offset);
                const opacity = absOffset > 3 ? 0 : absOffset === 0 ? 1 : 0.2;
                const zIndex = cellCount - absOffset;
                const isFront = offset === 0;

                return (
                  <div
                    key={i}
                    className={`work-item${isFront ? ' work-item--front' : ''}`}
                    style={{
                      transform: `translate3d(${tx}px, 0px, ${tz}px)`,
                      zIndex: zIndex,
                      opacity: opacity,
                      transition: 'transform .7s ease-out, opacity 0.5s ease',
                      backgroundImage: `url(${images[i]})`,
                      backgroundColor: 'transparent',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      cursor: isFront ? 'pointer' : 'default',
                    }}
                    onClick={() => handleItemClick(i, offset)}
                    title={isFront ? `Open ${PROJECTS[i].title}` : undefined}
                  />
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

        {selectedIndex !== null && (
          <p className="work-hint">Click to view project details</p>
        )}
      </div>

      <WorkModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
}
