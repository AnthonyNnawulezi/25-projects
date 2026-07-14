import { useState } from "react";
import "./style.css";

function ProgressBar() {
  const [progressPercentage, setProgressPercentage] = useState(0);

  function handleProgress(e) {
    if (progressPercentage >= 0 && progressPercentage <= 100) {
      setProgressPercentage(e.target.value);
    }
  }

  return (
    <div className="progress-bar-container">
      <h1>Custom Progress Bar</h1>
      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div
            className="custom-progress"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage}
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="">Percentage:</label>
          <input
            type="number"
            onChange={handleProgress}
            value={progressPercentage}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
