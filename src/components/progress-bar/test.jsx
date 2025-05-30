import { useState } from "react";
import ProgressBarStep from ".";
import "./style.css";

function ProgressBar() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

  return (
    <div className="container">
      <h1>Progress Bar</h1>
      <ProgressBarStep
        steps={steps}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
    </div>
  );
}

export default ProgressBar;
