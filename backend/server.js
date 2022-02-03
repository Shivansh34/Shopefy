require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const privateRoutes = require("./routes/private");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require('./middleware/error');
const path = require("path");

connectDB();

const app = express();

app.use(express.json());
if(process.env.NODE_ENV==='development'){
  app.use(cors({
    origin:process.env.CLIENT_URL
  }));
}


app.use("/api/products", productRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/private",privateRoutes);

app.use(express.static(path.join(path.resolve('./'), 'frontend/build')));
app.route('/*').get((req, res) => {
	res.sendFile(path.join(path.resolve('./'), 'frontend/build/index.html'));
});

// app.use(express.static("build"));
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(path.resolve('./'), "frontend" ,"build", "index.html"));
// });

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection",(err)=>{
  console.log(`error:${err}`);
  server.close(()=> process.exit(1));
})
