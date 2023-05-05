/**
 * Activity Controller
 */

const router = require('express').Router();
const { db } = require('~/db');
const { errorHandler } = require('~/services/core');
const { createActivity, updateActivity } = require('~/validators/activity');


/* GET ALL */
router.get('/', async (req, res, next) => {
    try {
        db
            .select('*')
            .from('activities')
            .then(data => {
                res.json({
                    status: 'Success',
                    message: "Success",
                    data
                })
            });
    } catch(err) {
        errorHandler.UnHandler(res, err);
    }
});

/* GET ONE */
router.get('/:id', async (req, res, next) => {
    try {
        db
            .select('*')
            .from('activities')
            .where('activity_id', req.params.id)
            .first() // for returning single value
            .then(data => {
                console.log(data)
                res.json({
                    status: data ? 'Success' : 'Not Found',
                    message: data ? "Success" : `Activity with ID ${ req.params.id } Not Found`,
                    data: data ? data : undefined
                });
            })
    } catch(err) {
        errorHandler.UnHandler(res, err);
    }
});

/* Create */
router.post('/', async (req, res, next) => {
    try {
        const validate = createActivity.validate(req.body);
        if (validate.error) return errorHandler.UnHandler(res, validate.error); // validation title its been enhanced with Joi Validate

        db('activities')
            .insert(req.body)
            .then(async (id) => {
                const newData = await db
                    .select('*')
                    .from('activities')
                    .where('activity_id', id[0])
                    .first(); // for returning single value

                res.json({
                    status: 'Success',
                    message: "Success",
                    data: newData
                });
            })
    } catch(err) {
        errorHandler.UnHandler(res, err);
    }
});

/* PATCH */
router.patch('/:id', async (req, res, next) => {
    try {
        const validate = updateActivity.validate(req.body);
        if (validate.error) return errorHandler.UnHandler(res, validate.error); // validation title its been enhanced with Joi Validate

        db('activities')
            .update(req.body)
            .where('activity_id', req.params.id)
            .then(async () => {
                const newData = await db
                    .select('*')
                    .from('activities')
                    .where('activity_id', req.params.id)
                    .first(); // for returning single value
                res.json({
                    status: newData ? 'Success' : 'Not Found',
                    message: newData ? "Success" : `Activity with ID ${ req.params.id } Not Found`,
                    data: newData ? newData : undefined
                });
            })
    } catch(err) {
        errorHandler.UnHandler(res, err);
    }
});

/* DELETE */
router.delete('/:id', async (req, res, next) => {
    try {
        db('activities')
            .where({ activity_id: req.params.id })
            .del()
            .then((data) => {
                res.json({
                    status: data !== 0 ? 'Success' : 'Not Found',
                    message: data !== 0 ? "Success" : `Activity with ID ${ req.params.id } Not Found`,
                    data: {}
                });
        });
    } catch(err) {
        errorHandler.UnHandler(res, err);
    }
});

module.exports = router;
