import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

function RandomQuoteGenerator() {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);

  async function fetchQuote() {
    try {
      setLoading(true);

      const response = await fetch("https://dummyjson.com/quotes/random");
      const result = await response.json();

      if (result && result.quote) {
        setQuote(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  function handleRefresh() {
    fetchQuote();
  }

  if (loading) {
    return <h3>Loading Quote! please wait</h3>;
  }

  return (
    <div className="random-quote-generator">
      <h1>Randon Quote Generator</h1>
      <div className="wrapper">
        <p>{quote?.quote}</p>
        <p>{quote?.author}</p>
        <button className="refresh" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
}

export default RandonQuoteGenerator;
