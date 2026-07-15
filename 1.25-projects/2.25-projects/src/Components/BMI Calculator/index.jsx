import { useState } from "react";
import "./style.css";

function BMICalculator() {
  function getBMICategory(bmiValue) {
    if (bmiValue < 18.5) return "You are underweight";
    if (bmiValue < 25) return "You are normal";
    if (bmiValue < 30) return "You are overweight";
    return "You are obese";
  }
}

export default BMICalculator;
