import { useEffect, useRef, useState } from "react";

// function CountDownTimer({ initial, onTimeFinish }) {
//   const [time, setTime] = useState(initial);
//   const [isRunning, setIsRunning] = useState(true);
//   const intervalReference = useRef();

//   useEffect(() => {
//     if (isRunning) {
//       //manage the interval
//       intervalReference.current = setInterval(() => {
//         setTime((prevTime) => {
//           if (prevTime === 0) {
//             clearInterval(intervalReference.current);
//             setIsRunning(false);
//             // time has finished/stopped running so whatever happens here is ontimefinish
//             if (onTimeFinish) {
//               onTimeFinish();
//             }
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     } else {
//       clearInterval(intervalReference.current);
//     }
//     return () => {
//       clearInterval(intervalReference.current);
//     };
//   }, [isRunning, onTimeFinish]);

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   function playAndPause() {
//     setIsRunning((prevIsRunning) => !prevIsRunning); //or
//     // setIsRunning(!prevIsRunning)
//   }

//   function reset() {
//     clearInterval(intervalReference.current);
//     setTime(initial);
//     setIsRunning(false);
//   }

//   function start() {
//     setIsRunning(true);
//   }

//   return (
//     <div className="timer">
//       <p>
//         {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
//       </p>
//       <div className="timer-buttons">
//         <button onClick={playAndPause}>{isRunning ? "Pause" : "resume"}</button>
//         <button onClick={reset}>Reset</button>
//         <button onClick={start}>Start</button>
//       </div>
//     </div>
//   );
// }

//optimised
function CountDownTimer({ initial, onTimeFinish }) {
  const [time, setTime] = useState(initial);
  const [isRunning, setIsRunning] = useState(false); // Start paused by default
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false); //Stops when time reaches zero and calls onTimeFinish()
            onTimeFinish?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); //decreases every 1sec interval
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time, onTimeFinish]);

  const formatTime = (num) => String(num).padStart(2, "0");
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const togglePlayPause = () => setIsRunning((prev) => !prev);
  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(initial);
    setIsRunning(false);
  };

  return (
    <div className="timer">
      <p>
        {formatTime(minutes)}:{formatTime(seconds)}
      </p>
      <div className="timer-buttons">
        <button onClick={togglePlayPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default CountDownTimer;
