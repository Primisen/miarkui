import {useNavigate} from "react-router-dom";
import React from "react";

function Logout() {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    }

    return (
        <button
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            onClick={logout}
        >
            <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span
            className="ml-2">Sign Out</span>
        </button>
    )
}

export default Logout;