import { useState } from "react";
import "./style.css";

function RippleEffect() {
  const [coordinates, setCoordinates] = useState({
    x: -1,
    y: -1,
  });
  const [isRippling, setIsRippling] = useState(false);

  function handleRipple(e) {
    console.log(e.target.getBoundingClientRect(), e.clientX, e.clientY);
    const rect = e.target.getBoundingClientRect();
    const X = e.clientX - rect.left;
    const Y = e.clientY - rect.top;
    setIsRippling(true);

    if (coordinates.x !== -1 && coordinates.y !== -1) {
      setTimeout(() => {
        if (isRippling) {
          setCoordinates({ x: X, y: Y });
        }
      }, 500);
    }
  }

  return (
    <div>
      <h1>Button Ripple Effect</h1>
      <button className="ripple-btn" onClick={handleRipple}>
        {isRippling && (
          <span
            className="ripple"
            style={{ left: coordinates.x, top: coordinates.y }}
          >
            Click to Activate Ripple Effect
          </span>
        )}
      </button>
    </div>
  );
}

export default RippleEffect;
