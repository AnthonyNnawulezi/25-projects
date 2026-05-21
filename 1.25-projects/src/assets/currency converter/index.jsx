import { useEffect, useState } from "react";
import "./style.css";

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  async function fetchExchangeRate() {
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${fromCurrency}`,
    );
    const result = await response.json();
    const calculatedRate = result?.rates[toCurrency];
    setExchangeRate(calculatedRate);
    setConvertedAmount((amount * calculatedRate).toFixed(2));
    console.log(result);
  }

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value);
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value);
  }

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <div className="input-container">
        <input
          value={amount}
          onChange={handleAmountChange}
          type="number"
          name="amount"
          placeholder="Enter Amount"
          id=""
        />
        <select
          name=""
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          id=""
        >
          <option value={"USD"}>USD</option>
          <option value={"GBP"}>GBP</option>
          <option value={"EUR"}>EUR</option>
          <option value={"NGN"}>NGN</option>
        </select>
      </div>
      <p>To</p>
      <div className="input-container">
        <input type="text" name="" value={convertedAmount} readOnly id="" />
        <select
          name=""
          value={toCurrency}
          id=""
          onChange={handleToCurrencyChange}
        >
          <option value={"USD"}>USD</option>
          <option value={"GBP"}>GBP</option>
          <option value={"EUR"}>EUR</option>
          <option value={"NGN"}>NGN</option>
        </select>
      </div>
      <p className="exchange-rate">
        Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
      </p>
    </div>
  );
}

export default CurrencyConverter;
