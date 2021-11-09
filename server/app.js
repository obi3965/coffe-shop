const express = require("express");
const bodyParser = require("body-parser");
 const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
const dotenv = require("dotenv")
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middleware/error')


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const app = express();
const connectDb = require('./config/db')


if(process.env.NODE_ENV !== "PRODUCTION"){
  dotenv.config({ path: "./config/.env" });
}
connectDb()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const auth = require('./routes/auth')
const products = require('./routes/products')
const order = require('./routes/order')


app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());



app.use('/api/v1', auth)
app.use('/api/v1', products)
app.use('/api/v1', order)
app.use(errorMiddleware)

// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });


const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

