
  import Product from "../../models.js/product";
  import connectDB from "../../middleware/mongoose";
   const handler = async(req, res) => {
      if (req.method == "POST") {
        console.log(req.body);
        for (let i = 0; i < req.body.length; i++) {
          let p = await Product.findByIdAndUpdate(
            req.body[i]._id,req.body[i] )
        }
       res.status(200).json({ success: "Data updated" });
      } else {
        res.status(400).json({ error: "this method is not allowed " });
      }
    
   };
    export default connectDB(handler);