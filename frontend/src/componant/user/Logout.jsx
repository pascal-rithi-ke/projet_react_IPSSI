import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ handleLogout }) {
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
