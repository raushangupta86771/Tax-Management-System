const mongoose = require('mongoose');
const { Schema } = mongoose;

const remainderSchema = new Schema({
    taxId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('remainders', remainderSchema)