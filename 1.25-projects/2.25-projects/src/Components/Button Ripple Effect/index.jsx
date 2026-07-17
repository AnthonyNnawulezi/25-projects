import { useState } from "react";

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

    if (isRippling) {
      setCoordinates({
        x: X,
        y: Y,
      });
    }
  }

  return (
    <div>
      <h1>Button Ripple Effect</h1>
      <button onClick={handleRipple}>Click to Activate Ripple Effect</button>
    </div>
  );
}

export default RippleEffect;
