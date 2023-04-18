import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Fonction permettant de récupérer les unités de l'API
async function getUnits() {
  try {
    const response = await axios.get("http://localhost:3002/api/unit");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Création du contexte
const UnitsContext = createContext({
  units: [],
});

// Création du provider
const UnitsProvider = ({ children }) => {
  const [units, setUnits] = useState([]);

  // Fonction qui utilise la fonction getIngredients pour récupérer les ingrédients et les stocker dans le state
  const getUnitsFromAPI = async () => {
    const units = await getUnits();
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
