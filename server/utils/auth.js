const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const expiration = "1d";

const signToken = ({ id, username }) => {
    return jwt.sign({ data: { id, username } }, secret, {
        expiresIn: expiration,
    });
};

const authorizeUser = ({ req }) => {
    const { headers } = req;
    const token = headers.authorization.split(" ")[1];

    if (!token) return { req };

    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch (err) {
        console.log(err);
    }
    return { req };
};

module.exports = {
    signToken,
    authorizeUser,
};
