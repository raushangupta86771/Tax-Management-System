const mongoose = require('mongoose');
const schedule = require('node-schedule');
require('dotenv').config();

const mongoUrl = process.env.dbCredential;
// console.log(mongoUrl)

const connectToMongo = () => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connected to Mongo successfully......");
    })
}

module.exports = connectToMongo;