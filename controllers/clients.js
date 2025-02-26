// all URL here begin with /clients
// right now ccan create cclients in bnuno already

const verifyToken = require('../middleware/verify-token');
const Client = require('../models/client')
const Product = require('../models/product')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// CREATE: this route is to create a new client
router.post("/", verifyToken, async (req, res) => {
    try {
      req.body.agent = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
      const newClient = await Client.create(req.body); // create the client model using .create() and save to a constant called newClient
      newClient._doc.agent = req.user;
      res.status(201).json(newClient);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  // INDEX: this route is to see all your own clients
router.get("/", verifyToken, async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.payload;

      const allClient = await Client.find({"agent": req.user})
        .populate("agent")
        .sort({ createdAt: "desc" }); // .find() will get all clients, .populate(agent) will show the agent of the client as it is referencing the author, .sort() will sort by earliest entries first

      res.status(200).send(allClient);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // SHOW:  this route is to see a single client
  router.get("/:clientId", verifyToken, async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const singleClient = await Client.findById(clientId).populate([
        "agent",
        "productsToSell"
      ]);
      res.status(200).send(singleClient);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  // DELETE: client
  router.delete("/:clientId",  verifyToken,async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const singleClient = await Client.findByIdAndDelete(clientId)
      
      res.status(200).send(singleClient);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  //UPDATE: this route is to update a client details
  router.put("/:clientId", verifyToken, async (req,res)=>{
    try {
      const clientId = req.params.clientId;
      const body = req.body
      req.body.agent = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
      const updatedClient = await Client.findByIdAndUpdate(clientId, body, {new:true}); // create the client model using .create() and save to a constant called newClient
      updatedClient._doc.agent = req.user;
      res.status(201).json(updatedClient);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  //ASSIGN: assign product to client
  router.post("/:clientId/product/:productId", verifyToken, async (req, res) => {
    try {
      const {clientId, productId} = req.params;
      const client = await Client.findById(clientId)
      const product = await Product.findById(productId)
      const updatedClientWithProduct = await Client.findByIdAndUpdate(
        clientId, 
        { $addToSet: { productsToSell: productId } },  // i used ChatGPT to figure out how to add multiple items to a reference array without duplicates, full chat stored in google docs
        {new:true}
      ).populate("productsToSell"); 

        // Check if the client was updated (if product was already there, it wouldn't be added)
    if (updatedClientWithProduct.productsToSell.length === client.productsToSell.length) {
      return res.status(400).json({ message: "Product already assigned to client." });
    } else {
         updatedClientWithProduct._doc.agent = req.user;
         res.status(201).json(updatedClientWithProduct);
     }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  })
  
  module.exports = router;