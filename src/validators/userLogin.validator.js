const Joi = require('@hapi/joi');

const UserLoginValidator = Joi.object({
    mobile_phone: Joi.string().min(6).max(15).required(),
    password: Joi.string().max(120).required(),
})

module.exports = UserLoginValidator