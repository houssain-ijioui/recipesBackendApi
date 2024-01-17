const Joi = require('joi');


const userCreationValidationSchema = Joi.object({
    username: Joi.string().required().alphanum(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5),
})


const userLoginValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(5).required(),
})


const validateUserCreation = (data) => {
    return userCreationValidationSchema.validate(data, { abortEarly: false });
}

const validateUserLogin = (data) => {
    return userLoginValidationSchema.validate(data, { abortEarly: false });
}

module.exports = {
    validateUserCreation,
    validateUserLogin
};