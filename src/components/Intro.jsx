import { useState, useEffect } from "react";
import { fetchCategories } from "../api";
import Select from "./Select";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";

export default function Intro({ onStart }) {
  const [quizAttributes, setQuizAttributes] = useState({
    category: "",
    categoryOptions: [],
    difficulty: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const { category, categoryOptions, difficulty } = quizAttributes;

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((categories) => {
        setQuizAttributes((prevState) => ({
          ...prevState,
          categoryOptions: categories,
        }));
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch category options ${error}`);
        setLoading(false);
      });
  }, []);

  return (
    <div className="intro-container">
      <h3>Quizzical</h3>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <Select
          setQuizAttributes={setQuizAttributes}
          difficultyOptions={difficultyOptions}
          category={category}
          difficulty={difficulty}
          categoryOptions={categoryOptions}
          onStart={onStart}
        />
      )}
    </div>
  );
}
