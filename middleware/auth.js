const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send("Token required");
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "mysecretkey", (err, decoded) => {

        if (err) {
            return res.status(401).send("Invalid token");
        }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;