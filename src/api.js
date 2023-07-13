export async function fetchCategories() {
  const response = await fetch("https://opentdb.com/api_category.php");
  if (!response.ok) {
    throw new Error("Failed to fetch category options");
  }
  const data = await response.json();
  return data.trivia_categories;
}

export async function fetchQuestions(
  setLoading,
  setError,
  setQuizData,
  category,
  difficulty
) {
  setLoading(true);
  try {
    let url = "https://opentdb.com/api.php?amount=10";
    category ? (url += `&category=${category}`) : "";
    difficulty ? (url += `&difficulty=${difficulty}`) : "";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }
    const data = await response.json();
    if (data.results.length === 0) {
      throw new Error("No questions available");
    }
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    setQuizData((prevState) => ({
      ...prevState,
      questions: data.results.map((option) => ({
        question: option.question,
        options: shuffleArray(
          option.incorrect_answers.concat([option.correct_answer])
        ),
        selected_answer: undefined,
        correct_answer: option.correct_answer,
      })),
    }));
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
