import { Link, Route, Routes } from "react-router-dom";
import "./style/App.css";

import Login from "./componant/user/Login";
import Inscription from "./componant/user/Inscription";
import NewRecipe from "./componant/Recette/Recette";
import Ingredients from "./componant/ingredients/Ingredients";

function App() {
  return (
    <div className="App">
      <Link to="/">Accueil</Link>
      <Link to="/recette">Recette</Link>
      <Link to="/ingredients">Ingrédients</Link>
      <Link to="/login">Login</Link>
      <Link to="/nouvelle-recette">Nouvelle Recette</Link>

      <Routes>
        <Route path="/" element={<h1>Accueil</h1>} />
        <Route path="recette" element={<h1>Recette</h1>} />
        <Route path="ingredients" element={<Ingredients />} />

        <Route path="login" element={<Login />} />
        <Route path="inscription" element={<Inscription />} />
        <Route path="nouvelle-recette" element={<NewRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
