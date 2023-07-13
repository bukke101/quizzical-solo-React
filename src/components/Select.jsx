export default function Select({
  setQuizAttributes,
  difficultyOptions,
  category,
  difficulty,
  categoryOptions,
  onStart,
}) {
  return (
    <>
      <div>
        <label htmlFor="category">Select A Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) =>
            setQuizAttributes((prevState) => ({
              ...prevState,
              category: e.target.value,
            }))
          }
        >
          <option value={null}>Any Category</option>
          {categoryOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) =>
            setQuizAttributes((prevState) => ({
              ...prevState,
              difficulty: e.target.value,
            }))
          }
        >
          <option value={null}>Any Difficulty</option>
          {difficultyOptions.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <br />
      <button onClick={() => onStart(category, difficulty)}>Start Quiz</button>
    </>
  );
}
