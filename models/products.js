const mongoose = require('mongoose');

const newProduct = new mongoose.SchemaType({
    productName: String,
    company: String,
    link: String,
    category: String
})

module.exports = Products;