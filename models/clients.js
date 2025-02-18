const mongoose = require('mongoose'); // import mongoose

// define schema
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    handphoneNumber: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    },
    comments: {
        type: String
    },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productsToSell: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
},
{ timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema); // convert the schema to model and export it
