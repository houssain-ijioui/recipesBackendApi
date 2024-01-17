const Joi = require('joi');


const userValidationSchema = Joi.object({
    username: Joi.string().required().alphanum(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5),
})


const validateUser = (data) => {
    return userValidationSchema.validate(data, { abortEarly: false });
}

module.exports = validateUser;