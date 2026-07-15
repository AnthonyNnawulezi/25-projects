import { useState } from "react";
import "./style.css";

function BMICalculator() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [error, setError] = useState(null);

  function calculateBMI() {
    const bmiHeight = Number(height) ** 2;
    const bmiWeight = Number(weight * weight);

    if (!bmiHeight || !bmiWeight) {
      setError("Please enter the height and weight");
      return;
    }

    const bmiValue = (Number(bmiWeight) / bmiHeight) * 10000;
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
        {error ? (
          <p>{error}</p>
        ) : (
          <p>
            {bmi < 18.5
              ? "You are underweight"
              : bmi < 25
                ? "You are normal"
                : bmi < 30
                  ? "You are overweight"
                  : "You are obese"}
          </p>
        )}
      </div>
    </div>
  );
}

export default BMICalculator;
