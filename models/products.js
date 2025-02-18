const mongoose = require("mongoose"); // import mongoose

// define schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Life", "Hospitalization", "Accident", "Investment", "Endowment"],
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
