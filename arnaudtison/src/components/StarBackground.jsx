import "../css/StarBackground.scss"; // Import your SCSS file

const StarBackground = ({ displayedTech, isVisible }) => {
  return (
    <div className="space-container">
      <div className="stars-small"></div>
      <div className="stars-medium"></div>
      <div className="stars-large"></div>

      <div style={{ opacity: isVisible ? 1 : 0 }} className="content">
        <div style={{ opacity: displayedTech && isVisible ? 1 : 0 }} className={`tech-card ${isVisible ? "visible" : ""}`}>
          <div className="tech-intro-card">
            <h2>{displayedTech?.label}</h2>
            <p>{displayedTech?.desc}</p>
          </div>
          <div className="tech-info-card">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
              cumque voluptas optio repellendus architecto modi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarBackground;
