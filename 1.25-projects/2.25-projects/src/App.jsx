import "./App.css";
import Pagination from "./Components/Pagination/pagination";
import handlePageChange from "./Components/Pagination";

function App() {
  return (
    <div className="App">
      <h1 className="title">25 Projects</h1>
      <Pagination handlePageChange={handlePageChange} />
    </div>
  );
}

export default App;
