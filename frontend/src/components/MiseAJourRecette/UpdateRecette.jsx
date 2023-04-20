import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateRecette() {
    // Récupérons la liste des ingrédients
    const [ingredients, setIngredient] = useState([]);
    const TitleRecipe = ingredients[0]?.recette_nom;

    // Route pour récupérer la liste des ingrédients d'une recette
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

    // Fonction pour mettre à jour la quantité d'un ingrédient
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
        // Route pour mettre à jour les ingreiédients d'une recette
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

    // Fonction pour supprimer un ingrédient
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

    // Récupérons la liste des ingrédients
    const [nomIngredient, setNomIngredient] = useState('');
    const [quantite, setQuantite] = useState('');
    const [unitId, setUnitId] = useState('');

    // Fonction pour mettre à jour le nom de l'ingrédient
    function handleNomIngredientChange(event) {
        setNomIngredient(event.target.value);
    }

    // Fonction pour mettre à jour l'unité de l'ingrédient
    function handleUnitChange(event) {
        setUnitId(event.target.value);
    }

    // Fonction pour mettre à jour la quantité de l'ingrédient
    function handleQuantiteChange(event) {
        setQuantite(event.target.value);
    }

    // Récupérons la liste des unités
    const [units, setUnit] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002/api/unit')
            .then(response => {
                setUnit(response.data);
            })
            .catch(error => {
                console.error('Error fetching units:', error);
            });
    }, []);

    // Fonction pour ajouter un ingrédient à la recette
    function handleSubmit(event) {
        event.preventDefault();
        console.log('Nom de l\'ingrédient : ', nomIngredient);
        axios.get('http://localhost:3002/api/ingredient/search/' + nomIngredient)
            .then(response => {
                // si l'ingrédient n'existe pas, on l'ajoute à la base de données dans la talbe ingredient
                if (response.data.length === 0) {
                    console.log('Ingrédient non trouvé, ' + nomIngredient + ' va être ajouté');
                    axios.post('http://localhost:3002/api/ingredient', {
                        name: nomIngredient,
                        unitId: unitId,
                        qt_ingredient: quantite,
                        id_recette: 3
                    })
                        // Puis on l'ajoute à la recette
                        .then(() => {
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
                            console.error('Error adding ingredient:', error);
                        });
                } else {
                    // si l'ingrédient existe déjà, on l'ajoute à la recette
                    console.log('Ingrédient trouvé, ' + nomIngredient);
                    axios.post('http://localhost:3002/api/ingredient/addToRecipe', {
                        ingredient_id: response.data[0].id,
                        name: nomIngredient,
                        unitId: unitId,
                        qt_ingredient: quantite,
                        id_recette: 3
                    })
                    // Puis on récupère la liste des ingrédients de la recette pour la mettre à jour
                        .then(() => {
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
                            console.error('Error adding ingredient to recipe:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching ingredient:', error);
            });
        // On réinitialise les champs du formulaire
        setUnitId('');
        setNomIngredient('');
        setQuantite('');
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
            <form onSubmit={handleSubmit}>
                <div id="ingredientName">
                    <p>Nom de l'ingrédient</p>
                    <input required type="text" placeholder="Entrer le nom de l'ingrédient" value={nomIngredient} onChange={handleNomIngredientChange} />
                </div>

                <div id="quantity">
                    <p>Quantité</p>
                    <input required type="text" placeholder="Entrer la quantité" value={quantite} onChange={handleQuantiteChange} />
                </div>
                <div id="unit">
                    <p>Unité</p>
                    <select onChange={handleUnitChange} defaultValue="1">
                        <option value="1" disabled>Choisir une unité</option>
                        {units.map((unit) => (
                            <option key={unit.id} value={unit.id}>{unit.nom} - {unit.label}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">
                    Valider
                </button>
            </form>
        </>
    );
}
export default UpdateRecette;