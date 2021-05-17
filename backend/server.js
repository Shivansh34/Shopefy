require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
if(process.env.NODE_ENV==='development'){
  app.use(cors({
    origin:process.env.CLIENT_URL
  }));
}

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/auth",authRoutes);
app.use((req,res)=>{
  res.status(404).json({
    success:false,
    msg:"Page not found",
  })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
