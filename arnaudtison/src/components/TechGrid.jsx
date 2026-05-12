import { useState } from 'react';

import iconHTML from '../assets/html1.png';
import iconCSS from '../assets/css1.png';
import iconJS from '../assets/js.png';
import iconTS from '../assets/ts1.png';
import iconJAVA from '../assets/java1.png';
import iconREACT from '../assets/react1.png';
import iconCSHARP from '../assets/csharp1.png';
import iconBLAZOR from '../assets/blazor1.png';
import iconPYTHON from '../assets/python1.png';
import iconSQL from '../assets/mysql.png';
import iconNODE from '../assets/nodejs1.png';
import iconGH from '../assets/github.png';

const TECHS = [
  { label: 'HTML',       icon: iconHTML,   desc: 'Structure & Semantics', category: 'Frontend', complexIcon: true },
  { label: 'CSS',        icon: iconCSS,    desc: 'Styling & Layout',       category: 'Frontend', complexIcon: true },
  { label: 'JavaScript', icon: iconJS,     desc: 'Interactive Logic',      category: 'Frontend' },
  { label: 'TypeScript', icon: iconTS,     desc: 'Type-safe JavaScript',   category: 'Frontend', lightIcon: true },
  { label: 'React',      icon: iconREACT,  desc: 'UI Library',             category: 'Frontend', lightIcon: true },
  { label: 'Node.js',    icon: iconNODE,   desc: 'JS Runtime',             category: 'Backend',  lightIcon: true },
  { label: 'Java',       icon: iconJAVA,   desc: 'Backend & Enterprise',   category: 'Backend',  lightIcon: true },
  { label: 'C#',         icon: iconCSHARP, desc: 'General Purpose',        category: 'Backend',  complexIcon: true },
  { label: 'Blazor',     icon: iconBLAZOR, desc: 'C# for the Web',         category: 'Frontend', lightIcon: true },
  { label: 'Python',     icon: iconPYTHON, desc: 'Data & Scripting',       category: 'Backend',  lightIcon: true },
  { label: 'SQL',        icon: iconSQL,    desc: 'Database Management',    category: 'Database', complexIcon: true },
  { label: 'GitHub',     icon: iconGH,     desc: 'Version Control',        category: 'Tools'    },
];

export default function TechGrid() {
  const [view, setView] = useState('grid');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="tech-grid-wrapper">
      <div className="tech-view-toggle">
        <button
          className={`toggle-btn${view === 'grid' ? ' active' : ''}`}
          onClick={() => setView('grid')}
        >
          grid
        </button>
        <span className="toggle-sep">/</span>
        <button
          className={`toggle-btn${view === 'list' ? ' active' : ''}`}
          onClick={() => setView('list')}
        >
          list
        </button>
      </div>

      {view === 'grid' ? (
        <div className="tech-cards-grid">
          {TECHS.map((tech, i) => (
            <div
              key={tech.label}
              role="button"
              className={`tech-card${hoveredIndex === i ? ' hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={tech.icon} alt={tech.label} className={`tech-card-icon${tech.lightIcon ? ' light-icon' : tech.complexIcon ? ' complex-icon' : ''}`} />
              <span className="tech-card-label">{tech.label}</span>
              <span className="tech-card-desc">{tech.desc}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="tech-list">
          {TECHS.map((tech, i) => (
            <div
              key={tech.label}
              role="button"
              className={`tech-row${hoveredIndex === i ? ' hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="tech-row-index">{String(i + 1).padStart(2, '0')}</span>
              <img src={tech.icon} alt={tech.label} className={`tech-row-icon${tech.lightIcon ? ' light-icon' : tech.complexIcon ? ' complex-icon' : ''}`} />
              <span className="tech-row-label">{tech.label}</span>
              <span className="tech-row-category">{tech.category}</span>
              <span className="tech-row-desc">{tech.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
