// all URL here begin with /clients
// right now ccan create cclients in bnuno already

const verifyToken = require('../middleware/verify-token');
const Client = require('../models/clients')
const express = require('express');
const router = express.Router();


// this route is to create a new client
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

  // INDEX: this route is to see all the clients
  // need to fix this to .find only clients 
router.get("/", verifyToken, async (req, res) => {
    try {
      const allClient = await Client.find({})
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
      const clientId = req.params.hootId;
      const singleClient = await Client.findById(clientId).populate([
        "agent",
      ]);
      res.status(200).send(singleClient);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });module.exports = router;