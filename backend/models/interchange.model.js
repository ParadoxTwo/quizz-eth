const mongoose = require('mongoose')

const Schema = mongoose.Schema

const interchangeSchema = new Schema({
    username: { type: String, required: true, minlength: 3, trim: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    options: { type: [String], required: true},
    tags: {type: [String], required: false},
    votes: {type: Number, required: true},
    timeDifficulty: {type: Number, required: true},
    date: { type: Date, required: true }
},{
    timestamps: true
})

const Interchange = mongoose.model('Interchange', interchangeSchema)
module.exports = Interchange