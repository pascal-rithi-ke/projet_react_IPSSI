import { Link, Route, Routes, createPath } from "react-router-dom";
import { useState, useEffect} from "react";

import "./style/App.css";

import Login from "./componant/user/Login";
import Logout from "./componant/user/Logout";
import Inscription from "./componant/user/Inscription";
// import Recettes from "./componant/Recettes/Recettes";
import NewRecipe from "./componant/NouvelleRecette/NouvelleRecette";
import Ingredients from "./componant/ingredients/Ingredients";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [pseudo, setPseudo] = useState("")

  useEffect(() => {
    const storedPseudo = localStorage.getItem("pseudo");
    if (storedPseudo) {
      setPseudo(storedPseudo);
    }
  }, []);

  const handleLogout = () => {
    // Effectuer les actions nécessaires pour déconnecter l'utilisateur
    setIsLogged(false);
    localStorage.removeItem("pseudo");
  };

  return (
    <div className="App">
      <Link to="/">Accueil</Link>
      <Link to="/recette">Recette</Link>
      <Link to="/ingredients">Ingrédients</Link>
      {isLogged ? (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <Link to="/nouvelle-recette">Nouvelle Recette</Link>

      <Routes>
        <Route path="/" element={<h1>Accueil</h1>} />
        <Route path="recette" element={<h1>Recettes</h1>} />
        <Route path="ingredients" element={<Ingredients />} />

        <Route path="login" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="logout" element={<Logout />} />

        <Route path="inscription" element={<Inscription />} />
        <Route path="nouvelle-recette" element={<NewRecipe />} />
      </Routes>
      {isLogged ? (
        <p>Bonjour {pseudo}</p>
      ) : (
        <p>Bienvenue sur notre site</p>
      )}
    </div>
  );
}
export default App;