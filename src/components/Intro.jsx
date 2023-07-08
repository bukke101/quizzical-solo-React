export default function Intro(props) {
  return (
    <div className="intro-container">
      <h3>Quizzical</h3>
      <button onClick={props.onClick}>Start Quiz</button>
    </div>
  );
}
