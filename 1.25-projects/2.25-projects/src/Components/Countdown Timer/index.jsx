import { useEffect, useRef, useState } from "react";

function CountDownTimer() {
  const [timeLeft, setTimeLeft] = useState(initial);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {}, 1000);
  }, [isRunning, timeLeft]);
  useEffect(() => {}, [isRunning, timeLeft]);

  return (
    <div>
      <h1>CountDown Timer</h1>
      <p></p>
      <div className="button-container">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
  );
}

export default CountDownTimer;
