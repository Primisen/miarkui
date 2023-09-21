import React, {useState} from "react";
import {IUser} from "../models/user";
import ErrorMessage from "./ErrorMessage";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../shared/api/requests/login";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function onLoginSubmit(event: React.FormEvent) {
        setError('');
        event.preventDefault();

        if (email.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill in the fields.')
            return
        }

        const user: IUser = {
            email,
            password
        }

        const data = await login(user);

        if (data === 'Email or password is incorrect.') {
            setError(data)
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            navigate('/');
            window.location.reload();
        }
    }

    return (
        <section className="absolute w-full h-full">
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-100 border-0">
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-6">
                                <form onSubmit={onLoginSubmit}>
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
                                            className="bg-blue-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                            type="submit"
                                            style={{transition: "all .15s ease"}}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-1/2 text-right">
                                <Link
                                    to="/registration"
                                    className="text-gray-300"
                                >
                                    <small>Create new account</small>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default Login;