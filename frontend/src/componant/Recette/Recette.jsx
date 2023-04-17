import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function NewRecipe() {
    function handleSubmit(event) {
    event.preventDefault();
    console.log('Titre :', event.target.titre.value);
    console.log('Description :', event.target.description.value);
    console.log('Ingrédients :', event.target.ingredients.value);
    }
    return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="titre">Titre :</label>
    <input type="text" id="Titre" title="Titre" />
    <br />
    <label htmlFor="Description:">Description :</label>
    <input type="text" id="Description" description="Description" />
    <br />
    <label for="liste-ingredients">Liste ingrédients:</label>
    <select id="liste-ingredients">
        <option value ="">Choix des ingrédients</option>
        
       
        
        

    
    </select>
    <button type="submit">Enregistrer</button>
    </form>
    
    


    );
}










