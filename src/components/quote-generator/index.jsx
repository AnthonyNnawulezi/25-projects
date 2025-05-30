// import { useEffect } from "react";
// import { useState } from "react";
import "./style.css";
// // ""https://api.quotable.io/quotes/random"
// //https://api/quotes/random

// function RandonQuoteGenerator() {
//   const [loading, setLoading] = useState(false);
//   const [quote, setQuote] = useState(null);

//   async function fetchQuote() {
//     try {
//       setLoading(true);

//       const response = await fetch("https://api.quotable.io/quotes/random", {
//         method: "GET",
//       });
//       const result = await response.json();
//       console.log(result);
//       if (result && result.length > 0) {
//         setLoading(false);
//         setQuote(result[0]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   useEffect(() => {
//     fetchQuote();
//   }, []);

//   function handleRefresh() {
//     fetchQuote();
//   }
//   if (loading) {
//     return <h3>Loading Quote! please wait</h3>;
//   }

//   return (
//     <div className="random-quote-generator">
//       <h1>Randon Quote Generator</h1>
//       <div className="wrapper">
//         <p>{quote?.author}</p>
//         <p>{quote?.content}</p>
//         <button className="refresh" onClick={handleRefresh}>Refresh</button>
//       </div>
//     </div>
//   );
// }

// export default RandonQuoteGenerator;

//optimised
import { useEffect, useState } from "react";

function RandomQuoteGenerator() {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  async function fetchQuote() {
    setLoading(true);
    setError(null); // Reset errors on a new fetch
    try {
      const response = await fetch("https://api.quotable.io/quotes/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote. Try again.");
      }
      const result = await response.json();
      if (result.length > 0) {
        setQuote(result[0]);
      } else {
        setError("No quote found.");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      <h1>📜 Random Quote Generator</h1>

      {/* Loading State */}
      {loading && <h3>Loading Quote... Please wait</h3>}

      {/* Error State */}
      {error && <p className="error">{error}</p>}

      {/* Display Quote */}
      {quote && (
        <div className="quote-card">
          <p className="quote-text">❝ {quote.content} ❞</p>
          <p className="quote-author">— {quote.author}</p>
          <button className="refresh" onClick={fetchQuote}>
            🔄 New Quote
          </button>
        </div>
      )}
    </div>
  );
}

export default RandomQuoteGenerator;
