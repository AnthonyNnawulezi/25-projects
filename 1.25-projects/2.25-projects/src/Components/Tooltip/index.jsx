import { useCallback, useRef, useState } from "react";

function Tooltip() {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltip, setToolTip] = useState(null);
  const timeoutRef = useRef(null);

  const showTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setToolTip("This is your Content");
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [isVisible]);

  const hideTooltip = useCallback(() => {
    setIsVisible(false);
    setToolTip(null);
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <section>
      <h1>Tooltip</h1>
      <div
        className="tooltip-container"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        Hover Me
        {tooltip && <p>{tooltip}</p>}
      </div>
    </section>
  );
}

export default Tooltip;
