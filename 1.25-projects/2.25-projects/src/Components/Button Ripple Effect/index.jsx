import { useState } from "react";
import "./style.css";

function RippleEffect() {
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
