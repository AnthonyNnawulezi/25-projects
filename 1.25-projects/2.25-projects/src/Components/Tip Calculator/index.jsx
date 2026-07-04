import { useState } from "react";
import "./style.css";
import { useMemo } from "react";

function TipCalculator() {
  const [billInput, setBillInput] = useState(0.0);
  const [tipInput, setTipInput] = useState(10.0);
  const [peopleCount, setPeopleCount] = useState(null);

  function calculateTip() {
    if (!billInput || !tipInput || !peopleCount) {
      <p className="error">Please enter a valid credential</p>;
    }

    const setAmountInfo = useMemo(() => {
      const tip = billInput * (tipInput / 100);
      const totalAmount = billInput + tip;
      const tipPerPerson = tip / peopleCount;
      const totalPerPerson = billInput / peopleCount;

      return `
      <p>Total Amount: ${totalAmount}</p>
      <p>Tip Per Person: ${tipPerPerson}</p>
      <p>Total Amount Per Person: ${totalPerPerson}</p>
      `
    });
  }

  return (
    <div className="tip-calculator-container">
      <h1>Tip Calculator</h1>
      <div className="input-wrapper">
        <label htmlFor="">Bill Amount:</label>
        <input
          type="number"
          value={billInput}
          onChange={() => setBillInput()}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="">Tip Percentage:</label>
        <input type="number" value={tipInput} onChange={() => setTipInput()} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="">Number of People:</label>
        <input
          type="number"
          value={peopleCount}
          onChange={() => setPeopleCount()}
        />
      </div>
      <button onClick={calculateTip}>Calculate Tip</button>
    </div>
  );
}

export default TipCalculator;
