import { createContext, useEffect, useState } from "react";
import { getAllUnits } from "../utils/units";

// Création du contexte
const UnitsContext = createContext({
  units: [],
});

// Création du provider
const UnitsProvider = ({ children }) => {
  const [units, setUnits] = useState([]);

  // Fonction qui utilise la fonction getIngredients pour récupérer les ingrédients et les stocker dans le state
  const getUnitsFromAPI = async () => {
    const units = await getAllUnits();
    setUnits(units);
  };

  // Hook qui permet d'exécuter la fonction getIngredientsFromAPI au chargement du composant
  useEffect(() => {
    getUnitsFromAPI();
  }, []);

  // On retourne le contexte avec les ingrédients en value
  return (
    <UnitsContext.Provider value={{ units }}>{children}</UnitsContext.Provider>
  );
};

// Export du contexte et du provider pour pouvoir les utiliser dans d'autres composants
export { UnitsProvider, UnitsContext };
