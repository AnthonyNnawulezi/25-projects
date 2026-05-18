import { useCallback, useMemo, useState } from "react";
import "./style.css";

// function ProgressStep() {
//   const [activeStep, setActiveStep] = useState(0);
//   const steps = [
//     "Step 1",
//     "Step 2",
//     "Step 3",
//     "Step 4",
//     "Step 5",
//     "Step 6",
//     "Step 7",
//     "Step 8",
//     "Step 9",
//     "Step 10",
//   ];

//   const totalSteps = steps.length - 1;

//   const progressWidth = useMemo(() => {
//     if (steps && steps.length > 0) {
//       return `${(steps / totalSteps) * 100}%`;
//     }
//   }, [activeStep, totalSteps]);

//   const goToNext = useCallback(() => {
//     setActiveStep((previous) => Math.min(previous + 1, totalSteps));
//   }, [activeStep, totalSteps]);

//   const goToPrevious = useCallback(() => {
//     setActiveStep((previous) => Math.max(previous - 1, 0));
//   }, [activeStep, totalSteps]);

//   return (
//     <section>
//       <h1>Progress Step</h1>

//       <div className="step-container">
//         {steps?.map((step, i) => (
//           <li
//             key={step}
//             className={`step ${i <= activeStep ? "active" : null}`}
//             style={{ width: progressWidth }}
//           >
//             {step}
//           </li>
//         ))}
//       </div>

//       <div className="buttons">
//         <button onClick={goToPrevious} disabled={activeStep === 0}>
//           Previous
//         </button>
//         <button disabled={activeStep === totalSteps} onClick={goToNext}>
//           Next
//         </button>
//       </div>
//     </section>
//   );
// }

// export default ProgressStep;

function ProgressStep() {
  const totalSteps = steps?.length ?? 0;
  const progressWidth = useMemo(() => {
    if (totalSteps <= 1) return "0%";
    return `${(activeStep / (totalSteps - 1)) * 100}%`;
  }, [activeStep, totalSteps]);
}
