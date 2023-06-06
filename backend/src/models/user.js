const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//data user
const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    resetPasswordLink: {
        data: String,

    },
})


module.exports = mongoose.model('User', userSchema);