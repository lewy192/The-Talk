import jwt_decode from "jwt-decode";

const decodeStoredToken = (token) => {
    try {
        const decodedToken = jwt_decode(token);
        return decodedToken;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const isTokenValid = async (token) => {
    if (!token) return false;
    const { exp } = await decodeStoredToken(token);
    return exp > Date.now() / 1000 ? true : false;
};

const getUserFromToken = async (token) => {
    if (!isTokenValid(token)) return null;
    const { data } = await decodeStoredToken(token);
    return data;
};

const getExpFromToken = async (token) => {
    if (!isTokenValid(token)) return null;
    const { exp } = await decodeStoredToken(token);
    return exp;
};

const storeToken = (token) => {
    localStorage.setItem("storedToken", token);
};

const getToken = (tokenKey) => {
    return localStorage.getItem(tokenKey);
};

export {
    storeToken,
    getToken,
    decodeStoredToken,
    isTokenValid,
    getUserFromToken,
    getExpFromToken,
};
