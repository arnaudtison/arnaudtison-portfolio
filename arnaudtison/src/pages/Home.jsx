import '../css/Home.scss';
import IonIcon from '@reacticons/ionicons';
import logo from '../assets/logo.png';
import HomeSection from '../components/HomeSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ProjectsSection from '../components/ProjectsSection.jsx';
import ConnectSection from '../components/ConnectSection.jsx';

function Home() {
  const projects = '{ projects }';
  const about = '{ about }';
  const connect = '{ connect }';
  const home = '{ home }';

  const toggleMenu = () => {
    const menu = document.querySelector('.nav-menu-mobile');
    const body = document.body;

    if (menu.style.transform === 'translateY(0px)') {
      menu.style.transform = 'translateY(-100%)';
      body.style.overflowY = 'scroll'; // Enable scrolling
    } else {
      menu.style.transform = 'translateY(0px)';
      body.style.overflowY = 'hidden'; // Disable scrolling
    }
  };

  const scrollToSection = (id, priority) => {
    const section = document.getElementById(id);
    const menu = document.querySelector('.nav-menu-mobile');

    if (priority) {
      console.log(menu.style.transform === 'translateY(0px)');

      if (menu.style.transform === 'translateY(0px)') {
        menu.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      toggleMenu();
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <>
      <div className='nav-menu-mobile'>
        <div className='center'>
          <ul>
            <li>
              <a onClick={() => scrollToSection('home')}>{home}</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('about')}>{about}</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('projects')}>{projects}</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('connect')}>{connect}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='page-wrapper'>
        <div className='nav-wrapper'>
          <div className='logo'>
            <img
              onClick={() => scrollToSection('home', true)}
              width={35}
              src={logo}
              className='logo-img'
            />
          </div>
          <div className='info'>
            <div className='name'>TISON A.</div>
            <div className='title'>APPLIED IT STUDENT</div>
          </div>
          <div className='menu'>
            <IonIcon
              onClick={toggleMenu}
              name='menu-sharp'
              className='menu-icon'
            />
          </div>
        </div>
        <div className='section-wrapper'>
          <div className='section home' id='home'>
            <HomeSection scrollToSection={scrollToSection} />
          </div>
          <div className='section about' id='about'>
            <AboutSection />
          </div>
          <div className='section projects' id='projects'>
            <ProjectsSection />
          </div>
          <div className='section connect' id='connect'>
            <ConnectSection />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
