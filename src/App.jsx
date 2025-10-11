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
import FileUpload1 from "./components/form-validation/index1";
import MusicPlayer from "./components/music-player";
import NestedComments from "./components/nested-comments";
import PaginationTest from "./components/pagination/test";
import PdfViewer from "./components/PdfViewer";
import ProgressBar from "./components/progress-bar/test";
import ProgresBar from "./components/progress_bar";
import Quiz from "./components/quiz-app";
import RandonQuoteGenerator from "./components/quote-generator";
import TipCalcultator from "./components/tip-calculator";
import Todo from "./components/todo";
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
      {/* <FileUpload /> */}
      <FileUpload1 />
      <Quiz />
      <NestedComments />
      <PdfViewer />
      <Todo />
    </div>
  );
}

export default App;
