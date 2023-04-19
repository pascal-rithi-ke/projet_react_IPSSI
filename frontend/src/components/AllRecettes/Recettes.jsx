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
          <h2>{recipe.nom_recette} - {recipe.type_recette}</h2>
          <p>{recipe.description}</p>
          <p>Publié par {recipe.pseudo} - {recipe.mise_en_ligne}</p>
          <img src={recipe.url_img} alt={recipe.nom} />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
