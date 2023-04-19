import { createContext, useEffect, useState } from "react";
import { getAllRecettes } from "../utils/recettes";

// Création du contexte
const RecettesContext = createContext({
  recettes: [],
});

// Création du provider
const RecettesProvider = ({ children }) => {
  const [recettes, setRecettes] = useState([]);

  // Fonction qui utilise la fonction getIngredients pour récupérer les ingrédients et les stocker dans le state
  const getRecettesFromAPI = async () => {
    const recettes = await getAllRecettes();
    setRecettes(recettes);

  };

  // Hook qui permet d'exécuter la fonction getIngredientsFromAPI au chargement du composant
  useEffect(() => {
    getRecettesFromAPI();
  }, []);

  // On retourne le contexte avec les ingrédients en value
  return (
    <RecettesContext.Provider value={{ recettes }}>
      {children}
    </RecettesContext.Provider>
  );
};

// Export du contexte et du provider pour pouvoir les utiliser dans d'autres composants
export { RecettesProvider, RecettesContext };
