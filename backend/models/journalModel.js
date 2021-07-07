const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    body: { type: String }
  },
   { timestamps: true });

const Journal = mongoose.model('journal', journalSchema);
module.exports = Journal;