// all URL here begin with /products
// can create products in bruno

const verifyToken = require('../middleware/verify-token');
const Product = require('../models/product')
const express = require('express');
const router = express.Router();

// CREATE: this route is to create a new product
router.post("/", verifyToken, async (req, res) => {
    try {
      const newProduct = await Product.create(req.body); 
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

    // INDEX: this route is to see all the products
router.get("/", verifyToken, async (req, res) => {
    try {

      const allProducts = await Product.find({})
        .sort({ createdAt: "desc" }); // .find() will get all clients, .populate(agent) will show the agent of the client as it is referencing the author, .sort() will sort by earliest entries first

      res.status(200).send(allProducts);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

   // SHOW:  this route is to see a single product
   router.get("/:productId", verifyToken, async (req, res) => {
    try {
      const productId = req.params.productId;
      const singleProduct = await Product.findById(productId)
      res.status(200).send(singleProduct);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  // DELETE: product
  router.delete("/:productId",  verifyToken,async (req, res) => {
    try {
      const productId = req.params.productId;
      const singleProduct = await Product.findByIdAndDelete(productId)
      
      res.status(200).send(singleProduct);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

   //UPDATE: this route is to update a product details
   router.put("/:productId", verifyToken, async (req,res)=>{
    try {
      const productId = req.params.productId;
      const body = req.body
      const updatedProduct = await Product.findByIdAndUpdate(productId, body, {new:true}); 
      res.status(201).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

 // SHOW:  this route is to see products in a single category
 router.get("/category/:categoryId", verifyToken, async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId });
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});






  module.exports = router;