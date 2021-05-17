const express = require('express');
const router = express.Router();
const {getcart,updatecart,addtocart} = require('../controller/Cart');
const {protect} = require('../middleware/auth');

router.post('/cart',protect,getcart);
router.post('/cart/add',protect,addtocart);
router.post('/cart/update',protect,updatecart);

module.exports= router;
