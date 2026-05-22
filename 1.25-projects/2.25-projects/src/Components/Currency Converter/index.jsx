import { useCallback, useEffect, useMemo, useState } from "react";

const CURRENCIES = ["NGN", "GBP", "USD", "EUR"];

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [currencies, setCurrencies] = useState("NGN");
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchCurrencies = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/59de04be7fd07d0a405808f9/latest/${fromCurrency}`,
      );

      if (!response.ok) throw new Error("Error fetching currencies");

      const data = await response.json();
      const result = data?.conversion_rates?.[currencies];
      console.log(result);

      if (!result) throw new Error("No matching currency found");

      setCurrencies(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const currencyValue = useCallback(
    (e) => {
      setAmount(Number(e.target.value));
    },
    [amount],
  );

  const handleFromCurrency = useCallback(
    (e) => {
      setFromCurrency(Number(e.target.value));
    },
    [amount],
  );

  const handleToCurrency = useCallback(
    (e) => {
      setToCurrency(Number(e.target.value));
    },
    [amount],
  );

  const convertedRate = useMemo(() => {
    const calculatedRate = Number(amount * currencyValue);
    return calculatedRate;
  }, [currencyValue]);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies, fromCurrency, toCurrency]);

  return (
    <section>
      <h1>Currency Converter</h1>
      {isLoading && <p>Loading please wait...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="exchange-wrapper">
        <input type="text" value={currencyValue} placeholder="Enter Currency" />
        <select>
          {CURRENCIES.map((currency) => (
            <option
              key={currency}
              value={currency}
              onChange={handleFromCurrency}
            ></option>
          ))}
        </select>
        <p>To</p>
        <input type="text" value={currencyValue} readOnly />
        <select>
          {CURRENCIES.map((currency) => (
            <option
              key={currency}
              value={currency}
              onChange={handleToCurrency}
            ></option>
          ))}
        </select>
      </div>
      <div className="rate-wrapper">
        Exchange Rate: 1 {fromCurrency} = {convertedRate} {toCurrency}
      </div>
    </section>
  );
}

export default CurrencyConverter;
