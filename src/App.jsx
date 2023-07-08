import { useState, useEffect } from "react";
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
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    setIsLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5");
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      if (data.results.length === 0) {
        throw new Error("No questions available");
      }
      setQuizData((prevState) => ({
        ...prevState,
        questions: data.results.map((option) => {
          const answersArray = option.incorrect_answers.concat([
            option.correct_answer,
          ]);
          return {
            question: option.question,
            options: shuffleArray(answersArray),
            selected_answer: undefined,
            correct_answer: option.correct_answer,
          };
        }),
      }));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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
    fetchQuestions();
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
