const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const { Customer } = require('../models/customer.model');

router.get('/', (req, res) => {
  Customer.find((err, docs) => {
    if(!err) {
      res.send(docs);
    } else {
      console.log('Error in retrieving customer data' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.post('/', (req, res) => {
  var customer = new Customer({
    name : req.body.name,
    email : req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    state : req.body.state,
    country: req.body.country
  });
  customer.save((err, doc) => {
    if(!err) {
      res.send(doc);
    } else {
      console.log("Error in customer save: " +JSON.stringify(err, undefined, 2));
    }
  });
});

router.put('/:id', (req, res) => {
  if(!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id:  ${req.params.id}`);
  }

    var customer = {
      name : req.body.name,
      email : req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      state : req.body.state,
      country: req.body.country
    };
    Customer.findByIdAndUpdate(req.params.id, { $set:true }, { new : true}, (err, doc) => {
      if(!err) res.send(doc);
      else {
        console.log('Error in updating data: ' +JSON.stringify(err, undefined, 2));
      }
    });
});

router.delete('/:id', (req, res) => {
  if(!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with the given id is available: ${req.params.id}`);
  }

  Customer.findByIdAndRemove(req.params.id, (err, doc) => {
    if(!err) {
      res.send(doc);
    } else {
      console.log('Error in Customer Deletion: ' + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
