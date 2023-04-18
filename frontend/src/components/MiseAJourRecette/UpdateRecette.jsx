import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../style/UpdateRecette.css'

function UpdateRecette() {
    const [ingredients, setIngredient] = useState([]);
    const TitleRecipe = ingredients[0]?.recette_nom;

    useEffect(() => {
        axios.get('http://localhost:3002/api/recipe/1')
            .then(response => {
                const data = response.data;
                setIngredient(data);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
    }, []);

    return (
        <>
            <h1>Recette: {TitleRecipe}</h1>
            {ingredients.map((ingredient, index) => (
                <div key={index} id={`ingredient-${ingredient.ingredient_id}`} className="ingredient-container">
                    <p>
                        {ingredient.ingredient_nom}
                        <input type="text" defaultValue={ingredient.qt_ingredient} className="input-quantity" />
                    </p>
                    <select className="select-unit">
                        <option value={ingredient.unite_nom}>{ingredient.unite_nom}</option>
                        {ingredient.unites.map((unite) => (
                            <option key={unite.unite_id} value={unite.unite_nom}>
                                {unite.unite_nom}
                            </option>
                        ))}
                    </select>
                    <button key={`delete-ingredient-${ingredient.ingredient_id}`}>Supprimer</button>
                </div>
            ))}
            <button>Ajouter un ingrédient</button>
        </>
    );
}
export default UpdateRecette;