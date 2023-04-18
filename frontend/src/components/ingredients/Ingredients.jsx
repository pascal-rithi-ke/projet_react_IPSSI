import { useContext, useState } from "react";
import { IngredientsContext } from "../../contexts/Ingredients";

import AddIngredientForm from "./AddIngredientForm";

// Import des fonctions qui permettent d'interagir avec l'API
import { updateIngredient, deleteIngredient } from "../../utils/ingredients";

export default function Ingredients() {
  const { ingredients, setIngredients } = useContext(IngredientsContext);

  // Fonction qui permet de mettre à jour un ingrédient
  const handleUpdate = async (id) => {
    // Appel à l'API pour mettre à jour un ingrédient
    const data = updateIngredient(id);

    // Mise à jour de l'ingrédient dans le state du contexte
    if (data.success) {
      setIngredients(
        ingredients.map((ingredient) =>
          ingredient.id === id
            ? { ...ingredient, nom: data.ingredient.name }
            : ingredient
        )
      );
    }
  };

  // Fonction qui permet de supprimer un ingrédient
  const handleDelete = async (id) => {
    // Appel à l'API pour supprimer un ingrédient
    const data = await deleteIngredient(id);

    // Suppression de l'ingrédient dans le state du contexte
    if (data.success) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    }
  };

  return (
    <div>
      <h1>Ingrédients</h1>
      <div>
        {ingredients.map((ingredient) => (
          <article key={ingredient.id}>
            {/* TODO: Modifier value et onChange */}
            <input
              type="text"
              name={ingredient.nom}
              value={ingredient.nom}
              onChange={() => console.log("Hello world!")}
            />
            <button type="button" onClick={() => handleUpdate(ingredient.id)}>
              Mettre à jour
            </button>
            <button type="button" onClick={() => handleDelete(ingredient.id)}>
              Supprimer
            </button>
          </article>
        ))}
        <br />
        <article>
          <AddIngredientForm />
        </article>
      </div>
    </div>
  );
}
