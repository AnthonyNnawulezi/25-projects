import { useState } from "react";
import "./style.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Whale Shark", "Blue Whale", "Giraffe"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1931"],
    correctAnswer: "1912",
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Ringgit", "Baht"],
    correctAnswer: "Yen",
  },
  {
    question: "Which programming language is also a gem?",
    options: ["Ruby", "Python", "Java", "C++"],
    correctAnswer: "Ruby",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra",
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);

  function handleNextQuestion() {
    if (
      selectedOptions[currentQuestion] ===
      questions[currentQuestion]?.correctAnswer
    ) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  }

  function handlePrevQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleRestartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOptions(new Array(questions.length).fill(null));
    setShowResult(false);
  }

  function handleSelectedOption(option) {
    // const updatedSelectedOptions = [...selectedOptions];
    // updatedSelectedOptions[currentQuestion] = option;
    // setSelectedOptions(updatedSelectedOptions);

    const isCorrect = option === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedOptions((prev) => {
      const newSelected = [...prev];
      newSelected[currentQuestion] = option;
      return newSelected;
    });
    setCurrentQuestion(currentQuestion + 1);
  }

  return (
    <div className="quiz">
      <h1>Quiz App</h1>
      {!showResult ? (
        <div className="question-wrapper">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion]?.question}</p>
          <div className="options">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectedOption(option)}
                className={`option ${
                  selectedOptions[currentQuestion] === option ? "selected" : ""
                }`}
              >
                {option}
              </button>
            ))}
            <div className="button-container">
              <button
                className="prev-button"
                disabled={currentQuestion === 0}
                onClick={handlePrevQuestion}
              >
                Previous
              </button>
              <button className="next-button" onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="result-section">
          <h3>Quiz Completed</h3>
          <p>
            Your Score: {score} out of {questions.length}
          </p>
          <button className="restart-button" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
