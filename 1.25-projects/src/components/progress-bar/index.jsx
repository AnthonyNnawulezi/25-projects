// function ProgressBarStep({ steps, activeStep, setActiveStep }) {
//   function handlePrevStep() {
//     setActiveStep((prevStep) => Math.max(prevStep - 1, 0)); //Ensures activeStep never goes below 0.
//   }
//   function handleNextStep() {
//     setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1)); //Ensures activeStep never exceeds the last step. -1 cos it is starting from 0
//   }
//   function calculateCurrStepWidth() {
//     // (steps.length - 1) :The total number of steps minus one (because progress is measured between steps, not on steps).
//     //100 / (steps.length - 1)	Determines how much percentage each step should take in the progress bar.
//     // * activeStep	Multiplies by the current step to get the actual progress.
//     //`${...}%`	Formats the result as a percentage for CSS usage.
//     return `${(100 / (steps.length - 1)) * activeStep}%`;
//   }

//   return (
//     <div>
//       <div className="steps">
//         {steps && steps.length > 0
//           ? steps.map((step, index) => (
//               <div
//                 key={index}
//                 style={{ width: calculateCurrStepWidth() }}
//                 className={`step ${index <= activeStep ? "active" : ""}`}
//               >
//                 {step}
//               </div>
//             ))
//           : null}
//       </div>
//       <div className="wrapper">
//         <button disabled={activeStep === 0} onClick={handlePrevStep}>
//           Previous step
//         </button>
//         <button
//           disabled={activeStep === steps.length - 1}
//           onClick={handleNextStep}
//         >
//           Next step
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProgressBarStep;

// optimised
function ProgressBarStep({ steps, activeStep, setActiveStep }) {
  const handleStepChange = (change) => {
    setActiveStep((prevStep) =>
      Math.min(Math.max(prevStep + change, 0), steps.length - 1)
    );
  };

  const progressWidth = `${(100 / (steps.length - 1)) * activeStep}%`;

  return (
    <div>
      <div className="steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index <= activeStep ? "active" : ""}`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: progressWidth }}></div>
      </div>
      <div className="wrapper">
        <button
          disabled={activeStep === 0}
          onClick={() => handleStepChange(-1)}
        >
          Previous step
        </button>
        <button
          disabled={activeStep === steps.length - 1}
          onClick={() => handleStepChange(1)}
        >
          Next step
        </button>
      </div>
    </div>
  );
}

export default ProgressBarStep;

// import { useEffect } from "react";

// function ProgressBarStep({ steps, activeStep, setActiveStep }) {
//   const handleStepChange = (change) => {
//     setActiveStep((prevStep) =>
//       Math.min(Math.max(prevStep + change, 0), steps.length - 1)
//     );
//   };

//   const progressWidth = `${(100 / (steps.length - 1)) * activeStep}%`;

//   // 🎯 Add keyboard support (Arrow Left ⬅ & Arrow Right ➡)
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowRight") handleStepChange(1);
//       if (e.key === "ArrowLeft") handleStepChange(-1);
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   return (
//     <div className="progress-container">
//       {/* Progress Steps */}
//       <div className="steps">
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className={`step ${index <= activeStep ? "active" : ""}`}
//           >
//             <div className="step-circle">{index + 1}</div>
//             <span className="step-label">{step}</span>
//           </div>
//         ))}
//       </div>

//       {/* Progress Bar */}
//       <div className="progress-bar">
//         <div className="progress" style={{ width: progressWidth }}></div>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="wrapper">
//         <button
//           disabled={activeStep === 0}
//           onClick={() => handleStepChange(-1)}
//         >
//           ⬅ Previous
//         </button>
//         <button
//           disabled={activeStep === steps.length - 1}
//           onClick={() => handleStepChange(1)}
//         >
//           Next ➡
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProgressBarStep;
