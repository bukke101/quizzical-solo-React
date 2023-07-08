export async function fetchQuestions(setIsLoading, setError, setQuizData) {
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
