import { useEffect, useState } from "react";
import "./style.css";

function ButtonRippleEffect() {
  const [isRippling, setIsRippling] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: -1, y: -1 });

  function rippleEffect(event) {
    console.log(
      event.target.getBoundingClientRect(),
      event.clientX,
      event.clientY
    );
    const rect = event.target.getBoundingClientRect();
    setCoordinates({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  useEffect(() => {
    if (coordinates.x !== -1 && coordinates.y !== -1) {
      setIsRippling(true);
      setTimeout(() => {
        setIsRippling(false);
      }, 500);
    } else {
      setIsRippling(false);
    }
  }, [coordinates]);

  useEffect(() => {
    if (!isRippling) setCoordinates({ x: -1, y: -1 });
  }, [isRippling]);

  console.log(coordinates);

  return (
    <div className="ripple-container">
      <h1>ButtonRippleEffect</h1>
      <button onClick={rippleEffect} className="ripple-btn">
        {isRippling ? (
          <span
            className="ripple"
            style={{ left: coordinates.x, top: coordinates.y }}
          ></span>
        ) : null}
        Click
      </button>
    </div>
  );
}

export default ButtonRippleEffect;
