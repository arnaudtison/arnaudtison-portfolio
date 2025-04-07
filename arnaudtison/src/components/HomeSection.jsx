import '../css/HomeSection.scss';

function HomeSection({ scrollToSection }) {
  return (
    <div className='home-section-wrapper'>
      <div className='intro-wrapper'>
        <p>
          <span className='accent-color'>Hi there!</span>
        </p>
        <span id='introduction'>
          I&apos;m <span id='name'>Arnaud Tison</span>
        </span>
      </div>
      <div className='subintro-wrapper'>
        <p>
          I make things you can <span className='accent-color'>click</span>,
          <span className='accent-color'> scroll</span>, and sometimes{' '}
          <span className='accent-color'>smile</span> at.
        </p>
      </div>
      <div className='small-about-me'>
        <p>
          I&apos;m a student in Applied IT, passionate about{' '}
          <span className='accent-color'>web development</span> and{' '}
          <span className='accent-color'>design</span>.
        </p>
        <p>I love creating user-friendly and visually appealing websites.</p>
      </div>
      <div className='cta-wrapper'>
        <span
          onClick={() => scrollToSection('projects', true)}
          className='projects-cta button'
        >
          See my work.
        </span>
        <span
          onClick={() => scrollToSection('connect', true)}
          className='connect-cta button'
        >
          Let&apos;s connect.
        </span>
      </div>
    </div>
  );
}

export default HomeSection;
