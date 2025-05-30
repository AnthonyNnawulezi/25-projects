import CountDownTimer from ".";
import "./style.css";

function CountDownTimerTest() {
  function handleTimeFinish() {
    console.log("fetch api");
  }

  return (
    <div className="container">
      <h1>Count down timer</h1>
      <CountDownTimer initial={120} onTimeFinish={handleTimeFinish} />
    </div>
  );
}

export default CountDownTimerTest;
