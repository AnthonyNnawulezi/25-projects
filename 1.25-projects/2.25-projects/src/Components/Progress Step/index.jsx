import { useCallback, useMemo, useState } from "react";

function ProgressStep() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 7",
    "Step 8",
    "Step 9",
    "Step 10",
  ];

  const totalSteps = steps.length - 1;

  const progressWidth = useMemo(() => {
    if (steps && steps.length > 0) {
      return `${(steps / steps.length) * 100}%`;
    }
  }, [activeStep]);

  const goToNext = useCallback(() => {
    setActiveStep((previous) => Math.min(previous + 1, totalSteps));
  }, [activeStep, totalSteps]);

  const goToPrevious = useCallback(() => {
    setActiveStep((previous) => Math.max(previous - 1, totalSteps));
  }, [activeStep, totalSteps]);

  return (
    <section>
      <h1>Progress Step</h1>

      {steps.map((step) => {
        <li key={step} style={`step ${progressWidth}`}></li>;
      })}
      <div className="buttons">
        <button onClick={goToPrevious}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </div>
    </section>
  );
}

export default ProgressStep;
