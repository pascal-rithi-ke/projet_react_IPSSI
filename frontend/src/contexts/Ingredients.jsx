import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Fonction permettant de récupérer les ingrédients de l'API
async function getIngredients() {
  try {
    const response = await axios.get("http://localhost:3002/api/ingredient");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Création du contexte
const IngredientsContext = createContext({
  ingredients: [],
});

// Création du provider
const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  // Fonction qui utilise la fonction getIngredients pour récupérer les ingrédients et les stocker dans le state
  const getIngredientsFromAPI = async () => {
    const ingredients = await getIngredients();
    setIngredients(ingredients);
  };

  // Hook qui permet d'exécuter la fonction getIngredientsFromAPI au chargement du composant et à chaque fois que ingredients change
  useEffect(() => {
    getIngredientsFromAPI();
  }, [ingredients]);

  // On retourne le contexte avec les ingrédients en value
  return (
    <IngredientsContext.Provider value={{ ingredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};

// Export du contexte et du provider pour pouvoir les utiliser dans d'autres composants
export { IngredientsProvider, IngredientsContext };
