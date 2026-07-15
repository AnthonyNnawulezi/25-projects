import { useState } from "react";
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
  }, [height, weight]);
}

export default BMICalculator;
