const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }       
}, {
    timestamp: true
})

module.exports = mongoose.model("notes", NoteSchema)