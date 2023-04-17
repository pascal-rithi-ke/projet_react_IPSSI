import { Link, Route, Routes } from "react-router-dom";
import { useState} from "react";

import "./style/App.css";

import Login from "./componant/user/Login";
import Logout from "./componant/user/Logout";
import Inscription from "./componant/user/Inscription";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogout = () => {
    // Effectuer les actions nécessaires pour déconnecter l'utilisateur
    setIsLogged(false);
  };

  return (
    <div className="App">
      <Link to="/">Accueil</Link>
      <Link to="/recette">Recette</Link>
      
      {isLogged ? (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}

      <Routes>
        <Route path="/" element={<h1>Accueil</h1>} />
        <Route path="recette" element={<h1>Recette</h1>} />

        <Route path="login" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="logout" element={<Logout />} />

        <Route path="inscription" element={<Inscription />} />
      </Routes>
    </div>
  );
}
export default App;