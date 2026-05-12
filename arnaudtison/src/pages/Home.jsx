import { useState, useEffect } from 'react';
import imageSelf from '../assets/imageSelf.png';
import AboutBio from './AboutBio.jsx';
import Technologies from './Technologies.jsx';
import Work from './Work.jsx';
import Experience from './Experience.jsx';
import Contact from './Contact.jsx';
import ProgressiveBlurBar from '../components/ProgressiveBlurBar.jsx';
import '../css/home.scss';

import CustomCursor from 'custom-cursor-react';
import OutlineFollower from '../components/OutlineFollower.jsx';
import 'custom-cursor-react/dist/index.css';

function Home({ cursorEnabled }) {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorEnabledPage, setCursorEnabledPage] = useState(false);

  const languages = [
    'HTML',
    'CSS',
    'JAVA',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'REACT',
    'C#',
    'BLAZOR',
    'PYTHON',
    'SQL',
  ];

  useEffect(() => {
    const roles = ['Full-Stack Developer', 'Designer', 'Student'];
    const role = roles[currentRole];
    const delay = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === role) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsDeleting(false);
      } else {
        setDisplayText(
          isDeleting
            ? displayText.slice(0, -1)
            : displayText + role[displayText.length],
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <div
      onMouseEnter={() => setCursorEnabledPage(true)}
      className="page-wrapper"
    >
      {(cursorEnabled || cursorEnabledPage) && (
        <>
          <CustomCursor
            targets={[]}
            opacity={1}
            customClass="custom-cursor"
            dimensions={12}
            fill="#000000ff"
            smoothness={{ movement: 0.5, scale: 0.1, opacity: 0.2 }}
            targetOpacity={0.5}
          />
          <OutlineFollower size={60} speed={0.08} />
        </>
      )}

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

        {/* Desktop: code snippet + photo */}
        <div className="content-grid">
          <div className="syntax-block left">
            <div className="syntax-block-input">
              <span>java</span>
              <div className="syntax-wrapper">
                <p>String[] roles = {'{'}</p>
                <p>
                  {'"'}<b>Full-Stack Developer</b>{'"'},
                </p>
                <p>
                  {'"'}<b>Designer</b>{'"'},
                </p>
                <p>
                  {'"'}<b>Student</b>{'"'}
                </p>
                <p>{'}'};</p>
                <br />
                <p>for (String role : roles) {'{'}</p>
                <p>System.out.println({'"'}I am a {'"'} + role);</p>
                <p>{'}'}</p>
              </div>
            </div>
            <div className="syntax-block-output">
              <p>
                {'>'} portfolio.java: I am a{' '}
                <span className="typing-text">{displayText}</span>
                <span className="cursor">|</span>
              </p>
            </div>
          </div>
          <div className="image-container right">
            <img src={imageSelf} alt="Arnaud Tison" />
          </div>
        </div>

        {/* Mobile: photo + profile info card */}
        <div className="mobile-hero">
          <p className="mobile-hero-role">Full-Stack Developer</p>
          <img src={imageSelf} alt="Arnaud Tison" className="mobile-hero-img" />
          <div className="mobile-hero-info">
            <div className="mobile-hero-row">
              <span className="mobile-hero-label">LOCATION</span>
              <span className="mobile-hero-value">Brakel, Belgium</span>
            </div>
            <div className="mobile-hero-row">
              <span className="mobile-hero-label">LANGUAGES</span>
              <span className="mobile-hero-value">NL · EN · FR</span>
            </div>
            <div className="mobile-hero-row">
              <span className="mobile-hero-label">CURRENT</span>
              <span className="mobile-hero-value">Turtle Srl internship</span>
            </div>
            <div className="mobile-hero-row">
              <span className="mobile-hero-label">NEXT</span>
              <span className="mobile-hero-value">TBD</span>
            </div>
          </div>
        </div>
        <div className="horizontal-language-slider">
          <div className="marquee marquee--reverse">
            <div className="marquee__track">
              <div className="marquee__content">
                {languages.map((lang, i) => (
                  <span key={`a-${i}`}>{lang}</span>
                ))}
                {languages.map((lang, i) => (
                  <span key={`b-${i}`}>{lang}</span>
                ))}
              </div>

              <div className="marquee__content" aria-hidden="true">
                {languages.map((lang, i) => (
                  <span key={`c-${i}`}>{lang}</span>
                ))}
                {languages.map((lang, i) => (
                  <span key={`d-${i}`}>{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ScrollIndicator /> */}

      <AboutBio />
      <Technologies />
      <Work />
      <Experience />
      <Contact />

      <footer className="site-footer">© 2026 Arnaud Tison</footer>

      <ProgressiveBlurBar />
    </div>
  );
}

export default Home;
