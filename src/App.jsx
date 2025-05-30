import "./App.css";
import CurrencyConverter from "./assets/currency converter";
import CountDownTimerTest from "./components/countdown-timer/test";
import DigitalClock from "./components/digital-clock";
import FilterProducts from "./components/filter-category";
import MusicPlayer from "./components/music-player";
import PaginationTest from "./components/pagination/test";
import ProgressBar from "./components/progress-bar/test";
import ProgresBar from "./components/progress_bar";
import RandonQuoteGenerator from "./components/quote-generator";
import TipCalcultator from "./components/tip-calculator";
import TooltipTest from "./components/tooltip/test";

function App() {
  return (
    <div className="App">
      <h1 className="title">25 React js Projects</h1>
      <PaginationTest />
      <DigitalClock />
      <CountDownTimerTest />
      <ProgressBar />
      <RandonQuoteGenerator />
      <TooltipTest />
      <CurrencyConverter />
      <FilterProducts />
      <TipCalcultator />
      <MusicPlayer />
      <ProgresBar />
    </div>
  );
}

export default App;
