import "./App.css";
import BMICalculator from "./Components/BMI Calculator";
import RippleEffect from "./Components/Button Ripple Effect";
import CountDownTimer from "./Components/Countdown Timer";
import CurrencyConverter from "./Components/Currency Converter";
import ProgressBar from "./Components/Custom Progress Bar";
import DigitalClock from "./Components/Digital Clock";
import FilterProducts from "./Components/Filter Products";
import MusicPlayer from "./Components/Music Player ";
import ProductsList from "./Components/Pagination";
import ProgressStep from "./Components/Progress Step";
import RandomQuoteGenerator from "./Components/Random Quote Generator";
import TipCalculator from "./Components/Tip Calculator";
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
      <CurrencyConverter />
      <FilterProducts />
      <TipCalculator />
      <MusicPlayer />
      <ProgressBar />
      <BMICalculator />
      <RippleEffect />
    </div>
  );
}

export default App;
