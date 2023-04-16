import {Link, useLocation} from 'react-router-dom';
import React, {useState, useEffect} from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (location.search.includes('success=true')) {
      setSuccess(true);
    }
  }, [location.search]);

  return (
    <div>
      <h1>Login</h1>
      {success && <p>Votre compte a été créé avec succès, vous pouvez vous connecter</p>}
      <form>
          <label>
            <p>Email</p>
            <input type="email" onChange={e=>setEmail(e.target.value)}/>
          </label>
          <label>
            <p>Mot de passe</p>
            <input type="password" onChange={e=>setPassword(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Connexion</button>
          </div>
          <Link to="/inscription">Inscription</Link>
      </form>
    </div>
  )
}
export default Login;