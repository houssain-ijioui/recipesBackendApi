const User = require('../models/User');
const validateUser = require('../functions/userVlidation');
const bcrypt = require('bcryptjs');


const signup = async (req, res) => {
    const userData = req.body;
    const { username, email, password } = req.body;


    try {
        // check if provided data is valid
        const validation = validateUser(userData);
        

        if (validation.error) {
            return res.status(400).send({
                message: "Validaton Failed",
                errors: validation.error.details
            })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        await user.save();

    } catch (error) {
        res.status(500).send({
            message: "Oops something went wrong!"
        })
    }
}




module.exports = {
    signup
}