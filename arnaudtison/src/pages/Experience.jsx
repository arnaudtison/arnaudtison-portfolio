import { useEffect, useRef } from 'react';
import '../css/experience.scss';

const ENTRIES = [
  {
    year: 'Mar 2026 — May 2026',
    label: 'INTERNSHIP',
    title: 'Full-Stack Developer',
    org: 'Turtle Srl',
    location: 'Italy',
    description:
      'Worked on Belvedere, an AI-powered dashboard web application for a manufacturing SME. '
      + 'Responsible for UI/UX design, design-to-code implementation, responsiveness, '
      + 'connecting the React frontend to a Python FastAPI backend, and writing hooks and services. '
      + 'Users can build dashboards, share charts, and let an AI assistant generate the right '
      + 'visualisation directly from the company\'s data sources.',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'SCSS'],
  },
  {
    year: 'Apr 2025 — Present',
    label: 'STUDENT JOB',
    title: 'Frontend Developer',
    org: 'ECOMPASS',
    location: 'Zottegem, Belgium',
    description:
      'Working as a frontend developer on web and mobile projects. '
      + 'Building interfaces with HTML, CSS, JavaScript, React JS, and React Native.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'React Native'],
  },
  {
    year: 'Sep 2023 — Jun 2026',
    label: 'EDUCATION',
    title: 'Applied IT — Bachelor',
    org: 'University College of Ghent',
    location: 'Belgium',
    description:
      'Bachelor degree in Applied Computer Science. '
      + 'Covers full-stack development, databases, software architecture, and project-based work '
      + 'across languages including Java, C#, JavaScript, TypeScript, and Python.',
    tags: [],
  },
];

export default function Experience() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('exp-item--visible');
          }
        });
      },
      { threshold: 0.15 },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div id="experience" className="experience-section">
      <div className="experience-content">
        <h2>EXPERIENCE</h2>
        <div className="timeline">
          <div className="timeline__line" />
          {ENTRIES.map((entry, i) => {
            const side = i % 2 === 0 ? 'left' : 'right';
            return (
              <div
                key={i}
                className={`exp-item exp-item--${side}`}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <div className="exp-item__dot" />
                <div className="exp-item__card">
                  <div className="exp-item__meta">
                    <span className="exp-item__year">{entry.year}</span>
                    <span className="exp-item__label">{entry.label}</span>
                  </div>
                  <h3 className="exp-item__title">{entry.title}</h3>
                  <p className="exp-item__org">
                    {entry.org}
                    {entry.location && <span className="exp-item__location"> — {entry.location}</span>}
                  </p>
                  <p className="exp-item__desc">{entry.description}</p>
                  {entry.tags.length > 0 && (
                    <div className="exp-item__tags">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="exp-item__tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  {entry.github && (
                    <a
                      href={entry.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-item__github"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
