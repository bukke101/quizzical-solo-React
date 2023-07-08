import { useState, useEffect } from "react";
import { fetchQuestions } from "./api";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";
import LoadingComponent from "./components/LoadingComponent";
import ErrorComponent from "./components/ErrorComponent";
import "./style.css";

function App() {
  const initialState = {
    start: false,
    questions: [],
    showAnswers: false,
    completed: false,
  };

  const [quizData, setQuizData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function startQuiz() {
    setQuizData((prevState) => ({
      ...prevState,
      start: true,
    }));
  }

  useEffect(() => {
    fetchQuestions(setIsLoading, setError, setQuizData);
  }, []);

  function selectAnswer(questionIndex, answerIndex) {
    setQuizData((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, index) => {
        if (questionIndex === index) {
          return { ...question, selected_answer: answerIndex };
        } else {
          return question;
        }
      }),
    }));
  }

  useEffect(() => {
    const allComplete = quizData.questions.every(
      (question) => question.selected_answer !== undefined
    );
    setQuizData((prevState) => ({
      ...prevState,
      completed: allComplete,
    }));
  }, [quizData.questions]);

  function results() {
    setQuizData((prevState) => ({
      ...prevState,
      showAnswers: true,
    }));
  }

  function calculateScore() {
    let correctAnswers = 0;
    quizData.questions.forEach((question) => {
      const selectedOption = question.options[question.selected_answer];
      if (selectedOption === question.correct_answer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  }

  function resetQuiz() {
    setQuizData(initialState);
    fetchQuestions(setIsLoading, setError, setQuizData);
  }

  return (
    <div>
      {!quizData.start ? (
        <section>
          <Intro onClick={startQuiz} />{" "}
        </section>
      ) : isLoading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <Quiz
          quizData={quizData}
          showAnswers={quizData.showAnswers}
          selectAnswer={selectAnswer}
          results={results}
          calculateScore={calculateScore}
          resetQuiz={resetQuiz}
        />
      )}
    </div>
  );
}

export default App;
