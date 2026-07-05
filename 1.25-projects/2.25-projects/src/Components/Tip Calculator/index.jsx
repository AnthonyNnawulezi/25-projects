import { useState } from "react";
import "./style.css";

const DEFAULT_TIP_PERCENTAGE = 10;
const DEFAULT_PEOPLE_COUNT = 1;

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(DEFAULT_TIP_PERCENTAGE);
  const [peopleCount, setPeopleCount] = useState(DEFAULT_PEOPLE_COUNT);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function isValidInput() {
    if (!bill || Number(bill) <= 0) {
      setError("Please enter a valid bill amount.");
      return false;
    }
    if (peopleCount < 1) {
      setError("There must be at least one person.");
      return false;
    }
    if (tipPercent < 0 || tipPercent > 100) {
      setError("Tip percentage must be between 0 and 100.");
      setResult(null);
      return false;
    }
    return true;
  }

  function handleCalculate() {
    setError("");
    setResult(null);

    if (!isValidInput()) return;

    const billAmount = Number(bill);
    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;
    const tipPerPerson = tipAmount / peopleCount;
    const totalPerPerson = totalAmount / peopleCount;

    setResult({
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2),
    });
  }

  return (
    <div className="tip-calculator-container">
      <h1>Tip Calculator</h1>

      <div className="input-wrapper">
        <label htmlFor="bill-amount">Bill Amount:</label>
        <input
          id="bill-amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          aria-describedby={error ? "error-message" : undefined}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="tip-percent">Tip Percentage:</label>
        <input
          id="tip-percent"
          type="number"
          min="0"
          max="100"
          value={tipPercent}
          onChange={(e) => setTipPercent(Number(e.target.value))}
          aria-describedby={error ? "error-message" : undefined}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="people-count">Number of People:</label>
        <input
          id="people-count"
          type="number"
          min="1"
          value={peopleCount}
          onChange={(e) => setPeopleCount(Number(e.target.value))}
          aria-describedby={error ? "error-message" : undefined}
        />
      </div>

      <button onClick={handleCalculate}>Calculate Tip</button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p>Total Tip: ${result.tipAmount}</p>
          <p>Total Amount: ${result.totalAmount}</p>
          <p>Tip Per Person: ${result.tipPerPerson}</p>
          <p>Total Per Person: ${result.totalPerPerson}</p>
        </div>
      )}
    </div>
  );
}

export default TipCalculator;
