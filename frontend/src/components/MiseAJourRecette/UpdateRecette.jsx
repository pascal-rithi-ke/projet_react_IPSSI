import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../style/UpdateRecette.css';
import AjoutIngredient from './AjouterIngredient';

function UpdateRecette() {
    const [ingredients, setIngredient] = useState([]);
    const TitleRecipe = ingredients[0]?.recette_nom;

    useEffect(() => {
        axios.get('http://localhost:3002/api/recipe/3')
            .then(response => {
                const data = response.data;
                setIngredient(data);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
    }, []);

    const updateIngredient = (event, ingredientId) => {
        event.preventDefault();
        const updatedIngredients = [...ingredients];
        const ingredientIndex = updatedIngredients.findIndex((ingredient) => ingredient.ingredient_id === ingredientId);

        const ingredientDiv = document.getElementById(`ingredient-${ingredientId}`);

        const qt_ingredient = ingredientDiv.querySelector('.input-quantity').value;
        const unite_nom = ingredientDiv.querySelector('.select-unit').value;
        const unite_id = ingredientDiv.querySelector('.select-unit option:checked').id;

        updatedIngredients[ingredientIndex] = { ...updatedIngredients[ingredientIndex], qt_ingredient, unite_nom, unite_id };

        const updateListeIngredientRecipe = {
            ingredient_id: updatedIngredients[ingredientIndex].ingredient_id,
            qt_ingredient: updatedIngredients[ingredientIndex].qt_ingredient,
            unite_id: updatedIngredients[ingredientIndex].unite_id
        };
        axios.put(`http://localhost:3002/api/recipe/${updateListeIngredientRecipe.recette_id}`, updateListeIngredientRecipe)
            .then(response => {
                console.log(response);
                // Rafraîchir la liste des ingrédients en récupérant les dernières informations de la base de données
                axios.get(`http://localhost:3002/api/recipe/3`)
                .then(response => {
                    const data = response.data;
                    setIngredient(data);
                })
                .catch(error => {
                    console.error('Error fetching JSON:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
    };

    const handleDelete = (event, ingredientId) => {
        event.preventDefault();
        const ingredient_id = ingredientId;
        // 3 à remplacer par l'ID de la recette
        axios.delete(`http://localhost:3002/api/recipe/${3}/ingredient/${ingredient_id}`, ingredient_id)
            .then(response => {
                console.log(response);
                setIngredient(ingredients.filter(ingredient => ingredient.ingredient_id !== ingredientId));
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
    };

    return (
        <>
        <form>
            <h1>Recette: {TitleRecipe}</h1>
            {ingredients.map((ingredient, index) => (
                <div key={index} id={`ingredient-${ingredient.ingredient_id}`} className="ingredient-container">
                    <label className='label-name-ingredient'>{ingredient.ingredient_nom}</label>
                    <input type="text" defaultValue={ingredient.qt_ingredient} className="input-quantity" />
                    <select className="select-unit">
                        <option id={ingredient.unite_id} value={ingredient.unite_nom}>{ingredient.unite_nom}</option>
                        {ingredient.unites.map((unite) => (
                            <option id={unite.unite_id} key={unite.unite_id} value={unite.unite_nom}>
                                {unite.unite_nom}
                            </option>
                        ))}
                    </select>
                    <button className='btn-ingredient' onClick={(e) => updateIngredient(e, ingredient.ingredient_id)} key={`update-ingredient-${ingredient.ingredient_id}`}>Mettre à jour</button>
                    <button className='btn-ingredient' onClick={(event) => handleDelete(event, ingredient.ingredient_id)} key={`delete-ingredient-${ingredient.ingredient_id}`}>Supprimer</button>
                </div>
            ))}
        </form>
        <AjoutIngredient/>
        </>
    );
}
export default UpdateRecette;