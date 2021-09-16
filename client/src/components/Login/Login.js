import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { AuthContext } from "../../context/authContext";

// importing auth tools
import "./Login.scss";

import jwt_decode from "jwt-decode";

const IncorrectCredentials = () => {
    return (
        <h1 className="incorrect-credentials">Incorrect Username/Password</h1>
    );
};

const Login = () => {
    const [formState, setFormState] = useState({ username: "", password: "" });
    const [login, { error }] = useMutation(LOGIN_USER);
    const [errors, setErrors] = useState({
        incorrectCredentials: false,
    });

    const userContext = useContext(AuthContext);

    const formStateChange = (event) => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value });
    };
    const loginSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });
            const { user, token } = data.login;
            const { exp: sessionExpires } = jwt_decode(token);
            const dataToAuth = {
                user,
                token,
                sessionExpires,
            };
            await userContext.setUserAuth(dataToAuth);
        } catch (err) {
            switch (err.message) {
                case "Incorrect Username/Password":
                    setErrors({ incorrectCredentials: true });
                    break;

                default:
                    setErrors({ ...errors, err: err.message });
                    break;
            }
        }
        setFormState({ username: "", password: "" });
    };

    return (
        <div className="login-form-wrapper flex-col">
            <h3 className="login-header form-header">Log In</h3>
            {error ? <IncorrectCredentials /> : null}

            <form onSubmit={loginSubmit} className="login-form flex-col">
                <input
                    type="text"
                    title="Enter Username"
                    placeholder="Username:"
                    name="username"
                    className="login-username"
                    value={formState.username}
                    onChange={formStateChange}
                    required
                />
                <input
                    type="password"
                    title="Enter Password"
                    placeholder="Password:"
                    className="login-password"
                    name="password"
                    value={formState.password}
                    onChange={formStateChange}
                    required
                />
                <input
                    type="Submit"
                    value="Log In"
                    className="login-submit form-buttons"
                    readOnly
                />
            </form>
        </div>
    );
};

export default Login;
