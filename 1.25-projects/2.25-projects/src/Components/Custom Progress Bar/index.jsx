import "./style.css";

function ProgressBar() {
  const [progressPercentage, setProgressPercentage] = useState(0);

  function handlePercentageChange(event) {
    const value = Number(event.target.value);

    const clampedValue = Math.min(Math.max(value, 0), 100);
  }
}

export default ProgressBar;
