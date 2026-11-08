import { useEffect, useState } from "react";
import "./quiz.css";

const NUMBER_OF_QUESTIONS = 10;
const QUESTION_TYPE = "multiple";

function Quiz() {
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState("");
  const [quizInCorrectAnswers, setQuizInCorrectAnswers] = useState("");
  const [quizCategory, setQuizCategory] = useState("");
  const [quizQuestions, setQuizQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionOptions, setQuestionOptions] = useState([]);
  let indexNumber = 0;

  async function loadQuestions() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&type=${QUESTION_TYPE}`,
      );
      if (!response.ok) throw new Error("Network failure");
      const data = await response.json();

      const apiQuestions = data.results ?? {};
      console.log(apiQuestions);

      if (quizQuestions <= 0) {
        return <p>No Questions</p>;
      }

      setQuizQuestions(apiQuestions);

      if (apiQuestions) {
        apiQuestions.forEach((quizQuestion) => {
          const { question, correct_answer, incorrect_answers, category } =
            quizQuestion;
          setQuizCategory(category);
          setQuizInCorrectAnswers(incorrect_answers);
          setQuizCorrectAnswer(correct_answer);
          setQuizQuestion(question);
          setQuestionNumber((prev) => prev + 1);

          const options = [...incorrect_answers, correct_answer];

          setQuestionOptions(options);
        });
      }
    } catch (error) {
      <p>{error}</p>;
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function goto(index, total) {
    ((index + 1) % (total - 1)) + total;
  }

  function handleAnswer(event) {
    const clickedAnswer = event.target;
    console.log(clickedAnswer);

    questionOptions.forEach((option, i) => {
      if (clickedAnswer.textContent === option) {
        clickedAnswer.classList.add("answer");
        goto(i + 1, option.length);
      }
    });
  }
  return (
    <main className="quiz-container">
      <h1>Quiz App</h1>
      {isLoading && <p>Loading... Please wait</p>}
      {quizQuestions ? (
        <div className="quiz-options-box">
          <h2 key={questionNumber}>Question {questionNumber}</h2>
          <div className="question">{quizQuestion}</div>
          {questionOptions
            ? questionOptions.map((option, index) => (
                <div
                  className="options answer"
                  key={index}
                  style={{
                    background: "yellow",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid brown",
                  }}
                  onClick={handleAnswer}
                >
                  {option}
                </div>
              ))
            : ""}
          {quizInCorrectAnswers ? (
            <div className="options" key={quizInCorrectAnswers}></div>
          ) : (
            ""
          )}
          {quizQuestions && (
            <div className="buttons">
              <button onClick={goto(indexNumber - 1)}>Previous</button>
              <button onClick={goto(indexNumber + 1)}>Next</button>
            </div>
          )}
        </div>
      ) : (
        <p>Nothing to display</p>
      )}
    </main>
  );
}

export default Quiz;
