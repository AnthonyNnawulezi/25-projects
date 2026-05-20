import { useState } from "react";

function Tooltip({ children, content, delay }) {
  const [isVisible, setIsVisible] = useState(false);

  let timeout;
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
    <div>
      <div
        className="container"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
        {isVisible ? <div className="tooltip">{content}</div> : null}
      </div>
    </div>
  );
}

export default Tooltip;
