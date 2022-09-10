import mongoose from 'mongoose';
require('dotenv').config({ path: '.env.local' });

const dotenv = require("dotenv");

dotenv.config();

const connectDB = handler=>async (req,res) => {
  
    if(mongoose.connections[0].readyState) {
        console.log("DB is connected ");
        return handler(req,res);
    }
    await  mongoose.connect(process.env.MONGODB_URI)
       //mongodb+srv://admin:STVM2r9URz7fqdVa@cluster0.0zezxtc.mongodb.net/ecommmerce?retryWrites=true&w=majority
    return handler(req,res);
    //OhU0FAs47zorhQ2v
   
  }
  

export default connectDB;
