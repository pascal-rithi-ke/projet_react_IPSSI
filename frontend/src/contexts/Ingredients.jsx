import { createContext, useEffect, useState } from "react";
import { getAllIngredients } from "../utils/ingredients";

// Création du contexte
const IngredientsContext = createContext({
  ingredients: [],
});

// Création du provider
const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  // Fonction qui utilise la fonction getIngredients pour récupérer les ingrédients et les stocker dans le state
  const getIngredientsFromAPI = async () => {
    const ingredients = await getAllIngredients();
    setIngredients(ingredients);
  };

  // Hook qui permet d'exécuter la fonction getIngredientsFromAPI au chargement du composant
  useEffect(() => {
    getIngredientsFromAPI();
  }, []);

  // On retourne le contexte avec les ingrédients en value
  return (
    <IngredientsContext.Provider value={{ ingredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};

// Export du contexte et du provider pour pouvoir les utiliser dans d'autres composants
export { IngredientsProvider, IngredientsContext };
