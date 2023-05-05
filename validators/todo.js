const Joi = require('joi');

const joiVaidate = {
    createTodo: Joi.object({
        title: Joi.string().trim().required(),
        activity_group_id: Joi.number().required(),
        is_active: Joi.boolean().required(),
    }).options({ allowUnknown: false }),

    updateTodo: Joi.object({
        title: Joi.string().trim().required(),
        priority: Joi.string().trim().required(),
        is_active: Joi.boolean().required(),
    }).options({ allowUnknown: false })
};

module.exports = joiVaidate;
