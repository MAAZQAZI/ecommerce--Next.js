// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models.js/user"
import connectDB from "../../middleware/mongoose"
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
var jwt = require("jsonwebtoken");

var cryptojs = require('crypto-js');

const gete = async (req, res) => {
   
    
  
        if(req.method=='POST'){
          
       
       
            const {email,password}=req.body;

         let user = await User.findOneAndUpdate({email:email},{password:cryptojs.AES.encrypt(password, 'secret123').toString()});

        res.status(200).json({user})
        console.log(user)
        }
        else{
            res.status(400).json({error:'error'})
        }
        
    
    



}
export default connectDB(gete);
  

  
  
