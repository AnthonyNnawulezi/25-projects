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
