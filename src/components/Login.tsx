import React, {useState} from "react";
import {IUser} from "../models/user";
import ErrorMessage from "./ErrorMessage";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../shared/api/requests/login";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

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
        <Container>
            <Box
                mt={4}
                justifyContent="center"
                alignItems="center"
                maxWidth='25ch'
            >
                <Typography>
                    Login
                </Typography>
                <form onSubmit={onLoginSubmit}>
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

                    {error && <ErrorMessage error={error}/>}

                    <Button
                        sx={{mt: 2}}
                        variant="contained"
                        type="submit"
                    >
                        Sign In
                    </Button>
                </form>
                <Link
                    to="/registration"
                    className="text-gray-300"
                >
                    <small>Create new account</small>
                </Link>
            </Box>
        </Container>
    );
}

export default Login;