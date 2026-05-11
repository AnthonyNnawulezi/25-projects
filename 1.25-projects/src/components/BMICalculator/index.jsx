import { useState } from "react";
import "./style.css";

function BMICalculator() {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function calculateBmi() {
    if (!height || !weight) {
      setErrorMessage("Please enter the height and weight");
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
      setErrorMessage("Please enter valid values for both height and weight");
      return;
    }

    const calculateHeight = numericHeight / 100;
    const calculateBmi =
      numericWeight / (calculateHeight * calculateHeight).toFixed(2);

    setBmi(calculateBmi);
    setErrorMessage("");
  }

  // console.log(bmi);

  return (
    <div className="bmi-container">
      <h1>BMI Calculator</h1>
      <div className="input-container">
        <label htmlFor="">Height(cm):</label>
        <input
          type="number"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="">Weight(kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />
      </div>
      <button onClick={calculateBmi}>Calculate BMI</button>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      {errorMessage !== "" ? null : (
        <p className="result">
          {bmi < 18.5
            ? "Underweight"
            : bmi >= 18.5 && bmi < 24.9
            ? "Normal weight"
            : bmi >= 25 && bmi < 29.9
            ? "Overweight"
            : "Obese"}
        </p>
      )}
    </div>
  );
}

export default BMICalculator;
