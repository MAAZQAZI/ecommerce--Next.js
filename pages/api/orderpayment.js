  //Next.js API route support: https:nextjs.org/docs/api-routes/introduction
  import Order from "../../models.js/order";
  import connectDB from "../../middleware/mongoose";
  var cryptojs = require('crypto-js');
   const handler = async(req, res) => {
      if (req.method == "POST") {


        //check if card is tempored


        //check cart items is available in stock


        //check if user is valid
        const{email,oid,address,total,cart,city,pincode}=req.body;
        let order= new Order({
            email:email,
            orderId:oid,
            address:address,
            city:city,
            pincode:pincode,
            amount:total,
            products:cart,
            status:'Paid'

        })
       
        await order.save();

        


        //

       
       res.status(200).json({ success: "order succes" });
      } else {
        res.status(400).json({ error: "this method is not allowed " });
      }
    
   };
    export default connectDB(handler);