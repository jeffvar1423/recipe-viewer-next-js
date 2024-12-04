import axios from "axios";

const RecipeDetails = ({ recipe }) => {
  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>Ingredients</h2>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.startsWith("strIngredient") && recipe[key])
          .map((key) => (
            <li key={key}>{recipe[key]}</li>
          ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

const handleFavorite = async () => {
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: recipe.idMeal,
        recipeName: recipe.strMeal,
        imageUrl: recipe.strMealThumb,
      }),
    });
  
    if (response.ok) {
      alert("Recipe added to favorites!");
    } else {
      alert("Failed to add recipe to favorites.");
    }
  };
  
  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <button onClick={handleFavorite}>Add to Favorites</button>
    </div>
  );
  
export async function getServerSideProps(context) {
  const { id } = context.params;
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return { props: { recipe: response.data.meals[0] } };
}

export default RecipeDetails;
