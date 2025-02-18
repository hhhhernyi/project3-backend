// all URL here begin with /products

const verifyToken = require('../middleware/verify-token');
const Product = require('../models/products')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// this route is to create a new product
router.post("/", verifyToken, async (req, res) => {
    try {
      req.body.agent = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
      const newProduct = await Product.create(req.body); // create the client model using .create() and save to a constant called newClient
      //newClient._doc.agent = req.user;
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
