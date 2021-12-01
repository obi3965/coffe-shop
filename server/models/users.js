const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true, 
    unique: true,
    index:true,

  },
  password: {
    type: String,
    
   
  },
  
  role: {
    type: String,
    default: "subscriber",
  },
  cart: {
    type:Array,
    default:[]
  },
  address: {
    type:String,
    
  },
  

}, {timeStamp:true});






  module.exports = mongoose.model("User", userSchema);