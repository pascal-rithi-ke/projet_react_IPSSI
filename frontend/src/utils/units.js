import axios from "axios";

// Fonction permettant d'ajouter une unité avec une requête POST à l'API
export async function addUnit(Unit) {
  try {
    const response = await axios.post("http://localhost:3002/api/Unit", Unit);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Fonction permettant de récupérer toutes les unités avec une requête GET à l'API
export async function getAllUnits() {
  try {
    const response = await axios.get("http://localhost:3002/api/unit");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Fonction permettant de récupérer une unité avec une requête GET à l'API
export async function getUnitById(id) {
  try {
    const response = await axios.get(`http://localhost:3002/api/unit/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Fonction permettant de récupérer toutes les unités d'un certain type avec une requête GET à l'API
export async function getUnitsByType(type) {
  try {
    const response = await axios.get(
      `http://localhost:3002/api/unit/type/${type}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
