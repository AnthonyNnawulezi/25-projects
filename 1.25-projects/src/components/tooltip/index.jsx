import { useState } from "react";

let timeout;

function Tooltip({ children, content, delay }) {
  const [isVisible, setIsVisible] = useState(false);

  function showTooltip() {
    timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay || 500);
  }
  function hideTooltip() {
    clearTimeout(timeout);
    setIsVisible(false);
  }

  return (
    <div
      className="container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible ? <div className="tooltip">{content}</div> : null}
    </div>
  );
}

export default Tooltip;
