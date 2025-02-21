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
    annualIncome: {
        type: Number,
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
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    occupation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    existingPlans: {
        type: [String],
        required: true,
        enum: ["Life", "Hospitalization", "Accident", "Investment", "Endowment"],
    },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productsToSell: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
},
{ timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema); 
