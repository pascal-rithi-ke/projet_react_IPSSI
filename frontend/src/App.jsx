import { Link, Route, Routes, createPath } from "react-router-dom";
import { useState, useEffect } from "react";

import "./style/App.css";

import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Inscription from "./components/user/Inscription";
// import Recettes from "./components/Recettes/Recettes";
import UpdateRecette from "./components/MiseAJourRecette/UpdateRecette";
import NewRecipe from "./components/NouvelleRecette/NouvelleRecette";
import Ingredients from "./components/ingredients/Ingredients";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [pseudo, setPseudo] = useState("");

  useEffect(() => {
    const storedPseudo = localStorage.getItem("pseudo");
    if (storedPseudo) {
      setPseudo(storedPseudo);
    } else {
      setPseudo("");
    }
  }, [isLogged]);

  const handleLogout = () => {
    // Effectuer les actions nécessaires pour déconnecter l'utilisateur
    localStorage.removeItem("pseudo");
    setIsLogged(false);
  };

  return (
    <div className="App">
      <div className="navBar">
        <Link to="/">Recette</Link>
        <Link to="/nouvelle-recette">Nouvelle Recette</Link>
        <Link to="/update-recette">Mise à jour Recette</Link>
        <Link to="/ingredients">Ingrédients</Link>
        {isLogged ? (
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      <Routes>
        <Route path="" element={<h1>Recettes</h1>} />
        <Route path="update-recette" element={<UpdateRecette />} />
        <Route path="ingredients" element={<Ingredients />} />

        <Route path="login" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="logout" element={<Logout setIsLogged={handleLogout} />} />

        <Route path="inscription" element={<Inscription />} />
        <Route path="nouvelle-recette" element={<NewRecipe />} />
      </Routes>
      {isLogged ? <p>Bonjour {pseudo}</p> : <p>Bienvenue sur notre site</p>}
    </div>
  );
}
export default App;
