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
    pipeline:[],
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productsToSell: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
},
{ timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema); 
