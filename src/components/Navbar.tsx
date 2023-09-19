import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import Logout from "./Logout";
import Search from "./search/Search";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ToggleTheme from "./ToggleTheme";
import LanguageChooser from "./LanguageChooser";

function Navbar() {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <LightbulbIcon/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                flexGrow: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            MIARKUI
                        </Typography>

                        <Search/>
                        <ToggleTheme/>
                        <LanguageChooser/>

                        {(localStorage.getItem('token') != null)
                            ?
                            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

                                <li className='nav-item'>
                                    <Link
                                        className="px-3 py-2 flex items-center uppercase font-bold leading-snug text-white hover:opacity-75"
                                        to='/account'
                                    >
                                        <Typography variant='subtitle2'>
                                            Account
                                        </Typography>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Logout/>
                                </li>
                            </ul>
                            :
                            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                <li className="nav-item">
                                    <Link
                                        className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75"
                                        to='/login'
                                    >
                                        <Typography variant='subtitle2'>
                                            Sign in
                                        </Typography>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="px-3 py-2 flex items-center uppercase leading-snug hover:opacity-75"
                                        to="/registration"
                                    >
                                        <Typography variant='subtitle2'>
                                            Sign up
                                        </Typography>
                                    </Link>
                                </li>
                            </ul>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>

    );

}

export default Navbar;