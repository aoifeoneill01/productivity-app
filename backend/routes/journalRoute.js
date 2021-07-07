const express = require('express');
const router = express.Router();
const Journal = require('../models/journalModel');

// Add new journal entry
router.route('/journal').post((req, res) => {
    const newJournal = new Journal(req.body);

    newJournal.save()
.then(res => console.log(res))
.catch(err => console.log(err))
});

// Get all entries
router.route('/journal').get((req, res) => {
    Journal.find()
    .then(result => {
        res.json(result)
    })
    .catch(err => console.log(err))
});

// Get one entry
router.route('/journal/:id').get((req, res) => {
    Journal.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

// Edit entry
router.route('/journal/:id').put((req, res) => {
    Journal.findByIdAndUpdate(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err));    
});

// Delete entry
router.route('/journal/:id').delete((req, res) => {
    Journal.findByIdAndDelete(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err));    
});


module.exports = router;