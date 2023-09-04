import React from 'react';
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import CreateReview from "./pages/CreateReview";
import Logout from "./components/Logout";

function App() {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/logout' element={<Logout/>}></Route>
                <Route path='/registration' element={<Registration/>}></Route>
                <Route path='/reviews' element={<CreateReview/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
