const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
  preferenceName: { type: String, required: true } 
});

module.exports = mongoose.model('Preference', PreferenceSchema);
