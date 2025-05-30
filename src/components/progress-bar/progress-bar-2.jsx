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
