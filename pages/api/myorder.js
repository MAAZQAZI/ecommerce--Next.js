  //Next.js API route support: https:nextjs.org/docs/api-routes/introduction
  import Order from "../../models.js/order";
  import connectDB from "../../middleware/mongoose";
  import  jsonwebtoken  from "jsonwebtoken";

   const handler = async(req, res) => {
    const token=req.body.token;
    const data=jsonwebtoken.verify(token,'jwtsecretkey')
      let order= await Order.find({email:data.email})
      res.status(200).json({order});
   };
    export default connectDB(handler);