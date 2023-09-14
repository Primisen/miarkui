import React from "react";
import {Typography} from "@mui/material";

function LanguageChooser () {
    return (
        <>
            <div
                className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75"
            >
                <Typography variant='subtitle2'>
                    EN/BY/GE
                </Typography>
            </div>
        </>
    )
}

export default LanguageChooser