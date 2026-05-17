function ProgressBarStep({ steps, activeStep, setActiveStep }) {
  function handlePrevStep() {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0)); //Ensures activeStep never goes below 0.
  }

  function handleNextStep() {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  }

  function calculateCurrStepWidth() {
    return `${(100 / (steps.length - 1)) * activeStep}%`;
  }

  return (
    <div>
      <div className="steps">
        {steps && steps.length > 0
          ? steps.map((step, index) => (
              <div
                key={index}
                style={{ width: calculateCurrStepWidth() }}
                className={`step ${index <= activeStep ? "active" : ""}`}
              >
                {step}
              </div>
            ))
          : null}
      </div>
      <div className="wrapper">
        <button disabled={activeStep === 0} onClick={handlePrevStep}>
          Previous step
        </button>
        <button
          disabled={activeStep === steps.length - 1}
          onClick={handleNextStep}
        >
          Next step
        </button>
      </div>
    </div>
  );
}

export default ProgressBarStep;
