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
    pipeline:[],
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productsToSell: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
},
{ timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema); 
