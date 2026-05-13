import { useEffect, useState } from 'react';
import githubIcon from '../assets/github.png';
import { lenis } from '../lib/lenis';

export default function WorkModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!project) return;
    setActiveImg(0);
    lenis.stop();
    return () => lenis.start();
  }, [project]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose(); 
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close-bar">
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-info">
          <div className="modal-header">
            <h3>{project.title}</h3>
            <span className="modal-date">{project.date}</span>
          </div>

          <div className="modal-tags">
            {project.languages.map((lang) => (
              <span key={lang} className="modal-tag">{lang}</span>
            ))}
          </div>

          <p className="modal-description">{project.description}</p>

          <div className="modal-footer">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-github"
              >
                <img src={githubIcon} alt="GitHub" />
                View on GitHub
              </a>
            ) : (
              <span className="modal-github modal-github--unavailable">
                <img src={githubIcon} alt="GitHub" />
                Repository not public
              </span>
            )}
          </div>
        </div>

        <div className="modal-gallery">
          <div className="modal-main-img">
            <img src={project.images[activeImg]} alt={project.title} />
          </div>
          {project.images.length > 1 && (
            <div className="modal-thumbs">
              {project.images.map((src, i) => (
                <button
                  key={i}
                  className={`modal-thumb${i === activeImg ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
