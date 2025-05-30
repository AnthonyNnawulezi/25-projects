import { useState } from "react";
import "./style.css";

function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [percentage, setPercentage] = useState(10);
  const [splitCount, setSplitCount] = useState(1);
  const [tipResult, setTipResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tipPercent = parseFloat(percentage);
    const people = parseInt(splitCount);

    if (
      isNaN(bill) ||
      bill <= 0 ||
      isNaN(tipPercent) ||
      tipPercent <= 0 ||
      isNaN(people) ||
      people <= 0
    ) {
      setErrorMsg("Please enter valid values for all fields.");
      setTipResult(null);
      return;
    }

    const tip = (bill * tipPercent) / 100;
    const total = bill + tip;

    setTipResult({
      total: total.toFixed(2),
      tipPerPerson: (tip / people).toFixed(2),
      totalPerPerson: (total / people).toFixed(2),
    });
    setErrorMsg("");
  };

  return (
    <div className="tip-calculator">
      <h1>Tip Calculator</h1>

      <div className="input-container">
        <label>Bill Amount:</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Tip Percentage:</label>
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Number of People:</label>
        <input
          type="number"
          value={splitCount}
          onChange={(e) => setSplitCount(e.target.value)}
        />
      </div>

      <button onClick={calculateTip}>Calculate Tip</button>

      {errorMsg && <p className="error">{errorMsg}</p>}

      {tipResult && (
        <div className="tip-result">
          <p>Total: ${tipResult.total}</p>
          <p>Tip per person: ${tipResult.tipPerPerson}</p>
          <p>Total per person: ${tipResult.totalPerPerson}</p>
        </div>
      )}
    </div>
  );
}

export default TipCalculator;
