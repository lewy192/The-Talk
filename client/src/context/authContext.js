import React, { createContext, useState } from "react";

import { getToken, storeToken, decodeStoredToken } from "./../utils/auth";

const AuthContext = createContext({});

const AuthProvider = (props) => {
    const token = getToken("storedToken");
    const { data: user, exp: sessionExpires } = decodeStoredToken(token) || {};
    const isSessionValid = sessionExpires > Date.now() / 1000 ? true : false;
    const [userState, setUserState] = useState({
        token: token && isSessionValid ? token : null,
        sessionExpires: isSessionValid ? sessionExpires : null,
        user: user && isSessionValid ? user : null,
    });

    const setUserAuth = ({ token, sessionExpires, user }) => {
        storeToken(token);
        setUserState({
            token,
            sessionExpires,
            user,
        });
    };

    return (
        <AuthContext.Provider value={{ userState, setUserAuth }} {...props} />
    );
};

export { AuthContext, AuthProvider };
