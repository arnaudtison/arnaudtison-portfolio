import TechGrid from '../components/TechGrid.jsx';
import '../css/technologies.scss';

export default function Technologies() {
  return (
    <div id="technologies" className="technologies-section">
      <div className="technologies-container">
        <h2>TECHNOLOGIES</h2>
        <TechGrid />
      </div>
    </div>
  );
}
