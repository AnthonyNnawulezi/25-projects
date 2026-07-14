import { useState } from "react";
import "./style.css";

function BMICalculator() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  function calculateBMI() {
    const bmiHeight = Number(height);
    const bmiWeight = Number(weight);
  }

  return (
    <div>
      <h1>BMI Calculator</h1>
      <div className="bmi-container">
        <div className="bmi-wrapper">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="bmi-wrapper">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button onClick={calculateBMI}>Calculate BMI</button>
      </div>
    </div>
  );
}

export default BMICalculator;
