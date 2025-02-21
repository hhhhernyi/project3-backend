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
    lastmet: {
        type: Date,
        get: function(value) {
            if (!value) return value;
            const day = String(value.getDate()).padStart(2, '0');
            const month = String(value.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = value.getFullYear();
            return `${day}${month}${year}`;
        }
    },
    nextAppt: {
        type: Date,
        get: function(value) {
            if (!value) return value;
            const day = String(value.getDate()).padStart(2, '0');
            const month = String(value.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = value.getFullYear();
            return `${day}${month}${year}`;
        }
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
