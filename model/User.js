const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    fatherName: String,
    phoneNumber: String,
    cnic: String,
    houseNumber: String,
    createdAt: String,
})

module.exports = model('UserData', userSchema)