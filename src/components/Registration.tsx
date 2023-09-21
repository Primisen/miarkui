import React, {useState} from "react";
import {IUser} from "../models/user";
import ErrorMessage from "./ErrorMessage";
import {Link, useNavigate} from "react-router-dom";
import registration from "../shared/api/requests/registration";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

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
        <Container>
            <Box
                mt={4}
                justifyContent="center"
                alignItems="center"
                maxWidth='25ch'
            >
                <Typography>
                    Registration
                </Typography>
                <form onSubmit={register}>
                    <TextField
                        sx={{mt: 2}}
                        label="Username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <TextField
                        sx={{mt: 2}}
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <TextField
                        sx={{mt: 2}}
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <TextField
                        sx={{mt: 2}}
                        label="Repeat password"
                        type="password"
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onChange={event => setRepeatPassword(event.target.value)}
                    />

                    {error && <ErrorMessage error={error}/>}

                    <Button
                        sx={{mt: 2, mb:2}}
                        variant="contained"
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
                <Link
                    to="/login"
                    className="text-gray-300"
                >
                    <small>Already have an account?</small>
                </Link>
            </Box>
        </Container>
    );

}

export default Registration;