import { useCallback, useRef, useState } from "react";

// function Tooltip1({ children, content, delay }) {
//   let timeout;
//   function showTooltip() {
//     timeout = setTimeout(() => {
//       setIsVisible(true);
//     }, delay || 500);
//   }
//   function hideTooltip() {
//     clearTimeout(timeout);
//     setIsVisible(false);
//   }

//   const [isVisible, setIsVisible] = useState(false);
//   return (
//     <div>
//       <div
//         className="container"
//         onMouseEnter={showTooltip}
//         onMouseLeave={hideTooltip}
//       >
//         {children}
//         {isVisible ? <div className="tooltip">{content}</div> : null}
//       </div>
//     </div>
//   );
// }

//  optimised
// useRef (timeoutRef) prevents reassigning timeout every render.
// useCallback ensures showTooltip and hideTooltip don't recreate on every render.
function Tooltip({ children, content, delay }) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showTooltip = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  }, []);

  return (
    <div className="relative">
      <div
        className="container"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
        {isVisible && <div className="tooltip">{content}</div>}
      </div>
    </div>
  );
}

export default Tooltip;
