const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String
    }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;