import { useContext } from "react";
import { IngredientsContext } from "../../contexts/Ingredients";

export default function Ingredients() {
  const { ingredients } = useContext(IngredientsContext);

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
            <button type="button" onClick={handleUpdate(ingredient.id)}>
              Mettre à jour
            </button>
            <button type="button" onClick={handleDelete(ingredient.id)}>
              Supprimer
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
