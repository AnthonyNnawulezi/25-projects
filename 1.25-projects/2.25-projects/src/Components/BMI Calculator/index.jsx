import { useState } from "react";
import "./style.css";

function BMICalculator() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [bmi, setBMI] = useState(null);

  function calculateBMI() {
    const bmiHeight = Number(height / 100);
    const bmiWeight = Number(weight * weight);

    const bmiValue = bmiWeight / bmiHeight;
    setBMI(bmiValue);
    console.log(bmi);
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
        {
          <p>
            {bmi <= 18.5
              ? "You are underweight"
              : bmi > 18.5 && bmi <= 24.9
                ? "You are normal"
                : bmi >= 25 && bmi <= 29.9
                  ? "You are overweight"
                  : "You are obesed"}
          </p>
        }
      </div>
    </div>
  );
}

export default BMICalculator;
