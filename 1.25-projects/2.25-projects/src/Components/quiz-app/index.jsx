import { useEffect, useState } from "react";
import "./quiz.css";

const NUMBER_OF_QUESTIONS = 10;
const QUESTION_TYPE = "multiple";

function Quiz() {
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [quizCorrectAnswers, setQuizCorrectAnswers] = useState([]);
  const [quizInCorrectAnswers, setQuizInCorrectAnswers] = useState([]);
  const [quizCategory, setQuizCategory] = useState("");
  const [quizQuestions, setQuizQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  function showQuestion(questions, index) {
    const { question, correct_answer, incorrect_answers, category } =
      questions[index];

    setQuizCategory(category);
    setQuizInCorrectAnswers(incorrect_answers);
    setQuizCorrectAnswers(correct_answer);
    setQuizQuestion(question);
    setQuestionNumber(index + 1);
    setQuestionOptions([...incorrect_answers, correct_answer]);
  }

  async function loadQuestions() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&type=${QUESTION_TYPE}`,
      );
      if (!response.ok) throw new Error("Network failure");
      const data = await response.json();

      const apiQuestions = data.results ?? [];
      console.log(apiQuestions);

      //   if (quizQuestions <= 0) {
      //     return <p>No Questions</p>;
      //   }

      setQuizQuestions(apiQuestions);

      //   if (apiQuestions) {
      //     apiQuestions.forEach((quizQuestion) => {
      //       const { question, correct_answer, incorrect_answers, category } =
      //         quizQuestion;
      //       setQuizCategory(category);
      //       setQuizInCorrectAnswers(incorrect_answers);
      //       setQuizCorrectAnswers(correct_answer);
      //       setQuizQuestion(question);
      //       setQuestionNumber((prev) => prev + 1);

      //       const options = [...incorrect_answers, correct_answer];

      //       setQuestionOptions(options);
      //     });
      //   }

      showQuestion(apiQuestions, 0); // show the first question
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

  function restartQuiz() {}

  function showResult() {
    // const notEmpty = questionOptions.some((option) => option != "");

    // if (questionOptions.correct_answer) {
    //   setScore((prev) => prev + 1);
    // }

    // if (index >= quizQuestions.length && notEmpty) {
    //   document.querySelector(".quiz-options-box").innerHTML = (
    //     <div className="result-container">
    //       <p>Quiz Completed</p>
    //       <p>Your Score: `{score}`</p>
    //       <button onClick={restartQuiz}>Restart Quiz</button>
    //     </div>
    //   );
    // }

    if (indexNumber === quizQuestions.length - 1) {
      setFinished(true);
    }
  }

  function goto(index) {
    // if (indexNumber === index) {
    //   indexNumber++;
    // }
    // const totalQuestions = () => {
    //   for (let i = 0; i < quizQuestions.length; i++) {
    //     ((index + 1) % (quizQuestions.length - 1)) + quizQuestions.length;
    //   }
    // };
    // if (index < 0 || index >= quizQuestions.length) return;
    if (index < 0) return;

    // if (index >= quizQuestions.length) {
    //   index = 0;
    // } else if (index < 0) {
    //   index = quizQuestions.length - 1;
    // }

    if (index >= quizQuestions.length) {
      setFinished(true);
      return;
    }

    document
      .querySelectorAll(".options")
      .forEach((option) => option.classList.remove("answer"));

    setIndexNumber(index);
    showQuestion(quizQuestions, index);
    // showResult();
  }

  function handleAnswer(event) {
    const clickedAnswer = event.currentTarget;
    console.log(clickedAnswer);
    document
      .querySelectorAll(".options")
      .forEach((option) => option.classList.remove("answer"));
    questionOptions.forEach((option) => {
      if (clickedAnswer.textContent === option) {
        clickedAnswer.classList.add("answer");
      }
      if (clickedAnswer.classList.contains("answer")) {
        // setQuizCorrectAnswers(quizCorrectAnswers.push(clickedAnswer));
        setQuizCorrectAnswers([...quizCorrectAnswers, clickedAnswer]);
      }

      if (option.correct_answer) {
        setScore((prev) => prev + 1);
      }

      const isIncorrect = questionOptions.filter(
        (prev) => prev == questionOptions.incorrect_answers,
      );
      setQuizInCorrectAnswers([...isIncorrect]);
      showResult();
    });
  }
  if (finished) {
    return (
      <div className="result-container">
        <p>Quiz Completed</p>
        <p>
          Your Score: {score} out of {quizQuestions.length}
        </p>
      </div>
    );
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
                  className="options"
                  key={index}
                  style={{
                    // background: "yellow",
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
              <button
                className="previous-button"
                onClick={() => goto(indexNumber - 1)}
                type="button"
                disabled={
                  indexNumber < 0 || indexNumber >= quizQuestions.length
                }
              >
                Previous
              </button>
              <button
                className="next-button"
                onClick={() => goto(indexNumber + 1)}
                type="button"
                disabled={
                  indexNumber < 0 || indexNumber >= quizQuestions.length
                }
              >
                Next
              </button>
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
