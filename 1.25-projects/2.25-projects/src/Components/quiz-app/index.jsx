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
  async function loadQuestions() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&type=${QUESTION_TYPE}`,
      );
      if (!response.ok) throw new Error("Network failure");
      const data = await response.json();

      const apiQuestions = data.results ?? {};
      //   console.log(apiQuestions);

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
  return (
    <main>
      <h1>Quiz App</h1>
      {isLoading && <p>Loading... Please wait</p>}
      {quizQuestions ? (
        <div className="quiz-container">
          <h2 key={questionNumber}>Question {questionNumber}</h2>
          <div className="question">{quizQuestion}</div>
          {questionOptions
            ? questionOptions.map((option) => (
                <div className="options" key={option}>
                  {option}
                </div>
              ))
            : ""}
          {quizInCorrectAnswers ? (
            <div className="options" key={quizInCorrectAnswers}></div>
          ) : (
            ""
          )}
          <div className="buttons">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </div>
      ) : (
        <p>Nothing to display</p>
      )}
    </main>
  );
}

export default Quiz;
