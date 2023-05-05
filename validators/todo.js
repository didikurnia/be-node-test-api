const yup = require("yup");

const yupVaidate = {
    createTodo: yup.object().shape({
        title: yup.string().required('title cannot be null'),
    }),

    updateTodo: yup.object().shape({
        title: yup.string().required('title cannot be null'),
        priority: yup.string().required('title cannot be null'),
        is_active: yup.string().required('title cannot be null'),
    })
};

module.exports = yupVaidate;

