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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { questions, start, showAnswers } = quizData;

  function startQuiz(category, difficulty) {
    setQuizData((prevState) => ({
      ...prevState,
      start: true,
      category: category,
      difficulty: difficulty,
    }));
    fetchQuestions(setLoading, setError, setQuizData, category, difficulty);
  }

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
    const allComplete = questions.every(
      (question) => question.selected_answer !== undefined
    );
    setQuizData((prevState) => ({
      ...prevState,
      completed: allComplete,
    }));
  }, [questions]);

  function results() {
    setQuizData((prevState) => ({
      ...prevState,
      showAnswers: true,
    }));
  }

  function calculateScore() {
    return questions.reduce((correctAnswers, question) => {
      const selectedOption = question.options[question.selected_answer];
      if (selectedOption === question.correct_answer) {
        return correctAnswers + 1;
      }
      return correctAnswers;
    }, 0);
  }

  function resetQuiz() {
    setQuizData(initialState);
  }

  return (
    <div>
      {!start ? (
        <section>
          <Intro onStart={startQuiz} />
        </section>
      ) : loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <Quiz
          quizData={quizData}
          showAnswers={showAnswers}
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
