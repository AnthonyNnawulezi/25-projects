import { useEffect, useMemo, useRef, useState } from "react";

// function CountDownTimer() {
//   const [timeLeft, setTimeLeft] = useState(120);
//   const [isRunning, setIsRunning] = useState(false);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (timeLeft > 0 && isRunning) {
//       intervalRef.current = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       clearInterval(intervalRef.current);
//       setIsRunning(false);
//       setTimeLeft(120);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [isRunning, timeLeft]);

//   const toggle = () => {
//     setIsRunning((prev) => !prev);
//   };

//   const reset = () => {
//     setIsRunning(false);
//     setTimeLeft(120);
//   };

//   const start = () => {
//     setIsRunning(true);
//   };

//   const formattedTime = useMemo(() => {
//     const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
//     const seconds = (timeLeft % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   }, [timeLeft]);

//   //   const formattedTime = () => {
//   //     const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
//   //     const seconds = (timeLeft % 60).toString().padStart(2, "0");
//   //     return `${minutes}:${seconds}`;
//   //   };

//   return (
//     <section>
//       <h1>CountDown Timer</h1>
//       <p>{formattedTime}</p>
//       <div className="button-container">
//         <button type="button" onClick={toggle}>
//           {isRunning ? "Pause" : "Resume"}
//         </button>
//         <button type="button" onClick={reset}>
//           Reset
//         </button>
//         <button
//           type="button"
//           onClick={start}
//           disabled={isRunning === true && timeLeft > 0}
//         >
//           Start
//         </button>
//       </div>
//     </section>
//   );
// }

function CountDownTimer({ initial, onTimeFinish }) {
  const [timeLeft, setTimeLeft] = useState(initial);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        onTimeFinish?.(); //eg fetch API or other function
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
}

export default CountDownTimer;
