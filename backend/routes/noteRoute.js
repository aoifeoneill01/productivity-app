const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel');


// Add new note
router.route('/notes').post((req, res) => {
   const newNote = new Note(req.body);
   console.log(req.body);

   newNote.save()
.then(res => console.log(res))
.catch(err => console.log(err))
});


// Get all notes
router.route('/notes').get((req, res) => {
    Note.find()    
.then(result => {
    return res.json(result)
}).catch(err => console.log(err))
});


// Get single note
router.route('/notes/:id').get((req, res) => {   
    Note.findById(req.params.id)
.then(result => res.json(result))
.catch(err => console.log(err))
});

// Edit note
router.route('/notes/:id').put((req, res) => {   
    Note.findByIdAndUpdate(req.params.id, req.body)
.then(result => res.json(result))
.catch(err => console.log(err))
});


// Delete Note
router.route('/notes/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
.then(result => res.json(result))
.catch(err => console.log(err))
});


module.exports = router;