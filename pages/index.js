import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // Link to navigate to recipe details

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => setRecipes(response.data.meals))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="container">
      <h1>Recipe Viewer</h1>
      <div className="grid">
        {recipes?.map((recipe) => (
          <div key={recipe.idMeal} className="card">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
            <Link href={`/recipe/${recipe.idMeal}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
