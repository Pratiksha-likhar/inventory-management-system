const mongoose = require('mongoose');

var Customer = mongoose.model('Customer', {
  name: { type : String },
  email: {type : String },
  phone: { type: Number },
  address: { type: String },
  state: { type: String },
  country: { type: String }
});

module.exports = { Customer } ;
