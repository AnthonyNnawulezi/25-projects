import { useState } from "react";

function RandomQuoteGnerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <section>
      <h1>Random Quote Generator</h1>
      <blockquote></blockquote>
      <cite></cite>
    </section>
  );
}

export default RandomQuoteGnerator;
