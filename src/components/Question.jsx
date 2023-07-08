import he from "he";

export default function Question({ question, selectAnswer, showAnswers }) {
  return (
    <div>
      <p>{he.decode(question.question)}</p>
      <div className="answers-container">
        {question.options.map((answer, index) => (
          <button
            className={`options-btn 
          ${
            showAnswers && question.correct_answer === answer
              ? "correct"
              : showAnswers && question.selected_answer === index
              ? "incorrect"
              : !showAnswers && question.selected_answer === index
              ? "selected"
              : ""
          }
          `}
            key={index}
            onClick={() => selectAnswer(index)}
            // style={{
            //   backgroundColor:
            //     showAnswers && question.correct_answer === answer
            //       ? "#94D7A2"
            //       : showAnswers && question.selected_answer === index
            //       ? "#F8BCBC"
            //       : !showAnswers && question.selected_answer === index
            //       ? "#D6DBF5"
            //       : "",
            // }}
            disabled={showAnswers}
          >
            {he.decode(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}
