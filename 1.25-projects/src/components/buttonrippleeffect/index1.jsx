import { useEffect, useState } from "react";
import "./style.css";

function ButtonRippleEffect() {
  const [ripple, setRipple] = useState({ x: -1, y: -1, isRippling: false });

  const rippleEffect = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRipple({ x, y, isRippling: true });
  };

  useEffect(() => {
    if (ripple.isRippling) {
      const timeout = setTimeout(() => {
        setRipple((prev) => ({ ...prev, isRippling: false }));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [ripple.isRippling]);

  return (
    <div className="ripple-container">
      <h1>ButtonRippleEffect</h1>
      <button onClick={rippleEffect} className="ripple-btn">
        {ripple.isRippling && (
          <span
            className="ripple"
            style={{ left: ripple.x, top: ripple.y }}
          ></span>
        )}
        Click
      </button>
    </div>
  );
}

export default ButtonRippleEffect;
