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
    const [repeatPassword, setRepeatPassword] = useState('')

    async function register(event: React.FormEvent) {
        setError('');
        event.preventDefault()

        if (username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill in the fields.')
            return
        }

        if (password !== repeatPassword) {
            setError('Password does  not match')
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
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-100 border-0">

                                <div className="flex-auto px-4 lg:px-10 py-10 pt-6">
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

                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Repeat password
                                            </label>
                                            <input
                                                type="password"
                                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                placeholder="Repeat password"
                                                style={{transition: "all .15s ease"}}
                                                value={repeatPassword}
                                                onChange={event => setRepeatPassword(event.target.value)}
                                            />
                                        </div>

                                        {error && <ErrorMessage error={error}/>}

                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-white text-blue-500 active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
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