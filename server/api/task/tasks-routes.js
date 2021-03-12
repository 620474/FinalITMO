const express = require('express');
const router = express.Router();
const controller = require('./task-controller');
const auth = require('../../services/authService');


router.route('/')
    .get(auth.requireLogin, controller.index)
    .post(auth.requireLogin, controller.create)
    .put(auth.requireLogin, controller.update)


router.route('/:id')
    .get(auth.requireLogin, controller.show)
    .delete(auth.requireLogin, controller.remove);


module.exports = router;
