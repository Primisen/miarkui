import React, {useState} from "react";
import {IUser} from "../models/user";
import ErrorMessage from "./ErrorMessage";
import {Link, useNavigate} from "react-router-dom";
import registration from "../shared/api/requests/registration";

function Registration() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function register(event: React.FormEvent) {
        setError('');
        event.preventDefault()

        if (username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill in the fields.')
            return
        }

        const user: IUser = {
            username,
            email,
            password
        }

        const data = await registration(user)

        if (typeof data === 'string') {
            setError(data)
        } else {

            navigate('/login');
        }

    }

    return (
        <main>


            <section className="absolute w-full h-full">
                <div
                ></div>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            <div
                                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-purple-400 border-0">
                                <div className="rounded-t mb-0 px-6 py-6">
                                    <div className="text-center mb-3">
                                        <h6 className="text-gray-600 text-sm font-bold">
                                            Sign up with
                                        </h6>
                                    </div>
                                    <div className="btn-wrapper text-center">
                                        <button
                                            className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                            type="button"
                                            style={{transition: "all .15s ease"}}
                                        >
                                            <img
                                                alt="..."
                                                className="w-5 mr-1"
                                                src={require("../assets/img/reddit.svg").default}
                                            />
                                            Reddit
                                        </button>
                                        <button
                                            className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                            type="button"
                                            style={{transition: "all .15s ease"}}
                                        >
                                            <img
                                                alt="..."
                                                className="w-5 mr-1"
                                                src={require("../assets/img/google.svg").default}
                                            />
                                            Google
                                        </button>
                                    </div>
                                    <hr className="mt-6 border-b-1 border-gray-400"/>
                                </div>

                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <div className="text-gray-500 text-center mb-3 font-bold">
                                        <small>Or sign up with credentials</small>
                                    </div>
                                    <form onSubmit={register}>
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Username"
                                                style={{transition: "all .15s ease"}}
                                                value={username}
                                                onChange={event => setUsername(event.target.value)}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Email"
                                                style={{transition: "all .15s ease"}}
                                                value={email}
                                                onChange={event => setEmail(event.target.value)}
                                            />
                                        </div>

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Password"
                                                style={{transition: "all .15s ease"}}
                                                value={password}
                                                onChange={event => setPassword(event.target.value)}
                                            />
                                        </div>

                                        {error && <ErrorMessage error={error}/>}

                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-white text-purple-500 active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                type="submit"
                                                style={{transition: "all .15s ease"}}
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-6">
                                <div className="w-1/2 text-right">
                                    <Link
                                        to="/login"
                                        className="text-gray-300"
                                    >
                                        <small>Already have an account?</small>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );

}

export default Registration;