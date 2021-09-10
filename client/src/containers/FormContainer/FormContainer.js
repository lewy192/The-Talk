import React, { Suspense, lazy, useState } from "react";

import "./FormContainer.scss";

const Login = lazy(() => import("./../../components/Login/Login"));
const Signup = lazy(() => import("./../../components/Signup/Signup"));

export const FromContainer = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <section className="form-container flex-col">
            <h1 className="app-header">The Talk</h1>
            <Suspense fallback={<div>...loading</div>}>
                {isLogin ? <Login /> : <Signup />}
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                    }}
                    className="signup-refer form-buttons"
                >
                    {isLogin ? "Sign Up" : "Log In"}
                </button>
            </Suspense>
        </section>
    );
};

export default FromContainer;
