const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    try {
        // if no token was provided
        if (!token) {
        return res.status(401).send({
            message: "Unauthorized: Missing token"
        })
        }

        // check if token is valid
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);


        req.userId = decoded.userId;
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Oops something went wrong"
        })
    }
}

module.exports = verifyToken;