import "./style.css";

function ProgressBar() {
  const [progressPercentage, setProgressPercentage] = useState(0);

  function handlePercentageChange(event) {
    const value = Number(event.target.value);
  }
}

export default ProgressBar;
