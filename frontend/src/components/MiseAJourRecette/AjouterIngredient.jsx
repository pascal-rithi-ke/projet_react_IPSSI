import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AjoutIngredient() {
    // récupération de la liste des ingrédients dans une recette
    const [ingredients, setIngredient] = useState([]);

    // Récipérons la liste des unités
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

    // Récupérons la liste des ingrédients
    const [nomIngredient, setNomIngredient] = useState('');
    const [quantite, setQuantite] = useState('');
    const [unitId, setUnitId] = useState('');

    function handleNomIngredientChange(event) {
        setNomIngredient(event.target.value);
    }

    function handleUnitChange(event) {
        setUnitId(event.target.value);
    }

    function handleQuantiteChange(event) {
        setQuantite(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Nom de l\'ingrédient : ', nomIngredient);
        axios.get('http://localhost:3002/api/ingredient/search/' + nomIngredient)
            .then(response => {
                if (response.data.length === 0) {
                    console.log('Ingrédient non trouvé, ' + nomIngredient + ' va être ajouté');
                    axios.post('http://localhost:3002/api/ingredient', {
                        name: nomIngredient,
                        unitId: unitId,
                        qt_ingredient: quantite,
                        id_recette: 3
                    })
                    setIngredient(ingredients);
                } else {
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching ingredient:', error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div id="ingredientName">
                <p>Nom de l'ingrédient</p>
                <input type="text" placeholder="Entrer le nom de l'ingrédient" value={nomIngredient} onChange={handleNomIngredientChange} />
            </div>

            <div id="quantity">
                <p>Quantité</p>
                <input type="text" placeholder="Entrer la quantité" defaultValue={quantite} onChange={handleQuantiteChange} />
            </div>

            <div id="unit">
                <p>Unité</p>
                <select onChange={handleUnitChange}>
                    {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>{unit.nom} - {unit.label}</option>
                    ))}
                </select>
            </div>
            <button type="submit">
                Valider
            </button>
        </form>
    );
}
export default AjoutIngredient;