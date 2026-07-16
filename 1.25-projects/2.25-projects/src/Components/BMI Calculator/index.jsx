import { useCallback, useState } from "react";
import "./style.css";

const BMI_CATEGORIES = {
  UNDERWEIGHT: 18.5,
  NORMAL: 25,
  OVERWEIGHT: 30,
};

function getBMICategory(bmiValue) {
  if (bmiValue < BMI_CATEGORIES.UNDERWEIGHT) return "You are underweight";
  if (bmiValue < BMI_CATEGORIES.NORMAL) return "You are normal";
  if (bmiValue < BMI_CATEGORIES.OVERWEIGHT) return "You are overweight";
  return "You are obese";
}

function calculateBMIValue(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / heightM ** 2;
}

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [error, setError] = useState("");

  function handleHeightChange(e) {
    setHeight(e.target.value);
    setError("");
  }

  function handleWeightChange(e) {
    setWeight(e.target.value);
    setError("");
  }

  const calculateBMI = useCallback(() => {
    setError(null);

    const heightCm = Number(height);
    const weightKg = Number(weight);

    if (!heightCm || !weightKg || heightCm < 0 || weightKg < 0) {
      setError("Please enter a valid positive height and weight");
      setBMI(null);
      return;
    }

    const newBMI = calculateBMIValue(weightKg, heightCm);
    setBMI(newBMI);
    setError(null);
  }, [height, weight]);

  return (
    <div>
      <h1>BMI Calculator</h1>
      <div className="bmi-container">
        <div className="bmi-wrapper">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={handleHeightChange}
            min="0"
            step="any"
          />
        </div>
        <div className="bmi-wrapper">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
            min="0"
            step="any"
          />
        </div>
        <button onClick={calculateBMI}>Calculate BMI</button>
        {error ? (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        ) : bmi !== null ? (
          <p>
            Your BMI is <strong>{bmi.toFixed(1)}</strong> {getBMICategory(bmi)}.
          </p>
        ) : (
          <p>Enter your height and weight, then click Calculate.</p>
        )}
      </div>
    </div>
  );
}

export default BMICalculator;
