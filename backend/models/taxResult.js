const mongoose = require('mongoose');
const { Schema } = mongoose;

const taxResultSchema = new Schema({
    //for hidding particular user notes to another user notes then we will make a new field i.e user. here we can store the user's id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' //this refrence of user from "User.js" file 
    },

    bas: {
        type: Number,
        required: true
    },
    lta: {
        type: Number,
        required: true
    },
    hra: {
        type: Number,
        required: true
    },
    fa: {
        type: Number,
        required: true
    },
    inv: {
        type: Number,
        required: true
    },
    med: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    isRemainder: {
        type: Boolean,
        default: false
    },
    TotalTax:{
        type:String
    },
    remainderDate: {
        type: String
    },
    userNameTax: {
        type: String
    }
});

module.exports = mongoose.model('notes', taxResultSchema)