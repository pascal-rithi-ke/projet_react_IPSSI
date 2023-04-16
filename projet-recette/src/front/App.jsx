import {Link, Route, Routes} from 'react-router-dom'
import './style/App.css'

import Login from './componant/user/Login'
import Inscription from './componant/user/Inscription'

function App() {
  return (
    <div className="App">
      <Link to="accueil">Accueil</Link>
      <Link to="/recette">Recette</Link>
      <Link to="/login">Login</Link>

      <Routes>
        <Route path="accueil" element={<h1>Accueil</h1>}/>
        <Route path="recette" element={<h1>Recette</h1>}/>

        <Route path="login" element={<Login/>}/>
        <Route path='inscription' element={<Inscription/>}/>
      </Routes>
    </div>
  )
}

export default App
