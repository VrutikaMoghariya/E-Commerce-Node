const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
   title : {
    type: String,
    required: true
   }
}, {
    timestamps: true
});

const CATEGORY = mongoose.model('category',categorySchema);

module.exports = CATEGORY;