import { useContext, useState } from "react";
import { UnitsContext } from "../../contexts/Units";
import { IngredientsContext } from "../../contexts/Ingredients";

import { addIngredient } from "../../utils/ingredients";

export default function AddIngredientForm() {
  const { units } = useContext(UnitsContext);
  const { ingredients, setIngredients } = useContext(IngredientsContext);

  // Création d'un state pour stocker les valeurs du formulaire
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    unit: units[0]?.id || 1,
  });

  // Fonction qui utilise la fonction addIngredient pour ajouter un ingrédient et le stocker dans le state
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Appel à l'API pour ajouter un ingrédient
    const data = await addIngredient(newIngredient);

    // Ajout de l'ingrédient dans le state du contexte
    if (data.success) {
      setIngredients([
        ...ingredients,
        {
          id: data.ingredient.id,
          nom: newIngredient.name,
        },
      ]);
    }

    // Réinitialisation du formulaire
    setNewIngredient({ name: "", unit: "" });
  };

  return (
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
      <select
        name="unit"
        id="unit"
        onChange={(e) =>
          setNewIngredient({
            ...newIngredient,
            unit: parseInt(e.target.value, 10),
          })
        }
      >
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.nom}
          </option>
        ))}
      </select>
      <button type="submit">Créer</button>
    </form>
  );
}
