import "./App.css";
import DigitalClock from "./Components/Digital Clock";
import ProductsList from "./Components/Pagination";

function App() {
  return (
    <div className="App">
      <h1 className="title">25 Projects</h1>
      <ProductsList />
      <DigitalClock />
    </div>
  );
}

export default App;
