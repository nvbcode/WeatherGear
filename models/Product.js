var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  temp: String
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;