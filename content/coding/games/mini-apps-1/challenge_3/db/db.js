const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckoutModelSchema = new Schema({
    Name: String,
    Email: String,
    Password: String,
    'Line 1': String,
    'Line 2': String,
    City: String,
    State: String,
    Zipcode: String,
    'Credit Card Number': String,
    'Expiration Data': String,
    'Billing Zipcode': String
})

module.exports = mongoose.model('CheckoutModel', CheckoutModelSchema );