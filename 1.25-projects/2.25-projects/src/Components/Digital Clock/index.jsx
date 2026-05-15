import { useEffect, useState } from "react";
import "./style.css";

function DigitalClock() {
  const [time, setTime] = useState(new Date());
  console.log(time.toLocaleDateString);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  const formattedTime = {
    hours: time.getHours().toString().padStart(2, "0"),
    minutes: time.getMinutes().toString().padStart(2, "0"),
    seconds: time.getSeconds().toString().padStart(2, "0"),
  };

  return (
    <section>
      <h1>Digital Clock</h1>
      <div className="clock-container">
        <span>{formattedTime.hours}</span>:<span>{formattedTime.minutes}</span>:
        <span>{formattedTime.seconds}</span>
      </div>
      <h3 className="date-container">
        {time.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </h3>
    </section>
  );
}

export default DigitalClock;
