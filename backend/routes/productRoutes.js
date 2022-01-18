const express = require("express");
const router = express.Router();
const { getProducts,getProductById,addreview} = require("../controller/productControllers");
const {protect} = require("../middleware/auth")

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/addreview/:id",protect, addreview);

module.exports = router;
