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

    setCoordinates({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    setTimeout(() => {
      setIsRippling(true);
    }, 1000);
  }

  return (
    <div>
      <h1>Button Ripple Effect</h1>
      <button className="ripple-btn" onClick={handleRipple}>
        {isRippling && (
          <span
            className="ripple"
            style={{ left: coordinates.x, top: coordinates.y }}
          ></span>
        )}
        Click to Activate Ripple Effect
      </button>
    </div>
  );
}

export default RippleEffect;
