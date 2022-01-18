const Product = require("../models/Product");

exports.getProducts = async (req, res,next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.addreview = async (req, res) => {
  try {
    const { reviewvalue, reviewtitle, rating } = req.body;
    let product = await Product.findById(req.params.id);
    product.review.push({userid:req.user._id,username:req.user.firstname,reviewvalue,reviewtitle,rating});
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


