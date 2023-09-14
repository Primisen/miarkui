import {useNavigate} from "react-router-dom";
import React from "react";
import {Typography} from "@mui/material";

function Logout() {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    }

    return (
        <button
            className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75"
            onClick={logout}
        >
            <Typography variant='subtitle2'>
                Sign out
            </Typography>
        </button>
    )
}

export default Logout;