/**
 * Todo Controller
 */

const router = require('express').Router();
const { db } = require('~/db');
const { errorHandler } = require('~/services/core');
const { createTodo, updateTodo } = require('~/validators/todo');

/* GET ALL */
router.get('/', async (req, res, next) => {
    try {
        const query = db.select('*').from('todos');

        if (req.query.activity_group_id) {
            query.where('activity_group_id', req.query.activity_group_id)
        }

        query.then(data => {
            res.json({
                status: 'Success',
                message: "Success",
                data
            })
        })
    } catch(err) {
        errorHandler.UnHandler(res, err);
    }
});

/* GET ONE */
router.get('/:id', async (req, res, next) => {
    try {
        db
            .select('*')
            .from('todos')
            .where('todo_id', req.params.id)
            .first() // for returning single value
            .then(data => {
                res.status(data ? 200 : 404).json({
                    status: data ? 'Success' : 'Not Found',
                    message: data ? "Success" : `Todo with ID ${ req.params.id } Not Found`,
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
        const validateData = async (data) => { try { await createTodo.validate(data); } catch (error) { return error.message; }};
        const result = await validateData(req.body);
        if (result) { return errorHandler.UnHandler(res, { name: 'yup', message: result })}

        db('todos')
            .insert(req.body)
            .then(async (id) => {
                const newData = await db
                    .select('*')
                    .from('todos')
                    .where('todo_id', id[0])
                    .first(); // for returning single value
                newData.is_active = !!newData.is_active // convert from 1 0 to true false
                res.status(201).json({
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
        delete req.body.status; // i don know for what
        const validateData = async (data) => { try { await updateTodo.validate(data); } catch (error) { return error.message; }};
        const result = await validateData(req.body);
        if (result) { return errorHandler.UnHandler(res, { name: 'yup', message: result })}

        db('todos')
            .update(req.body)
            .where('todo_id', req.params.id)
            .then(async () => {
                const newData = await db
                    .select('*')
                    .from('todos')
                    .where('todo_id', req.params.id)
                    .first(); // for returning single value
                res.status(newData ? 200 : 404).json({
                    status: newData ? 'Success' : 'Not Found',
                    message: newData ? "Success" : `Todo with ID ${ req.params.id } Not Found`,
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
        db('todos')
            .where({ todo_id: req.params.id })
            .del()
            .then((data) => {
                res.status(data ? 200 : 404).json({
                    status: data !== 0 ? 'Success' : 'Not Found',
                    message: data !== 0 ? "Success" : `Todo with ID ${ req.params.id } Not Found`,
                    data: data !== 0 ? {} : undefined
                });
            });
    } catch(err) {
        errorHandler.UnHandler(res, err);
    }
});

module.exports = router;
