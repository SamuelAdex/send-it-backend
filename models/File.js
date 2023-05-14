const mongoose = require("mongoose")

const FileSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    message: {
        type: String
    },
    password: {
        type: String
    },
    dowmloadCount: {
        type: Number
    }
}, {timestamps: true})

module.exports = mongoose.model('File', FileSchema)