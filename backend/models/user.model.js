const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    address: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
        trim: true
    },
    reputation: {
        type: Number, 
        required: true,
        min: 0
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User