import { useContext, useState } from "react";
import { IngredientsContext } from "../../contexts/Ingredients";
import axios from "axios";

async function addIngredient(ingredient) {
  try {
    const response = await axios.post(
      "http://localhost:3002/api/ingredient",
      ingredient
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default function Ingredients() {
  const { ingredients } = useContext(IngredientsContext);

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    unit: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addIngredient(newIngredient);

    setNewIngredient({ name: "", unit: "" });
  };

  const handleUpdate = (id) => {
    console.log("test update", id);
  };

  const handleDelete = (id) => {
    console.log("test delete", id);
  };

  return (
    <div>
      <h1>Ingrédients</h1>
      <div>
        {ingredients.map((ingredient) => (
          <article key={ingredient.id}>
            <input
              type="text"
              name={ingredient.nom}
              value={ingredient.nom}
              onChange={() => console.log("Hello world!")}
            />
            <input
              type="text"
              name={ingredient.unite_quantite}
              value={ingredient.unite_quantite}
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nom de l'ingrédient"
              min={3}
              required={true}
              value={newIngredient.name}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, name: e.target.value })
              }
            />
            <input
              type="text"
              name="unit"
              placeholder="Unité"
              required={true}
              value={newIngredient.unit}
              onChange={(e) =>
                setNewIngredient({
                  ...newIngredient,
                  unit: e.target.value,
                })
              }
            />
            <button type="submit">Créer</button>
          </form>
        </article>
      </div>
    </div>
  );
}