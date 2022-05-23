const mongoose = require('mongoose');

// ==================================.

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        unique: true,
        required: true
    },
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        unique: true,
        required: true
    },
});

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;