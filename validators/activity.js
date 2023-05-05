const Joi = require('joi');

const joiVaidate = {
    createActivity: Joi.object({
        email: Joi.string().email().required(),
        title: Joi.string()
            .trim()
            .required()
    }).options({ allowUnknown: false }),

    updateActivity: Joi.object({
        title: Joi.string()
            .trim()
            .required()
    }).options({ allowUnknown: false })
};

module.exports = joiVaidate;
