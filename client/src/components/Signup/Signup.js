import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { SIGNUP_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";
import "./Signup.scss";

const ValidationFailed = ({ errorMessage }) => {
    return <h3 className="validate-failed">{errorMessage}</h3>;
};

function Signup() {
    const [signup, { error }] = useMutation(SIGNUP_USER);
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });

    const userContext = useContext(AuthContext);
    const formStateChange = (event) => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value });
    };

    const signupSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signup({
                variables: { ...formState },
            });
            const { user, token } = data.signup;
            const { exp: sessionExpires } = jwt_decode(token);
            const dataToAuth = {
                user,
                token,
                sessionExpires,
            };
            await userContext.setUserAuth(dataToAuth);
        } catch (err) {
            console.log(err);
        }

        setFormState({
            username: "",
            password: "",
        });
    };
    return (
        <div className="signup-from-wrapper flex-col">
            <h3 className="login-header form-header ">Sign Up</h3>
            {error ? <ValidationFailed errorMessage={error.message} /> : null}
            <form className="signup-from flex-col" onSubmit={signupSubmit}>
                <input
                    onChange={formStateChange}
                    value={formState.username}
                    title="Enter Username"
                    placeholder="Username:"
                    type="text"
                    className="username-signup"
                    name="username"
                    required
                />
                <input
                    onChange={formStateChange}
                    value={formState.password}
                    type="password"
                    className="password-signup"
                    name="password"
                    title="Enter Password"
                    placeholder="Password:"
                    required
                />
                <input
                    type="submit"
                    className="signup-submit form-buttons"
                    value="Sign Up"
                />
            </form>
        </div>
    );
}

export default Signup;
