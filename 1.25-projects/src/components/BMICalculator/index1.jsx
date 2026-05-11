import { useState } from "react";
import "./style.css";

//optimized
function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function calculateBmi() {
    if (!height || !weight) {
      setErrorMessage("Please enter the height and weight");
      setBmi(null);
      return;
    }

    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(weight);

    if (
      isNaN(numericHeight) ||
      isNaN(numericWeight) ||
      numericHeight <= 0 ||
      numericWeight <= 0
    ) {
      setErrorMessage("Please enter valid positive numbers");
      setBmi(null);
      return;
    }

    const heightInMeters = numericHeight / 100;
    const bmiValue = numericWeight / heightInMeters ** 2;

    setBmi(bmiValue.toFixed(2));
    setErrorMessage("");
  }

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div className="bmi-container">
      <h1>BMI Calculator</h1>

      <div className="input-container">
        <label htmlFor="height">Height (cm):</label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <button onClick={calculateBmi}>Calculate BMI</button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {bmi && !errorMessage && (
        <p className="result">
          BMI: {bmi} — {getBmiCategory(parseFloat(bmi))}
        </p>
      )}
    </div>
  );
}

export default BMICalculator;
