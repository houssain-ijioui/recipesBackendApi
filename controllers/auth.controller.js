const User = require('../models/User');
const { validateUserCreation, validateUserLogin } = require('../functions/userVlidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const signup = async (req, res) => {
    const userData = req.body;
    const { username, email, password } = req.body;


    try {
        // check if provided data is valid
        const validation = validateUserCreation(userData);
        

        if (validation.error) {
            return res.status(400).send({
                message: "Validaton Failed",
                errors: validation.error.details
            })
        }

        // // hash the password
        // const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        await user.save();

        return res.status(201).send({
            message: "User Registered"
        })

    } catch (error) {
        res.status(500).send({
            message: "Oops something went wrong!"
        })
    }
}



const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const validation = validateUserLogin(req.body);

        if (validation.error) {
            return res.status(400).send({
                message: "Validation Failed",
                errors: validation.error.details
            })
        }

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).send({
                message: "Username Not Found!"
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(401).send({
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET)

        res.status(200).json({
            token
        })
    } catch (error) {
        res.status(500).send({
            message: "Oops something went wrong!"
        })
        console.log(error);
    }
}


const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.send(users)
}




module.exports = {
    signup,
    login,
    getAllUsers
}