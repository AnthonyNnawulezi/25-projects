import { useCallback, useEffect, useState } from "react";
import "./style.css";

function RandomQuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://dummyjson.com/quotes/random");

      if (!response.ok) throw new Error("Error fetching quote! Try again");

      const result = await response.json();

      if (!result && !result > 0) setError("No quote available");

      setQuote(result);
      setLoading(false);
    } catch (error) {
      ("Error fetching quote! Try again", error);
      setError("Could not load a quote. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <section>
      <h1>Random Quote Generator</h1>
      {error && <p className="error">{error}</p>}

      {quote && !loading && !error && (
        <div className="wrapper">
          <blockquote>{quote.author}</blockquote>
          <cite>{quote.quote}</cite>
          <button onClick={fetchQuote}>
            {loading ? "Loading! Please wait" : "Refresh"}
          </button>
        </div>
      )}
    </section>
  );
}

export default RandomQuoteGenerator;
