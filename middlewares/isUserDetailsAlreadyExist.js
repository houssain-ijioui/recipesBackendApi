const User = require('../models/User');


const isUserDetailsAlreadyExist = async (req, res, next) => {
    const { email, username } = req.body;
    try {
        const checkUsername = await User.findOne({ username: username });
        const checkEmail = await User.findOne({ email: email });

        if (checkUsername) {
            return res.status(401).send({
                message: "Failed! Username is already in use."
            })
        }

        if (checkEmail) {
            return res.status(401).send({
                message: "Failed! Email is already in use."
            });
        }

        next();
    } catch (error) {
        res.status(500).send({
            message: "Oops something went wrong"
        })
    }
};


module.exports = isUserDetailsAlreadyExist;