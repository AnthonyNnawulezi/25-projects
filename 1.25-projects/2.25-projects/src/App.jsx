import "./App.css";
import CountDownTimer from "./Components/Countdown Timer";
import DigitalClock from "./Components/Digital Clock";
import ProductsList from "./Components/Pagination";
import ProgressStep from "./Components/Progress Step";
import RandomQuoteGenerator from "./Components/Random Quote Generator";
import Tooltip from "./Components/Tooltip";

function App() {
  return (
    <div className="App">
      <h1 className="title">25 Projects</h1>
      <ProductsList />
      <DigitalClock />
      <CountDownTimer />
      <ProgressStep />
      <RandomQuoteGenerator />
      <Tooltip />
    </div>
  );
}

export default App;
