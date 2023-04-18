import axios from "axios";

// Fonction permettant d'ajouter un ingrédient avec une requête POST à l'API
export async function addIngredient(ingredient) {
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

// Fonction permettant de récupérer tous les ingrédients avec une requête GET à l'API
export async function getAllIngredients() {
  try {
    const response = await axios.get("http://localhost:3002/api/ingredient");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Fonction permettant de récupérer un ingrédient avec une requête GET à l'API
export async function getIngredientById(id) {
  try {
    const response = await axios.get(
      `http://localhost:3002/api/ingredient/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Fonction permettant de mettre à jour un ingrédient avec une requête PUT à l'API
export async function updateIngredient(ingredient) {
  try {
    const response = await axios.put(
      `http://localhost:3002/api/ingredient/${ingredient.id}`,
      ingredient
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Fonction permettant de supprimer un ingrédient avec une requête DELETE à l'API
export async function deleteIngredient(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3002/api/ingredient/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
