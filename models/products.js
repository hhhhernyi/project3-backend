const mongoose = require('mongoose');

const newProduct = new mongoose.SchemaType({
    productName: String,
    company: String,
    link: String,
    category: {
        type: String,
        required: true,
        enum: ['Life', 'Hospitalization', 'Accident','Investment','Endowment']
    }
})

module.exports = mongoose.model("Products", newProduct);