import { useEffect, useState } from "react";
import './style.css'

// function DigitalClock() {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTime(new Date()); //current time
//     }, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <div className="digital-clock">
//       <h1>Digital Clock</h1>
//       <div className="clock">
//         <div className="time">
//           <span>{time.getHours().toString().padStart(2, 0)}</span>:
//           <span>{time.getMinutes().toString().padStart(2, 0)}</span>:
//           <span>{time.getSeconds().toString().padStart(2, 0)}</span>
//         </div>
//         <div className="date">
//           {time.toLocaleDateString(undefined, {
//             weekday: "long",
//             day: "numeric",
//             year: "numeric",
//             month: "long",
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

//optimised

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Format numbers to always have 2 digits
  const formatTime = (num) => num.toString().padStart(2, "0");

  return (
    <div className="digital-clock">
      <h1>Digital Clock</h1>
      <div className="clock">
        <div className="time">
          <span>{formatTime(time.getHours())}</span>:
          <span>{formatTime(time.getMinutes())}</span>:
          <span>{formatTime(time.getSeconds())}</span>
        </div>
        <div className="date">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(time)}
        </div>
      </div>
    </div>
  );
}

export default DigitalClock;
