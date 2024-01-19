const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


verifyToken = (req, res, next) => {
    const token = req.session.userToken;

    try {
        // if no token was provided
        if (!token) {
        return res.status(401).send({
            message: "Unauthorized"
        })
        }

        // check if token is valid
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

        req.userId = decoded.userId;
        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError && error.message === "invalid signature") {
            return res.status(401).send({
                message: "Invalid Token"
            })
        } else {
            return res.status(500).send({
                message: 'Oops something went wrong.'
            })
        }
    }
}

module.exports = verifyToken;