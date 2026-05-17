import { useEffect, useMemo, useRef, useState } from "react";

function CountDownTimer() {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0 && isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setIsRunning(true);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const toggle = () => {
    setIsRunning((prev) => !prev);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(timeLeft);
  };

  const start = () => {
    setIsRunning(true);
  };

  const formattedTime = useMemo(() => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  //   const formattedTime = () => {
  //     const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  //     const seconds = (timeLeft % 60).toString().padStart(2, "0");
  //     return `${minutes}:${seconds}`;
  //   };

  return (
    <div>
      <h1>CountDown Timer</h1>
      <p>{formattedTime}</p>
      <div className="button-container">
        <button type="button" onClick={toggle}>
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button
          type="button"
          onClick={start}
          disabled={isRunning === true && timeLeft > 0}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default CountDownTimer;
