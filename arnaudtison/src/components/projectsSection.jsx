import '../css/ProjectsSection.scss';

function ProjectsSection() {
  const projectsSpan = '{ projects }';

  return (
    <div className='projects-section-wrapper'>
      <div className='projects-top-section'>
        <span>{projectsSpan}</span>
      </div>
      <div className='projects-section'></div>
    </div>
  );
}

export default ProjectsSection;
