const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Item', itemSchema)