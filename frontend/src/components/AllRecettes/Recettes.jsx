import { useState, useEffect } from "react";
import axios from "axios";

async function getRecipes() {
  try {
    const response = await axios.get("http://localhost:3002/api/recipe"); 
    return response.data;
  } catch (err) {
  console.error(err);
  }
}

export default function Recettes() {
  const [recipes, setRecipes] = useState([]);

  async function getRecipesFromAPI() {
    const recipes = await getRecipes();
    setRecipes(recipes);
  }

  useEffect(() => {
    getRecipes();
  }, [])

  return (
    <div>
      <h1>Recettes</h1>
      <div>
        {/* jsp peut-être avec un truc ici du genre euh */}
        {recipes.map(recette => (
          <article id={recette.id}>
            {/* peut-être plutôt un Link de react router ?? */}
            <a href={`/Recette/${recette.id}`}>
              <h3>{recette.nom}</h3>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}