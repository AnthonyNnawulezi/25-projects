import "./App.css";
import CurrencyConverter from "./assets/currency converter";
import BMICalculator from "./components/BMICalculator";
import ButtonRippleEffect from "./components/buttonrippleeffect";
import CountDownTimerTest from "./components/countdown-timer/test";
import DigitalClock from "./components/digital-clock";
import DragAndDrop from "./components/drag-and-drop";
import FilterProducts from "./components/filter-category";
import FileUpload from "./components/form-validation";
import FormValidation from "./components/form-validation";
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
      <BMICalculator />
      <ButtonRippleEffect />
      <DragAndDrop />
      <FormValidation />
      <FileUpload />
    </div>
  );
}

export default App;
