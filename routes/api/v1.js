const express = require('express');
const router = express.Router();

const activityController = require('../../controllers/v1/activityController');
const todoController = require('../../controllers/v1/todoController');

router.use('/activity-groups', activityController);
router.use('/todo-items', todoController);

module.exports = router;
