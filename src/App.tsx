import React from 'react';
import {createContext} from 'react';
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import CreateReview from "./components/review/CreateReview";
import Logout from "./components/Logout";
import Account from "./components/Account";
import Review from "./components/review/Review";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import ShowingFoundObjects from "./components/search/ShovingFindedObjects";

export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

function App() {

    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <Navbar/>
                    <CssBaseline/>
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/login' element={<Login/>}></Route>
                        <Route path='/logout' element={<Logout/>}></Route>
                        <Route path='/registration' element={<Registration/>}></Route>
                        <Route path='/account' element={<Account/>}></Route>
                        <Route path='/reviews' element={<CreateReview/>}></Route>
                        <Route path='/reviews/:id' element={<Review/>}></Route>
                        <Route path='/found' element={<ShowingFoundObjects />}></Route>
                    </Routes>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
}

export default App;
