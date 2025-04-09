import '../css/AboutSection.scss';

function AboutSection() {
  const aboutSpan = '{ about }';

  return (
    <div className='about-section-wrapper'>
      <div className='about-top-section'>
        <span>{aboutSpan}</span>
      </div>
      <div className='about-section'>
        <span className='about-section-intro'>
          So, <span className='accent-color'>who</span> am I?
        </span>
        <div className='about-section-text'>
          <p>
            Hi, I&apos;m <span className='accent-color'>Arnaud Tison</span>, a
            19-year-old student in Applied IT at the University College of Ghent
            in Belgium. I live in Brakel, a small town in the Flemish Ardennes.
            I started programming when I was 12 and never really stopped. Over
            the years, I&apos;ve faced a lot of challenges, but getting through
            them made me <span className='accent-color'>who I am today</span>.
          </p>
          <p>
            I really enjoy creating{' '}
            <span className='accent-color'>user-friendly</span> and{' '}
            <span className='accent-color'>visually appealing</span> websites
            from scratch. I prefer writing my own{' '}
            <span className='accent-color'>HTML</span> and{' '}
            <span className='accent-color'>CSS</span> instead of using
            drag-and-drop libraries. In my opinion, it gives me more{' '}
            <span className='accent-color'>control</span> over what I&apos;m
            building and helps me{' '}
            <span className='accent-color'>understand</span> every part of it.
          </p>
          <p>
            A few years ago, during COVID, I picked up a new hobby besides
            programming: <span className='accent-color'>3D design</span>.
            I&apos;ve always loved{' '}
            <span className='accent-color'>creating</span> and{' '}
            <span className='accent-color'>being creative</span>, and 3D design
            turned out to be a great way to express that. I still do it whenever
            I have some free time.
          </p>
          <p>
            Additionally, I&apos;m fluent in both{' '}
            <span className='accent-color'>Dutch</span> and{' '}
            <span className='accent-color'>English</span>, and I can find my way
            around in <span className='accent-color'>French</span> too. I&apos;d
            say I&apos;m <span className='accent-color'>social</span>,{' '}
            <span className='accent-color'>team-oriented</span> and I enjoy{' '}
            <span className='accent-color'>working with others</span> and{' '}
            <span className='accent-color'>learning together</span>.
          </p>
          <p>
            Right now, I&apos;m working on multiple school projects, which has
            been a great opportunity to apply what I&apos;ve learned and{' '}
            <span className='accent-color'>keep growing</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
