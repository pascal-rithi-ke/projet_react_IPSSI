import { useEffect } from "react";

function Logout({ handleLogout }) {
    // Déconnexion de l'utilisateur
    useEffect(() => {
        handleLogout();
    }, [handleLogout]);
    return (
        <div>
            <h1>Vous avez été déconnecté.</h1>
        </div>
        );
    }
export default Logout;
