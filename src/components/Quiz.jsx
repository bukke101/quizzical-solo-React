import Question from "./Question";

const QuizContainer = ({
  quizData,
  showAnswers,
  selectAnswer,
  results,
  calculateScore,
  resetQuiz,
}) => {
  const questionElements = quizData.questions.map((option, index) => (
    <Question
      key={index}
      question={option}
      showAnswers={quizData.showAnswers}
      selectAnswer={(option_id) => selectAnswer(index, option_id)}
    />
  ));
  return (
    <section className="quiz-container">
      {quizData.start && questionElements}
      {!showAnswers ? (
        <button className="submit-btn" onClick={results}>
          Check answers
        </button>
      ) : (
        <div className="results-container">
          <span className="result-text">
            You scored {calculateScore()}/{quizData.questions.length} correct
            answers
          </span>
          <button onClick={resetQuiz}>Play Again</button>
        </div>
      )}
    </section>
  );
};
export default QuizContainer;
