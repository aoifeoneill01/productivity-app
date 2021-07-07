const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    habitname: { type: String },
    check: { type: Boolean }
});

const Habit = mongoose.model('habit', habitSchema);
module.exports = Habit;