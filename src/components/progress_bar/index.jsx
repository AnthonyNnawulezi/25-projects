import { useState } from "react";
import "./style.css";

function ProgresBar() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  function progressPercentage(event) {
    setProgressPercent(event.target.value);
    if (event.target.value > 100) {
      setErrorMsg("Please enter a value less than 100");
    } else {
      setErrorMsg("");
      setProgressPercent(event.target.value);
    }
  }

  return (
    <div className="container">
      <h1>Custom Progress Bar</h1>
      <div className="progress-bar">
        <div className="wrapper1">
          {progressPercent >= 0 && progressPercent <= 100 ? (
            <div
              style={{ width: `${progressPercent}%` }}
              className="inner-wrapper1"
            >
              {progressPercent}
            </div>
          ) : (
            <p>{errorMsg}</p>
          )}
        </div>
      </div>
      <div className="input">
        <label htmlFor="">Percentage: </label>
        <input
          type="number"
          onChange={progressPercentage}
          value={progressPercent}
        />
      </div>
    </div>
  );
}

export default ProgresBar;
