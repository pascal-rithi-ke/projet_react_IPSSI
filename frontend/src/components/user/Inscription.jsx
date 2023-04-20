import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';

import '../../style/user.css'

import axios from 'axios';

function Inscription(){
    // formualire d'inscription
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    // Confirmation de l'inscription
    const [isRegistered, setIsRegistered] = useState(false); // Ajout de la variable de state
    // Erreur dans le formlaire
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Vérification des champs
        if(pseudo.length < 3){
            setError('Le pseudo doit faire au moins 3 caractères');
        }else if(password.length < 6){
            setError('Le mot de passe doit faire au moins 6 caractères');
        }else if(password !== passwordConfirm){
            setError('Les mots de passe ne sont pas identiques');
        }
        else {
        // Vérification de l'email
        try {
            const response = await axios.get(`http://localhost:3002/api/check/email?email=${email}`);
            if(response.data.exists){
                setError('Cet email existe déjà');
            } else {
                setError('');
                // Envoi des données au serveur
                await axios.post('http://localhost:3002/api/insert/user', {
                    pseudo: pseudo,
                    email: email,
                    password: password,
                });
                // Réinitialisation des champs
                setPseudo('');
                setEmail('');
                setPassword('');
                setPasswordConfirm('');
                setIsRegistered(true);
            }
        } catch(error) {
                console.log(error);
                setError('Une erreur est survenue lors de l\'inscription');
            }
        }
    }

    return (
        <div>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Pseudo</p>
                <input type="text" onChange={e => setPseudo(e.target.value)}/>
            </label>
            <label>
                <p>Email</p>
                <input type="email" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <p>Mot de passe</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                <p>Confirmation du mot de passe</p>
                <input type="password" onChange={e => setPasswordConfirm(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Valider inscription</button>
                <p className='error'>{error}</p>
            </div>
            <Link to="/login">Retour</Link>
        </form>
        {/* Redirection vers la page de login */}
        {isRegistered && <Navigate to="/login?success=true"/>}
        </div>
    )
}
export default Inscription;