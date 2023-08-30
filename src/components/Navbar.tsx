import React from "react";
import {Link} from "react-router-dom";
import Logout from "./Logout";

function Navbar() {

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-purple-500 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <a
                        className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                        href="/"
                    >
                        Miarkui
                    </a>
                </div>
                <div
                    className={
                        "lg:flex flex-grow items-center"
                    }
                    id="example-navbar-danger"
                >

                    {(localStorage.getItem('token') != null)
                        ?
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

                            <li className="nav-item">
                                <Logout/>
                            </li>
                        </ul>
                        :
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">


                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to='/login'
                                >
                                    <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span
                                    className="ml-2">Sign In</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/registration"
                                >
                                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span
                                    className="ml-2">Sign Up</span>
                                </Link>
                            </li>
                        </ul>

                    }

                    {/*<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">*/}

                    {/*    */}
                    {/*    <li className="nav-item">*/}
                    {/*        <Link*/}
                    {/*            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"*/}
                    {/*            to='/login'*/}
                    {/*        >*/}
                    {/*            <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span*/}
                    {/*            className="ml-2">Sign In</span>*/}
                    {/*        </Link>*/}
                    {/*    </li>*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <Link*/}
                    {/*            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"*/}
                    {/*            to="/registration"*/}
                    {/*        >*/}
                    {/*            <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span*/}
                    {/*            className="ml-2">Sign Up</span>*/}
                    {/*        </Link>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
            </div>
        </nav>
    );

}

export default Navbar;