import { Link, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Login({ setIsLogged }) {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const [Registered_succes, setIsRegistered] = useState(false);

  const [login_succes, setIsLogin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérification des champs
    if (pseudo.length < 3) {
      setError("Le pseudo doit faire au moins 3 caractères");
    } else if (password.length < 6) {
      setError("Le mot de passe doit faire au moins 6 caractères");
    } else {
      // Vérification du compte utilisateur
      try {
        const response = await axios.post("http://localhost:3002/api/login", {
          pseudo: pseudo,
          password: password,
        });
        if (response.data.success) {
          // Rediriger l'utilisateur vers la page d'accueil
          setIsLogin(true);
          setIsLogged(true); 
          // Mettre à jour le pseudo de l'utilisateur connecté
          localStorage.setItem("pseudo", response.data.pseudo);
          console.log(response.data);
        } else {
          setError("Erreur: "+ response.data.message);
        }
      } catch (error) {
        console.log(error);
        setError("Une erreur est survenue lors de la connexion");
      }
    }
  };

  useEffect(() => {
    if (location.search.includes("success=true")) {
      setIsRegistered(true);
    }
  }, [location.search]);

  return (
    <div>
      <h1>Login</h1>
      {Registered_succes && (
        <p>
          Votre compte a été créé avec succès, vous pouvez vous connecter
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Pseudo</p>
          <input type="text" onChange={(e) => setPseudo(e.target.value)} />
        </label>
        <label>
          <p>Mot de passe</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Connexion</button>
          <p className="error">{error}</p>
        </div>
        <Link to="/inscription">Inscription</Link>
      </form>
      {/* Redirection vers la page d'accueil */}
      {login_succes && <Navigate to="/" />}
    </div>
  );
}
export default Login;