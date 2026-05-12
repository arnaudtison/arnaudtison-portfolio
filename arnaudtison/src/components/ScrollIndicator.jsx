import { ArrowDown } from 'lucide-react';

export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator" style={styles.scrollIndicator} aria-label="Scroll for more">
      <svg className="ring" style={styles.ring} viewBox="0 0 200 200" role="img">
        <defs>
          <path
            id="circlePath"
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
          />
        </defs>

        <text className="ring-text">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            SCROLL FOR MORE SCROLL FOR MORE SCROLL FOR MORE
          </textPath>
        </text>
      </svg>
      
      <div className="arrow-center" style={styles.arrowCenter}>
        <ArrowDown size={55} />
      </div>
    </div>
  );
}

const styles = {
  scrollIndicator: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: '200px',
    height: '200px',
  },
  arrowCenter: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};