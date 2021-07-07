const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel');


// Add new todo
router.route('/todo').post(( req, res ) => {
    const newTodo = new Todo(req.body);

    newTodo.save()
    .then(result => console.log(result))
    .catch(err => console.log(err))
});

// Get all todo's
router.route('/todo').get((req, res) => {
    Todo.find()
    .then(result => {
        res.json(result)
    });
});

// Get single todo
router.route('/todo/:id').get((req, res) => {
    Todo.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

// Delete todo
router.route('/todo/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

module.exports = router;


