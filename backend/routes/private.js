const express = require('express');
const router = express.Router();
const {getcart,updatecart,addtocart,getprofile,updateprofile} = require('../controller/Cart');
const {protect} = require('../middleware/auth');

router.post('/cart',protect,getcart);
router.post('/cart/add',protect,addtocart);
router.post('/cart/update',protect,updatecart);
router.post('/profile',protect,getprofile);
router.post('/profile/update',protect,updateprofile);

module.exports= router;
