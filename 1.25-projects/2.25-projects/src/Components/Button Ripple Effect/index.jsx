import { useCallback, useState } from "react";
import "./style.css";

function RippleEffect() {
  const [ripple, setRipple] = useState(null);

  const handleRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // A new unique key forces React to unmount the old <span> and mount a new one,
    // restarting the CSS animation.
    setRipple({ x, y, id: Date.now() + Math.random() });
  }, []);

  // When the CSS animation ends, remove the ripple from state,
  // which unmounts the <span> cleanly.
  const handleAnimationEnd = useCallback(() => {
    setRipple(null);
  }, []);

  return (
    <div>
      <h1>Button Ripple Effect</h1>
      <button className="ripple-btn" onClick={handleRipple}>
        {ripple && (
          <span
            className="ripple"
            key={ripple.id}
            style={{ left: ripple.x, top: ripple.y }}
            onAnimationEnd={handleAnimationEnd}
          ></span>
        )}
        Click to Activate Ripple Effect
      </button>
    </div>
  );
}

export default RippleEffect;
