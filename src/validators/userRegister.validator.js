const Joi = require('@hapi/joi');

const userRegisterValidator = Joi.object({
    first_name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required(),
    date_birth: Joi.string().required(),
    password: Joi.string().max(120).required(),
    address: Joi.string().max(100).required(),
    mobile_phone: Joi.string().min(6).max(15).required(),
    email: Joi.string().min(6).max(254).required().email(),
})

module.exports = userRegisterValidator