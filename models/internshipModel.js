const mongoose = require('mongoose')

const internshipSchema = new mongoose.Schema({
    email: {
        type: String
    },
}, {timestamps: true})

module.exports = mongoose.model("Intern", internshipSchema)