const mongoose = require('mongoose'); 


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
    existingProducts: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    productsToSell: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
},
{ timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema); 
