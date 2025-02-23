// all URL here begin with /users

const verifyToken = require('../middleware/verify-token');
const Product = require('../models/product')
const express = require('express');
const user = require('../models/user');
const router = express.Router();

   // SHOW:  this route is to see a single product
   router.get("/:userId", verifyToken, async (req, res) => {
    try {
      const userId = req.params.userId;
      const singleUser = await user.findById(userId)
      res.status(200).send(singleUser);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  //UPDATE: this route is to update the user details
  router.put("/:userId", verifyToken, async (req,res)=>{
    try {
      const userId = req.params.userId;
      const body = req.body
      const updatedUser = await user.findByIdAndUpdate(userId, body, {new:true}); 
      res.status(201).json(updatedUser);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;