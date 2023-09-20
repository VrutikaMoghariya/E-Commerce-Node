const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum:[ "Male", "Female"],
    },
    profile: {
        type: String,
        required: true
    }
})

const USER = mongoose.model('user', userSchema);

module.exports = USER;

// aggregate, $lookup