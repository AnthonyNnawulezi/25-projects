import { useState } from "react";
import "./style.css";

function TipCalcultator() {
  const [billAmount, setBillAmount] = useState(null);
  const [percentage, setPercentage] = useState(10);
  const [splitCount, setSplitCount] = useState(1);
  const [tipAmount, setTipAmount] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  function calculateTip() {
    if (!billAmount || billAmount <= 0 || !percentage || percentage <= 0) {
      setTipAmount(null);
      setErrorMsg("Please enter valid value");
      return;
    }
    const bill = parseFloat(billAmount);
    const tip = (bill * percentage) / 100;
    const totalAmount = bill + tip;
    const tipAmountPerPerson = tip / splitCount;
    const totalAmountPerPerson = totalAmount / splitCount;

    setTipAmount({
      totalAmount: totalAmount.toFixed(2),
      tipPerPerson: tipAmountPerPerson.toFixed(2),
      totalPerPerson: totalAmountPerPerson.toFixed(2),
    });
    setErrorMsg("");
  }

  return (
    <div className="tip-calculator">
      <h1>Tip Calculator</h1>
      <div className="input-container">
        <label htmlFor="">Bill Amount:</label>
        <input
          type="number"
          onChange={(event) => setBillAmount(event.target.value)}
          value={billAmount}
          name=""
          id=""
        />
      </div>
      <div className="input-container">
        <label htmlFor="">Tip Percentage:</label>
        <input
          type="number"
          onChange={(event) => setPercentage(event.target.value)}
          value={percentage}
          name=""
          id=""
        />
      </div>
      <div className="input-container">
        <label htmlFor="">Number of People:</label>
        <input
          type="number"
          onChange={(event) => setSplitCount(event.target.value)}
          value={splitCount}
          name=""
          id=""
        />
      </div>
      <button onClick={calculateTip}>Calculate Tip</button>
      {errorMsg ? <p className="error">{errorMsg}</p> : null}
      {tipAmount ? (
        <div className="tip-result">
          <p>Total: {tipAmount.totalAmount}</p>
          <p>Tip per person: {tipAmount.tipPerPerson}</p>
          <p>Total amount per person: {tipAmount.totalPerPerson}</p>
        </div>
      ) : null}
    </div>
  );
}

export default TipCalcultator;
