import { useCallback, useEffect, useMemo, useState } from "react";
import "./style.css";

const CURRENCIES = ["NGN", "GBP", "USD", "EUR"];
const API_KEY = "59de04be7fd07d0a405808f9";

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [rates, setRates] = useState(null);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchCurrencies = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`,
      );

      if (!response.ok) throw new Error("Error fetching currencies");

      const data = await response.json();
      console.log(data);

      const result = data?.conversion_rates?.[toCurrency];
      if (!result) throw new Error("No matching rate found");

      setRates(result);
      console.log("Rates", result);
    } catch (error) {
      console.error(setErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency]);

  const currencyValue = useCallback(
    (e) => {
      setAmount(e.target.value);
    },
    [amount],
  );

  const handleFromCurrency = useCallback((e) => {
    setFromCurrency(e.target.value);
  }, []);

  const handleToCurrency = useCallback((e) => {
    setToCurrency(e.target.value);
  }, []);

  const convertedRate = useMemo(() => {
    return Number(amount * rates).toFixed(2);
  }, [rates, amount]);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return (
    <section>
      <h1>Currency Converter</h1>
      {isLoading && <p>Loading please wait...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="exchange-wrapper">
        <input
          type="number"
          value={amount}
          placeholder="Enter Currency"
          onChange={currencyValue}
        />
        <select value={fromCurrency} onChange={handleFromCurrency}>
          {CURRENCIES.map((currency) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>
        <p className="divider">To</p>
        <input type="number" value={convertedRate} readOnly />
        <select onChange={handleToCurrency} value={toCurrency}>
          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="rate-wrapper">
        Exchange Rate: {amount} {fromCurrency} = {convertedRate} {toCurrency}
      </div>
    </section>
  );
}

export default CurrencyConverter;
