  //Next.js API route support: https:nextjs.org/docs/api-routes/introduction
  import User from "../../models.js/user";
  import connectDB from "../../middleware/mongoose";
  var cryptojs = require('crypto-js');
   const handler = async(req, res) => {
      if (req.method == "POST") {
        console.log(req.body);
        const { name, email, password } = req.body;
        
        let user = new User({name, email, password: cryptojs.AES.encrypt(password, 'secret123').toString()})
        await user.save();
       
       res.status(200).json({ success: "user succes" });
      } else {
        res.status(400).json({ error: "this method is not allowed " });
      }
    
   };
    export default connectDB(handler);