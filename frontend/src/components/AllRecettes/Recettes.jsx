import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/recipe')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h2>{recipe.nom}</h2>
          <p>{recipe.description}</p>
          <img src={"https://img.cuisineaz.com/660x660/2016/09/05/i94010-gateau-nature-tout-simple.webp"} alt={recipe.nom} />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
