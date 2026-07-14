import "./style.css";

function ProgressBar() {
  const [progressPercentage, setProgressPercentage] = useState(0);

  function handlePercentageChange(event) {
    const value = Number(event.target.value);

    const clampedValue = Math.min(Math.max(value, 0), 100);
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
            {progressPercentage}%
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="percentage">Percentage:</label>

          <input
            id="percentage"
            type="number"
            min="0"
            max="100"
            step="1"
            value={progressPercentage}
            onChange={handlePercentageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
