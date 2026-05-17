import "./App.css";
import CountDownTimer from "./Components/Countdown Timer";
import DigitalClock from "./Components/Digital Clock";
import ProductsList from "./Components/Pagination";

function App() {
  return (
    <div className="App">
      <h1 className="title">25 Projects</h1>
      <ProductsList />
      <DigitalClock />
      <CountDownTimer />
    </div>
  );
}

export default App;
