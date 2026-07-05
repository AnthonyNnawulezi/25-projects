import { useState } from "react";
import "./style.css";

const DEFAULT_TIP_PERCENTAGE = 10;
const DEFAULT_PEOPLE_COUNT = 1;

function TipCalculator() {
  const [billInput, setBillInput] = useState(0.0);
  const [tipInput, setTipInput] = useState(10.0);
  const [peopleCount, setPeopleCount] = useState(0);
  const [amountInfo, setAmountInfo] = useState("");
  const [error, setError] = useState("");

  function calculateTip() {
    if (!billInput || !tipInput || !peopleCount) {
      setError(<p className="error">Please enter a valid credential</p>);
      setAmountInfo("");
      return;
    }

    const tip = billInput * (tipInput / 100);
    const totalAmount = billInput + tip;
    const tipPerPerson = tip / peopleCount;
    const totalPerPerson = billInput / peopleCount;

    setAmountInfo({
      totalAmount: totalAmount.toFixed(2),
      tip: tip.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2),
    });
    setError("");
  }

  return (
    <div className="tip-calculator-container">
      <h1>Tip Calculator</h1>
      <div className="input-wrapper">
        <label htmlFor="">Bill Amount:</label>
        <input
          type="number"
          value={billInput}
          onChange={(event) => setBillInput(Number(event.target.value))}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="">Tip Percentage:</label>
        <input
          type="number"
          value={tipInput}
          onChange={(event) => setTipInput(Number(event.target.value))}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="">Number of People:</label>
        <input
          type="number"
          value={peopleCount}
          onChange={(event) => setPeopleCount(Number(event.target.value))}
        />
      </div>
      <button onClick={calculateTip}>Calculate Tip</button>

      {error && <p className="error">Please enter a valid credential</p>}
      {amountInfo && (
        <div className="result">
          <p>Total Amount: {amountInfo.totalAmount}</p>
          <p>Tip Per Person: {amountInfo.tipPerPerson}</p>
          <p>Total Amount Per Person: {amountInfo.totalPerPerson}</p>
        </div>
      )}
    </div>
  );
}

export default TipCalculator;
