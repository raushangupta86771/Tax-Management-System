const { Router } = require("express");
const express = require("express");
const app = express();
const router = express.Router();
const taxResult = require('../models/taxResult') //schema part
const fetchuser = require("../middleware/fetchuser"); //from this middleware we will receieving user
const remainderSchema = require("../models/remainder")
const { body, validationResult } = require('express-validator');
const schedule = require('node-schedule');
require('dotenv').config();
const nodemailer =require('nodemailer')



//Route 1 : this end point POST "/api/notes/addnote" . Here we will add user tax details
router.post("/addDetails", fetchuser, [
    body('bas', "Enter a valid bas").isNumeric(),
    body('lta', "Enter a valid lta").isNumeric(),
    body('hra', "Enter a valid hra").isNumeric(),
    body('fa', "Enter a valid fa").isNumeric(),
    body('inv', "Enter a valid inv").isNumeric(),
    body('med', "Enter a valid med").isNumeric()
], async (req, res) => {
    //if there are errors then return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { bas, lta, hra, fa, inv, med, rent, finalTax } = req.body; //taking user filled data

        const tax = new taxResult({
            bas, lta, hra, fa, inv, med, user: req.user.id, rent, TotalTax: finalTax //adding user filled data in database. 4 filled will be added
        })
        const savedNote = await tax.save();   //saving to database
        res.json(savedNote);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Some error occured");
    }
})


//getting all the tax details for the particular use
router.get("/get_all_tax", fetchuser, async (req, res) => {
    // //if there are errors then return bad requests and the errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    try {
        const { userId } = req.body; //taking user filled data
        const taxes = await taxResult.find({ user: req.user.id });
        res.json(taxes);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Some error occured");
    }
})

router.put("/update_tax/:id", fetchuser, async (req, res) => {
    // //if there are errors then return bad requests and the errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    try {
        const { userId } = req.body; //taking user filled data
        const userExist = await taxResult.find({ user: req.user.id });
        const ifTax = await taxResult.findById(req.params.id); //this will check user url id exists or not
        if (!ifTax) {
            return res.status(404).send("Not Found");
        }
        if (ifTax.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        const taxUpdated = await taxResult.findByIdAndUpdate(req.params.id, { $set: { status: true } }, { new: true });
        res.json(taxUpdated);
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Some error occured");
    }
})



router.post("/setRemainder", fetchuser, async (req, res) => {
    try {
        const { email, id, userId, date } = req.body; //taking user filled data
        const setData = new remainderSchema({
            email, taxId: id, userId: req.user.id, date
        })

        await taxResult.findByIdAndUpdate(id, { $set: { remainderDate: date,userNameTax:email } }, { new: true });
        const savedRemainder = await setData.save();   //saving to database
        res.json(savedRemainder);

        // send reminder email 
        let now = new Date();
        // schedule.scheduleJob(new Date(date), async function () {
        schedule.scheduleJob(new Date(now.getTime() +  10 * 1000), async function () {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'testmailraushan@gmail.com', // sender address
                to: email, // list of receivers
                subject: "Reminder: Tax Filing", // Subject line
                text: "This is a reminder to file your taxes. Please do so as soon as possible." // plain text body
            });

            await taxResult.findByIdAndUpdate(id, { $set: { isRemainder: true } }, { new: true });

            // console.log("Message sent: %s", info.messageId);
        });

    }
    catch (e) {
        console.log(e);
        res.status(500).send("Some error occured");
    }
})


module.exports = router