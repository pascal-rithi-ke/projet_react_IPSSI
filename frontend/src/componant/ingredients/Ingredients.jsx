import { useContext } from "react";
import { IngredientsContext } from "../../contexts/Ingredients";

export default function Ingredients() {
  const { ingredients } = useContext(IngredientsContext);

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
            <button
              type="button"
              onClick={() => {
                console.log("test update");
              }}
            >
              Mettre à jour
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("test delete");
              }}
            >
              Supprimer
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
