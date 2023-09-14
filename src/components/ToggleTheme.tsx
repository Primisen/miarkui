import React from "react";
import {useContext} from 'react';
import {Box, IconButton, useTheme} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {ColorModeContext} from '../App'

function ToggleTheme() {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <>
            <Box>
                {/*{theme.palette.mode} mode*/}
                <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>
            </Box>
        </>
    );
}

export default ToggleTheme