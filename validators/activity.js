const yup = require('yup');

const yupVaidate = {
    createActivity: yup.object().shape({
        email: yup.string().required('email required').email(),
        title: yup.string().required('title cannot be null'),
    }),

    updateActivity: yup.object().shape({
        title: yup.string().required('title cannot be null'),
    })
};

module.exports = yupVaidate;
