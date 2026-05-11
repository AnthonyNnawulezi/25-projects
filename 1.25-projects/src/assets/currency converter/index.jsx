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
      `https://open.er-api.com/v6/latest/${fromCurrency}`
      // ` https://v6.exchangerate-api.com/v6/59de04be7fd07d0a405808f9/latest/${fromCurrency}`,
      // {
      //   method: "GET",
      // }
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

//optimised
// function CurrencyConverter() {
//   const [amount, setAmount] = useState(1);
//   const [fromCurrency, setFromCurrency] = useState("GBP");
//   const [toCurrency, setToCurrency] = useState("NGN");
//   const [exchangeRate, setExchangeRate] = useState(null);
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function fetchExchangeRate() {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `https://open.er-api.com/v6/latest/${fromCurrency}`
//         // `https://v6.exchangerate-api.com/v6/59de04be7fd07d0a405808f9/latest/${fromCurrency}`
//       );
//       const result = await response.json();

//       if (result?.rates[toCurrency]) {
//         const calculatedRate = result.rates[toCurrency];
//         setExchangeRate(calculatedRate);
//         setConvertedAmount((amount * calculatedRate).toFixed(2));
//       } else {
//         throw new Error("Invalid currency pair");
//       }
//     } catch (err) {
//       setError("Failed to fetch exchange rate");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     const timer = setTimeout(fetchExchangeRate, 500); // Debounce API calls
//     return () => clearTimeout(timer); // Cleanup previous request
//   }, [fromCurrency, toCurrency, amount]);

//   return (
//     <div className="currency-converter">
//       <h1>Currency Converter</h1>
//       <div className="input-container">
//         <input
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           type="number"
//           placeholder="Enter Amount"
//           min="1"
//         />
//         <select
//           value={fromCurrency}
//           onChange={(e) => setFromCurrency(e.target.value)}
//         >
//           <option value="USD">USD</option>
//           <option value="GBP">GBP</option>
//           <option value="EUR">EUR</option>
//           <option value="NGN">NGN</option>
//         </select>
//       </div>

//       <p>To</p>

//       <div className="input-container">
//         <input type="text" value={convertedAmount || ""} readOnly />
//         <select
//           value={toCurrency}
//           onChange={(e) => setToCurrency(e.target.value)}
//         >
//           <option value="NGN">NGN</option>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="NGN">NGN</option>
//         </select>
//       </div>

//       {loading ? <p>Loading...</p> : null}
//       {error ? <p className="error">{error}</p> : null}

//       {exchangeRate && (
//         <p className="exchange-rate">
//           Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
//         </p>
//       )}
//     </div>
//   );
// }

export default CurrencyConverter;
