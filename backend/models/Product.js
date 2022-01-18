const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  username: String,
  userid: mongoose.ObjectId,
  reviewtitle: String,
  reviewvalue: String,
  rating: Number,
},
{
  timestamps: true
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  review: [reviewSchema]
});


const Product = mongoose.model("product", productSchema);


module.exports = Product;
