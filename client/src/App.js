import React, { useContext, Suspense, lazy } from "react";
import "./App.css";
import { AuthContext } from "./context/authContext";

const UnauthApp = lazy(() => import("./UnauthApp"));
const AuthApp = lazy(() => import("./AuthApp"));

function App() {
    const { userState } = useContext(AuthContext);
    const { user } = userState;
    console.log("whole app");
    return (
        <div className="app">
            <Suspense fallback={<div>...loading</div>}>
                {user ? <AuthApp /> : <UnauthApp />}
            </Suspense>
        </div>
    );
}

export default App;
