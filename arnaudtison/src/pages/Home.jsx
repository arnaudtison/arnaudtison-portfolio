import '../css/Home.scss';
import IonIcon from '@reacticons/ionicons';
import logo from '../assets/logo.png';

function Home() {
  const projects = '{ projects}';
  const about = '{ about }';
  const connect = '{ connect }';
  const home = '{ home }';

  const openMenu = () => {
    const menu = document.querySelector('.nav-menu-mobile');
    menu.style.transform = 'translateY(0)';
  };

  const closeMenu = () => {
    const menu = document.querySelector('.nav-menu-mobile');
    menu.style.transform = 'translateY(-100%)';
  };
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    closeMenu();
    setTimeout(() => {
      section.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      <div className='nav-menu-mobile'>
        <div className='close-menu'>
          <IonIcon onClick={closeMenu} name='close' className='close-icon' />
        </div>
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
            <img width={35} src={logo} />
          </div>
          <div className='info'>
            <div className='name'>TISON A.</div>
            <div className='title'>APPLIED IT STUDENT</div>
          </div>
          <div className='menu'>
            <IonIcon
              onClick={openMenu}
              name='menu-sharp'
              className='menu-icon'
            />
          </div>
        </div>
        <div className='section-wrapper'>
          <div className='section home' id='home'>
            <h1>Home.</h1>
          </div>
          <div className='section about' id='about'>
            <h1>About.</h1>
          </div>
          <div className='section projects' id='projects'>
            <h1>Projects.</h1>
          </div>
          <div className='section connect' id='connect'>
            <h1>Connect.</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
