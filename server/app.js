const express = require("express");
const bodyParser = require("body-parser");
 const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
const dotenv = require("dotenv")
const fileUpload = require('express-fileupload')
const { readdirSync } = require("fs");



const app = express();
const connectDb = require('./config/db')


if(process.env.NODE_ENV !== "PRODUCTION"){
  dotenv.config({ path: "./config/.env" });
}
connectDb()


const auth = require('./routes/auth')
const products = require('./routes/product')
// const order = require('./routes/order')
const category = require('./routes/category')
const subCategory = require('./routes/subCategory')
const uploadImages = require('./routes/cloudinary')

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());



app.use('/api/v1', auth)
app.use('/api/v1', category)
app.use('/api/v1', subCategory)
app.use('/api/v1', products)
app.use('/api/v1', uploadImages)
// routes middleware
//readdirSync("./routes").map((r) => app.use("/api/v1", require("./routes/" + r)));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});



