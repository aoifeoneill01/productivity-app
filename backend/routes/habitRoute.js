const express = require('express');
const router = express.Router();
const Habit = require('../models/habitModel');


// Add new habit
router.route('/habit').post((req, res) => {
    const newHabit = new Habit(req.body);

    newHabit.save()
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

// Get all habits
router.route('/habit').get((req, res) => {
    Habit.find()
    .then(result => {
        res.json(result);
    })
    .catch(err => console.log(err))
});

// Get single habit
router.route('/habit/:id').get((req, res) => {
    Habit.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// Edit single habit
router.route('/habit/:id').put((req, res) => {
    Habit.findByIdAndUpdate(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// Delete single habit
router.route('/habit/:id').delete((req, res) => {
    Habit.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err));
});


module.exports = router;